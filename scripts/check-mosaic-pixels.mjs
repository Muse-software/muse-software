import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "./browser-runtime.mjs";

const baseUrl = (process.env.MUSE_TEST_URL || "http://127.0.0.1:3106").replace(/\/$/, "");
const output = resolve(process.env.MUSE_PIXEL_OUTPUT || process.env.MUSE_TEST_OUTPUT ||
  fileURLToPath(new URL("../test-results/pixels/", import.meta.url)));
mkdirSync(output, { recursive: true });
const results = [];
const blockedMutations = [];
const browser = await launchBrowser();
const heroCanvas = ".mosaic-hero-pixels canvas";
const cardCanvas = ".mosaic-card-field canvas";
const hash = (buffer) => createHash("sha256").update(buffer).digest("hex");
const delay = (ms) => new Promise((done) => setTimeout(done, ms));

async function check(name, locale, options, test) {
  const started = Date.now();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2,
    reducedMotion: "no-preference", ...options,
  });
  context.setDefaultTimeout(12_000);
  const errors = [];
  const requests = [];
  await context.route("**/*", async (route) => {
    const request = route.request();
    if (!["GET", "HEAD"].includes(request.method())) {
      const blocked = { check: name, locale, method: request.method(), url: request.url() };
      requests.push(blocked);
      blockedMutations.push(blocked);
      await route.abort("blockedbyclient");
      return;
    }
    await route.continue();
  });
  await context.addInitScript(() => {
    window.__mosaicProbe = { contextAttempts: 0, draws: new WeakMap() };
    const originalContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (kind, ...args) {
      if (/webgl/i.test(kind)) window.__mosaicProbe.contextAttempts += 1;
      return originalContext.call(this, kind, ...args);
    };
    const originalDraw = WebGL2RenderingContext.prototype.drawArrays;
    WebGL2RenderingContext.prototype.drawArrays = function (...args) {
      const draws = window.__mosaicProbe.draws;
      draws.set(this.canvas, (draws.get(this.canvas) || 0) + 1);
      return originalDraw.apply(this, args);
    };
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  try {
    const evidence = await test(page, context);
    assert.deepEqual(errors, [], "Browser reported uncaught page errors");
    assert.deepEqual(requests, [], "Page unexpectedly attempted an outbound mutation; request was blocked");
    results.push({ name, locale, status: "passed", durationMs: Date.now() - started, ...evidence });
    console.log(`PASS ${locale} ${name}`);
  } catch (error) {
    const screenshot = `${locale}-${name.replaceAll(/[^a-z0-9]+/gi, "-").toLowerCase()}-failure.png`;
    await page.screenshot({ caret: "initial", path: resolve(output, screenshot), animations: "allow" }).catch(() => {});
    results.push({ name, locale, status: "failed", durationMs: Date.now() - started, error: error.message, pageErrors: errors, screenshot });
    console.error(`FAIL ${locale} ${name}: ${error.message}`);
  } finally {
    await context.close();
  }
}

async function visit(page, locale) {
  const response = await page.goto(`${baseUrl}/${locale}`, { waitUntil: "domcontentloaded", timeout: 45_000 });
  assert(response?.ok(), `Route returned ${response?.status()}`);
  await page.locator(".mosaic-home").waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.locator(".mx-hero").evaluate(async (hero) => {
    const finite = hero.getAnimations({ subtree: true }).filter((animation) => animation.effect?.getTiming().iterations !== Infinity);
    await Promise.all(finite.map((animation) => animation.finished.catch(() => {})));
  });
}

async function drawCount(page, selector) {
  return page.evaluate((selector) => {
    const canvas = document.querySelector(selector);
    return canvas ? window.__mosaicProbe.draws.get(canvas) || 0 : 0;
  }, selector);
}

async function assertDrawing(page, selector) {
  const before = await drawCount(page, selector);
  await page.waitForFunction(({ selector, before }) => {
    const canvas = document.querySelector(selector);
    return canvas && (window.__mosaicProbe.draws.get(canvas) || 0) > before + 1;
  }, { selector, before }, { polling: 50 });
  return { before, after: await drawCount(page, selector) };
}

async function assertStopped(page, selector) {
  // Intersection/resize delivery may contribute a final paint. Require a quiet
  // interval after those callbacks settle; never assert a particular frame rate.
  const deadline = Date.now() + 5_000;
  let previous = await drawCount(page, selector);
  let quietSince = Date.now();
  while (Date.now() < deadline) {
    await delay(100);
    const next = await drawCount(page, selector);
    if (next !== previous) { previous = next; quietSince = Date.now(); }
    if (Date.now() - quietSince >= 450) return { stoppedAtDrawCount: next, quietMs: Date.now() - quietSince };
  }
  assert.fail(`${selector} continued drawing after suspension`);
}

async function awaitCard(page, index = 0) {
  const card = page.locator(".mx-capability").nth(index);
  await card.evaluate((element) => element.scrollIntoView({ behavior: "instant", block: "center" }));
  await card.focus();
  await page.waitForFunction((index) => {
    const card = document.querySelectorAll(".mx-capability")[index];
    const field = document.querySelector(".mosaic-card-field");
    const rect = card.getBoundingClientRect();
    return field.dataset.active === "true" &&
      Math.abs(parseFloat(field.style.getPropertyValue("--mosaic-card-left")) - rect.left) < 1 &&
      Math.abs(parseFloat(field.style.getPropertyValue("--mosaic-card-top")) - rect.top) < 1;
  }, index, { polling: 50 });
  return card;
}

async function assertHeroFallback(page, filename) {
  await page.locator(".mosaic-motion").waitFor({ state: "detached" });
  const state = await page.locator(".mosaic-hero-pixels").evaluate(async (host) => {
    const still = host.querySelector(".mosaic-hero-still");
    const style = getComputedStyle(still);
    const url = style.backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1];
    let loaded = false;
    if (url) {
      const image = new Image();
      image.src = url;
      loaded = await image.decode().then(() => image.naturalWidth > 0).catch(() => false);
    }
    return {
      opacity: Number(style.opacity), loaded,
      width: still.getBoundingClientRect().width, height: still.getBoundingClientRect().height,
      visibleCanvases: [...host.querySelectorAll("canvas")].filter((canvas) => {
        const s = getComputedStyle(canvas);
        return s.visibility !== "hidden" && s.display !== "none" && Number(s.opacity) > 0;
      }).length,
    };
  });
  assert(state.loaded && state.opacity > 0 && state.width > 100 && state.height > 100, `Static artwork is missing or transparent: ${JSON.stringify(state)}`);
  assert.equal(state.visibleCanvases, 0, "Canvas obscures static fallback");
  const first = await page.locator(".mosaic-hero-pixels").screenshot({ animations: "allow" });
  await delay(250);
  const second = await page.locator(".mosaic-hero-pixels").screenshot({ animations: "allow" });
  assert(first.equals(second), "Static artwork is changing between frames");
  await page.screenshot({ caret: "initial", path: resolve(output, filename), animations: "allow" });
  return { ...state, screenshot: filename, frameHashes: [hash(first), hash(second)] };
}

