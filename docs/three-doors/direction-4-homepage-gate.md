# Direction 4 Homepage Gate

Date: 2026-08-08
Branch: `direction/4-understanding-first`
Base before this gate: `81aa769`
Scope: Direction 4 homepage sections after the already-passed Hero and IntentRouter gate.

This is a bounded homepage gate, not the final all-phases release. The explicit implementation scope for this gate requires links to the three existing service routes only, requires Strategy & Discovery and Product & Experience Design to remain non-link informational items in this phase, and forbids building capability pages or the full `/start` flow. The master plan's later capability-page requirement remains open work rather than being silently treated as complete.

## Decision

**Passed after rejecting the first evidence set and correcting both the implementation and the verifier.**

The first Sonnet session reached its turn limit and left an incomplete working tree. Its draft report was not accepted as evidence. Direct Git inspection found that:

- `FromTheStudio.tsx` existed but was not mounted in `HomeSections`.
- `CTA.tsx` still linked to `/get-started` and had no `id="cta"`.
- `FAQ.tsx` had no `id="faq"`, and the messages still contained the pre-D4 FAQ.
- The screenshot routine captured a full page without naturally scrolling through it. `WordReveal` headings below the fold therefore remained at their initial hidden opacity. The keyboard gate also left the CTA focused before capture. Those two verifier defects produced misleading screenshots with apparently dark headings and an accidental focus ring.

The missing Phase 3 work was completed, the verifier was rebuilt, and all evidence below was regenerated from a fresh production build.

## Final homepage structure

`Hero → IntentRouter → Capabilities → OurApproach → WhyMuse → FromTheStudio → FAQ → CTA`

`FromTheStudio` is mounted in its structural position. Its EN and AR item arrays are empty, so the component returns `null` and renders no heading, placeholder, coming-soon card, or substitute content.

## What changed

- Five truthful capability items.
- Strategy & Discovery and Product & Experience Design are informational blocks because no pages exist yet.
- Product Engineering, AI, and Gamification & Experience link only to existing service pages.
- Capabilities use a deliberate 2+3 desktop grid instead of an orphaned fifth card.
- Our Approach uses a compact 2×2 editorial field on desktop and one reading column on mobile.
- Why Muse uses two paragraphs grounded in existing About/Vault facts.
- FAQ contains Layan's five buying questions in English and natively written Arabic.
- Closing CTA uses Layan's final ask and links to `/start`.
- Hero typography now scales down safely at 320px. The original 32px floor visibly clipped the English headline inside an overflow-hidden Hero despite zero document overflow.
- Mobile section spacing was compressed after visual review while preserving the 8px-derived rhythm.

## Production verification

### Build and static checks

- `npm run build`: passed.
- Build-log scan for `MISSING_MESSAGE`, `INVALID_MESSAGE`, `IntlError`, and invalid Tailwind delimiter warnings: zero matches.
- `npx tsc --noEmit`: passed.
- Scoped ESLint on all changed page, section, and verification files: passed.
- `git diff --check` and staged diff check: passed.
- Recursive EN/AR message shape and array-length parity: passed.
- Changed-copy sweep for em/en dashes, curly quotes/guillemets, Arabic `، لا` contrast construction, and placeholder language: passed.
- Added-line security scan: zero hardcoded secrets, dangerous eval/exec, shell injection, unsafe HTML assignment, or private keys.

The build still reports the project's existing edge-runtime/static-generation and missing `metadataBase` warnings. Neither was introduced by Direction 4.

### Homepage Playwright gate

Eight production cases passed:

- EN and AR at `1440×900`.
- EN and AR at `390×844`.
- EN and AR at `320×700`.
- EN and AR reduced-motion desktop cases.

Every case verified:

- HTTP 200.
- Correct `lang` and `dir`.
- Zero horizontal overflow and zero horizontal scroll after probing.
- Zero unexpected console errors and zero page errors.
- Exact rendered section order: `hero, intents, capabilities, approach, why-muse, faq, cta`.
- `from-the-studio` absent from the rendered DOM when its item array is empty.
- Exactly five capabilities and exactly three real capability links.
- Exactly five FAQ rows.
- Closing CTA resolves to locale-prefixed `/start`.
- Keyboard reaches the quiet capability anchor, skips the two non-link capability blocks, reaches the first real capability link, toggles FAQ with Enter, and focuses the CTA link.
- The fixed header remains at the top after scrolling.
- The `#capabilities` anchor clears the fixed header.
- All WordReveal heading words are fully visible before screenshots are taken.

Measured minimum interactive geometry:

- Intent-row link height: 173px desktop, 247.875px or more Arabic mobile, 265px or more English mobile, and 247.875px or more at 320px.
- Intent-row width: 280px minimum at the compact viewport.
- FAQ button height: 75.89px minimum across all cases.

The outlined arrow glyphs are decorative children of full-row links, not the touch targets themselves.

### Phase 1 regression gate

The original Hero/IntentRouter production gate was rerun after all changes:

- 20 route/device/locale cases passed.
- 2 reduced-motion cases passed.
- `/`, `/start`, and all three preselected intent URLs returned 200.
- Intent hrefs, RTL/LTR, overflow, console errors, page errors, and stitched Hero/Intent evidence all passed.

## Final screenshot evidence

All captures naturally scroll every section first, wait for one-shot reveals, blur any focused control, return to the top, assert heading opacity, then capture the full page.

- `docs/three-doors/_verify-d4-homepage/en-desktop-home.png`: 1440 × 6526.
- `docs/three-doors/_verify-d4-homepage/en-mobile-home.png`: 390 × 7218.
- `docs/three-doors/_verify-d4-homepage/en-mobile-compact-home.png`: 320 × 8105.
- `docs/three-doors/_verify-d4-homepage/ar-desktop-home.png`: 1440 × 6403.
- `docs/three-doors/_verify-d4-homepage/ar-mobile-home.png`: 390 × 6836.
- `docs/three-doors/_verify-d4-homepage/ar-mobile-compact-home.png`: 320 × 7287.

Machine-readable receipt: `docs/three-doors/_verify-d4-homepage/report.json`.

## Visual review

The corrected 390px English and Arabic pages passed independent visual review. The first 320px English review caught real Hero clipping; the clamp floor was reduced and the final regenerated 320px English artifact passed. The 320px Arabic artifact also passed.

Confirmed visually:

- Visible hierarchy and headings.
- No clipping or badge/title collisions.
- Safe English and Arabic wrapping at 320px.
- Correct RTL presentation and mixed Latin runs.
- Coherent 2+3 capability layout on desktop.
- Compact approach composition.
- Complete FAQ and CTA.
- No accidental focus rings in evidence.

## Known limitations

- The headless sandbox cannot create a WebGL context. PixelBlast and related fields use their intentional CSS fallback surfaces. A GPU-backed browser pass is still useful before release.
- SiteHeader and Footer still contain `/get-started` links. Retiring those links and adding the redirect belong to the later conversion-path phase, not this homepage gate.
- Product Strategy & Discovery and Product & Experience Design still need honest capability pages in a later phase. This gate intentionally leaves them non-interactive rather than inventing routes or funneling a capability browse action into the generic `/start` shell.
- `/start` is still the truthful placeholder shell from Phase 1. The guided two-screen flow is the next implementation phase.
- `FromTheStudio` has no real artifacts yet. The first real item should rerun this gate with the populated layout.
