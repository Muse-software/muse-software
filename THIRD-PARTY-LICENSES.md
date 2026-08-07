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
