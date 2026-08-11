# Muse Site Structure — Implementation Report

**Branch:** `structure/site-implementation`
**Executed by:** Sonnet, against `docs/structure-implementation-plan.md` (Opus).
**Date:** 2026-08-04

Nine logical commits, one per plan step, all on `structure/site-implementation`. `main` was never touched. Nothing was pushed and no PR was opened.

```
c60716d archive: move dev/3D hero + dither playground routes to archive/
5b82418 landing: add Who we build for + Outcomes band, retone marquee
7a58de1 explore: add two-tier CTA to service cards
da09313 services: add per-service FAQ + sticky sub-nav
02afcf2 about: add Why Muse / the moment section
b8d4e1b careers: add origin/why-join/claim/purpose intro + human fallback
1393ddf contact: add conditional lead line above methods
503b7c3 newsletter: refine AR hero subtitle
7d6f598 footer: add worldview line above the rights line
```

---

## Step 1 — Archive dev/3D routes

Moved with `git mv` (history preserved):

- `app/[locale]/hero-preview/` → `archive/app/[locale]/hero-preview/`
- `app/[locale]/preview/` (hero-dither) → `archive/app/[locale]/preview/`
- `app/[locale]/playground/` (dither) → `archive/app/[locale]/playground/`
- `components/hero3d/` (5 files) → `archive/components/hero3d/`
- `components/sections/HeroMonitors.tsx` → `archive/components/sections/HeroMonitors.tsx`
- `components/playground/` (30 files) → `archive/components/playground/`

`components/sections/HomeSections.tsx` dropped the `hero` prop, `HeroChoice` type, `monitorGrade`, and the `children` CC-BY slot — it now renders `<Hero />` unconditionally. `components/sections/Hero.tsx` dropped the `variant` prop, `HeroVariant` type, and the dither (`DitherCursor`) branch, per the plan's optional-but-recommended step 1e — the pixel field is now the component's only background. `DitherCursor`/`DitherCursorScene` were left untouched; they still ship in the CTA panel. `archive/README.md` got a new dated section.

**Fallback taken — `app/globals.css` was NOT edited.** The plan's step 1c called for deleting the `.dither` utility block (~line 523) and the `DITHER PLAYGROUND` block (~line 876–EOF), while preserving two `@property` registrations (`--dither-burst`, `--dither-level`) on the stated premise that they back the shipped `.dither-pointer`. Before cutting anything, I verified every place `.dither-pointer`, `.dither-wash`, `.dither-band`, `--dither-burst`, and `--dither-level` are read or applied:

- `grep` across `components/` and `app/` (outside the now-archived `components/playground/`) found **no** component applying `.dither-pointer`, `.dither-wash`, or `.dither-band`.
- The only place `var(--dither-burst, …)` is read is inside `.dither-pointer` itself (line ~640), which sits entirely inside the block slated for deletion.
- The only place `var(--dither-level)` is read is inside the second (876–EOF) block, also slated for deletion.
- The shipped surfaces (`PageDither`, `CardDither`, `DitherField`) apply `.page-wash` / `.card-dither`, unrelated class names defined elsewhere in the file.

That contradicts the plan's stated reason for keeping the two `@property` rules — the premise didn't hold up. This is exactly the "boundaries prove tangled" case the plan's own risk note anticipated, so the documented safe fallback was taken: **both CSS blocks are left in `globals.css`, dead but valid, untouched.** Recorded in `archive/README.md`'s 2026-08-04 section with the full reasoning. Orphan CSS is harmless; nothing shipped depends on it.

