# Muse De-AI Copy Pass — Execution Report (draft)

**Branch:** `copy/de-ai-pass`
**Plan:** `docs/de-ai-copy-pass-plan.md` (executed literally, no rephrasing)
**Executor:** Claude Sonnet
**Date:** 2026-08-04

> **Note:** the "Verification evidence" section below records the executor's own build/tsc/parity runs, per step. This report has **not** yet been independently verified by Hermes — that pass (tsc, full build, key-parity diff, grep sweep, AR register spot-check) is still pending and should be added to this doc before merge to `staging/bilingual-ar-en`.

---

## Commits made (in order)

1. `9f8ad2c` — `copy(en): kill consultant jargon across home/explore/get-started/metadata`
2. `4768fcd` — `copy(ar): native rewrites for approach card + get-started success`
3. `0cad90b` — `copy(en): de-AI services copy — pillars, whatWeDo, whyReasons, check-ins`
4. `bc9ffc4` — `copy(ar): native rewrites for services copy`
5. `66aad4b` — `copy(en): de-template careers blurbs + responsibilities`
6. `4edf233` — `copy(ar): native rewrites for careers blurbs + responsibilities`
7. `3745b6b` — `seo: reuse locale keys in job-posting JSON-LD labels`

(Step 3, the key-parity check, produced no diff and needed no commit — verification only.)

---

## Per-task changes

### `messages/en.json` (5 EN changes)

| Key | Before | After | Status |
|---|---|---|---|
| `Home.approach.cards.ai-transformation.body` | "Staying AI-absent isn't a neutral choice. We find the highest-leverage places to put AI to work in how your business actually runs, and stand up the systems that do it, with guardrails from day one." | "Staying AI-absent isn't a neutral choice. We find where AI actually earns its place in how your business runs, build the systems that do it, and put the guardrails in ourselves." | Y |
| `Home.faq.items[4].a` | "Teams that want to move at startup speed. That runs from a founder shipping a first product to an enterprise team trying to get an AI initiative out of pilot purgatory." | "Teams that want to move fast without dropping the quality bar. That runs from a founder shipping a first product to an enterprise team trying to get an AI initiative out of pilot purgatory." | Y |
| `Explore.hero.subtitle` | "Three ways we help teams move at startup speed. Pick one, or combine all three." | "Three ways we help teams ship faster, without cutting corners. Pick one, or combine all three." | Y |
| `GetStarted.form.successDelivered` | "Your request has been received. Our team will reach out within 1 to 2 business days to discuss how Muse can accelerate your goals." | "Your request has been received. We'll get back to you within 1 to 2 business days to talk through what you're building." | Y |
| `Metadata.explore.description` | "AI transformation, product engineering, and gamification & experience. How Muse Studios builds." | "AI transformation, product engineering, and gamification & experience. What Muse builds, and how." | Y |

### `messages/ar.json` (2 AR changes)

| Key | Before | After | Status |
|---|---|---|---|
| `Home.approach.cards.ai-transformation.body` | أن تكتفي بـ"استخدام" الذكاء الاصطناعي مو خيار محايد. نحدّد المواضع الأعلى أثرًا لتشغيله داخل عمل شركتك كما يجري فعلًا، ونبني الأنظمة التي تقوم بذلك، بضوابط من اليوم الأول. | أن تكتفي بـ"استخدام" الذكاء الاصطناعي مو خيار محايد. نلاقي وين الذكاء الاصطناعي يفيد فعلًا في طريقة شغل شركتك، ونبني الأنظمة اللي تسوي ذلك، ونحطّ الضوابط بأنفسنا. | F (sentence 1 frozen byte-for-byte) |
| `GetStarted.form.successDelivered` | استلمنا طلبك، وسيتواصل معك فريقنا خلال يوم إلى يومي عمل لمناقشة كيف نقدر نسرّع أهدافك. | استلمنا طلبك، وبنرجع لك خلال يوم إلى يومين عمل عشان نفهم وش تبنيه. | F |

`Home.faq.items[4].a` AR and `Explore.hero.subtitle` AR: **KEEP**, no change (per plan CHANGE 2 / CHANGE 3). `Metadata.explore.description` AR: **KEEP**, no change (CHANGE 5).

### `lib/content/en/services.ts` (16 EN changes — B1–B16)

