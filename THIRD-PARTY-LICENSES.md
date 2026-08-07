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
