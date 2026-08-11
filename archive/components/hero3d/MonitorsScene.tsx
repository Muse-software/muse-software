"use client";

import { BakeShadows, MeshReflectorMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, DepthOfField, EffectComposer } from "@react-three/postprocessing";
import { easing } from "maath";
import { Suspense, useEffect, useState } from "react";
import { useIsDesktop, usePrefersReducedMotion } from "@/lib/use-media-query";
import { Computers, Instances } from "./Computers";

/**
 * The monitor-wall scene, ported from the pmndrs `monitors` example. See
 * Computers.tsx for the model's licence and the full list of deviations.
 *
 * The lighting, the reflector floor and the effect chain are upstream's, and
 * the geometry of the shot — camera, field of view, group offset — is
 * untouched. What is not upstream is the grading: see GRADES below for the
 * four post-processing numbers that had to move once the screens went orange,
 * and `?post=upstream` on the preview route to see them put back.
 */

/**
 * Two colour grades, because upstream's does not survive the palette change.
 *
 * `upstream` is the pmndrs example's post chain, value for value. It works
 * there because its screens are mint green on neutral-grey plastic: the only
 * bright things in frame are the screens, so `luminanceThreshold: 0` blooming
 * literally everything still reads as screens glowing in a dark room.
 *
 * Swap the screens to Muse orange and add the warm point light and that
 * stops being true — the grey casings and the orange spill are now close
 * enough in luminance that a zero threshold blooms the whole wall into a warm
 * fog, and the depth of field then softens what little contrast is left. The
 * measured result is a hero where nothing is legible.
 *
 * `tuned` keeps both effects and their order, and changes four numbers. Bloom
 * picks up only the genuinely emissive screens, at a strength that still
 * glows. The focus moves onto the wall, the focal range widens to cover its
 * depth, and — the one that actually decides legibility — the bokeh kernel
 * comes down a lot. Measured one at a time against a real render: threshold is
 * what kills the fog, bokeh scale is what brings back the detail, and the two
 * focus values are worth a little on top.
 */
const GRADES = {
  upstream: {
    bloom: { luminanceThreshold: 0, luminanceSmoothing: 0, intensity: 5 },
    bokehScale: 15,
    /** Left at the effect's own default, as upstream does. */
    focusRange: undefined,
    /** Behind the wall: at near=1/far=20 this normalises to a focal depth of
     *  ~0.40, while the monitors sit between ~0.17 and ~0.38. Nothing in the
     *  scene is ever quite in focus. */
    focusTarget: [0, 0, 13],
  },
  tuned: {
    bloom: { luminanceThreshold: 0.35, luminanceSmoothing: 0.2, intensity: 2.2 },
    bokehScale: 3,
    focusRange: 0.4,
    /** The centre of the wall — which is also the monitor you can click. */
    focusTarget: [0, 0, 0],
  },
} as const;

export type SceneGrade = keyof typeof GRADES;

/** Where the rig settles with the pointer at rest — and therefore the pose the
 *  composition was actually framed for. The Canvas starts slightly above and
 *  behind it so there is a small settling drift on load. */
const REST_POSE: [number, number, number] = [-1, 0.5, 5.5];

/**
 * Aims the camera at the wall, and — unless motion is being reduced — drifts it
 * gently against the pointer.
 *
 * The `lookAt` runs in both modes, outside the `drift` branch: the pose is also
 * what the depth of field focuses against, so letting the camera sit wherever
 * it was left would frame the wall by accident and put it off the focal plane.
 * Only the pointer response is optional.
 */
