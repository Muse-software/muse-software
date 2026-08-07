# Khronos glTF-Sample-Assets — attribution

Source: https://github.com/KhronosGroup/glTF-Sample-Assets (branch `main`), downloaded
2026-08-07. Each model directory below also carries the upstream `LICENSE.md`/`README.md`
verbatim — this file summarizes them for `docs/effects-3d-implementation-plan.md` §6/§7.

## Fox (`fox/Fox.glb`)

- © 2014, PixelMannen — model. [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/legalcode)
- © 2014, tomkranis — rigging & animation. [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/legalcode)
- © 2017, @AsoboStudio and @scurest — glTF conversion. [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/legalcode)
- Used in: `app/[locale]/demo/characters` (demo/testing, per plan L4).

## Cesium Man (`cesium-man/CesiumMan.glb`)

- © 2017, Cesium — model, textures, animation. **CC-BY 4.0 International with Trademark
  Limitations** (SPDX `LicenseRef-CC-BY-TM`).
- © 2015, Cesium — the Cesium logo/wordmark rendered on the model's texture is a
  **trademark**, not covered by the CC-BY grant; see upstream
  `LICENSES/LicenseRef-LegalMark-Cesium.txt`. **Do not use the Cesium logo as a trademark**
  (i.e., do not present it as Muse's own branding, a partner mark, or in any way implying
  endorsement) — it is reproduced here only as-is, as part of the unmodified sample model,
  for internal demo/testing per plan L4.
- Used in: `app/[locale]/demo/characters` (demo/testing).

## Rigged Simple (`rigged-simple/RiggedSimple.glb`)

- © Cesium — model, rig, animation. [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/legalcode)
- Used in: `app/[locale]/demo/characters` (demo/testing).

## Dropped: BrainStem

Per the plan's correction (L4/§6/§7 R-7): Khronos's `BrainStem` sample ships under the
**Poser EULA** (Smith Micro), which does not permit redistributing the asset outside that
ecosystem. It is **not committed to this repo** and was never downloaded. `RiggedSimple` and
`CesiumMan` above stand in as the second/third skinned-mesh test cases the plan called for.

## KayKit Adventurers — deferred, not committed

Plan L4 names KayKit (CC0, `kaylousberg.itch.io/kaykit-adventurers`) as the **primary**
stylized-character direction, with the Khronos set above for demo/testing only. It is **not
in this repo**: itch.io's asset download is gated behind its claim/checkout flow (a signed,
session-scoped download token issued after a "claim" click on the page, even for a
free/CC0-priced item), which is not something a script can obtain automatically without
impersonating a real browser session against itch.io — the plan's own §11 R-8 flags exactly
this. Fetching Khronos's assets above worked because they're plain files on
`raw.githubusercontent.com`; KayKit has no equivalent public direct-download URL.

**To finish this the way L4 intends:** download the "KayKit Adventurers" pack by hand from
the itch.io page above (CC0, no account/payment required — set the price slider to 0), drop
the `.glb`/`.fbx` character file(s) into `public/models/kaykit/`, and add an
`ATTRIBUTION.md` there (CC0 needs no credit, but recording the source is good practice — see
plan §6). `app/[locale]/demo/characters` is written to make this a drop-in: see that route's
`README`-style header comment for the exact prop shape a KayKit entry needs.
