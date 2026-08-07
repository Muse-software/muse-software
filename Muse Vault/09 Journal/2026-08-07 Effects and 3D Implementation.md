---
type: log
created: 2026-08-07
tags: [website, effects, 3d]
---

# 2026-08-07 Effects and 3D Implementation

## What shipped (branch direction/3-the-proof)

Executed against `docs/effects-3d-implementation-plan.md` (Opus plans, Sonnet executes, same pipeline as the 2026-08-04 structure pass). Nine build-gated commits, each with its own green `npm run build` and `tsc --noEmit`, and lint clean on every file the commit touched (see Verification below for the lint caveat).

1. **Lenis smooth scroll**, wired into gsap's own ticker so the existing ScrollTrigger usage in `WordReveal.tsx` reads the smoothed position. A noindex `demo` route group added under `app/[locale]/demo/*` for everything that follows, disallowed in `robots.txt`.
2. **Magnetic**, a hover pull wrapper around real CTA components (`PillButton`, `Link`), not a rewritten button. Shipped to production on the Hero contact link and the closing CTA.
3. **Crosshair cursor**, a pure SVG reticle that frames whatever is under the pointer. Zero WebGL contexts. Mounted globally in the root layout.
4. **R3F carousel**, a real port of colindmg's wavy infinite carousel (MIT), textured with Muse's own photos instead of the source's Midjourney images. Driven by drag and a scoped wheel gesture, RTL aware.
5. **ProofWallCarousel**, the production shaped variant consuming the same `Home.proofWall.items` content the live grid uses, with the case study text anchored to each plane as real DOM through drei's `Html transform`, not canvas text. Built and demoed, not wired into the homepage. See the decision below.
6. **Animation core demo**, proving the gsap bonus plugins actually resolve in a real build: SplitText, Flip, a ScrollTrigger pin.
7. **A curated drei showcase**, five of the library's roughly thirteen components: glass, sparkles, float, drag to orbit, procedural lighting.
8. **Three real characters**, downloaded verbatim from KhronosGroup's glTF-Sample-Assets (Fox, Cesium Man, Rigged Simple). KayKit, the plan's primary stylised direction, is not in the repo. See the decision below.
9. **An honest Meshy pipeline**, a real REST client against Meshy's documented API that has never run, because there is no paid Meshy plan or key in the execution environment. The demo shows the pipeline and an empty state, not a placeholder model.

## Decisions worth recording

**ProofWall stays a grid for now.** The carousel variant is built and consumes the real content: by code inspection, reduced motion renders the actual `<ProofWall/>` grid component verbatim (not a re-implementation), and the RTL drag sign-flip mirrors `lib/useHorizontalScroll.ts`'s existing pattern. None of that has been measured through a live browser — `demo/proof-wall-carousel` was never run through the Playwright harness in this environment (see Verification). What it cannot pass here, measured or not, is the plan's own gate: live WebGL context count and an LCP and CLS comparison against the grid, both of which need a real or software GPU. The execution sandbox has neither, confirmed by trying `--use-gl=swiftshader` and getting the same context creation failure. Rather than swap something unverified onto the homepage, the plan's own fallback applies: ship as a demo, keep the grid live, and gate the swap on a real QA pass somewhere with GPU support.

**KayKit is deferred, not faked.** Khronos's assets are plain files on `raw.githubusercontent.com` and could be fetched directly. KayKit's itch.io page is not: the actual download needs a claim click that issues a session scoped token, and scripting that would mean impersonating a browser session against itch.io. The characters demo ships a disabled toggle labelled for it and the attribution file documents the manual drop in path. No stub asset was created to stand in for it.

## Verification

`npm run build` and `npx tsc --noEmit` green after every commit (both re-checked clean at HEAD on this cleanup pass). `npm run lint` is clean on every file this branch added or touched; the bare command still reports 5 pre-existing errors, all in two vendor/tooling files this branch never touched (`public/draco/draco_decoder.js`, `scripts/build-venture-doc.js`) that predate `711f11f` — not a regression, and out of scope to fix here.

