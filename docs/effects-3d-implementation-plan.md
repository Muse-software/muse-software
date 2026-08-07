# Effects & 3D — Implementation Plan

> **Scope of this document.** This is the *Plan* half of the repo's Brief/Plan/Report
> convention (see `docs/structure-implementation-plan.md` for the pattern). It refines
> the source plan at `~/.hermes/plans/2026-08-06_muse-comprehensive-implementation.md`
> against the *actual* state of this repository on branch `direction/3-the-proof`
> (verified 2026-08-07). A matching `docs/effects-3d-implementation-report.md` is
> produced at the end of execution.
>
> **This planning pass writes no production code.** The only artifact committed now is
> this document. Every "Phase" below is future execution work with its own build gate
> and commit boundary.

---

## 0. Mission & locked decisions

**Mission.** Extend the existing Muse Next.js 16 / React 19 / R3F stack with a small set
of *production* effects and a broader set of *demo-only* effect/3D showcases, using real
upstream source with preserved licenses — a coherent working showcase, not an inspiration
gallery. Never ship a red build; QA every locale and viewport.

**Locked decisions (authoritative — this plan is built around them):**

| # | Decision | How this plan honours it |
|---|---|---|
| L1 | **Production effects:** MagneticButton on CTAs, R3FCarousel as ProofWall, CrosshairCursor globally. | Phases C, D, E. Everything else is demo-only. |
| L2 | All other effects are **demo-only**. | Phases B, F, G, H live under `/[locale]/demo/*` and are `noindex`. |
| L3 | AI 3D uses **Meshy API only**. Document TRELLIS & TripoSR; do **not** install locally. | Phase H: Meshy script + pre-generated sample; TRELLIS/TripoSR documented in the ledger, never installed. |
| L4 | **KayKit** is the primary stylized-character direction. Khronos Fox / CesiumMan / BrainStem / RiggedSimple are demos/testing. | Phase G. **Correction:** BrainStem is dropped — its license forbids redistribution (see §6 & §7). |
| L5 | **Skip Theatre.js.** Use GSAP ScrollTrigger + Lenis. | No `@theatre/*`. Phase A adds Lenis; ScrollTrigger already ships. |
| L6 | Demos live at `app/[locale]/demo/*` and must be **noindex**. | Phase A adds `app/[locale]/demo/layout.tsx` (robots noindex) + `robots.ts` disallow. |
| L7 | Existing `PixelBlast.tsx`, `DitherField.tsx`, `PageDither.tsx` work — **don't duplicate or break them**. | No changes to those files. New shaders/materials are additive. §2 documents the context budget they consume. |
| L8 | Use **actual source repos/assets**; preserve licenses/attribution. No stubs masquerading as ports. | §6 ledger with verified licenses; attribution files committed alongside assets. |
| L9 | Keep scope **achievable**; defer excess. | §8 defers the long tail (11 unused Codrops effects, full 13-component drei library, Splitting.js, lygia submodule). |
| L10 | **Never a red build.** Independent `npm run build` gate after each phase. | Every phase ends with a build gate (§5) and a commit boundary (§9). |
| L11 | QA `/en`, `/ar`, and every new demo at 1440×900 and 390×844: console errors, overflow, screenshots. | §10 QA matrix + Playwright harness (browsers already cached). |
| L12 | Update project docs + Muse Vault; evidence under `/tmp/muse-evidence`, screenshots under `/tmp/muse-qa-screenshots`. | Phase I. |

---

## 1. Verified repository baseline (what is actually here on 2026-08-07)

Everything below was confirmed by direct inspection, not assumed.

**Stack (`package.json`).** Next.js `16.1.6`, React `19.2.3`, `@react-three/fiber ^9.7.0`,
`@react-three/drei ^10.7.7`, `@react-three/postprocessing ^3.0.4`, `postprocessing ^6.39.4`,
`three ^0.183.2`, `gsap ^3.13.0` (resolved **3.14.2** on disk), `motion ^12.35.2`, `maath`,
`three-stdlib`, `next-intl ^4.13.4`, Tailwind v4. Dev: `playwright ^1.58.2`.

