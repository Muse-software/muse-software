#!/usr/bin/env node
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const PORT = 3952;
const BASE = `http://localhost:${PORT}`;
const OUT = "docs/three-doors/_verify-d4-nav-seo";
const CAPABILITIES = [
  "product-strategy-discovery",
  "product-experience-design",
  "product-engineering",
  "ai-transformation",
  "gamification-experience",
];
const CAPABILITY_LABELS = {
  en: [
    "Product Strategy & Discovery",
    "Product & Experience Design",
    "Product Engineering",
    "AI Transformation",
    "Gamification & Experience",
  ],
  ar: [
    "استراتيجية المنتج والاكتشاف",
    "تصميم المنتج والتجربة",
    "هندسة المنتجات الرقمية",
    "التحول بالذكاء الاصطناعي",
    "التلعيب والتجارب التفاعلية",
  ],
};
const GROUP_ORDER = ["explore", "capabilities", "company", "contact"];
const results = [];
const screenshots = [];
let failed = false;
const record = (name, pass, detail = null) => {
  results.push({ name, pass, detail });
  if (!pass) failed = true;
  console.log(`[${pass ? "PASS" : "FAIL"}] ${name}`);
};

async function capture(page, filename) {
  const path = `${OUT}/${filename}`;
  await page.screenshot({ path });
  const bytes = await readFile(path);
  screenshots.push({
    path,
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
    sha256: createHash("sha256").update(bytes).digest("hex"),
  });
}

