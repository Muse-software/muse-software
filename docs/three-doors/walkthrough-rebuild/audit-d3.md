# Direction 3 homepage screenshot audit

Audited from `direction/3-the-proof` with `git show` only. The checked-out branch was not changed. Source of truth: `app/[locale]/page.tsx`, `app/[locale]/layout.tsx`, `components/sections/HomeSections.tsx`, the rendered section components, `components/Footer.tsx`, `components/Ticker.tsx`, `messages/en.json`, `messages/ar.json`, and the Direction 3 walkthrough `document.html` / `shoot.py`.

## Executive findings

- The homepage body has **eight blocks**, but not eight `<section>` roots: Hero, Proof Wall, Doors, Manifesto, Outcomes, Ticker (a `<div>`, not a section), FAQ, Final CTA. The shared layout then renders the **footer separately after `<main>`**. For a screenshot-first walkthrough, footer must be its own ninth visual block.
- The exact order is: **Hero → Proof Wall → Three Doors → Manifesto (including Pressure Statement) → Outcomes Band → Ticker → FAQ → Final CTA → Footer**.
- The walkthrough only embeds hero top views, proof-wall EN desktop, and bottom/footer views. Doors and all later individual sections are absent. `home-desktop-bottom.png` is embedded twice per locale (landing page and “Below the fold”), so four HTML image placements reuse only two files.
- `shoot.py` attempts an EN doors shot with the stale text **“Three ways we work”**. The live heading is **“Pick the door that matches you”**. No match is found and the script silently screenshots the current position; the existing `en/home-doors.png` is therefore another hero image, not Doors.
- The capture script creates no AR proof-wall or AR doors shot, no mobile proof/doors shots, and no section-specific shots after Doors.
- The existing “bottom” screenshots are footer-at-page-bottom viewport captures, not section captures. They omit the Final CTA and FAQ despite captions claiming otherwise.
- **Arabic is not fully localized on this branch.** `messages/ar.json` contains English values for `Home.hero`, every `Home.proofWall` field/card, `CTA`, `Footer`, `Nav`, and several shared labels. `i18n/request.ts` loads only the selected locale catalogue; there is no runtime merge/fallback to English. Thus the honest description is “English strings intentionally/currently stored in the AR catalogue,” not a technical fallback. AR layout/RTL is real, but the proof-wall content is English. Existing AR hero and footer screenshots visibly show English copy too. The walkthrough’s claims that AR hero/closing are translated are wrong.

## Exact DOM order and capture anchors

All body sections are direct children of the HomeSections wrapper: `main#main-content > div.relative.isolate > ...`. Since classes are styling contracts and may change, headings/text are the practical current anchors; for a rebuild, add stable `data-walkthrough-section` attributes in the capture runtime or app markup if permitted. In the current source, CSS positional roots are deterministic.

