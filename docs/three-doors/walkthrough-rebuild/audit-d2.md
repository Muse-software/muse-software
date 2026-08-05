# Direction 2 homepage screenshot audit

## Scope and source of truth

Audited with `git show direction/2-the-thesis:<path>` only. I did not check out or modify the branch. The homepage composition comes from `app/[locale]/page.tsx`, `components/sections/HomeSections.tsx`, `app/[locale]/layout.tsx`, the rendered section components, and `messages/en.json` / `messages/ar.json` on `direction/2-the-thesis`. The walkthrough audit covers that branch's `docs/three-doors/direction-2-walkthrough-src/document.html` and `shoot.py`.

Height calls below are static layout estimates from the responsive classes and copy lengths, not browser measurements. “Exceeds” means the complete section is likely taller than a 1440×900 desktop or 390×844 mobile viewport.

## Exact rendered homepage order

`HomeSections` explicitly renders these nine homepage blocks, followed by the global footer from the locale layout:

1. Hero (`Hero`)
2. Problem (`TheProblem`)
3. Standard (`TheStandard`)
4. Doors (`ThreeDoors`)
5. Manifesto (`Manifesto`, including the embedded `PressureStatement` and its CTA)
6. Outcomes band (`OutcomesBand`)
7. Ticker (`Ticker`; a `div`, not a `section`)
8. FAQ (`FAQ`)
9. Final CTA (`CTA`)
10. Footer (`Footer`; outside `HomeSections`, after `</main>`)

This is **nine homepage blocks plus the footer**, not nine total visual regions. The footer must be documented separately. Components such as `WhoWeBuildFor`, `Approach`, `BeliefSlider`, and `CareersTeaser` exist on the branch but are **not** on this homepage.

## Selector, locale anchor, height, and capture recommendation

Use text locators scoped to exact elements, then climb to the indicated root. Prefer these over generic searches through `h1,h2,h3,p,span,div`; generic `textContent.startsWith()` can select an ancestor container instead of the intended heading.

