# Opus Implementation Plan: Rebuild the Three Screenshot-First Walkthrough PDFs

Status: executable plan for a fresh Sonnet session
Date: 2026-08-05
Revision target for every PDF: Revision 3
Scope: Direction 1 (`direction/1-the-studio`), Direction 2 (`direction/2-the-thesis`), Direction 3 (`direction/3-the-proof`)

This plan is the single source of truth for the executor. Follow it section by section. Where a tradeoff existed it has already been decided here; do not re-open decided questions. Where the honest current state of the site is ugly (Direction 3 Arabic English-in-catalogue content), the plan documents it rather than hiding it.

---

## 0. Inputs read and one honesty note about conflicts

All eleven required inputs were read: the journal task note, `rebuild-brief.md`, `audit-current.md`, `capture-spike-verdict.md`, `audit-d1.md`, `audit-d2.md`, `audit-d3.md`, `source-evidence-global.md`, `source-evidence-saudi.md`, `source-feasibility.md`, the existing per-direction walkthrough source folders, the research banks under `docs/three-doors/research/`, and the Muse voice material under `Muse Vault/01 Company/`. No listed input was missing.

One conflict between inputs must be resolved up front, because it changes the reference appendix:

- `source-evidence-saudi.md` promotes **ATHR Gallery** as a strong bilingual identity reference.
- `source-feasibility.md` (the later, live-Playwright pass) **rejects ATHR**: its first viewport renders mostly blank before consent, so it is poor live evidence.

Resolution rule for this whole plan: **when the live feasibility pass contradicts an earlier evidence shortlist, the feasibility pass wins**, because reference plates must contain a real, clean, capturable frame. ATHR is therefore dropped from the capturable evidence set and replaced with feasibility-confirmed sources (Section 4). The same rule drops **Tamkeen Bahrain** (403 to the visual browser per `source-evidence-saudi.md`).

Second honesty note, carried into every appendix: several strong global candidates in `source-evidence-global.md` (Figma, Webflow, Intercom) are **not present in the original research banks** (`grep` of `docs/three-doors/research/*` finds no Figma/Webflow/Intercom). They may still be used, but only classified as `Independent validation`, never as `Direct input`. The classification table in Section 4 is built from that grep, not from vibe.

---

## 1. Exact page architecture

### 1.1 Shared rules for every direction

Page ordering law (from `rebuild-brief.md`):

1. Cover.
2. Then, for each real homepage section in exact site order: EN visual page, AR visual page, content/rationale page. (Short bands may combine EN and AR onto one visual page; see below.)
3. Only after the final site section (Footer): Objections answered, Open decisions, Structure map, Source map, Reference evidence plates.

Hard constraints, non-negotiable:

- The **Footer** screenshot appears **only** in the Footer visual group, which is the last visual group before the appendix. It never appears on a Hero page, a CTA page, or any "below the fold" page.
- **Hero** pages contain hero-only imagery. No footer, no CTA, no next-section heading in any hero image.
- **Doors** images end at the Doors section boundary. No Manifesto title or pixels.
- Every real section has dedicated EN desktop, EN mobile, AR desktop, AR mobile evidence. "Dedicated" means captured from that section's own root, not a viewport slice.

Visual page layout inside a group:

- **EN visual page**: desktop screenshot is the primary (large) figure; mobile screenshot is the secondary figure; concise caption under each. Split mobile parts (A/B) stack vertically; if they do not fit legibly beside the desktop figure, add one continuation visual page labeled `(continued)` rather than shrinking a phone figure into an unreadable strip.
- **AR visual page**: same layout, Arabic captures. Arabic is presented as its own content, never described as a translation.
- **Content/rationale page** (no screenshots): the section's job, verbatim EN copy, verbatim AR copy (pulled from `messages/en.json` / `messages/ar.json` on that branch), content anatomy, why it sits at this position, and inline source attribution.

There are **no locale-combining exceptions**. Outcomes Band and Ticker follow the same sequence as every other section: EN visual page, AR visual page, then content/rationale page. Their visual pages may use a clearly labeled detail crop of the same exact screenshot to keep a thin band legible, but may not mix locales or pull in neighboring sections. Consistency with the user's requested sequence matters more than a shorter page count.

Split-driven extra pages: Doors, Manifesto, FAQ, Footer (all directions), plus Problem and Standard (D2) and Proof Wall (D3) are expected to exceed mobile viewport height and often desktop height. When a locale's split produces parts that cannot sit legibly with the desktop figure on one page, add a `(continued)` visual page for that locale. Page counts below are therefore stated as a floor plus the expected split additions.

Cover contents (identical structure per direction, from `rebuild-brief.md`):