| # | Block/component | Current root selector | EN unique anchor | AR unique anchor | Likely taller than viewport? | Recommended capture |
|---|---|---|---|---|---|---|
| 1 | Hero (`Hero`) | `main#main-content > div > section:nth-of-type(1)` | `h1` containing `We don't pitch.` + `We ship.` | Same English text in AR catalogue | Desktop: no (`h-screen`); mobile: no (`h-[70vh]`, min 34rem) | **Viewport shot at page top**, 1440×900 / 390×844. Wait for fonts + WebGL; reduced motion is preferable, but allow PixelBlast to paint. Do not use element full-page because the fixed header/context is part of the hero composition. |
| 2 | Proof Wall (`ProofWall`) | `main#main-content > div > section:nth-of-type(2)` | `h2`: `What we've shipped. What we're building.`; eyebrow `The work speaks` | Same English heading/eyebrow and all-English cards under RTL | Desktop: probably yes at 900px (large vertical padding + heading + 2 card rows); mobile: definitely yes (6 stacked cards) | **Full-element screenshot** for each viewport, not one viewport slice. Scroll root into view first to trigger Motion, wait, then `locator.screenshot()`. If PDF height is excessive, split deterministically into heading + cards 1–3 and cards 4–6, but never crop a card. Label AR honestly as RTL layout with English proof copy. |
| 3 | Three Doors (`ThreeDoors`) | `main#main-content > div > section:nth-of-type(3)` | `h2`: `Pick the door that matches you` | `h2`: `اختر الباب اللي يناسبك` | Desktop: likely fits 900px; mobile: definitely exceeds 844px with 3 stacked cards | Desktop **element screenshot**. Mobile **full-element screenshot** (or heading + one continuous 3-card plate). Use heading locator, then `locator('section')` via ancestor; never broad text scanning. |
| 4 | Manifesto (`Manifesto`, includes `PressureStatement`) | `main#main-content > div > section:nth-of-type(4)` | `h2`: `The next decade of software gets decided in the next two years.` | `h2`: `عصر المنتجات الرقمية يتحدّد خلال السنتين الجاية.` | Desktop: around one viewport and may exceed 900 depending on wrapping; mobile: definitely exceeds | **Full-element screenshot**. It must include all 3 paragraphs, embedded pressure statement (`AI isn't optional.` / `الذكاء الاصطناعي مو خيار.`), and section CTA. Trigger WordReveal before capture. Do not treat Pressure Statement as a separate homepage section. |
| 5 | Outcomes Band (`OutcomesBand`) | `main#main-content > div > section:nth-of-type(5)` | paragraph text: `We deliver outcomes, not just tools.` | `نوصّل نتيجة فعلية، مو مجرد أدوات.` | No on desktop or mobile | **Element screenshot** with modest fixed vertical context/padding. Heading is a `<p>`, not `h2`; select by exact text or positional root. |
| 6 | Ticker (`Ticker`) | `main#main-content > div > div.overflow-x-clip` (the direct sibling after section 5) | repeated text: `Nothing ships that we wouldn't use ourselves` | repeated text: `لا نطلق ما لا نستخدمه نحن` | No | **Element screenshot** of the outer clipping root. Freeze CSS animation at a deterministic phase before capture. Text occurs 16 times, so do not use a unique text locator without `.first()`/ancestor qualification. |
| 7 | FAQ (`FAQ`) | `main#main-content > div > section:nth-of-type(6)` | `h2`: `Questions? We have answers.` | `h2`: `أكيد عندك أسئلة.` | Desktop: likely near/fits 900 with only first item open; mobile: likely exceeds 844 | **Full-element screenshot**, with deterministic accordion state. Current initial state is item 1 open. Preserve that state in all four captures, or explicitly close all in all four; do not mix states. Wait for WordReveal and accordion transition. |
| 8 | Final CTA (`CTA`) | `main#main-content > div > section:nth-of-type(7)` | `h2`: `Tell us what you're trying to build.` | Same English heading in AR catalogue | No; panel plus section padding should fit both viewports, though mobile may be close | **Element screenshot** of the section or inner rounded panel plus controlled surrounding black. Prefer section root to retain inset spacing. DitherCursor is pointer-driven; park pointer away and rely on static DitherField bands for consistent output. |
| 9 | Footer (`Footer`, outside main) | `body > footer` | `Reach out to us` | Same English text in AR catalogue | Desktop: likely near/fits 900; mobile: definitely exceeds 844 | **Full-element screenshot** separately from CTA. This is a long mobile plate; allow full height. Do not use bottom-of-page viewport capture. Capture RTL layout honestly even though copy is English. |

### Robust selector strategy

1. Best: inject a stable attribute before capture by resolving the known direct-child roots, e.g. `data-walkthrough-section="hero|proof|doors|manifesto|outcomes|ticker|faq|cta"`, and mark `body > footer` as `footer`.
2. Second-best: locate the exact EN/AR heading, then ascend with `locator('xpath=ancestor::section[1]')`. Hero uses `h1`; Outcomes uses a paragraph; Ticker needs its known outer class/direct-child position; footer can use `body > footer`.
3. Positional fallback: the seven `<section>` elements are numbered as above, but Ticker interrupts component order without affecting `section:nth-of-type()` numbering.
4. Fail hard: assert exactly one root and verify its bounding box is near the expected page order. The current broad `querySelectorAll(...).find(...)` silently continues when no match exists, which created the fake Doors shot.

## Required screenshot matrix

The desired sequence for **every row** is: **EN desktop → EN mobile → AR desktop → AR mobile → explainer**. “Full element” means Playwright locator capture after scroll/animation settling, at the target viewport width; it does not mean browser `full_page=True`.

| Block | EN desktop | EN mobile | AR desktop | AR mobile | Current state / action |
|---|---|---|---|---|---|
| Hero | viewport top | viewport top | viewport top | viewport top | All four source files exist. HTML embeds all four top shots. Keep but recapture consistently. AR screenshots correctly expose that copy is English, contradicting document prose. |
| Proof Wall | full element | full element | full element, RTL + English content | full element, RTL + English content | Only EN desktop exists/embedded. Missing EN mobile and both AR sizes. Existing EN image is a 1440×900 viewport crop, with heading clipped at top; replace with full-root framing. |
| Doors | element | full element | element | full element | `en/home-doors.png` exists but is wrong: visually another hero shot due stale anchor. It is not embedded in HTML. Missing all four valid Doors captures. |
| Manifesto + Pressure | full element | full element | full element | full element | All four missing and absent from HTML. |
| Outcomes Band | element | element | element | element | All four missing and absent from HTML. |
| Ticker | deterministic element | deterministic element | deterministic element | deterministic element | All four missing and absent from HTML. |
| FAQ | full element | full element | full element | full element | All four missing. Bottom screenshots do not show FAQ despite captions. |
| Final CTA | element | element | element | element | All four missing. Bottom screenshots do not show CTA despite captions. AR copy is English on this branch. |
| Footer | full element | full element | full element | full element | Existing EN/AR desktop-bottom files are bottom viewport crops of only part of the footer; no mobile footer captures. Replace with four footer-root captures. AR copy is English. |

