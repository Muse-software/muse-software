# Direction 4 — Understanding First (Intent-Led Homepage) · Build Plan

**Status:** PLANNING ONLY. No application code changed by this document.
**Branch:** `direction/4-understanding-first` (based on `staging/bilingual-ar-en`).
**Primary brief:** `docs/three-doors/direction-4-source/Layan-Muse-Website-Direction-R3.txt` (MUSE-DIR-04 · Rev 3).
**Companion research:** `docs/three-doors/direction-4-research.md`.
**Audience:** a fresh Sonnet executor who has not seen this repo. Read §14 first if you are that executor.

---

## 1. What this direction is

Replace the homepage's current AI-strategy pitch with an **understanding-first, intent-led** homepage:
lead with a warm statement of what Muse is and believes, then ask *"how can we help?"* and route
visitors by goal — **Build something new · Improve an existing product · Explore AI Transformation** —
with the five capabilities *supporting* those intents rather than acting as the menu. The single
conversion path is a real guided conversation at **`/start`**, not a form.

This is a **structural rebuild**, not a CSS reskin. The brand visual language stays locked (palette,
dither, motion, reduced-motion, keyboard access); the information architecture and copy change.

---

## 2. Executive summary of the recommended build

- **Homepage:** eight sections in Layan's order (§7). Reuse existing section components where the
  shape already fits (`Approach`, `FAQ`, `CTA`, `Ticker`); add three new sections (`Hero` copy swap,
  `IntentRouter`, `Capabilities`, `WhyMuse`, `FromTheStudio`).
- **Hero:** Territory A — *"Great products begin with understanding."* CTA → `/start`.
- **Intents:** three cards → `/start?intent=…` **pre-selected**; a quiet link to capabilities.
- **Capabilities:** all five named in one band. Three link to their real `/services/[slug]` pages;
  two (Strategy & Discovery, Design) get **honest new capability pages** authored from the Vault, no
  fabricated proof (§8).
- **`/start`:** a two-screen-max guided flow (intent → 1–2 light questions → contact), reusing the
  existing `/api/get-started` endpoint and its honest delivery behaviour. `/get-started`'s
  revenue-band qualification form is retired and 308-redirected to `/start` (§10).
- **"From the studio":** built as honest **slots**. None of Layan's named artifacts (Muse
  Experiments/open-source, Tenet, Notes, "How we built this site") exist in the repo, so the launch
  version ships only what is verifiably live and omits everything else (§5).
- **Arabic:** authored natively (Rule Zero), MSA spine + light Saudi body, no `X، لا Y`, no dashes.
- **Gate:** implement Hero + IntentRouter first and stop for a visual review before scaling (§11.2).

**Real blockers before launch:** (a) confirm which "From the studio" items are genuinely live;
(b) decide the "book a call" mechanism (real scheduling URL vs. request-a-call fallback); (c) native
Arabic review of all new copy; (d) form delivery verified into a real inbox (RESEND + verified domain).
None block starting design/build.

---

## 3. Exact current-code baseline (verified in-repo)

### 3.1 Routing & i18n
- `i18n/routing.ts` — locales `["ar","en"]`, **default `ar`**, `localePrefix: "always"`.
  `PUBLISHED_LOCALES = ["en"]` gates hreflang/sitemap/switcher; **flip to include `ar` only when the
  Arabic content programme is complete.** `localeDirection` gives `ar: rtl`, `en: ltr`.
- `i18n/navigation.ts` — locale-aware `Link`, `redirect`, `usePathname`, `useRouter`, `getPathname`.
  **All internal hrefs must import from here.**
- `proxy.ts` — next-intl middleware; matcher excludes `api`, `_next`, `_vercel`, `opengraph-image`,
  and any dotted path. `/api/*` routes are **not** locale-prefixed.
- `next.config.ts` — `redirects()` maps bare paths → `/en/<path>` (308) via `LOCALE_INDEX_PATHS`
  and retired sections → `/en/explore`. Security headers/CSP live here.

### 3.2 Home composition
- `app/[locale]/page.tsx` → renders `components/sections/HomeSections.tsx`.
- `HomeSections.tsx` order today: `Hero → Approach → Manifesto → WhoWeBuildFor → OutcomesBand →
  Ticker → FAQ → CTA`. Wrapped in `PageDither` + `CardDither`; emits Organization JSON-LD.
- **There is no "Three Doors" section in the live homepage.** "Three Doors" (Build/Ventures/Think)
  was an earlier *conceptual* direction; the current live homepage is the AI-strategy pitch. Direction
  4 replaces that pitch.

### 3.3 Home section components (`components/sections/`)
| File | Reuse in D4? |
|---|---|
| `Hero.tsx` | Reuse structure; swap copy keys to Territory A; CTA `/contact` → `/start`. |
| `Approach.tsx` | Reuse as **"Our approach"** reading section OR as capabilities cards (currently keyed to 3 service slugs). |
| `Manifesto.tsx` | Retire from home (argument is off-message for understanding-first) or repurpose into "Why Muse". |
| `WhoWeBuildFor.tsx` | Retire or fold into "Why Muse". |
| `OutcomesBand.tsx` | Retire from home. |
| `FAQ.tsx` | Reuse as-is; reads `Home.faq.items` (array via `t.raw`). Also used by service pages with props. |
| `CTA.tsx` | Reuse as section 8 "Start a conversation"; button → `/start`. |
| `Services.tsx` | Reuse on `/explore`; iterates `getServices(locale)`. |
| `SubpageHero.tsx` | Reuse for all new subpages (`eyebrow/title/subtitle`, WordReveal, DitherField). |
| `GetStartedForm.tsx` | **Retire from primary path** (revenue-band qualification form; off-message). |
| `ContactForm.tsx` | Keep for `/contact`; posts `/api/contact`. |

