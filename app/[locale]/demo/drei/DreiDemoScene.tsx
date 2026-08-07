"use client";

/**
 * Phase F (plan §4): a curated 5-component slice of drei — `Environment`,
 * `PresentationControls`, `MeshTransmissionMaterial`, `Float`, `Sparkles` —
 * out of its full ~13-component library (the rest is deferred, plan §8).
 * One R3F `<Canvas>`, mounted only near-viewport by `DreiDemo.tsx`.
 *
 * `Environment` is lit procedurally with `<Lightformer>` children rather
 * than a `preset`/`files` HDRI: every drei HDRI preset is hotlinked to a
 * public CDN, and this repo's CSP is `connect-src 'self' blob:` (no external
 * hosts) — a `preset` fetch would just be a blocked network request and a
 * flat, unlit glass material. Lightformers render into a local cubemap
 * instead, so there's nothing to fetch.
 */
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  MeshTransmissionMaterial,
  PresentationControls,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";

export default function DreiDemoScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true }}>
      <color attach="background" args={["#060608"]} />
      <ambientLight intensity={0.4} />

      <Environment resolution={256} background={false}>
        <Lightformer form="ring" color="#fd4601" intensity={3} position={[0, 3, -4]} scale={8} />
        <Lightformer form="rect" color="white" intensity={1.5} position={[-4, 1, 2]} scale={[4, 8, 1]} />
        <Lightformer form="rect" color="white" intensity={0.8} position={[4, -1, 2]} scale={[4, 8, 1]} />
      </Environment>

      <PresentationControls
        global
        cursor
        speed={1.2}
        zoom={1}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 3, Math.PI / 3]}
      >
        <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.8}>
          <mesh>
            <torusKnotGeometry args={[1, 0.32, 200, 32]} />
            <MeshTransmissionMaterial
              samples={6}
              resolution={256}
              thickness={0.6}
              roughness={0.05}
              chromaticAberration={0.04}
              anisotropy={0.2}
              color="#fd4601"
              ior={1.3}
            />
          </mesh>
        </Float>
      </PresentationControls>

      <Sparkles count={60} scale={6} size={2} speed={0.3} color={new THREE.Color("#fd4601")} />
    </Canvas>
  );
}
