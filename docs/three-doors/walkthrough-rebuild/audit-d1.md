# Direction 1 homepage screenshot audit

Audited against `direction/1-the-studio` with `git show` only. No branch checkout or source modification was used.

## 1. Actual homepage structure

`app/[locale]/page.tsx` renders `HomeSections`; `app/[locale]/layout.tsx` renders the global footer after `main`. The exact visible order is:

1. Hero (`Hero`)
2. Three doors (`ThreeDoors`)
3. Manifesto (`Manifesto`, including the embedded `PressureStatement` and its CTA)
4. Outcomes band (`OutcomesBand`)
5. Ticker (`Ticker`; a `div`, not a `section`)
6. FAQ (`FAQ`)
7. Final CTA (`CTA`)
8. Footer (`Footer`; outside `main`)

The `HomeSections` wrapper also contains `PageDither`, `CardDither`, and JSON-LD, but these are not standalone content sections.

### Exact roots / reliable locators / expected height

The site currently has no section IDs or `data-*` capture hooks. The CSS selectors below match the present DOM; role/text locators are safer for Playwright where available. `section:nth-of-type()` counts only section siblings, so the ticker `div` does not change the section numbering.

| Order | Block | Current root selector | Unique EN locator | Unique AR locator | Likely over 1440×900? | Likely over 390×844? |
|---:|---|---|---|---|---|---|
| 1 | Hero | `main#main-content > div > section:nth-of-type(1)` | `h1` containing `We build our own software.` | `h1` containing `نبني تطبيقاتنا الخاصة.` | No: `md:h-screen` makes it exactly 900px at this viewport | No: `h-[70vh]` is about 591px, above its 544px minimum |
| 2 | Three doors | `main#main-content > div > section:nth-of-type(2)` | `h2`: `Pick the door that matches you` | `h2`: `اختر الباب اللي يناسبك` | Probably no (three cards are one row), though close enough to measure | **Yes**: three cards stack, plus 160px vertical padding and heading spacing |
| 3 | Manifesto | `main#main-content > div > section:nth-of-type(3)` | `h2`: `The next decade of software gets decided in the next two years.` | `h2`: `عصر المنتجات الرقمية يتحدّد خلال السنتين الجاية.` | Borderline/likely yes once heading, three paragraphs, pressure statement, CTA, and 256px section padding are included; AR is taller | **Yes**, both locales; AR substantially so |
| 4 | Outcomes | `main#main-content > div > section:nth-of-type(4)` | `p` containing `We deliver outcomes, not just tools.` | `p` containing `نوصّل نتيجة فعلية، مو مجرد أدوات.` | No | No |
| 5 | Ticker | `main#main-content > div > div.overflow-x-clip` (or `.ticker-wrapper`) | `.ticker-item` containing `Nothing ships that we wouldn't use ourselves` | `.ticker-item` containing `لا نطلق ما لا نستخدمه نحن` | No (roughly one text line plus 32px padding) | No |
| 6 | FAQ | `main#main-content > div > section:nth-of-type(5)` | `h2`: `Questions? We have answers.` | `h2`: `أكيد عندك أسئلة.` | EN is borderline; AR is likely **yes** because item 1 is open by default and its answer is much longer | EN borderline/likely yes; AR **yes** |
| 7 | Final CTA | `main#main-content > div > section:nth-of-type(6)` | `h2`: `Tell us what you're trying to build.` | `h2`: `قل لنا وش تبني.` | No | Probably no, but measure after fonts load because outer and panel padding consume substantial height |
| 8 | Footer | `body > footer` | `footer p` exact text `Reach out to us` (or `footer` root) | `footer p` exact text `تواصل معنا` (or `footer` root) | Probably no / borderline | **Yes**: the two desktop grids collapse and stack |

