# Third-party licenses

Source and license ledger for ported effects/3D code and committed assets that
are not covered by `package.json`'s own dependency licenses. See
`docs/effects-3d-implementation-plan.md` §6 for the full ledger (including
items intentionally *not* installed, like TRELLIS/TripoSR and Theatre.js).

Entries are added as each port/asset lands — this file grows with the branch,
it is not written in one pass.

## lenis

- Source: https://github.com/darkroomengineering/lenis
- License: MIT
- Used in: `components/SmoothScrollProvider.tsx` (npm dependency, unmodified)

```
The MIT License

Copyright (c) 2024 darkroom.engineering

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

## Magnetic (`components/effects/Magnetic.tsx`)

- Technique source: https://tympanus.net/codrops/ ("MagneticButtons" demo), MIT.
- License: MIT (original demo).
- **Not a code port.** The plan's original design shipped this as a copy of
  the upstream `motion.button`; this repo's CTAs are `<Link>`/`<PillButton>`
  anchors, so `Magnetic.tsx` is original code written against this repo's
  already-installed `motion` library, implementing the same hover-pull idea
  from scratch (pointer-offset tracking + spring, gated by
  `usePrefersReducedMotion`/`(pointer:fine)`). No upstream source is
  reproduced, so no MIT notice reproduction is required — recorded here for
  provenance only, per plan §6/§8.

## CrosshairCursor (`components/effects/CrosshairCursor.tsx`)

- Technique source: https://tympanus.net/codrops/ ("CrosshairDistortion" demo), MIT.
- License: MIT (original demo).
- **Not a code port**, for the same reason as Magnetic above: original SVG/DOM
  code (corner-bracket reticle, imperative rAF loop) written for this repo,
  not a copy of upstream source. No upstream code is reproduced. Recorded here
  for provenance only, per plan §6/§8.

## R3FCarousel (`components/effects/R3FCarousel.tsx`, `R3FCarouselScene.tsx`, `r3fCarouselShaders.ts`)

- Source: https://github.com/colindmg/r3f-experimental-carousel
  (`src/components/{Carousel,GLImage}.tsx`, `src/shaders/horizontal-image/*.glsl`)
- License: MIT — Copyright (c) 2009–2024 Codrops (`tympanus.net/codrops`)
- **This one is a real code port**, unlike Magnetic/Crosshair above:
  - `r3fCarouselShaders.ts` — both GLSL shaders ported near-verbatim (uniform
    names, the curve/skew math, the cover-fit UV remap are all upstream's).
  - `R3FCarouselScene.tsx` — the "shift every plane, wrap each independently
    modulo the row's total width" infinite-loop technique and the per-plane
    shader-uniform wiring are upstream's `Carousel.tsx`/`GLImage.tsx`,
    restructured into two components and given a TS prop surface for an
    arbitrary image list instead of the hardcoded `IMAGE_LIST`.
  - **Deliberate deviation:** upstream drives the row from `useLenis`'s global
    page-scroll velocity, because in its demo the carousel *is* the page. This
    carousel is a page section (and, as `ProofWallCarousel`, sits inside real
    page content), so `R3FCarousel.tsx` captures drag + a scoped wheel gesture
    on the section itself instead, with a hand-rolled friction/smoothing model
    standing in for Lenis's scroll inertia. RTL sign-flip
    (`lib/useHorizontalScroll.ts`'s `inlineSign` idea) is also new — upstream
    has no RTL concept.
  - Images: `public/photos/*` (Muse-owned), not upstream's Midjourney-generated demo images — see plan §6.
- `components/sections/ProofWallCarousel.tsx` (Phase E2, the production-shaped
  ProofWall variant) reuses this same `R3FCarouselScene`/shader engine — no
  second port — adding only a `content` prop that anchors real DOM text to
  each plane via drei's `<Html transform>` (drei is an existing dependency,
  not new; this addition is original code, not part of the colindmg port).

```
MIT License

Copyright (c) 2009 - 2024 Codrops (https://tympanus.net/codrops)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Khronos glTF-Sample-Assets (`public/models/khronos/*`, `app/[locale]/demo/characters`)

Full per-model attribution lives in `public/models/khronos/ATTRIBUTION.md` (which each model's
own upstream `LICENSE.md`/`README.md` also travels alongside, verbatim) — summarized here per
the root ledger convention:

- Fox: CC0 (model) + CC-BY 4.0 (rig/animation, glTF conversion). ✅ unrestricted for this use.
- Cesium Man: CC-BY 4.0 **with trademark limitations** — the Cesium logo baked into its texture
  is not covered by the CC-BY grant and must never be presented as Muse's own mark. Demo/testing
  only, per plan L4.
- Rigged Simple: CC-BY 4.0 (Cesium). Demo/testing only.
- **Not committed:** BrainStem (Poser EULA — redistribution not permitted, plan §6/§7 R-7) and
  KayKit Adventurers (CC0, but itch.io's download needs a manual claim click this environment
  cannot script — plan §11 R-8; see the ATTRIBUTION.md above for the exact drop-in path).

## Meshy AI 3D (`scripts/ai-3d/meshy-generate.mjs`, `app/[locale]/demo/ai-3d`)

- API: https://docs.meshy.ai — no code is vendored, this is a REST client written against
  their documented Image-to-3D endpoint.
- **No model committed.** There is no `MESHY_API_KEY` (needs a paid plan, plan §11 R-6) in
  this environment, so the script has never produced output. `app/[locale]/demo/ai-3d` renders
  documentation + an honest empty state instead — no placeholder or faked GLB exists anywhere
  in this repo standing in for a real Meshy result. See `public/models/ai/README.md`.
- If/when a model is generated: free-tier Meshy output is **CC-BY 4.0** (credit Meshy); a Pro
  plan grants full ownership. Either way, commercial use also needs rights to the *input*
  image (Muse-owned only — the script's own usage note repeats this).

## TRELLIS / TripoSR — documented only, not installed (plan L3)

- `microsoft/TRELLIS` (MIT) and `VAST-AI-Research/TripoSR` (MIT) are self-hosted image/text-
  to-3D alternatives to Meshy's hosted API. **Neither is installed in this repo** — both need a
  real GPU to run inference, which this environment (and most CI/build environments) doesn't
  have. Documented in `app/[locale]/demo/ai-3d` for completeness per L3; no code, weights, or
  dependency from either project is present here.