**Already installed / usable — do NOT reinstall:**
- **GSAP 3.14.2** with **all bonus plugins physically present** in `node_modules/gsap/dist/`
  (`SplitText.js`, `Flip.js`, `ScrollSmoother.js`, `MorphSVGPlugin.js`, `Observer.js`,
  `Draggable.js`, `ScrollTrigger.js`). Subpath imports resolve via the `"./*"` wildcard in
  gsap's `exports` map — verified `require.resolve('gsap/SplitText')` → `dist/SplitText.js`.
  GSAP has been 100% free (incl. commercial) since Webflow's Apr 2025 change (§6).
  **`import { ScrollTrigger } from "gsap/ScrollTrigger"` already builds** (used by `WordReveal.tsx`).
- **Playwright 1.58.2** with chromium already in `~/Library/Caches/ms-playwright`
  (chromium-1234 + headless shell). **No `npx playwright install` needed** for QA.
- **DRACO decoder present** at `public/draco/draco_decoder.js`; CSP already allows the Draco
  worker (`worker-src 'self' blob:`). `public/models/computers.glb` exists (archived hero).
- **Real photo assets** at `public/photos/*` (8 images: `cover-neon-city.jpg`,
  `cover-orange-blur.jpg`, `cover-red-light-figure.jpg`, `hero-group-silhouette.jpg`,
  `hero-silhouette-sunset.jpg`, `pillar-ai-transformation.jpg`, `pillar-gamification.jpg`,
  `pillar-product-engineering.jpg`) — **usable as carousel textures**, no new assets required.

