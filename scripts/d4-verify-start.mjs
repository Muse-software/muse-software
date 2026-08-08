#!/usr/bin/env node
/**
 * Direction 4 Phase 4 gate (docs/three-doors/direction-4-understanding-first.md
 * §10, §11.5, §12.5): the real guided `/start` conversation.
 *
 * Starts a production server (`next start` against an already-built `.next`
 * output — run `npm run build` first) and drives the actual UI with
 * Playwright. Structural contract this script assumes (and the component
 * must satisfy):
 *
 *   - `[data-testid="screen-0"]` / `"screen-1"` / `"screen-2"` wrap each step.
 *   - Screen 0 is a radiogroup of `input[name="intent"]`, values
 *     build|improve|ai|capability|unsure.
 *   - Screen 1's single-choice question is `input[name="contextChoice"]`,
 *     stable English `value`s.
 *   - `[data-testid="skip-to-contact"]` appears on screens 0 and 1.
 *   - `[data-testid="back-button"]` appears on screens 1 and 2.
 *   - `[data-testid="continue-button"]` advances screen 1 -> 2.
 *   - `[data-testid="step-heading"]` is the focus target on every step change.
 *   - `[data-testid="progress-live"]` is an aria-live=polite region.
 *   - Screen 2: `#firstName`, `#email`, `#phone`, `#company`,
 *     `input[name="preferredContact"]` (call|write), `input[name="website"]`
 *     honeypot, submit `button[type="submit"]`.
 *   - `[data-testid="success"]` with `data-delivered="true|false"` on submit.
 *   - `[role="alert"]` for both the phone-required-for-call error and any
 *     server/network error.
 *
 * Usage: npm run build && node scripts/d4-verify-start.mjs
 */

import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PORT = 3949;
const BASE_URL = `http://localhost:${PORT}`;
const OUT_DIR = path.join(ROOT, "docs/three-doors/_verify-d4-start");
const REPORT_PATH = path.join(OUT_DIR, "report.json");

const LOCALES = ["en", "ar"];
const DEVICES = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];
const EXPECTED_DIR = { en: "ltr", ar: "rtl" };
const KNOWN_WEBGL_SANDBOX_WARNING = /\[PixelBlast\] WebGL unavailable/;

const DEEP_LINK_INTENTS = ["build", "improve", "ai", "capability"];

const results = [];
let anyFail = false;

function record(name, pass, detail) {
  results.push({ name, pass, detail: detail ?? null });
  console.log(`[${pass ? "PASS" : "FAIL"}] ${name}`);
  if (!pass) {
    anyFail = true;
    console.log(`  detail: ${JSON.stringify(detail, null, 2)}`);
  }
  return pass;
}

async function responseJsonOrText(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

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

function collectPageErrors(page) {
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (msg) => {
    const text = msg.text();
    if (KNOWN_WEBGL_SANDBOX_WARNING.test(text)) return;
    if (msg.type() === "error") consoleErrors.push(text);
  });
  page.on("pageerror", (err) => pageErrors.push(err.message));
  return { consoleErrors, pageErrors };
}

async function checkOverflow(page) {
  return page.evaluate(() => {
    const el = document.scrollingElement;
    const before = el.scrollWidth > el.clientWidth + 1;
    window.scrollTo(9999, 0);
    const scrolledX = window.scrollX;
    window.scrollTo(0, 0);
    return { overflow: before, scrolledX };
  });
}

