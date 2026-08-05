# Exact Section Capture Spike

## Verdict: VALIDATED

### Question

Can Playwright capture each homepage section as an exact visual unit at desktop and mobile widths, without adjacent-section bleed or sticky navigation covering the heading?

### Method tested

Direction 1 on branch `direction/1-the-studio`.

- Desktop viewport: 1440 x 900.
- Mobile viewport: 390 x 844 with scale factor 2.
- Locales: EN and AR.
- Capture targets: Hero, Doors, Manifesto, Outcomes, Ticker, FAQ, CTA and Footer.
- Section roots found from exact visible copy, then captured with `locator.screenshot()`.
- Hero kept the fixed navigation.
- Middle sections hid only the fixed navigation during capture.
- Each target was forced into the viewport center and given 1800ms for in-view motion to finish.

### What worked

- Hero contains only Hero.
- Doors contains its heading and all three cards, with no Manifesto title or pixels.
- Manifesto, Outcomes, Ticker, FAQ, CTA and Footer are independently bounded.
- The same method works in Arabic with correct shaping and RTL layout.
- Long mobile sections remain sharp enough to place as real phone-width figures. They no longer need a generic hero substitute.
- The approach yields useful section dimensions for a capture manifest.

### What failed first

The first pass used a reduced-motion browser context and `animations="disabled"`. Framer Motion sections such as Doors remained at the server-rendered `opacity: 0`, creating blank screenshots.

### Fix

- Do not use reduced-motion mode for the capture browser.
- Do not disable animation in `locator.screenshot()`.
- Force `scrollIntoView({ block: "center" })`.
- Wait for the in-view motion to settle before capture.

### Recommendation for the real build

Use exact element screenshots for all ordinary sections. Use a dedicated locator for Ticker and `footer` for Footer. If any mobile section is too tall for a readable figure, split only between real cards or rows. Keep a branch-specific hero assertion before the first capture to prevent stale-server screenshots.
