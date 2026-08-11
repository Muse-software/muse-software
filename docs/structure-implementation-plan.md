# Muse Site Structure — Implementation Plan (file-by-file)

**Branch:** `structure/site-implementation`
**Author:** planning pass (Opus). Execution by Sonnet.
**Date:** 2026-08-04
**Source of truth:** `docs/muse-site-structure-plan.md` (the 724-line plan), `docs/structure-implementation-brief.md` (mission + constraints), `docs/copy-reference-bank.md` (verbatim borrowed lines), `Muse Vault/01 Company/Website Voice.md` + `Arabic Termbase.md` (voice rules).

This plan follows the plan's own **Build order** (section 7). Each numbered step below is an independently-shippable commit. Every copy addition gives the exact JSON key path, the exact EN string, and the exact native AR string, plus its source tag and a live/flag status. **No code is edited by this document — it is the spec Sonnet executes.**

---

## Ground rules carried into every step

1. **Zero hardcoded copy.** New strings land in `messages/en.json` + `messages/ar.json`, or (for service FAQ) in `lib/content/en/services.ts` + `lib/content/ar/services.ts`. Components read via `next-intl` / the content layer only.
2. **Borrow real lines only.** Every borrowed line is traced to `copy-reference-bank.md` / the research files. Service-FAQ answers are *grounded in existing Muse service copy* (a rewrite of what already ships), not new claims.
3. **AR is written, not translated.** Saudi register per `Arabic Termbase.md`: markers `عشان / وش / مو / اللي / بس`, 1–2 per paragraph, MSA spine for headings, spoken for body/CTA, straight quotes, Western numerals, `Muse` stays Latin.
4. **No unearned claims.** No "best", no "trusted by", no invented stats/phone/address. Flagged (`F`) lines still ship in code but are marked for the native-Arabic reviewer gate before `/ar` publishes.
5. **Build must pass** on node ≥22. Use `export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH"` then `npx tsc --noEmit` and `npm run build` after **every** step.

### Status legend
- `Y` — safe to ship now.
- `F` — ships in code, flagged to the native-Arabic reviewer (listed again at the end).
- `E` — left empty on purpose (no honest line exists); not implemented.

---

## Repo facts this plan is grounded in (verified)

