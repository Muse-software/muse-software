// gsap ships the Flip plugin's runtime module at the capitalized on-disk
// path `Flip.js` — required by `import { Flip } from "gsap/Flip"` on any
// case-sensitive filesystem (Linux/Vercel builds), since no lowercase
// `flip.js` exists. But gsap's own `types/index.d.ts` only triple-slash
// references the lowercase `types/flip.d.ts`. Resolving the bare
// `"gsap/Flip"` specifier through gsap's package.json `exports` map for
// *types* lands on `types/Flip.d.ts` — a different casing of the same
// on-disk file already in the program — which TS's
// `forceConsistentCasingInFileNames` (kept on; see tsconfig.json) correctly
// rejects as TS1149.
//
// The `paths` entry in tsconfig.json redirects the "gsap/Flip" specifier to
// this file instead of through gsap's `exports` map, so that lookup never
// happens. `types/flip.d.ts` is still loaded exactly once, via
// `types/index.d.ts`'s own reference (pulled in by any `import ... from
// "gsap"`), so the global `Flip` class/namespace it declares is already
// available here — this mirrors the same `declare module "gsap/Flip"` block
// gsap's own `flip.d.ts` defines internally, just resolved from a path with
// no casing conflict.
declare module "gsap/Flip" {
  class _Flip extends Flip {}
  export { _Flip as Flip, _Flip as default };
}