- Direction name.
- One-sentence explanation of the direction (reuse the one-line summary from `docs/three-doors/direction-1-the-studio.md` and the equivalent files on branches 2 and 3; if a branch lacks it, write one sentence from that branch's Hero thesis).
- `Prepared by Abdullah Alsubaie`.
- Reference `MUSE-DIR-01`, `MUSE-DIR-02`, or `MUSE-DIR-03`.
- `Status: Review`.
- `Revision 3`.

### 1.2 Direction 1 (The Studio) page sequence

Site order (from `audit-d1.md`): Hero, Three Doors, Manifesto, Outcomes Band, Ticker, FAQ, Final CTA, Footer.

| Page(s) | Content | Notes |
|---|---|---|
| 1 | Cover | MUSE-DIR-01 |
| 2 | Hero, EN visual (desktop + mobile) | element captures; no doors, no footer |
| 3 | Hero, AR visual | AR RTL, shaped |
| 4 | Hero, content/rationale | verbatim EN+AR hero copy |
| 5 | Three Doors, EN visual | desktop element; mobile element or split A/B |
| 6 | Three Doors, AR visual | AR mobile split likely |
| (+1) | Three Doors, continuation | only if AR/EN mobile split does not fit |
| 7 | Three Doors, content | door model + copy explainer |
| 8 | Manifesto, EN visual | desktop element or split; mobile split |
| 9 | Manifesto, AR visual | AR taller; split |
| (+1) | Manifesto, continuation | if needed |
| 10 | Manifesto, content | why-now argument + embedded PressureStatement |
| 11 | Outcomes Band, EN visual | desktop + mobile, exact section only |
| 12 | Outcomes Band, AR visual | desktop + mobile, exact section only |
| 13 | Outcomes Band, content | delivery-standard explainer |
| 14 | Ticker, EN visual | deterministic frozen phase; desktop + mobile |
| 15 | Ticker, AR visual | deterministic frozen phase; desktop + mobile |
| 16 | Ticker, content | motion/message explainer |
| 17 | FAQ, EN visual | first item open state; split |
| 18 | FAQ, AR visual | AR longer; split |
| (+1..2) | FAQ, continuation(s) | as measured |
| 19 | FAQ, content | objection handling explainer |
| 20 | Final CTA, EN visual | outer section element; excludes footer |
| 21 | Final CTA, AR visual | |
| 22 | Final CTA, content | conversion close explainer |
| 23 | Footer, EN visual | desktop element; mobile split |
| 24 | Footer, AR visual | mobile split |
| (+1) | Footer, continuation | if needed |
| 25 | Footer, content | navigation/contact/legal explainer |
| 26 | Objections answered | appendix begins |
| 27 | Open decisions (each with a recommendation) | |
| 28 | Structure map (site section order) | |
| 29 | Source map (UI + copy sourcing) | |
| 30..N | Reference evidence plates | exactly 6 figures; ~3 to 5 pages |

D1 floor: about 30 pages; expected final about 32 to 36 with splits.

### 1.3 Direction 2 (The Thesis) page sequence

Site order (from `audit-d2.md`): Hero, The Problem, The Standard, Three Doors, Manifesto, Outcomes Band, Ticker, FAQ, Final CTA, Footer.

Groups, in order, each following the EN visual / AR visual / content pattern (Outcomes and Ticker use the combined short-band layout):

1. Cover (MUSE-DIR-02).
2. Hero (EN visual, AR visual, content).
3. The Problem (EN visual, AR visual, content) - desktop element, mobile split A/B both locales.
4. The Standard (EN visual, AR visual, content) - split both sizes both locales; heading+paragraphs, then pillars.
5. Three Doors (EN visual, AR visual, content) - desktop element, mobile split.
6. Manifesto (EN visual, AR visual, content) - split where measured.
7. Outcomes Band (EN visual, AR visual, content).
8. Ticker (EN visual, AR visual, content).
9. FAQ (EN visual, AR visual, content) - split, first item open.
10. Final CTA (EN visual, AR visual, content).
11. Footer (EN visual, AR visual, content) - split at the horizontal rule.
12. Appendix: Objections, Open decisions, Structure map, Source map, Reference evidence plates (exactly 6 figures).

D2 floor: about 35 pages (Problem and Standard add two full visual groups over D1); expected final about 38 to 42 with splits. D2 is the longest direction; that is correct, do not compress it.

### 1.4 Direction 3 (The Proof) page sequence

Site order (from `audit-d3.md`): Hero, Proof Wall, Three Doors, Manifesto, Outcomes Band, Ticker, FAQ, Final CTA, Footer.

Groups, in order:

1. Cover (MUSE-DIR-03).
2. Hero (EN visual, AR visual, content).
3. Proof Wall (EN visual, AR visual, content) - full-element both sizes; split into heading + cards 1 to 3 and cards 4 to 6 where height requires; never crop a card.
4. Three Doors (EN visual, AR visual, content).
5. Manifesto (EN visual, AR visual, content).
6. Outcomes Band (EN visual, AR visual, content).
7. Ticker (EN visual, AR visual, content).
8. FAQ (EN visual, AR visual, content).
9. Final CTA (EN visual, AR visual, content).
10. Footer (EN visual, AR visual, content).
11. Appendix: Objections, Open decisions, Structure map, Source map, Reference evidence plates.

**Direction 3 Arabic honesty requirement (do not hide, do not invent):** On `direction/3-the-proof`, `messages/ar.json` stores **English** strings for `Home.hero`, all `Home.proofWall` fields and cards, `CTA`, `Footer`, `Nav`, and several shared labels; `i18n/request.ts` performs no runtime fallback. So the Arabic route renders real RTL layout but with English copy in Hero, Proof Wall, Final CTA, Footer, and chrome. Doors, Manifesto, Outcomes, Ticker, and FAQ are genuine Arabic.

The plan requires:

- Capture the Arabic route as it truly is. Do not skip the AR captures and do not fabricate Arabic.
- Every AR visual page for an English-in-catalogue section carries a factual caption: `Arabic route and RTL composition; this section's copy is currently stored in English in the Arabic catalogue, pending native localization.`
- The content pages for those sections show the English copy that is actually stored under the AR keys, and state plainly that native Arabic is an open decision.
- List this in Open Decisions as decision D3-AR with a recommendation (recommend: localize `Home.hero`, `Home.proofWall`, `CTA`, `Footer`, `Nav` before external circulation; until then, ship the walkthrough with the honest label).

D3 floor: about 33 pages; expected final about 35 to 39 with splits.

---

## 2. Screenshot manifest

### 2.1 Filename schema (all directions)

```
home-{NN}-{section}-{locale}-{device}[-{part}].png
```

- `{NN}`: zero-padded site order index within that direction (see per-direction tables).
- `{section}`: short slug (`hero`, `problem`, `standard`, `proof`, `doors`, `manifesto`, `outcomes`, `ticker`, `faq`, `cta`, `footer`).
- `{locale}`: `en` or `ar`.
- `{device}`: `desktop` or `mobile`.
- `{part}`: optional `a`, `b`, `c` for split captures inside one cell. Absent when a single capture covers the cell.

Files are written to `docs/three-doors/direction-{N}-walkthrough-src/assets/screens/{locale}/`. This folder is gitignored today (`.gitignore` present in each src); the plan keeps screenshots **committed** for the rebuild so the PDF is reproducible from the repo. Remove `assets/screens` from each `.gitignore`, or add a negation, on each branch before committing (record this as a deliberate change).

### 2.2 Viewport and output settings (decided)

- Desktop capture viewport: **1440 x 900**, `device_scale_factor = 2`. Output pixel width therefore 2880. Rationale: the brief allows scale 1 or 2 and asks for legibility; scale 2 keeps Arabic shaping and small FAQ text crisp when placed as a PDF figure. Use 2 everywhere for consistency.
- Mobile capture viewport: **390 x 844**, `device_scale_factor = 2`. Output pixel width 780.
- Locale context: Playwright `locale="en"` for EN, `locale="ar-SA"` for AR (matches current `shoot.py`).
- Element captures use `locator.screenshot()` (clips exactly to the element box). Do **not** pass `animations="disabled"`. Do **not** use a reduced-motion browser context. (Both were proven in `capture-spike-verdict.md` to leave Framer Motion sections at server-rendered `opacity:0`.)
- Ticker uses a bounded clip around `.ticker-wrapper` (or its `div.overflow-x-clip` parent) with the CSS animation frozen at a deterministic phase via injected `* { animation-play-state: paused !important; }` applied only to the ticker subtree, plus a fixed `transform` reset if the frozen phase is visually empty.

### 2.3 Per-target settle sequence (every capture)

1. `page.goto(url, wait_until="networkidle")`.
2. `await page.evaluate("document.fonts.ready")`.
3. Resolve the section root via the locale anchor (Section 2.5), assert exactly one match, read its `bounding_box()`.
4. `root.scroll_into_view_if_needed()` then `page.evaluate` a `scrollIntoView({ block: "center" })` on the element, so `whileInView` reveals fire.
5. Wait `1800ms` for Framer Motion to settle (spike value).
6. For middle sections only, inject nav-hide CSS (Section 2.4) and record `nav_hidden: true`.
7. Re-measure `bounding_box()`. If height exceeds the device-safe budget (desktop > 1400 CSS px, mobile > 1500 CSS px), switch to split mode (Section 2.6).
8. Capture: `locator.screenshot()` for element mode; `page.screenshot(clip=...)` for bounded/split mode.
9. Write file, append a manifest entry (Section 2.7).

### 2.4 Navigation handling (decided)

- **Hero**: keep the real fixed navigation visible. Do not hide it. This documents the true first screen.
- **All non-Hero sections**: resolve exactly one page header (`body > header`, otherwise the first `header` whose computed position is `fixed` or `sticky`), set that element's inline `visibility:hidden` immediately before the shot, then restore its prior inline value. Do not use a broad `nav[aria-label]` rule because it can hide real navigation inside a captured section or footer. Assert the resolved header alone is hidden at capture time and record `nav_hidden: true`. This is presentation cleanup, not a content change, and is disclosed on the content pages' method note.
- Validation later asserts that on every non-Hero capture, the sticky header did not paint over the section heading (Section 3).

### 2.5 Section registry (selectors, anchors, hero assertions)

Selectors are text/role-anchored, resolved to the nearest `section` (or explicit footer/ticker root). Do not use broad `querySelectorAll('h1,h2,h3,p,span,div').find(startsWith)`; that is the exact bug that produced stale Doors shots. Resolve the heading with an exact/regex text locator, then climb: `locator.locator('xpath=ancestor::section[1]')`. Footer uses `body > footer`. Ticker uses `.ticker-wrapper` (or its `div.overflow-x-clip` parent) with `.first()`.

**Branch-specific hero assertion string** (checked in the live DOM before the first capture on each branch; abort on mismatch to prevent stale-server / wrong-branch screenshots):

| Branch | EN hero assertion (in `h1`) | AR hero assertion |
|---|---|---|
| D1 `direction/1-the-studio` | `We build our own software.` | `نبني تطبيقاتنا الخاصة.` |
| D2 `direction/2-the-thesis` | `Shipping is easy now.` and `Shipping well isn't.` | `الإطلاق سهل.` and `الإتقان مو سهل.` |
| D3 `direction/3-the-proof` | `We don't pitch.` and `We ship.` | English (`We don't pitch.` / `We ship.`) - AR catalogue holds English here; assert the English string on the AR route too and record `ar_copy_is_english: true` |

Directional registry (roots and anchors per direction). Section index `NN` follows site order.

**D1 registry**

| NN | section | root strategy | EN anchor | AR anchor | mode (desktop / mobile) |
|---|---|---|---|---|---|
| 01 | hero | `section:nth-of-type(1)` under `main#main-content > div` | `h1` `We build our own software.` | `h1` `نبني تطبيقاتنا الخاصة.` | element / element |
| 02 | doors | heading -> ancestor section | `h2` `Pick the door that matches you` | `h2` `اختر الباب اللي يناسبك` | element / element or split |
| 03 | manifesto | heading -> ancestor section | `h2` `The next decade of software gets decided in the next two years.` | `h2` `عصر المنتجات الرقمية يتحدّد خلال السنتين الجاية.` | element or split / split |
| 04 | outcomes | paragraph -> ancestor section | `p` `We deliver outcomes, not just tools.` | `p` `نوصّل نتيجة فعلية، مو مجرد أدوات.` | element / element |
| 05 | ticker | `.ticker-wrapper` / `div.overflow-x-clip` `.first()` | item `Nothing ships that we wouldn't use ourselves` | item `لا نطلق ما لا نستخدمه نحن` | bounded clip / bounded clip |
| 06 | faq | heading -> ancestor section | `h2` `Questions? We have answers.` | `h2` `أكيد عندك أسئلة.` | element or split / split |
| 07 | cta | heading -> ancestor section | `h2` `Tell us what you're trying to build.` | `h2` `قل لنا وش تبني.` | element / element |
| 08 | footer | `body > footer` | `Reach out to us` | `تواصل معنا` | element / split |

**D2 registry** (adds Problem and Standard; hero H1 is two spans)

| NN | section | root strategy | EN anchor | AR anchor | mode |
|---|---|---|---|---|---|
| 01 | hero | `section:nth-of-type(1)` | `h1` combining `Shipping is easy now.` + `Shipping well isn't.` | `h1` combining `الإطلاق سهل.` + `الإتقان مو سهل.` | element / element |
| 02 | problem | heading -> ancestor section | `h2` `Everyone has a strategy. Almost nobody ships.` (eyebrow `The problem we see`) | `h2` `الكل عنده استراتيجية. قليل اللي ينفذ.` | element / split |
| 03 | standard | heading -> ancestor section | `h2` `Muse is the quality bar. The other choice.` | `h2` `Muse هو معيار الجودة. الخيار الثاني.` | split / split |
| 04 | doors | heading -> ancestor section | `h2` `Pick the door that matches you` | `h2` `اختر الباب اللي يناسبك` | element / split |
| 05 | manifesto | heading -> ancestor section | `h2` `The next decade of software gets decided in the next two years.` | `h2` `عصر المنتجات الرقمية يتحدّد خلال السنتين الجاية.` | element or split / split |
| 06 | outcomes | paragraph -> ancestor section | `p` `We deliver outcomes, not just tools.` | `p` `نوصّل نتيجة فعلية، مو مجرد أدوات.` | element / element |
| 07 | ticker | `.ticker-wrapper` `.first()` | `Nothing ships that we wouldn't use ourselves` | `لا نطلق ما لا نستخدمه نحن` | bounded / bounded |
| 08 | faq | heading -> ancestor section | `h2` `Questions? We have answers.` | `h2` `أكيد عندك أسئلة.` | split / split |
| 09 | cta | heading -> ancestor section | `h2` `Tell us what you're trying to build.` | `h2` `قل لنا وش تبني.` | element / element |
| 10 | footer | `body > footer` | `Reach out to us` (blurb `Tell us what you're building.`) | `تواصل معنا` | split / split |

Note the `nth-of-type` fallbacks: because Ticker is a `div`, FAQ is `section:nth-of-type(7)` and CTA is `section:nth-of-type(8)` in D2. Prefer heading anchors; use positional only as a fallback and assert the resolved heading text.

**D3 registry** (adds Proof Wall; Arabic English-in-catalogue on several sections)

| NN | section | root strategy | EN anchor | AR anchor | mode |
|---|---|---|---|---|---|
| 01 | hero | `section:nth-of-type(1)` | `h1` `We don't pitch.` + `We ship.` | same English text (AR catalogue) | element / element |
| 02 | proof | heading -> ancestor section | `h2` `What we've shipped. What we're building.` (eyebrow `The work speaks`) | same English heading and cards, RTL layout | element or split / split |
| 03 | doors | heading -> ancestor section | `h2` `Pick the door that matches you` | `h2` `اختر الباب اللي يناسبك` | element / split |
| 04 | manifesto | heading -> ancestor section | `h2` `The next decade of software gets decided in the next two years.` (incl. PressureStatement `AI isn't optional.`) | `h2` `عصر المنتجات الرقمية يتحدّد خلال السنتين الجاية.` (`الذكاء الاصطناعي مو خيار.`) | element or split / split |
| 05 | outcomes | paragraph -> ancestor section | `p` `We deliver outcomes, not just tools.` | `p` `نوصّل نتيجة فعلية، مو مجرد أدوات.` | element / element |
| 06 | ticker | `div.overflow-x-clip` `.first()` | `Nothing ships that we wouldn't use ourselves` | `لا نطلق ما لا نستخدمه نحن` | element/bounded / element/bounded |
| 07 | faq | heading -> ancestor section | `h2` `Questions? We have answers.` | `h2` `أكيد عندك أسئلة.` | element or split / split |
| 08 | cta | heading -> ancestor section | `h2` `Tell us what you're trying to build.` | same English heading (AR catalogue) | element / element |
| 09 | footer | `body > footer` | `Reach out to us` | same English text (AR catalogue) | element / split |

For D3 Hero specifically: the audit notes Hero is a viewport composition (fixed header is part of the hero). Capture Hero as an **element screenshot of `section:nth-of-type(1)` with the nav visible**; if the fixed header sits outside the section box, additionally capture a `page.screenshot()` viewport top variant and prefer whichever shows the complete hero without bleeding into Proof Wall. Record which mode was used.

### 2.6 Split handling (tall sections)

- Split only at real internal boundaries: between card rows, between heading-block and pillar-row, between accordion items, or at the footer's horizontal rule. Never split through a heading, a card, or a single accordion row.
- Compute split clips from child bounding boxes, clamped to the parent section's top and bottom. Add a fixed **32 CSS px** overlap between consecutive parts within the same section so the reader can reconstruct continuity.
- Name parts `-a`, `-b`, `-c`. Each part is a separate manifest entry with its own `part` field and clip.
- Expected split cells (measure to confirm, do not assume):
  - Doors mobile (all directions): heading + door 1 / doors 2 to 3.
  - Manifesto mobile (all directions) and often AR desktop: heading + paragraphs / PressureStatement + CTA.
  - FAQ mobile and AR (all directions): heading + first items / remaining items, first item kept open.
  - Footer mobile (all directions): logo + blurb + nav / reach-out + contact + legal.
  - D2 Problem mobile: heading + cards 1 to 2 / card 3.
  - D2 Standard both sizes: heading + paragraphs / pillars.
  - D3 Proof Wall: heading + cards 1 to 3 / cards 4 to 6.

### 2.7 Manifest schema (`capture-manifest.json`, one per direction src folder)

Machine-readable array; one object per emitted file:

```json
{
  "branch": "direction/1-the-studio",
  "hero_assert_en": "We build our own software.",
  "hero_assert_ar": "نبني تطبيقاتنا الخاصة.",
  "captured_at": "2026-08-05T00:00:00Z",
  "shots": [
    {
      "file": "home-01-hero-en-desktop.png",
      "section": "hero",
      "order": 1,
      "locale": "en",
      "device": "desktop",
      "part": null,
      "url": "http://localhost:3100/en/",
      "html_lang": "en",
      "html_dir": "ltr",
      "anchor": "h1: We build our own software.",
      "root_selector": "main#main-content > div > section:nth-of-type(1)",
      "capture_mode": "element",
      "nav_hidden": false,
      "bbox": { "x": 0, "y": 0, "width": 1440, "height": 900 },
      "out_px": { "width": 2880, "height": 1800 },
      "next_section_anchor": "h2: Pick the door that matches you",
      "next_section_excluded": true,
      "ar_copy_is_english": false,
      "notes": ""
    }
  ]
}
```

Every expected cell must be present. The manifest is the contract the validator and the PDF template both consume; `document.html` image `src` values must come from the manifest, never be hand-typed.

---

## 3. Capture validation

Add `validate.py` to each src folder. It runs after `shoot`/`capture` and before any PDF build. It fails hard (non-zero exit) on any violation and prints a per-shot table.

Machine checks:

1. **File presence**: every `shots[].file` exists on disk; every file on disk is referenced by the manifest (no orphans).
2. **Manifest completeness**: the full expected matrix for the direction (every section x locale x device, plus declared split parts) is present. A missing cell is a failure, not a warning.
3. **Nonzero dimensions**: open each PNG with PIL; width and height > 0 and match `out_px` within a 2px tolerance.
4. **Branch-specific hero string**: at capture time, the runtime asserted the branch hero string in the live DOM; `validate.py` re-confirms `hero_assert_en`/`hero_assert_ar` in the manifest match the expected values for the branch it is running on (read current branch via `git rev-parse --abbrev-ref HEAD`). Mismatch = abort.
5. **Locale and URL**: `html_lang` equals the locale, `html_dir` equals `ltr` for en and `rtl` for ar, and `url` path starts with `/{locale}/`.
6. **Exact element bounding box**: `bbox.width > 0` and `bbox.height > 0`; for element mode, `out_px` equals `bbox * device_scale_factor` within tolerance (proves the clip matched the element, not a viewport).
7. **Section text included**: at capture time the runtime asserted the section anchor text is inside the captured root; the manifest records `anchor`. `validate.py` fails any shot missing `anchor`.
8. **Next section text excluded**: the runtime measured the next section's heading `bounding_box().top` and asserted it is at or below the captured root's bottom (i.e. not inside the clip). `next_section_excluded` must be `true` for every non-terminal section. For the terminal Footer, `next_section_anchor` is null.
9. **No sticky navigation over non-Hero captures**: for every shot with `section != hero`, `nav_hidden` must be `true`, and the runtime must have asserted the sticky header's computed `visibility` was `hidden` at capture. Hero shots must have `nav_hidden: false`.
10. **AR-English disclosure (D3)**: any D3 shot on the `ar` locale for sections `hero`, `proof`, `cta`, `footer` must carry `ar_copy_is_english: true`. Absence is a failure, so the honesty label can never be silently dropped.

Visual QA contact sheets (`contact.py`, one run per direction) produce four labeled sheets: EN desktop, EN mobile, AR desktop, AR mobile. Each sheet is an HTML grid (thumbnail + filename + section label) rendered to PNG via Playwright. The executor inspects all four sheets and confirms, per image:

- The intended heading/copy is visible.
- The next section heading is absent.
- The sticky nav does not cover the heading.
- Arabic is shaped and RTL (or, for D3 English-in-catalogue sections, RTL layout with the disclosed English copy).
- No image is from a stale server or wrong branch (cross-check the hero string).

Contact-sheet inspection is a named gate in the acceptance checklist, not an optional glance.

---

## 4. Reference evidence

### 4.1 Classification rule (honest, grep-backed)

`Direct input` = the site appears in the original research trail (`docs/three-doors/research/doors-ref-*.md` or `ui-patterns-*.md`) and demonstrably informed the implemented structure/interaction/copy rhythm. `Independent validation` = newly surfaced in this rebuild's evidence passes, used to confirm or challenge a pattern, never presented as the origin of existing Muse copy.

Verified against exact content searches over `docs/three-doors/research/*`:

- **In the research trail (eligible for `Direct input` only where the plan documents a real adaptation)**: Linear, Salla, Mozn/MOZN, 37signals, Basecamp, Notion, Stripe, Thmanyah, Retool, Mercury, HungerStation, Almosafer, Netlify, Framer, Wise, Slack, Vercel, Tamkeen, ATHR and Al Rajhi Bank, which appears under `alrajhibank.com`.
- **Not in the original research trail (must be `Independent validation`)**: Figma, Webflow, Intercom, GitHub, Dropbox and Mux.

Presence in a research bank is necessary but not sufficient for `Direct input`. The figure caption must also name the actual implemented Muse decision it informed.

### 4.2 Feasibility gate

Only live, visibly rendered sections may be used. Clean or feasibility-confirmed candidates include Linear, Salla, 37signals, Basecamp, Notion, Stripe, Thmanyah, Mercury, Retool, GitHub, Figma, Intercom, Al Rajhi and Almosafer. Netlify, Framer and HungerStation are usable after normal consent/banner dismissal. Reject ATHR when its usable content remains blank behind consent, reject Tamkeen when the browser gets 403, reject hidden MOZN sections, and do not use the currently empty MOZN Arabic FAQ. Webflow's previously researched heading has changed and is not eligible under the stale locator. Every chosen anchor must be rechecked in the live DOM immediately before capture.

### 4.3 Per-direction evidence sets (decided)

Each PDF gets exactly **6** large, legible reference figures, at least one Saudi/GCC and one global. The Source Map may cite additional sources as links, but the visual appendix should not become a moodboard. Every figure records: company + page, exact URL, capture date (the day the executor captures, not a copied date), visible pattern, what Muse adapted, and influence type (structure / interaction / copy rhythm / bilingual behavior). Never claim a relationship the research does not support.

**Direction 1 (The Studio) - identity hero, three lanes, manifesto, FAQ, CTA:**

| # | Source + section | URL | Muse section it informs | Influence type | Class |
|---|---|---|---|---|---|
| 1 | Linear - title-first equal lanes, no per-card eyebrows | https://linear.app | Three Doors (equal lanes, no eyebrows) | structure | Direct input |
| 2 | Salla - balanced capability lanes, one shared card CTA (`حلول سلة تدعمك بكل خطوة`) | https://salla.com | Three Doors (shared card skeleton, EN/AR density) | structure + bilingual | Direct input |
| 3 | 37signals - published thinking as a first-class index | https://37signals.com | Think door / manifesto stance | structure | Direct input |
| 4 | Thmanyah - native RTL editorial, headings without eyebrows | https://thmanyah.com | AR RTL rhythm, Manifesto | copy rhythm + bilingual | Direct input |
| 5 | Figma - identity-first hero (`The intelligent canvas for infinite creativity`) | https://www.figma.com | Hero identity-first move | structure | Independent validation |
| 6 | GitHub - manifesto-like identity hero (`The future of building happens together`) | https://github.com | Manifesto / identity hero | copy rhythm | Independent validation |

**Direction 2 (The Thesis) - problem, new standard, then doors:**

| # | Source + section | URL | Muse section | Influence | Class |
|---|---|---|---|---|---|
| 1 | Basecamp - sentence-led problem argument (`Tell me if this sounds about right.`) | https://basecamp.com | The Problem | copy rhythm + structure | Direct input |
| 2 | Retool - new-standard through concrete contrast (`Why enterprises choose Retool`) | https://retool.com | The Standard | structure | Direct input |
| 3 | Mozn - current English FAQ structure | https://www.mozn.ai | FAQ / Standard credibility | structure | Direct input |
| 4 | Salla - distinct offer lanes with shared CTA | https://salla.com | Three Doors | structure + bilingual | Direct input |
| 5 | Netlify - sequential paths, distinct verb CTAs (after banner cleanup) | https://www.netlify.com | Doors path sequencing | interaction | Direct input |
| 6 | Intercom - operational trust architecture (`A true partner with deep domain expertise`) | https://www.intercom.com | FAQ / trust close | structure | Independent validation |

**Direction 3 (The Proof) - proof wall first:**

| # | Source + section | URL | Muse section | Influence | Class |
|---|---|---|---|---|---|
| 1 | Stripe - proof-rich product UI, structured bento (`stripe.com/payments`) | https://stripe.com/payments | Proof Wall | structure | Direct input |
| 2 | Notion - shipped-work framing, whole-card navigation | https://www.notion.com | Proof Wall / Doors card behavior | interaction + structure | Direct input |
| 3 | Salla - quantified proof after the thesis (`أكثر من 68 ألف متجر نشط`) | https://salla.com | Proof / metrics band | structure + bilingual | Direct input |
| 4 | Framer - live product previews, shipped-work presentation (after banner cleanup) | https://www.framer.com | Proof Wall visual proof | interaction | Direct input |
| 5 | Mercury - proof grid tied to a standard (`stand the test of time`) | https://mercury.com | Proof metrics band | structure | Direct input |
| 6 | Al Rajhi Bank - native RTL proof chapter (`لأرقامنا بصمة`) | https://www.alrajhibank.com.sa/ar | Arabic proof hierarchy | structure + bilingual | Direct input |

Capture guidance for reference plates (from both evidence files): capture at 1440 desktop, `device_scale_factor=2`; dismiss cookie/announcement overlays only, never devtools-fabricate a state a normal visitor cannot reach; re-run the exact text locator immediately before export and, if it no longer resolves, do not ship a stale image without re-dating it; label all outcome numbers (Retool, Mercury, Salla) as the source company's marketing claim / presentation pattern, not independently verified results; one complete section per screenshot, no stitched composites unless labeled as such.

Store reference screenshots under `docs/three-doors/direction-{N}-walkthrough-src/assets/refs/{slug}.png` and record their metadata in a `refs-manifest.json` mirroring the capture manifest fields (company, url, captured_at, pattern, muse_use, influence_type, class).

---

## 5. Reusable implementation (smallest maintainable structure)

No framework rewrite. Each direction already has a self-contained src folder (`build.py`, `measure.py`, `verify.py`, `document.html`, `house.css`, `fonts/`, `assets/`). Reuse `house.css`, fonts, `build.py`, `measure.py`, `verify.py` as-is. Replace only the broken capture and add a validator, contact sheet, and manifests.

Because the three src folders live on three different git branches, a runtime-shared library is not practical; instead keep **byte-identical helper files** on each branch and a **direction-specific registry**. Add per src folder:

- `capture.py` - the new capture driver (identical across branches). Reads `sections.json`, drives Playwright per Section 2.3, writes files + `capture-manifest.json`. Replaces `shoot.py`. Keep `shoot.py` deleted or renamed to avoid accidental use.
- `sections.json` - the direction's section registry (roots, anchors, modes, split rules, hero assertion). This is the only capture registry that differs by direction.
- `validate.py` - the validator (Section 3), identical across branches; reads the direction from `git rev-parse`.
- `contact.py` - contact-sheet generator (identical across branches).
- `refs.py` + `refs-manifest.json` - reference-plate capture and metadata (Section 4). `refs.py` is identical; the reference registry differs by direction.
- `render_document.py` plus `document-data.json` - generates `document.html` from `capture-manifest.json`, `refs-manifest.json`, the current branch's `messages/en.json` and `messages/ar.json`, and direction-specific rationale/decision data. This is the missing bridge that makes the rule "no hand-typed image src" real.
- `capture-manifest.json`, `refs-manifest.json`, `document-data.json`, generated `document.html` and the selected screenshots - committed.

`document.html` stays per-direction (different content) but adopts one shared page-template vocabulary already present in `house.css`: `.page`, `.cover`, `.wrap`, `.body`/`.mid`, `.foot`, `.meta`. Add three reusable figure blocks to `house.css` (shared verbatim across branches): `.plate` (a visual page with a large `.fig-primary` and a smaller `.fig-secondary`), `.plate-split` (stacked A/B phone parts), and `.ref-plate` (reference figure + caption + clickable URL). Keep the palette and type rules untouched.

Scripts to capture, render, build, measure and verify:

- Generate HTML: `render_document.py` reads the manifests, locale catalogues and `document-data.json`, then writes `document.html`.
- Build PDF: `build.py` consumes the generated `document.html`.
- Measure fill/overflow: `measure.py`.
- Verify page count + banned punctuation + render pages + font check: `verify.py`.
- New capture and QA helpers: `capture.py`, `validate.py`, `contact.py`, `refs.py`, `render_document.py`.

This is still a focused rebuild, not a framework rewrite: five small helpers, one direction registry and one document data file per branch, while reusing the existing PDF engine and Muse visual system.

---

## 6. PDF QA

All gates below must pass before a direction is called done. Automate what can be automated; the manual gates have defined inspections, never "looks good".

Technical gates:

1. **HTML page count** equals the expected count for the direction (count `.page` elements in `document.html`; assert against the Section 1 sequence including any split-continuation pages actually added).
2. **PDF page count** equals the HTML page count (`verify.py` prints `pages:`; compare).
3. **Bounds and overflow**: `measure.py` reports every page within bounds, none `OVERFLOWS, CLIPPED`, none under half full (except the cover).
4. **No clipped screenshot frames**: every figure's rendered box is fully inside its page; verify visually on the `_verify/page-NN.png` renders and confirm no figure touches a page edge unintentionally.
5. **No unexpected blank pages**: for each `_verify/page-NN.png`, assert the non-white pixel ratio is above a small threshold (e.g. > 1%); a near-white page that is not an intentional spacer is a failure.
6. **Correct screenshot filename on each page**: `document.html` image `src` values are generated from `capture-manifest.json`; assert every `src` exists in the manifest and appears in the expected page.
7. **Correct section order**: the sequence of section slugs in `document.html` matches the Section 1 site order for that direction.
8. **Footer after CTA only**: assert the `footer` screenshot filenames appear only in the Footer visual group's pages and nowhere earlier; assert no `footer` image on any Hero or CTA page.
9. **Reference figures and URLs present**: assert exactly 6 `.ref-plate` blocks exist, each with a non-empty clickable `href` (an `<a href="http...">`), a capture date, a pattern caption, and a `Direct input` or `Independent validation` label.
10. **Banned punctuation**: `verify.py` reports zero hits for em dash, en dash, guillemets, curly quotes.
11. **Render every PDF page to PNG**: `verify.py` already writes `_verify/page-NN.png` for all pages.
12. **Font fallback**: `verify.py` reports no Times/Helvetica/Arial fallback fonts.

Visual gates (inspect every rendered page, not a sample):

13. Contact sheet review for all four locale/device sheets (Section 3) done and signed off.
14. Individual review of every `_verify/page-NN.png`; figure pages and Arabic pages re-rendered at higher resolution (bump `verify.py` scale from `80/72` to `200/72`) and inspected for shaping and RTL layout. Arabic wording correctness is verified from the DOM, locale JSON and extracted PDF text, never from vision alone.
15. Confirm clickable source links exist and resolve to the stated URLs.

Rebuild discipline: after **any** change to a screenshot, `document.html`, or `house.css`, re-run `build.py`, then `measure.py`, then `verify.py` before claiming success. A stale PDF is a failure.

---

## 7. Branch execution

Goal: no stale servers, no wrong-branch screenshots. Node 24. Server port is **3100** (hard-coded in the capture `BASE`); Next defaults to 3000, so the server must be started explicitly on 3100.

**Recommended isolation: sequential checkout with strict teardown.** Worktrees are offered as an alternative (Section 7.2) but sequential is simpler here because each branch's src is self-contained and the port is fixed; the risk is only a lingering listener, which the kill step removes deterministically.

### 7.1 Per-direction sequence (repeat for D1, then D2, then D3)

For direction `N` on branch `BR`:

1. **Checkout and identity check.** `git checkout BR`. Confirm `git rev-parse --show-toplevel`, `git config user.name` = `alsubaieabdullah`, `git config user.email` = `abdullah.a.alsubaie@outlook.com` (path is under `~/Downloads/personal/`, so this identity is mandatory; if it differs, set it locally per repo and report). Confirm `gh` active account matches before any push.
2. **Build.** `npm ci` if needed, then `npm run build` with Node 24. Must pass.
3. **Kill any previous port 3100 listener.** `lsof -ti tcp:3100 | xargs -r kill -9`. Re-check the port is free (`lsof -i tcp:3100` returns nothing).
4. **Start this branch's server on 3100.** `PORT=3100 npx next start -p 3100` (or `PORT=3100 npm run start`) as a tracked background process; wait until `http://localhost:3100/en/` returns 200.
5. **Verify a unique hero string.** Fetch `http://localhost:3100/en/` and assert the branch's EN hero assertion string (Section 2.5) is in the DOM; fetch `/ar/` and assert the AR assertion (for D3 AR, assert the English hero string and set `ar_copy_is_english`). Abort the whole run on mismatch - this is the stale-server guard.
6. **Capture.** `python3 capture.py` -> writes `assets/screens/{en,ar}/*.png` and `capture-manifest.json`. Then `python3 validate.py` (must pass) and `python3 contact.py` (four sheets). Then `python3 refs.py` for the reference plates (this navigates to live external sites, not localhost; dismiss banners as specified). Inspect all four contact sheets.
7. **Render and build PDF.** Complete `document-data.json`, then run `python3 render_document.py` so `document.html` is regenerated from the capture manifest, reference manifest, current locale catalogues and direction data. Run `python3 build.py`.
8. **Verify.** `python3 measure.py`, `python3 verify.py`, and run every gate in Section 6. Inspect every `_verify/page-NN.png`. If any source changed, rebuild before re-checking.
9. **Stop the server before switching branch.** `lsof -ti tcp:3100 | xargs -r kill -9`; confirm the port is free.
10. **Commit and push to the matching remote branch.** Stage the src folder (screenshots now committed; adjust `.gitignore`), `document.html`, `house.css` additions, the new helper scripts, `capture-manifest.json`, `refs-manifest.json`, refs assets, and the built PDF at `docs/three-doors/Direction-{N}-...-Walkthrough.pdf`. Commit with the personal identity, push to `BR`, and confirm local and remote tips match (`git rev-parse HEAD` == `git rev-parse origin/BR`).

Only after a direction fully passes do you move to the next. Never run two branches' servers on 3100 at once.

### 7.2 Alternative: git worktrees (if parallelism is wanted)

`git worktree add ../muse-d2 direction/2-the-thesis` etc. Each worktree still shares port 3100, so only one server may run at a time regardless; the benefit is avoiding repeated checkouts. If used, run captures strictly one worktree at a time, killing 3100 between them, and set the personal git identity in each worktree. This adds disk and setup cost for little gain here; prefer sequential unless the executor explicitly needs it.

---

## 8. Acceptance checklist

An executor marks each box. No box may be checked on a subjective "looks good"; each maps to a defined inspection above. Complete the full list per direction.

Setup and branch hygiene:

- [ ] On the correct branch; `git config` identity is `alsubaieabdullah` / `abdullah.a.alsubaie@outlook.com`; `gh` active account matches.
- [ ] `npm run build` passes on Node 24.
- [ ] Port 3100 confirmed free before start; server started on 3100; `/en/` returns 200.
- [ ] Branch EN and AR hero assertion strings verified in the live DOM (D3 AR: English hero asserted and `ar_copy_is_english` recorded).

Capture and validation:

- [ ] `capture.py` produced every expected cell for the direction's full section x locale x device matrix, plus declared split parts.
- [ ] `capture-manifest.json` present, complete, and consumed by `document.html` (no hand-typed `src`).
- [ ] `validate.py` passes all ten checks (presence, completeness, dimensions, hero string, locale/URL, bbox, section text included, next section excluded, no sticky nav on non-Hero, D3 AR-English disclosure).
- [ ] Four contact sheets (EN desktop, EN mobile, AR desktop, AR mobile) generated and every image individually confirmed: intended heading visible, next heading absent, nav not covering heading, Arabic shaped/RTL (or D3 English-in-catalogue disclosed).
- [ ] No Doors image shows the Manifesto title; no Hero image shows footer/CTA/next section; Footer captured only in its own group.

Reference evidence:

- [ ] exactly 6 reference figures captured live, at least one Saudi/GCC and one global.
- [ ] Each figure has company+page, exact URL, capture date (today), visible pattern, what Muse adapted, influence type, and a `Direct input` / `Independent validation` label consistent with the Section 4.1 grep.
- [ ] ATHR and Tamkeen excluded per the feasibility gate; outcome numbers labeled as source marketing claims.

PDF architecture and QA:

- [ ] Page sequence matches Section 1 for the direction: Cover, then per-section EN visual / AR visual / content in site order, then Objections, Open decisions, Structure map, Source map, Reference plates.
- [ ] Cover carries direction name, one-sentence explanation, `Prepared by Abdullah Alsubaie`, `MUSE-DIR-0N`, `Status: Review`, `Revision 3`.
- [ ] HTML page count equals PDF page count.
- [ ] `measure.py`: every page within bounds, none clipped, none under half full (except cover).
- [ ] `verify.py`: expected page count, zero banned punctuation, no fallback fonts, all pages rendered.
- [ ] No unexpected blank pages (non-white pixel ratio check on every render).
- [ ] Every page's screenshot filenames resolve in the manifest and sit on the right page; section order correct; footer after CTA only.
- [ ] Every `_verify/page-NN.png` inspected individually; figure and Arabic pages re-rendered at higher resolution and inspected for shaping/RTL. Arabic wording checked against DOM, locale JSON and extracted PDF text, not vision alone.
- [ ] D3 only: English-in-catalogue sections are disclosed, and quantitative proof claims are labeled as current site claims pending substantiation or softening.
- [ ] All reference URLs present as clickable links and resolve.
- [ ] Rebuilt after the last source change; PDF is current.

Delivery:

- [ ] Server stopped and port 3100 free.
- [ ] Src folder, `document.html`, `house.css`, helper scripts, manifests, refs assets, and the built PDF committed on the correct branch with the personal identity.
- [ ] Pushed to the matching remote branch; local and remote tips match.
- [ ] Final PDF copied to `/Users/a/Downloads/` and sent in chat as media (per the rebuild brief's delivery step).

Repeat the entire checklist for Direction 1, Direction 2, and Direction 3 independently.

---

## Appendix A: What changed from the current broken build (for the executor's orientation, not for the reader-facing PDF)

- `shoot.py` produced only four viewport shots per locale (`desktop-top`, `desktop-bottom`, `mobile-top`, `doors`) using a broad text scan and, on D3, a stale anchor (`Three ways we work`) that silently screenshotted the wrong position. Replaced by `capture.py` + `sections.json` with exact roots, hero assertion, split logic, and a manifest.
- Footer was paired with the Hero via a reused `home-desktop-bottom.png`. Eliminated: footer is its own last visual group; no `desktop-bottom` concept remains.
- Doors bled into Manifesto because the capture was a 900px viewport from the heading. Eliminated: element/clip capture bounded to the section, validated by the next-section-excluded check.
- Missing mobile section coverage, missing Manifesto/Outcomes/Ticker/FAQ/CTA/Footer visuals. Eliminated by the complete matrix and completeness check.
- Reference pages named sites without showing them. Replaced by live reference plates with URLs, dates, patterns, and honest `Direct input` vs `Independent validation` labels.

## Appendix B: Open decisions to record in each PDF (with recommendations)

- **D3-AR (Direction 3):** Arabic route renders English copy for Hero, Proof Wall, Final CTA, Footer, Nav. Recommendation: localize these keys before external circulation; until then ship with the honest RTL/English-catalogue label. Do not fabricate Arabic.
- **D3-PROOF (Direction 3):** quantitative proof claims such as `94% accuracy`, `40% retention lift`, and PIF-level references are not independently substantiated by the current source pack. Recommendation: add evidence pages or soften/anonymize the claims before external circulation. The walkthrough must label them as current website claims, not verified results.
- **Split legibility vs page count (all directions):** where a mobile split risks an unreadable strip, add a `(continued)` page. Recommendation: always favor legibility over a shorter deck; the brief explicitly permits more pages.
- **Reference outcome numbers:** Retool/Mercury/Salla figures are marketing claims. Recommendation: caption them as presentation patterns, never as verified results.
- **Committed screenshots:** `assets/screens` is currently gitignored. Recommendation: commit the rebuild's screenshots so each PDF is reproducible from the repo; note the `.gitignore` change explicitly in the commit.
