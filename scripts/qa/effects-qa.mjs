/**
 * Effects/3D QA harness (`docs/effects-3d-implementation-plan.md` §10).
 *
 * Drives a running build (start it first: `npm run build && npm start`,
 * default `http://localhost:3000`, override with `QA_BASE_URL`) with
 * Playwright and checks, per route × viewport × reduced-motion:
 *   - HTTP status
 *   - console errors/warnings and uncaught page errors
 *   - horizontal overflow (`scrollWidth > clientWidth`)
 *   - `noindex` present on demo routes, absent on production routes
 *   - a full-page screenshot
 *
 * `ROUTES` grows as each phase lands a new production surface or demo route —
 * it is not meant to be complete after Phase A. CrosshairCursor (D) is pure
 * SVG/DOM and adds no WebGL context, so live-context counting (the
 * `GlContextMeter` lift called for in §10) is deferred until E1's R3F
 * carousel actually introduces one, via a `window.__museGl` debug counter;
 * until then `contextCount` stays null.
 *
 * Known environment caveat: in a sandboxed/headless container with no GPU and
 * no software-rendering fallback available to Chromium (confirmed here even
 * with `--use-gl=swiftshader`), every existing WebGL surface (Hero's
 * PixelBlast, DitherCursor) fails `WebGLRenderer: Error creating WebGL
 * context` on `/en` and `/ar` regardless of anything this plan changes — this
 * is a property of the box running the harness, not a regression. Run this
 * harness on a machine/CI runner with real or software GPU support for a
 * meaningful console-error signal on WebGL routes.
 *
 * Run: node scripts/qa/effects-qa.mjs
 */
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE_URL = process.env.QA_BASE_URL ?? "http://localhost:3000";
const EVIDENCE_DIR = "/tmp/muse-evidence";
const SCREENSHOT_DIR = "/tmp/muse-qa-screenshots";

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

export const ROUTES = [
  { path: "/en", noindex: false },
  // /ar is legitimately noindex today — it's an unpublished locale serving
  // English copy under Arabic chrome (see PUBLISHED_LOCALES in
  // i18n/routing.ts), not a regression this QA harness should flag.
  { path: "/ar", noindex: true },
  { path: "/en/demo", noindex: true },
  { path: "/ar/demo", noindex: true },
  { path: "/en/demo/magnetic", noindex: true },
  { path: "/ar/demo/magnetic", noindex: true },
  { path: "/en/demo/crosshair", noindex: true },
  { path: "/ar/demo/crosshair", noindex: true },
];

async function checkRoute(browser, route, viewport, { reducedMotion }) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    reducedMotion: reducedMotion ? "reduce" : "no-preference",
  });
  const page = await context.newPage();

  const consoleEntries = [];
  page.on("console", (msg) => {
    if (msg.type() === "error" || msg.type() === "warning") {
      consoleEntries.push({ type: msg.type(), text: msg.text() });
    }
  });
  const pageErrors = [];
  page.on("pageerror", (err) => pageErrors.push(String(err)));

  const url = `${BASE_URL}${route.path}`;
  let status = 0;
  try {
    const response = await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    status = response?.status() ?? 0;
  } catch (err) {
    pageErrors.push(`navigation failed: ${err}`);
  }

  const robotsContent = await page
    .locator('meta[name="robots"]')
    .first()
    .getAttribute("content")
    .catch(() => null);

  const overflow = await page
    .evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
    .catch(() => null);

  const slug = route.path.replace(/\//g, "_") || "root";
  const suffix = reducedMotion ? "_reduced-motion" : "";
  const screenshotPath = path.join(SCREENSHOT_DIR, `${slug}__${viewport.name}${suffix}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true }).catch(() => {});

  await context.close();

  const noindexOk = route.noindex
    ? (robotsContent ?? "").includes("noindex")
    : !(robotsContent ?? "").includes("noindex");

  return {
    path: route.path,
    viewport: viewport.name,
    reducedMotion,
    status,
    consoleEntries,
    pageErrors,
    overflow,
    robotsContent,
    noindexOk,
    contextCount: null,
    screenshotPath,
  };
}

function isPass(result) {
  return (
    result.status > 0 &&
    result.status < 400 &&
    result.consoleEntries.length === 0 &&
    result.pageErrors.length === 0 &&
    result.overflow === false &&
    result.noindexOk
  );
}

async function main() {
  await mkdir(EVIDENCE_DIR, { recursive: true });
  await mkdir(SCREENSHOT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const results = [];

  for (const route of ROUTES) {
    for (const viewport of VIEWPORTS) {
      for (const reducedMotion of [false, true]) {
        const result = await checkRoute(browser, route, viewport, { reducedMotion });
        results.push(result);
        const label = `${route.path} @ ${viewport.name}${reducedMotion ? " (reduced-motion)" : ""}`;
        const pass = isPass(result);
        console.log(`${pass ? "PASS" : "FAIL"}  ${label}`);
        if (!pass) console.log(JSON.stringify(result, null, 2));
      }
    }
  }

  await browser.close();

  const failures = results.filter((r) => !isPass(r));

  await writeFile(
    path.join(EVIDENCE_DIR, "effects-qa-results.json"),
    JSON.stringify(results, null, 2),
  );

  const summary = [
    "# Effects/3D QA summary",
    "",
    `Base URL: ${BASE_URL}`,
    `Routes checked: ${ROUTES.length}. Total checks: ${results.length}. Failures: ${failures.length}.`,
    "",
    "| Route | Viewport | Reduced motion | Status | Console/page errors | Overflow | robots |",
    "|---|---|---|---|---|---|---|",
    ...results.map(
      (r) =>
        `| ${r.path} | ${r.viewport} | ${r.reducedMotion} | ${r.status} | ${r.consoleEntries.length + r.pageErrors.length} | ${r.overflow} | ${r.noindexOk ? "ok" : "FAIL"} |`,
    ),
  ].join("\n");
  await writeFile(path.join(EVIDENCE_DIR, "SUMMARY.md"), summary);

  console.log(`\n${failures.length} failing check(s). Evidence in ${EVIDENCE_DIR}.`);
  if (failures.length > 0) process.exitCode = 1;
}

main();