// ---------------------------------------------------------------------------
// Phase A: SSR shell — /start with no intent, and each deep link, en+ar x
// desktop+mobile. Status, lang/dir, overflow, console/page errors.
// ---------------------------------------------------------------------------
async function phaseA(browser) {
  for (const locale of LOCALES) {
    for (const device of DEVICES) {
      const context = await browser.newContext({ viewport: { width: device.width, height: device.height } });
      const page = await context.newPage();
      const { consoleErrors, pageErrors } = collectPageErrors(page);

      const response = await page.goto(`${BASE_URL}/${locale}/start`, { waitUntil: "networkidle", timeout: 20_000 });
      await page.waitForTimeout(200);
      const status = response ? response.status() : null;
      const { lang, dir } = await page.evaluate(() => ({ lang: document.documentElement.lang, dir: document.documentElement.dir }));
      const overflow = await checkOverflow(page);
      const screen0Count = await page.locator('[data-testid="screen-0"]').count();
      const radioCount = await page.locator('input[name="intent"]').count();
      const progressVisible = await page.locator('[data-testid="progress-visible"]').isVisible().catch(() => false);
      const intentGeometry = await page.locator('label:has(input[name="intent"])').evaluateAll((nodes) =>
        nodes.map((node) => {
          const rect = node.getBoundingClientRect();
          return { width: rect.width, height: rect.height };
        }),
      );
      const intentGeometryOk = intentGeometry.length === 5 && intentGeometry.every((item) =>
        item.height >= 48 && (device.name !== "mobile" || item.width >= 340)
      );

      record(`A shell ${locale}/${device.name} /start`, status === 200 && lang === locale && dir === EXPECTED_DIR[locale] && !overflow.overflow && overflow.scrolledX === 0 && consoleErrors.length === 0 && pageErrors.length === 0 && screen0Count === 1 && radioCount === 5 && progressVisible && intentGeometryOk, {
        status, lang, dir, overflow, consoleErrors, pageErrors, screen0Count, radioCount, progressVisible, intentGeometry,
      });

      await context.close();
    }
  }

  // Deep links land on Screen 1, pre-selected, for en+ar desktop.
  for (const locale of LOCALES) {
    for (const intent of DEEP_LINK_INTENTS) {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      const { consoleErrors, pageErrors } = collectPageErrors(page);
      const response = await page.goto(`${BASE_URL}/${locale}/start?intent=${intent}`, { waitUntil: "networkidle", timeout: 20_000 });
      await page.waitForTimeout(200);
      const status = response ? response.status() : null;
      const screen0Count = await page.locator('[data-testid="screen-0"]').count();
      const screen1Count = await page.locator('[data-testid="screen-1"]').count();
      const hasQ2 = await page.locator('input[name="contextChoice"]').count();
      record(`A deep-link ${locale} intent=${intent}`, status === 200 && screen0Count === 0 && screen1Count === 1 && hasQ2 > 0 && consoleErrors.length === 0 && pageErrors.length === 0, {
        status, screen0Count, screen1Count, hasQ2, consoleErrors, pageErrors,
      });
      await context.close();
    }

    // unsure and unknown values are not documented deep-link entry points -> Screen 0.
    for (const bogus of ["unsure", "nonsense"]) {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      await page.goto(`${BASE_URL}/${locale}/start?intent=${bogus}`, { waitUntil: "networkidle", timeout: 20_000 });
      await page.waitForTimeout(200);
      const screen0Count = await page.locator('[data-testid="screen-0"]').count();
      record(`A unknown-intent ${locale} intent=${bogus} shows Screen 0`, screen0Count === 1, { screen0Count });
      await context.close();
    }
  }
}

// ---------------------------------------------------------------------------
// Phase B: drive all five branches through to contact (EN desktop), asserting
// the intercepted POST body per branch. Also a lighter AR pass (unsure +
// build) to prove the branching logic isn't locale-coupled.
// ---------------------------------------------------------------------------
const BRANCH_SPECS = {
  build: { q1: "#q1", q2Value: "A working prototype", hasQ1: true },
  improve: { q1: "#q1", q2Value: "A rethink", hasQ1: true },
  ai: { q1: null, q2Value: "Customers", hasQ1: false },
  capability: { q1: "#q1", q2Value: "AI", hasQ1: true },
  unsure: { q1: null, q2Value: null, hasQ1: false },
};

async function driveToContact(page, locale, intent) {
  await page.goto(`${BASE_URL}/${locale}/start`, { waitUntil: "networkidle", timeout: 20_000 });
  await page.locator(`input[name="intent"][value="${intent}"]`).click();
  const spec = BRANCH_SPECS[intent];
  if (intent !== "unsure") {
    await page.locator('[data-testid="screen-1"]').waitFor({ state: "visible" });
    if (spec.hasQ1) await page.locator(spec.q1).fill("Playwright-authored test detail.");
    await page.locator(`input[name="contextChoice"][value="${spec.q2Value}"]`).click();
    await page.locator('[data-testid="continue-button"]').click();
  }
  await page.locator('[data-testid="screen-2"]').waitFor({ state: "visible" });
}

