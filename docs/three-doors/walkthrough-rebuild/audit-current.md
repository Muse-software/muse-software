# Local Audit of Current Walkthroughs

Date: 2026-08-05

## Direction 1

Actual homepage order:

1. Hero
2. Three Doors
3. Manifesto
4. Outcomes Band
5. Ticker
6. FAQ
7. CTA
8. Footer

Current PDF: 10 pages.

Current visual coverage:

- Hero EN and AR desktop.
- Hero EN and AR mobile.
- Three Doors EN and AR desktop.
- One generic bottom capture used for CTA and Footer.

Failures confirmed visually:

- Three Doors capture continues into the Manifesto heading.
- One EN Doors capture has the sticky navigation covering the section start.
- No dedicated Manifesto screenshot.
- No Outcomes screenshot.
- No Ticker screenshot.
- No FAQ screenshot.
- No dedicated CTA screenshot.
- Footer is paired with the Hero at the beginning instead of appearing at the end.
- Mobile Hero includes the next section heading.
- Mobile does not cover the remaining sections.

## Direction 2

Actual homepage order:

1. Hero
2. The Problem
3. The Standard
4. Three Doors
5. Manifesto
6. Outcomes Band
7. Ticker
8. FAQ
9. CTA
10. Footer

Current PDF: 11 pages.

Current visual coverage:

- Hero EN and AR desktop and mobile.
- The Problem EN and AR desktop.
- The Standard EN and AR desktop.
- One generic bottom capture used for CTA and Footer.

Failures confirmed visually:

- Problem captures include part of The Standard.
- Some section headings sit under the sticky navigation.
- No mobile capture for The Problem or The Standard.
- No visual coverage for Three Doors, Manifesto, Outcomes, Ticker, FAQ or dedicated CTA.
- Footer is paired with the Hero at the beginning.

## Direction 3

Actual homepage order:

1. Hero
2. Proof Wall
3. Three Doors
4. Manifesto
5. Outcomes Band
6. Ticker
7. FAQ
8. CTA
9. Footer

Current PDF: 10 pages.

Current visual coverage:

- Hero EN and AR desktop and mobile.
- Proof Wall desktop.
- A nominal Doors screenshot.
- One generic bottom capture used for CTA and Footer.

Failures confirmed visually:

- One current asset labeled as a Doors capture is not a clean Doors section view.
- No mobile Proof Wall capture.
- No complete EN and AR desktop and mobile capture set for Three Doors.
- No visual coverage for Manifesto, Outcomes, Ticker, FAQ or dedicated CTA.
- Footer is paired with the Hero at the beginning.

## Root causes

1. Screenshots were based on scroll positions, not component boundaries.
2. The capture script produced only a small fixed list of top, middle and bottom views.
3. The PDF template was written before a complete capture manifest existed.
4. Mobile Hero was used as a substitute for mobile section coverage.
5. Sticky navigation overlap was incorrectly accepted as honest browser behavior.
6. Technical PDF verification checked bounds, not storytelling sequence or screenshot completeness.

## Validated replacement

The exact-section Playwright spike in `capture-spike-verdict.md` proved that all Direction 1 sections can be captured independently at EN desktop, EN mobile, AR desktop and AR mobile. It also proved that forced in-view motion settling is necessary for Framer Motion cards.