**Verification:** dead-route grep clean (only the one expected benign hit in `components/pixelBlastShader.ts`'s comment); `tsc --noEmit` clean; `npm run build` green, 38 static pages generated, no dev routes in the route table.

---

## Step 2 — Landing additions (S4/S5/S6)

- **`components/sections/WhoWeBuildFor.tsx`** (new, client) — zto.sa "aren't a general audience" framing. Role nouns (`founders`/`operators`, `مؤسّسون`/`مسؤولون`) render via `t.rich("body", { role: … })` wrapped in a `RoleHighlight` that reuses `.hero-highlight`'s box metrics and wipes in via a `clip-path` transition on Motion's `whileInView` (Motion wraps IntersectionObserver internally, fires once, respects `useReducedMotion()` — reduced motion renders the static box with no wipe). RTL-aware: the wipe direction flips per `localeDirection`.
- **`components/sections/OutcomesBand.tsx`** (new, server) — mozn.ai "We deliver outcomes, not just tools." verbatim (EN); the "not just tools" / "لا بعرض تقديمي" clause is wrapped in an `<accent>` rich-text tag rendered in `#fd4601`, so the visible copy stays exactly the reference-bank string with markup added only for styling, not content.
- **`Home.ticker`** changed from the placeholder "Built for the AI-native era" to the existing `About.ticker` commitment line ("Nothing ships that we wouldn't use ourselves" / "لا نطلق ما لا نستخدمه نحن") — reused verbatim, not reworded.
- Wired into `HomeSections.tsx` between `<Manifesto />` and `<Ticker>`. New order: Hero → Approach → Manifesto → WhoWeBuildFor → OutcomesBand → Ticker → FAQ → CTA.

**Verification:** `tsc`/build clean; confirmed via `curl` against a production build on both `/en` and `/ar` that `founders`/`operators`/`مؤسّسون`/`مسؤولون` and both outcomes strings render.

---

## Step 3 — Explore two-tier CTA

`components/sections/Services.tsx`: each card's single CTA link is now a two-link row — the per-service verb stays primary (→ `/services/${slug}`), a new secondary "Get started" (`Services.getStarted` / "ابدأ الآن") links to `/get-started`. Per the per-service-verb rule, the primary keeps its distinct label; only the secondary is the shared conversion verb.

**Deferred (per plan's own recommendation):** the optional Explore-hero "We deliver outcomes, not just tools." conviction sub-line was **not** added — it would duplicate the new Outcomes band on the home page, and its proposed AR (`نسلّم أثرًا`) is a new conviction line the plan itself flagged for review. Skipping it avoids both problems.

**Verification:** `tsc`/build clean.

---

## Step 4 — Service pages: FAQ + sub-nav

- `lib/content/shared.ts`: added optional `faq?: { q: string; a: string }[]` to `Service`.
- `lib/content/en/services.ts` + `lib/content/ar/services.ts`: 3 FAQ items per service (9 total), all grounded rewrites of copy the service already ships (intro/whyReasons/whatWeDo/pillars) — no new claims, exact strings from the plan.
- `components/sections/FAQ.tsx` lifted to accept optional `heading`/`items` props (plan's option (a)) rather than forking a second accordion — Home calls it with no props and keeps reading `Home.faq`; the service page passes `Services.detail.faq` + `service.faq`.
- `app/[locale]/services/[slug]/page.tsx`: renders the FAQ section only when `service.faq?.length`, placed after "Why work with us" (when present) and before the closing `<Ticker>`.
- **Sticky sub-nav shipped** (not the anchors-only fallback) — new `components/sections/ServiceSubnav.tsx` (client): `id`s added to the four sections (`overview`, `why`, `what-we-do`, `faq`); the nav is a horizontal bar sticky at `top-20` (clearing the fixed pill header), pill-styled and horizontally scrollable on mobile, plain text with an active underline on desktop, IntersectionObserver scroll-spy, and instant (not smooth) scroll under `prefers-reduced-motion`. The FAQ pill only appears when the service actually has FAQ items.
  - Note: the plan's illustrative CSS (`md:sticky md:top-…` on a sidebar-style column) assumed a two-column layout; the actual page is a linear stack of full-width sections. Built as a sticky top bar instead of a sidebar to fit the existing layout without a page-wide grid rework — functionally equivalent (sticky, scroll-spy, RTL-safe) but visually a bar, not a rail.

**Verification:** `tsc`/build clean; all 6 `/services/*` static params resolve; `curl`-verified on both `/en/services/ai-transformation` and `/ar/services/gamification-experience` that "Questions, answered." / "أسئلة، وأجوبتها." and the FAQ items render.

---

## Step 5 — About: Why Muse / the moment

New `components/sections/AboutMoment.tsx` (server), inserted in `app/[locale]/about/page.tsx` right after `<SubpageHero>` and before `<AboutTabs>`. `About.moment.lead` is zto.sa's "moment that doesn't repeat itself" verbatim (EN) and its Arabic opening clause verbatim (AR); `.continuation` restates Muse's own thesis (no new claim), AR continuation uses `لسه`/`مو` per the termbase. Hero unchanged — no category-owning line minted.

**Verification:** `tsc`/build clean; `curl`-verified both EN and AR strings render on `/about`.

---

## Step 6 — Careers additions

New `components/sections/CareersIntro.tsx` (server), inserted between `<SubpageHero>` and `<CareersList>` in `app/[locale]/careers/page.tsx`: origin banner (salla's "من قلب مكة إلى العالم" adapted to Riyadh), why-join heading (mozn adapt), claim line (salla verbatim "نبحث عن الأفضل"), and the optional-but-recommended `purpose` line (Muse's own mission restated). A no-exact-match line was added as an inline `<section>` after `<CareersList>`, before `<CTA>`, wrapping the whole "No exact match? Say hi anyway." line in a link to `/contact`. Hero unchanged ("Come build with us.").

**Deferred (per plan, explicitly out of scope this pass):** the habbar careers portrait line was not added.

**Verification:** `tsc`/build clean; `curl`-verified origin/claim/no-match strings on both `/en/careers` and `/ar/careers`.

---

## Step 7 — Contact conditional line

`app/[locale]/contact/page.tsx`: added `Contact.conditional` as a `<p>` above the methods grid — "If you're looking for a team to actually build the thing, not just deck it, talk to us." No sales tier or "Contact sales" structure added; `info@muse.sa` unchanged.

**Verification:** `tsc`/build clean.

---

## Step 8 — Newsletter AR refinement

`messages/ar.json` → `Newsletter.hero.subtitle` changed to the thmanyah-adapted "تغنيك عن متابعة أخبار الذكاء الاصطناعي العامة، ونختار لك اللي يستحق." EN hero (`title` + `subtitle`) untouched. No "best" claim introduced.

**Verification:** `tsc`/build clean; confirmed via `curl` that `/ar/newsletter` shows the new line and `/en/newsletter` is unchanged (no EN edits made).

---

## Step 9 — Footer worldview line

`components/Footer.tsx`: added `Footer.worldview` ("We build the thing, not the deck about the thing." / "نبني الشيء نفسه، لا العرض التقديمي عنه.") directly above the `rights` line — reuses the hero's own line as the footer's closing beat. No phone, Complaints link, or street address added.

**Verification:** `tsc`/build clean; `curl`-verified the line renders on both locales.

---

## Step 10 — Full verification pass

Environment: `export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH"` (node v24.14.0).

1. **Typecheck:** `npx tsc --noEmit` — exit 0, no output.
2. **Build:** `npm run build` — exit 0, green, 38 static pages generated including all 6 `/services/[slug]` and 6 `/careers/[slug]` params.
3. **Dead-route grep:**
   ```
   grep -rn "hero-preview\|/playground\|preview/hero-dither\|HeroMonitors\|hero3d\|MonitorsScene\|HeroChoice\|monitorGrade" app components lib messages --include="*.ts" --include="*.tsx" --include="*.json"
   ```
   One hit: `components/pixelBlastShader.ts:7` — a comment referencing the archived `hero3d/PixelBlastScreen.tsx`, explicitly allowed by the plan (left in place, harmless).
4. **Orphaned-import grep:** `@/components/hero3d`, `@/components/sections/HeroMonitors`, `@/components/playground/*` — zero hits anywhere live.
5. **Sitemap/robots:** `app/sitemap.ts` and `app/robots.ts` unchanged (never referenced the dev routes). Hit `/sitemap.xml` on a production `next start` — 15 `<loc>` entries, none for `hero-preview`/`playground`/`preview`.
6. **i18n parity:** flattened every key path in `messages/en.json` and `messages/ar.json` — **zero** asymmetry (EN-only or AR-only keys). Both `lib/content/{en,ar}/services.ts` carry `faq` for all 3 services (`grep -c "faq"` → 3/3 each).
7. **No hardcoded copy:** grepped every new component (`WhoWeBuildFor`, `OutcomesBand`, `AboutMoment`, `CareersIntro`, `ServiceSubnav`) for bare literal text outside `className`/comments — none found; all copy flows through `next-intl` (`t()`/`t.rich()`) or the content layer.
8. **RTL smoke test** (`/ar`, production build via `curl`): confirmed on-page for `WhoWeBuildFor`, `OutcomesBand`, ticker, `AboutMoment`, `Newsletter`, footer worldview, and `Contact.conditional`; `dir="rtl"` and `lang="ar"` present on `<html>`; `Muse` stays Latin in "لماذا Muse".
9. **Reduced-motion:** `WhoWeBuildFor`'s `RoleHighlight` checks `useReducedMotion()` and renders the static box with no clip-path transition; `ServiceSubnav`'s anchor clicks check `prefers-reduced-motion` and use `scrollIntoView({ behavior: "auto" })` instead of `"smooth"`.

---

## Strings left EMPTY (per plan, no honest line exists)

- Proof-as-story band (salla peak-load) — no shipped-work proof.
- Category-owning "the … of … in Saudi Arabia" line (lean) — no category owned.
- Superlative "best" on the newsletter (thmanyah) — cannot claim.
- Local stat "1 in 3 …" (salla) — no verifiable number.
- "Trusted by leaders" marquee (tenex) — client-trust claim; used the commitment line instead.
- Footer phone / Complaints link / street address — no real number or intake.
- Careers "Come make history" dare (tenex) — kept "Come build with us."
- Habbar careers portrait line — omitted this pass, not in the brief's explicit list.
- Explore-hero "نسلّم أثرًا" conviction line — skipped per plan's own recommendation (duplicates Outcomes band; flagged AR line never shipped).

## Fallbacks / deviations from the plan's literal execution

1. **`app/globals.css` untouched** (Step 1c fallback) — see Step 1 section above for the full verification that shows the plan's stated `.dither-pointer` dependency doesn't hold; took the documented safe path instead of risking `.dither-pointer`/`--dither-burst` incorrectly.
2. **Service sub-nav shipped as a sticky top bar, not a sidebar** (Step 4d) — the plan's illustrative CSS implied a sidebar-style column; the page's actual layout is a linear section stack, so a horizontal sticky bar was built instead to avoid a page-wide grid rework. Functionally equivalent (sticky, scroll-spy, RTL-safe, reduced-motion safe).

## Flagged to the native-Arabic reviewer (ships in code as `F`, gate before `/ar` publishes)

1. **`Home.whoWeBuildFor.body` (AR)** — markers `اللي، مو`; confirm the highlight nouns read naturally.
2. **`About.moment.lead` + `.continuation` (AR)** — zto half is verbatim; the Muse continuation + `لسه`/`مو` need a check (`لسه` may be one spoken marker too many in a credibility paragraph).
3. **`Contact.conditional` (AR)** — `مو، بس` + `تدوّر`; confirm it lands as talking, not performing.
4. **`Newsletter.hero.subtitle` (AR)** — borrowed "تغنيك عن" construction, new object; confirm the daily-ritual echo is fully gone.
5. **`Careers.whyJoin` / `.noMatch` / `.purpose` (AR)** — adapted from mozn/tenex/Muse-mission; confirm no drift toward the banned classical layer and consistent second-person address.
6. **Service FAQ answers (AR, all three services)** — spoken-register rewrites of existing service copy; confirm 1–2-marker density and that none over-performs.

General test (`Arabic Termbase.md`): does each new paragraph read as a Riyadh product team talking, or as a translation of an American studio — and does it sit in the 1–2-marker band?