async function fillContact(page, { phone = "", preferredContact = "write" } = {}) {
  await page.locator("#firstName").fill("Playwright");
  await page.locator("#email").fill("playwright@example.com");
  if (phone) await page.locator("#phone").fill(phone);
  await page.locator(`input[name="preferredContact"][value="${preferredContact}"]`).click();
}

async function phaseB(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  collectPageErrors(page);

  for (const intent of Object.keys(BRANCH_SPECS)) {
    let captured = null;
    await page.route("**/api/get-started", async (route) => {
      captured = route.request().postDataJSON();
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, delivered: true }) });
    });

    await driveToContact(page, "en", intent);
    await fillContact(page, { preferredContact: intent === "ai" ? "call" : "write", phone: intent === "ai" ? "+966500000000" : "" });
    await page.locator('button[type="submit"]').click();
    await page.locator('[data-testid="success"]').waitFor({ state: "visible", timeout: 10_000 });

    const bodyOk = Boolean(captured);
    const sourceOk = captured?.source === "start";
    const needsOk = typeof captured?.needs === "string" && captured.needs.length > 0;
    const noFakeNames = !("lastName" in (captured ?? {})) && !("jobTitle" in (captured ?? {}));
    const needsContainsIntent = intent === "unsure" ? true : captured?.needs?.includes(BRANCH_SPECS[intent].q2Value);

    record(`B branch ${intent} posts source:start with human-readable needs`, bodyOk && sourceOk && needsOk && noFakeNames && needsContainsIntent, captured);

    await page.unroute("**/api/get-started");
  }

  await context.close();
}

// ---------------------------------------------------------------------------
// Phase C: honest success split (delivered true/false), and a call request's
// success copy differs from a write request's.
// ---------------------------------------------------------------------------
async function phaseC(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  collectPageErrors(page);

  for (const delivered of [true, false]) {
    await page.route("**/api/get-started", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, delivered }) }),
    );
    await driveToContact(page, "en", "build");
    await fillContact(page);
    await page.waitForFunction(() => {
      const selected = document.querySelector('label[data-selected="true"]');
      if (!(selected instanceof HTMLElement)) return false;
      const background = getComputedStyle(selected).backgroundColor;
      const rgba = background.match(/^rgba?\([^,]+,[^,]+,[^,]+(?:,\s*([\d.]+))?\)$/);
      const alpha = rgba ? Number(rgba[1] ?? 1) : 0;
      return alpha >= 0.08;
    });
    const contactStyles = await page.locator('label:has(input[name="preferredContact"])').evaluateAll((nodes) =>
      nodes.map((node) => {
        const style = getComputedStyle(node);
        const input = node.querySelector("input");
        return {
          checked: input instanceof HTMLInputElement && input.checked,
          selectedAttr: node.getAttribute("data-selected"),
          inlineBackground: node instanceof HTMLElement ? node.style.backgroundColor : "",
          backgroundColor: style.backgroundColor,
          borderColor: style.borderColor,
          color: style.color,
        };
      }),
    );
    const actions = await page.locator('[data-testid="contact-actions"] button').evaluateAll((nodes) =>
      nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return { left: rect.left, right: rect.right };
      }),
    );
    const actionGap = actions.length === 2
      ? Math.max(actions[0].left, actions[1].left) - Math.min(actions[0].right, actions[1].right)
      : Infinity;
    await page.locator('button[type="submit"]').click();
    const success = page.locator('[data-testid="success"]');
    await success.waitFor({ state: "visible", timeout: 10_000 });
    const deliveredAttr = await success.getAttribute("data-delivered");
    const text = await success.innerText();
    const outcomeRole = await page.locator('[data-testid="outcome-region"]').getAttribute("role");
    const headingFocused = await page.evaluate(() => document.activeElement?.getAttribute("data-testid") === "step-heading");
    const truthOk = delivered
      ? text.toLowerCase().includes("close this page")
      : text.toLowerCase().includes("not sent");
    const roleOk = delivered ? outcomeRole === "status" : outcomeRole === "alert";
    const selectedStyle = contactStyles.find((item) => item.checked);
    const unselectedStyle = contactStyles.find((item) => !item.checked);
    const selectedOk = Boolean(
      selectedStyle &&
      unselectedStyle &&
      selectedStyle.selectedAttr === "true" &&
      unselectedStyle.selectedAttr === "false" &&
      selectedStyle.inlineBackground.length > 0 &&
      !selectedStyle.backgroundColor.endsWith("/ 0)") &&
      selectedStyle.backgroundColor !== "rgba(0, 0, 0, 0)" &&
      selectedStyle.backgroundColor !== unselectedStyle.backgroundColor,
    );
    record(
      `C outcome delivered=${delivered}`,
      deliveredAttr === String(delivered) && truthOk && roleOk && headingFocused && selectedOk && actionGap >= 0 && actionGap <= 32,
      { deliveredAttr, text, outcomeRole, headingFocused, contactStyles, selectedOk, actionGap },
    );

    if (!delivered) {
      const fallbacks = await page.locator('[data-testid="outcome-region"] a').evaluateAll((nodes) =>
        nodes.map((node) => ({
          href: node.getAttribute("href"),
          detailDir: node.querySelector("span")?.getAttribute("dir"),
        })),
      );
      record(
        "C undelivered fallbacks are full links with LTR-isolated details",
        fallbacks.length === 2 &&
          fallbacks.some((item) => item.href?.startsWith("https://wa.me/")) &&
          fallbacks.some((item) => item.href?.startsWith("mailto:")) &&
          fallbacks.every((item) => item.detailDir === "ltr"),
        fallbacks,
      );
    }
    await page.unroute("**/api/get-started");
  }

  await context.close();
}

