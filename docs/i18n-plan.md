# Bilingual (Arabic / English) Implementation Plan

Status: **Phases 1 to 4 complete, verified, and committed** (2026-08-01). **Batch 6 no longer
exists**: the 28 playbooks failed [[Website Voice]] 0 out of 28 and were retired to `archive/`
on 2026-08-01 (commit `a29d75f`), taking 31,282 words and ~90% of the content programme with
them. What remains of Phase 5 is native review of Batches 0 to 3, roughly 3,900 words.
Written 2026-08-01. See sections 14 to 19 for what shipped and where this plan was wrong.

`PUBLISHED_LOCALES` is still `["en"]`. Nothing about Arabic is public until the review gate in
section 18 clears.

Takes muse.sa from an English-only site to a fully bilingual one with Arabic as the primary
locale. The technical pattern is lifted from the Lean website (`next-intl` v4, `/ar` + `/en`
path segments), minus its Sanity CMS layer, which Muse does not use.

Governed by [[Localization Playbook]] and [[Brand Voice]] in `Muse Vault/`.

---

## 1. Decisions, locked

| Decision | Value | Why |
|---|---|---|
| Library | `next-intl` v4 | Declares `next: ^16.0.0` as a peer, so it fits Next 16.1.6. Proven in the Lean build. |
| Locales | `["ar", "en"]` | |
| Default locale | `ar` | Localization Playbook Rule Zero: Arabic is the first language of the product. |
| URL shape | `localePrefix: "always"` | Both locales prefixed: `/ar/...` and `/en/...`. See below. |
| `x-default` | `/en` | Serves visitors matching neither locale. A French speaker is better served English. |
| Slugs | Shared Latin across both locales | Language switcher and hreflang pairing become trivial. Per-locale slugs can be added later without a migration. |
| Numerals in Arabic | Western (0-9) | Localization Playbook: most Saudi digital products use Western numerals. |
| Dates in Arabic | Gregorian, Arabic month names | Hijri does not earn its complexity on a marketing site. |
| Scope | Full parity, all content | Confirmed by Abdullah. No partial-translation fallbacks. |

### Why both locales get a prefix

Arabic at the root was considered and rejected for one specific reason: `muse.sa/insights/foo`
currently serves English and is indexed that way. Making Arabic the unprefixed default would
have that same URL start serving Arabic, swapping the language of already-indexed pages with
no redirect to signal it. Prefixing both means the old English URL 308s to `/en/insights/foo`,
which preserves its equity and keeps the language of every URL stable.

Supporting reasons: prefixed URLs are unambiguous to cache (an unprefixed path varying by
`Accept-Language` is a CDN poisoning risk), the canonical and hreflang helpers need no
special-casing for the default locale, and adding a third locale later costs nothing.

Arabic-first still holds at the root: bare `/` resolves to `/ar` unless the visitor's
`Accept-Language` says otherwise.

---

## 2. Translation surface, measured

**Superseded — recounted 2026-08-01 against the post-retirement tree.** The original table was
written before Insights and the newsletter back catalogue were archived, and it costed a content
programme roughly twice the real size. Current figures:

| Source | Items | Words |
|---|---:|---:|
| `lib/content/playbooks.ts` | 28 | 31,282 |
| `lib/content/services.ts` | 3 | 1,136 |
| `lib/content/careers.ts` | 3 | 458 |
| UI prose in `components/` | n/a | ~2,250 |
| Page metadata (`buildMetadata` title + description) | 13 pairs | ~350 |
| **Total translatable** | **34 content items** | **~35,100** |

Original (stale) figures, kept so the delta is legible: 89 items / ~66,800 words, including
`insights.ts` (43 items, 26,484 words) and `newsletters.ts` (12 items, 4,316 words). Both now
live in `archive/content/` and are **not** translated. `/newsletter` survives as a signup page
only, so it contributes chrome but no articles.

Note on the UI figure: `wc -w` over `components/sections/*.tsx` returns ~7,500, but that counts
JSX and code tokens. Actual prose to translate is roughly 2,250 words.

---

## 3. Target architecture

```
app/
  layout.tsx              DELETED. [locale]/layout.tsx becomes the root layout.
  global-error.tsx        NEW. Root-level error boundary, renders its own html/body.
  sitemap.ts              stays at root, emits both locales
  robots.ts               stays at root
  opengraph-image.tsx     stays at root (generic fallback)
  api/                    stays at root, MUST be excluded from the proxy matcher
    contact/route.ts
    get-started/route.ts
    subscribe/route.ts
  [locale]/
    layout.tsx            <html lang dir>, fonts, setRequestLocale, NextIntlClientProvider
    not-found.tsx         branded 404 inside the locale chrome
    [...rest]/page.tsx    catch-all that calls notFound()
    opengraph-image.tsx   NEW. per-locale OG image (deferred to Phase 4)
    page.tsx              (home)
    about/ careers/ contact/ explore/ get-started/
    newsletter/ playbooks/ privacy/ services/ terms/
                          (no insights/ — retired, see archive/README.md)

i18n/
  routing.ts              defineRouting({ locales, defaultLocale, localePrefix })
  request.ts              loads messages/{locale}.json
  navigation.ts           locale-aware Link, useRouter, usePathname, redirect

messages/
  ar.json
  en.json

lib/content/
  shared.ts               types unchanged
  en/{services,insights,playbooks,newsletters,careers}.ts
  ar/{services,insights,playbooks,newsletters,careers}.ts
  index.ts                getServices(locale), getInsights(locale), ...

proxy.ts                  next-intl middleware (Next 16 filename)
```

Confirmed against the Lean tree: there is **no `app/layout.tsx`** when `[locale]/layout.tsx`
renders `<html>`. Next allows the dynamic segment's layout to be the root layout, and
next-intl's own docs prescribe deleting the root one. `global-error.tsx` sits at the app root
and renders its own `<html>`/`<body>` because it replaces the whole tree when it fires.

---

## 4. Phase 1: plumbing

Ships invisible. Arabic renders English copy until Phase 5. Nothing user-facing changes.

1. `npm i next-intl`
2. Create `i18n/routing.ts`:
   ```ts
   import { defineRouting } from "next-intl/routing";

   export const routing = defineRouting({
     locales: ["ar", "en"],
     defaultLocale: "ar",
     localePrefix: "always",
   });

   export type Locale = (typeof routing.locales)[number];
   ```
3. Create `i18n/request.ts` and `i18n/navigation.ts`, copied from the Lean versions verbatim
   (they are 15 and 5 lines respectively and carry no project-specific logic). The message
   import resolves through the existing `@/*` tsconfig alias.
4. Create `proxy.ts`:
   ```ts
   import createMiddleware from "next-intl/middleware";
   import { routing } from "./i18n/routing";

   export default createMiddleware(routing);

   export const config = {
     matcher: "/((?!api|_next|.*\\..*).*)",
   };
   ```
   Next 16.1.6 supports both filenames (`PROXY_FILENAME = 'proxy'` is present in the installed
   build), and `proxy.ts` is the current convention. Lean stayed on `middleware.ts` only
   because the OpenNext Cloudflare adapter requires edge middleware; Muse has no such
   constraint. If next-intl's types object to the proxy signature, `middleware.ts` still works
   in 16.1.6 and is a one-line fallback.
5. Wrap `next.config.ts`:
   ```ts
   import createNextIntlPlugin from "next-intl/plugin";
   const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
   export default withNextIntl(nextConfig);
   ```
6. Add legacy redirects to `next.config.ts` (detail in section 8).
7. Move all 16 route folders under `app/[locale]/`. Leave `api/`, `sitemap.ts`, `robots.ts`,
   `opengraph-image.tsx` at the root.
8. Delete `app/layout.tsx`, create `app/[locale]/layout.tsx` carrying its contents plus:
   `generateStaticParams()` from `routing.locales`, `setRequestLocale(locale)`,
   `<html lang={locale} dir={dir}>`, and `NextIntlClientProvider`.
9. Add `setRequestLocale(locale)` to **every** page component.
10. Add `app/[locale]/not-found.tsx`, `app/[locale]/[...rest]/page.tsx`, `app/global-error.tsx`.