## `document.html` audit

### Missing screenshots

- No four-up, section-specific visual treatment for any section.
- Proof Wall: only EN desktop; missing EN mobile, AR desktop, AR mobile.
- Doors: no screenshot at all, despite an image file being generated.
- Manifesto, Outcomes, Ticker, FAQ, Final CTA: no section screenshot in either language/viewport.
- Footer: no root capture; only desktop bottom viewport crops; no mobile.
- The document format groups screenshots by language at the top rather than by section in the required EN desktop / EN mobile / AR desktop / AR mobile sequence.

### Wrong framing or claims

- `en/home-proofwall.png` begins with the heading already clipped by the fixed header/top edge and is only a viewport slice. The section likely exceeds 900px; cards are compressed into the frame and section boundaries are not represented.
- “Desktop bottom” captions on both locale landing pages say “Final CTA … and the footer,” but the images show footer content only.
- “Below the fold” captions claim “FAQ, final CTA and footer,” but the reused images again show only footer content.
- AR landing prose quotes Arabic hero text, while the branch’s AR hero strings and visible screenshot are English.
- The AR warning says only proof cards fall back to English and that hero/doors/closing are fully translated. Actual branch state: Hero, Proof Wall, Final CTA, Footer, Nav/shared chrome are English in `messages/ar.json`; Doors, Manifesto, Outcomes, Ticker, and FAQ are Arabic.
- “Eight sections” is acceptable only as eight body blocks; Ticker is not a `<section>`, and Footer is a separate ninth screenshot target.

### Current duplication

- `assets/screens/en/home-desktop-bottom.png` is referenced on both “The landing · English” and “Below the fold.”
- `assets/screens/ar/home-desktop-bottom.png` is referenced on both “The landing · العربية” and “Below the fold.”
- Thus four HTML placements represent two duplicated files.
- `en/home-doors.png` is not byte-identical to `en/home-desktop-top.png`, but is **semantically/visually a duplicate hero capture**, not a Doors capture. Its different pixel content is likely animation timing.

## `shoot.py` audit

- `SHOTS` has only 8 jobs: 3 EN top/bottom/mobile, EN proof, EN doors, and 3 AR top/bottom/mobile. A complete matrix needs 9 blocks × 4 locale/viewport combinations = **36 section captures**.
- Mobile selection is keyed only to `kind == "mobile-top"`; adding names such as `proof-mobile` without redesigning this logic would accidentally use desktop dimensions.
- `desktop-bottom` uses `window.scrollTo(...body.scrollHeight)` then a viewport screenshot. This can never reliably document FAQ + CTA + Footer separately.
- Proof/Doors use a broad scan of `h1,h2,h3,p,span,div`, first `startsWith()` match, and no assertion if absent. Broad `div.textContent` can match huge ancestors; stale strings silently produce a screenshot at the wrong position.
- Doors anchor is stale: `Three ways we work` versus `Pick the door that matches you` / `اختر الباب اللي يناسبك`.
- There is no AR proof or doors job.
- There are no mobile mid/later-section jobs.
- `page.screenshot()` captures only the viewport; it never captures a section locator’s full bounding box.
- Motion is settled with fixed sleeps only. Prefer reduced-motion context where it does not remove essential static visuals, plus explicit intersection/animation waits. PixelBlast/Dither must have explicit readiness or a bounded visual wait.
- The script does not freeze ticker animation, normalize accordion state, or guard pointer-driven CTA effects.
- Filenames should encode section, locale, and viewport consistently, e.g. `home-proof-en-desktop.png`, and the HTML should consume a generated manifest to prevent stale/missing references.

## Recommended rebuild contract

- Generate exactly 36 captures and validate all exist before PDF build.
- For each block, process in this order: EN desktop, EN mobile, AR desktop, AR mobile; then place the explainer immediately after those four.
- Use viewport capture only for Hero. Use locator element capture for every other block.
- Capture Final CTA and Footer separately; never use a generic bottom screenshot as a substitute.
- Assert locale (`html[lang]`), direction (`html[dir]`), exact anchor/root count, non-zero bounding box, and expected vertical order before each capture.
- Record AR Proof Wall as: **“Arabic route and RTL composition; proof-wall copy remains English in the Arabic catalogue pending native localization.”** Do not call it a framework fallback.
- Also disclose that AR Hero, Final CTA, Footer, and shared chrome are English in the audited branch; otherwise the rebuilt walkthrough would still misrepresent what its screenshots show.
