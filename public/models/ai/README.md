# AI-generated 3D models — empty by design

This directory is where `scripts/ai-3d/meshy-generate.mjs` writes its output. It is
**intentionally empty right now** — no `MESHY_API_KEY` exists in this environment (that needs
a paid Meshy plan, plan §11 R-6, a real-money decision for Abdullah to make), so no model has
ever been generated here, and none was faked to fill this space.

`app/[locale]/demo/ai-3d` lists whatever `.glb` files exist in this directory at request time.
Right now that list is empty, so the demo renders its documented pipeline + empty state instead
of a viewer. Drop a real generated `.glb` here (via the script, once a key exists) and the demo
picks it up automatically — no code change needed.

Whichever Meshy tier produced it, add an `ATTRIBUTION.md` next to the model recording:

- The **input image** used (must be Muse-owned — plan §6/R-6: commercial use of Meshy's output
  also needs rights to the image fed in).
- The Meshy plan tier: free-tier output is **CC-BY 4.0** (credit Meshy); a **Pro** plan grants
  full ownership instead.