**Acceptance:** `npm run build` produces static pages for both locales (check the build output
marks routes as `SSG`, not `ƒ Dynamic`). `/en/insights` and `/ar/insights` both render. All
three API routes still accept POSTs. `/` redirects by `Accept-Language`.

**The `setRequestLocale` trap.** Skip it on any page and that page silently falls back to
dynamic rendering. `next.config.ts` already documents that the static-first architecture is
load-bearing for this site (it is the stated reason the CSP still carries `'unsafe-inline'`).
Losing static generation to an i18n migration would be a serious regression, and it fails
quietly, so the build output must be diffed against the current one.

---

## 5. Phase 2: string extraction

**Shipped 2026-08-01 — see section 15 for the namespaces as built and the six places this
section was wrong.**

Pure refactor. Still English-only and fully reviewable as a no-op to the rendered output.

Extract inline copy into `messages/en.json` under these namespaces, mirroring Lean's scheme:

| Namespace | Source |
|---|---|
| `Nav` | `menuItems` in the old `app/layout.tsx:16` |
| `Footer` | `resourceLinks` / `legalLinks` in `components/Footer.tsx:5,11` |
| `Home` | `Hero`, `Approach` (incl. `cardCopy`, now `{body, promise}` per service), `Manifesto`, `FAQ` (`faqs:6`), `CTA`, `Ticker`, `TrustedBy`. Copy is in section 13, which supersedes whatever is in the files. `Testimonials` was deleted on 2026-08-01 |
| `About` | `AboutTabs` (`values:8`), `BeliefSlider` (`beliefs:6`), `Leadership` (`team:6`) |
| `Services` | section chrome only; the 3 service records stay in `lib/content` |
| `Insights` / `Playbooks` / `Newsletter` | list chrome, filters, pagination, `RelatedContent` |
| `Careers` | `CareersList` (`departments:7`), `CareersTeaser` |
| `Contact` | `app/contact/page.tsx:16` (`methods`), `ContactForm` (`projectTypes:5`) |
| `GetStarted` | `app/get-started/page.tsx:13`, `GetStartedForm` (`revenueBands:8`, `hearAboutOptions:17`) |
| `Legal` | `app/privacy/page.tsx:11`, `app/terms/page.tsx:11` (`sections`) |
| `Common` | buttons, form validation, loading and error states |
| `NotFound` / `Error` | new, for the 404 and error boundaries |
| `Metadata` | the 22 `buildMetadata` title/description pairs |
| `LanguageSwitcher` | `"ar": "العربية"`, `"en": "English"` |

Also in this phase:
- Swap the 15 `next/link` imports to `@/i18n/navigation`'s `Link`.
- ~~Swap `usePathname`/`useRouter` in `components/sections/InsightsList.tsx:28-29`~~ — file
  deleted with the Insights retirement.
- **`components/PageLoader.tsx:32` must KEEP `next/navigation`'s `usePathname`.** This plan
  originally said to swap it; that is wrong. The loader compares the hook's value against
  `window.location.pathname` (lines 73 and 86), and the `@/i18n/navigation` version strips the
  locale prefix, so the comparison would never match and the loader would dissolve instantly on
  every navigation. It is the one deliberate exception, documented in `i18n/navigation.ts`.
- `messages/ar.json` is created as a byte-identical copy of `en.json` so the app runs in both
  locales; it gets its real content in Phase 5.

**Acceptance:** rendered English output is byte-identical to before the phase. `git diff` on a
rendered-HTML snapshot is the check.

---

## 6. Phase 3: RTL correctness

Verifiable **before** any Arabic exists: force `dir="rtl"` with English text and every break
surfaces. Eight files carry the work.

**Real bugs, not cosmetics:**

- `lib/useHorizontalScroll.ts:31` and `:44`. `track.scrollLeft += e.deltaY` and
  `scrollBy({ left: direction * width })`. In RTL, `scrollLeft` runs negative from zero, so
  both the wheel remap and the prev/next buttons scroll backwards. Affects
  `components/sections/BeliefSlider.tsx` and `components/OutlineTrack.tsx`. Fix by reading
  the computed direction once and flipping the sign.
- Directional arrow glyphs `→` in `components/sections/Approach.tsx:67`,
  `components/sections/Services.tsx:77`, `components/sections/CareersList.tsx:51`. Must render
  `←` in RTL.

**Logical property conversions** (the codebase currently has zero logical properties):

| File | Change |
|---|---|
| `components/sections/FAQ.tsx:54` | `text-left` to `text-start` |
| `components/sections/ArticleFAQ.tsx:29` | `text-left` to `text-start` |
| `components/sections/TrustedBy.tsx:31` | `text-right` to `text-end` |
| `components/sections/RichContent.tsx:35` | `border-l-2` to `border-s-2`, `pl-6` to `ps-6` |
| `components/sections/Hero.tsx:99` | `pl-5 pr-3 md:pl-6 md:pr-4` to `ps-/pe-` |
| `components/sections/CTA.tsx:19` | same button padding pattern |
| `components/sections/Manifesto.tsx:56` | same button padding pattern |

`components/sections/Hero.tsx:92` uses `border-l-[8px]` to draw a CSS triangle. That is a
shape, not a layout direction, but it points right and so needs mirroring in RTL.

**Navigation panel:** `components/StaggeredMenu.tsx` is already RTL-capable. It accepts
`position?: 'left' | 'right'` (line 18), the GSAP offscreen maths keys off it
(`position === 'left' ? -100 : 100`, lines 99 and 232), and `[data-position='left']` CSS
overrides exist at lines 540 and 542. Flipping it is `position={locale === "ar" ? "left" : "right"}`.

**Typography:** add IBM Plex Sans Arabic per [[Brand Colour & Type]], which settled on Space
Grotesk for English and IBM Plex Sans Arabic for Arabic. Neither font carries the other's
glyphs, so a single stacked `font-family` resolves each script automatically with no per-run
markup. Load via `next/font/google` with `subsets: ["arabic"]`. The existing CSP
(`font-src 'self' data:`) needs no change because `next/font` self-hosts.

**Mixed-direction strings** are where RTL bugs concentrate per the Localization Playbook: an
Arabic sentence containing "Muse", a Latin service name, or a phone number. Test these
specifically rather than assuming.

**Acceptance:** every route screenshotted at `dir="rtl"` in mobile, tablet and desktop widths,
compared against LTR. Carousels scroll the correct way. No horizontal overflow.

---

## 7. Phase 4: content layer and SEO

**Content layer.** Types in `lib/content/shared.ts` stay untouched, including the `Summary`
`Pick<>` boundary that keeps article bodies out of client bundles. Split the data into
`lib/content/{en,ar}/` and expose accessors from `index.ts`:

```ts
export function getInsights(locale: Locale): Insight[] {
  return locale === "ar" ? arInsights : enInsights;
}
```

