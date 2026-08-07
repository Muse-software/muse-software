#!/usr/bin/env node
/**
 * Direction 4 homepage gate (docs/three-doors/direction-4-understanding-first.md
 * §11.3-§11.4, Phases 2 and 3). Supersedes `d4-verify.mjs`'s Phase 1 scope
 * (Hero + IntentRouter only) with the complete eight-section homepage.
 *
 * Starts the production server itself (`next start`) against an already-built
 * `.next` output — run `npm run build` first — then, for `en` and `ar` at
 * 1440x900 and 390x844:
 *
 *   1. Loads "/" and asserts HTTP 200, correct <html lang>/dir, no horizontal
 *      overflow, and zero unexpected console/page errors (the one
 *      accounted-for WebGL-unavailable warning from the headless sandbox is
 *      allow-listed, same as d4-verify.mjs).
 *   2. Asserts the exact section id order: hero, intents, capabilities,
 *      approach, why-muse, faq, cta — and that "from-the-studio" is ABSENT,
 *      since Home.fromStudio.items ships empty at launch (the honesty guard
 *      in FromTheStudio.tsx).
 *   3. Asserts Capabilities renders exactly 5 items, of which exactly 3 are
 *      real <a href> links (to the existing service routes) and 2 are
 *      non-link informational blocks.
 *   4. Asserts FAQ renders exactly 5 accordion items.
 *   5. Asserts the closing CTA's button href resolves to "/start" (not the
 *      retired "/get-started").
 *   6. Keyboard reachability: tabbing from the last intent row lands on the
 *      quiet "#capabilities" link, and tabbing again skips the two non-link
 *      capability items and lands on the first real capability link — proof
 *      the non-link items are correctly unfocusable rather than dead links
 *      masquerading as real ones. Separately: the first FAQ question is a
 *      real <button> that toggles `aria-expanded` on Enter, and the CTA
 *      control is a real, focusable <a>.
 *   7. One reduced-motion pass per locale (desktop viewport, "/").
 *   8. Captures a full-page screenshot of "/" to
 *      docs/three-doors/_verify-d4-homepage/<locale>-<device>-home.png.
 *
 * Usage: npm run build && node scripts/d4-verify-homepage.mjs
 */

import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PORT = 3948;
const BASE_URL = `http://localhost:${PORT}`;
const SCREENSHOT_DIR = path.join(ROOT, "docs/three-doors/_verify-d4-homepage");
const REPORT_PATH = path.join(SCREENSHOT_DIR, "report.json");

const LOCALES = ["en", "ar"];
const DEVICES = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
  { name: "mobile-compact", width: 320, height: 700 },
];
const EXPECTED_DIR = { en: "ltr", ar: "rtl" };
const EXPECTED_SECTION_ORDER = [
  "hero",
  "intents",
  "capabilities",
  "approach",
  "why-muse",
  "faq",
  "cta",
];
const EXPECTED_CAPABILITY_HREF_SUFFIXES = [
  "/services/product-engineering",
  "/services/ai-transformation",
  "/services/gamification-experience",
];

const KNOWN_WEBGL_SANDBOX_WARNING = /\[PixelBlast\] WebGL unavailable/;

function pngDimensions(buffer) {
  if (buffer.length < 24 || buffer.toString("ascii", 12, 16) !== "IHDR") {
    throw new Error("not a well-formed PNG");
  }
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function waitForServer(url, timeoutMs = 30_000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const attempt = async () => {
      try {
        const res = await fetch(url);
        if (res.ok || res.status === 404) return resolve();
      } catch {
        // server not up yet
      }
      if (Date.now() - start > timeoutMs) return reject(new Error("server did not become ready"));
      setTimeout(attempt, 300);
    };
    attempt();
  });
}

async function checkSectionOrder(page) {
  const ids = await page.evaluate(() => Array.from(document.querySelectorAll("[id]")).map((el) => el.id));
  const present = ids.filter((id) => EXPECTED_SECTION_ORDER.includes(id) || id === "from-the-studio");
  const orderOk = JSON.stringify(present.filter((id) => id !== "from-the-studio")) === JSON.stringify(EXPECTED_SECTION_ORDER);
  const fromStudioAbsent = !present.includes("from-the-studio");
  return { pass: orderOk && fromStudioAbsent, present, orderOk, fromStudioAbsent };
}