// ---------------------------------------------------------------------------
// Phase D: server failure -> role=alert, fields retained.
// ---------------------------------------------------------------------------
async function phaseD(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  collectPageErrors(page);

  await page.route("**/api/get-started", (route) =>
    route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ ok: false, code: "generic", error: "boom" }) }),
  );
  await driveToContact(page, "en", "build");
  await fillContact(page, { preferredContact: "write" });
  await page.locator("#firstName").fill("Retry Me");
  await page.locator('button[type="submit"]').click();
  await page.locator('[data-testid="screen-2"] [role="alert"]').first().waitFor({ state: "visible", timeout: 10_000 });
  const alertVisible = await page.locator('[data-testid="screen-2"] [role="alert"]').first().isVisible();
  const firstNameStillThere = await page.locator("#firstName").inputValue();
  record("D server failure shows role=alert and retains fields", alertVisible && firstNameStillThere === "Retry Me", { alertVisible, firstNameStillThere });

  await page.unroute("**/api/get-started");
  await context.close();
}

// ---------------------------------------------------------------------------
// Phase E: validation — missing required fields (native), invalid email
// (server-shaped mock), call without phone (custom role=alert, no POST).
// ---------------------------------------------------------------------------
async function phaseE(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  collectPageErrors(page);

  // Missing required fields: native constraint validation blocks submit.
  await driveToContact(page, "en", "build");
  await page.locator(`input[name="preferredContact"][value="write"]`).click();
  let posted = false;
  await page.route("**/api/get-started", async (route) => {
    posted = true;
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, delivered: true }) });
  });
  await page.locator('button[type="submit"]').click();
  await page.waitForTimeout(300);
  const firstNameValid = await page.locator("#firstName").evaluate((el) => el.checkValidity());
  record("E missing required fields blocks submit (native)", posted === false && firstNameValid === false, { posted, firstNameValid });
  await page.unroute("**/api/get-started");

  // Context is intentionally light, but it is still required unless the
  // visitor uses the explicit skip-to-contact path.
  await page.goto(`${BASE_URL}/en/start?intent=build`, { waitUntil: "networkidle", timeout: 20_000 });
  await page.locator('[data-testid="continue-button"]').click();
  await page.waitForTimeout(200);
  const stayedOnContext = await page.locator('[data-testid="screen-1"]').isVisible();
  const contextAlertVisible = await page.locator('[data-testid="context-error"][role="alert"]').isVisible().catch(() => false);
  record("E empty required context cannot advance", stayedOnContext && contextAlertVisible, { stayedOnContext, contextAlertVisible });

  // Invalid email format: local validation mirrors the server's stricter
  // dotted-domain rule, associates the alert, and sends no request.
  await driveToContact(page, "en", "build");
  await page.locator("#firstName").fill("Playwright");
  await page.locator("#email").fill("test@localhost");
  await page.locator(`input[name="preferredContact"][value="write"]`).click();
  let postedEmail = false;
  await page.route("**/api/get-started", async (route) => {
    postedEmail = true;
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, delivered: true }) });
  });
  await page.locator('button[type="submit"]').click();
  const emailAlert = page.locator("#email-error");
  await emailAlert.waitFor({ state: "visible", timeout: 10_000 });
  const emailAlertText = (await emailAlert.innerText()).trim();
  const emailDescribedBy = await page.locator("#email").getAttribute("aria-describedby");
  record("E invalid email is blocked locally and linked to alert", !postedEmail && emailAlertText.length > 0 && emailDescribedBy === "email-error", { postedEmail, emailAlertText, emailDescribedBy });
  await page.unroute("**/api/get-started");

  // Call without phone: custom client-side block, no POST, role=alert.
  await driveToContact(page, "en", "build");
  await page.locator("#firstName").fill("Playwright");
  await page.locator("#email").fill("playwright@example.com");
  await page.locator(`input[name="preferredContact"][value="call"]`).click();
  let postedCall = false;
  await page.route("**/api/get-started", async (route) => {
    postedCall = true;
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, delivered: true }) });
  });
  await page.locator('button[type="submit"]').click();
  await page.waitForTimeout(300);
  const phoneAlert = page.locator("#phone-error");
  const phoneAlertVisible = await phoneAlert.isVisible().catch(() => false);
  record("E call without phone blocks with localized error, no POST", postedCall === false && phoneAlertVisible, { postedCall, phoneAlertVisible });
  await page.unroute("**/api/get-started");

  await context.close();
}

