---
type: note
created: 2026-08-08
tags: [company, marketing, website, product, decision]
---

# Website Direction 4 — Understanding First

Direction 4 is complete and verified on branch `direction/4-understanding-first`. It has not been merged or pushed at the time of this note.

## What changed

- Reframed the homepage around understanding the visitor's situation before presenting Muse.
- Added an intent router in English and Arabic.
- Replaced the old qualification page with a guided `/start` conversation while retaining `/api/get-started` as the delivery endpoint.
- Added complete Product Strategy & Discovery and Product Experience Design routes, bringing the public capability model to five.
- Added all five capabilities to the real navigation panel.
- Permanently redirected bare, English and Arabic `/get-started` URLs to the matching `/start` route in one hop.
- Moved the sitemap and every live internal conversion link to `/start`.
- Kept Arabic functional and under RTL QA, but outside sitemap and hreflang and under `noindex` until native review approves the drafted service content.

## Verified commits

1. `3fba9e2 [verified] feat(d4): complete understanding-first homepage`
2. `bb2f414 [verified] feat(d4): build guided start conversation`
3. `e6d8868 [verified] feat(d4): add strategy and design capabilities`
4. `47837d9 [verified] feat(d4): complete navigation and SEO migration`

The earlier shell, message and planning commits remain in the same branch history.

## Final gates

| Gate | Result |
|---|---:|
| Homepage | 8/8 |
| `/start` | 42/42 |
| Capabilities | 21/21 |
| Nav, redirects and SEO | 32/32 |
| Direction 4 phase-one visual gate | 22/22 |
| Production build | PASS, 42 generated pages, no retired localized `/get-started` route |
| TypeScript, scoped ESLint, diff checks | PASS |

The Nav/SEO verifier was rejected twice during independent review before acceptance. The final version proves the destination after every redirect, exact localized capability labels and order, Escape and focus restoration, mobile action reachability, strict Desktop containment, zero document overflow, same-row non-overlap, mirrored RTL order, contrast, canonical and Open Graph URLs, hreflang publication rules, and screenshot provenance.

## Evidence

- `docs/three-doors/direction-4-understanding-first.md`
- `docs/three-doors/direction-4-capabilities-gate.md`
- `docs/three-doors/direction-4-nav-seo-gate.md`
- `docs/three-doors/_verify-d4-start/`
- `docs/three-doors/_verify-d4-capabilities/`
- `docs/three-doors/_verify-d4-nav-seo/`

The Nav/SEO evidence includes six committed open-menu screenshots for EN and AR across Mobile and Desktop. Their decoded dimensions and SHA-256 hashes are recorded in `report.json`.

## Still blocked before public launch

1. Native Arabic review, especially `lib/content/ar/services.ts`, before changing `PUBLISHED_LOCALES`.
2. End-to-end delivery of a real `/start` submission into a verified inbox.
3. Durable lead storage on Vercel rather than reliance on ephemeral local writes.
4. Merge and deployment decision after reviewing this branch against the other homepage directions.

Related: [[Website]], [[Decision Log]], [[Brand Voice]], [[Localization Playbook]], [[Launch Checklist]].