### 3.4 Forms & delivery infrastructure (reuse verbatim)
- `lib/useFormSubmit.ts` — shared submit state machine (`idle/submitting/success/error`), localized
  errors via `Forms.errors.<code>`, honest `delivered` flag. **`/start` will use this.**
- `app/api/get-started/route.ts` — honeypot (`website`), rate limit, `isValidEmail`, `exceedsMaxLength`,
  `recordSubmission`, `sendResendEmail` (delivers if `RESEND_API_KEY` set, else logs + returns
  `delivered:false`). **Reuse for `/start` final submit.**
- `app/api/contact/route.ts` — same pattern for `/contact`.
- `lib/submissions.ts`, `lib/rateLimit.ts`, `lib/validation.ts`, `lib/email.ts` — support libs.

### 3.5 Content layer (`lib/content/`)
- `index.ts` — `getServices(locale)`, `getService(locale, slug)`, `allSlugs()`. **No English
  fallback on purpose** (missing record → 404, never English under `lang="ar"`).
- `en/services.ts` & `ar/services.ts` — **only three services exist:** `ai-transformation`,
  `product-engineering`, `gamification-experience`. Rich `Service` shape (intro, pillars, whyReasons,
  whatWeDo, faq…). Arabic is **native Saudi** already.
- `shared.ts` — `Service` / `CareerRole` types.

### 3.6 Routes that exist today (`app/[locale]/`)
`/` · `/about` · `/careers` (+`/careers/[slug]`) · `/contact` · `/explore` · `/get-started` ·
`/newsletter` · `/privacy` · `/terms` · `/services/[slug]` · `[...rest]` (404 catch-all) · `not-found`.
**Do not exist:** `/start`, `/build`, `/improve`, `/ai`, `/approach`, `/notes`, `/services` index.

### 3.7 Navigation & links into the conversion path
`/get-started` is referenced by: `components/SiteHeader.tsx` (`ROUTES.getStarted`), `components/Footer.tsx`
(`exploreLinks` + hero button), `components/sections/CTA.tsx`, `Manifesto.tsx`, `Services.tsx`, and
`app/sitemap.ts`. **Every one must be repointed** when `/start` becomes primary (§10.6).

### 3.8 Brand system (locked — do not redesign)
- Accent orange in code is **`#fd4601`** (the Vault deck specifies `#FE4701`; the site has used
  `#fd4601` throughout — **keep `#fd4601`**, treat reconciliation as out-of-scope, see §6).
- Page black `#060608`; page wash via `PageDither` (PixelBlast). Maroon `#4C0014` is **not** used on
  the current site (replaced by the wash) — do not reintroduce it in D4.
- Type: Space Grotesk (Latin display/`.font-space-grotesk`), IBM Plex Sans Arabic (`[lang="ar"]`).
- CSS markers already available: `.hero-highlight` (per-script metrics), `.arrow-inline` (RTL mirror),
  `.dissolve-band`, `.copper-bloom`, `.accordion-*`, and `@media (prefers-reduced-motion: reduce)`
  blocks throughout `app/globals.css`.
- **Contrast rule (Vault, measured):** white-on-orange is 3.43:1 — **fails AA for body**. Orange is
  for large type, numerals, rules, accents. Body text is white-on-black or black-on-orange. Existing
  `CTA.tsx`/`Footer.tsx` already respect this; new sections must too.

---

## 4. Gap analysis — Layan's brief vs. the repo

| Brief expects | Repo reality | Resolution |
|---|---|---|
| Understanding-first hero (Territory A) | AI-strategy hero ("Everyone has an AI strategy…") | Swap hero copy (§7.1). |
| Intent cards "how can we help?" | No intent section exists | New `IntentRouter` (§7.2). |
| **Five** capabilities | **Three** real service pages | Name 5 in band; author 2 honest pages (§8). |
| Intent pages `/build /improve /ai` | Do not exist | New, fast-follow after home+`/start` (§11). |
| Guided `/start` conversation | `/get-started` = revenue-band form | Build `/start`; retire form; redirect (§10). |
| "Our approach" reading section | Partly exists (`Approach` cards, About beliefs) | New reading section (§7.4). |
| "Why Muse" (Saudi, small, local) | Content exists on `/about` | New home band drawn from `/about` copy (§7.5). |
| "From the studio" real artifacts | **None exist in repo** | Honest slots; ship only what's live (§5). |
| FAQ (buying questions) | `Home.faq` exists (5 Qs) | Reuse; re-copy to Layan's buying questions (§7.7). |
| Final "start a conversation" | `CTA` exists | Reuse; button → `/start` (§7.8). |
| Arabic written natively | Home/about/careers AR done; native Saudi in place | Author all new keys natively (§9). |

---

## 5. Claim-truth audit (every proposed artifact & statement)

**Rule (Vault, Website Voice):** *"We do not claim what is not decided."* No client names/logos/quotes/
results, no pricing, no capability claims we cannot show, no publishing history we don't have. Arabic
is **shown, not claimed**. Removing a section is honest; keeping a fake one is not.

### 5.1 "From the studio" cards proposed by Layan
| Proposed card | Verifiable in repo/vault? | Verdict | Honest plan |
|---|---|---|---|
| **Muse Experiments (open source)** | No repo, no link, no code reference | **NOT LIVE** | Omit at launch. Add a slot only when a real public repo/link exists. |
| **Tenet (early access)** | No product, route, or link anywhere | **NOT LIVE** | Omit at launch. Do not name an unshipped product. |
| **Notes (our writing)** | `/notes` does not exist; `insights`/`playbooks` are **retired/301→/explore** | **NOT LIVE** | Omit, or point to `/newsletter` (which is real) as "our writing lands in the newsletter." |
| **How we built this site** | No such page/article | **NOT LIVE** | Omit at launch; genuine candidate to author later (it would be real). |