async function checkCapabilities(page, locale) {
  const total = await page.locator("#capabilities > div > div:nth-child(2) > *").count();
  const linkHrefs = await page.$$eval("#capabilities a[href]", (els) => els.map((el) => el.getAttribute("href")));
  const expected = EXPECTED_CAPABILITY_HREF_SUFFIXES.map((suffix) => `/${locale}${suffix}`);
  const missing = expected.filter((href) => !linkHrefs.includes(href));
  const extra = linkHrefs.filter((href) => !expected.includes(href));
  const pass = total === 5 && linkHrefs.length === 3 && missing.length === 0 && extra.length === 0;
  return { pass, total, linkHrefs, expected, missing, extra };
}

async function checkFaqCount(page) {
  const count = await page.locator("#faq .accordion-item").count();
  return { pass: count === 5, count };
}

async function checkCtaHref(page, locale) {
  const href = await page.locator("#cta a[href]").first().getAttribute("href");
  const pass = href === `/${locale}/start`;
  return { pass, href };
}

async function checkInteractionGeometry(page) {
  const intentRows = await page.locator('#intents a[href*="/start?intent="]').evaluateAll((rows) =>
    rows.map((row) => {
      const box = row.getBoundingClientRect();
      return { width: box.width, height: box.height };
    }),
  );
  const faqRows = await page.locator("#faq .accordion-item button").evaluateAll((rows) =>
    rows.map((row) => row.getBoundingClientRect().height),
  );
  const fullRowTargets = intentRows.every((box) => box.width >= 280 && box.height >= 44);
  const faqTargets = faqRows.every((height) => height >= 44);

  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(250);
  const headerBox = await page.locator("header").first().boundingBox();
  const stickyHeader = !!headerBox && headerBox.y >= 0 && headerBox.y < 40;

  await page.locator('a[href="#capabilities"]').click();
  await page.waitForTimeout(250);
  const capabilityBox = await page.locator("#capabilities").boundingBox();
  const anchorClearsHeader = !!capabilityBox && capabilityBox.y >= 72;
  await page.evaluate(() => window.scrollTo(0, 0));

  return {
    pass: fullRowTargets && faqTargets && stickyHeader && anchorClearsHeader,
    fullRowTargets,
    faqTargets,
    stickyHeader,
    anchorClearsHeader,
    intentRows,
    faqRows,
  };
}

async function checkKeyboard(page, locale) {
  const results = {};

  // Tab from the last intent row -> quiet capability link -> first real capability link.
  await page.locator('#intents a[href*="/start?intent="]').last().focus();
  await page.keyboard.press("Tab");
  const afterIntents = await page.evaluate(() => ({
    tag: document.activeElement?.tagName,
    href: document.activeElement?.getAttribute("href"),
  }));
  results.capabilityLink = { pass: afterIntents.tag === "A" && afterIntents.href === "#capabilities", ...afterIntents };

  await page.keyboard.press("Tab");
  const afterCapabilityLink = await page.evaluate(() => ({
    tag: document.activeElement?.tagName,
    inCapabilities: !!document.activeElement?.closest("#capabilities"),
    href: document.activeElement?.getAttribute("href"),
  }));
  const expectedFirstLink = `/${locale}/services/product-engineering`;
  results.firstCapabilityLink = {
    pass: afterCapabilityLink.tag === "A" && afterCapabilityLink.inCapabilities && afterCapabilityLink.href === expectedFirstLink,
    ...afterCapabilityLink,
  };

  // FAQ: first question is a real, keyboard-toggleable button.
  const firstFaqButton = page.locator("#faq .accordion-item button").first();
  await firstFaqButton.focus();
  const beforeExpanded = await firstFaqButton.getAttribute("aria-expanded");
  await page.keyboard.press("Enter");
  const afterExpanded = await firstFaqButton.getAttribute("aria-expanded");
  results.faqAccordion = {
    pass: beforeExpanded !== null && beforeExpanded !== afterExpanded,
    beforeExpanded,
    afterExpanded,
  };
  // Restore state for the screenshot pass.
  await page.keyboard.press("Enter");

  // CTA: a real, focusable link.
  const ctaLink = page.locator("#cta a[href]").first();
  await ctaLink.focus();
  const ctaFocused = await page.evaluate(() => document.activeElement?.tagName === "A");
  results.ctaFocusable = { pass: ctaFocused };

  const pass = Object.values(results).every((r) => r.pass);
  return { pass, ...results };
}