Playwright smoke testing (`scripts/qa/effects-qa.mjs`) actually ran only through Phase D — `/en`, `/ar`, `demo`, `demo/magnetic`, `demo/crosshair`, both locales, 32 checks, evidence at `/tmp/muse-evidence/`. It was captured minutes *before* the crosshair commit that both added that route and fixed a harness bug where `/ar`'s always-on noindex read as a robots FAIL; that stale run still shows the pre-fix failure. The carousel, proof-wall-carousel, animation-core, drei, characters and ai-3d routes (Phases E1/E2/B/F/G/H) were added to the harness's route list as each phase landed but the browser matrix itself was never re-run against them in this environment — there is no console/noindex/screenshot evidence for those six routes, only the build/tsc/lint gate and code-level reasoning in each commit message. The one real finding the partial run captured: `WebGLRenderer: Error creating WebGL context` / `Could not create a WebGL context` on every route it touched, including the unmodified `/en` homepage's existing PixelBlast and DitherCursor — a property of this sandbox (no GPU; `--use-gl=swiftshader` fails identically), not something this branch caused. `effects-qa.mjs` tags that exact signature as `knownLimitation` rather than hiding it. Whether the six untested WebGL demos hit only that same signature is a reasonable inference from shared gating code, not something measured — flagged as inference, not evidence.

## Fallbacks and deferrals

- ProofWall production swap, gated on GPU capable QA. See decision above.
- KayKit Adventurers, needs a manual itch.io download. See decision above.
- Live WebGL context counting (the plan's `window.__museGl` counter) was never wired up, despite three phases adding real R3F canvases. `contextCount` stays null in the QA harness. Flagged as a real gap, not quietly dropped.
- An optional Meshy proxy API route was documented in the plan but not built, since there is no key to test it against.

## Update 2026-08-07: acceptance fixes

An independent QA pass on this branch found three real bugs and fixed them, still in this sandbox — none of it is a GPU/WebGL visual pass, see below.

1. **Horizontal overflow on `/en/demo/ai-3d` and `/ar/demo/ai-3d` at 390px.** The `<code>POST https://api.meshy.ai/openapi/v1/image-to-3d</code>` block was one unbroken token with no spaces for the browser to wrap at, so it pushed past the viewport on both locales, both `reducedMotion` states. Fixed with `break-all` on that element in `app/[locale]/demo/ai-3d/page.tsx` — a real word-break, not a scoped `overflow-x` band-aid.
2. **`scripts/qa/effects-qa.mjs`'s known-limitation classifier was too strict.** It required *every* console/page message on a result to match the WebGL-context-failure signature, but every route mounting an R3F `<Canvas>` also logs one unrelated `THREE.THREE.Clock` deprecation warning — so `drei`, `characters` and any other real WebGL route never got tagged, reading as a genuine regression instead of the same sandbox GPU gap already known from Phase D. Fixed by splitting ERROR/PAGEERROR messages (must all match the WebGL patterns) from WARNING messages (must all be that exact Clock deprecation string). `isPass()` is untouched — a `knownLimitation: true` row still fails the harness, it's just labelled accurately now.
3. **The demo layout's noindex banner sat under the fixed `SiteHeader`.** `SiteHeader` is `position: fixed; top: 0`, so it doesn't push content down on its own; the demo layout had no top offset at all, so the "Demo index · Internal effects/3D showcase" banner rendered directly behind the header pill, faintly double-exposed. Measured the header's actual rendered height via `getBoundingClientRect()` — 78px, fixed, identical at 390px and 1440px — and added `pt-24` (96px, an 18px gap) to the demo layout's wrapper in `app/[locale]/demo/layout.tsx`, documented inline with the measured number rather than a negative-margin nudge.

Re-verified after the fixes, all in this same GPU-less sandbox: `npm run build`, `npx tsc --noEmit`, and scoped `eslint` on the three changed files (`app/[locale]/demo/ai-3d/page.tsx`, `app/[locale]/demo/layout.tsx`, `scripts/qa/effects-qa.mjs`) all clean. Full-repo `npx eslint .` still reports only the same 5 pre-existing errors in `public/draco/draco_decoder.js` and `scripts/build-venture-doc.js` from before this branch — unrelated to anything touched here. Ran the full `scripts/qa/effects-qa.mjs` matrix against a real `npm run build && npm start` production server (not `next dev`, which was adding its own unrelated hydration/reduced-motion console noise): 24 failing checks, all 24 now correctly tagged `knownLimitation` (the sandbox's WebGL gap), 0 genuine failures. That is a console/overflow/noindex/screenshot pass in a GPU-less container, not the GPU-backed live-WebGL-context-count or LCP/CLS comparison the plan's own gate still requires — those still need the "Next gate" below. ProofWall stays the production grid, KayKit acquisition is still manual/deferred, and Meshy still has not run — none of that changed here.

## Next gate

Independent QA on a machine or CI runner with real or software GPU support: the full `scripts/qa/effects-qa.mjs` matrix with real WebGL (so the currently-`knownLimitation`-tagged rows get an actual pass/fail signal), an LCP and CLS comparison for the ProofWall swap, and a visual pass on the R3F carousel's RTL drag direction.
