# Effects & 3D — Implementation Report

**Branch:** `direction/3-the-proof`
**Executed by:** Sonnet, against `docs/effects-3d-implementation-plan.md` (Opus).
**Date:** 2026-08-07

Nine build-gated commits, `docs/effects-3d-implementation-plan.md`'s Phase A → H plus the docs pass in Phase I (this report). `main` was never touched, nothing was pushed, no PR opened.

```
bfa764c feat(effects): Lenis smooth-scroll runtime + noindex demo scaffold      (A)
b7d8009 feat(effects): Magnetic hover-pull wrapper + demo                      (C)
23278b2 feat(effects): global SVG CrosshairCursor + demo                       (D)
5260070 feat(effects): R3FCarousel (wave carousel) + demo                      (E1)
30a9322 feat(home): ProofWallCarousel variant, homepage swap deferred          (E2)
266eede feat(demo): animation-core — GSAP free plugins + Lenis proof           (B)
04b1944 feat(demo): drei showcase (glass, sparkles, float, presentation, environment) (F)
d586907 feat(demo): 3D characters — Khronos Fox/CesiumMan/RiggedSimple         (G)
3ed086d feat(demo): Meshy AI-3D pipeline + honest empty-state demo             (H)
```

45 files changed, 2963 insertions, 34 deletions across the range (`git diff --shortstat 711f11f..HEAD`).

---

## Phase A — Core infra + noindex demo scaffold (`bfa764c`)

`lenis@1.3.26` added (only new runtime dependency; `THIRD-PARTY-LICENSES.md` gets its first entry). `components/SmoothScrollProvider.tsx` wires Lenis into `gsap.ticker` — not its own `requestAnimationFrame` loop — so the existing `WordReveal.tsx` `ScrollTrigger` usage reads the smoothed position without any change to that component. `app/[locale]/demo/layout.tsx` sets per-page `robots: noindex`; `app/robots.ts` additionally disallows `/${locale}/demo/` for both locales, so the tree is blocked from both indexing and crawl budget. `scripts/qa/effects-qa.mjs` lands as a skeleton (2 routes) that every later phase extends.

**Verification:** `npm run build` green, `npx tsc --noEmit` clean, `npm run lint` clean on every file this commit touched.

---

## Phase C — Magnetic (`b7d8009`)

`components/effects/Magnetic.tsx` is a `motion.span` wrapper (pointer-offset tracking + spring via `motion`, already a dependency — no new package), not a replacement button, so wrapping `<PillButton>`/`<Link>` in it changes zero DOM semantics or `href`s. Gated to `(pointer:fine)` and off under `usePrefersReducedMotion()`. Wired to production on `Hero.tsx`'s contact link and `CTA.tsx`'s closing `PillButton`. Demo at `demo/magnetic`.

**Verification:** build/tsc/lint clean.

---

## Phase D — CrosshairCursor (`23278b2`)

`components/effects/CrosshairCursor.tsx` is pure SVG/DOM — a corner-bracket reticle that locks onto hovered interactive elements — zero WebGL contexts. `pointer-events-none` throughout; `(pointer:fine)` only; off under reduced motion. Mounted once, globally, in `app/[locale]/layout.tsx`. The closing CTA panel already runs its own `DitherCursor`; it opts out of the global crosshair via a `[data-no-crosshair]` attribute on `CTA.tsx` so the two pointer effects don't fight. Demo at `demo/crosshair`.

This is also where the sandbox's WebGL limitation was first observed and where the QA harness picked up its `knownLimitation` classification (see Verification section below) and its `/ar` noindex fix — before this commit, `/ar` was listed as `{ noindex: false }` in `ROUTES`, which is wrong: `/ar` is an unpublished locale (`i18n/routing.ts`'s `PUBLISHED_LOCALES = ["en"]`) and is `noindex` on every route, demo or not. This commit corrected it to `{ noindex: true }` with an explanatory comment.

**Verification:** build/tsc/lint clean.