- Landing render order (`components/sections/HomeSections.tsx`): `Hero → Approach → Manifesto (pressure folded in) → Ticker → FAQ → CTA`. There is **no** separate pressure/who-for/outcomes section today.
- `HomeSections` carries a `hero` prop (`"pixel" | "dither" | "monitors"`), `monitorGrade`, and a `children` CC-BY slot — all only for the archived hero candidates. `app/[locale]/page.tsx` already calls `<HomeSections locale={locale} />` with no hero prop, so it needs no change once the prop is dropped.
- The three dev routes are **not referenced** in `app/sitemap.ts` or `app/robots.ts` (sitemap lists routes explicitly; robots only `disallow: /api/`). Each dev page sets its own `robots: {index:false}` inline. Removing the route folders removes them entirely; the `app/[locale]/[...rest]/page.tsx` catch-all will 404 any stale link.
- `DitherCursor` / `DitherCursorScene` are **shipped** (used by `components/sections/CTA.tsx` and by `Hero`'s dither branch). **Do not archive them.**
- `archive/` already exists at repo root with a `README.md` and `archive/content/playbooks.ts` (playbooks archived 2026-08-01). **Append** to that README; do not overwrite it.
- `components/playground/*` (34 files) and two `globals.css` blocks are consumed **only** by the playground route. Their removal has a documented coupling (below).
- Service records live in `lib/content/{en,ar}/services.ts`, typed by `Service` in `lib/content/shared.ts`. Adding a per-service FAQ = one optional field on that type.

---

# STEP 1 — Archive the dev / 3D routes (do first; zero product risk)

**Goal:** preserve the throwaway 3D/preview machinery in `archive/`, remove it from the live tree, keep the build green, keep the pixel hero.

### 1a. Move route folders (preserve relative paths)

| From (live) | To (frozen) |
|---|---|
| `app/[locale]/hero-preview/` | `archive/app/[locale]/hero-preview/` |
| `app/[locale]/preview/` (contains `hero-dither/page.tsx`) | `archive/app/[locale]/preview/` |
| `app/[locale]/playground/` (contains `dither/page.tsx`) | `archive/app/[locale]/playground/` |

Use `git mv` so history follows.

### 1b. Move the 3D machinery these routes own

| From | To |
|---|---|
| `components/hero3d/` (whole dir: `Computers.tsx`, `MonitorsScene.tsx`, `PixelBlastScreen.tsx`, `Screen.tsx`, `useComputersModel.ts`) | `archive/components/hero3d/` |
| `components/sections/HeroMonitors.tsx` | `archive/components/sections/HeroMonitors.tsx` |

**Do NOT move** `components/pixelBlastShader.ts` — it has a doc comment mentioning `hero3d/PixelBlastScreen.tsx`, but the shipped `components/PixelBlast.tsx` (the live pixel hero) depends on it. Leave it. After the move, update the stale sentence in its comment only if trivial; otherwise leave it (a comment referencing an archived file is harmless).

### 1c. Move the playground component set + its CSS (recommended, bounded)

The brief's named 3D machinery is `hero3d/` + `HeroMonitors.tsx` only. The playground is a *separate* exploration, but its route is one of the three being archived, which orphans its entire component set and CSS. Archive them together so the live tree has no dead 30-file catalogue:

| From | To |
|---|---|
| `components/playground/` (whole dir, 34 files) | `archive/components/playground/` |

**`app/globals.css` — two coupled blocks.** The playground page's own removal note names "three deletes: this block, `components/playground/`, and `app/[locale]/playground/`." There are two CSS regions:

1. The `.dither` utility block starting ~line 552 (its keep-comment is lines 546–551: "Delete this block along with `components/playground/`"). Shipped surfaces are all PixelBlast (`PageDither`, `CardDither`, `DitherField`), so `.dither` is playground-only.
2. The `DITHER PLAYGROUND — PROPOSAL, NOT SHIPPED` block from line ~876 to **EOF** (file is 2059 lines).

**Critical exception (line ~886):** the two `@property` registrations near the top of the line-876 block **DO affect the shipped `.dither-pointer`**. They are declared with initial values equal to the fallbacks the shipped CSS already passes to `var()`. **These two `@property` declarations must be preserved** (move them above the deleted block, keeping their surrounding explanatory comment). Everything else in both blocks goes.

**Execution discipline:** copy the removed CSS verbatim into `archive/globals.playground.css` for the record, then delete from `globals.css`. Run `npm run build` immediately. **If the `.dither` / `@property` boundaries prove tangled, fall back to the minimal-safe move:** archive the route + `components/playground/` only, and **leave both CSS blocks in place** (dead but valid) with a one-line note in the report. Orphan CSS is harmless; a broken `.dither-pointer` is not.

### 1d. Wiring cleanup — `components/sections/HomeSections.tsx`

Exact edits:
- Delete imports: `HeroMonitors` (line 7), `import type { SceneGrade } from "@/components/hero3d/MonitorsScene"` (line 12), and `ReactNode` from the `react` import (line 1) — it is only used by the `children` slot.
- Delete the `export type HeroChoice = "pixel" | "dither" | "monitors";` line.
- Delete props `hero`, `monitorGrade`, `children` from the function signature and their doc-comment lines. Keep `locale`.
- Replace the hero branch:
  ```tsx
  {hero === "monitors" ? (
    <HeroMonitors grade={monitorGrade} />
  ) : (
    <Hero variant={hero} />
  )}
  ```
  with:
  ```tsx
  <Hero />
  ```
- Delete the trailing `{children}` (line 94).
- Rewrite the block doc-comment: drop the three-hero candidate table; state plainly that this is the home body in order, hero is the pixel field.

`app/[locale]/page.tsx` needs **no change** (already `<HomeSections locale={locale} />`).

### 1e. Optional but recommended — simplify `components/sections/Hero.tsx`

The `dither` variant of `Hero` was only reachable via the now-archived `/preview/hero-dither`. Cleanest end-state:
- Remove the `variant` prop, the `HeroVariant` type, the `DitherCursor` import, and the `else` (dither) branch — keep the `pixel` PixelBlast branch as the unconditional background.
- Update the doc comment (drop the preview-route paragraph).
- `DitherCursor` stays in the repo (CTA still uses it).

Mark optional: if skipped, leave `Hero` as-is and pass nothing (defaults to `pixel`). Either way the live hero is the pixel field. **Gate on `tsc --noEmit` + build.**

### 1f. `archive/README.md` — append (do not overwrite)

Append a dated section:

```
## 2026-08-04 — dev/3D hero + dither playground routes

Archived from branch structure/site-implementation. Superseded: the live hero
is the always-on pixel field (components/PixelBlast.tsx via Hero.tsx, variant
"pixel"). The 3D monitor-wall and pointer-ink-dither hero candidates were
scratch comparison routes, and the dither playground was a component-catalogue
proposal (docs/dither-system-plan.md). None are in the new site structure
(docs/muse-site-structure-plan.md §4).

- app/[locale]/hero-preview/        — 3D monitor-wall hero preview (noindex scratch route)
- app/[locale]/preview/hero-dither/ — pointer-ink dither hero comparison (noindex scratch route)
- app/[locale]/playground/dither/   — dither component catalogue (noindex scratch route)
- components/hero3d/                — react-three-fiber monitor-wall scene (only hero-preview used it)
- components/sections/HeroMonitors.tsx — the monitors hero section wrapper
- components/playground/            — 34 dither-catalogue specimen components (only playground/dither used them)
- globals.playground.css           — the .dither utility block + the PLAYGROUND-NOT-SHIPPED block removed from app/globals.css
                                      (the two @property registrations that affect the shipped .dither-pointer were KEPT in globals.css)

Frozen: nothing in archive/ is maintained or expected to compile against the
current app.
```

### 1g. Verify
- `grep -rn "hero-preview\|playground\|preview/hero-dither\|HeroMonitors\|hero3d\|MonitorsScene\|HeroChoice\|monitorGrade" app components lib messages --include="*.ts" --include="*.tsx" --include="*.json"` returns **only** hits inside `archive/` (plus the one benign `pixelBlastShader.ts` comment if left).
- `npx tsc --noEmit` clean; `npm run build` green.
- Sitemap/robots unchanged and correct (no dev routes were ever listed).

---

# STEP 2 — Landing additions (S4, S5, S6)

Insert into `components/sections/HomeSections.tsx` between `<Manifesto />` and `<Ticker …>`:

```tsx
<Manifesto />
<WhoWeBuildFor />
<OutcomesBand />
<Ticker text={home("ticker")} />
```

### 2a. S4 — Who we build for  →  new `components/sections/WhoWeBuildFor.tsx`

Client component (role-noun highlight fires once on scroll-into-view via IntersectionObserver; reduced-motion → static highlight, no sweep). Reuse the `.hero-highlight` visual family from the hero, dialed down. Render the body with `next-intl` **rich text** so the two role nouns can carry the highlight without hardcoding — a `role` chunk renderer wraps them in the highlight span.

Keys — `messages/*.json` under `Home.whoWeBuildFor`:

| key | EN | AR |
|---|---|---|
| `heading` | `The teams we work with aren't a general audience.` | `الفرق اللي نشتغل معها مو جمهور عام.` |
| `body` | `They're <role>founders</role> shipping a first product, and <role>operators</role> trying to get an AI initiative out of pilot purgatory.` | `هم <role>مؤسّسون</role> يطلقون منتجهم الأول، و<role>مسؤولون</role> يحاولون يطلعون مبادرة ذكاء اصطناعي من مرحلة التجريب التي لا تنتهي.` |

- Source: adapted from zto.sa/en/about audience line (bank C); role nouns are Muse's own (FAQ "founder shipping a first product … pilot purgatory"). Status **Y** (EN), **F** (AR — markers `اللي، مو`; confirm register with reviewer).
- `<role>…</role>` are next-intl rich-text tags, not literal text.

### 2b. S5 — Outcomes band  →  new `components/sections/OutcomesBand.tsx`

Server component. Full-width, large, centered, no hover; the "not just tools" clause set in the `#fd4601` accent.

Keys — `Home.outcomes`:

| key | EN | AR |
|---|---|---|
| `heading` | `We deliver outcomes, not just tools.` | `كل مشروع ينتهي بشيء يعمل فعليًا، لا بعرض تقديمي.` |

- Source: EN verbatim mozn.ai (bank A). AR = Muse's own existing outcomes line (reused, not translated). Status **Y**.
- Note the AR intentionally echoes the ai-transformation card promise — same idea in Muse's voice; acceptable per plan S5.

### 2c. S6 — Marquee content honesty  →  edit existing `Home.ticker`

No new component; change the string the existing `<Ticker>` renders. Per plan decision 4 (recommended) and brief: use the commitment line, never "trusted by leaders."

| key | EN (was) | EN (new) | AR (was) | AR (new) |
|---|---|---|---|---|
| `Home.ticker` | `Built for the AI-native era` | `Nothing ships that we wouldn't use ourselves` | `مبنيّ لعصر الذكاء الاصطناعي` | `لا نطلق ما لا نستخدمه نحن` |

- Source: Muse's own About ticker (already in `About.ticker`). Status **Y**.

### 2d. Verify
`tsc` + build; visually confirm order Hero → Approach → Manifesto → WhoWeBuildFor → OutcomesBand → Ticker → FAQ → CTA on `/en` and `/ar`; confirm role-noun highlight fires once and respects reduced-motion.

---

# STEP 3 — Explore build-out (two-tier CTA)

Edit `components/sections/Services.tsx` (the `/explore` card list). Each card currently has one CTA (`service.cta` → `/services/${slug}`). Add the second tier: keep the per-service verb as the primary (→ service page), add **"Get started"** → `/get-started` as the secondary. This is the tenex two-tier mechanic while honoring the per-service-verb rule (Website Voice "Applied" §4 — do not end every card in the same label; the *primary* stays the distinct verb).

- Wrap the existing verb `<Link>` and a new secondary `<Link href="/get-started">` in a small CTA row.
- Secondary link label key — `Services.getStarted` (top-level `Services` namespace, already used by `Services.tsx`):

| key | EN | AR |
|---|---|---|
| `Services.getStarted` | `Get started` | `ابدأ الآن` |

- Source: shared conversion verb (already used in `CTA.button`, `Nav.items.getStarted`). Status **Y**.

**Optional / flagged (default: skip):** plan offers a mozn conviction sub-line on the Explore hero (`Explore.hero.conviction` = EN "We deliver outcomes, not just tools." / AR "نسلّم أثرًا، لا مجرد أدوات."). It duplicates S5 and the AR (`نسلّم أثرًا`) is a fully-new conviction line the plan flags for review. **Recommendation: do not add** — S5 already carries this idea. If added, status **F**; list `نسلّم أثرًا` for the reviewer.

### Verify
`tsc` + build; on `/explore` each card shows verb-CTA (→ service page) + "Get started" (→ `/get-started`); underline/hover mechanics intact; RTL leading-edge correct.

---

# STEP 4 — Service pages (`/services/[slug]`): per-service FAQ + sticky sub-nav

### 4a. Data model — `lib/content/shared.ts`

Add an optional field to `Service`:
```ts
faq?: { q: string; a: string }[];
```

### 4b. Populate FAQ — `lib/content/en/services.ts` + `lib/content/ar/services.ts`

3 questions per service. Every answer is a **rewrite of copy that already ships** for that service (intro / whyReasons / whatWeDo / pillars) — grounded, not invented, no new claims. Question-as-heading shape (lean "What sets Lean apart?" mechanic). All status **Y** for EN; **F** for AR (spoken register, confirm with reviewer).

**ai-transformation.faq**
| # | EN q / a | AR q / a |
|---|---|---|
| 1 | `How long before we see something concrete?` / `The audit runs 2 to 6 weeks and ends with a clear adoption report your team can act on, whether you run it yourselves or hand execution back to us.` | `كم ناخذ وقت لين نشوف شيء ملموس؟` / `المراجعة تاخذ من أسبوعين إلى ستة أسابيع، وتنتهي بتقرير تبنّي واضح يقدر فريقك يمشي عليه، سواء نفّذتوه بنفسكم أو رجّعتوا التنفيذ لنا.` |
| 2 | `Do you only advise, or do you build it too?` / `Both. We run it with you from the first audit all the way to systems running in production, not a strategy deck we hand off.` | `تستشيرون بس، ولا تبنون كمان؟` / `الاثنين. نشتغل معك من أول مراجعة إلى أنظمة تعمل فعليًا، مو مجرد عرض استراتيجي نسلّمه ونمشي.` |
| 3 | `What does AI transformation actually cover?` / `Three fronts: product, process, and people, so the change lands in what you ship, how you operate, and how your team works.` | `وش يشمل التحوّل بالذكاء الاصطناعي فعليًا؟` / `ثلاث جبهات: المنتج والعمليات والناس، عشان التغيير يوصل لما تطلقه، وطريقة تشغيلك، وطريقة عمل فريقك.` |

**product-engineering.faq**
| # | EN q / a | AR q / a |
|---|---|---|
| 1 | `Are you a dev shop or something else?` / `We work inside your team, not from a distance, with a technical product manager and senior engineers who stay from first prototype to production.` | `انتوا شركة تطوير عادية ولا شيء ثاني؟` / `نشتغل جوّا فريقك، مو من بعيد، مع مدير منتج تقني ومهندسين كبار يبقون معك من النموذج الأوّلي حتى التشغيل الكامل.` |
| 2 | `How soon do we see working software?` / `You see the product running in front of you throughout, not in a single reveal at the end.` | `متى نشوف برمجيات تشتغل فعلًا؟` / `تشوف المنتج يشتغل قدامك طول الوقت، مو في عرض واحد في النهاية.` |
| 3 | `How do you keep quality up while moving fast?` / `There's a written quality bar: every state designed, real data only, and nothing ships that we wouldn't use ourselves.` | `كيف تحافظون على الجودة وانتوا سريعين؟` / `عندنا معيار جودة مكتوب: كل حالة مصمّمة، وبيانات حقيقية فقط، وما نطلق شيء ما نستخدمه احنا.` |

**gamification-experience.faq**
| # | EN q / a | AR q / a |
|---|---|---|
| 1 | `Is this just points and badges?` / `No. A badge means nothing if it doesn't change what someone does next, so we design reward systems around the behavior you actually want.` | `هذا مجرد نقاط وأوسمة؟` / `لا. الوسام ما يعني شيء إذا ما غيّر وش يسوي الشخص بعده، عشان كذا نصمّم أنظمة التحفيز حول السلوك اللي تبيه فعلًا.` |
| 2 | `When do we get to try something?` / `Early. You're clicking through something real week by week, instead of reviewing a deck about how it might feel.` | `متى نقدر نجرّب شيء؟` / `بدري. تجرّب شيء حقيقي بيدك أسبوع بأسبوع، بدل ما تراجع عرض عن إحساس التجربة.` |
| 3 | `How do we know adoption is actually working?` / `Engagement tracking is built in from the first release, so you see exactly where people drop off, and why, not months later.` | `كيف نعرف إن التبنّي شغّال فعلًا؟` / `قياس التفاعل مبني من أول إصدار، عشان تشوف بالضبط وين ينسحب الناس وليش، مو بعد أشهر.` |

### 4c. Render FAQ — `app/[locale]/services/[slug]/page.tsx`

- Read `service.faq`; render a FAQ section **only when present** (`service.faq && service.faq.length > 0`), placed after "What we do" (and after the optional "Why work with us"), before `<Ticker>`.
- Reuse an accordion. Check `components/sections/FAQ.tsx` (the home FAQ): if it reads `Home.faq` internally, either (a) lift it to accept an optional `items` prop and a heading, or (b) add a small `components/sections/ServiceFAQ.tsx` client accordion taking `items={service.faq}`. Prefer (a) if the refactor is clean; else (b). Keep one-open-at-a-time + chevron rotate, matching the home FAQ.
- Section eyebrow/heading key — `Services.detail.faq`:

| key | EN | AR |
|---|---|---|
| `Services.detail.faq` | `Questions, answered.` | `أسئلة، وأجوبتها.` |

Status **Y**.

### 4d. Sticky sub-nav (build if clean; else document as follow-up)

Per brief: "Only if it fits the current page component cleanly; otherwise document it as a follow-up." The page is a server component; a scroll-spy sub-nav must be an isolated **client island**.

- Add `id`s to the existing sections: `id="overview"` (intro block), `id="why"` (why-you-need-us), `id="what-we-do"`, `id="faq"`.
- New `components/sections/ServiceSubnav.tsx` (client): sticky on desktop (`md:sticky md:top-…`), collapses to a horizontal pill row on mobile; scroll-spy highlights the active anchor; RTL-mirrored; reduced-motion safe (no smooth-scroll if `prefers-reduced-motion`).
- Labels — `Services.detail.nav`:

| key | EN | AR |
|---|---|---|
| `nav.overview` | `Overview` | `نظرة عامة` |
| `nav.why` | `Why` | `لماذا` |
| `nav.whatWeDo` | `What we do` | `ما الذي نقوم به` |
| `nav.faq` | `FAQ` | `الأسئلة الشائعة` |

Status **Y**. **If the sticky/scroll-spy interaction doesn't drop in cleanly, ship anchor `id`s only (harmless) and log the sub-nav as a follow-up in the report** rather than forcing a fragile client wrapper into the server page.

### Verify
`tsc` + build; all three `/services/*` pages render 3 FAQ items each; sub-nav (or anchors) present; `generateStaticParams` still resolves; RTL correct.

---

# STEP 5 — About: "Why Muse / the moment" section

### 5a. New `components/sections/AboutMoment.tsx`

Server component, editorial block, no hover. Insert in `app/[locale]/about/page.tsx` **after `<SubpageHero …/>`, before `<AboutTabs />`** (plan arc: hero → Why Muse → how we work).

Keys — `About.moment`:

| key | EN | AR |
|---|---|---|
| `eyebrow` | `Why Muse` | `لماذا Muse` |
| `lead` | `Saudi Arabia's economy is going through a moment that doesn't repeat itself. Companies are being built from scratch, and a generation of founders and operators is building something genuinely new.` | `يمرّ الاقتصاد السعودي بمرحلة نوعية لم تتكرر مسبقًا. شركات تُبنى من الصفر، وجيل من المؤسّسين والمشغّلين يبني شيئًا جديدًا فعلًا.` |
| `continuation` | `Most of what gets shipped still isn't built to a standard that lasts. That's the gap Muse was built for.` | `لكن أكثر ما يُطلق لسه مو مبني بمعيار يبقى. وهنا وُجدت Muse.` |

- Source: EN `lead` verbatim zto.sa/en/about (bank F / plan #9); EN `continuation` = Muse's own thesis restated (no new claim). AR `lead` first clause verbatim zto.sa/من-نحن; rest native. `Muse` stays Latin.
- Status: `lead` EN **Y**; `continuation` EN **Y**; AR **F** — flag `لسه` + `مو` (possibly one spoken marker too many in a credibility paragraph — see reviewer list).

**Hero stays unchanged:** `About.hero.title` remains "Riyadh-built. Globally standard." / "صُنع في الرياض. بمعيار عالمي." Do NOT mint a category-owning "the … of … in Saudi Arabia" line (plan decision, `E`).

**Optional:** the shared "who we build for" (S4) can also render on About per plan S3. Out of brief scope — note as optional; if wanted, reuse `<WhoWeBuildFor />`, do not fork the copy.

### Verify
`tsc` + build; About order hero → AboutMoment → AboutTabs → Leadership → BeliefSlider → Pressure → CareersTeaser → Ticker → CTA.

---

# STEP 6 — Careers: origin kicker + why-join + claim + human fallback

### 6a. New `components/sections/CareersIntro.tsx`

Server component, editorial block above the role grid. Insert in `app/[locale]/careers/page.tsx` **between `<SubpageHero …/>` and `<CareersList …/>`**. Contains: origin banner → why-join heading → claim line → (optional) purpose line.

### 6b. Human fallback

Render a short line **after `<CareersList />`** (before `<CTA />`) — a "no exact match" beat linking to `/contact`. Can be a small inline `<section>` in the page or a tiny `CareersNoMatch.tsx`.

Keys — `Careers`:

| key | EN | AR | source / status |
|---|---|---|---|
| `origin` | `From the heart of Riyadh to the world.` | `من قلب الرياض إلى العالم` | AR is primary/native, adapted from salla "من قلب مكة إلى العالم" (bank A/E, plan #10). EN is the faithful rendering (origin framing, not a claim). **Y** |
| `whyJoin` | `Join the team building products people here actually use.` | `انضم للفريق اللي يبني منتجات الناس هنا تستخدمها فعلًا.` | adapted mozn.ai/careers (plan #12). EN **Y** / AR **F** (marker `اللي`) |
| `claim` | `We look for the best.` | `نبحث عن الأفضل.` | AR verbatim jobs.salla.com (plan #14); EN adaptation. **Y** |
| `noMatch` | `No exact match? Say hi anyway.` | `ما لقيت اللي يناسبك؟ سلّم علينا على أي حال.` | adapted tenex "say hi anyway" (plan #15). EN **Y** / AR **F** (marker `اللي`) |

**Optional (recommended, Muse's own line):**

| key | EN | AR | source / status |
|---|---|---|---|
| `purpose` | `We work to raise the standard of what gets built in the Kingdom.` | `نشتغل عشان نرفع مستوى اللي يُبنى في المملكة.` | Muse mission restated (plan #22). **Y** / AR **F** (markers `عشان، اللي`) |

- Hero stays: `Careers.hero.title` "Come build with us." / "تعال ابنِ معنا." Do **not** adopt tenex's "Come make history." (plan decision 11, `E`).
- The **habbar portrait** line (plan S2) is *not* in the brief's explicit list — leave out for now (`E`-by-omission) unless Abdullah asks; note in report.

### Verify
`tsc` + build; careers order hero → CareersIntro (origin/why/claim/purpose) → CareersList → noMatch line → CTA; noMatch links to `/contact`; RTL origin banner wraps cleanly (no letter-spacing overflow).

---

# STEP 7 — Contact: conditional CTA line

Edit `app/[locale]/contact/page.tsx`. Add a conditional lead line under the hero — render as a `<p>` at the top of the methods `<section>` (above the methods grid), reading from a new key. Hero title/subtitle unchanged.

Key — `Contact.conditional`:

| key | EN | AR |
|---|---|---|
| `conditional` | `If you're looking for a team to actually build the thing, not just deck it, talk to us.` | `إذا كنت تدوّر على فريق يبني الشيء نفسه، مو بس يسوي عرض عنه، تواصل معنا.` |

- Source: adapted from zto.sa/من-نحن conditional CTA shape (plan #16). EN **Y** / AR **F** (markers `مو، بس` + `تدوّر` — confirm it lands as talking, not performing).
- **Do not** add a "Contact sales" tier or any sales layer (plan §2.6). Keep `info@muse.sa` (no `human@`/`hello@` change — plan decision 7, unresolved).

### Verify
`tsc` + build; line renders on `/en/contact` and `/ar/contact`; no new CTA button.

---

# STEP 8 — Newsletter: AR "تغنيك عن" refinement

The newsletter page exists with copy, so this refinement is in scope. It changes **only the AR** hero subtitle (an authorized existing-string edit per brief Task 8). EN hero title + subtitle stay exactly as they are.

Edit `messages/ar.json` → `Newsletter.hero.subtitle`:

| key | AR (was) | AR (new) |
|---|---|---|
| `Newsletter.hero.subtitle` | `نفس التفكير اللي وراء شغلنا، يوصلك مباشرة بدون ما ترجع تتفقّد.` | `تغنيك عن متابعة أخبار الذكاء الاصطناعي العامة، ونختار لك اللي يستحق.` |

- Source: adapted from thmanyah نشرة أها! "تغنيك عن التصفّح العشوائي…" (bank G, plan #19); daily-ritual framing dropped (Muse is occasional). Status **F** — confirm the ritual echo is gone and it reads native. Marker `اللي`.
- EN unchanged: `Newsletter.hero.title` = "Get the field notes in your inbox." No new EN string.
- Do **not** claim "best" (thmanyah's superlative is `E`). The `زائد:` device and a newsletter name are deferred (plan decisions 8/9) — not this pass.

### Verify
`tsc` + build; `/ar/newsletter` shows the new subtitle; `/en/newsletter` unchanged.

---

# STEP 9 — Footer: worldview line

Edit `components/Footer.tsx`. Add a small muted worldview beat as the closing line — placed in the bottom-left column **directly above `t("rights")`** (the closing-beat position, mirroring tenex's footer worldview slot). New key.

Key — `Footer.worldview`:

| key | EN | AR |
|---|---|---|
| `worldview` | `We build the thing, not the deck about the thing.` | `نبني الشيء نفسه، لا العرض التقديمي عنه.` |

- Source: Muse's own hero line, reused as the footer worldview beat (plan #23). Status **Y**. Distinct from `Home.hero.subtitle` AR (which is the longer "نفكر، نصمّم، ونبني…").
- **Not** added: footer phone / Complaints link / street address (plan decision 10 — no real number/intake; inventing one is a claim we can't make). Keep `Riyadh, Saudi Arabia` and `info@muse.sa` as-is.

### Verify
`tsc` + build; line renders on both locales; AA contrast holds on `#fd4601` (use `text-black/70` like the rights line).

---

# STEP 10 — Full verification pass (run after all steps)

Environment: `export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH"` (node v24.14.0).

1. **Typecheck:** `npx tsc --noEmit` — clean.
2. **Build:** `npm run build` — green, all static params for `/services/[slug]` and `/careers/[slug]` resolve.
3. **Dead-route grep** (expect hits only under `archive/`, plus the one optional `pixelBlastShader.ts` comment):
   ```
   grep -rn "hero-preview\|/playground\|preview/hero-dither\|HeroMonitors\|hero3d\|MonitorsScene\|HeroChoice\|monitorGrade\|children\?:" app components lib messages --include="*.ts" --include="*.tsx" --include="*.json"
   ```
4. **Orphaned-import grep:** confirm nothing live imports `@/components/hero3d`, `@/components/sections/HeroMonitors`, or `@/components/playground/*`.
5. **Sitemap/robots:** `app/sitemap.ts` still lists only the 9 static + content routes; no dev route present. `app/robots.ts` unchanged (allow `/`, disallow `/api/`). Build and eyeball `.next/server/app/sitemap.xml.body` (or hit `/sitemap.xml` on `next start`) — no `hero-preview` / `playground` / `preview` URLs.
6. **i18n parity:** every new key exists in **both** `en.json` and `ar.json` (and both `services.ts` files carry `faq` for all three services). A quick key-diff of the two message files should show no asymmetry among the new namespaces.
7. **No hardcoded copy:** grep the touched components for literal user-facing strings — all copy comes from `next-intl` / the content layer.
8. **RTL smoke test** (`/ar`): role-noun highlight, marquee direction flip, service sub-nav pills, careers origin banner, contact conditional line, footer worldview — all mirror correctly; `Muse` stays Latin everywhere.
9. **Reduced-motion:** WhoWeBuildFor highlight instant (no sweep); marquee static; sub-nav no smooth-scroll.

---

# Strings left EMPTY (not implemented — no honest line exists)

Per `Website Voice.md#We do not claim what is not decided`:
- Proof-as-story band (salla peak-load) — no shipped-work proof.
- Category-owning "the … of … in Saudi Arabia" line (lean) — no category owned.
- Superlative "best" (thmanyah) — cannot claim.
- Local stat "1 in 3 …" (salla) — no verifiable number.
- "Trusted by leaders" marquee (tenex) — client-trust claim.
- Footer phone / Complaints link / street address — no real number or intake.
- Careers "Come make history" dare (tenex) — reads borrowed; kept "Come build with us."
- Habbar careers portrait line — omitted this pass (not in brief's explicit list).

---

# Flagged to the native-Arabic reviewer (ships in code as `F`, gate before `/ar` publishes)

1. **Home.whoWeBuildFor.body (AR)** — markers `اللي، مو`; "مرحلة التجريب التي لا تنتهي" is the termbase rendering of pilot purgatory; confirm the highlight nouns read naturally.
2. **About.moment.lead + .continuation (AR)** — zto half is verbatim; the Muse continuation + `لسه`/`مو` need a check (`لسه` may be one spoken marker too many in a credibility paragraph).
3. **Contact.conditional (AR)** — `مو، بس` + `تدوّر`; confirm it lands as talking, not performing.
4. **Newsletter.hero.subtitle (AR)** — borrowed "تغنيك عن" construction, new object; confirm the daily-ritual echo is fully gone.
5. **Careers.whyJoin / .noMatch / .purpose (AR)** — adapted from mozn/tenex/Muse-mission; confirm no drift toward the banned classical layer and consistent second-person address.
6. **Service FAQ answers (AR, all three services)** — spoken-register rewrites of existing service copy; confirm 1–2-marker density and that none over-performs.
7. **Optional Explore `نسلّم أثرًا` line** — only if added; confirm `أثر` vs reusing Muse's existing "شيء يعمل فعليًا."

General test (`Arabic Termbase.md`): does each new paragraph read as a Riyadh product team talking, or as a translation of an American studio — and does it sit in the 1–2-marker band?

---

# Risk notes

- **globals.css playground removal (Step 1c)** is the only step with a real footgun: the two `@property` registrations near line ~886 back the shipped `.dither-pointer`. Preserve them; build immediately; fall back to leaving the CSS in place if boundaries are unclear.
- **FAQ accordion reuse (Step 4c):** confirm whether `components/sections/FAQ.tsx` is coupled to `Home.faq`; lift to props only if clean, else clone a minimal `ServiceFAQ`.
- **Service sub-nav (Step 4d):** a client scroll-spy inside a server page is the fiddliest interaction here; anchors-only is the safe fallback.
- **Commit granularity:** one commit per step (archive, landing, explore, services, about, careers, contact, newsletter, footer) so any single addition can be reverted without unwinding the rest.
- **Git identity:** repo is under `~/Downloads/personal/` → `user.name alsubaieabdullah`, `user.email abdullah.a.alsubaie@outlook.com` (set locally this session). Re-verify before the first commit.