**Decision:** ship "From the studio" as a **section built for slots** with an honest present-tense
frame, and populate it with **only** items that are live. If nothing qualifies at launch, the section
either (a) links to `/newsletter` + `/careers` as the real "things you can open" or (b) is **cut**
until a real artifact exists. Do **not** render empty/placeholder cards. (§7.6)

### 5.2 Other statements to police
- **"Being genuinely Saudi and in Riyadh"** — TRUE (Vault Positioning; `/about`). Safe to state plainly.
- **"Specialist depth in AI and engagement design"** — TRUE as a capability claim backed by the two
  signature service pages. Safe.
- **Team named vs. anonymous** — `/about` currently names two leaders (Abdullah, Mohammad). Website
  Voice says "no named people in body copy" but the About leadership block is sanctioned. Home/intent
  copy stays in second person, no names. (Team-identity is an open decision, §6.)
- **No metrics, no logo walls, no case studies** — none exist; do not introduce any.
- **Playbooks/insights "proof"** — the Vault's `Website.md` still references 43 insights / 28 playbooks;
  **the code has retired both** (they 301 to `/explore`). Treat the code as authoritative: do **not**
  resurrect or cite them as proof in D4.

---

## 6. Locked vs. open decisions

### 6.1 Locked (proceed on these; recommendations made, not questions)
1. **Hero = Territory A**, CTA "Start a conversation" → `/start`. (Layan's recommendation; §7.1.)
2. **Eight-section homepage** in Layan's exact order (§7).
3. **Three intents**, cards pre-select `/start`. Working labels adopted (§7.2), tunable in copy.
4. **`/start` is the single primary conversion path**; `/get-started` form retired, 308→`/start`.
5. **Reuse `/api/get-started`** for `/start` submissions (honest delivery preserved).
6. **Five capabilities in the band; three link to existing pages, two get honest new pages** (§8).
7. **Brand visual language locked** — palette (`#fd4601`, `#060608`, wash), type, motion, RTL, a11y.
8. **Arabic authored natively**, MSA spine + light Saudi body; **no `X، لا Y` in any form; no em/en dashes**.
9. **Single-section visual gate** after Hero + IntentRouter before building the rest (§11.2).
10. **"From the studio" ships only verifiably-live items** (§5).

### 6.2 Open (recommended default given; does not block design)
- **Hero copy final wording / A-B-C cold-read** — build with A; the copy keys make B/C a one-file swap.
- **"Book a call" mechanism** — *default:* if the team has a real scheduling URL (Cal.com/Calendly),
  link it; **else** "request a call" reuses the write-to-us form with a `preferredContact: "call"`
  field. Do **not** invent a booking widget. (§10.5)
- **Team identity (named/anonymous)** — *default:* keep `/about` leadership as-is; home/intent copy
  name-free. Only `/about` + one FAQ answer are affected.
- **Capability label "AI" vs "AI Engineering"** — *default:* capability label **"AI"**; intent page
  stays **"AI Transformation"**.
- **Whether to author the two new capability pages now or link page-less at launch** — *default:*
  author them (they need no proof, only honest "what/how" copy), so all five capabilities have a home.
- **Whether intent cards deep-link to intent pages or straight to `/start`** — *default:* card primary
  action → `/start?intent=…` (conversion first); intent pages are a fast-follow with a "learn more" link.
- **Brand orange `#fd4601` vs deck `#FE4701`** — *default:* keep `#fd4601` (site-wide consistency);
  reconciliation is a separate brand task, out of scope for D4.

---

## 7. Homepage architecture — exact eight-section order

Order and one-job-each per Layan §05. New `HomeSections.tsx` body, top to bottom:

```
Hero → IntentRouter → Capabilities → Approach(reading) → WhyMuse → FromTheStudio → FAQ → StartCTA
```

Translation namespace root: **`Home`**. New/changed keys below. All copy is a **draft** for a native
Arabic reviewer; English follows Website Voice (specificity test, no banned phrases).

### 7.1 Section 1 — Hero (`components/sections/Hero.tsx`, copy swap only)
Keep the two-line highlight structure. Map Territory A onto existing keys:
- `Home.hero.headlineLead` = **"Great products begin"**
- `Home.hero.headlineTurn` (highlighted) = **"with understanding."**
- `Home.hero.tagline` = **"Muse is a product studio in Riyadh."**
- `Home.hero.subtitle` = **"We bring together strategy, design, engineering and AI to turn ideas and
  challenges into digital products made for real people."**
- `Home.hero.cta` = **"Start a conversation"**; **change `href` `/contact` → `/start`.**

AR draft (native): lead `المنتجات الجيدة تبدأ` · highlight `بفهم الناس.` · tagline `Muse استوديو منتجات
في الرياض.` · subtitle `نجمع الاستراتيجية والتصميم والهندسة والذكاء الاصطناعي، ونحوّل الأفكار والتحديات
إلى منتجات رقمية مبنية لناس حقيقيين.` · cta `ابدأ المحادثة`.

### 7.2 Section 2 — IntentRouter (NEW `components/sections/IntentRouter.tsx`)
Heading `Home.intents.heading` = **"How can we help?"**; lede = **"Every project starts somewhere
different. Where are you today?"** Three cards; each card = title + one-sentence body + arrow CTA.

| Card | `intent` value | Title (CTA) | Body |
|---|---|---|---|
| Build | `build` | "Start something new" | "You have an idea, a plan, or a problem worth solving. We help you shape it, design it, and build it into a product people can actually use." |
| Improve | `improve` | "Improve a product" | "You already have a product, and you sense it could be more. We help you understand what's holding it back, then improve it, or rebuild the parts that need it." |
| AI | `ai` | "Explore AI Transformation" | "AI is full of promise, and full of noise. We help you find where it genuinely helps your business and your customers, then build it into how you work." |

Card **primary action:** `Link` → `/start?intent=<value>` (pre-selects screen 1). Below the grid, a
quiet link `Home.intents.capabilityLink` = **"Looking for a specific capability? See what we bring
together below."** → in-page anchor `#capabilities`.

Keys: `Home.intents.heading`, `.lede`, `.cards.{build,improve,ai}.{title,body}`, `.capabilityLink`.
A11y: cards are `<a>` (real links, keyboard-focusable), not click-handlers on `<div>`; visible focus
ring using the site's `focus-visible:outline-[#fd4601]` idiom.

### 7.3 Section 3 — Capabilities (NEW `components/sections/Capabilities.tsx`)
Anchor `id="capabilities"`. Heading = **"What we bring together"**; lede = **"One team, five
disciplines. Most projects draw on several at once."** Five items, one human sentence each (Layan §07):

| Capability | Links to |
|---|---|
| Product Strategy & Discovery | `/services/product-strategy-discovery` (new page, §8) |
| Product & Experience Design | `/services/product-experience-design` (new page, §8) |
| Product Engineering | `/services/product-engineering` (exists) |
| AI | `/services/ai-transformation` (exists) |
| Gamification & Experience | `/services/gamification-experience` (exists) |

Orange chips mark the two **signature** capabilities (AI, Gamification & Experience) per Layan. Keys:
`Home.capabilities.heading`, `.lede`, `.items[]` (array of `{title, body, slug, signature}`) — mirror
the `FAQ` `t.raw` array pattern, or key by slug like `Home.approach.cards.*`.

### 7.4 Section 4 — Our approach (reuse `Approach.tsx` re-purposed, or NEW reading section)
Layan wants a **reading** section (people-first; design+engineering together; show early; care for
quiet details). The existing `Approach.tsx` is a **cards** component keyed to service slugs — reusing
it here would re-introduce a capability grid, which double-serves §7.3. **Recommendation:** add a
lightweight reading section (heading + four short belief blocks) and reserve `Approach.tsx` for
`/explore`/service context, OR retire `Approach` from home. Keys: `Home.approach.heading`,
`.beliefs[]` = four `{title, body}` (Layan §08 "Our approach"). No CTA (reading section).

### 7.5 Section 5 — Why Muse (NEW `components/sections/WhyMuse.tsx`)
Reading section. Draw from `/about` copy already in the repo (real, non-fabricated). Heading = **"Why
Muse"**; two short paragraphs: small multidisciplinary Saudi team; being small is deliberate (design +
engineering under one roof; specialist depth in the room; you talk to the people building it). Keys:
`Home.whyMuse.heading`, `.paragraph1`, `.paragraph2`.