function CameraRig({ drift }: { drift: boolean }) {
  useFrame((state, delta) => {
    if (drift) {
      easing.damp3(
        state.camera.position,
        [-1 + (state.pointer.x * state.viewport.width) / 3, (1 + state.pointer.y) / 2, 5.5],
        0.5,
        delta,
      );
    } else {
      // Snap to the rest pose rather than leaving the camera wherever the
      // Canvas put it: the starting position is half a unit higher and looks
      // down enough to push the wall up the frame and fill the bottom third
      // with empty floor. Reduced motion should still get the intended shot.
      state.camera.position.set(...REST_POSE);
    }
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

/**
 * Mounts only once the suspended model has resolved, which is the moment worth
 * fading in on. `onCreated` would fire while the canvas is still empty.
 */
function ReadySignal({ onReady }: { onReady: () => void }) {
  useEffect(onReady, [onReady]);
  return null;
}

export default function MonitorsScene({ grade = "tuned" }: { grade?: SceneGrade }) {
  const isDesktop = useIsDesktop();
  const reducedMotion = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const { bloom, bokehScale, focusTarget, focusRange } = GRADES[grade] ?? GRADES.tuned;

  /**
   * The reflector re-renders the scene from below into an off-screen buffer
   * every frame, so its resolution is the single most expensive number here.
   * Half it off the desktop breakpoint; the blur hides the difference.
   */
  const reflectorResolution = isDesktop ? 2048 : 1024;

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      <Canvas
        shadows
        dpr={isDesktop ? [1, 1.5] : [1, 1]}
        camera={{ position: [-1.5, 1, 5.5], fov: 45, near: 1, far: 20 }}
        /**
         * No `eventPrefix` override. Upstream sets `eventPrefix="client"`
         * because it also redirects `eventSource` at a DOM node the canvas is
         * not inside; here the canvas sits in its own wrapper, so the default
         * offset-based coordinates are the correct ones. Setting `client`
         * without the matching `eventSource` shifts every raycast by the
         * canvas's page position and the interactive screen stops responding.
         */
        /**
         * Under "reduce motion" the scene is painted once and then left alone:
         * no camera drift, no scrolling screens, no flashing LEDs. `demand`
         * still re-renders on React state changes, so a ripple from a click
         * would draw a frame — but the shader's own clock stops advancing, so
         * nothing animates on its own.
         */
        frameloop={reducedMotion ? "demand" : "always"}
      >
        <color attach="background" args={["#060608"]} />
        <hemisphereLight intensity={0.15} groundColor="black" />
        <spotLight
          decay={0}
          position={[10, 20, 10]}
          angle={0.12}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={1024}
        />

        <Suspense fallback={null}>
          <ReadySignal onReady={() => setReady(true)} />
          <group position={[0, -1, 0]}>
            <Instances>
              <Computers scale={0.5} />
            </Instances>

            {/* Reflective floor with distance blur — the thing that makes the
                wall read as a room rather than a pile of props. */}
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[50, 50]} />
              <MeshReflectorMaterial
                blur={[300, 30]}
                resolution={reflectorResolution}
                mixBlur={1}
                mixStrength={180}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#202020"
                metalness={0.8}
              />
            </mesh>

            {/* Upstream lit a decorative bunny here. The bunny is gone; the
                light stays, because without it the centre of the wall goes
                flat. It now reads as spill off the interactive screen. */}
            <pointLight distance={1.5} intensity={1} position={[-0.15, 0.7, 0]} color="orange" />
          </group>

          {/* v3 of @react-three/postprocessing inverted this flag: the normal
              pass is off unless `enableNormalPass` asks for it, and neither
              Bloom nor DepthOfField needs one. */}
          <EffectComposer>
            <Bloom
              mipmapBlur
              luminanceThreshold={bloom.luminanceThreshold}
              luminanceSmoothing={bloom.luminanceSmoothing}
              intensity={bloom.intensity}
            />
            <DepthOfField target={focusTarget} focalLength={0.3} focusRange={focusRange} bokehScale={bokehScale} height={700} />
          </EffectComposer>

          {/* Shadows are static, so bake them after the first frame. */}
          <BakeShadows />
        </Suspense>

        <CameraRig drift={!reducedMotion} />
      </Canvas>
    </div>
  );
}