| # | Field | Before | After | Status |
|---|---|---|---|---|
| B1 | `services[0].pillars[1].body` | "Employee surveys and stakeholder interviews define high-impact opportunities; we implement automation guided by training and change management." | "We look at how the work actually flows, automate the parts that are worth it, and train the team so the change holds." | Y |
| B2 | `services[0].pillars[2].body` | "Bespoke curricula and hands-on workshops that upskill your team on new tools and workflows, so adoption sticks." | "Training built for your team and the tools they'll actually use, run as hands-on workshops, not slideware." | Y |
| B3 | `services[0].whyReasons[2]` | "Cultural buy-in needs careful communication and real upskilling, not a mandate." | "Getting people to actually use it takes real training and buy-in, not a memo from the top." | Y |
| B4 | `services[0].approachIntro[1]` | "We get straight to it. 2 to 6 week holistic and function-specific audits that surface the most compelling AI use cases, quantify ROI, and map an implementation roadmap." | "We get straight to it. A 2 to 6 week audit that finds the AI use cases actually worth doing, what they're worth, and what it takes to ship them." | Y |
| B5 | `services[0].whatWeDo[0].body` | "Pinpoint workflow challenges, measure business impact, and gauge readiness for AI-driven improvements." | "We find where the workflow actually breaks, and what fixing it is worth." | Y |
| B6 | `services[0].whatWeDo[1].body` | "Understand leadership priorities, clarify strategic objectives, and identify the top AI opportunities." | "We sit with leadership to get clear on the priorities, and where AI is actually worth doing." | Y |
| B7 | `services[0].whatWeDo[2].body` | "Speak with stakeholders across business units to validate insights and uncover targeted solutions." | "We talk to the people who run each part of the business, so the plan matches how it really works." | Y |
| B8 | `services[0].whatWeDo[3].body` | "Bespoke curricula and hands-on workshops that upskill teams on relevant AI tools and workflows." | "Training built around the AI tools your team will actually use, run hands-on." | Y |
| B9 | `services[0].whatWeDo[4].body` | "Marry strategy with implementation using a mix of off-the-shelf tools, in-house IP, and custom builds." | "The actual systems, built from a mix of off-the-shelf tools, our own, and custom code." | Y |
| B10 | `services[1].whyReasons[0]` | "Perfect-fit hires are mission-critical, but can take months to secure." | "The right hire can take months to land, and you need them now." | Y |
| B11 | `services[1].whyReasons[2]` | "Velocity is a real competitive advantage in a fast-moving market." | "Speed is a real edge when the market moves this fast." | Y |
| B12 | `services[1].whatWeDo[1].body` | "Aligning models to your specific business objectives and use cases." | "Tuning models to your actual use cases, not a generic benchmark." | Y |
| B13 | `services[1].whatWeDo[2].body` | "Language migrations, version upgrades, and strategic codebase restructuring." | "Language migrations, version upgrades, and codebase restructuring." | Y |
| B14 | `services[1].whatWeDo[3].body` | "Data warehouse migrations, cleaning, and robust preprocessing pipelines." | "Data warehouse migrations, cleaning, and preprocessing pipelines that hold up." | Y |
| B15 | `services[1].whatWeDo[4].body` | "Agentic, AI-powered features tailored specifically to your business." | "AI agents built to do a specific job inside your business." | Y |
| B16 | `services[1].whyWorkWithUs[3].body` | "Calls to review progress, roadmap, and next steps." | "Calls to review where things stand and what's next." | Y |

`services[2]` (Gamification & Experience): all KEEP, no changes.

### `lib/content/ar/services.ts` (13 AR changes)

| # | Field | Status |
|---|---|---|
| B1 | `services[0].pillars[1].body` | F |
| B2 | `services[0].pillars[2].body` | F |
| B3 | `services[0].whyReasons[2]` | F |
| B4 | `services[0].approachIntro[1]` | F |
| B5 | `services[0].whatWeDo[0].body` | F |
| B6 | `services[0].whatWeDo[1].body` | F |
| B7 | `services[0].whatWeDo[2].body` | F |
| B8 | `services[0].whatWeDo[3].body` | F |
| B9 | `services[0].whatWeDo[4].body` | F |
| B10 | `services[1].whyReasons[0]` | F |
| B12 | `services[1].whatWeDo[1].body` | F |
| B13 | `services[1].whatWeDo[2].body` | F |
| B16 | `services[1].whyWorkWithUs[3].body` | F |