### 7.6 Section 6 — From the studio (NEW `components/sections/FromTheStudio.tsx`) — HONEST
Built as a **grid of slots** so real client work can fill it later. **Launch content = only live
items** (§5). Heading = **"From the studio"**; lede (present tense, no false claim) = **"We like
making things, for our clients and for ourselves."** Then render `Home.fromStudio.items[]` — an array
that is **empty or contains only verified links** at launch (e.g. `/newsletter`). If the array is
empty, the section **does not render** (guard in the component). Do not render placeholder cards.
Keys: `Home.fromStudio.heading`, `.lede`, `.items[]` = `{title, body, href, external}`.

### 7.7 Section 7 — FAQ (reuse `FAQ.tsx`)
Reuse as-is (reads `Home.faq.items` via `t.raw`, first item open, accordion, reduced-motion-safe).
**Re-copy** to Layan's buying questions (§09): what projects · who you'll work with · how projects
start · what AI Transformation means · what Gamification & Experience is. Keys: `Home.faq.heading`,
`Home.faq.items[]` = `{q, a}`.

### 7.8 Section 8 — Start a conversation (reuse `CTA.tsx`)
Reuse `CTA.tsx`; **button `href` `/get-started` → `/start`.** Copy: heading = **"Tell us what you're
working on."**; subheading = **"We'd love to hear about it. Your first conversation is with the people
who would design and build it."**; button = **"Start a conversation"**. Keys: `CTA.heading`,
`CTA.subheading`, `CTA.button`.

### 7.9 Home component wiring
Rewrite `HomeSections.tsx` imports/order to the eight sections above; keep `PageDither`+`CardDither`
wrapper and the Organization JSON-LD. Remove `Manifesto`, `WhoWeBuildFor`, `OutcomesBand`, `Ticker`
from home (retire or leave in tree for other pages). Preserve `relative isolate min-h-screen
bg-[#060608]` wrapper (PageDither requirement).

---

## 8. Capabilities information architecture & routing

**Decision:** five capabilities, three existing routes, two new honest routes — no route bloat, no
fabrication.

- **Existing (reuse):** `/services/ai-transformation`, `/services/product-engineering`,
  `/services/gamification-experience`. These already end with a CTA into the conversion path; update
  those CTAs to `/start` (currently `/get-started`).