Full parity means no fallback logic, no conditional hreflang, and no sitemap filtering. If
parity ever slips, the honest behaviour is for the article to not exist in that locale rather
than to appear in English under Arabic chrome. That is a [[Localization Playbook]] rule ("no
translated placeholders"), and it is worth an explicit test so a future gap fails loudly.

**SEO.** Port Lean's `alternatesFor()` into `lib/seo.ts` and give `buildMetadata` a `locale`
parameter:

- Canonical is **self-referential per locale**. Pointing Arabic canonicals at English tells
  Google the Arabic pages are duplicates and drops them from the index. This is the single
  highest-consequence detail in the whole plan.
- `languages` map carries both locales plus `x-default` to `/en`.
- `openGraph.locale` becomes `ar_SA` or `en_US`, with `alternateLocale` set to the other.
- `app/sitemap.ts` emits both locales for all 89 content items plus the static routes.
- `buildArticleJsonLd` and `buildJobPostingJsonLd` need an `inLanguage` field and localized
  organization names.
- Add `app/[locale]/opengraph-image.tsx` so shared Arabic links preview in Arabic.

**Acceptance:** every page returns a self-referential canonical and a complete hreflang set.
Sitemap contains 2x the current URL count. Validate a sample in Google's Rich Results Test.

---

## 8. Legacy URL redirects

Add to `next.config.ts`. These run **before** the proxy, which is what makes them work:

```ts
async redirects() {
  const paths = ["explore", "about", "careers", "insights", "playbooks",
                 "newsletter", "contact", "get-started", "privacy", "terms", "services"];
  return [
    ...paths.map((p) => ({ source: `/${p}`, destination: `/en/${p}`, permanent: true })),
    ...paths.map((p) => ({ source: `/${p}/:slug*`, destination: `/en/${p}/:slug*`, permanent: true })),
  ];
}
```

Do **not** add a redirect for `/`. Leave it to the proxy so locale detection runs.

Why this matters: without these, an existing English URL like `/insights/foo` would fall
through to the proxy, get locale-detected, and land a Saudi visitor with an Arabic
`Accept-Language` on `/ar/insights/foo`. An inbound English link would silently change
language. The explicit 308s keep English links on English pages.

---

## 9. Phase 5: the Arabic content programme

~66,800 words. This is a content programme, not a build task, and it is the critical path.

[[Brand Voice]] is unambiguous: *"Arabic is not a translation of the English. It is written
natively"* and *"Never machine translate anything customer facing."* The Localization Playbook
closes with "reviewed by someone who writes Arabic well." That human review gate is a
prerequisite for shipping, not a nice-to-have.

**Sequence, smallest and most brand-defining first**, so register is corrected on cheap
material before expensive material is committed:

| Batch | Content | Words | Gate |
|---|---|---:|---|
| 0 | Termbase and register guide | n/a | Review before anything else |
| 1 | UI chrome (`messages/ar.json`) | ~2,500 | Review |
| 2 | `services.ts`, 3 records | 1,136 | Review, register locked here |
| 3 | `careers.ts` + 22 metadata pairs | ~1,050 | Review |
| 4 | `newsletters.ts`, 12 issues | 4,316 | Spot check |
| 5 | `insights.ts`, 43 articles (~616 words each) | 26,484 | Batched, spot check |
| 6 | `playbooks.ts`, 28 articles (~1,117 words each) | 31,277 | Batched, spot check |

**Batch 0 is the highest-leverage step.** Fixing how the recurring terms render, decided once
and applied everywhere, is what stops the Arabic reading as translationese. At minimum:
AI transformation, product engineering, gamification, playbook, insight, newsletter, case
study, engagement, discovery, roadmap, agentic, guardrails, production, prototype, plus the
register decision (Modern Standard Arabic, and how formal). The Localization Playbook warns
that formality register is a real design decision: too casual reads unprofessional, too formal
reads like a government form.

**Muse stays "Muse"** in Arabic, unstransliterated, per the brand's Latin wordmark.

---

## 10. Risk register

| Risk | Severity | Mitigation |
|---|---|---|
| A page missing `setRequestLocale` silently goes dynamic | High | Diff the build output route table before and after Phase 1 |
| Proxy matcher catches `/api`, 404ing every form | High | Matcher excludes `api`. Test all 3 routes in Phase 1 acceptance |
| Arabic canonicals point at English, AR dropped from index | High | Self-referential canonical, verified per page in Phase 4 |
| Existing English URLs redirect to Arabic | Medium | Explicit 308s in `next.config.ts`, section 8 |
| Machine-translated copy ships | High (brand) | Native authoring, review gates in section 9 |
| Carousels scroll backwards in RTL | Medium | Fixed and screenshot-verified in Phase 3 |
| Content programme stalls, half-Arabic site ships | Medium | Batch order front-loads the pages with the most traffic |

---

## 11. Sequencing

Phases 1 to 4 are engineering and can run back to back. Phase 5 is the long pole and can start
in parallel from the moment Phase 2 defines the namespace keys, since Batch 0 and Batch 1 do
not depend on any remaining engineering.

Phases 1 to 3 are safely shippable to production before any Arabic exists: `/ar` renders
English, which is invisible to users because nothing links to it yet. That keeps the migration
off a long-lived branch.

Do not link the language switcher into the header until Batch 2 lands. An Arabic locale that
renders English copy is worse than no Arabic locale.

---

## 12. Open questions

- Who is the native Arabic reviewer, and what turnaround should the batch gates assume?
- Do the 43 insights and 28 playbooks all warrant Arabic, or is some of that archive worth
  retiring rather than translating? 57,761 of the 66,800 words sit in those two files.
- Arabic slugs for Arabic SEO: deferred to post-launch, but worth confirming that is acceptable.

---

## 13. Approved landing page copy, 2026-08-01

The homepage was rewritten on 2026-08-01 against [[Website Voice]], the third register added to
[[Brand Voice]] the same day. **This section is the Arabic source of truth for the `Home`
namespace.** Writing Arabic from the pre-rewrite copy would translate text that is no longer on
the site.

### What changed structurally

| Change | Effect on this plan |
|---|---|
| `Testimonials` section deleted, invented quotes | Drop from the `Home` namespace in section 5 |
| `CaseStudies` section deleted, invented clients | `/explore` loses a block. Not in any namespace |
| `TrustedBy` logo strip and background photo removed | Section survives as the pressure block. Keep in `Home`, one string |
| Homepage went from nine blocks to seven | ~250 fewer words in the UI prose estimate |
| FAQ: two duplicate questions merged, "Who's on the team?" added | Still 5 entries |
| Pricing and story point copy removed from `services.ts` | See [[Website Voice#We do not claim what is not decided]] |

Net effect on section 2's table: UI prose drops to roughly 2,250 words. The 89 content items
are unchanged, since nothing in `lib/content/` was added or removed, only edited.

### The copy

**Hero**
> Everyone has an AI strategy. Almost nobody has shipped one.
>
> We're a product team in Riyadh.
> We actually build the thing, not just the deck about the thing.
>
> `Get in touch`

**Our approach**
> Muse helps you shift from AI-absent to AI-native.

Each of the three cards is a body plus one checkable promise. The promise is a separate string
and must stay visually distinct in Arabic too.

| Card | Body | Promise |
|---|---|---|
| AI Transformation | Staying AI-absent isn't a neutral choice. We find the highest-leverage places to put AI to work in how your business actually runs, and stand up the systems that do it, with guardrails from day one. | Every engagement ends with something running in production, not a slide deck. |
| Product Engineering | Good ideas stall when engineering can't move at the pace the business needs. We design and ship production-grade software, and the same senior team stays with you from first prototype to production scale. | You see it running early and often, not in one reveal at the end. |
| Gamification & Experience | New tools compete with old habits, and habits win by default. We design the reward systems, onboarding and prototypes that make a change stick instead of quietly dying. | You're clicking through something real in the first week. |

**Manifesto**
> The next decade of software gets decided in the next two years.
>
> The cost of building good software is collapsing. That doesn't help you on its own. It means the gap between the companies that move and the ones that plan is about to get permanent.
>
> You could drive that from inside. Most won't, and not for lack of ambition. Day to day operations always win the calendar.
>
> We're not interested in your roadmap for this quarter. We're interested in the one that matters in five years.
>
> `Get started`

**Playbooks** — eyebrow `Playbooks`, heading `Practical guides, not theory.`, link `View all playbooks`

**Pressure block** — `AI isn't optional.` + `Waiting is the risk.` (two strings; the second is the emphasised half)

**Ticker** — `Built for the AI-native era`

**FAQ** — heading `Questions? We have answers.`

1. How is Muse different from a typical dev shop? / We're a small, senior team, not a rotating cast of contractors. No 100-slide strategy decks with nothing behind them. We scope fast, build with you, and measure ourselves on what actually shipped.
2. What does AI transformation actually mean? / Finding where AI removes real friction in how your business runs, building the systems that do it reliably, and getting your team actually using them. Then repeating that cycle as the tools improve.
3. Who's on the team? / A small senior team based in Riyadh. The people who scope your work are the people who build it, so you're talking to engineers in the first conversation rather than a sales layer. Names and backgrounds are on the about page.
4. How does pricing work? / Every engagement is scoped and priced on its own, once we understand what you're actually trying to do. Tell us the problem and we'll come back with a number and exactly what sits inside it.
5. Who do you typically work with? / Teams that want to move at startup speed. That runs from a founder shipping a first product to an enterprise team trying to get an AI initiative out of pilot purgatory.

**Close**
> Tell us what you're trying to build.
>
> `Get started`

### Lines that will not survive literal translation

Batch 0 in section 9 should settle these before anyone drafts the Arabic. Each one carries its
force through English idiom or rhythm, so a faithful translation produces a limp sentence. These
need a native line that lands the same point, per [[Brand Voice#Arabic voice]].

| Line | Problem |
|---|---|
| Everyone has an AI strategy. Almost nobody has shipped one. | A two-beat reversal. The Arabic needs its own reversal, not this sentence twice |
| We actually build the thing, not just the deck about the thing. | "The thing" repeated as deliberate understatement. Literal Arabic reads as vague, not dry |
| pilot purgatory | Religious-adjacent English idiom. Needs a plain Arabic equivalent for a stalled pilot |
| Day to day operations always win the calendar. | "Win the calendar" is not an Arabic construction |
| instead of quietly dying | Register risk. Too literary in formal Arabic, too blunt in casual |
| No 100-slide strategy decks with nothing behind them. | Keep the number. It is the specific bit doing the work |
| AI-absent to AI-native | Coined pair, used in the heading and the first card. Must be one decided term in the termbase and used identically in both places |

### RTL items already done

Three of section 6's logical-property conversions were completed during the 2026-08-01 rewrite,
because the files were open anyway:

- `components/sections/TrustedBy.tsx` `text-right` to `text-end` **done**
- `components/sections/FAQ.tsx` `text-left` to `text-start` **done**
- The new promise line in `components/sections/Approach.tsx` was authored with `border-s-2 ps-3`
  rather than `border-l-2 pl-3`, so it needs no conversion

`components/sections/ArticleFAQ.tsx`, `RichContent.tsx`, `Hero.tsx`, `CTA.tsx` and `Manifesto.tsx`
still carry physical properties, and the `→` arrows in `Approach.tsx`, `Services.tsx` and
`CareersList.tsx` still need mirroring. Section 6 remains otherwise accurate.

Note that `Hero.tsx` was rebuilt independently on 2026-08-01 (the statue and `Motion3D` were
replaced with a `PixelBlast` WebGL field). Re-check its line references in section 6 before
working from them.

### This file is not in version control

`.gitignore` line 13 ignores `/docs`, so this plan exists only on one machine. It is 18 KB of
decisions that would be expensive to reconstruct, and it cannot be shared with anyone else on
the repo. Worth either committing it or moving it into `Muse Vault/`, which is tracked. See
[[Tooling Stack#Back this vault up]].

---

## 14. Phase 1 implementation record, 2026-08-01

Phase 1 shipped and was verified at runtime. `next-intl@4.13.4` installed; it declares
`next: ^16.0.0` as a peer, and the installed Next 16.1.6 does carry `PROXY_FILENAME`, so
`proxy.ts` was used as planned. next-intl exposes no `/proxy` subpath, but the function exported
from `next-intl/middleware` has the signature Next 16 expects, so no fallback was needed.

### Files added

```
i18n/routing.ts          locales, defaultLocale, localePrefix, localeDirection, PUBLISHED_LOCALES
i18n/request.ts          loads messages/{locale}.json
i18n/navigation.ts       locale-aware Link / redirect / usePathname / useRouter / getPathname
messages/{ar,en}.json    empty objects; populated in Phase 2
proxy.ts                 next-intl middleware + matcher
lib/fonts.ts             shared next/font instances (see the 404 note below)
app/global-error.tsx     inline-styled last-resort boundary, renders its own html/body
app/[locale]/not-found.tsx
app/[locale]/[...rest]/page.tsx
```

`app/layout.tsx` was deleted; `app/[locale]/layout.tsx` is now the root layout. All 13 routes moved
under `app/[locale]/`. `api/`, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `globals.css` and
`favicon.ico` stayed at the app root. Relative imports in the moved files were switched to the
`@/` alias so a future move costs nothing.

### Corrections to this plan, found while implementing

1. **`/opengraph-image` had to be excluded from the proxy matcher.** Section 4's matcher
   `/((?!api|_next|.*\\..*).*)` looks complete, but the OG image route has no file extension, so
   the `.*\\..*` escape does not cover it. It would have been rewritten to `/ar/opengraph-image`,
   which does not exist — breaking every social preview on the site. The shipped matcher is
   `/((?!api|_next|_vercel|opengraph-image|.*\\..*).*)`.

2. **`PageLoader.tsx` keeps `next/navigation`.** See the correction in section 5.

3. **Pages needed `generateMetadata`, not `export const metadata`.** A static metadata object
   cannot see the locale, so every canonical would have been wrong the moment `/ar` existed. All
   13 pages now export `generateMetadata` and thread `locale` into `buildMetadata`. Doing this in
   Phase 1 rather than Phase 4 avoided touching all 13 pages twice.

4. **Phases 1 to 3 were not actually safe to ship as section 11 claimed.** The reasoning there
   was that "nothing links to `/ar`" — but hreflang alternates and the sitemap *are* links to it,
   and `/ar` currently serves English copy. Shipping that would have invited Google to index
   English pages declared as Arabic. Closed with `PUBLISHED_LOCALES` in `i18n/routing.ts`:
   an unpublished locale is `noindex, nofollow`, is absent from the sitemap, and is absent from
   the hreflang set. It is currently `["en"]`. **Flip it to `routing.locales` when Batch 2 lands
   — the same gate as the language switcher, and not before.**

5. **Section 8's redirect list needed composing with the retirement redirects**, not appending to
   them. Order matters, and `/insights/:slug` now goes straight to `/en/playbooks` rather than
   hopping through `/playbooks`. `services` is deliberately excluded from the bare-path list
   because there is no `/services` index route.

### Phase 4 SEO brought forward

`lib/seo.ts` now carries `localizedPath()` and `alternatesFor()`, self-referential per-locale
canonicals, `openGraph.locale`/`alternateLocale`, and `inLanguage` on both JSON-LD builders.
`app/sitemap.ts` emits one entry per published locale with a matching `xhtml:link` alternates set.
Still outstanding in Phase 4: the `lib/content/{en,ar}/` split and `app/[locale]/opengraph-image.tsx`.

### One Phase 3 RTL bug fixed early, because it broke every Arabic page

`.skip-link` in `app/globals.css` was parked at `left: -999px`. In LTR that is free — overflow past
the *start* edge does not extend `scrollWidth`. Under `dir="rtl"` the start edge is on the right,
so the same rule produced **999px of real horizontal scroll on every `/ar` route**, at every
viewport. Replaced with a direction-agnostic clip (`width/height: 1px` + `clip-path: inset(50%)`,
revealed on `:focus`). Measured before and after: 999px → 0px, reproducible across two runs at
1440px and 390px, both locales.

This is not in section 6's list, which means section 6 is a list of *known* RTL issues, not a
complete one. Phase 3 should re-run the overflow probe rather than working only from that table.

### New Phase 3 finding, not yet fixed

`components/WordReveal.tsx` splits a heading into one inline-block span per word. Under RTL those
spans lay out right-to-left, which is correct for Arabic but reverses **Latin** runs — the English
404 heading renders as "existdoesn't page This". Harmless once headings are Arabic, but it will
scramble any Latin run inside an Arabic heading, which is exactly the mixed-direction case
section 6 already flags as where RTL bugs concentrate. Needs a `dir="ltr"` / `unicode-bidi`
wrapper on Latin runs, or per-word direction detection.

### Known limitation accepted, not a defect in the wiring

The 404 subtree is **client-rendered** on Next 16.1.6. `notFound()` returns a correct 404 status
with the flight payload but no server-rendered markup, and Next substitutes its own
`<html id="__next_error__">` shell, dropping the layout's `lang`, `dir` and body classes.
Confirmed as framework behaviour: it reproduces with `global-error.tsx` removed and with a fully
synchronous `not-found.tsx`. Mitigated by having `not-found.tsx` carry its own `lang`, `dir` and
font variables on a wrapper (hence `lib/fonts.ts`), so the rendered result is correct once
hydrated. The 404 *status* is server-side, which is the part crawlers act on.

### Verification performed

- `next build`: 96 static pages, both locales. Every route `●  SSG`; only `/[locale]/[...rest]`
  and the three API routes are `ƒ Dynamic`, which is correct. No page silently went dynamic, so
  the `setRequestLocale` trap in section 4 was avoided.
- 26 route/locale combinations over HTTP: all 200, correct `<html lang dir>`, self-referential
  canonical, `/ar` `noindex`, byte-identical SSR size between locales (which is the Phase 1
  "ships invisible" property — `/ar` renders the same English copy).
- Locale negotiation: `/` → `/ar` (Arabic AL), `/en` (English AL), `/ar` (French AL, falls back to
  `defaultLocale`). **Open question:** section 1's `x-default` row says a visitor matching neither
  locale "is better served English", but the section-1 prose says `/` resolves to `/ar` unless
  Accept-Language says otherwise. next-intl's default does the latter. The hreflang `x-default`
  annotation correctly points at `/en` either way; only the runtime redirect is ambiguous. Left
  as next-intl's default — decide explicitly before Arabic goes live.
- All 12 legacy un-prefixed URLs 308 to `/en/...`; all 6 retirement redirects behave.
- All three API routes still accept POSTs (400 on an empty body — the handler ran, so the proxy
  is not swallowing them). `/opengraph-image` 200 `image/png`; `/robots.txt` 200.
- Sitemap: 44 URLs, all `/en`, each with an hreflang alternate. No `/ar` while unpublished.
- Headless Chromium at 1440x900 and 390x844, both locales, over home / explore / playbooks / 404:
  zero horizontal overflow, zero console errors, nav and footer present everywhere.
- `eslint .` clean.

### Not yet done

~~Phase 2 (string extraction) has not started~~ — done 2026-08-01, see section 15. The language
switcher is deliberately not built yet, per section 11.

---

## 15. Phase 2 implementation record, 2026-08-01

Shipped and verified. 310 keys / **2,265 words** now live in `messages/en.json` (23 KB), which
lands within 1% of section 2's ~2,250-word estimate for UI prose. `messages/ar.json` is a
byte-identical copy, as section 5 prescribes; it gets real content in Batch 1.

### Namespaces as built

`Common` `Nav` `Footer` `CTA` `Article` `Home` `About` `Explore` `Services` `Playbooks`
`Careers` `Newsletter` `Contact` `GetStarted` `Forms` `Legal` `NotFound` `Metadata`
`LanguageSwitcher`

Three deviations from section 5's table, all deliberate:

- **`CTA` is top-level, not part of `Home`.** The closing block renders on home, about, explore,
  careers, every service page and every playbook. Filing shared chrome under `Home` would have
  made it look page-specific to whoever translates it.
- **`Forms` is new**, holding the error strings section 5 filed under `Common`. They are a
  closed set keyed by machine code (see below), which is a different kind of thing from button
  labels, and worth keeping separate so the code↔message contract is visible in one place.
- **`Article` is new**, for the one string (`Frequently asked questions`) that `ArticleFAQ`
  renders on playbook detail pages regardless of which content type is being shown.

`LanguageSwitcher` is populated but unused; the switcher itself still waits on Batch 2 per
section 11.

### Corrections to this plan, found while implementing

1. **The `Error` namespace in section 5's table cannot exist.** `app/global-error.tsx` replaces
   the entire tree including `[locale]/layout.tsx`, so `NextIntlClientProvider` is gone by the
   time it renders and `useTranslations` would throw. Its copy stays hardcoded English, which is
   the same reason its styles are inline (section 14 already documents that for CSS; it applies
   to messages for exactly the same reason). Drop `Error` from the table.

2. **The `next/link` swap in section 5 was already done in Phase 1.** There are zero
   `next/link` imports left. Only the documented `PageLoader.tsx` exception remains.

3. **Section 5 says 22 `buildMetadata` pairs; there are 10.** The other three routes
   (`services/[slug]`, `careers/[slug]`, `playbooks/[slug]`) derive title and description from
   `lib/content`, so they localize with the content layer in Phase 4, not here. Section 2's
   "13 pairs" row was closer but still counted the derived ones.

4. **Select and radio VALUES must stay English; only labels are translated.** Not anticipated
   anywhere in this plan. `ContactForm`, `GetStartedForm` and the filter chips all submit or
   compare against their own option strings. Translating the value would have changed what lands
   in the team's inbox depending on the visitor's locale, and would have silently broken
   `hearAboutUs === "Other"` (which reveals the "Please specify" field) on `/ar`. The stable
   English value stays in the component; `t()` supplies the visible label only. Same reasoning
   produced an `ALL = "__all__"` sentinel for the "All" filter chip in `PlaybooksList` and
   `CareersList` — the other chips are content-derived category and department names, which are
   Phase 4's problem, and the sentinel keeps the two from being confused.

5. **API error copy cannot be localized server-side.** The three `/api` routes are excluded from
   the proxy matcher (correctly — section 10), so a handler has no locale to render into. Each
   error response now carries a stable machine `code` alongside its English `error` string;
   `useFormSubmit` maps the code through `Forms.errors` and falls back to the server's English
   text for a code it does not recognise, so a future server-side error can never surface as a
   blank alert. Codes: `rate_limited`, `invalid_body`, `missing_fields`,
   `missing_fields_contact`, `invalid_email`, `email_required`, `too_long`.

6. **Section 5's inventory missed three components.** `StaggeredMenu` carried five hardcoded
   chrome strings (`Main navigation header`, `Muse home`, `Open menu`/`Close menu`, `Socials`,
   `Social links`, plus a `No items` fallback); `Pagination` carried five; `OutlineTrack` two.
   All are `aria-label`s or control text, i.e. exactly the strings that get forgotten because
   they are invisible on screen. `StaggeredMenu` takes them as an optional `labels` prop with
   English defaults rather than calling `useTranslations` itself — it is vendored React Bits
   code, and keeping next-intl out of it means the deviation from upstream stays one prop wide.

### Two things fixed because they were hardcoded English, not because they were on the list

- **`lib/dates.ts` is new.** `ArticleDetail` formatted every date with a literal
  `toLocaleDateString("en-US", …)`. Section 1 locks Arabic dates to Gregorian with Arabic month
  names and Western numerals, and *no bare locale tag gives you that*: `ar-SA` resolves to the
  Umm al-Qura calendar (a January post would have displayed as a Hijri date) and `ar` renders
  Arabic-Indic digits. The helper pins both with `ar-u-ca-gregory-nu-latn`. Verified at runtime:
  `/en` renders `July 30, 2026`, `/ar` renders `30 يوليو 2026`.
- **The footer year is passed to ICU as a string.** As a number, `{year}` formats with grouping
  and the copyright line would have read "2,026 Muse Studios".

### Verification performed

The acceptance bar in section 5 is "rendered English output byte-identical". Byte-identical is
the wrong test — chunk filenames are content-hashed and the RSC stream renumbers its own
reference ids, so *every* page differs between any two builds. The test actually run was: same
routes, same status codes, same `<head>` metadata, same visible text.

- Full pre/post snapshot of 27 route/locale combinations plus 5 non-HTML endpoints, captured
  from `next start` against a production build on both sides.
- **Visible text: 27/27 identical, with one intended exception** — the Arabic playbook date, per
  the `lib/dates.ts` note above. **`<head>` metadata: 27/27 identical** (title, description,
  canonical, hreflang, `og:`/`twitter:`, robots).
- Raw bytes differ on all 27, and after normalizing chunk hashes, RSC reference ids and payload
  boundaries the residue is exactly three things: the build id, RSC chunk *ordering* (the layout
  is now async, so it awaits translations before rendering the nav), and `"messages":{}`
  becoming the populated catalogue. No content deltas.
- Build route table diffed against Phase 1's: **identical**. Every route still `● SSG`; only
  `/[locale]/[...rest]` and the three API routes are `ƒ Dynamic`. No page fell out of static
  generation.
- Sitemap: 44 URLs, unchanged apart from `lastmod` build timestamps.
- Headless Chromium over 20 routes × {1440, 390} in both locales: zero horizontal overflow, zero
  console errors, correct `<html lang dir>`, nav/footer/skip-link present everywhere.
- Post-hydration checks, because `t.raw()` array reads in Client Components only fail once
  hydrated and SSR-diffing cannot catch that: About tab switching (Values, Mission), belief
  carousel, leadership cards, home FAQ accordion, playbook filter chips, and the contact
  project-type select — confirming translated labels with unchanged English submit values.
- `tsc --noEmit` and `eslint .` both clean.

### Known, accepted, and deliberately not fixed here

- **The whole catalogue is sent to the client.** `NextIntlClientProvider` inherits all messages
  rather than a hand-picked subset. A subset would shave a few KB off the RSC payload but fails
  at runtime, and only on the one page that uses the omitted namespace — a bad trade against 23 KB
  of one locale's JSON.
- **`aria-label` values that differ from their visible label only by letter case** (`About Us` /
  `About us`) were preserved as separate keys, because changing them would have broken the
  no-op contract. They are a real a11y smell (voice-control users speak the visible label) and
  8 pointless strings for the Arabic translator. Worth collapsing in Phase 3.
- **The playbook byline `Noura Aldosary` is a message key.** It is a person's name hardcoded on
  every playbook, so it does not belong in the UI catalogue at all — it should become a per-item
  author field in the content layer in Phase 4.
- **`allSocials` labels** (`LinkedIn`, `X`, `Instagram`, `WhatsApp`, `Email`) are still English.
  Four are brand names; `Email` is not, and it is an `aria-label`. The list is data keyed by
  those same strings, so localizing it is a content-layer change, not a Phase 2 one.
- **Mailto subjects** (`Application: {title}`, `Interested in joining Muse Studios`) stay
  English. They are read by the Muse inbox, not by the visitor.
- `PixelBlast`'s internal `aria-label` remains hardcoded; it sits inside an `aria-hidden`
  wrapper in `Hero.tsx`, so it is never announced.

### Note for Phase 3

`WordReveal`'s per-word spans concatenate without spaces in `innerText` — the 404 heading reads
as `Thispagedoesn'texist.` to any DOM text extraction. Rendering is fine (spacing is visual), but
it means text-based assertions and scrapers see mangled headings, which compounds the RTL
Latin-run reversal that section 14 already flags on this same component. Fix both together.

---

## 16. Phase 3 implementation record, 2026-08-01

Shipped and verified at runtime. Section 6 turned out to be a list of *known* RTL issues rather
than a complete one, exactly as section 14 warned: five of the bugs below are not in it, and two
of those five were the worst ones.

### Fixed from section 6's list

- `lib/useHorizontalScroll.ts`. `scrollLeft` and `scrollBy({left})` address a physical axis that
  `dir` does not flip, and under RTL `scrollLeft` runs from 0 down through negative values. A
  single `inlineSign(track)` helper reads the computed direction and flips both the wheel remap
  and the prev/next buttons. **Measured:** the Next button moves the belief carousel `+444px` on
  `/en/about` and `-444px` on `/ar/about`, which is the same card in both.
- Directional arrow glyphs in `Approach`, `Services`, `CareersList` and `services/[slug]`.
  Mirrored with a single `.arrow-inline` utility rather than swapping the character, so the four
  call sites stay plain markup and it works identically in Server and Client Components. All four
  were already `aria-hidden`. The three pixel-arrow SVGs in `Hero`, `CTA` and `Manifesto` got the
  same class; so did the CSS-triangle arrowhead in `Hero`, which also moved from `right-0` to
  `end-0`.
- Logical properties in `ArticleFAQ` (`text-start`), `RichContent` (`border-s-2 ps-6`), `Hero`,
  `CTA` and `Manifesto` (`ps-/pe-` button padding), plus three decorative offsets that section 6
  did not list (`BeliefSlider`, `Services`, `contact/page.tsx`) moved from `-right-*` to `-end-*`.
- `StaggeredMenu` flips with `position={localeDirection[locale] === "rtl" ? "left" : "right"}`,
  as section 6 predicted. Its `padding-right` and the numbering `::after` offset became
  `padding-inline-end` and `inset-inline-end` — two lines of the vendored file, so the deviation
  from upstream React Bits stays narrow. **Verified:** `data-position` is `left` and the panel
  sits at `-420px` on `/ar`, `right` and `1440px` on `/en`. The header needed nothing: it is a
  flex row, so `dir` swaps the logo and toggle and the toggle lands on the side the panel opens
  from.

### Not in section 6, found by looking rather than by reading the list

1. **Both marquees ran the wrong way in RTL and opened a growing gap.** `.ticker-track` and
   `.motion3d-scroll` use duplicate-and-loop: a copy sits next to the original and the pair
   translates by exactly one copy's width. Under RTL the flex row puts the copy on the *left*, so
   continuing to translate negatively drags both copies away from the viewport and leaves empty
   orange behind for 26 seconds before it jumps. Mirrored keyframes (`tickerScrollRtl`,
   `motion3dScrollRtl`) selected by `[dir="rtl"]`. **Verified:** `animation-name` computes to
   `tickerScrollRtl` on `/ar` and `tickerScroll` on `/en`. The ticker's `rotate(-2deg)` tilt is
   mirrored too, since it is a composition rather than a fixed direction.
2. **`GetStartedForm`'s honeypot repeated the skip-link bug** from section 14.
   `-left-[9999px]` is free in LTR because overflow past the *start* edge is not scrollable; under
   RTL the left is the *end* edge. Now `-start-[9999px]`. **Verified:** the input sits at
   `-9999px` on `/en` and `+11439px` on `/ar`, and `documentElement.scrollWidth` is 1440 in both.
3. **`WordReveal` reversed Latin runs and ate its own spaces**, both flagged in sections 14 and 15
   as outstanding. Words are now grouped into single-direction runs, each wrapped in an element
   carrying its own `dir`, which restores the strong direction that atomic `inline-block` boxes
   lose. The `marginRight` between words became a real text node, fixing both the physical-axis
   gap and the fact that a margin is invisible to `innerText`. **Verified:** the 404 heading reads
   back as "This page doesn't exist." on `/en` and the correct Arabic on `/ar`. It was
   "Thispagedoesn'texist." before, and reversed under RTL.

### Typography, and two font traps that only a runtime measurement catches

IBM Plex Sans Arabic added per [[Brand Colour & Type]]. The naive arrangement, appending it after
the Latin faces, does not work, and neither does the obvious correction. Both failures are silent
and both were caught by measuring rendered text width, not by reading the CSS.

1. **`next/font` puts two families behind each variable, not one.** `var(--font-space-grotesk)`
   expands to the real face *plus* a generated "Space Grotesk Fallback": a local system font with
   size-adjust metrics and **no `unicode-range`**. On Windows that local font is a full Unicode
   face, so it answered for Arabic and the stack never reached Plex. `document.fonts` reported
   "IBM Plex Sans Arabic: unloaded" on a fully rendered `/ar`.
2. **`subsets: ["arabic"]` controls preloading, not which `@font-face` rules exist.** Google's
   stylesheet still declares Latin and Cyrillic faces for the family; 21 `@font-face` rules ship.
   So putting Plex Arabic first, which is the fix for trap 1, made it answer for *Latin* as well,
   and "Muse" inside an Arabic sentence stopped being Space Grotesk.

Settled as: Plex Arabic first for body copy, where its Latin is IBM Plex Sans and pairs with the
Arabic by design; Space Grotesk first for brand type, named as a literal family rather than
through the variable so the fallback face is skipped and Arabic falls through to Plex. Scoped to
`[lang="ar"]` so English is untouched.

**Verified by measurement at 64px on `/ar`:** the Arabic h1 string renders 957px through the real
stack and 957px in Plex alone. Latin brand type renders 649px, identical to Space Grotesk alone
and to `/en`.

### A pre-existing bug found on the way, deliberately not fixed

`app/globals.css` declares `--font-sans` and `--font-display` inside `@theme inline`, and `inline`
is precisely the instruction *not* to emit a custom property. So `var(--font-sans)` in the
hand-written `body` and `h1..h4` rules resolves to nothing, the whole declaration is invalid at
computed-value time, and both rules have been dead. **Measured on `/en/about`:** body copy
computes to `ui-sans-serif, system-ui, sans-serif`, the Tailwind default, not Inter.

Left alone. Fixing it would restyle every page of the live English site, which is a visible change
nobody asked for. The Arabic rules deliberately repeat the same Latin tail so the two locales match
rather than quietly diverging; if the English rules are ever repaired, update the `[lang="ar"]`
ones to match. Worth a decision of its own.

### Verification performed

- 20 route/locale/viewport combinations in headless Chromium at 1440x900 and 390x844: correct
  `<html lang dir>`, nav and footer present, **zero console errors** on every real route.
- Horizontal overflow is identical between the two locales on every route and viewport, which is
  the property Phase 3 is responsible for. Note that `html` and `body` carry `overflow-x: hidden`,
  so the page is not user-scrollable sideways in either locale; the residual content extent (the
  fixed nav's offscreen panel, the `/explore` decorative orb) is unchanged from before this phase
  and mirrors correctly.
- Build: **96 static pages**, matching the Phase 1 and Phase 2 baseline exactly. Every route still
  SSG; only `/[locale]/[...rest]` and the three API routes are dynamic.
- `tsc --noEmit` and `eslint .` clean.

---

## 17. Phase 4 implementation record, 2026-08-01

The content layer is split and every consumer is locale-aware. Section 7's SEO half was already
brought forward in Phase 1, see section 14.

### Shape as built

```
lib/content/
  shared.ts      types, untouched, including the PlaybookSummary Pick<>
  index.ts       getServices/getService, getCareerRoles/getCareerRole,
                 getPlaybooks/getPlaybook, getPlaybookCategories, allSlugs
  en/{services,careers,playbooks}.ts
  ar/{services,careers,playbooks}.ts
```

No fallback to English, per section 7. A missing record produces a 404 and an empty list, which
are visible, rather than English text under `lang="ar"`, which is not. **Verified:**
`/ar/playbooks/<slug>` returns **404** while `/en/playbooks/<slug>` returns 200, and
`/ar/playbooks` renders its translated empty state.

### Corrections to this plan, found while implementing

1. **Next 16.1.6 drops an entire dynamic route if any one parent param combination returns an
   empty array from `generateStaticParams`.** Not anticipated in section 7, and it fails silently.
   With `ar/playbooks.ts` deliberately empty, returning per-locale slugs took **all 56 English
   playbook pages** out of the build too: 40 pages generated instead of 96, with no warning.
   Fixed with `allSlugs()`, which returns the union across locales; per-locale truth then comes
   from the page body, which resolves the slug in its own locale and calls `notFound()`. All three
   detail routes use it, even though only playbooks is currently lopsided, because the failure
   mode is invisible except as a page count. `dynamicParams` stays `false`.

2. **`app/sitemap.ts` had to be rebuilt per locale.** It composed one entry list and fanned it out
   across locales, which is wrong once the content differs: it would have advertised English slugs
   under `/ar`. Static routes still span every published locale; content routes declare an
   alternate only for the locales that actually have that item, so the hreflang graph stays
   reciprocal. **Verified:** 44 URLs, zero `/ar` entries while `ar` is unpublished, unchanged from
   Phase 2.

3. **A 288 KB client-bundle leak, found because the split would have doubled it.**
   `PlaybooksList` is a Client Component and imported `playbookCategories` from `lib/content`.
   That const was derived from the `playbooks` array in the same module, so importing it pulled
   every article body into the browser bundle, defeating the `PlaybookSummary` boundary that
   `toPlaybookSummary` exists to enforce, through a second import path nobody was looking at.
   `getPlaybookCategories(locale)` is now a function called on the server and passed as a prop.
   `CareersList` got the same treatment for its roles.

4. **`getLocale()` and `useLocale()` return `string`, not the locale union.** next-intl documents
   an `AppConfig` augmentation to narrow it; it cannot work here, because `AppConfig` is
   re-exported as a *type alias* rather than declared in the module, and a type alias is not a
   declaration-merge target. Rather than cast at each call site, which would silence exactly the
   error worth keeping (a locale reaching the content layer with no content behind it), the pages
   own the locale and pass it down as a typed prop. `Approach`, `Services` and `LatestPlaybooks`
   all take `locale: Locale`.

5. **Arabic plurals forced a number-format decision section 1 did not anticipate.** "8 min read"
   has to agree in Arabic, so `minutes` must reach ICU as a real number for `plural` to select on
   it, at which point ICU formats it with `Intl.NumberFormat("ar")`, whose default numbering
   system is `arab`. The read time would have rendered in Arabic-Indic digits on a site that had
   already decided against them. `i18n/request.ts` now declares a named `latn` number format and
   the messages use `{minutes, number, latn}`. **Verified** against `intl-messageformat` directly,
   since no Arabic playbook exists to exercise it yet: all six Arabic plural categories resolve
   correctly, with Western numerals throughout.

### Language switcher

Built, and renders nothing while `PUBLISHED_LOCALES.length < 2` — the same constant that already
gates `noindex`, the sitemap and the hreflang set, so going live is one edit in one file. It
preserves the current route across the switch (slugs are shared, section 1), so `/en/playbooks/foo`
lands on `/ar/playbooks/foo` rather than dumping the reader on the home page.

Placed in the footer. The nav is vendored React Bits code whose header is a two-item flex row, and
adding a third element there is a layout decision worth making when Arabic actually goes live.

### Still outstanding in Phase 4

- `app/[locale]/opengraph-image.tsx`, so shared Arabic links preview in Arabic.
- The playbook byline is still a message key. Section 15 is right that it should be a per-item
  author field in the content layer.

---

## 18. Phase 5: what is drafted, and what the reviewer is being asked to do

**Everything below is an unreviewed draft.** [[Brand Voice#Arabic voice]] is unambiguous that
nothing customer-facing is machine translated and that someone who writes Arabic well reviews
everything. That gate has not been cleared. The draft exists so the reviewer starts from something
to correct rather than a blank page, and `PUBLISHED_LOCALES` stays `["en"]` until they are done.

| Batch | Content | Words | State |
|---|---|---:|---|
| 0 | Termbase and register guide | n/a | Drafted, `Muse Vault/01 Company/Arabic Termbase.md` |
| 1 | UI chrome, `messages/ar.json` | ~2,265 | Drafted, 310/310 keys |
| 2 | `lib/content/ar/services.ts`, 3 records | 1,136 | Drafted |
| 3 | `lib/content/ar/careers.ts`, 3 records | 458 | Drafted |
| 3b | Page metadata, 10 title/description pairs | ~350 | Drafted, inside `messages/ar.json` |
| 6 | Playbooks, 28 articles | 31,282 | **Not started. Not decided.** |

Batch 0 is the one to review first and the one that governs the rest. It records the register
decision, the termbase, and the eight lines from section 13 that were rebuilt rather than
translated, each with the reasoning. Correcting a term there propagates; correcting it inside one
sentence does not.

### Key checks already done

- **310/310 keys present in `ar.json`, verified by a key-path diff against `en.json`.** The only
  values still identical to English are the ten that should be: four social platform names, the
  two `LanguageSwitcher` labels, `Metadata.siteName` and `titleTemplate`, the example email
  placeholder, and "404".
- **Select and radio *values* stay English in Arabic too.** Section 15's correction 4 applies with
  more force here: the visible label is translated, the submitted value is not, so what lands in
  the team's inbox does not depend on the visitor's locale. Same for `CareerRole.department`,
  which is a typed union and the careers filter's comparison key.
- **Muse stays Muse**, untransliterated, which puts a Latin run inside an Arabic sentence on
  nearly every page. That is the mixed-direction case the Localization Playbook flags, and it is
  why the font work in section 16 mattered.
- No em dashes, no en dashes, Arabic comma and question mark, Western numerals throughout.

### The playbooks decision, still open

Section 12 asked whether all 28 playbooks warrant Arabic. They are 31,282 words, roughly 90% of
the remaining programme, and translating them is the single largest cost in the bilingual effort.
`lib/content/ar/playbooks.ts` is deliberately an empty array and the plumbing is finished, so any
of the three answers costs nothing further in engineering:

1. Translate all 28. Largest cost, full parity.
2. Translate a chosen subset. `/ar/playbooks` shows only those; the rest 404 in Arabic, which the
   content layer already handles honestly.
3. Retire some first, as Insights already was on 2026-08-01, then translate what survives.

Worth noting before deciding: the English playbooks read as generic SEO content built around
unnamed composite clients ("a growing SaaS business"). `CaseStudies` and `Testimonials` were both
deleted on 2026-08-01 for inventing clients, and [[Website Voice#We do not claim what is not
decided]] blocks client names, quotes and results outright. Whether the playbooks sit on the right
side of that line is a separate question from whether they are worth translating, but it should
probably be answered first.

---

## 19. Phase 4 leftovers closed, and the playbooks verdict, 2026-08-01

The migration is now in git. It had been sitting as 88 uncommitted files with nothing behind it
since `b8c0b3f`: `d58d649` is Phases 1 to 4, `a9e6968` tracks the vault and brand assets (also
never committed), `8779c50` is the leftovers below. Note that section 13's warning still stands —
`.gitignore` line 13 ignores `/docs`, so **this file is still not in version control** and still
exists on one machine only.

### Playbook authorship removed, not relocated

Sections 15 and 17 both said the byline should become a per-item author field in the content
layer. It became nothing instead. The articles are the studio's, `buildArticleJsonLd` already
set `author` to the organization rather than a person, and naming one individual on all 28 was
not something the content model tracked. `ArticleDetail` no longer takes a `byline` and the
detail pages carry the date alone.

### The two aria-label problems are opposite problems

Section 15 filed both under one cleanup. They are not the same and the fixes differ.

- **Nav items.** The 8 case-only duplicates (`About Us` / `About us`) are gone; `Nav.items.*` is
  a plain string. The aria-label stays, now pointing at the visible label. It cannot simply be
  dropped: `.sm-panel-item::after` sets `content: counter(smItem)` when numbering is on, CSS
  generated content counts toward the accessible name, and the link would announce as
  "About Us 03". An exact match for the visible text is what voice control needs.
- **Social links.** The opposite case — icon-only, so the aria-label is the only name there is,
  and it has to translate. `Common.socials.*` supplies it; `Email` renders البريد الإلكتروني on
  `/ar` while the four platform names stay Latin. `Social.label` remains the English identity
  key that selects the glyph and drives the Footer/contact subset filters.

### The `x-default` ambiguity, resolved toward English

Section 14 left this open. Section 1's table says a visitor matching neither locale is better
served English and points hreflang `x-default` at `/en`; next-intl resolves an unmatched
Accept-Language to `defaultLocale`, which is `ar`. So the same person got a different language
depending on whether they arrived through a search result honouring x-default or by typing the
domain.

`proxy.ts` now forces the English branch for exactly the "matches neither" case, by rewriting
the header and handing the request back to next-intl rather than redirecting itself, so
next-intl's cookie handling and redirect shape are untouched. `defaultLocale` stays `ar` — Rule
Zero is unchanged. **Verified** across 8 Accept-Language values: `ar` and `ar-SA` to `/ar`;
`en-US`, `fr-FR`, `de`, `*`, empty and `zh-CN,zh;q=0.9,en;q=0.5` to `/en`; and a `NEXT_LOCALE`
cookie still overrides all of it.

### Satori cannot render Arabic sentences, so the OG card is not a route

Section 7 and section 17 both asked for `app/[locale]/opengraph-image.tsx`. It does not exist,
deliberately.

Satori shapes Arabic glyphs correctly — letters join — but it does not run the bidi algorithm.
Words come out in logical order laid left to right, so an Arabic sentence renders mirrored and
unreadable. Measured on Next 16.1.6 against a four-way and then a four-way probe: `direction:
rtl` changes nothing, a `dir="rtl"` attribute changes nothing, and the Unicode control
characters RLE+PDF and RLM change nothing **and** render as visible tofu boxes. The only thing
that works inside Satori is reversing word order by hand before handing it over, which is
hand-rolled bidi and breaks on any string the naive rule does not cover.

The card carries no per-page content, so nothing is lost by baking it. `scripts/build-og-image-ar.mjs`
renders it in headless Chromium, which does standard UAX#9 bidi and complex-script shaping, and
reads its tagline from `messages/ar.json` so the card cannot drift from the copy under review.
`lib/seo.ts` picks the card by locale; English keeps the existing Satori route.
`public/og/*.png` needed a `.gitignore` negation, since `*.png` is ignored wholesale.

### Verification

96 static pages, identical route table to Phases 1 to 3, every route still SSG. `tsc --noEmit`
and `eslint .` clean. 28 route/locale/viewport combinations in headless Chromium at 1440x900 and
390x844: zero console errors, zero horizontal overflow, correct `<html lang dir>`, and every nav
aria-label an exact match for its visible text. Sitemap unchanged at 44 URLs with no `/ar`. All
three API routes still reached through the rewritten proxy.

---

### The playbooks, audited against Website Voice: none of the 28 survive

Section 12 asked whether all 28 warrant Arabic. Section 18 raised the prior question. The
answer to the prior question settles the first one: **0 of 28 pass**, so Batch 6 should be
deleted from the programme rather than scoped.

| Failure | Count | The rule it breaks |
|---|---:|---|
| Built on an invented client protagonist | 26/28 | "Client names, logos, quotes or results", blocked by no delivered client work |
| Fabricated metric in the title or excerpt | 14/28 | Visible on the list page and in search results before anyone clicks |
| Published the same day | 28/28 | "A publishing history we do not have" |
| Em/en dashes | 27 | Brand Voice, straight quotes only |
| Same subject covered twice | 9 pairs | 22 categories across 28 items also makes the filter noise |

The protagonists are "One rapidly growing SaaS company", "A regional healthcare provider",
"A multinational industrial manufacturer operating eighteen production facilities across four
countries". The results are "Reduced Response Time by 85%", "Scaled from 500 to 250,000
Products", "Serving Over 12 Million Citizens", "Increased Fulfillment Speed by 52%". None of it
happened.

This is the same failure that got `CaseStudies` and `Testimonials` deleted on 2026-08-01, and
[[Website Voice#We do not claim what is not decided]] names it exactly: "the same failure as a
fake chart, just harder to spot". It is worse here than a vague claim would be, because the
specificity is what makes it read as true.

The register is wrong independently of the fabrication: third-person narration about unnamed
companies, no second person, no point of view, and an opening line ("Customer expectations have
changed dramatically over the past few years") that any competitor could publish unchanged —
which is the specificity test, failed.

**Done — all 28 retired to `archive/`** on 2026-08-01, commit `a29d75f`, exactly as Insights
was. The site now publishes no article section at all.

Batch 6 is gone with them: 31,282 words, roughly 90% of the remaining content programme. The
Arabic launch is now gated only on native review of Batches 0 to 3 (~3,900 words).

What went: both routes, `PlaybooksList`, `LatestPlaybooks`, `ArticleDetail`, `ArticleFAQ`,
`RelatedContent`, `RichContent`, `Pagination`, `lib/dates.ts`, the `Playbook` /
`PlaybookSummary` / `ContentBlock` / `Faq` / `FeaturedImage` / `ContentCategory` types, the
`Playbooks` and `Article` message namespaces, and the nav, footer, homepage and sitemap
entries. Copies of the types live in `archive/content/types.ts` so the archived data keeps
parsing on its own.

`/playbooks` and `/playbooks/*` 301 to `/explore`. The Insights redirects pointed at
`/playbooks` and were repointed in the same change — left alone they would have become a chain
ending in a 404. **Verified:** all 9 legacy URL forms resolve in exactly one hop to a 200.

Two strings that referenced Playbooks as a live section were reworded in both locales: the
newsletter hero subtitle and a marketing-role responsibility in `careers.ts`.

Build: **96 static pages to 38**, every route still SSG. Sitemap 44 URLs to 15. Zero
occurrences of "playbook" in any rendered page in either locale. 24 route/locale/viewport
combinations clean in headless Chromium.

Note for a future restore: `lib/dates.ts` pinned `ar-u-ca-gregory-nu-latn`, because bare
`ar-SA` resolves to Umm al-Qura and bare `ar` renders Arabic-Indic digits. Section 15 has the
reasoning; the file is recoverable from commit `8779c50`.

If a Playbooks surface is wanted, the only version that passes is a small number of genuine
guides written in the Muse voice, second person, about how to think about scoping and shipping
this work, with no client and no invented number. The homepage already promises "Practical
guides, not theory" — three real ones would keep that promise; 28 fabricated case studies break
it.