For long-lived automation, add stable hooks in a later implementation (`data-walkthrough="hero"`, `doors`, `manifesto`, `outcomes`, `ticker`, `faq`, `final-cta`, `footer`). Until then, resolve each heading/text locator and climb to the nearest `section`; use the explicit footer root for the footer. Do not use broad “first element whose text starts with…” scans.

## 2. Current walkthrough source audit

### What `shoot.py` actually creates

For each locale it creates only four viewport screenshots:

- `home-desktop-top.png` — 1440×900 at page top.
- `home-desktop-bottom.png` — 1440×900 after scrolling to `document.body.scrollHeight`.
- `home-mobile-top.png` — 390×844 at page top.
- `home-doors.png` — **1440×900**, after a broad text search and `scrollIntoView({block:'start'})`.

Important implementation mismatches:

- The docstring says “a full-page mobile shot,” but `page.screenshot()` never passes `full_page=True`; it is only the first mobile viewport.
- There are no mobile doors captures. `kind == "doors"` takes the desktop branch.
- There are no mobile bottom captures at all.
- `desktop-bottom` is not a section capture. It is merely the last viewport and can mix the final CTA with the footer depending on their rendered heights.
- Doors capture finds text by scanning `h1,h2,h3,p,span,div`, then starts the viewport at the match. Because the desktop doors section is likely shorter than 900px, the viewport continues into the manifesto and can include its title.
- No animation stabilization is specified beyond waiting. Reduced motion is not emulated, ticker animation is not frozen, FAQ state is not deliberately normalized, and dynamic dither output can vary.

### Wrong, missing, and duplicated images in `document.html`

#### Wrong grouping / framing

1. **Hero/landing pages mix the footer into the hero story.** Pages “The landing · English” and “The landing · العربية” show the hero screenshots, then place `home-desktop-bottom.png` beside the mobile hero and caption it as final CTA + footer. This is not a hero capture and violates section-first documentation. The rebuilt Hero entry must contain hero-only EN desktop/mobile and AR desktop/mobile; **it must not contain the footer**.
2. **Doors are desktop-only and bleed into the next section.** `home-doors.png` is a 1440×900 viewport, not a bounded doors element shot. Starting at the doors heading leaves spare viewport below the cards, so the manifesto heading can appear. The rebuilt doors capture must end at the doors section boundary; **it must not include the manifesto title**.
3. **Bottom shots conflate independent blocks.** FAQ, final CTA, and footer are distinct DOM blocks but are described/shown as one “last screen.” They need separate entries and captures.
4. The “Below the fold” page describes Manifesto, Outcomes, Ticker, FAQ, final CTA, and footer mostly through text/table while illustrating only the same bottom viewport. The image does not document the listed middle sections.

#### Exact duplicate uses

- `assets/screens/en/home-desktop-bottom.png` appears twice: once on the English landing page and again on “Below the fold.”
- `assets/screens/ar/home-desktop-bottom.png` appears twice: once on the Arabic landing page and again on “Below the fold.”
- These are literal repeated file references, not alternate crops.

#### Missing screenshot coverage

For **both EN and AR**, current source lacks:

- Mobile Three doors.
- Desktop and mobile Manifesto.
- Desktop and mobile Outcomes band.
- Desktop and mobile Ticker.
- Dedicated desktop and mobile FAQ.
- Dedicated desktop and mobile final CTA.
- Dedicated desktop and mobile footer.

It also lacks section-bounded Hero captures as a formal pair set: the existing top screenshots are viewport captures. The desktop one corresponds to the hero because the hero is `100vh`; the mobile one includes only a roughly 70vh hero and may expose the beginning of doors in the remaining viewport unless the image/PDF crop hides it. A hero element screenshot is the robust replacement.

No screenshot appears at all on the current FAQ page (“The objections, answered”); FAQ is represented as prose/table content only.

## 3. Recommended capture strategy

General setup for every shot:

- Load locale route, wait for `networkidle` and `document.fonts.ready`.
- Emulate reduced motion and/or inject a capture stylesheet that disables transitions/animations (especially ticker and reveal animations).
- Scroll the target into view before capture so `whileInView`/reveal content resolves; then wait a short deterministic settle period.
- Normalize FAQ state explicitly (recommended: first item open, matching current initial state) and use the same state in all four captures.
- Measure `locator.bounding_box().height` after fonts settle and choose/split according to actual height rather than assumptions.
- Prefer locator screenshots because they clip exactly to section boundaries and preserve the page’s own responsive layout. Use bounded viewport only for the animated ticker when an element screenshot is visually unstable.

Capture modes:

| Block | Recommended mode | Reason / boundary rule |
|---|---|---|
| Hero | **Element screenshot** | Exact `<section>` boundary. Prevents mobile from showing doors and guarantees **no footer**. Do not use page-top viewport as the canonical asset. |
| Three doors | Desktop: **element screenshot**. Mobile: **split capture** if the measured element is too tall for a readable PDF placement (heading + door 1 / doors 2–3), otherwise element screenshot | Exact section clipping guarantees **no manifesto title**. Never capture a free 900px viewport from the heading. |
| Manifesto | **Split capture** on mobile and likely both locales on desktop if measured height > viewport: (A) heading + paragraphs, (B) pressure statement + Manifesto CTA. | Keeps type readable and preserves the complete argument without bleeding into Outcomes. Use clips bounded to the Manifesto root. |
| Outcomes band | **Element screenshot** | Short, self-contained section. |
| Ticker | **Bounded viewport/clip** around `.ticker-wrapper`, with animation frozen | The transformed wrapper paints slightly outside its nominal box (`rotate` + `scale(1.02)`); a parent-bounded clip captures the intended visual without neighboring sections. |
| FAQ | EN desktop may use **element screenshot** if it fits; otherwise **split capture**. Mobile and AR: **split capture** (heading + first items / remaining items), keeping first-item-open state consistent. | AR’s open answer is long. Splits must be bounded inside FAQ and must not include CTA. |
| Final CTA | **Element screenshot** | Captures only the closing panel section and excludes footer. |
| Footer | Desktop: **element screenshot**. Mobile: **split capture** (upper logo/blurb/nav area / lower reach-out/contact/legal area). | Footer is outside `main` and stacks tall on mobile; it must be documented separately from final CTA and Hero. |

“Split capture” should be implemented with clips computed from child bounding boxes and clamped to the parent section’s top/bottom, not by unconstrained viewport scrolling. Include a small intentional overlap (for example 24–40 CSS px) only within the same section so the continuation is visually understandable.

## 4. Proposed ordered screenshot matrix

The document should repeat this sequence for **each block**: EN desktop → EN mobile → AR desktop → AR mobile → non-screenshot content/explainer. Split parts remain inside their locale/device slot (e.g. “EN mobile A/B”, then “EN mobile B/B”).

| Seq. | Block | EN desktop | EN mobile | AR desktop | AR mobile | Then |
|---:|---|---|---|---|---|---|
| 1 | Hero | element | element | element | element | Hero thesis/copy explainer. **No footer and no doors in any Hero image.** |
| 2 | Three doors | element | element or split | element | split likely | Door model/copy explainer. **No manifesto title in any Doors image.** |
| 3 | Manifesto | element or split after measurement | split | split likely | split | Why-now argument + embedded pressure statement explainer |
| 4 | Outcomes band | element | element | element | element | Delivery-standard explainer |
| 5 | Ticker | bounded clip | bounded clip | bounded clip | bounded clip | Motion/message explainer |
| 6 | FAQ | element or split | split | split | split | Objection-handling/copy explainer |
| 7 | Final CTA | element | element | element | element | Conversion close explainer. Exclude footer. |
| 8 | Footer | element | split | element | split | Navigation/contact/legal explainer |

This yields 32 base locale/device slots (more files only where a slot is split) and replaces the current eight generic viewport shots with complete, section-bounded coverage.
