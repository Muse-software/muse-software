"use client";

/**
 * Phase G (plan §4): the KayKit adventurer was meant to be the hero of this
 * page (L4) — it isn't here. KayKit's itch.io download sits behind a
 * claim/checkout flow that issues a signed, session-scoped token after a
 * click on the page itself; there is no plain-file URL to fetch the way
 * `raw.githubusercontent.com` serves the Khronos assets below. Scripting
 * around that would mean impersonating a browser session against itch.io,
 * which is out of scope here — plan §11 R-8 flags exactly this risk. See
 * `public/models/khronos/ATTRIBUTION.md` for the manual drop-in path: once a
 * `.glb` lands in `public/models/kaykit/`, add it to `MODELS` below (same
 * `{ key, label, url }` shape) and it slots in without further changes.
 *
 * What's real here: three actual glTF-Sample-Assets models (Fox, Cesium Man,
 * Rigged Simple — MIT-adjacent CC0/CC-BY, see the ATTRIBUTION.md above),
 * downloaded verbatim from KhronosGroup/glTF-Sample-Assets, not stubs.
 */
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, PresentationControls, useAnimations, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const TARGET_HEIGHT = 2.2;

function CharacterModel({ url }: { url: string }) {
  const { scene, animations } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);
  const { actions, names } = useAnimations(animations, groupRef);

  useEffect(() => {
    if (!names.length) return;
    const action = actions[names[0]];
    action?.reset().fadeIn(0.3).play();
    return () => {
      action?.fadeOut(0.3);
    };
  }, [actions, names]);

  // Fox, Cesium Man and Rigged Simple ship at wildly different native
  // scales (glTF's "1 unit" means whatever the original rig used) — fit
  // each to the same on-screen height instead of hardcoding a per-model
  // scale, and sit it on a common ground line.
  const { scale, positionY } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const fitScale = size.y > 0 ? TARGET_HEIGHT / size.y : 1;
    return { scale: fitScale, positionY: -TARGET_HEIGHT / 2 - box.min.y * fitScale };
  }, [scene]);

  return (
    <group ref={groupRef} scale={scale} position={[0, positionY, 0]}>
      <primitive object={scene} />
    </group>
  );
}

export interface CharactersSceneProps {
  modelUrl: string;
}

/** Default export so `next/dynamic` can pull R3F/drei/three into their own async chunk — see `CharactersDemo.tsx`. */
export default function CharactersScene({ modelUrl }: CharactersSceneProps) {
  return (
    <Canvas camera={{ position: [0, 0.1, 4.2], fov: 40 }} dpr={[1, 2]} gl={{ antialias: true }}>
      <color attach="background" args={["#060608"]} />
      <ambientLight intensity={0.5} />

      <Environment resolution={256} background={false}>
        <Lightformer form="ring" color="#fd4601" intensity={2.5} position={[0, 3, -4]} scale={8} />
        <Lightformer form="rect" color="white" intensity={1.2} position={[-4, 1, 2]} scale={[4, 8, 1]} />
        <Lightformer form="rect" color="white" intensity={0.8} position={[4, -1, 2]} scale={[4, 8, 1]} />
      </Environment>

      <PresentationControls global cursor speed={1.2} zoom={1} polar={[-0.2, Math.PI / 4]} azimuth={[-Math.PI / 2, Math.PI / 2]}>
        <Suspense fallback={null}>
          <CharacterModel url={modelUrl} />
        </Suspense>
      </PresentationControls>
    </Canvas>
  );
}
