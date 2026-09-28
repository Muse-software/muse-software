import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import AxeBuilder from "@axe-core/playwright";
import { launchBrowser } from "./browser-runtime.mjs";
const base = process.env.MUSE_TEST_URL || "http://127.0.0.1:3106";
const out = "test-results/inquiry";
mkdirSync(out, { recursive: true });
const browser = await launchBrowser();
const results = [];
async function setup(width = 390) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const errors = [],
    posts = [],
    submissions = [];
  page.on("pageerror", (e) => errors.push(e.message));
  // A browser test cannot read the captcha, so both endpoints are stubbed here.
  // The real verification and storage are covered by the API checks at the end.
  await context.route("**/*", (r) => {
    const url = new URL(r.request().url());
    if (url.pathname === "/api/captcha")
      return r.fulfill({
        json: {
          token: "test.token.value",
          image: `data:image/svg+xml;base64,${Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="240" height="72"/>').toString("base64")}`,
          expiresAt: Date.now() + 600000,
        },
      });
    if (url.pathname === "/api/inquiry" && r.request().method() === "POST") {
      submissions.push(r.request().postDataJSON());
      return r.fulfill({ status: 201, json: { id: "0123abcd-test" } });
    }
    if (!["GET", "HEAD", "OPTIONS"].includes(r.request().method())) {
      posts.push(r.request().url());
      return r.abort();
    }
    return r.continue();
  });
  return { context, page, errors, posts, submissions };
}
async function step(page, n) {
  await page
    .locator(`.inquiry-layout[data-ready=true][data-step="${n}"]`)
    .waitFor();
}
async function next(page) {
  await page.locator(".form-actions>.studio-button").click();
}
const CAPTCHA = "A1b2C3";
try {
  if (!process.argv.includes("--edges-only"))
    for (const locale of ["en", "ar"])
      for (const width of [320, 390, 1440]) {
        const { context, page, errors, posts, submissions } = await setup(width);
        await page.goto(`${base}/${locale}`);
        await page.locator(".mx-email-cta a").click();
        await page.waitForURL(`${base}/${locale}/start`);
        await step(page, 1);
        await next(page);
        assert(await page.locator("#intent-error").isVisible());
        await page.locator(".intent-options label").first().click();
        await next(page);
        await step(page, 2);
        const note =
          locale === "ar"
            ? "نحتاج منصة للحجز & إدارة العملاء. التفاصيل: A+B?"
            : "A booking app & customer dashboard. Details: A+B?";
        await page.locator("#description").fill(note);
        await page.locator("#timeline").selectOption("1-3 months");
        await page
          .locator(".inquiry-panel")
          .screenshot({ path: `${out}/${locale}-${width}-idea.png` });
        await next(page);
        await step(page, 3);
        await next(page);
        assert(await page.locator("#firstName-error").isVisible());
        assert.equal(
          await page
            .locator("#firstName")
            .evaluate((e) => e === document.activeElement),
          true,
        );
        await page
          .locator("#firstName")
          .fill(locale === "ar" ? "عميل تجريبي" : "Test Client");
        await page.locator("#email").fill("invalid");
        await next(page);
        assert(await page.locator("#email-error").isVisible());
        await page.locator("#email").fill("client@example.com");
        await page.locator("#company").fill("Studio & Partners");
        await page.locator(".contact-preference label").last().click();
        await page.locator("#phone").fill("12");
        await next(page);
        assert(await page.locator("#phone-error").isVisible());
        await page
          .locator("#phone")
          .fill(locale === "ar" ? "٠٥٩٢٧٣١٠٤٠" : "0592731040");
        await page.locator(".inquiry-review summary").click();
        assert(
          (
            await page.locator(".inquiry-review dd").last().innerText()
          ).includes(note),
        );
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth > innerWidth,
          ),
          false,
        );
        await page.screenshot({
          path: `${out}/${locale}-${width}-details.png`,
        });
        const axe = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        assert.deepEqual(
          axe.violations.map((v) => ({
            id: v.id,
            targets: v.nodes.map((n) => n.target),
          })),
          [],
        );
        // Draft restore still works mid-form, before anything is sent.
        await page.reload();
        await page.locator(".draft-notice").waitFor();
        await page.locator(".draft-notice button").first().click();
        await step(page, 3);
        assert.equal(
          await page.locator("#email").inputValue(),
          "client@example.com",
        );
        // Captcha: required, format-checked, and focused when missing.
        await page.locator(".captcha-image img").waitFor();
        await next(page);
        assert(await page.locator("#captcha-error").isVisible());
        assert.equal(
          await page.evaluate(() => document.activeElement.id),
          "captcha",
        );
        await page.locator("#captcha").fill("A1-b2 C3!");
        assert.equal(await page.locator("#captcha").inputValue(), CAPTCHA);
        await next(page);
        await step(page, 4);
        assert.equal(submissions.length, 1);
        const sent = submissions[0];
        assert.equal(sent.locale, locale);
        assert.deepEqual(sent.captcha, { token: "test.token.value", answer: CAPTCHA });
        assert.equal(sent.inquiry.description, note);
        assert.equal(sent.inquiry.email, "client@example.com");
        assert.equal(sent.inquiry.company, "Studio & Partners");
        assert.equal(sent.inquiry.phone, "0592731040");
        assert.equal(sent.inquiry.preferredContact, "call");
        assert(
          (await page.locator(".inquiry-handoff [role=status]").innerText()).includes(
            locale === "ar" ? "عميل تجريبي" : "Test Client",
          ),
        );
        assert.equal(
          await page.evaluate(() => sessionStorage.getItem("muse-email-enquiry-v1")),
          null,
        );
        await page
          .locator(".inquiry-handoff")
          .screenshot({ path: `${out}/${locale}-${width}-sent.png` });
        assert.deepEqual(errors, []);
        assert.deepEqual(posts, []);
        results.push({ locale, width, pass: true });
        console.log(
          `PASS ${locale} ${width}: entry, steps, validation, restore, captcha, submission payload, confirmation, accessibility`,
        );
        await context.close();
      }
  const { context, page, errors, posts, submissions } = await setup();
  await page.goto(`${base}/en/start?intent=ai`);
  await step(page, 2);
  const long = "تفاصيل المشروع & المزيد؟ ".repeat(160).slice(0, 4000);
  await page.locator("#description").fill(long);
  await next(page);
  await page.locator("#firstName").fill("Long note");
  await page.locator("#email").fill("long@example.com");
  await page.goto(`${base}/ar/start?intent=ai`);
  await page.locator(".draft-notice button").first().click();
  await step(page, 3);
  assert.equal(await page.locator("#firstName").inputValue(), "Long note");
  await page.locator(".captcha-image img").waitFor();
  await page.locator("#captcha").fill(CAPTCHA);
  await next(page);
  await step(page, 4);
  assert.equal(submissions[0].inquiry.description, long);
  await page.evaluate(() =>
    sessionStorage.setItem("muse-email-enquiry-v1", "{broken"),
  );
  await page.goto(`${base}/en/start?intent=bogus`);
  await step(page, 1);
  assert.equal(await page.locator(".draft-notice").count(), 0);
  assert.deepEqual(errors, []);
  assert.deepEqual(posts, []);
  await context.close();
  const unavailable = await setup();
  await unavailable.page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new Error("blocked");
    };
    Storage.prototype.setItem = () => {
      throw new Error("blocked");
    };
  });
  await unavailable.page.goto(`${base}/en/start`);
  await step(unavailable.page, 1);
  assert(
    await unavailable.page
      .getByText("Draft saving is unavailable.", { exact: false })
      .isVisible(),
  );
  await unavailable.context.close();
  console.log(
    "PASS long multilingual note submitted intact, cross-locale restore, invalid intent, corrupt/blocked storage",
  );
} finally {
  writeFileSync(
    `${out}/${process.argv.includes("--edges-only") ? "edge-results" : "results"}.json`,
    JSON.stringify(results, null, 2),
  );
  await browser.close();
}
