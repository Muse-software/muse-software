#!/usr/bin/env node
/**
 * Direction 4 Phase 1 visual gate (docs/three-doors/direction-4-understanding-first.md §11.2).
 *
 * Starts the production server itself (`next start`) against an already-built
 * `.next` output — run `npm run build` first — then, for `en` and `ar` at
 * 1440x900 and 390x844:
 *
 *   1. Loads "/", "/start", "/start?intent=build", "/start?intent=improve",
 *      "/start?intent=ai" and asserts HTTP 200 and correct <html lang>/dir.
 *   2. Asserts no horizontal overflow (scrollWidth vs clientWidth, and a
 *      scrollTo(9999,0) probe).
 *   3. On "/", asserts exactly three intent links exist
 *      (a[href*="/start?intent="]) with the expected build/improve/ai hrefs.
 *   4. Collects console + pageerror events. One known, accounted-for
 *      condition is allow-listed rather than hidden: this sandboxed headless
 *      Chromium cannot create a WebGL context (verified separately:
 *      SwiftShader software rasterizer, "BindToCurrentSequence failed"), so
 *      PixelBlast's capability probe (components/PixelBlast.tsx) logs one
 *      `console.warn` and skips mounting the renderer instead of crashing —
 *      that warning is allow-listed, every OTHER console error or pageerror
 *      fails the gate.
 *   5. On "/" only, captures a stitched screenshot spanning #hero through
 *      #intents (Hero + IntentRouter, the only two sections this gate
 *      reviews) to docs/three-doors/_verify-d4/<locale>-<device>-home.png,
 *      and asserts its decoded pixel dimensions are wider than one viewport
 *      tall — proof it is not just a viewport-sized capture.
 *   6. Runs one reduced-motion pass per locale (desktop viewport, "/"):
 *      `reducedMotion: "reduce"` context, same status/error assertions.
 *
 * Usage: npm run build && node scripts/d4-verify.mjs
 */

import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PORT = 3947;
const BASE_URL = `http://localhost:${PORT}`;
const SCREENSHOT_DIR = path.join(ROOT, "docs/three-doors/_verify-d4");
const REPORT_PATH = path.join(SCREENSHOT_DIR, "report.json");

const LOCALES = ["en", "ar"];
const DEVICES = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];
const ROUTES = ["/", "/start", "/start?intent=build", "/start?intent=improve", "/start?intent=ai"];
const EXPECTED_DIR = { en: "ltr", ar: "rtl" };
const EXPECTED_INTENTS = ["build", "improve", "ai"];

// The one accounted-for console message — see the module doc comment.
const KNOWN_WEBGL_SANDBOX_WARNING = /\[PixelBlast\] WebGL unavailable/;

/** Reads width/height straight out of a PNG's IHDR chunk (bytes 16-23),
 *  rather than pulling in an image-decoding dependency for two integers. */
