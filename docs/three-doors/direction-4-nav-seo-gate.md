# Direction 4 navigation, redirects, and SEO gate

Date: 2026-08-08
Branch: `direction/4-understanding-first`
Base commit: `e6d8868 [verified] feat(d4): add strategy and design capabilities`

## Decision

**PASS pending independent re-review.** The first independent review confirmed the implementation behavior but rejected gaps in the permanent verifier. Those gaps were reproduced and corrected before this report was finalized.

## Scope

- Added a Capabilities group to the global navigation with all five service routes in EN and AR.
- Changed all live UI entry points from `/get-started` to `/start`.
- Added permanent one-hop redirects:
  - `/get-started` to `/en/start`
  - `/en/get-started` to `/en/start`
  - `/ar/get-started` to `/ar/start`
- Replaced `/get-started` with `/start` in the published sitemap.
- Removed the retired localized page and its exclusive legacy form component while preserving `/api/get-started` for the new guided conversation.
- Preserved the publication gate: English remains indexable; Arabic remains rendered for QA but noindex and absent from sitemap/hreflang until its original copy review is complete.

## RED

Permanent verifier: `scripts/d4-verify-nav-seo.mjs`
Receipt: `docs/three-doors/_verify-d4-nav-seo/red.txt`

Initial result: **5/22**.

The baseline failed all three redirects, sitemap migration, both capability navigation panels, and every tested legacy UI link. English indexing, Arabic noindex, Arabic sitemap exclusion, and existing console health passed.

## GREEN

First implementation-green result: **30/30**, later rejected because several predicates were too weak.

Strengthened-gate RED: **30/32**. EN and AR desktop card contracts failed until the real navigation cards exposed stable `data-nav-group` identifiers.

Final strengthened Nav/SEO gate: **32/32**.

Coverage includes:

- Three exact one-hop redirects: initial 308, followed by destination 200 with no second `Location` header.
- Published `/en/start` in sitemap and no `/get-started` sitemap entry.
- Arabic absent from sitemap while unpublished.
- Exactly five capability links in EN and AR navigation, with exact localized labels and order.
- Mobile menu internal scrolling reaches both 52px action links.
- Escape removes the panel, sets `aria-expanded=false`, and restores focus to the toggle.
- Desktop requires four named cards, exact DOM order, correct LTR/RTL mirrored visual order, and complete containment of cards, actions, social controls, headings, links, and scroller.
- Computed WCAG contrast: Start action 6.05:1; Contact action 14.91:1.
- No legacy `/get-started` links across homepage, Explore, About, Contact, and service detail pages in both locales.
- Absolute `https://muse.sa` canonical, `og:url`, and `og:image` values on `/en/start` and the new strategy capability.
- hreflang advertises EN and x-default only; AR is not advertised before publication.
- No console or page errors in EN/AR navigation checks.

## Visual evidence

- `docs/three-doors/_verify-d4-nav-seo/en-mobile-nav-top.png`
- `docs/three-doors/_verify-d4-nav-seo/en-mobile-nav-bottom.png`
- `docs/three-doors/_verify-d4-nav-seo/ar-mobile-nav-top.png`
- `docs/three-doors/_verify-d4-nav-seo/ar-mobile-nav-bottom.png`
- `docs/three-doors/_verify-d4-nav-seo/en-desktop-nav.png`
- `docs/three-doors/_verify-d4-nav-seo/ar-desktop-nav.png`

`report.json` records all six paths, PNG dimensions, and SHA-256 hashes. The files are globally ignored and must be force-added to the verified commit.

Independent-review receipt: `docs/three-doors/_verify-d4-nav-seo/reviewer-red.txt`.

Open-menu visual review passed for EN/AR mobile top and bottom states. Arabic desktop passed directly. English desktop's visual reviewer questioned action contrast; computed styles disproved the concern with measured WCAG ratios above.

## Full regression

- Production build: PASS, 42 generated pages. Retired `/[locale]/get-started` no longer appears.
- `/start`: 42/42.
- Capability pages: 21/21.
- Homepage: 8/8.
- Phase 1 routes/reduced motion: 22/22.
- TypeScript: PASS.
- Scoped ESLint: PASS.
- `git diff --check`: PASS.

No push was performed.
