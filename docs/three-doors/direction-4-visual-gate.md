# Direction 4 Visual Gate

Date: 2026-08-08
Branch: `direction/4-understanding-first`
Scope: Phase 0 and Phase 1 only. Hero, IntentRouter, and truthful `/start` shell.

## Decision

**Passed after one rejected visual iteration and a root-layout correction.**

The first implementation passed route and overflow checks but failed visual review because the mobile Hero had a large dead gap, the proposition was weaker than the next heading, and the evidence screenshots captured only one viewport despite claiming to cover both sections.

The corrected implementation:

- Uses a content-driven mobile Hero instead of a forced `70vh` box.
- Keeps the spacious full-height Hero on desktop.
- Groups proposition, supporting copy, and CTA into one coherent responsive structure.
- Uses a 44px minimum internal CTA height and makes every intent row a full-row link.
- Removes the decorative horizontal arrow and replaces the external-link-style CTA glyph with an internal directional arrow.
- Isolates the Latin `Muse` run inside Arabic copy with `<bdi>`.
- Keeps the asymmetric stair on desktop and removes it on mobile.
- Omits the not-yet-valid `#capabilities` link until that section exists.
- Adds a CSS brand-color surface behind PixelBlast so no-WebGL environments degrade intentionally.
- Captures actual Hero plus IntentRouter evidence extending beyond one viewport.

## Verification

### Build and code

- `npm run build`: passed.
- Build log scan for `MISSING_MESSAGE`, `INVALID_MESSAGE`, `IntlError`, and invalid Tailwind delimiter warnings: passed with zero matches.
- `npx tsc --noEmit`: passed.
- Scoped ESLint on all touched code and the gate script: passed.
- EN and AR message shape parity, including array lengths: passed.
- Changed-line customer-copy sweep for em/en dashes, curly quotes, guillemets, and Arabic `، لا` contrast construction: passed.

The build still reports two pre-existing project warnings: edge runtime disables static generation on one page, and `metadataBase` is not set for social-image resolution. Neither was introduced by Direction 4.

### Production Playwright gate

- 20 route combinations passed: 2 locales × 2 viewports × 5 routes.
- Routes: `/`, `/start`, and `/start?intent=build|improve|ai`.
- Every case returned HTTP 200 with correct `lang` and `dir`.
- Zero horizontal-overflow failures.
- Zero unexpected console errors.
- Zero page errors.
- Exactly three intent links were present on each homepage with correct locale-prefixed destinations.
- 2 reduced-motion homepage cases passed, one per locale.
- PixelBlast emitted the documented no-WebGL warning in the headless environment and rendered the CSS brand surface instead. The warning is classified explicitly, not hidden.

## Screenshot evidence

- `docs/three-doors/_verify-d4/en-desktop-home.png`, 1440 × 1902.
- `docs/three-doors/_verify-d4/en-mobile-home.png`, 390 × 1543.
- `docs/three-doors/_verify-d4/ar-desktop-home.png`, 1440 × 1905.
- `docs/three-doors/_verify-d4/ar-mobile-home.png`, 390 × 1491.

All four artifacts exceed their viewport height and cover the complete `#hero` through `#intents` region. The machine-readable receipt is `docs/three-doors/_verify-d4/report.json`.

## Visual review

Independent visual review passed the corrected desktop composition and Arabic mobile composition. English mobile was visually accepted after code inspection confirmed that each entire intent row is the interactive link. The small outlined arrow is decorative within the full-row touch target, not the target itself.

The gate now meets the required hierarchy, modular scale, baseline rhythm, asymmetric whitespace, RTL behavior, and section-transition bar. Later Direction 4 sections remain intentionally unbuilt.

## Known limitation

The headless browser environment cannot create a WebGL context. PixelBlast now fails safely and leaves an intentional Muse color wash. A final GPU-backed pass remains useful before release, but this does not block the Phase 1 structural gate.