---

## Phase E1 — R3FCarousel (`5260070`)

`components/effects/R3FCarousel.tsx` + `R3FCarouselScene.tsx` + `r3fCarouselShaders.ts` port colindmg/r3f-experimental-carousel's (MIT) wave-distortion carousel: the GLSL curve/skew shader and per-plane modulo-wrap infinite loop are upstream's, restructured to take an arbitrary image list and textured with `public/photos/*` instead of upstream's Midjourney demo images. Driven by local drag + a scoped wheel gesture with an RTL sign-flip (the same idea as `lib/useHorizontalScroll.ts`), not upstream's page-level Lenis scroll velocity, because this is a section component, not the whole page. Intersection-gated mount/dispose (the `DitherCursor` pattern), DPR capped at 2, real `<img>` strip fallback under reduced motion (no canvas). Demo at `demo/carousel`.

**Verification:** build/tsc/lint clean.

---

## Phase E2 — ProofWallCarousel, homepage swap deferred (`30a9322`)

`components/sections/ProofWallCarousel.tsx` reuses `R3FCarouselScene` (which gained an optional `content` prop for this; E1's plain-photo demo is unaffected) to build the production-shaped variant: the same `Home.proofWall.items` i18n content contract the live grid consumes, case-study text anchored to each plane through drei's `<Html transform>` — real DOM, not canvas glyphs, so a11y, SEO, and Arabic bidi are unaffected (plan §11 R-2/R-4). Reduced motion renders the actual `<ProofWall/>` grid component, not a re-implementation of it. Demo at `demo/proof-wall-carousel`.

**Not wired into `HomeSections.tsx`.** The plan's own gate for this swap — live WebGL context count and an LCP/CLS comparison against the grid — needs a real or software GPU. This sandbox's Chromium cannot create a WebGL context even with `--use-gl=swiftshader` (same failure reproduced on the unmodified `/en` homepage — see Verification). Per the plan's own instruction for exactly this case, the carousel ships as a demo only; the grid stays live; the swap is a one-line, reversible import at `HomeSections.tsx:48` once that QA can run somewhere with GPU support.

**Verification:** build/tsc/lint clean. The GPU-dependent gate itself is unmet, by design — recorded as an open gate, not a passed check.

---

## Phase B — animation-core demo (`266eede`)

`app/[locale]/demo/animation-core/AnimationCoreDemo.tsx` proves the GSAP bonus plugins verified present in `node_modules/gsap/dist/` (`SplitText.js`, `Flip.js`) actually resolve and run in a real build, reading Lenis's smoothed scroll position via Phase A's `SmoothScrollProvider`: a `SplitText` word/char reveal, a `Flip` grid↔list layout swap, and a `ScrollTrigger` pin/scrub panel. Each section falls back to static content under reduced motion independently.

This phase also fixed a real build break: GSAP's own `types/index.d.ts` references `flip.d.ts` (lowercase) while the only subpath that resolves `Flip` at runtime is `gsap/Flip` (capitalized, matching `Flip.js` on disk) — an upstream packaging inconsistency, not a casing bug in this repo's own source. `tsconfig.json` sets `forceConsistentCasingInFileNames: false` to work around it; a full `tsc --noEmit` pass confirmed no other findings, so the flag isn't masking anything of ours.

**Verification:** build/tsc/lint clean (this is the commit that added the `tsconfig.json` change described above, itself gated by a full clean `tsc --noEmit`).

---

## Phase F — drei showcase (`04b1944`)

`app/[locale]/demo/drei/DreiDemo.tsx` + `DreiDemoScene.tsx`: a curated 5-of-~13 slice of drei (plan §8 defers the rest) — `MeshTransmissionMaterial` glass torus knot, `Sparkles`, `Float`, drag-to-orbit `PresentationControls`, and `Environment` lit procedurally via `Lightformer` children rather than a preset/HDRI file. drei's presets hotlink to a public CDN and this repo's CSP (`connect-src 'self' blob:`) doesn't allow external hosts, so a preset would just be a blocked fetch and flat glass — the procedural lighting is a deliberate CSP-compatibility choice, not a simplification for its own sake. One R3F canvas, intersection-gated, DPR ≤ 2, static message under reduced motion instead of the animated scene.

**Verification:** build/tsc/lint clean.

---

## Phase G — 3D characters (`d586907`)

Three real, verbatim glTF-Sample-Assets models from `KhronosGroup/glTF-Sample-Assets` — Fox, CesiumMan, RiggedSimple — committed under `public/models/khronos/`, each with its own upstream `LICENSE.md`/`README.md` plus a repo-level `public/models/khronos/ATTRIBUTION.md` (54 lines) crediting PixelMannen/tomkranis/Asobo/scurest (Fox) and Cesium (CesiumMan, RiggedSimple; CC-BY 4.0 with a trademark limitation on the Cesium name/logo). `app/[locale]/demo/characters/CharactersScene.tsx` auto-fits each model to a consistent on-screen height despite wildly different native scales, loops the first animation, and reuses the same procedural `Lightformer` lighting as the Phase F drei demo (no external HDRI fetch). Demo at `demo/characters`.

**KayKit Adventurers — the plan's L4 primary stylized-character direction — is not committed.** Khronos's assets are plain files on `raw.githubusercontent.com`; KayKit's itch.io page sits behind a claim/checkout click that issues a session-scoped download token, which isn't scriptable without impersonating a browser session against itch.io (plan §11 R-8, called out in advance). The demo ships a disabled "KayKit — deferred" toggle; `ATTRIBUTION.md` documents the manual drop-in path. No stub or placeholder asset stands in for it. Khronos's **BrainStem** model, named in the plan's L4 but blocked by its Poser EULA (no redistribution rights), was correctly never fetched — three models are committed, not four.

This commit also extended `scripts/qa/effects-qa.mjs` with the `isKnownEnvironmentLimitation()` classifier described in the Verification section below.

**Verification:** build/tsc/lint clean.

---

## Phase H — Meshy AI-3D (`3ed086d`)

`scripts/ai-3d/meshy-generate.mjs` is a real, runnable REST client against Meshy's documented Image-to-3D API (create task → poll → download `.glb`), written against `docs.meshy.ai`'s actual request/response shape. **It has never run** — there is no `MESHY_API_KEY` in this environment (needs a paid plan, plan §11 R-6) — and nothing was faked to fill that gap. `app/[locale]/demo/ai-3d/page.tsx` lists `public/models/ai/*.glb` at request time and renders a real viewer if one exists, or today, an honest empty state explaining why generation is blocked, the pipeline's exact steps, and TRELLIS/TripoSR documented as MIT alternatives per L3 — both undocumented as *installed*, since neither has a GPU to run on here either. `public/models/ai/` currently holds only a `README.md`; no `.glb` is committed. The optional Meshy proxy API route the plan mentioned was not built, for the same missing-key reason.

**Verification:** build/tsc/lint clean.

---

## Verification, in full — what was actually run and when

**`npm run build` and `npx tsc --noEmit`:** green after every one of the nine commits above, and both re-checked clean at `HEAD` on this cleanup pass (2026-08-07). The build's route table lists all 8 demo pages (`magnetic`, `crosshair`, `carousel`, `proof-wall-carousel`, `animation-core`, `drei`, `characters`, `ai-3d`) plus `demo` itself, prerendered for both `en` and `ar`.

**`npm run lint`:** clean on every file this branch added or touched, verified both per-commit and, on this cleanup pass, by running `eslint` scoped to the full `711f11f..HEAD` diff. The bare `npm run lint` command still exits non-zero — 5 errors, 97 warnings — entirely inside two files this branch never touched: `public/draco/draco_decoder.js` (a vendored, minified third-party decoder — `no-require-imports`/`no-assign-module-variable`) and `scripts/build-venture-doc.js` (an unrelated docs-tooling script — `no-require-imports`). Both predate `711f11f` and were already lint-failing before this plan's Phase A started; not a regression, and fixing unrelated vendored/legacy files is out of this plan's scope.

**Playwright smoke testing (`scripts/qa/effects-qa.mjs`) — only partially run, and the partial run is stale.** The harness's `ROUTES` list has grown to 20 entries (10 routes × 2 locales) covering every demo page plus `/en`/`/ar`, and correctly treats `/ar` as always-`noindex` (it's an unpublished locale serving English copy under Arabic chrome per `i18n/routing.ts`'s `PUBLISHED_LOCALES`, not a regression to flag). But the harness has only actually been *executed* once in this environment, captured at `/tmp/muse-evidence/effects-qa-results.json` — 32 checks across `/en`, `/ar`, `demo`, `demo/magnetic`, `demo/crosshair` (both locales × 2 viewports × reduced-motion on/off). That run's timestamp (12:05) sits *before* the Phase D commit (`23278b2`, 12:06:29) that both added the `crosshair` route to the script and fixed the `/ar`-noindex bug described above — so the evidence file itself still shows the pre-fix state, where all four `/ar` rows read `robots: FAIL`. That is a since-fixed harness bug, not a live regression.

The carousel, proof-wall-carousel, animation-core, drei, characters, and ai-3d routes (Phases E1/E2/B/F/G/H) were added to the route list as each phase landed, but the browser matrix was never re-run against them here — there is no console-error, noindex, overflow, or screenshot evidence for those six routes, only the build/tsc/lint gate and the code-level reasoning documented per phase above. This report does not claim otherwise.

**The one substantive finding the partial run did capture is real and reproducible:** every route it touched, including the completely unmodified `/en` homepage, logs `THREE.WebGLRenderer: Error creating WebGL context` / `Could not create a WebGL context` from the existing `PixelBlast`/`DitherCursor` surfaces. This is a property of the sandbox — no GPU, and `--use-gl=swiftshader` fails identically — not something any phase in this plan introduced. `isKnownEnvironmentLimitation()` in `effects-qa.mjs` tags results whose *only* console/page errors match that exact signature so a future full run can distinguish "known sandbox limitation" from a genuine regression; it still counts as a failure in `isPass()`, it's just labeled. Whether the six untested WebGL demos hit only that same signature and nothing else is a reasonable inference from shared gating code (all of them follow the `DitherCursor` intersection-gate/DPR-cap/dispose pattern per plan §2), not a measured fact — flagged here as an inference, not evidence.

---

## Phase I — QA acceptance fixes (2026-08-07)

An independent QA pass on this branch (still in this GPU-less sandbox — see Verification above) found three real bugs in what Phases A–H shipped, distinct from the "never re-run against six routes" gap already recorded above:

1. **Genuine horizontal overflow, `/en/demo/ai-3d` and `/ar/demo/ai-3d` at 390px, both `reducedMotion` states.** `app/[locale]/demo/ai-3d/page.tsx`'s `<code>POST https://api.meshy.ai/openapi/v1/image-to-3d</code>` block is one unbroken token with no spaces for the browser to break at, so it pushed 20px past the 390px viewport (`scrollWidth: 410` measured directly). Fixed with `break-all` on that one element — a real word-break at the overflow's root cause, not a scoped `overflow-x` hide.
2. **`effects-qa.mjs`'s `isKnownEnvironmentLimitation()` was too strict** — it required *every* console/page message to match the WebGL-context-failure patterns, but every route mounting an R3F `<Canvas>` (drei, characters, and by inference carousel/proof-wall-carousel) also logs one unrelated `THREE.THREE.Clock` deprecation warning from three.js/R3F itself. That one extra warning meant `messages.every(…)` failed and those routes read as genuine regressions instead of the same known sandbox GPU gap. Fixed by splitting ERROR/PAGEERROR messages (must all still match the WebGL patterns) from WARNING messages (must all equal the exact Clock deprecation string, checked verbatim, not by pattern). `isPass()` is unchanged — a `knownLimitation: true` row still fails the harness overall, it is only labeled more accurately now.
3. **The demo layout's noindex banner rendered under the fixed `SiteHeader`.** `SiteHeader` (`components/SiteHeader.tsx`) is `position: fixed; top: 0`, so it does not push page content down by itself, and `app/[locale]/demo/layout.tsx` had no top offset — the "Demo index · Internal effects/3D showcase" banner sat directly behind the header pill, producing the faint doubled text reported. Measured the header's real rendered height with Playwright's `getBoundingClientRect()` rather than guessing: 78px, `position: fixed`, `z-index: 50`, identical at 390px and 1440px (it only widens on scroll, never grows taller). Added `pt-24` (96px — the measured 78px plus an 18px gap) to the demo layout's wrapper, with the exact measurement recorded in a comment, instead of a negative-margin nudge.

**Re-verification, all in this same sandbox:** `npm run build` green; `npx tsc --noEmit` clean; `eslint` scoped to the three changed files (`app/[locale]/demo/ai-3d/page.tsx`, `app/[locale]/demo/layout.tsx`, `scripts/qa/effects-qa.mjs`) clean. Full-repo `npx eslint .` still reports exactly the same 5 pre-existing errors in `public/draco/draco_decoder.js` and `scripts/build-venture-doc.js` described above — untouched by this pass, not a regression. `scripts/qa/effects-qa.mjs` run against a real `npm run build && npm start` production server (not `next dev`, which was independently generating unrelated hydration/reduced-motion console noise on `/en`, `/ar`, and `demo/proof-wall-carousel` that does not reproduce in production): 24 failing checks, **all 24 now correctly tagged `knownLimitation`, 0 genuine failures.** That is a console/overflow/noindex/screenshot pass with a real production server in a GPU-less container — it is still not the GPU-backed live-WebGL-context-count or LCP/CLS comparison the plan's own §10-4 gate requires, and it does not extend coverage to the six routes Phases A–D's evidence never touched (see Verification above). ProofWall stays the production grid, KayKit acquisition is still manual/deferred, and Meshy still has not been run — this pass fixed real bugs in the QA surface, it did not change any of those three decisions.

---

## Deferred / not built, explicit

- **ProofWall production swap** (Phase E2) — built, demoed, gated on a GPU-capable QA run this environment cannot perform. See Phase E2 above.
- **KayKit Adventurers** (Phase G) — needs a manual itch.io download; disabled toggle + documented drop-in path shipped instead. See Phase G above.
- **Live WebGL context counting** — the plan's `window.__museGl` counter (lifted from `archive/components/playground/GlContextMeter.tsx`) was never wired up, despite three phases (E1/F/G) adding real R3F canvases. `contextCount` stays `null` on every `effects-qa.mjs` result. A real gap in this plan's own §10-4 acceptance criterion, not quietly dropped from the plan.
- **Optional Meshy proxy API route** (Phase H) — documented, not built; no key exists to test it against.
- **GPU-backed QA** — Phase I (above) ran the full 20-route `effects-qa.mjs` matrix against a real production server and got a console/overflow/noindex/screenshot pass, with every WebGL-route failure correctly classified as the sandbox's known GPU gap rather than a genuine regression. That is still not a *live* WebGL context count or a visual GPU render check — every `knownLimitation: true` row remains untested, not passing, exactly as `isPass()` still marks it.

## Next gate

Independent QA on a machine or CI runner with real or software GPU support: re-run the full `scripts/qa/effects-qa.mjs` matrix there so the 24 `knownLimitation` rows finally get a real pass/fail signal instead of a classification, an LCP/CLS comparison for the ProofWall swap, and a visual pass on the R3F carousel's RTL drag direction. Wire the `window.__museGl` context counter before relying on this harness for the plan's §10-4 WebGL-budget check.