| # | Block / component | Stable root or locator strategy | Exact EN anchor | Exact AR anchor | Likely > 900 desktop? | Likely > 844 mobile? | Recommended capture |
|---:|---|---|---|---|---|---|---|
| 1 | Hero / `Hero.tsx` | `main > div > section:nth-of-type(1)`; preferably `getByRole('heading', {level:1, name:/.../}).locator('xpath=ancestor::section[1]')` | H1 combines `Shipping is easy now.` + `Shipping well isn't.` | H1 combines `الإطلاق سهل.` + `الإتقان مو سهل.` | No: `h-[70vh]` = 630px at 900px (minimum 544px) | No: fixed by `h-[70vh]` but clamped to `min-h-[34rem]` = 544px | **Element screenshot.** Captures the whole designed hero and avoids leaking the Problem section below it. Wait for fonts and PixelBlast/WebGL stabilization. |
| 2 | Problem / `TheProblem.tsx` | heading locator → nearest `section`; structural fallback `main > div > section:nth-of-type(2)` | H2 `Everyone has a strategy. Almost nobody ships.`; eyebrow `The problem we see` | H2 `الكل عنده استراتيجية. قليل اللي ينفذ.`; eyebrow `المشكلة اللي نشوفها` | No, likely ~600–700px: cards are a 3-column row | **Yes**, likely ~1,150–1,400px: three cards stack | Desktop: **element screenshot**. Mobile: **split capture** (heading + cards 1–2, then remaining card with overlap) rather than scaling a very tall element into the PDF. |
| 3 | Standard / `TheStandard.tsx` | heading locator → nearest `section`; fallback `main > div > section:nth-of-type(3)` | H2 `Muse is the quality bar. The other choice.`; eyebrow `The standard we hold` | H2 `Muse هو معيار الجودة. الخيار الثاني.`; eyebrow `المعيار اللي نلتزم فيه` | Borderline/**likely yes**: outer `md:py-32` plus inner `md:py-24`, three paragraphs, and pillar row put the full root near or over 900px | **Yes**, comfortably: paragraphs and three stacked pillars plus nested vertical padding | **Split capture** in both sizes for consistency: (A) eyebrow/heading + three paragraphs, (B) pillars, with overlap and section background retained. A bounded first viewport alone will omit pillars. |
| 4 | Doors / `ThreeDoors.tsx` | heading locator → nearest `section`; fallback `main > div > section:nth-of-type(4)` | H2 `Pick the door that matches you` | H2 `اختر الباب اللي يناسبك` | No, likely ~650–800px: three cards in one row | **Yes**, likely ~1,300–1,600px: heading plus three stacked cards | Desktop: **element screenshot**. Mobile: **split capture** (heading + first door, then doors 2–3, with overlap). |
| 5 | Manifesto / `Manifesto.tsx` | heading locator → nearest `section`; fallback `main > div > section:nth-of-type(5)` | H2 `The next decade of software gets decided in the next two years.` | H2 `عصر المنتجات الرقمية يتحدّد خلال السنتين الجاية.` | Borderline, likely ~700–900px | **Yes**, likely ~950–1,200px, especially Arabic wrapping | Desktop: **element screenshot** if measured height ≤900, otherwise two bounded views. Mobile: **split capture** (heading/argument, then PressureStatement + `Get started` / `ابدأ الآن`). Do not split the embedded PressureStatement away without overlap/context. |
| 6 | Outcomes band / `OutcomesBand.tsx` | exact paragraph text → nearest `section`; fallback `main > div > section:nth-of-type(6)` | Rendered P `We deliver outcomes, not just tools.` | Rendered P `نوصّل نتيجة فعلية، مو مجرد أدوات.` | No (~250–350px) | No (~250–400px) | **Bounded viewport** centered on the whole band, with controlled context margins. Element screenshot is also safe, but a bounded viewport preserves the page wash surrounding this short statement. |
| 7 | Ticker / `Ticker.tsx` | `.ticker-wrapper` (root visual), or `.ticker-wrapper`'s parent `div.overflow-x-clip`; do not look for a `section` | Repeated `Nothing ships that we wouldn't use ourselves` | Repeated `لا نطلق ما لا نستخدمه نحن` | No | No | **Bounded viewport** around `.ticker-wrapper`/its clipping parent. Capture after animation is disabled or paused so all locales/widths use a deterministic phase. |
| 8 | FAQ / `FAQ.tsx` | heading locator → nearest `section`; fallback `main > div > section:nth-of-type(7)` | H2 `Questions? We have answers.` | H2 `أكيد عندك أسئلة.` | **Likely yes/borderline**: five rows, first answer open by default, and `md:py-32` | **Yes**, Arabic answers make this particularly tall | **Split capture**. Establish deterministic accordion state first (recommended: first item open, as initial render), then capture top/first items and lower items with overlap. If the documentation needs every answer, capture one controlled open item per sub-shot rather than relying on the initial state alone. |
| 9 | Final CTA / `CTA.tsx` | heading locator → nearest `section`; fallback `main > div > section:nth-of-type(8)` | H2 `Tell us what you're trying to build.` | H2 `قل لنا وش تبني.` | No (~500–650px) | No/borderline (~600–800px) | **Element screenshot** of the outer `section` (not only the rounded inner panel), preserving the intended inset black margin. Wait for DitherField; do not depend on pointer-only DitherCursor content. |
| 10 | Footer / `Footer.tsx` | `body > footer` or simply `footer` (one global footer) | Unique large P `Reach out to us`; supporting blurb begins `Tell us what you're building.` | Unique large P `تواصل معنا`; supporting blurb begins `قل لنا وش تبني` | Borderline/**likely near or over 900px** depending wrapping | **Yes**, likely well over 1,200px because both desktop grids collapse | Desktop: measured **element screenshot** only if ≤900; otherwise **split capture** at the horizontal rule (top logo/blurb/nav; bottom reach-out/contact/legal/social). Mobile: **split capture** using the same semantic boundary. Never represent the footer with a `window.scrollTo(document.body.scrollHeight)` viewport alone. |

### Selector implementation notes

- Playwright's role-based heading match plus `locator('xpath=ancestor::section[1]')` is robust for every true section with a heading.
- Hero's accessible H1 name is the concatenation of its two spans; exact whitespace can vary, so match both fragments with a locale-specific regex.
- Outcomes uses a `p`, not a heading. Ticker uses no section and repeats its text 16 times, so `.ticker-wrapper` is the only clean root selector.
- The structural `nth-of-type` selectors are valid for the audited branch, but are fallbacks: Ticker is a `div`, so FAQ is section 7 and CTA section 8 despite being homepage blocks 8 and 9.
- Footer is outside `main` and outside the `HomeSections` wrapper.
- Force reduced motion (or inject animation-disabling CSS) before capture. Several sections begin at opacity/translation states and animate only when intersecting; a raw element screenshot without scrolling it into view can otherwise record an unrevealed state.

## Current `shoot.py` audit

### What it actually produces

`SHOTS` contains exactly 10 records:

- EN: `home-desktop-top.png`, `home-desktop-bottom.png`, `home-mobile-top.png`, `home-problem.png`, `home-standard.png`
- AR: the same five names

Only `mobile-top` uses the 390×844 mobile viewport. Therefore **Problem and Standard are desktop-only**, despite their filenames not saying desktop. Every other non-top section has no dedicated capture.

### Missing screenshots

Against the required per-section sequence (EN desktop, EN mobile, AR desktop, AR mobile), the complete matrix is 10 visual blocks × 4 = **40 captures**. Current coverage is only:

- Hero: four nominal top screenshots (EN/AR desktop/mobile), though they are viewport captures rather than exact Hero captures.
- Problem: EN desktop and AR desktop only.
- Standard: EN desktop and AR desktop only.
- Footer: two generic locale desktop-bottom viewport files, but these are not reliable complete-footer captures and are reused elsewhere.

Missing or not correctly isolated:

- Hero: no exact element-isolated capture in any locale/width (all four `*-top` files are viewport shots and can include content after Hero because Hero is 630px on desktop and 544px on mobile).
- Problem: EN mobile, AR mobile.
- Standard: EN mobile, AR mobile; desktop captures may truncate because capture is only a 900px viewport aligned to a text match.
- Doors: all four.
- Manifesto: all four.
- Outcomes band: all four.
- Ticker: all four.
- FAQ: all four.
- Final CTA: all four.
- Footer: all four as dedicated complete/split captures; there are no mobile footer captures and the two desktop-bottom files are only last-page viewports.

### Wrong or fragile behavior

1. **Text search can pick the wrong DOM node.** The script scans `h1,h2,h3,p,span,div` and picks the first element whose entire `textContent` starts with the target. A wrapper `div` can match before the intended eyebrow/heading. Use exact role/text locators scoped to a known root.
2. **Problem and Standard capture only the viewport, not the section.** `scrollIntoView({block:'start'})` followed by `page.screenshot()` records 1440×900. It neither clips to the section nor verifies the section fits. Standard is likely taller than the viewport.
3. **Top is not Hero-only.** At 1440×900 the Hero is `70vh` (630px); at 390×844 its `min-h-[34rem]` is 544px. A full viewport top screenshot therefore includes the beginning of Problem. That is unsuitable for a section-by-section sequence.
4. **Bottom is not CTA + footer (and certainly not FAQ + CTA + footer).** `window.scrollTo(0, document.body.scrollHeight)` aligns the bottom of the document with the bottom of one 900px viewport. The footer itself is likely near/over 900px on desktop, so the shot can show only a footer slice. It cannot reliably prove the final CTA or FAQ is visible.
5. **No element bounds or height measurement.** There is no `boundingBox()`/`scrollHeight` check, no splitting strategy, and no assertion that the intended anchor was found.
6. **No deterministic animation policy.** The 900ms delay may let Motion reveals finish, but ticker/WebGL/dither remain time-dependent. Reduced motion, CSS animation pausing, and readiness assertions are needed.
7. **No screenshot inventory validation.** The code does not assert all expected locale × viewport × section keys were emitted.
8. **Ambiguous filenames.** `home-problem.png` and `home-standard.png` omit width/mode; future mobile versions would collide unless renamed.

## Current `document.html` audit

### Duplicated screenshot files

The same two files are each embedded twice:

- `assets/screens/en/home-desktop-bottom.png`
  - “The landing · English” (caption says Final CTA and footer)
  - “Below the fold” (caption says FAQ, final CTA and footer)
- `assets/screens/ar/home-desktop-bottom.png`
  - “The landing · العربية”
  - “Below the fold”

These are not alternate views; they are exact file reuse. The latter captions also claim a broader region than one bottom-aligned 900px viewport can reliably contain.

### Missing visuals and sequencing problems

- The document visually shows only top viewport, Problem, Standard, and a reused bottom viewport.
- Doors, Manifesto, Outcomes, Ticker, FAQ, final CTA, and complete footer have no dedicated visual in either language.
- Problem and Standard have no mobile visuals.
- The document groups whole-language landing pages first, then separate EN and AR section pages. It does **not** follow the requested repeating order: **EN desktop → EN mobile → AR desktop → AR mobile → explainer, then next section**.
- “Below the fold” replaces seven distinct designed regions with a bilingual copy table and two reused bottom screenshots. This hides layout, responsive behavior, RTL behavior, and all section boundaries.
- The opening says “Nine sections, top to bottom” and lists nine homepage blocks, but visually folds the global footer into “Final CTA”/bottom screenshots. For the rebuild, final CTA and footer must be separate entries.

### Stale or wrong descriptive claims versus current branch

- Standard is described as “on a maroon band” and “the site's one device…” in multiple places. The audited `TheStandard.tsx` **does** currently have `bg-[#4C0014]`, so this is correct for Standard. However, the document's broader language around other shared sections should not imply Manifesto is maroon: current `Manifesto.tsx` explicitly has no maroon background.
- The “Desktop bottom” and “Below the fold” captions overclaim visible content, as described above.
- The screenshot legend itself encodes the incomplete old scheme (“desktop top / bottom”, “mobile top”, “Problem / Standard”) and should be replaced by a per-section capture legend.

## Proposed ordered screenshot matrix

Use a stable filename schema such as `home-{NN}-{section}-{locale}-{desktop|mobile}-{part}.png`. For each numbered block, place images and prose in this exact order: **EN desktop, EN mobile, AR desktop, AR mobile, then non-screenshot explanation**. A split capture may produce `a`/`b` (or more) files inside one matrix cell.

| # | Section | EN desktop | EN mobile | AR desktop | AR mobile | Expected part strategy |
|---:|---|---|---|---|---|---|
| 01 | Hero | `home-01-hero-en-desktop.png` | `home-01-hero-en-mobile.png` | `home-01-hero-ar-desktop.png` | `home-01-hero-ar-mobile.png` | One element capture each |
| 02 | Problem | `home-02-problem-en-desktop.png` | `home-02-problem-en-mobile-a/b.png` | `home-02-problem-ar-desktop.png` | `home-02-problem-ar-mobile-a/b.png` | Desktop one; mobile split |
| 03 | Standard | `home-03-standard-en-desktop-a/b.png` | `home-03-standard-en-mobile-a/b.png` | `home-03-standard-ar-desktop-a/b.png` | `home-03-standard-ar-mobile-a/b.png` | Split; allow a third mobile part if measured bounds require it |
| 04 | Doors | `home-04-doors-en-desktop.png` | `home-04-doors-en-mobile-a/b.png` | `home-04-doors-ar-desktop.png` | `home-04-doors-ar-mobile-a/b.png` | Desktop one; mobile split |
| 05 | Manifesto | `home-05-manifesto-en-desktop.png` (or `a/b`) | `home-05-manifesto-en-mobile-a/b.png` | `home-05-manifesto-ar-desktop.png` (or `a/b`) | `home-05-manifesto-ar-mobile-a/b.png` | Measure desktop; mobile split |
| 06 | Outcomes | `home-06-outcomes-en-desktop.png` | `home-06-outcomes-en-mobile.png` | `home-06-outcomes-ar-desktop.png` | `home-06-outcomes-ar-mobile.png` | One bounded capture each |
| 07 | Ticker | `home-07-ticker-en-desktop.png` | `home-07-ticker-en-mobile.png` | `home-07-ticker-ar-desktop.png` | `home-07-ticker-ar-mobile.png` | One deterministic bounded capture each |
| 08 | FAQ | `home-08-faq-en-desktop-a/b.png` | `home-08-faq-en-mobile-a/b.png` | `home-08-faq-ar-desktop-a/b.png` | `home-08-faq-ar-mobile-a/b.png` | Split; add parts if documenting every open answer |
| 09 | Final CTA | `home-09-cta-en-desktop.png` | `home-09-cta-en-mobile.png` | `home-09-cta-ar-desktop.png` | `home-09-cta-ar-mobile.png` | One outer-section element capture each |
| 10 | Footer | `home-10-footer-en-desktop-a/b.png` | `home-10-footer-en-mobile-a/b.png` | `home-10-footer-ar-desktop-a/b.png` | `home-10-footer-ar-mobile-a/b.png` | Split at rule; mobile may need 3 parts after measuring |

## Capture implementation requirements for the rebuild

1. Build an explicit section registry containing locale anchors, root strategy, and capture mode; do not overload `kind` strings.
2. Create a fresh page at the correct viewport for **every** matrix cell; filename includes locale and width.
3. Before capture: wait for `networkidle`, `document.fonts.ready`, images, and any WebGL/dither readiness that can be asserted.
4. Emulate reduced motion and inject deterministic screenshot CSS (disable transitions/animations; pause ticker in a known transform state). Scroll the root into view before element capture so Motion content is rendered.
5. Measure the root's bounding box. If it exceeds the viewport-safe height, use semantic split anchors and overlapping bounded clips; never silently crop.
6. For bounded/split captures, use fixed clips relative to the section/root and include a consistent overlap so readers can reconstruct continuity.
7. Assert exactly one intended root (except repeated ticker text, which must use the class selector), non-zero dimensions, and expected output files.
8. Keep FAQ state controlled and documented. Capture the same state in EN/AR and desktop/mobile.
9. Treat final CTA and footer as separate roots and separate PDF subsections.
10. After each four-image locale/viewport set, place the explainer/copy/source notes, then repeat for the next section.