function pngDimensions(buffer) {
  if (buffer.length < 24 || buffer.toString("ascii", 12, 16) !== "IHDR") {
    throw new Error("not a well-formed PNG (missing IHDR at the expected offset)");
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

async function checkIntentLinks(page, locale) {
  const hrefs = await page.$$eval('a[href*="/start?intent="]', (els) => els.map((el) => el.getAttribute("href")));
  const expected = EXPECTED_INTENTS.map((intent) => `/${locale}/start?intent=${intent}`);
  const missing = expected.filter((href) => !hrefs.includes(href));
  const extra = hrefs.filter((href) => !expected.includes(href));
  return { pass: missing.length === 0 && extra.length === 0 && hrefs.length === 3, hrefs, expected, missing, extra };
}

async function checkRoute(page, locale, device, routePath, { reducedMotion = false } = {}) {
  const url = `${BASE_URL}/${locale}${routePath}`;
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
  let intentLinks = null;

  try {
    const response = await page.goto(url, { waitUntil: "networkidle", timeout: 20_000 });
    status = response ? response.status() : null;
    await page.waitForTimeout(300); // let the WebGL probe (or failure) settle

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

    if (routePath === "/") {
      intentLinks = await checkIntentLinks(page, locale);
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
  const okIntentLinks = intentLinks === null || intentLinks.pass;
  const pass = !navError && okStatus && okLang && okDir && okOverflow && okErrors && okIntentLinks;

  return {
    route: routePath,
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
    intentLinks,
    navError,
  };
}

async function captureHomeScreenshot(page, locale, device) {
  const heroBox = await page.locator("#hero").boundingBox();
  const intentsBox = await page.locator("#intents").boundingBox();
  if (!heroBox || !intentsBox) {
    throw new Error(`#hero/#intents not found for ${locale}/${device.name}`);
  }
  const clip = {
    x: 0,
    y: heroBox.y,
    width: device.width,
    height: intentsBox.y + intentsBox.height - heroBox.y,
    scale: 1,
  };
  // `page.screenshot({ clip })` alone clamps to the current viewport (measured:
  // a clip taller than the viewport silently came back viewport-sized). Hero
  // can be `h-screen` and fill the whole first viewport on desktop, so a plain
  // clipped screenshot could never also reach IntentRouter below it. The CDP
  // `captureBeyondViewport` flag captures the requested region without
  // resizing the viewport (which would itself change Hero's `h-screen`/`vh`
  // height and invalidate the boxes just measured).
  const client = await page.context().newCDPSession(page);
  const { data } = await client.send("Page.captureScreenshot", {
    format: "png",
    clip,
    captureBeyondViewport: true,
  });
  await client.detach();
  const buffer = Buffer.from(data, "base64");
  const dims = pngDimensions(buffer);
  const fileName = `${locale}-${device.name}-home.png`;
  const filePath = path.join(SCREENSHOT_DIR, fileName);
  writeFileSync(filePath, buffer);
  return {
    path: path.relative(ROOT, filePath),
    width: dims.width,
    height: dims.height,
    viewportHeight: device.height,
    // The whole point of the CDP capture: proof the artifact is not just a
    // viewport-sized screenshot mislabelled as "Hero + IntentRouter".
    exceedsViewport: dims.height > device.height,
  };
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

        for (const route of ROUTES) {
          const result = await checkRoute(page, locale, device, route);
          results.push(result);
          const marker = result.pass ? "PASS" : "FAIL";
          console.log(`[${marker}] ${locale}/${device.name} ${route} (status=${result.status})`);
          if (!result.pass) {
            failed = true;
            if (result.consoleErrors.length) console.log(`  console errors: ${JSON.stringify(result.consoleErrors)}`);
            if (result.pageErrors.length) console.log(`  page errors: ${JSON.stringify(result.pageErrors)}`);
            if (result.intentLinks && !result.intentLinks.pass) console.log(`  intent links: ${JSON.stringify(result.intentLinks)}`);
          }
        }

        // Home screenshot: reload once more, cleanly, for a stable capture.
        await page.goto(`${BASE_URL}/${locale}/`, { waitUntil: "networkidle" });
        await page.waitForTimeout(300);
        const shot = await captureHomeScreenshot(page, locale, device);
        screenshots.push({ locale, device: device.name, ...shot });
        const shotMarker = shot.exceedsViewport ? "PASS" : "FAIL";
        console.log(
          `  [${shotMarker}] screenshot -> ${shot.path} (${shot.width}x${shot.height}, viewport ${device.width}x${device.height})`
        );
        if (!shot.exceedsViewport) failed = true;

        await context.close();
      }
    }

    // Reduced-motion pass: one per locale, desktop viewport, home route only.
    for (const locale of LOCALES) {
      const device = DEVICES[0];
      const context = await browser.newContext({
        viewport: { width: device.width, height: device.height },
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      const result = await checkRoute(page, locale, device, "/", { reducedMotion: true });
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
    generatedRoutes: ROUTES,
    locales: LOCALES,
    devices: DEVICES,
    results,
    reducedMotionResults,
    screenshots,
  };
  writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
  console.log(`\nReport written to ${path.relative(ROOT, REPORT_PATH)}`);

  if (failed) {
    console.error("\nD4 VISUAL GATE: FAILED");
    process.exit(1);
  }
  console.log("\nD4 VISUAL GATE: PASSED");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