async function checkRoute(page, locale, device, { reducedMotion = false } = {}) {
  const url = `${BASE_URL}/${locale}/`;
  const consoleErrors = [];
  const pageErrors = [];
  let knownWebglWarnings = 0;

  const onConsole = (msg) => {
    const text = msg.text();
    if (KNOWN_WEBGL_SANDBOX_WARNING.test(text)) {
      knownWebglWarnings += 1;
      return;
    }
    if (msg.type() === "error") consoleErrors.push(text);
  };
  const onPageError = (err) => pageErrors.push(err.message);

  page.on("console", onConsole);
  page.on("pageerror", onPageError);

  let status = null;
  let lang = null;
  let dir = null;
  let overflow = null;
  let scrollXAfterProbe = null;
  let navError = null;
  let sectionOrder = null;
  let capabilities = null;
  let faq = null;
  let cta = null;
  let keyboard = null;
  let interactionGeometry = null;

  try {
    const response = await page.goto(url, { waitUntil: "networkidle", timeout: 20_000 });
    status = response ? response.status() : null;
    await page.waitForTimeout(300);

    ({ lang, dir } = await page.evaluate(() => ({
      lang: document.documentElement.lang,
      dir: document.documentElement.dir,
    })));

    const overflowCheck = await page.evaluate(() => {
      const el = document.scrollingElement;
      const before = el.scrollWidth > el.clientWidth + 1;
      window.scrollTo(9999, 0);
      const scrolledX = window.scrollX;
      window.scrollTo(0, 0);
      return { before, scrolledX };
    });
    overflow = overflowCheck.before;
    scrollXAfterProbe = overflowCheck.scrolledX;

    sectionOrder = await checkSectionOrder(page);
    capabilities = await checkCapabilities(page, locale);
    faq = await checkFaqCount(page);
    cta = await checkCtaHref(page, locale);
    interactionGeometry = await checkInteractionGeometry(page);
    if (!reducedMotion) {
      keyboard = await checkKeyboard(page, locale);
    }
  } catch (err) {
    navError = err.message;
  }

  page.off("console", onConsole);
  page.off("pageerror", onPageError);

  const okStatus = status === 200;
  const okLang = lang === locale;
  const okDir = dir === EXPECTED_DIR[locale];
  const okOverflow = overflow === false && scrollXAfterProbe === 0;
  const okErrors = consoleErrors.length === 0 && pageErrors.length === 0;
  const okSectionOrder = sectionOrder?.pass === true;
  const okCapabilities = capabilities?.pass === true;
  const okFaq = faq?.pass === true;
  const okCta = cta?.pass === true;
  const okKeyboard = reducedMotion || keyboard?.pass === true;
  const okInteractionGeometry = interactionGeometry?.pass === true;

  const pass =
    !navError && okStatus && okLang && okDir && okOverflow && okErrors && okSectionOrder && okCapabilities && okFaq && okCta && okKeyboard && okInteractionGeometry;

  return {
    locale,
    device: device.name,
    reducedMotion,
    url,
    pass,
    status,
    lang,
    dir,
    overflow,
    scrollXAfterProbe,
    consoleErrors,
    pageErrors,
    knownWebglWarnings,
    sectionOrder,
    capabilities,
    faq,
    cta,
    keyboard,
    interactionGeometry,
    navError,
  };
}