- **New (author honestly):** `/services/product-strategy-discovery` and
  `/services/product-experience-design`. Add records to `lib/content/en/services.ts` **and**
  `lib/content/ar/services.ts` (both, per the no-fallback rule — a missing AR record 404s). Populate
  the `Service` shape with **real "what we do / how we approach" copy only** — no metrics, no clients,
  no case studies. Substance is available in the Vault (Product Philosophy = discovery; Website/Brand
  = design craft). Each page must end by **routing back into an intent** (Layan): CTA → `/start`.
- Both new slugs automatically appear in `app/sitemap.ts` (`getServices` drives it) and in
  `generateStaticParams` (`allSlugs`). No `next.config.ts` change needed (`/services/*` isn't in
  `LOCALE_INDEX_PATHS`; the child-path redirect already covers `/services/:slug+`).
- **Capability → intent linkage:** capability pages CTA into `/start` (no preselected intent, or a
  neutral `intent=capability` that lands on the "I need a specific capability" branch, §10.3).
- **Nav:** add a **Capabilities** group to `SiteHeader.tsx` `MENU_GROUPS` listing the five (routes in
  `ROUTES`, labels in `Nav.items`), so evaluators/referrals can find named skills (Layan's two-reader
  insight). Keep it a one-file route/label split per the existing pattern.

*If effort must be cut:* ship the three existing pages linked, and make Strategy & Discovery / Design
**describe-only** in the band with their "link" going to `/start` — but the recommended path authors
the two pages so the band is fully navigable.

---

## 9. Native Arabic approach (not word-for-word)

Follow the Vault **Localization Playbook (Rule Zero)** and **Brand/Website Voice**:
- **Author in Arabic**, do not translate. Every new EN key gets a **natively written** AR counterpart;
  a person who writes Arabic well reviews all of it before `PUBLISHED_LOCALES` gains `ar`.
- **Register split by function:** MSA for the spine (headings, capability/service names, nav, form
  labels, `/start` step titles, legal); **light Saudi spoken** for body/CTAs (one or two markers per
  paragraph — `عشان`, `وش`, `مو`, `اللي`, `بس`). No deep dialect (`أبغى/تبي`), no classical rarities.
- **Forbidden:** the `X، لا Y` contrast construction **in every grammatical form** (definite/indefinite,
  verbal/nominal). The Vault's sanctioned "correction pivot" uses **`مو`** and must pass the
  specificity gate; use it **at most once per page** and never as filler. Prefer plain statements.
- **Punctuation:** straight quotes only; **no em dashes, no en dashes**, in AR and EN.
- **Mixed-direction strings** (Arabic + "Muse"/Latin/phone/email) are where RTL bugs live — the
  existing code already handles email/phone with `dir="ltr"`; keep that in `/start`.
- **Numerals/dates/currency:** the flow carries **no pricing/timelines** (Layan), so this is minimal;
  keep Western numerals as the site does. Icons/arrows mirror via `.arrow-inline`.
- Existing native examples to match in tone: hero (`احنا فريق منتجات في الرياض`), FAQ
  (`وش يفرقكم…`, `خبّرنا بالمشكلة`). Draft AR is provided inline in §7 and §10 for the executor to refine.

---

## 10. `/start` guided conversation — full spec

**Route:** new `app/[locale]/start/page.tsx` (client island for the flow; SSR the shell). Namespace
**`Start`**. **Two screens maximum after the initial intent.** No pricing, packages, or timelines
anywhere. A **skip-to-contact** ("just get me to a person") is visible on every screen.

### 10.1 State machine
```
        ┌────────────── skip (any screen) ─────────────┐
        ▼                                               │
[Screen 0: Intent] ──select──▶ [Screen 1: Context Qs] ──next──▶ [Screen 2: Contact] ──submit──▶ [Success]
   5 options                     1–2 light questions            name · reach · call|write        delivered? honest msg
        ▲                              │                              │
        │◀────────── back ────────────┘◀───────────── back ──────────┘
```
- Deep-link `/start?intent=<build|improve|ai|capability>` **starts on Screen 1 pre-selected**
  (Screen 0 choice recorded, skipped visually). Unknown/absent param → Screen 0.
- "I'm not sure yet" **skips Screen 1** → straight to Screen 2 with an open text prompt.
- State held in React state (client) + reflected in the URL query for shareability/back-button; no
  server round-trips until final submit.

