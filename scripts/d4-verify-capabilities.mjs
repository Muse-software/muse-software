#!/usr/bin/env node
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";

const PORT = 3946;
const BASE_URL = `http://localhost:${PORT}`;
const OUT = "docs/three-doors/_verify-d4-capabilities";
const SLUGS = ["product-strategy-discovery", "product-experience-design"];
const ALL_SERVICE_SLUGS = [
  ...SLUGS,
  "ai-transformation",
  "product-engineering",
  "gamification-experience",
];
const EXPECTED = {
  en: {
    dir: "ltr",
    titles: {
      "product-strategy-discovery": "Product Strategy & Discovery",
      "product-experience-design": "Product & Experience Design",
    },
  },
  ar: {
    dir: "rtl",
    titles: {
      "product-strategy-discovery": "استراتيجية المنتج والاكتشاف",
      "product-experience-design": "تصميم المنتجات والتجربة",
    },
  },
};

const results = [];
const screenshots = [];
let failed = false;
function record(name, pass, detail = null) {
  results.push({ name, pass, detail });
  console.log(`[${pass ? "PASS" : "FAIL"}] ${name}`);
  if (!pass) failed = true;
}

async function waitForServer() {
  for (let i = 0; i < 80; i += 1) {
    try {
      const response = await fetch(`${BASE_URL}/en`);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Production server did not become ready");
}

async function inspect(page, locale, slug, device) {
  const response = await page.goto(`${BASE_URL}/${locale}/services/${slug}`, { waitUntil: "networkidle" });
  const expected = EXPECTED[locale];
  const title = expected.titles[slug];
  const state = await page.evaluate(() => ({
    lang: document.documentElement.lang,
    dir: document.documentElement.dir,
    overflow: document.scrollingElement.scrollWidth - document.scrollingElement.clientWidth,
    h1: document.querySelector("h1")?.textContent?.trim() ?? "",
    description: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "",
    ctas: [...document.querySelectorAll('a[href*="/start"]')].map((node) => node.getAttribute("href")),
    brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
    trackVisibility: (() => {
      const cards = [...document.querySelectorAll("[data-card]")];
      const track = cards[0]?.parentElement?.getBoundingClientRect();
      const measurements = cards.map((card) => {
        const rect = card.getBoundingClientRect();
        const visible = track
          ? Math.max(0, Math.min(rect.right, track.right) - Math.max(rect.left, track.left))
          : 0;
        return { width: rect.width, visible };
      });
      return {
        fullyVisible: measurements.filter(({ width, visible }) => Math.abs(visible - width) <= 1).length,
        partiallyVisible: measurements.filter(({ width, visible }) => visible > 1 && visible < width - 1),
        measurements,
      };
    })(),
    heroFallback: (() => {
      const fallback = document.querySelector("[data-dither-fallback]");
      return fallback ? getComputedStyle(fallback).backgroundImage : "none";
    })(),
    subnavItems: (() => {
      const nav = document.querySelector('nav[aria-label="Section"]');
      if (!nav) return [{ label: "missing-nav", invalid: true }];
      const bounds = nav.getBoundingClientRect();
      return [...nav.querySelectorAll("a")].map((item) => {
        const rect = item.getBoundingClientRect();
        const range = document.createRange();
        range.selectNodeContents(item);
        const textRect = range.getBoundingClientRect();
        const inlineInset = Math.min(textRect.left - rect.left, rect.right - textRect.right);
        const clipped = rect.left < bounds.left - 1 || rect.right > bounds.right + 1;
        const intrinsicOverflow = item.scrollWidth > item.clientWidth;
        const textOutside = textRect.left < rect.left || textRect.right > rect.right;
        return {
          label: item.textContent?.trim() ?? "",
          clientWidth: item.clientWidth,
          scrollWidth: item.scrollWidth,
          box: { left: rect.left, right: rect.right },
          text: { left: textRect.left, right: textRect.right },
          inlineInset,
          clipped,
          intrinsicOverflow,
          textOutside,
          invalid: clipped || intrinsicOverflow || textOutside,
        };
      });
    })(),
    faqHeading: document.querySelector("#faq h2")?.textContent?.trim() ?? "",
    controlsToFaq: (() => {
      const track = document.querySelector("[data-card]")?.parentElement;
      const controls = track?.nextElementSibling;
      const heading = document.querySelector("#faq h2");
      return controls && heading
        ? heading.getBoundingClientRect().top - controls.getBoundingClientRect().bottom
        : Infinity;
    })(),
  }));
  const expectedFullCards = device === "desktop" ? 3 : 1;
  const expectedControlsToFaq = device === "desktop" ? 96 : 64;
  const subnavFits = state.subnavItems.every((item) => !item.invalid && (device === "desktop" || item.inlineInset >= 2));
  const pass = response?.status() === 200 && state.lang === locale && state.dir === expected.dir && state.h1 === title && state.description.length >= 45 && state.canonical.endsWith(`/${locale}/services/${slug}`) && state.ctas.some((href) => href?.includes("/start?intent=capability")) && state.overflow <= 1 && state.brokenImages === 0 && state.trackVisibility.fullyVisible === expectedFullCards && state.trackVisibility.partiallyVisible.length === 0 && state.heroFallback !== "none" && subnavFits && state.faqHeading.length > 0 && Math.abs(state.controlsToFaq - expectedControlsToFaq) <= 1;
  record(`${locale}/${device} ${slug} renders honest capability page`, pass, { status: response?.status(), ...state });

  // Full-page capture alone does not intersect below-fold WordReveal headings.
  // Walk the page first so the evidence shows the settled composition rather
  // than turning an unrevealed heading into an apparent blank section.
  for (const selector of ["#overview", "#why", "#what-we-do", "section#faq"]) {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(120);
  }
  await page.locator("#faq h2").waitFor({ state: "visible", timeout: 5_000 });
  await page.waitForFunction(
    () => {
      const words = [...document.querySelectorAll("#faq h2 [data-word]")];
      return words.length > 0 && words.every((word) => Number.parseFloat(getComputedStyle(word).opacity) >= 0.95);
    },
    undefined,
    { timeout: 5_000 },
  );
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(120);
  const path = `${OUT}/${locale}-${device}-${slug}.png`;
  await page.screenshot({ path, fullPage: true });
  const size = await page.evaluate(() => ({ width: document.documentElement.clientWidth, height: document.documentElement.scrollHeight }));
  screenshots.push({ path, ...size });
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const server = spawn("npm", ["run", "start", "--", "-p", String(PORT)], { stdio: ["ignore", "pipe", "pipe"] });
  server.stdout.resume();
  server.stderr.resume();
  try {
    await waitForServer();
    const browser = await chromium.launch();
    for (const device of [
      { name: "desktop", viewport: { width: 1440, height: 900 } },
      { name: "mobile", viewport: { width: 390, height: 844 } },
      { name: "compact", viewport: { width: 320, height: 720 } },
    ]) {
      const context = await browser.newContext({ viewport: device.viewport });
      const page = await context.newPage();
      const errors = [];
      const errorsByRoute = [];
      page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
      page.on("pageerror", (error) => errors.push(error.message));
      for (const locale of ["en", "ar"]) {
        for (const slug of SLUGS) {
          const before = errors.length;
          await inspect(page, locale, slug, device.name);
          if (errors.length > before) errorsByRoute.push({ locale, slug, errors: errors.slice(before) });
        }
      }
      record(`${device.name} capability routes have no console errors`, errors.length === 0, errorsByRoute);
      await context.close();
    }

    const regressionContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const regressionPage = await regressionContext.newPage();
    for (const locale of ["en", "ar"]) {
      const failures = [];
      for (const slug of ALL_SERVICE_SLUGS) {
        const response = await regressionPage.goto(`${BASE_URL}/${locale}/services/${slug}`, { waitUntil: "networkidle" });
        const state = await regressionPage.evaluate(() => {
          const nav = document.querySelector('nav[aria-label="Section"]');
          const navBounds = nav?.getBoundingClientRect();
          const clippedTabs = nav && navBounds
            ? [...nav.querySelectorAll("a")].filter((item) => {
                const rect = item.getBoundingClientRect();
                const range = document.createRange();
                range.selectNodeContents(item);
                const textRect = range.getBoundingClientRect();
                return rect.left < navBounds.left - 1 || rect.right > navBounds.right + 1 || item.scrollWidth > item.clientWidth || textRect.left < rect.left || textRect.right > rect.right;
              }).length
            : 1;
          const cards = [...document.querySelectorAll("[data-card]")];
          const track = cards[0]?.parentElement?.getBoundingClientRect();
          const cardVisibility = cards.map((card) => {
            const rect = card.getBoundingClientRect();
            const visible = track ? Math.max(0, Math.min(rect.right, track.right) - Math.max(rect.left, track.left)) : 0;
            return { width: rect.width, visible };
          });
          const fullyVisibleCards = cardVisibility.filter(({ width, visible }) => Math.abs(visible - width) <= 1).length;
          const partialCards = cardVisibility.filter(({ width, visible }) => visible > 1 && visible < width - 1).length;
          return {
            overflow: document.scrollingElement.scrollWidth - document.scrollingElement.clientWidth,
            brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
            clippedTabs,
            fullyVisibleCards,
            partialCards,
            canvasCount: document.querySelectorAll("canvas").length,
            heroMedia: !!document.querySelector("section img") || !!document.querySelector("[data-dither-fallback]"),
            staticCtaSurface: !!document.querySelector("#cta .copper-bloom.cta-bands"),
            startCta: !!document.querySelector('a[href*="/start?intent=capability"]'),
          };
        });
        if (response?.status() !== 200 || state.overflow > 1 || state.brokenImages || state.clippedTabs || state.fullyVisibleCards !== 1 || state.partialCards || state.canvasCount > 1 || !state.heroMedia || !state.staticCtaSurface || !state.startCta) failures.push({ slug, status: response?.status(), ...state });
      }
      record(`${locale} all five service pages pass mobile renderer regression`, failures.length === 0, failures);
    }
    await regressionContext.close();

    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    for (const locale of ["en", "ar"]) {
      await page.goto(`${BASE_URL}/${locale}`, { waitUntil: "networkidle" });
      const hrefs = await page.locator('#capabilities a[href*="/services/"]').evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")));
      record(`${locale} homepage links all five capability pages`, SLUGS.every((slug) => hrefs.some((href) => href?.endsWith(`/services/${slug}`))) && hrefs.length === 5, hrefs);
      const explore = await page.goto(`${BASE_URL}/${locale}/explore`, { waitUntil: "networkidle" });
      const exploreState = await page.evaluate(() => ({
        hrefs: [...document.querySelectorAll('a[href*="/services/"]')].map((node) => node.getAttribute("href")),
        brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
        overflow: document.scrollingElement.scrollWidth - document.scrollingElement.clientWidth,
      }));
      record(`${locale} explore lists new capabilities without broken media`, explore?.status() === 200 && SLUGS.every((slug) => exploreState.hrefs.some((href) => href?.endsWith(`/services/${slug}`))) && exploreState.brokenImages === 0 && exploreState.overflow <= 1, exploreState);
    }
    await context.close();
    await browser.close();
  } finally {
    server.kill("SIGTERM");
    await Promise.race([
      new Promise((resolve) => server.once("exit", resolve)),
      new Promise((resolve) => setTimeout(resolve, 2_000)),
    ]);
    if (server.exitCode === null) server.kill("SIGKILL");
  }

  const report = { generatedAt: new Date().toISOString(), results, screenshots };
  await writeFile(`${OUT}/report.json`, JSON.stringify(report, null, 2));
  console.log(`\n${results.filter((item) => item.pass).length}/${results.length} checks passed.`);
  if (failed) {
    console.error("\nD4 CAPABILITIES GATE: FAILED");
    process.exitCode = 1;
  } else {
    console.log("\nD4 CAPABILITIES GATE: PASSED");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