async function assertCardFallback(page) {
  const state = await page.locator(".mosaic-card-field").evaluate((host) => {
    const still = getComputedStyle(host.querySelector(".mosaic-card-still"));
    return {
      active: host.dataset.active,
      stillOpacity: Number(still.opacity),
      stillBackground: still.backgroundImage,
      visibleCanvases: [...host.querySelectorAll("canvas")].filter((canvas) => {
        const s = getComputedStyle(canvas);
        return s.visibility !== "hidden" && Number(s.opacity) > 0;
      }).length,
    };
  });
  assert.equal(state.active, "true", "Focused card has no fallback mask");
  assert(state.stillOpacity > 0 && state.stillBackground !== "none", "Card's static field is missing");
  assert.equal(state.visibleCanvases, 0, "Card canvas obscures fallback");
  return state;
}

try {
  for (const locale of ["en", "ar"]) {
    await check("motion lifecycle and shared card field", locale, {}, async (page) => {
      await visit(page, locale);
      await page.locator(heroCanvas).waitFor();
      const moving = await assertDrawing(page, heroCanvas);
      const idleFrame = await page.locator(heroCanvas).screenshot();
      await delay(1500);
      const nextIdleFrame = await page.locator(heroCanvas).screenshot();
      assert.notEqual(hash(idleFrame), hash(nextIdleFrame), "Hero pixels stay fixed without a click");
      assert.equal(await page.locator(cardCanvas).count(), 0, "Card renderer allocated before interaction");
      const ratio = await page.locator(heroCanvas).evaluate((canvas) => canvas.width / canvas.getBoundingClientRect().width);
      assert(ratio <= 1.251, `Drawing buffer DPR exceeds cap: ${ratio}`);
      // Headless browsers do not expose a portable real tab-visibility toggle.
      // Simulate only the DOM visibility getters and event, leaving rAF intact.
      await page.evaluate(() => {
        Object.defineProperty(document, "hidden", { value: true, configurable: true });
        Object.defineProperty(document, "visibilityState", { value: "hidden", configurable: true });
        document.dispatchEvent(new Event("visibilitychange"));
      });
      const hidden = await assertStopped(page, heroCanvas);
      await page.evaluate(() => {
        delete document.hidden;
        delete document.visibilityState;
        document.dispatchEvent(new Event("visibilitychange"));
      });
      await assertDrawing(page, heroCanvas);

      await page.mouse.move(0, 0);
      const card = await awaitCard(page);
      const offscreen = await assertStopped(page, heroCanvas);
      await assertDrawing(page, cardCanvas);
      assert.equal(await page.locator(cardCanvas).count(), 1, "Card field is not shared");
      assert.equal(await page.locator("[data-mosaic-card] canvas").count(), 0, "Found a canvas per card");
      await card.hover();
      const secondCard = await awaitCard(page, 1);
      assert.equal(await secondCard.evaluate((element) => document.activeElement === element), true);
      await page.evaluate(() => scrollBy({ top: 73, behavior: "instant" }));
      await page.waitForFunction(() => {
        const field = document.querySelector(".mosaic-card-field");
        const card = document.activeElement;
        return field.dataset.active === "true" && Math.abs(parseFloat(field.style.getPropertyValue("--mosaic-card-top")) - card.getBoundingClientRect().top) < 1;
      }, undefined, { polling: 50 });
      const mask = await page.locator(".mosaic-card-field").evaluate((field) => field.style.clipPath);
      const screenshot = `${locale}-card-focus.png`;
      await page.screenshot({ caret: "initial", path: resolve(output, screenshot), animations: "allow" });
      await page.mouse.move(0, 0);
      await page.locator(".dir-brand").focus();
      await page.waitForFunction(() => document.querySelector(".mosaic-card-field").dataset.active === "false", undefined, { polling: 50 });
      const idle = await assertStopped(page, cardCanvas);
      return { ratio, moving, hidden, hiddenMethod: "DOM visibility-event simulation", offscreen, idle, mask, screenshot };
    });

    await check("reduced motion initial and live preferences", locale,
      { reducedMotion: "reduce", viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 }, async (page) => {
        await visit(page, locale);
        assert.equal(await page.evaluate(() => window.__mosaicProbe.contextAttempts), 0, "Reduced motion attempted WebGL allocation");
        const initial = await assertHeroFallback(page, `${locale}-reduced-motion.png`);
        await page.emulateMedia({ reducedMotion: "no-preference" });
        await page.locator(heroCanvas).waitFor();
        await assertDrawing(page, heroCanvas);
        await page.emulateMedia({ reducedMotion: "reduce" });

        const stopped = await assertStopped(page, heroCanvas);
        await assertHeroFallback(page, `${locale}-live-reduced-motion.png`);
        await awaitCard(page);
        const card = await assertCardFallback(page);
        assert.equal(await page.locator(cardCanvas).count(), 0, "Reduced-motion card allocated WebGL");
        return { initial, stopped, card };
      });

    await check("unavailable WebGL keeps hero and keyboard card artwork", locale,
      { viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 }, async (page) => {
        await page.addInitScript(() => {
          const original = HTMLCanvasElement.prototype.getContext;
          window.__mosaicBlockedContexts = 0;
          HTMLCanvasElement.prototype.getContext = function (kind, ...args) {
            if (/webgl/i.test(kind)) { window.__mosaicBlockedContexts += 1; return null; }
            return original.call(this, kind, ...args);
          };
        });
        await visit(page, locale);
        await page.waitForFunction(() => window.__mosaicBlockedContexts > 0, undefined, { polling: 50 });
        const hero = await assertHeroFallback(page, `${locale}-no-gpu.png`);
        await awaitCard(page);
        const card = await assertCardFallback(page);
        assert.equal(await page.locator(".direction-mosaic canvas").count(), 0);
        return { hero, card, blockedContexts: await page.evaluate(() => window.__mosaicBlockedContexts) };
      });

    await check("real WebGL context loss restores static artwork", locale, {}, async (page) => {
      await visit(page, locale);
      await page.locator(heroCanvas).waitFor();
      const loseContext = async (selector) => {
        const available = await page.locator(selector).evaluate((canvas) => {
          const extension = canvas.getContext("webgl2")?.getExtension("WEBGL_lose_context");
          if (!extension) return false;
          extension.loseContext();
          return true;
        });
        assert(available, "WEBGL_lose_context is unavailable; cannot verify real context loss");
      };
      await loseContext(heroCanvas);
      const hero = await assertHeroFallback(page, `${locale}-context-loss.png`);
      await assertStopped(page, heroCanvas);
      await awaitCard(page);
      await assertDrawing(page, cardCanvas);
      await loseContext(cardCanvas);
      await page.waitForFunction(() => document.querySelector(".mosaic-card-field").dataset.live === "false", undefined, { polling: 50 });
      const card = await assertCardFallback(page);
      await assertStopped(page, cardCanvas);
      return { hero, card };
    });
  }
} finally {
  await browser.close();
  const passed = results.filter((result) => result.status === "passed").length;
  const failed = results.filter((result) => result.status === "failed").length;
  writeFileSync(resolve(output, "results.json"), `${JSON.stringify({
    checkedAt: new Date().toISOString(), baseUrl, passed, failed, blockedMutations,
    notes: ["No backend mutation is allowed; all non-GET/HEAD requests are intercepted and blocked.",
      "Hidden visibility is simulated through DOM getters and visibilitychange; rAF is not mocked.",
      "Draw-count progress and settled quiet intervals replace timing-sensitive exact frame-rate assertions."],
    results,
  }, null, 2)}\n`);
  console.log(`${passed} passed; ${failed} failed. Report: ${resolve(output, "results.json")}`);
  process.exitCode = failed ? 1 : 0;
}
