import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import AxeBuilder from "@axe-core/playwright";
import { launchBrowser } from "./browser-runtime.mjs";
const base = process.env.MUSE_TEST_URL || "http://127.0.0.1:3106";
const out = "test-results/inquiry";
mkdirSync(out, { recursive: true });
const browser = await launchBrowser();
const results = [];
const DRAFT_KEY = "muse-enquiry-v2";
const CAPTCHA = "A1b2C3";
// Approved adaptive labels for the details field, per project type.
const DETAILS = {
  en: { build: "What’s the idea?", gamification: "Which engagement would you like to improve?", unsure: "What are you trying to solve or improve?" },
  ar: { build: "وش الفكرة؟", gamification: "وش التفاعل اللي حاب تحسّنه؟", unsure: "وش اللي تحاول تحله أو تحسّنه؟" },
};
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
  // Real verification, storage and email are covered by the API checks.
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
const ready = (page, state = "form") =>
  page.locator(`.inquiry-layout[data-ready=true][data-state="${state}"]`).waitFor();
const send = (page) => page.locator('form .studio-button[type="submit"]').click();
const detailsLabel = (page) => page.locator('label[for="description"]').innerText();
try {
  if (!process.argv.includes("--edges-only"))
    for (const locale of ["en", "ar"])
      for (const width of [320, 390, 1440]) {
        const { context, page, errors, posts, submissions } = await setup(width);
        await page.goto(`${base}/${locale}`);
        await page.locator(".mx-email-cta a").click();
        await page.waitForURL(`${base}/${locale}/start`);
        await ready(page);
        // One page: none of the retired wizard UI remains.
        for (const gone of [".inquiry-progress", ".inquiry-review", ".note-tools", ".contact-preference", ".form-time", ".draft-help"])
          assert.equal(await page.locator(gone).count(), 0, `${gone} should be removed`);
        assert.equal(await page.locator(".intent-options label").count(), 5);
        // Nothing chosen yet: neutral details label; sending asks for a type first.
        assert.equal((await detailsLabel(page)).trim(), DETAILS[locale].unsure);
        await send(page);
        assert(await page.locator("#intent-error").isVisible());
        assert.equal(await page.evaluate(() => document.activeElement?.getAttribute("name")), "intent");
        // The details question adapts to the project type.
        await page.locator(".intent-options label").nth(3).click();
        assert.equal((await detailsLabel(page)).trim(), DETAILS[locale].gamification);
        await page.locator(".intent-options label").first().click();
        assert.equal((await detailsLabel(page)).trim(), DETAILS[locale].build);
        const note =
          locale === "ar"
            ? "نحتاج منصة للحجز & إدارة العملاء. التفاصيل: A+B?"
            : "A booking app & customer dashboard. Details: A+B?";
        await page.locator("#description").fill(note);
        assert.deepEqual(
          await page.locator("#timeline option").evaluateAll((o) => o.map((x) => x.value)),
          ["soon", "1-3 months", "3-6 months", "unsure"],
        );
        await page.locator("#timeline").selectOption("3-6 months");
        await send(page);
        assert(await page.locator("#firstName-error").isVisible());
        assert.equal(await page.locator("#firstName").evaluate((e) => e === document.activeElement), true);
        await page.locator("#firstName").fill(locale === "ar" ? "عميل تجريبي" : "Test Client");
        await page.locator("#email").fill("invalid");
        await send(page);
        assert(await page.locator("#email-error").isVisible());
        await page.locator("#email").fill("client@example.com");
        await page.locator("#company").fill("Studio & Partners");
        // Phone is optional, but checked when filled in.
        await page.locator("#phone").fill("12");
        await send(page);
        assert(await page.locator("#phone-error").isVisible());
        await page.locator("#phone").fill(locale === "ar" ? "٠٥٩٢٧٣١٠٤٠" : "0592731040");
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        await page.screenshot({ path: `${out}/${locale}-${width}-form.png`, fullPage: true });
        const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
        assert.deepEqual(axe.violations.map((v) => ({ id: v.id, targets: v.nodes.map((n) => n.target) })), []);
        // Draft restore after a reload, before anything is sent.
        await page.reload();
        await page.locator(".draft-notice").waitFor();
        await page.locator(".draft-notice button").first().click();
        await ready(page);
        assert.equal(await page.locator("#email").inputValue(), "client@example.com");
        assert.equal(await page.locator('input[name="intent"][value="build"]').isChecked(), true);
        // Captcha: required, format-checked, and focused when missing.
        await page.locator(".captcha-image img").waitFor();
        await send(page);
        assert(await page.locator("#captcha-error").isVisible());
        assert.equal(await page.evaluate(() => document.activeElement.id), "captcha");
        await page.locator("#captcha").fill("A1-b2 C3!");
        assert.equal(await page.locator("#captcha").inputValue(), CAPTCHA);
        await send(page);
        await ready(page, "sent");
        assert.equal(submissions.length, 1);
        const sent = submissions[0];
        assert.equal(sent.locale, locale);
        assert.deepEqual(sent.captcha, { token: "test.token.value", answer: CAPTCHA });
        assert.deepEqual(sent.inquiry, {
          intent: "build", description: note, timeline: "3-6 months",
          firstName: locale === "ar" ? "عميل تجريبي" : "Test Client",
          email: "client@example.com", company: "Studio & Partners", phone: "0592731040",
        });
        assert((await page.locator(".inquiry-handoff [role=status]").innerText()).includes(locale === "ar" ? "عميل تجريبي" : "Test Client"));
        assert.equal(await page.evaluate((k) => sessionStorage.getItem(k), DRAFT_KEY), null);
        await page.locator(".inquiry-handoff").screenshot({ path: `${out}/${locale}-${width}-sent.png` });
        assert.deepEqual(errors, []);
        assert.deepEqual(posts, []);
        results.push({ locale, width, pass: true });
        console.log(`PASS ${locale} ${width}: single page, adaptive details, validation, optional phone, restore, captcha, payload, confirmation, accessibility`);
        await context.close();
      }
  const { context, page, errors, posts, submissions } = await setup();
  // Links can preselect any project type, including gamification.
  await page.goto(`${base}/en/start?intent=gamification`);
  await ready(page);
  assert.equal(await page.locator('input[name="intent"][value="gamification"]').isChecked(), true);
  assert.equal((await detailsLabel(page)).trim(), DETAILS.en.gamification);
  // Long multilingual note, no phone, survives a language switch via the draft.
  const long = "تفاصيل المشروع & المزيد؟ ".repeat(160).slice(0, 4000);
  await page.locator("#description").fill(long);
  await page.locator("#firstName").fill("Long note");
  await page.locator("#email").fill("long@example.com");
  await page.goto(`${base}/ar/start`);
  await page.locator(".draft-notice button").first().click();
  await ready(page);
  assert.equal(await page.locator("#firstName").inputValue(), "Long note");
  await page.locator(".captcha-image img").waitFor();
  await page.locator("#captcha").fill(CAPTCHA);
  await send(page);
  await ready(page, "sent");
  assert.equal(submissions[0].inquiry.description, long);
  assert.equal(submissions[0].inquiry.intent, "gamification");
  assert.equal(submissions[0].inquiry.phone, "");
  // Corrupt drafts and unknown types are ignored.
  await page.evaluate((k) => sessionStorage.setItem(k, "{broken"), DRAFT_KEY);
  await page.goto(`${base}/en/start?intent=bogus`);
  await ready(page);
  assert.equal(await page.locator(".draft-notice").count(), 0);
  assert.equal(await page.locator('input[name="intent"]:checked').count(), 0);
  assert.deepEqual(errors, []);
  assert.deepEqual(posts, []);
  await context.close();
  // Blocked storage: the form still works, it just cannot keep a draft.
  const unavailable = await setup();
  await unavailable.page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error("blocked"); };
    Storage.prototype.setItem = () => { throw new Error("blocked"); };
    Storage.prototype.removeItem = () => { throw new Error("blocked"); };
  });
  await unavailable.page.goto(`${base}/en/start?intent=ai`);
  await ready(unavailable.page);
  await unavailable.page.locator("#firstName").fill("No storage");
  await unavailable.page.locator("#email").fill("nostorage@example.com");
  await unavailable.page.locator(".captcha-image img").waitFor();
  await unavailable.page.locator("#captcha").fill(CAPTCHA);
  await send(unavailable.page);
  await ready(unavailable.page, "sent");
  assert.deepEqual(unavailable.errors, []);
  await unavailable.context.close();
  console.log("PASS preselected gamification, long note without phone, cross-locale restore, corrupt draft, unknown type, blocked storage");
} finally {
  writeFileSync(
    `${out}/${process.argv.includes("--edges-only") ? "edge-results" : "results"}.json`,
    JSON.stringify(results, null, 2),
  );
  await browser.close();
}