B11, B14, B15 AR: **KEEP**, no change (already native, not calques). See exact before/after strings in `docs/de-ai-copy-pass-plan.md` Part B (not duplicated here — plan is authoritative for exact text).

### `lib/content/en/careers.ts` (8 EN changes — C1–C3)

| # | Field | Before | After | Status |
|---|---|---|---|---|
| C1 | `business-developer.blurb` | "Build and manage the pipeline that turns conversations into signed engagements." | "You're the first person a prospective client talks to, and you carry that all the way to a signed project." | Y |
| C2.0 | `business-developer.responsibilities[0]` | "Identify and qualify new business opportunities across target industries" | "Qualify new business opportunities across our target industries" | Y |
| C2.1 | `business-developer.responsibilities[1]` | "Build and manage a pipeline of prospective clients, from first outreach to signed contract" | "Carry the pipeline from first outreach to signed contract" | Y |
| C2.3 | `business-developer.responsibilities[3]` | "Work closely with the delivery team to scope engagements accurately before they're sold" | "Scope engagements with the delivery team before anything is promised to a client" | Y |
| C2.4 | `business-developer.responsibilities[4]` | "Maintain relationships with existing clients to identify expansion opportunities" | "Stay close to existing clients, and spot where we can do more for them" | Y |
| C2.dm1 | `digital-marketing-director.responsibilities[1]` | "Build and manage the content engine behind the newsletter and everything we publish" | "Run the content engine behind the newsletter and everything we publish" | Y |
| C2.dm2 | `digital-marketing-director.responsibilities[2]` | "Run demand-generation campaigns that turn attention into qualified leads" | "Run campaigns that turn attention into qualified leads" | Y |
| C3 | `gtm-engineer.blurb` | "Build the tooling and automation that makes go-to-market run like a product." | "Go-to-market should run like a product. You build the tooling and automation that gets it there." | Y |

`digital-marketing-director.blurb`, `business-developer.responsibilities[2]`, `digital-marketing-director.responsibilities[0,3,4]`, all `gtm-engineer.responsibilities`, and all `requirements`/`niceToHaves` for all three roles: **KEEP**, no change.

### `lib/content/ar/careers.ts` (8 AR changes)

Same 8 fields as the EN table above (C1, C3 blurbs; C2 business-developer bullets 0,1,3,4; C2 digital-marketing-director bullets 1,2), all AR-native rewrites, all **F**. Exact strings in the plan Part C.

### `app/[locale]/careers/[slug]/page.tsx` (Part D — SEO, no message-file change)

Replaced the hardcoded English literals `"Responsibilities:"` / `"Requirements:"` inside the `JobPosting` JSON-LD `description` with `t("responsibilities")` / `t("requirements")`, reusing the `Careers.detail` translations already fetched in that component. No new key, no parity work, no user-facing copy change — purely structured-data correctness for `/ar`.

---

## Source-attribution table (from plan Part E)