### 10.2 Screen 0 — "What are you looking to do?" (five options)
`build` · `improve` · `ai` · `capability` (I need a specific capability) · `unsure` (I'm not sure yet).
Options are keyboard-navigable radio-style cards (roving tabindex or native radios), Enter/Space select.

### 10.3 Screen 1 — one or two light questions (branch by intent)
| Intent | Q1 (free text) | Q2 (single choice) |
|---|---|---|
| build | "Tell us a little about the idea." | "Where is it today?" → thought · plan · designs · prototype |
| improve | "Tell us a little about the product." | "What feels most important right now?" → experience · performance · growth · a rethink |
| ai | (choice only) | "What would you most like AI to help with?" → operations · customers · your product · not sure yet |
| capability | "A line or two about the work." | "Which one?" → the five capabilities |
| unsure | "Tell us what's on your mind." (open text) | — (skip to Screen 2) |

All Q2 option **values stay English/stable** (submitted verbatim), **labels translated** — mirror the
`GetStartedForm` pattern (`services` array values fixed, labels via `t(...)`).

### 10.4 Screen 2 — contact (every path converges here)
Fields: `firstName`\* · `email`\* · `phone` (optional unless "book a call") · a single **"how should we
reach you"** choice → **"Book a call"** | **"Write to us"** (`preferredContact: call|write`). Optional
`company`. The Screen-1 answers travel as hidden/derived fields. Honeypot `website` input (copy from
`GetStartedForm`). Client validation: required fields present, valid email (mirror `isValidEmail`
message via `Forms.errors.invalid_email`).

### 10.5 Submit, success, failure
- **POST to `/api/get-started`** (reuse). Compose the payload so the existing handler's required set is
  satisfied: map `firstName`, `email`, and put the guided answers into `needs` (intent + Q1 + Q2 +
  preferredContact, human-readable), pass `phone`/`company` when present. Because the handler requires
  `lastName/phone/company/jobTitle`, either (a) **relax those to optional** in the handler (small,
  honest change — the guided flow deliberately asks less) or (b) send safe empty strings. **Recommended:
  (a)** — add a light `source: "start"` branch or loosen required fields so `/start` isn't gated on
  fields it doesn't ask. Document this as the one API edit.
- **Success (delivered):** `Start.success.deliveredTitle/Body` — reuse the honest split: if
  `result.delivered` → "we'll be in touch"; if not → "we've noted it; reach us on WhatsApp/email
  meanwhile" (`useFormSubmit` already exposes `delivered`).
- **"Book a call":** *default (no scheduling URL):* submit as above with `preferredContact:"call"` and
  success copy "we'll reach out to schedule." *If a real scheduling URL exists:* the "Book a call"
  choice links out to it instead. **Do not embed a fake calendar.**
- **Failure:** `useFormSubmit` sets `status:"error"` with a localized message; render an `role="alert"`
  and keep the form filled for retry (state preserved).

### 10.6 Redirects & link updates (retire `/get-started` as primary)
- Add 308 `/get-started` → `/start` in `next.config.ts` (both `/get-started` and `/:locale(ar|en)/get-started`).
  Remove `/get-started` from `LOCALE_INDEX_PATHS` (or repoint) so it doesn't 308 to a page that then
  308s again — collapse to a single hop to `/start`.
- Repoint every internal link (§3.7): `SiteHeader.tsx`, `Footer.tsx`, `CTA.tsx`, `Manifesto.tsx`
  (if kept anywhere), `Services.tsx`, service detail page CTA, and `app/sitemap.ts` (replace the
  `/get-started` entry with `/start`).
- Keep `/api/get-started` (endpoint name stable; it's not user-facing). Optionally alias later.
- `Nav.items.getStarted` label stays "Get Started" / "ابدأ" or becomes "Start a conversation" — copy
  decision, not structural.

### 10.7 Accessibility (Quality Bar + brief)
- Full keyboard flow: Tab order screen-by-screen; radios/choice-cards operable with arrows/Space;
  Back/Next are real `<button>`s; skip-to-contact reachable by keyboard on every screen.
- Focus management: on step change, move focus to the new step's heading (`tabindex="-1"` + `.focus()`),
  announce step via `aria-live="polite"` region ("Step 2 of 3").
- Validation errors are programmatically associated (`aria-describedby`) and announced (`role="alert"`).
- Respect `prefers-reduced-motion` for any step transitions (site already gates motion this way).
- RTL: layout mirrors; arrows use `.arrow-inline`; email/phone inputs `dir="ltr"`.

---

## 11. Phased implementation (one logical commit per phase)

Work on `direction/4-understanding-first`. Never touch `main` or other branches. Commit identity is
already correct for `~/Downloads/personal/**` (`alsubaieabdullah` / `abdullah.a.alsubaie@outlook.com`);
re-verify before the first commit.

### 11.0 Phase 0 — Scaffolding & keys (commit: `feat(d4): message keys + route scaffolding`)
Add all new `Home.*`, `Start.*`, `Nav`/`ROUTES` keys to **both** `messages/en.json` and `ar.json`
(AR native drafts). Create empty `/start` route shell. **Do not** wire home yet. Run key-parity check.

### 11.1 Phase 1 — Hero + IntentRouter (commit: `feat(d4): understanding-first hero + intent router`)
Swap hero copy keys; change hero CTA → `/start`. Build `IntentRouter.tsx`; wire only Hero + IntentRouter
into `HomeSections.tsx` (rest temporarily below or stubbed). **STOP for the visual gate (§11.2).**

### 11.2 First visual gate (MANDATORY — do not scale past this)
Build succeeds; run the SSR + screenshot probes (§12) for EN and AR, desktop + mobile, on Hero +
IntentRouter only. Confirm: modular scale & baseline rhythm read as professional; asymmetric
whitespace intentional; intent cards keyboard-focusable; RTL mirrored; reduced-motion clean; no
horizontal overflow; no console errors. **Only if structure and rhythm meet the bar, continue.** If
not, fix layout at the root (spacing scale, grid) before adding sections.

### 11.3 Phase 2 — Capabilities + Approach + Why Muse (commit: `feat(d4): capabilities, approach, why-muse`)
Build `Capabilities.tsx` (5 items, anchor, signature chips), the approach reading section, `WhyMuse.tsx`.
Wire into home order.

### 11.4 Phase 3 — From the studio + FAQ + Start CTA (commit: `feat(d4): from-the-studio slots, faq, closing cta`)
Build honest `FromTheStudio.tsx` (renders nothing when items empty); re-copy `Home.faq`; point `CTA`
button → `/start`. Home now complete in all eight sections.

### 11.5 Phase 4 — `/start` guided flow (commit: `feat(d4): /start guided conversation`)
Build the state machine, three screens, preselection from `?intent=`, skip-to-contact, validation,
a11y, submit via `/api/get-started` (+ the one required-fields relaxation, §10.5). Add success/failure.

### 11.6 Phase 5 — Retire `/get-started`, redirects, link sweep (commit: `feat(d4): route /start as primary conversion`)
`next.config.ts` redirect; repoint all internal links + sitemap (§10.6); retire `GetStartedForm` from
the primary path.

### 11.7 Phase 6 — Capability pages (commit: `feat(d4): strategy-discovery + design capability pages`)
Author two new honest `Service` records (EN + AR); nav Capabilities group; CTAs → `/start`; existing
three service CTAs `/get-started`→`/start`.

### 11.8 Phase 7 — Intent pages `/build /improve /ai` (commit: `feat(d4): intent landing pages`)
Fast-follow. Each: `SubpageHero` + problem-first copy + which capabilities apply + CTA → `/start?intent=…`.
Add routes, sitemap entries, and (if desired) intent-card "learn more" secondary links.

### 11.9 Phase 8 — Arabic native pass (commit: `feat(d4): native arabic pass for direction 4`)
Native review of every new AR string; fix RTL/mixed-direction issues found in probes. **Only flip
`PUBLISHED_LOCALES` to include `ar` if/when the full site's Arabic is complete and reviewed** — this is
a site-wide gate, likely out of D4's scope; document status either way.

### 11.10 Phase 9 — QA sweep + walkthrough + vault (commit: `docs(d4): qa report, walkthrough, vault update`)
Run the full deterministic QA (§12); regenerate the walkthrough PDF (§13); update the Vault (§13).

---

## 12. Verification — exact commands & acceptance criteria

Run from repo root. All must pass before a phase is "done" (Vault: *verify before done*).

### 12.1 Build, and scan for hidden i18n failures
```bash
npm run build 2>&1 | tee /tmp/d4-build.log
# Next can exit 0 while next-intl logs MISSING_MESSAGE for absent keys. Fail the build if any appear:
! grep -Eiq "MISSING_MESSAGE|INVALID_MESSAGE|IntlError" /tmp/d4-build.log
```
**Accept:** exit 0 **and** zero `MISSING_MESSAGE`/`IntlError` lines.

### 12.2 Typecheck & lint
```bash
npx tsc --noEmit
npm run lint
```
**Accept:** no type errors; lint clean (esp. `react-hooks/*`, a11y rules).

### 12.3 Translation key parity (EN ↔ AR)
```bash
node -e '
const en=require("./messages/en.json"),ar=require("./messages/ar.json");
const keys=(o,p="")=>Object.entries(o).flatMap(([k,v])=>v&&typeof v==="object"&&!Array.isArray(v)?keys(v,p+k+"."):[p+k]);
const e=new Set(keys(en)),a=new Set(keys(ar));
const miss=[...e].filter(k=>!a.has(k)),extra=[...a].filter(k=>!e.has(k));
if(miss.length||extra.length){console.error("AR missing:",miss,"\nAR extra:",extra);process.exit(1)}
console.log("i18n key parity OK");'
```
**Accept:** parity OK (arrays like `faq.items` must be same length — spot-check by eye).

### 12.4 Forbidden copy/punctuation sweep (AR + EN)
```bash
# No em/en dashes anywhere in messages or new content:
! grep -RnP "[\x{2013}\x{2014}]" messages/ lib/content/ && echo "no en/em dashes"
# No X، لا Y contrast construction in Arabic (definite + indefinite):
! grep -RnE "،[[:space:]]*لا[[:space:]]" messages/ar.json lib/content/ar/ && echo "no ،لا contrast"
# No banned English phrases:
! grep -RniE "cutting.edge|seamless|leverag|empower|unlock|best.in.class|next level|thrilled to|excited to (announce|share)|innovative solutions|passionate about" messages/en.json lib/content/en/ && echo "no banned phrases"
# No curly quotes / guillemets:
! grep -RnP "[\x{201C}\x{201D}\x{00AB}\x{00BB}]" messages/ lib/content/ && echo "straight quotes only"
```
**Accept:** every line prints its OK message (no matches).

### 12.5 SSR EN/AR probes + guided-flow + overflow + console (Playwright, already a devDependency)
Author `scripts/d4-verify.mjs` (Playwright) that, for `en` and `ar`, on desktop (1440×900) and mobile
(390×844):
1. Loads `/`, `/start`, `/start?intent=build`, `/start?intent=ai`, each intent page, each capability
   page; asserts HTTP 200 and correct `<html lang>`/`dir`.
2. Captures full-page screenshots → `docs/three-doors/_verify-d4/<locale>-<device>-<route>.png`.
3. Asserts **no horizontal overflow**: `document.scrollingElement.scrollWidth <= clientWidth + 1`
   and `window.scrollTo(9999,0); scrollX === 0` (the exact class of bug called out in `Services.tsx`).
4. Collects `console` + `pageerror`; asserts none.
5. **Guided-flow path coverage:** for each intent, select intent → answer Screen 1 → reach Screen 2 →
   submit (stub network or assert POST to `/api/get-started` with the expected body); assert success
   state renders. Cover `unsure` (skips Screen 1), `capability`, deep-link preselection, and
   skip-to-contact.
6. **Keyboard nav:** Tab through `/start`; assert every control reachable and focus-visible; Escape/Back
   behave; assert the skip link works.
7. **Reduced motion:** set `reducedMotion: "reduce"` context; assert flow still completes and no
   animation-dependent content is hidden.
```bash
node scripts/d4-verify.mjs 2>&1 | tee /tmp/d4-verify.log
```
**Accept:** all routes 200; correct lang/dir; zero overflow; zero console/page errors; all guided
paths reach success; keyboard + reduced-motion pass; screenshots written for both locales/devices.

### 12.6 Measurable acceptance criteria (summary checklist)
- [ ] `npm run build` exit 0 **and** no `MISSING_MESSAGE`.
- [ ] `tsc --noEmit` + lint clean.
- [ ] i18n key parity EN↔AR; array lengths match.
- [ ] Zero em/en dashes; zero `X، لا Y`; zero banned phrases; straight quotes only.
- [ ] EN + AR SSR 200 with correct `lang`/`dir` on every new/changed route.
- [ ] Zero horizontal overflow at 390 and 1440, both locales.
- [ ] Zero console/page errors on every route.
- [ ] `/start` completes for all five branches incl. preselection + skip-to-contact; validation blocks
      empty required fields; success shows honest delivered/undelivered copy.
- [ ] Full keyboard operability + reduced-motion pass on home + `/start`.
- [ ] No fabricated artifact renders in "From the studio"; empty section does not render.

---

## 13. Vault update & walkthrough deliverables

- **Journal entry:** add `Muse Vault/09 Journal/2026-08-08 Direction 4 Understanding-First.md` — what
  changed (homepage IA, `/start`, retired `/get-started` form, two new capability pages, honest
  "From the studio"), decisions locked/open, and the QA result summary. Follow Vault conventions
  (straight quotes, no dashes, links to `[[Website]]`, `[[Website Voice]]`, `[[Localization Playbook]]`,
  `[[Quality Bar]]`).
- **Reconcile `Marketing/Website.md`:** it still lists insights/playbooks and the old seven-block
  homepage; note that Direction 4 supersedes the homepage argument and that insights/playbooks are
  retired in code. Do **not** overwrite history; append a dated "Direction 4" section.
- **Walkthrough PDF:** regenerate using the existing `walkthrough-src/` pipeline (`shoot.py` →
  `build.py`), capturing the new home (8 sections), `/start` (all screens), intent + capability pages,
  EN + AR, desktop + mobile. Verify (as the 2026-08-05 rebuild did): all pages within bounds, fonts
  pure Space Grotesk + IBM Plex Sans Arabic, **zero em/en dashes, zero curly quotes, zero `X، لا Y`**
  in every quoted cell and caption. Screenshots are gitignored/regenerable.
- **Screenshots for review:** the `scripts/d4-verify.mjs` output in `docs/three-doors/_verify-d4/`.

---

## 14. Instructions for a fresh Sonnet executor

1. **Read first:** this file, then `docs/three-doors/direction-4-research.md`, then the source brief.
   Skim the Vault notes in the task brief (Website Voice, Localization Playbook, Quality Bar, Brand
   Colour & Type). The Vault's `Marketing/Website.md` is **partly stale** — trust the code.
2. **Verify git identity** before your first commit: repo is under `~/Downloads/personal/**` →
   `alsubaieabdullah` / `abdullah.a.alsubaie@outlook.com`. Set locally per repo if wrong. Never touch
   `main` or other branches; work only on `direction/4-understanding-first`.
3. **Ground truth is the code, not assumptions.** Import internal links from `@/i18n/navigation`.
   Add every new EN key to `ar.json` too (no fallback exists — a missing AR record 404s). Values that
   are submitted (choice options) stay English; only labels translate.
4. **Respect the locks (§6.1)** and the brand system (§3.8). White text never sits on orange for body.
   Use existing CSS markers (`.hero-highlight`, `.arrow-inline`, reduced-motion blocks); don't invent
   a parallel system.
5. **Build in the phase order (§11).** After Phase 1, **STOP at the visual gate (§11.2)** and run the
   probes; do not scale until Hero + IntentRouter meet the bar.
6. **Honesty is a hard gate (§5):** never render a "From the studio" card, metric, client, product,
   experiment, or case study that isn't verifiably live. When unsure, omit and flag it.
7. **Arabic is authored, not translated (§9).** Draft natively; leave clear TODO markers for the human
   native reviewer; do not machine-translate customer-facing copy.
8. **Run the full §12 verification** each phase; a green `next build` is not enough (scan for
   `MISSING_MESSAGE`). Regenerate the walkthrough and update the Vault (§13) at the end.
9. **When a decision is genuinely open (§6.2), take the recommended default** and note it in the
   commit body / journal rather than blocking.
10. **One logical commit per phase**, message prefix `feat(d4): …` / `docs(d4): …`.

---

## 15. Summary & real blockers

**Recommended build:** an understanding-first homepage (Territory A hero → "how can we help?" intent
router → five supporting capabilities → approach → why Muse → honest "from the studio" → buying-question
FAQ → "start a conversation"), backed by a real two-screen `/start` guided conversation that reuses the
existing honest form pipeline, with `/get-started`'s qualification form retired and redirected. Five
capabilities get truthful homes (three existing pages + two new no-proof pages). Arabic is authored
natively throughout. A mandatory visual gate follows Hero + intents; deterministic QA (build/i18n/typecheck/
parity/forbidden-copy/SSR/overflow/console/keyboard/reduced-motion/guided-flow) gates every phase.

**Real blockers (need a human decision, do not block starting):**
1. **"From the studio" contents** — confirm which items (if any) are genuinely live; otherwise the
   section ships minimal or is cut. No placeholders.
2. **"Book a call" mechanism** — provide a real scheduling URL, or accept the request-a-call fallback.
3. **Native Arabic review** — all new copy needs a human Arabic writer before `ar` is published.
4. **Form delivery** — verify `RESEND_API_KEY` + a verified sender domain so `/start` leads actually
   arrive (today the endpoint honestly returns `delivered:false` and only logs without a key).

**Non-blockers to note:** brand orange `#fd4601` vs deck `#FE4701` (kept as-is); team named/anonymous
(kept as-is on `/about`); intent pages and the two capability pages can follow the home + `/start`
core without blocking the gate.