async function captureHomeScreenshot(page, locale, device) {
  // WordReveal headings animate only after they enter the viewport. A raw
  // full-page screenshot does not scroll, so it captured every below-fold
  // heading at its initial opacity: 0 and falsely made the design look as if
  // section titles were dark or clipped. Visit each section in document order,
  // let its one-shot reveal finish, then return to the top. Blur the element
  // left focused by the keyboard gate so the evidence is a neutral visual
  // state rather than a screenshot with an accidental focus ring.
  for (const id of EXPECTED_SECTION_ORDER) {
    const section = page.locator(`#${id}`);
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
  }
  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(200);

  const headingVisibility = await page.evaluate(() =>
    ["capabilities", "approach", "why-muse", "faq", "cta"].map((id) => {
      const heading = document.querySelector(`#${id} h2`);
      if (!heading) return { id, present: false, visibleWords: 0, totalWords: 0 };
      const words = Array.from(heading.querySelectorAll("[data-word]"));
      const visibleWords = words.filter((word) => Number.parseFloat(getComputedStyle(word).opacity) >= 0.99).length;
      return { id, present: true, visibleWords, totalWords: words.length };
    }),
  );
  const headingsPass = headingVisibility.every(
    (item) => item.present && item.totalWords > 0 && item.visibleWords === item.totalWords,
  );

  const buffer = await page.screenshot({ fullPage: true });
  const dimensions = pngDimensions(buffer);
  const fileName = `${locale}-${device.name}-home.png`;
  const filePath = path.join(SCREENSHOT_DIR, fileName);
  writeFileSync(filePath, buffer);
  return { path: path.relative(ROOT, filePath), ...dimensions, headingsPass, headingVisibility };
}

async function main() {
  mkdirSync(SCREENSHOT_DIR, { recursive: true });

  console.log(`Starting production server on :${PORT} ...`);
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: ROOT,
    stdio: ["ignore", "pipe", "pipe"],
  });
  server.stdout.on("data", () => {});
  server.stderr.on("data", () => {});

  const results = [];
  const screenshots = [];
  const reducedMotionResults = [];
  let failed = false;

  try {
    await waitForServer(`${BASE_URL}/en`);
    console.log("Server ready. Running checks...");

    const browser = await chromium.launch();

    for (const locale of LOCALES) {
      for (const device of DEVICES) {
        const context = await browser.newContext({
          viewport: { width: device.width, height: device.height },
        });
        const page = await context.newPage();

        const result = await checkRoute(page, locale, device);
        results.push(result);
        const marker = result.pass ? "PASS" : "FAIL";
        console.log(`[${marker}] ${locale}/${device.name} / (status=${result.status})`);
        if (!result.pass) {
          failed = true;
          console.log(`  detail: ${JSON.stringify(result, null, 2)}`);
        }

        const shot = await captureHomeScreenshot(page, locale, device);
        screenshots.push({ locale, device: device.name, ...shot });
        console.log(`  screenshot -> ${shot.path} (${shot.width}x${shot.height}, headings=${shot.headingsPass ? "PASS" : "FAIL"})`);
        if (!shot.headingsPass) failed = true;

        await context.close();
      }
    }

    for (const locale of LOCALES) {
      const device = DEVICES[0];
      const context = await browser.newContext({
        viewport: { width: device.width, height: device.height },
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      const result = await checkRoute(page, locale, device, { reducedMotion: true });
      reducedMotionResults.push(result);
      const marker = result.pass ? "PASS" : "FAIL";
      console.log(`[${marker}] reduced-motion ${locale}/${device.name} / (status=${result.status})`);
      if (!result.pass) failed = true;
      await context.close();
    }

    await browser.close();
  } finally {
    server.kill("SIGTERM");
  }

  const report = {
    locales: LOCALES,
    devices: DEVICES,
    expectedSectionOrder: EXPECTED_SECTION_ORDER,
    results,
    reducedMotionResults,
    screenshots,
  };
  writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
  console.log(`\nReport written to ${path.relative(ROOT, REPORT_PATH)}`);

  if (failed) {
    console.error("\nD4 HOMEPAGE GATE: FAILED");
    process.exit(1);
  }
  console.log("\nD4 HOMEPAGE GATE: PASSED");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