| Line (as it ships) | Adapts / device | Source (verbatim original) |
|---|---|---|
| `We deliver outcomes, not just tools.` (Home.outcomes — KEEP) | verbatim | mozn.ai: "…we deliver outcomes, not just tools." |
| `The teams we work with aren't a general audience…` (Home.whoWeBuildFor — KEEP) | adapt | zto.sa/en/about: "Our readers aren't a general audience. They're founders building private companies…" |
| `We run it with you, from the first audit to systems in production.` (AI-trans whatWeDoHeadline — KEEP) | adapt (mechanic) | mozn.ai: "…build and deploy production-ready solutions alongside your teams…" |
| `We work inside your team, not from a distance.` (Prod-eng whatWeDoHeadline — KEEP) | adapt | mozn.ai: "Our engineers work inside your environment, not from a distance." |
| `Saudi Arabia's economy is going through a moment that doesn't repeat itself…` (About.moment — KEEP) | verbatim + native | zto.sa: "يمرّ الاقتصاد السعودي بمرحلة نوعية لم تتكرر مسبقًا" |
| `من قلب الرياض إلى العالم` (Careers.origin — KEEP) | adapt | jobs.salla.com: "من قلب مكة إلى العالم" |
| `Join the team building products people here actually use.` (Careers.whyJoin — KEEP) | adapt | mozn.ai/careers: "Join the Team Building Intelligence" |
| `We look for the best.` / `نبحث عن الأفضل.` (Careers.claim — KEEP) | verbatim (AR) | jobs.salla.com: "نبحث عن الأفضل" |
| `No exact match? Say hi anyway.` (Careers.noMatch — KEEP) | adapt | tenex.co: "say hi anyway →" (mechanic; US, line-shape only) |
| `If you're looking for a team to actually build the thing…` (Contact.conditional — KEEP) | adapt | zto.sa: "إذا كنت تبحث عن شريك لتعزيز سردية شركتك…، تواصل معنا" |
| `تغنيك عن متابعة أخبار الذكاء الاصطناعي العامة…` (Newsletter.hero.subtitle AR — KEEP) | adapt (construction) | thmanyah نشرة أها!: "تغنيك عن التصفّح العشوائي لشبكات التواصل…" |
| `We build the thing, not the deck about the thing.` (Footer.worldview — KEEP) | own line reused | Muse hero (own) |
| Correction pivots this pass: `…not slideware`, `…not a memo from the top`, `…not a generic benchmark`; AR `مو شرائح`, `مو تعميم إداري`, `مو على معيار عام` (B2, B3, B12) | device: X-not-Y correction pivot | `Brand Voice#The correction pivot` |

No AR line in this pass is a translation of its EN counterpart; each was built natively and shares only meaning. Tenex supplies mechanics only (US company) — no Tenex line is shipped.

---

## Consolidated F-flagged list (gate before `/ar` publishes)

**New AR rewrites this pass (F):**
1. `Home.approach.cards.ai-transformation.body` AR (rewritten portion; frozen sentence preserved)
2. `GetStarted.form.successDelivered` AR
3. `services[0]` (AI-trans) AR: `pillars[1].body`, `pillars[2].body`, `whyReasons[2]`, `approachIntro[1]`, `whatWeDo[0..4].body`
4. `services[1]` (Product-eng) AR: `whyReasons[0]`, `whatWeDo[1].body`, `whatWeDo[2].body`, `whyWorkWithUs[3].body`
5. `careers.ts` AR: `business-developer.blurb`, `gtm-engineer.blurb`
6. `careers.ts` AR responsibilities: `business-developer` ×4 (bullets 0,1,3,4), `digital-marketing-director` ×2 (bullets 1,2)

**Carried structure-pass F (flag stays, no string change unless noted):**
7. `Home.whoWeBuildFor.body` AR
8. `About.moment.lead` + `About.moment.continuation` AR
9. `Contact.conditional` AR
10. `Newsletter.hero.subtitle` AR
11. `Careers.whyJoin` / `Careers.noMatch` / `Careers.purpose` AR
12. `services[*].faq[*].a` AR — all three services' FAQ answers

**Carried prior-copy-pass AR (still ungated, not re-touched here):** the four subtitle density rewrites (`Explore`, `Newsletter`, `Contact`, `GetStarted` heroes) and the AI-trans/prod-eng/gamification `intro`/`approachIntro` AR rewrites remain within the standing `/ar` gate.

`/ar` stays out of `PUBLISHED_LOCALES` until the whole `/ar` surface clears the native-review gate — not just this diff.

---

## Verification evidence (executor's own runs — pending independent Hermes verification)

