"use client";

/**
 * Generic GLB viewer for whatever `scripts/ai-3d/meshy-generate.mjs` writes
 * to `public/models/ai/*.glb` — unlike `demo/characters`' viewer, this makes
 * no assumption about which (if any) animation exists, since a Meshy output
 * may have none. Same auto-fit-to-height approach as
 * `demo/characters/CharactersScene.tsx` for the same reason: no guarantee
 * about the model's native scale.
 */
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, PresentationControls, useAnimations, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const TARGET_HEIGHT = 2.2;

function GeneratedModel({ url }: { url: string }) {
  const { scene, animations } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);
  const { actions, names, mixer } = useAnimations(animations, groupRef);

  useEffect(() => {
    if (!names.length) return;
    const action = actions[names[0]];
    action?.reset().fadeIn(0.3).play();
    // A fade-only cleanup leaves the mixer still ticking the action toward
    // zero weight after the model swaps or the scene unmounts. Stop it
    // outright so nothing keeps animating a detached/replaced skeleton.
    return () => {
      action?.stop();
      mixer.stopAllAction();
    };
  }, [actions, names, mixer]);

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

export default function GeneratedModelScene({ modelUrl }: { modelUrl: string }) {
  return (
    <Canvas camera={{ position: [0, 0.1, 4.2], fov: 40 }} dpr={[1, 2]} gl={{ antialias: true }}>
      <color attach="background" args={["#060608"]} />
      <ambientLight intensity={0.5} />
      <Environment resolution={256} background={false}>
        <Lightformer form="ring" color="#fd4601" intensity={2.5} position={[0, 3, -4]} scale={8} />
        <Lightformer form="rect" color="white" intensity={1.2} position={[-4, 1, 2]} scale={[4, 8, 1]} />
      </Environment>
      <PresentationControls global cursor speed={1.2} zoom={1} polar={[-0.2, Math.PI / 4]} azimuth={[-Math.PI / 2, Math.PI / 2]}>
        <Suspense fallback={null}>
          <GeneratedModel url={modelUrl} />
        </Suspense>
      </PresentationControls>
    </Canvas>
  );
}