async function waitForServer() {
  for (let i = 0; i < 80; i += 1) {
    try { if ((await fetch(`${BASE}/en`)).ok) return; } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Production server did not become ready");
}

async function redirectProbe(path, expected) {
  const response = await fetch(`${BASE}${path}`, {
    redirect: "manual",
    headers: { "accept-language": "en" },
  });
  const location = response.headers.get("location");
  const destination = location ? await fetch(`${BASE}${location}`, { redirect: "manual" }) : null;
  record(`${path} redirects one hop to ${expected}`,
    response.status === 308 && location === expected && destination?.status === 200 && !destination.headers.get("location"),
    {
      status: response.status,
      location,
      destinationStatus: destination?.status ?? null,
      destinationLocation: destination?.headers.get("location") ?? null,
    },
  );
}

async function main() {
  await mkdir(OUT, { recursive: true });
  let browser;
  const server = spawn("npm", ["run", "start", "--", "-p", String(PORT)], {
    stdio: ["ignore", "pipe", "pipe"],
  });
  server.stdout.resume();
  server.stderr.resume();
  try {
    await waitForServer();
    await redirectProbe("/get-started", "/en/start");
    await redirectProbe("/en/get-started", "/en/start");
    await redirectProbe("/ar/get-started", "/ar/start");

    const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
    record("sitemap includes published /en/start", sitemap.includes("https://muse.sa/en/start"));
    record("sitemap omits retired /get-started", !sitemap.includes("/get-started"));
    record("sitemap keeps unreviewed Arabic unpublished", !sitemap.includes("https://muse.sa/ar/"));

    browser = await chromium.launch();
    for (const locale of ["en", "ar"]) {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
      const page = await context.newPage();
      const errors = [];
      page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(`${BASE}/${locale}`, { waitUntil: "networkidle" });
      const toggle = page.getByRole("button", { name: locale === "ar" ? "فتح القائمة" : "Open menu" });
      const panelId = await toggle.getAttribute("aria-controls");
      await toggle.click();
      const panel = page.locator(`#${panelId}`);
      await panel.waitFor({ state: "visible" });
      const navCapabilityHrefs = await panel.locator('a[href*="/services/"]').evaluateAll((nodes) =>
        nodes.map((node) => node.getAttribute("href")),
      );
      const navCapabilityLabels = await panel.locator('a[href*="/services/"]').allTextContents();
      const expectedCapabilityHrefs = CAPABILITIES.map((slug) => `/${locale}/services/${slug}`);
      const actualCapabilityLabels = navCapabilityLabels.map((label) => label.trim());
      record(`${locale} nav panel lists exact capability order and labels`,
        JSON.stringify(navCapabilityHrefs) === JSON.stringify(expectedCapabilityHrefs) && JSON.stringify(actualCapabilityLabels) === JSON.stringify(CAPABILITY_LABELS[locale]),
        { hrefs: navCapabilityHrefs, labels: actualCapabilityLabels },
      );
      await page.waitForTimeout(900);
      await capture(page, `${locale}-mobile-nav-top.png`);
      const scrollState = await panel.evaluate((node) => {
        const scroller = node.querySelector(".no-scrollbar");
        if (!(scroller instanceof HTMLElement)) return { present: false };
        scroller.scrollTop = scroller.scrollHeight;
        return {
          present: true,
          clientHeight: scroller.clientHeight,
          scrollHeight: scroller.scrollHeight,
          scrollTop: scroller.scrollTop,
        };
      });
      await page.waitForTimeout(250);
      const actionLinks = panel.locator('a[href$="/contact"], a[href$="/start"]');
      const actionVisibility = await actionLinks.evaluateAll((nodes) => nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return {
          href: node.getAttribute("href"),
          visible: rect.bottom > 0 && rect.top < window.innerHeight,
          height: rect.height,
        };
      }));
      record(`${locale} mobile nav scroll reaches both action links`,
        scrollState.present && scrollState.scrollHeight > scrollState.clientHeight && actionVisibility.length === 2 && actionVisibility.every((item) => item.visible && item.height >= 44),
        { scrollState, actionVisibility },
      );
      await capture(page, `${locale}-mobile-nav-bottom.png`);
      await page.keyboard.press("Escape");
      await page.waitForFunction((id) => !document.getElementById(id), panelId);
      const escapeState = await toggle.evaluate((node) => ({
        expanded: node.getAttribute("aria-expanded"),
        focused: document.activeElement === node,
      }));
      record(`${locale} Escape closes menu and restores toggle focus`,
        escapeState.expanded === "false" && escapeState.focused,
        escapeState,
      );
      const allLegacyLinks = await page.locator('a[href*="/get-started"]').evaluateAll((nodes) =>
        nodes.map((node) => node.getAttribute("href")),
      );
      record(`${locale} rendered homepage has no legacy get-started links`, allLegacyLinks.length === 0, allLegacyLinks);
      const robots = await page.evaluate(() => document.querySelector('meta[name="robots"]')?.getAttribute("content") ?? null);
      record(`${locale} publication indexing gate is correct`, locale === "en" ? !robots?.includes("noindex") : robots?.includes("noindex"), robots);
      record(`${locale} nav/home have no console or page errors`, errors.length === 0, errors);
      await context.close();
    }

    for (const locale of ["en", "ar"]) {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`${BASE}/${locale}`, { waitUntil: "networkidle" });
      const toggle = page.getByRole("button", { name: locale === "ar" ? "فتح القائمة" : "Open menu" });
      const panelId = await toggle.getAttribute("aria-controls");
      await toggle.click();
      const panel = page.locator(`#${panelId}`);
      await panel.waitFor({ state: "visible" });
      await page.waitForTimeout(1_800);
      const desktopState = await panel.evaluate((node) => {
        const luminance = ([r, g, b]) => {
          const linear = [r, g, b].map((value) => {
            const channel = value / 255;
            return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
          });
          return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
        };
        const contrast = (foreground, background) => {
          const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
          return (lighter + 0.05) / (darker + 0.05);
        };
        const parseRgb = (value) => (value.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);
        const bounds = node.getBoundingClientRect();
        const serviceLinks = [...node.querySelectorAll('a[href*="/services/"]')];
        const cards = [...node.querySelectorAll("[data-nav-group]")];
        const cardOrder = cards.map((card) => card.getAttribute("data-nav-group"));
        const cardRects = cards.map((card) => {
          const rect = card.getBoundingClientRect();
          return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
        });
        const escaped = [...node.querySelectorAll("[data-nav-group], a, button, h2, .social-links-item, .no-scrollbar")].filter((item) => {
          const rect = item.getBoundingClientRect();
          return rect.left < bounds.left || rect.right > bounds.right || rect.top < bounds.top || rect.bottom > bounds.bottom;
        }).length;
        const start = node.querySelector('a[href$="/start"]');
        const contact = node.querySelector('a[href$="/contact"]');
        const startStyle = start ? getComputedStyle(start) : null;
        const contactStyle = contact ? getComputedStyle(contact) : null;
        const startContrast = startStyle ? contrast(parseRgb(startStyle.color), parseRgb(startStyle.backgroundColor)) : 0;
        const panelRgb = [15, 15, 17];
        const contactComposite = panelRgb.map((value) => Math.round(255 * 0.1 + value * 0.9));
        const contactContrast = contactStyle ? contrast(parseRgb(contactStyle.color), contactComposite) : 0;
        const actions = [contact, start].map((item) => item?.getBoundingClientRect()).filter(Boolean);
        const direction = document.documentElement.dir;
        const rowTop = cardRects[0]?.top ?? 0;
        const sameRow = cardRects.length === 4 && cardRects.every((rect) => Math.abs(rect.top - rowTop) <= 0.5);
        const orderedWithoutOverlap = cardRects.length === 4 && cardRects.slice(1).every((rect, index) =>
          direction === "rtl" ? rect.right <= cardRects[index].left : rect.left >= cardRects[index].right
        );
        const visualOrderCorrect = sameRow && orderedWithoutOverlap;
        return {
          serviceLinks: serviceLinks.length,
          escaped,
          documentOverflow: document.documentElement.scrollWidth - window.innerWidth,
          panelWidth: bounds.width,
          cards: cards.length,
          cardOrder,
          cardRects,
          direction,
          visualOrderCorrect,
          actionHeights: actions.map((rect) => rect.height),
          startContrast,
          contactContrast,
        };
      });
      record(`${locale} desktop nav keeps five capabilities inside panel`,
        desktopState.serviceLinks === 5 && desktopState.cards === 4 && JSON.stringify(desktopState.cardOrder) === JSON.stringify(GROUP_ORDER) && desktopState.direction === (locale === "ar" ? "rtl" : "ltr") && desktopState.visualOrderCorrect && desktopState.escaped === 0 && desktopState.documentOverflow === 0 && desktopState.actionHeights.length === 2 && desktopState.actionHeights.every((height) => height >= 44) && desktopState.startContrast >= 4.5 && desktopState.contactContrast >= 4.5,
        desktopState,
      );
      await capture(page, `${locale}-desktop-nav.png`);
      await page.close();
    }

    for (const path of ["/start", "/services/product-strategy-discovery"]) {
      const page = await browser.newPage();
      await page.goto(`${BASE}/en${path}`, { waitUntil: "networkidle" });
      const metadata = await page.evaluate(() => ({
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
        ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute("content") ?? null,
        ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute("content") ?? null,
        alternates: [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((node) => ({
          locale: node.getAttribute("hreflang"),
          href: node.getAttribute("href"),
        })),
      }));
      record(`en${path} exposes absolute Muse canonical and Open Graph URLs`,
        metadata.canonical === `https://muse.sa/en${path}` && metadata.ogUrl === `https://muse.sa/en${path}` && metadata.ogImage?.startsWith("https://muse.sa/"),
        metadata,
      );
      record(`en${path} advertises only published hreflang variants`,
        metadata.alternates.some((item) => item.locale === "en") && metadata.alternates.some((item) => item.locale === "x-default") && !metadata.alternates.some((item) => item.locale === "ar"),
        metadata.alternates,
      );
      await page.close();
    }

    for (const locale of ["en", "ar"]) {
      for (const path of ["/explore", "/about", "/contact", "/services/product-engineering"]) {
        const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
        await page.goto(`${BASE}/${locale}${path}`, { waitUntil: "networkidle" });
        const legacy = await page.locator('a[href*="/get-started"]').evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")));
        record(`${locale}${path} has no legacy get-started links`, legacy.length === 0, legacy);
        await page.close();
      }
    }
    await browser.close();
    browser = undefined;
  } finally {
    if (browser) await browser.close().catch(() => {});
    server.kill("SIGTERM");
    await Promise.race([
      new Promise((resolve) => server.once("exit", resolve)),
      new Promise((resolve) => setTimeout(resolve, 2_000)),
    ]);
    if (server.exitCode === null) server.kill("SIGKILL");
  }
  await writeFile(`${OUT}/report.json`, JSON.stringify({ generatedAt: new Date().toISOString(), results, screenshots }, null, 2));
  console.log(`\n${results.filter((result) => result.pass).length}/${results.length} checks passed.`);
  if (failed) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