**NOT installed (must add only what's listed):** `lenis`, `splitting`, `@theatre/*`.
Only **`lenis`** is added by this plan (Phase A). `splitting` and Theatre are **rejected** (§8).

**Existing effect infrastructure (L7 — reuse, don't break):**
- `components/PixelBlast.tsx` (+ `pixelBlastShader.ts`) — raw three.js (not R3F) full-screen
  Bayer-dither FBM field. Reduced-motion via `useSyncExternalStore`; DPR capped 2.0;
  ResizeObserver; idempotent context teardown with `forceContextLoss()`.
- `components/DitherField.tsx`, `PageDither.tsx`, `CardDither.tsx` — all mount PixelBlast via
  `dynamic(() => import("./PixelBlast"), { ssr:false })`. PageDither & CardDither use a
  **single fixed viewport-sized canvas with a moving CSS mask** (the pooling pattern to copy).
- `components/DitherCursor.tsx` → `DitherCursorScene.tsx` — the **only live R3F `<Canvas>`** today.
  DitherCursor gates the mount behind `IntersectionObserver` (50% margin) **and** a desktop
  check (`DitherCursor.tsx:70–81`) so idle contexts never exist on mobile/offscreen.
  **This is the exact gating pattern the new R3F carousel and character demos must reuse.**
- `components/Glossy3D.tsx` — raw three.js orb with a CSS fallback on WebGL failure.
- Text/motion helpers: `WordReveal.tsx` (**GSAP ScrollTrigger**, RTL-aware word split,
  reduced-motion aware), `RotatingText.tsx` (`motion`), `Ticker.tsx`/`OutlineTrack.tsx` (CSS).
- **Centralized reduced-motion hook:** `lib/use-media-query.ts` → `usePrefersReducedMotion()`.
  New components standardize on this (or `motion/react`'s `useReducedMotion()` inside motion trees).

**Archived precedents (in `archive/`, excluded from `tsconfig`):**
`archive/components/hero3d/*` (a full R3F monitor-wall hero: `useComputersModel.ts`,
`MonitorsScene.tsx`, `PixelBlastScreen.tsx`) — the DRACO/CSP notes in `next.config.ts:16–32`
describe *that* archived feature; it is **not live today**. `archive/components/playground/GlContextMeter.tsx`
is a **live-WebGL-context counter** — lift it into the QA harness (§10).

**Routing / i18n / SEO (grounding for demos + production wiring):**
- `i18n/routing.ts`: locales `["ar","en"]`, **default `ar`**, `localePrefix:"always"`.
  `PUBLISHED_LOCALES = ["en"]` — **`/ar` renders English copy under Arabic chrome** and is
  `noindex` until the content programme lands. **Implication for QA:** `/ar` testing is about
  **RTL layout**, not translation correctness.
- `app/[locale]/layout.tsx`: root layout sets `<html lang dir={localeDirection[locale]}>`
  (line 97). Provider tree is `NextIntlClientProvider` (106) → skip-link → `<PageLoader/>` (110)
  → `<SiteHeader/>` (122) → `<main id="main-content">` (123–125) → `<Footer/>` (126).
  **New global providers/cursor wrap inside `NextIntlClientProvider`.**
- `lib/seo.ts` `buildMetadata()` injects `robots:{index:false,follow:false}` for unpublished
  locales (line 104). **The demo noindex mechanism mirrors this** but via a route-group layout
  so it is locale-independent.
- `app/robots.ts` — currently `allow:"/"`, `disallow:"/api/"`. Demos must be added.
- `app/sitemap.ts` — a **static hand-authored list**; demos are absent by construction (verify no leak).
- Fonts (`lib/fonts.ts`): brand type is **Space Grotesk** (`.font-space-grotesk`) with IBM Plex
  Arabic fallback for AR glyphs. New components use `font-space-grotesk` (consistent with repo).

**Homepage composition (`components/sections/HomeSections.tsx`):**
`PageDither → Hero → ProofWall(48) → ThreeDoors → Manifesto → OutcomesBand → Ticker → FAQ → CTA`.
Production integration points:
- **MagneticButton (L1):** Hero contact CTA is a `<Link href="/contact">` at `Hero.tsx:108–117`;
  the closing CTA uses `<PillButton href="/get-started">` at `CTA.tsx:68–70`. **Both are
  links/anchors, not `<button>`s** — see §3.C.
- **R3FCarousel (L1):** `ProofWall` is a **motion grid of textual case-study cards** built from
  `t.raw("Home.proofWall.items")` (category/title/body/tags/link). Swap site is `HomeSections.tsx:48`.
- **CrosshairCursor (L1):** global mount goes in `layout.tsx` inside `NextIntlClientProvider`, above `<main>`.
  Note the closing CTA **already mounts `DitherCursor`** (`CTA.tsx:43`) — coexistence handled in §3.D.

---

## 2. The WebGL context budget (the central performance constraint)

Browsers cap simultaneous live WebGL contexts (~8–16, then the oldest is dropped). The site
already runs several. **Homepage today (`/en`, desktop):**

| Surface | Renderer | Lifecycle |
|---|---|---|
| PageDither (page wash) | raw three.js | always mounted (1 fixed masked canvas) |
| Hero PixelBlast | raw three.js | always mounted |
| CTA DitherCursor | R3F `<Canvas>` | mounted only near-viewport + desktop |
| **≈ 3 concurrent on the homepage** | | |

**Net-new production contexts:**
- **CrosshairCursor → 0 WebGL contexts.** Verified: `codrops/CrosshairDistortion` is **SVG/DOM**,
  not WebGL. This removes the biggest budget worry.
- **R3FCarousel (ProofWall) → +1 R3F context**, and only while the ProofWall section is
  near-viewport (intersection-gated, per the DitherCursor pattern). Homepage peak ≈ **4** — safely
  under budget, but it must be **measured**, not assumed (QA counts live contexts via GlContextMeter).

**Rules for all new WebGL surfaces (non-negotiable):**
1. `dynamic(() => import(...), { ssr:false })` — never SSR a canvas.
2. Intersection-gate the mount (`DitherCursor.tsx:70–81` pattern); unmount when offscreen.
3. DPR capped at 2.0.
4. Idempotent teardown (`renderer.dispose()`, geometries/materials, `forceContextLoss()`).
5. Reduced-motion → render a single static frame or the DOM fallback; no rAF loop.
6. Prefer non-WebGL where the effect allows (the crosshair is the model: pure SVG).

---

## 3. Production effects (L1) — precise designs

Each production effect ships as **(1) an isolated component**, **(2) a noindex demo**, and
**(3) a gated production wiring** that is trivially reversible (this branch's homepage direction
is not yet finalized — see §11 R-1).

### 3.C — MagneticButton → a `Magnetic` *wrapper* (source: codrops/MagneticButtons, MIT)

**Correction to the source plan.** The source plan ships `MagneticButton` as a `motion.button`.
Our CTAs are `<Link>`/`<PillButton>` (anchors). A `<button>` would change semantics and lose the
existing hover/RTL styling. **Ship a wrapper instead:**

- `components/effects/Magnetic.tsx` — a `motion.span` (`inline-block`) that translates toward the
  pointer using `useMotionValue` + `useSpring` (both from `motion`, already installed — no new dep),
  wrapping arbitrary `children`. Props: `strength` (default 0.3), `radius`, `className`.
- Gating: `usePrefersReducedMotion()` → no transform; `(pointer:fine)` only (skip touch);
  direction-agnostic (works in RTL unchanged).
- Usage keeps semantics intact: `<Magnetic><PillButton .../></Magnetic>` and
  `<Magnetic><Link href="/contact" .../></Magnetic>`.

**Demo:** `app/[locale]/demo/magnetic/page.tsx`.
**Production wiring (gated):** `Hero.tsx:108–117` (contact CTA) and `CTA.tsx:68–70` (get-started
PillButton). Optionally the get-started/contact form submit buttons. DOM/semantics unchanged.

### 3.D — CrosshairCursor, global (source: codrops/CrosshairDistortion, MIT — SVG/DOM)

- `components/effects/CrosshairCursor.tsx` — full-screen **SVG** crosshair following the pointer,
  distorting over hover targets. `position:fixed`, `pointer-events-none`, high-but-below-nav z-index.
- Gating: mounted via `dynamic(ssr:false)`; **desktop `(pointer:fine)` only**; `usePrefersReducedMotion()`
  → not mounted. Add a `[data-no-crosshair]` opt-out attribute honoured by the component.
- **Coexistence with the CTA's `DitherCursor`** (`CTA.tsx:43`): mark the CTA panel
  `[data-no-crosshair]` (or reduce crosshair opacity within it) so the two pointer effects don't
  fight. Both listen on `window`; confirm no duplicated-listener jank in QA.
- **RTL:** direction-agnostic (follows the physical pointer).

**Demo:** `app/[locale]/demo/crosshair/page.tsx`.
**Production wiring (gated):** mount once in `layout.tsx` inside `NextIntlClientProvider`, above `<main>`.

### 3.E — R3FCarousel → ProofWall variant (source: colindmg/r3f-experimental-carousel, MIT) — **highest risk, staged**

The colindmg technique is a **wavy infinite carousel: R3F + a GLSL wave-distortion shader**, drag/scroll
driven (MIT-licensed; its demo images were Midjourney — we use our own `public/photos/*`). Porting it
to the *production* ProofWall is the riskiest change in this plan because ProofWall is **real indexed
content** (case-study text), on the homepage, in two directions of layout.

**Staged approach:**
- **E1 — `components/effects/R3FCarousel.tsx` (component + demo).** Port the wave-plane carousel:
  R3F `<Canvas>`, image planes textured from `public/photos/*`, shader wave distortion, drag +
  wheel + (optional) Lenis-synced scroll. **RTL-aware** drag/scroll sign (mirror the `inlineSign()`
  idea already in `lib/useHorizontalScroll.ts`). Intersection-gated mount, DPR≤2, correct dispose.
  Demo at `app/[locale]/demo/carousel/page.tsx`.
- **E2 — `components/sections/ProofWallCarousel.tsx` (production variant).** Consumes the **same
  i18n content contract** as today's ProofWall (`Home.proofWall.items`). **Text stays in the DOM**
  via drei `<Html>` overlays positioned on the planes (or a DOM overlay synced to plane transforms)
  — this preserves a11y, SEO, and — critically — **correct Arabic bidi**, which WebGL text cannot do
  (see §11 R-4; `next.config.ts:27–32` already documents that troika glyph text was abandoned and OG
  Arabic needs headless Chromium for bidi). **Today's grid is the reduced-motion / no-WebGL / mobile
  fallback**, unchanged.
- **E2 swap (gated):** flip `HomeSections.tsx:48` from `<ProofWall/>` to `<ProofWallCarousel/>` **only
  if** QA passes (LCP/CLS not regressed, live context count ≤ budget, EN/AR parity, a11y, no overflow).
  **If QA fails, ship the carousel as a demo only and keep the grid in production.** The swap is a
  one-line, reversible import change — deliberately, because the homepage direction is not yet locked.

---

## 4. Demo-only effects (L2) — trimmed to an achievable, coherent set

All under `app/[locale]/demo/*`, all `noindex`, all EN+AR. Scope is deliberately trimmed (§8 defers the rest).

- **Phase B — `demo/animation-core`:** proves the runtime — Lenis smooth scroll + a **SplitText**
  reveal + a **Flip** layout animation + a **ScrollTrigger** pin. Doubles as the Phase-0 verification
  that gsap bonus plugins resolve and register in a real build.
- **Phase F — `demo/drei`:** a *curated* drei subset (not all 13): `MeshTransmissionMaterial`
  (glass), `Sparkles`, `Float`, `PresentationControls`, `Environment`. One R3F canvas, intersection-gated.
- **Phase G — `demo/characters`:** KayKit adventurer (CC0) as the hero of the page with an idle
  animation + `PresentationControls`; a toggle to Fox / CesiumMan / RiggedSimple (Khronos, testing).
  gltfjsx-generated components; DRACO already available.
- **Phase H — `demo/ai-3d`:** renders a **pre-generated** Meshy GLB (committed) in R3F; documents the
  live Meshy pipeline (script + optional proxy route) and documents TRELLIS/TripoSR as *not installed*.

---

## 5. Phases, dependencies & the build gate

**Every phase ends with `npm run build` (must be green) before its commit.** In addition, run
`npx tsc --noEmit` and `npm run lint` (matches the repo's existing verification discipline, e.g.
`docs/structure-implementation-report.md`).

| Phase | Title | Depends on | Produces | Ends with |
|---|---|---|---|---|
| **A** | Core infra + noindex demo scaffold | — | Lenis, `SmoothScrollProvider`, `demo/` layout+index, robots disallow, attribution scaffolds, QA harness | build gate |
| **B** | Demo: animation-core (runtime proof) | A | `demo/animation-core` | build gate |
| **C** | Prod: `Magnetic` wrapper + demo + gated wiring | A | `effects/Magnetic`, `demo/magnetic`, Hero/CTA wiring | build gate |
| **D** | Prod: `CrosshairCursor` + demo + gated global mount | A | `effects/CrosshairCursor`, `demo/crosshair`, layout mount | build gate |
| **E1** | `R3FCarousel` component + demo | A | `effects/R3FCarousel`, `demo/carousel` | build gate |
| **E2** | `ProofWallCarousel` variant + gated swap | E1 | `sections/ProofWallCarousel`, gated `HomeSections` swap | build gate |
| **F** | Demo: drei subset | A | `demo/drei`, `components/drei/*` | build gate |
| **G** | Demo: 3D characters (KayKit + Khronos) | A | assets, `components/models/*`, `demo/characters` | build gate |
| **H** | Demo: Meshy AI-3D | A (+G loader) | `scripts/ai-3d/meshy-generate.mjs`, optional `api/meshy`, `demo/ai-3d`, pre-gen GLB, CSP update | build gate |
| **I** | Docs + Vault + full QA + evidence | all | report, Vault updates, QA screenshots/evidence | final build gate |

**Recommended execution order** (production first, per L1's priority on a working showcase):
**A → C → D → E1 → E2 → B → F → G → H → I.** A blocks all; C/D/F/G are mutually independent after A;
E2 depends on E1; H depends on A (and reuses G's loader).

---

## 6. Source & license ledger (L8) — verified 2026-08-07

**Legend:** ✅ clear for stated use · ⚠️ conditions apply · ⛔ blocked.

| Item | Version / source | License | Use | Attribution / notes |
|---|---|---|---|---|
| **lenis** | latest 1.3.x, `github.com/darkroomengineering/lenis` | MIT | prod (smooth scroll) | default export `import Lenis from "lenis"`. ✅ |
| **gsap** (+ bonus plugins) | 3.14.2 (installed) | Free incl. commercial since 2025-04-29 (Webflow) | prod (ScrollTrigger) + demo (SplitText/Flip) | 100% free, on public npm, no token/key. ✅ |
| **colindmg/r3f-experimental-carousel** | `github.com/colindmg/r3f-experimental-carousel` | **MIT** | **prod** (R3FCarousel/ProofWall) | Retain copyright notice. Do **not** reuse its Midjourney images — use `public/photos/*`. ✅ |
| **codrops/MagneticButtons** | `github.com/codrops/MagneticButtons` | **MIT** | **prod** (Magnetic) | Retain copyright notice. ✅ |
| **codrops/CrosshairDistortion** | `github.com/codrops/CrosshairDistortion` | **MIT** | **prod** (CrosshairCursor) | SVG/DOM, no WebGL. Retain copyright notice. ✅ |
| **KayKit — Adventurers** | `kaylousberg.itch.io/kaykit-adventurers` | **CC0** | demo (primary characters) | Free personal+commercial, no attribution required; don't resell unmodified. Record source anyway. **Manual itch.io download** (can't curl). ✅ |
| **Khronos Fox** | glTF-Sample-Assets | CC0 (model) + **CC-BY 4.0** (rig/anim, glTF conv.) | demo/testing | Credit PixelMannen (CC0), tomkranis (CC-BY), Asobo/scurest (CC-BY). ✅ |
| **Khronos CesiumMan** | glTF-Sample-Assets | **CC-BY 4.0 + trademark limitation** | demo/testing | Credit Cesium; must not use the Cesium logo *as a trademark*. ⚠️ |
| **Khronos RiggedSimple** | glTF-Sample-Assets | **CC-BY 4.0** (Cesium) | demo/testing | Credit Cesium. ✅ |
| **Khronos BrainStem** | glTF-Sample-Assets | **Poser EULA** (Smith Micro) | — | ⛔ **DROP.** EULA does not permit redistributing the asset in this repo. Substitute CesiumMan/RiggedSimple or a KayKit rig if a second skinned mesh is needed. |
| **Meshy** (AI 3D) | `docs.meshy.ai` API | Free tier assets **CC-BY 4.0**; Paid (Pro $20/mo) = private/full ownership | demo (pre-gen) + documented pipeline | **API access needs a PAID plan.** Free assets require crediting Meshy. Commercial use also requires rights to the *input image* → feed only Muse-owned imagery. ⚠️ |
| **TRELLIS / TripoSR** | microsoft/TRELLIS, VAST-AI-Research/TripoSR | MIT (code) | **documented only** | Per L3 — **not installed**. Documented as alternatives in `demo/ai-3d` + report. |
| **@react-three/drei, three, @react-three/postprocessing, postprocessing, maath, three-stdlib** | installed | MIT | prod+demo | Already dependencies. ✅ |
| **`public/photos/*`** | in-repo | Muse-owned (assumed) | prod (carousel textures) | Confirm these are cleared for web use before the production carousel swap. ⚠️ |

**Attribution deliverables (committed with the assets):**
- `public/models/kaykit/ATTRIBUTION.md`, `public/models/khronos/ATTRIBUTION.md`,
  `public/models/ai/ATTRIBUTION.md` (Meshy credit for any free-tier GLB).
- Root `THIRD-PARTY-LICENSES.md` aggregating the MIT notices for lenis, colindmg, and the two
  Codrops ports, plus the CC-BY credits above.

---

## 7. Acceptance criteria

**Global (every phase):**
- `npm run build` green; `npx tsc --noEmit` clean; `npm run lint` clean.
- No new duplication of `PixelBlast/DitherField/PageDither` (L7); those files are untouched.
- New WebGL surfaces follow all six §2 rules (SSR-off, intersection-gated, DPR≤2, disposed,
  reduced-motion fallback).
- Every new component uses `usePrefersReducedMotion()` (or `motion/react` inside motion trees).

**Per production effect (C/D/E):**
- **C (Magnetic):** CTAs remain real `<Link>`/anchors (semantics + href unchanged); no transform
  under reduced-motion or touch; keyboard focus/activation unchanged; no layout shift; RTL unchanged.
- **D (CrosshairCursor):** adds **0** WebGL contexts; `pointer-events-none` (never intercepts clicks);
  not mounted on touch or reduced-motion; visibly coexists with the CTA `DitherCursor` (no clash);
  `[data-no-crosshair]` honoured.
- **E (R3FCarousel/ProofWall):** all `Home.proofWall.items` text present in the **DOM** (a11y/SEO);
  Arabic renders with correct bidi (DOM/`<Html>`, not WebGL glyphs); grid fallback identical to today
  under reduced-motion / no-WebGL / mobile; homepage live context count ≤ 5 measured; LCP & CLS not
  regressed vs. the grid; drag/scroll direction correct in RTL. **Swap only if all pass; else demo-only.**

**Per demo (B/F/G/H):** route renders under `/en` and `/ar`; `noindex` present in `<head>`
(`robots: noindex,nofollow`); no console errors; no horizontal overflow at either viewport;
WebGL demos dispose on unmount (navigate away → context count returns to baseline).

**Assets (G/H):** no ⛔ asset committed (no BrainStem); every committed model has an `ATTRIBUTION.md`;
Meshy demo renders from a committed GLB **without** a live API key.

---

## 8. Deferred / rejected scope (L9) — explicit

**Rejected outright:**
- **Theatre.js** (L5) — not installed, not used.
- **Splitting.js** — redundant with GSAP SplitText + existing `WordReveal`/`RotatingText`. No new dep.
- **lygia git submodule** — heavyweight; the only shaders we need (carousel wave, drei materials) are
  small and inline. No submodule.
- **Local TRELLIS / TripoSR install** (L3) — documented only.
- **Khronos BrainStem** — Poser EULA (§6). Dropped.

**Deferred to a future run (documented as backlog, not built now):**
- The 11 unused Codrops effects from the source plan (TheSubstance, HeatDistortion, RainEffect,
  WebGLBlobs, Scroll3DGrid, GooeyHover, AnimatedCursor, ScrollTransitions, StackMotionHover,
  OnScrollTypography, ParticleButton, AnimateShadersGSAP).
- The full **13-component** drei library — trimmed to 5 for `demo/drei` (§4).
- A general `lib/shaders/` GLSL library + `ShaderMaterial` registry — build only the carousel's
  shader now; generalize later if a second consumer appears.
- Live Meshy generation in CI/build — Phase H commits a pre-generated GLB and *documents* the live
  path; wiring live generation into the build is out of scope.

---

## 9. Commit boundaries

**This planning pass — the only commit made now:**
- `docs(effects-3d): repo-grounded effects & 3D implementation plan` — adds this file only.

**Execution commits (future runs), one logical commit per gate:**
1. `feat(effects): Lenis smooth-scroll runtime + noindex demo scaffold` (A)
2. `feat(demo): animation-core — GSAP free plugins + Lenis proof` (B)
3. `feat(effects): Magnetic wrapper + demo` then `feat(home): magnetic CTAs (Hero, closing CTA)` (C — component, then gated wiring)
4. `feat(effects): global SVG CrosshairCursor + demo` then `feat(app): mount CrosshairCursor globally` (D)
5. `feat(effects): R3FCarousel (wave carousel) + demo` (E1)
6. `feat(home): ProofWallCarousel variant + gated swap` (E2 — swap only if QA green)
7. `feat(demo): drei showcase (glass, sparkles, float, presentation, environment)` (F)
8. `feat(demo): 3D characters — KayKit + Khronos (Fox/CesiumMan/RiggedSimple)` (G)
9. `feat(demo): Meshy AI-3D pipeline + pre-generated sample` (+ `chore(csp): allow Meshy API hosts`) (H)
10. `docs(effects-3d): implementation report + QA evidence` + Vault updates (I)

Git identity for all commits: **`alsubaieabdullah` / `abdullah.a.alsubaie@outlook.com`**
(this repo is under `~/Downloads/personal/**`; already configured correctly — verified).

---

## 10. QA matrix & harness (L11, L12)

**Harness.** `scripts/qa/effects-qa.mjs` — Playwright (1.58.2, chromium already cached) driving a
local `npm run build && npm start`. Lift `archive/components/playground/GlContextMeter.tsx`'s
context-counting approach into a `page.evaluate` probe (create a throwaway canvas, read
`WEBGL_lose_context` support / count active contexts heuristically) or track R3F/renderer instances
via a `window.__museGl` debug counter added in dev.

**Routes under test:**
- Production: `/en`, `/ar` (home); `/en/contact`, `/ar/contact`; `/en/get-started`, `/ar/get-started`
  (Magnetic CTAs).
- Demos: `/en/demo` + `/ar/demo` and each of `demo/animation-core`, `demo/magnetic`, `demo/crosshair`,
  `demo/carousel`, `demo/drei`, `demo/characters`, `demo/ai-3d` in **both** locales.

**Viewports:** **1440×900** (desktop) and **390×844** (mobile).

**Per (route × viewport) checks:**
1. **Console:** zero `error`/`warning` (fail on any). Capture full console log.
2. **Overflow:** `document.documentElement.scrollWidth <= clientWidth` (no horizontal scroll).
3. **Reduced motion:** re-run each route with `prefers-reduced-motion: reduce` emulated; confirm the
   fallback renders (no rAF loop, grid fallback for ProofWall, no crosshair, no magnetic transform).
4. **WebGL budget:** on `/en` and `/ar` home + every WebGL demo, assert live context count ≤ 5; after
   navigating away, assert it returns to baseline (no leak).
5. **RTL specifics (`/ar`):** carousel drag/scroll direction correct; crosshair tracks pointer;
   layout not clipped/mirrored-wrong; Arabic text legible (DOM, not WebGL).
6. **noindex (demos):** assert `<meta name="robots" content="noindex,nofollow">` (or header) present.
7. **Screenshot:** full-page PNG saved to `/tmp/muse-qa-screenshots/{locale}__{route}__{vp}.png`.

**LCP/CLS gate (home only):** before/after the E2 swap, compare LCP & CLS (Playwright + web-vitals or
Lighthouse). Swap must not regress either.

**Evidence layout:**
- `/tmp/muse-evidence/` — build logs, `tsc`/lint output, console logs (JSON per route), context-count
  JSON, LCP/CLS before/after, a `SUMMARY.md` pass/fail matrix.
- `/tmp/muse-qa-screenshots/` — all PNGs named `{locale}__{route-slug}__{viewport}.png`.

---

## 11. Risks discovered (candid)

- **R-1 — ProofWall swap vs. an unfinalized homepage direction.** This branch (`direction/3-the-proof`)
  is one of three competing directions; the Vault (`03 Marketing/Website.md`, `09 Journal/2026-08-05…`)
  records that the next decision is "select or synthesize." Replacing the ProofWall preempts that.
  **Mitigation:** the swap is a one-line reversible import at `HomeSections.tsx:48`, gated behind QA,
  with the grid retained as the live fallback. Do **not** delete the grid.
- **R-2 — R3FCarousel as *production* content.** Real case-study text must not disappear into WebGL
  (SEO/a11y/RTL). **Mitigation:** DOM/`<Html>` text overlay + grid fallback; §3.E staging; swap gated.
- **R-3 — WebGL context budget on the homepage.** Adding the carousel takes peak to ~4 (crosshair is
  0). Safe but must be **measured** (§10-4), not assumed. Intersection-gate the carousel mount.
- **R-4 — Arabic bidi in WebGL is unsolved here.** `next.config.ts:27–32` documents that troika glyph
  text and Satori Arabic both fail bidi; Arabic OG is baked via headless Chromium. **Therefore no
  Arabic text is ever rendered inside a canvas** — carousel/labels stay in the DOM.
- **R-5 — CSP is deliberately tight and documented.** Live Meshy calls need `connect-src` to include
  Meshy's API + asset hosts (`next.config.ts:36`). **Mitigation:** the *demo* renders a committed GLB
  and needs **no** CSP change; only the optional live route needs it. Verify exact hosts from
  `docs.meshy.ai` before editing CSP, and re-test the whole site (the CSP protects the 3D hero's
  Draco/blob flows described in the file's own comments).
- **R-6 — Meshy API needs a paid plan + secret key.** `MESHY_API_KEY` is server-only (script or route),
  never in the client bundle. Free-tier output is CC-BY (credit Meshy). Without a key the demo still
  works (pre-generated GLB). Flag the $20/mo cost to Abdullah before any live wiring.
- **R-7 — BrainStem license.** Poser EULA blocks redistribution → dropped from the asset list even
  though L4 named it. Surfaced here explicitly; substitute if a second skinned mesh is needed.
- **R-8 — KayKit acquisition is manual.** itch.io downloads aren't reliably scriptable; the GLB(s) are
  downloaded by hand and committed with CC0 attribution. Plan for a manual step (not a `curl` in a script).
- **R-9 — Lenis × existing scroll machinery.** Lenis must not break `WordReveal`'s ScrollTrigger,
  `PageDither`/`SiteHeader` scroll listeners, `useHorizontalScroll`, or `DitherCursor`'s
  IntersectionObserver, and must reset on client navigation. **Mitigation:** wire Lenis→ScrollTrigger
  via `gsap.ticker` (correct RAF, `lagSmoothing(0)`), disable smooth scroll under reduced-motion, and
  add a route-change scroll reset. The source plan's provider code is **buggy** (named `Lenis` import,
  fictional `new Theatre()`, wrong `ticker.remove` reference) and must be rewritten from scratch.
- **R-10 — gsap bonus-plugin resolution.** Verified locally (`gsap/SplitText` resolves), but Phase B's
  build is the real gate; if a future `npm i` changes gsap's `exports`, the demo build catches it.

---

## 12. Handoff checklist for the executor

1. Confirm git identity (`alsubaieabdullah`) before the first commit of the run.
2. Execute phases in the §5 order; **build-gate + commit at each boundary**; never leave the tree red.
3. Treat every production wiring (C/D/E2) as **gated** — land the component+demo first, wire production
   only after the §10 QA passes for that effect.
4. Keep `PixelBlast/DitherField/PageDither` untouched (L7).
5. Commit attribution files with their assets; never commit a ⛔ asset (no BrainStem).
6. Produce `docs/effects-3d-implementation-report.md` + Vault updates (dated `09 Journal/` entry,
   `03 Marketing/Website.md`, `Decision Log.md` — frontmatter per `99 Meta/Conventions.md`) in Phase I.
7. Leave all QA evidence in `/tmp/muse-evidence` and `/tmp/muse-qa-screenshots`.