- `npx tsc --noEmit`: silent (no errors) after every one of the 7 commits above.
- `npm run build`: green after every commit — all 38 static paths generated, no route failures.
- EN/AR key-parity check (`messages/en.json` vs `messages/ar.json`, recursive walk incl. array indices and lengths): **zero asymmetry** (0 keys only-in-EN, 0 keys only-in-AR).
- Grep kill-word sweep across `messages/en.json`, `lib/content/en/services.ts`, `lib/content/en/careers.ts` for: `highest-leverage`, `startup speed`, `accelerate your goals`, `holistic`, `quantify ROI`, `implementation roadmap`, `bespoke`, `stakeholder interviews`, `upskill`, `cultural buy-in`, `mission-critical`, `robust`, `Marry strategy with implementation`, `progress, roadmap, and next steps`, `Identify and qualify`, `demand-generation` — **zero hits**. (One incidental hit for the plain word "stakeholders" survives in `services[2]` gamification-experience FAQ, which is an out-of-scope KEEP string per the plan, not a kill-word violation — it doesn't carry the "stakeholder interviews" consultant-jargon construction.)

**Still to do (Hermes independent verification, per pipeline):** re-run tsc + full build from a clean state, independently re-derive the key-parity diff, re-run the grep sweep, and spot-check the AR register (marker density, no classical/deep-dialect drift) against `Arabic Termbase.md`.

---

## Independent verification evidence (Hermes, 2026-08-04 — post-merge gate)

Re-ran every gate from scratch on `copy/de-ai-pass` after the executor's run, without trusting the self-report:

- **TSC:** `npx tsc --noEmit` (node v24.14.0) → **clean**, zero errors.
- **Build:** `npm run build` → **green**, ✓ compiled, 38/38 static pages generated, no route failures.
- **Key parity:** re-derived independently — recursive walk incl. array indices + per-record array-length comparison for `intro/approachIntro/pillars/whyReasons/whatWeDo/faq/whyWorkWithUs` (services) and `responsibilities/requirements/niceToHaves` (careers), plus JSON keys — **zero asymmetry** in all three pairs (EN-only 0, AR-only 0).
- **Kill-list grep** (extended superset incl. `leverage`, `empower`, `streamline`, `seamless`, `at scale`, `world-class`, `cross-functional`, `frictionless`, `drive growth`): **zero hits** in `messages/en.json` + `lib/content/en/`.
- **Punctuation sweep on changed lines only** (en/em dashes, curly quotes, guillemets, Arabic-Indic digits): **clean**. Pre-existing en-dashes in budget-band JSON *keys* (`50K–150K SAR` etc.) and one em dash in a code comment are out of scope — keys are form option IDs, not prose; EN values already use hyphens.
- **Hardcoded copy sweep** (`components/`, `app/`, rendered-text pattern): none — the only new user-facing literal is the JSON-LD labels swap, which now reuses `t("responsibilities")` / `t("requirements")`.
- **AR register spot-check** (all 22 new AR strings vs `Arabic Termbase.md`): every body/card line sits at 1–2 markers per paragraph (`اللي/مو/وش/وين/عشان/لين/الحين/على طول`); deliverable lists (B13, C2 responsibilities) stay on the MSA spine; no classical (`نتفرّس`-type), no deep dialect (`تبي/أبغى`); second person via the verb; Latin brand names untouched. The verb chain in B1/B4 is the sanctioned Brand-Voice device (closed by `عشان`/purpose clause), once per section.
- **Frozen coined pair:** `Home.approach.heading` (EN+AR) and the AR card first sentence `أن تكتفي بـ"استخدام" الذكاء الاصطناعي مو خيار محايد.` verified byte-for-byte unchanged in the diff; only the text after the frozen sentence was rewritten.
- **Diff scope:** `git diff --stat` vs `staging/bilingual-ar-en` shows exactly the 6 content files + `app/[locale]/careers/[slug]/page.tsx` (JSON-LD) + 2 docs. Nothing else touched.

**Pre-existing, out of scope, noted for the native reviewer:** en-dash budget-band JSON keys (EN/AR, 6 each), one em dash in a code comment in `lib/content/ar/careers.ts`, and one plain-word "stakeholders" KEEP string in the gamification FAQ.

---

## Deviations from plan

None. All changes match the plan's exact EN and exact AR strings verbatim, including the byte-for-byte frozen first sentence of `Home.approach.cards.ai-transformation.body` AR. No key was added, renamed, or removed. No structure-pass component was touched — only string values in `messages/{en,ar}.json`, `lib/content/{en,ar}/services.ts`, `lib/content/{en,ar}/careers.ts`, and the two JSON-LD label literals in `app/[locale]/careers/[slug]/page.tsx`.

Commit-message wording for step 6/7 in this report matches the plan's step 6/7 messages ("copy(en): de-template careers blurbs + responsibilities" / actual commit used "copy(ar): native rewrites for careers blurbs + responsibilities" for step 7, a trivial wording variance from the plan's suggested "copy(ar): native careers blurbs + responsibilities" — same meaning, not flagged as a deviation of substance).