// ---------------------------------------------------------------------------
// Phase F: keyboard-only path (arrows, Space/Enter on radios, Back,
// skip-to-contact, focus-visible, heading focus on step change).
// ---------------------------------------------------------------------------
async function phaseF(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  collectPageErrors(page);

  await page.goto(`${BASE_URL}/en/start`, { waitUntil: "networkidle", timeout: 20_000 });
  await page.locator('input[name="intent"][value="build"]').focus();
  await page.keyboard.press("ArrowDown"); // build -> improve, native radio auto-select
  await page.locator('[data-testid="screen-1"]').waitFor({ state: "visible", timeout: 5_000 });
  const headingFocusedAfterSelect = await page.evaluate(() => document.activeElement?.getAttribute("data-testid") === "step-heading");

  const backBtn = page.locator('[data-testid="back-button"]');
  await backBtn.focus();
  await page.keyboard.press("Enter");
  await page.locator('[data-testid="screen-0"]').waitFor({ state: "visible", timeout: 5_000 });
  const backWorked = await page.locator('[data-testid="screen-0"]').isVisible();

  const skipBtn = page.locator('[data-testid="skip-to-contact"]').first();
  await skipBtn.focus();
  const skipFocusVisible = await skipBtn.evaluate((el) => el === document.activeElement);
  await page.keyboard.press("Enter");
  await page.locator('[data-testid="screen-2"]').waitFor({ state: "visible", timeout: 5_000 });
  const headingFocusedAfterSkip = await page.evaluate(() => document.activeElement?.getAttribute("data-testid") === "step-heading");

  record("F keyboard-only path (radio select, back, skip, heading focus)", headingFocusedAfterSelect && backWorked && skipFocusVisible && headingFocusedAfterSkip, {
    headingFocusedAfterSelect, backWorked, skipFocusVisible, headingFocusedAfterSkip,
  });

  await context.close();
}

// ---------------------------------------------------------------------------
// Phase G: browser Back / query coherence.
// ---------------------------------------------------------------------------
async function phaseG(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  collectPageErrors(page);

  await page.goto(`${BASE_URL}/en/start`, { waitUntil: "networkidle", timeout: 20_000 });
  await page.locator('input[name="intent"][value="improve"]').click();
  await page.locator('[data-testid="screen-1"]').waitFor({ state: "visible" });
  const urlAfterSelect = page.url();

  await page.goBack();
  await page.waitForTimeout(300);
  const screen0Visible = await page.locator('[data-testid="screen-0"]').isVisible();
  const urlAfterBack = page.url();

  record("G browser Back restores Screen 0 and clears query", urlAfterSelect.includes("intent=improve") && screen0Visible && !urlAfterBack.includes("intent="), {
    urlAfterSelect, urlAfterBack, screen0Visible,
  });

  await context.close();
}

