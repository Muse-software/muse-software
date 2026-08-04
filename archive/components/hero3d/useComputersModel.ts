"use client";

import { useGLTF } from "@react-three/drei";
import { DRACOLoader, type GLTFLoader } from "three-stdlib";

export const COMPUTERS_MODEL = "/models/computers.glb";

/**
 * The model declares `KHR_draco_mesh_compression` under `extensionsRequired`,
 * not `extensionsUsed` — there is no uncompressed geometry inside the file, so
 * without a decoder it does not load at all, it throws.
 *
 * drei's built-in decoder is fetched from `www.gstatic.com`, which this site's
 * CSP (`default-src 'self'`) blocks outright. So the decoder is served from
 * `/draco/`, copied out of the `three` package's own
 * `examples/jsm/libs/draco/gltf` — same version as the installed three, no new
 * dependency, no third-party origin.
 *
 * `type: "js"` selects the plain-JavaScript decoder over the WebAssembly one on
 * purpose. Compiling wasm under a CSP requires `'wasm-unsafe-eval'` in
 * `script-src`; the JS decoder needs nothing beyond same-origin. It decodes
 * slower, but this is one 382 KB mesh decoded once per page load, and the
 * trade buys back a directive that would otherwise apply to every script on
 * the site.
 *
 * Draco decodes in a worker either way — see the `worker-src` note in
 * next.config.ts.
 */
function attachSelfHostedDraco(loader: GLTFLoader) {
  const draco = new DRACOLoader();
  draco.setDecoderPath("/draco/");
  draco.setDecoderConfig({ type: "js" });
  loader.setDRACOLoader(draco);
}

/**
 * Every part of the scene reads the same GLTF — the frames, the panels, the
 * instanced geometry and the LED spheres are all nodes of this one file. drei
 * caches by URL, so these all resolve to a single fetch and a single decode;
 * the hook exists to keep the loader configuration in exactly one place.
 *
 * `useDraco: false` disables drei's CDN decoder; `attachSelfHostedDraco`
 * installs ours in its place.
 *
 * `useMeshopt: false` because this model does not use `EXT_meshopt_compression`
 * — Draco is the only compression extension it declares. Leaving meshopt on
 * attaches a decoder that eagerly instantiates a WebAssembly module for a file
 * that never needs it, which under this CSP throws a `'wasm-unsafe-eval'`
 * violation on every load.
 */
export function useComputersModel() {
  return useGLTF(COMPUTERS_MODEL, false, false, attachSelfHostedDraco);
}

useComputersModel.preload = () =>
  useGLTF.preload(COMPUTERS_MODEL, false, false, attachSelfHostedDraco);
