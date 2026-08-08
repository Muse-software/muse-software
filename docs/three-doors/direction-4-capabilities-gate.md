# Direction 4 capability pages gate

Date: 2026-08-08
Branch: `direction/4-understanding-first`
Scope: Product Strategy & Discovery and Product & Experience Design, EN and AR.

## Decision

**PASS.** Both previously missing capability pages now render from the shared service-detail route in English and Arabic. The copy is grounded in Muse Vault's Product Philosophy, Website Voice, Brand Voice, and Arabic Termbase. It contains no client names, metrics, case studies, delivery-time promises, or fabricated proof.

## Routes

- `/en/services/product-strategy-discovery`
- `/ar/services/product-strategy-discovery`
- `/en/services/product-experience-design`
- `/ar/services/product-experience-design`

All four return 200 with locale-correct `lang`, `dir`, metadata, canonical URL, and CTA to `/{locale}/start?intent=capability`.

## RED receipts

- Initial route gate: **0/14**. Both records and routes were absent; homepage links and Explore listings were not yet live.
- First responsive pass exposed a shared `ServiceSubnav` defect: `-mx-5` created exactly 20px document overflow on every mobile service page.
- First visual pass exposed partial OutlineTrack cards. Mobile showed 50/300px of the adjacent card; desktop showed 270/300px of a fourth card.
- Independent review then rejected the apparent 21/21 result: at 320px the English `What we do` label measured 80px inside a 65px tab. The tab border itself fit, so the original border-box-only assertion was a false positive. The strengthened gate reproduced this as **19/21 RED** before the CSS correction.
- Screenshot review initially appeared to show a large track-to-FAQ void. Live DOM proved section gap `0`, then the evidence harness showed the actual cause: below-fold `WordReveal` headings had not been intersected before full-page capture.
- Expanded console coverage exposed duplicate `id="faq"`, an unbounded verifier shutdown, and WebGL context pressure. Service pages mounted PageDither plus hero and CTA WebGL fields. The initial final console gate was **20/21**.

## Corrections

- Added the two EN and two AR service records with image omitted when no truthful service-specific photo exists.
- Made `Service.image` optional and added honest dither/icon fallback rendering to service lists.
- Linked all five homepage capability rows and routed service CTAs to `start?intent=capability`.
- Removed the negative mobile subnav margin and changed mobile tabs to a four-column grid.
- Changed OutlineTrack to one full card on mobile and exactly three full cards on desktop.
- Tightened compact subnav typography and made the permanent gate check intrinsic width plus the rendered text range, not only each anchor border box.
- Added an approved `copper-bloom` surface behind optional WebGL and repositioned it for mobile.
- Removed repeated bottom/top spacing so controls-to-FAQ heading is 96px desktop and 64px mobile/compact.
- Removed the duplicate FAQ ID and retained the semantic `section#faq`.
- Made screenshot capture scroll through sections and wait for every FAQ heading word to settle before returning to top.
- Bounded production-server shutdown to prevent verifier hangs.
- Reused one actual WebGL context in PixelBlast instead of consuming a separate probe context.
- Limited service pages to one decorative WebGL context: PageDither remains live; the hero and CTA use the approved static brand surface.
- Updated the homepage verifier contract from three capability links to all five.

## Final permanent gate

`node scripts/d4-verify-capabilities.mjs`

- **21/21 PASS**
- Desktop: 1440×900, EN/AR × two new routes
- Mobile: 390×844, EN/AR × two new routes
- Compact: 320×720, EN/AR × two new routes
- Three console/page-error gates: zero errors
- Mobile renderer regression: all five service pages in EN and AR
- Homepage: all five capability links in EN and AR
- Explore: both new capabilities listed without broken media
- Assertions include route status, locale direction, canonical, CTA, document overflow, broken images, exact track-card counts, any partially visible card above 1px, visible hero image or fallback, subnav border/text/intrinsic containment, FAQ heading, exact 64px/96px controls-to-FAQ spacing, static CTA surface, and no more than one live canvas across all five EN/AR service pages.

## Evidence

- Machine report: `docs/three-doors/_verify-d4-capabilities/report.json`
- Initial RED: `docs/three-doors/_verify-d4-capabilities/red.txt`
- Independent-review RED and correction receipt: `docs/three-doors/_verify-d4-capabilities/reviewer-red.txt`
- Twelve full-page PNGs: EN/AR × desktop/mobile/compact × two routes
- Decoded PNG dimensions match every width and height recorded in `report.json`.
- Final visual review: PASS for desktop, mobile, compact, and Arabic RTL layout.

## Regressions

```text
npm run build                         PASS, 44 generated pages
npx tsc --noEmit                      PASS
scoped ESLint                         PASS
git diff --check                      PASS
Direction 4 capability gate          PASS, 21/21
Direction 4 /start gate               PASS, 42/42
Direction 4 homepage gate             PASS, 8/8
Direction 4 Phase 1 gate              PASS, 22/22
```

Known existing build notices remain limited to the edge-runtime static-generation notice and metadata fallback emitted while generating special image metadata. There were no missing-message, CSS optimizer, TypeScript, ESLint, route, console, page, or screenshot-dimension failures.

## Intentionally not claimed

- No client proof, results, metrics, or case studies are presented.
- No service-specific photography is implied where none exists.
- The page-wide dither is decorative; a static approved brand-color surface remains visible if WebGL is unavailable.
- Inbox delivery and durable form retention remain release configuration work documented in the `/start` gate, not capability-page claims.