// ---------------------------------------------------------------------------
// Phase H: reduced motion, en+ar, full flow completes.
// ---------------------------------------------------------------------------
async function phaseH(browser) {
  for (const locale of LOCALES) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    const page = await context.newPage();
    collectPageErrors(page);

    await page.route("**/api/get-started", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, delivered: true }) }),
    );
    await driveToContact(page, locale, "build");
    await fillContact(page);
    await page.locator('button[type="submit"]').click();
    const success = page.locator('[data-testid="success"]');
    const ok = await success.waitFor({ state: "visible", timeout: 10_000 }).then(() => true).catch(() => false);
    record(`H reduced-motion ${locale} flow completes`, ok, { ok });

    await page.unroute("**/api/get-started");
    await context.close();
  }
}

// ---------------------------------------------------------------------------
// Phase I: direct API proof — exactly 5 real calls (rate limit is 5/60s/IP,
// and local requests share one bucket since there's no forwarding header).
// ---------------------------------------------------------------------------
async function phaseI(browser) {
  const context = await browser.newContext();
  const req = context.request;

  const nullBody = await req.post(`${BASE_URL}/api/get-started`, {
    headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.101" },
    data: null,
  });
  const nullBodyJson = await responseJsonOrText(nullBody);
  record(
    "I null JSON body rejects as invalid_body",
    nullBody.status() === 400 && nullBodyJson.code === "invalid_body",
    { status: nullBody.status(), body: nullBodyJson },
  );

  const arrayBody = await req.post(`${BASE_URL}/api/get-started`, {
    headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.102" },
    data: [],
  });
  const arrayBodyJson = await responseJsonOrText(arrayBody);
  record(
    "I array JSON body rejects as invalid_body",
    arrayBody.status() === 400 && arrayBodyJson.code === "invalid_body",
    { status: arrayBody.status(), body: arrayBodyJson },
  );

  const objectField = await req.post(`${BASE_URL}/api/get-started`, {
    headers: { "x-forwarded-for": "203.0.113.103" },
    data: {
      source: "start",
      firstName: { nested: "A" },
      email: "a@example.com",
      needs: ["test"],
      preferredContact: "write",
    },
  });
  const objectFieldJson = await responseJsonOrText(objectField);
  record(
    "I non-string accepted fields reject as invalid_body",
    objectField.status() === 400 && objectFieldJson.code === "invalid_body",
    { status: objectField.status(), body: objectFieldJson },
  );

  const r1 = await req.post(`${BASE_URL}/api/get-started`, {
    data: { firstName: "A", email: "a@example.com", needs: "test" }, // legacy shape, missing lastName/phone/company/jobTitle
  });
  record("I legacy submission missing fields still rejects", r1.status() === 400, { status: r1.status(), body: await r1.json() });

  const r2 = await req.post(`${BASE_URL}/api/get-started`, {
    data: { source: "start", firstName: "A", email: "a@example.com", needs: "test" },
  });
  const r2body = await r2.json();
  record("I source:start missing preferredContact rejects", r2.status() === 400 && r2body.code === "missing_fields", { status: r2.status(), body: r2body });

  const r3 = await req.post(`${BASE_URL}/api/get-started`, {
    data: { source: "start", firstName: "A", email: "a@example.com", needs: "test", preferredContact: "call" },
  });
  const r3body = await r3.json();
  record("I source:start call without phone rejects with phone_required_for_call", r3.status() === 400 && r3body.code === "phone_required_for_call", { status: r3.status(), body: r3body });

  const r4 = await req.post(`${BASE_URL}/api/get-started`, {
    data: { source: "start", firstName: "A", email: "a@example.com", needs: "test", preferredContact: "call", phone: "+966500000000" },
  });
  record("I source:start call with phone accepts without legacy fields", r4.status() === 200, { status: r4.status(), body: await r4.json() });

  const r5 = await req.post(`${BASE_URL}/api/get-started`, {
    data: { source: "start", firstName: "A", email: "a@example.com", needs: "test", preferredContact: "write" },
  });
  record("I source:start write accepts without phone or legacy fields", r5.status() === 200, { status: r5.status(), body: await r5.json() });

  const rateStatuses = [];
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const response = await req.post(`${BASE_URL}/api/get-started`, {
      headers: { "x-forwarded-for": "203.0.113.104" },
      data: {},
    });
    rateStatuses.push(response.status());
  }
  record(
    "I rate limit allows five requests and rejects the sixth",
    rateStatuses.slice(0, 5).every((status) => status === 400) && rateStatuses[5] === 429,
    { rateStatuses },
  );

  await context.close();
}

// ---------------------------------------------------------------------------
// Phase J: visual evidence — initial, context, contact, both success states,
// en+ar x desktop+mobile.
// ---------------------------------------------------------------------------
async function shoot(page, name, dir) {
  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement && document.activeElement.getAttribute("data-testid") !== "step-heading") {
      document.activeElement.blur();
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(150);
  const buffer = await page.screenshot({ fullPage: true });
  const dims = pngDimensions(buffer);
  const filePath = path.join(dir, `${name}.png`);
  writeFileSync(filePath, buffer);
  return { name, path: path.relative(ROOT, filePath), ...dims };
}

async function phaseJ(browser) {
  const shots = [];
  for (const locale of LOCALES) {
    for (const device of DEVICES) {
      const context = await browser.newContext({ viewport: { width: device.width, height: device.height } });
      const page = await context.newPage();
      collectPageErrors(page);
      const prefix = `${locale}-${device.name}`;

      await page.goto(`${BASE_URL}/${locale}/start`, { waitUntil: "networkidle", timeout: 20_000 });
      shots.push(await shoot(page, `${prefix}-1-initial`, OUT_DIR));

      await page.locator('input[name="intent"][value="build"]').click();
      await page.locator('[data-testid="screen-1"]').waitFor({ state: "visible" });
      shots.push(await shoot(page, `${prefix}-2-context`, OUT_DIR));

      await page.locator("#q1").fill("A real product idea that needs a working first version.");
      await page.locator(`input[name="contextChoice"][value="A working prototype"]`).click();
      await page.locator('[data-testid="continue-button"]').click();
      await page.locator('[data-testid="screen-2"]').waitFor({ state: "visible" });
      shots.push(await shoot(page, `${prefix}-3-contact`, OUT_DIR));

      await fillContact(page);
      await page.route("**/api/get-started", (route) =>
        route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, delivered: true }) }),
      );
      await page.locator('button[type="submit"]').click();
      await page.locator('[data-testid="success"]').waitFor({ state: "visible", timeout: 10_000 });
      shots.push(await shoot(page, `${prefix}-4-success-delivered`, OUT_DIR));
      await page.unroute("**/api/get-started");

      await page.goto(`${BASE_URL}/${locale}/start?intent=build`, { waitUntil: "networkidle", timeout: 20_000 });
      await page.locator("#q1").fill("A product idea for the noted-state evidence.");
      await page.locator(`input[name="contextChoice"][value="Just an idea"]`).click();
      await page.locator('[data-testid="continue-button"]').click();
      await page.locator('[data-testid="screen-2"]').waitFor({ state: "visible" });
      await fillContact(page);
      await page.route("**/api/get-started", (route) =>
        route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, delivered: false }) }),
      );
      await page.locator('button[type="submit"]').click();
      await page.locator('[data-testid="success"]').waitFor({ state: "visible", timeout: 10_000 });
      shots.push(await shoot(page, `${prefix}-5-success-noted`, OUT_DIR));
      await page.unroute("**/api/get-started");

      await context.close();
    }
  }
  return shots;
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  console.log(`Starting production server on :${PORT} ...`);
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] });
  server.stdout.on("data", () => {});
  server.stderr.on("data", () => {});

  let screenshots = [];
  try {
    await waitForServer(`${BASE_URL}/en`);
    console.log("Server ready. Running checks...");

    const browser = await chromium.launch();

    await phaseA(browser);
    await phaseB(browser);
    await phaseC(browser);
    await phaseD(browser);
    await phaseE(browser);
    await phaseF(browser);
    await phaseG(browser);
    await phaseH(browser);
    await phaseI(browser);
    screenshots = await phaseJ(browser);

    await browser.close();
  } finally {
    server.kill("SIGTERM");
  }

  const report = { results, screenshots };
  writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
  console.log(`\nReport written to ${path.relative(ROOT, REPORT_PATH)}`);
  console.log(`\n${results.filter((r) => r.pass).length}/${results.length} checks passed.`);

  if (anyFail) {
    console.error("\nD4 START GATE: FAILED");
    process.exit(1);
  }
  console.log("\nD4 START GATE: PASSED");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
