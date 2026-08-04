"use client";

import { OrthographicCamera } from "@react-three/drei";
import { useFrame, type ThreeElements, type ThreeEvent } from "@react-three/fiber";
import { useCallback, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  FRAGMENT_SRC,
  MAX_CLICKS,
  SHAPE_MAP,
  VERTEX_SRC,
} from "../pixelBlastShader";
import { SCREEN_RES, Screen } from "./Screen";

/**
 * The site's own hero shader, running on the face of a CRT.
 *
 * The full-bleed version in `PixelBlast.tsx` owns a `WebGLRenderer` and a DOM
 * canvas of its own, which is exactly what cannot happen inside this scene —
 * there is one renderer here and the screen is a framebuffer, not an element.
 * What makes the reuse work is that the shader never depended on any of that:
 * the vertex stage writes clip space directly, so a 2x2 plane fills whatever
 * target it draws into with no camera involved, and every input is a uniform.
 * So the GLSL is shared verbatim (see `pixelBlastShader.ts`) and only the host
 * differs — a render target here, a canvas there.
 *
 * Clicks survive the trip too. A pointer hit on the panel gives a UV on the
 * glass; scaled by the render-target size that *is* the fragment coordinate the
 * ripple uniforms expect, so clicking a monitor sets off a ripple from the spot
 * on the screen that was actually clicked.
 */

/** Muse orange, matching the flat hero's field. */
const COLOR = "#FE4701";
/** Warm near-black behind the dots, so the screen reads as lit glass. */
const BACKGROUND = "#0b0708";

/**
 * Deliberately coarser than the page-level field. `uPixelSize` scales the dots
 * *and*, at 8x, the noise cell grid — on a 512px target a hero-sized value
 * would put ~10 cells across the screen and the pattern would barely move, so
 * the dots stay chunky (they are being viewed at the size of a postage stamp)
 * and `patternScale` is raised to put the detail back into the noise instead.
 */
const PIXEL_SIZE = 5;
const PATTERN_SCALE = 6;
const PATTERN_DENSITY = 1.15;
const PIXEL_JITTER = 0.4;

/** Ripple feel is copied from the flat hero so the two read as one effect. */
const RIPPLE_SPEED = 0.4;
const RIPPLE_THICKNESS = 0.12;
const RIPPLE_INTENSITY = 1.5;

/** Slight vignette — a CRT does not light its own corners. */
const EDGE_FADE = 0.12;

/** Matches the flat hero's `speed` prop. */
const TIME_SCALE = 0.6;
/** Starts the FBM somewhere with texture in it rather than at t=0. */
const TIME_OFFSET = 137;

type PixelBlastUniforms = {
  uResolution: THREE.IUniform<THREE.Vector2>;
  uTime: THREE.IUniform<number>;
  uColor: THREE.IUniform<THREE.Color>;
  uClickPos: THREE.IUniform<THREE.Vector2[]>;
  uClickTimes: THREE.IUniform<Float32Array>;
  uShapeType: THREE.IUniform<number>;
  uPixelSize: THREE.IUniform<number>;
  uScale: THREE.IUniform<number>;
  uDensity: THREE.IUniform<number>;
  uPixelJitter: THREE.IUniform<number>;
  uEnableRipples: THREE.IUniform<number>;
  uRippleSpeed: THREE.IUniform<number>;
  uRippleThickness: THREE.IUniform<number>;
  uRippleIntensity: THREE.IUniform<number>;
  uEdgeFade: THREE.IUniform<number>;
};

function createUniforms(): PixelBlastUniforms {
  return {
    uResolution: { value: new THREE.Vector2(SCREEN_RES, SCREEN_RES) },
    uTime: { value: TIME_OFFSET },
    uColor: { value: new THREE.Color(COLOR) },
    // A ring buffer of concurrent ripples; x < 0 marks a slot as unused.
    uClickPos: { value: Array.from({ length: MAX_CLICKS }, () => new THREE.Vector2(-1, -1)) },
    uClickTimes: { value: new Float32Array(MAX_CLICKS) },
    uShapeType: { value: SHAPE_MAP.square },
    uPixelSize: { value: PIXEL_SIZE },
    uScale: { value: PATTERN_SCALE },
    uDensity: { value: PATTERN_DENSITY },
    uPixelJitter: { value: PIXEL_JITTER },
    uEnableRipples: { value: 1 },
    uRippleSpeed: { value: RIPPLE_SPEED },
    uRippleThickness: { value: RIPPLE_THICKNESS },
    uRippleIntensity: { value: RIPPLE_INTENSITY },
    uEdgeFade: { value: EDGE_FADE },
  };
}

/**
 * The sub-scene that gets rendered into the panel's texture.
 *
 * Note that the per-frame clock and the click ripples are both written through
 * `materialRef`, never to the `uniforms` object directly. three.js uniforms are
 * mutable by design, but React Compiler freezes anything that reaches JSX, so
 * the material ref is the sanctioned way to reach them — and it conveniently
 * gives the parent, which owns the pointer handler, a handle to the same
 * uniforms this component renders with.
 */
function PixelBlastSurface({
  materialRef,
}: {
  materialRef: React.RefObject<THREE.ShaderMaterial | null>;
}) {
  const uniforms = useMemo(() => createUniforms(), []);

  useFrame((state) => {
    const material = materialRef.current;
    if (!material) return;
    material.uniforms.uTime.value = TIME_OFFSET + state.clock.elapsedTime * TIME_SCALE;
  });

  return (
    <>
      {/* The vertex shader emits clip space, so this camera never actually
          transforms anything — it is here because a scene needs one. `manual`
          stops drei from resizing a frustum that has no effect. */}
      <OrthographicCamera makeDefault manual left={-1} right={1} top={1} bottom={-1} near={0} far={1} />
      <color attach="background" args={[BACKGROUND]} />
      {/* Culling is off because the geometry's real position is decided in the
          shader; its bounding sphere sits at the origin and says nothing useful. */}
      <mesh frustumCulled={false}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={VERTEX_SRC}
          fragmentShader={FRAGMENT_SRC}
          uniforms={uniforms}
          glslVersion={THREE.GLSL3}
          transparent
          depthTest={false}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

type PixelBlastScreenProps = Omit<ThreeElements["group"], "children"> & {
  frame: string;
  panel: string;
};

export function PixelBlastScreen(props: PixelBlastScreenProps) {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const nextClick = useRef(0);

  const handlePointerDown = useCallback((event: ThreeEvent<PointerEvent>) => {
    const material = materialRef.current;
    // No UV means the ray hit geometry with no texture coordinates, which
    // would send the ripple to an arbitrary place. Better to drop the click.
    if (!material || !event.uv) return;
    event.stopPropagation();

    const { uClickPos, uClickTimes, uTime } = material.uniforms;
    const slot = nextClick.current;
    // UV origin and framebuffer origin are both bottom-left, so this maps
    // straight across with no flip.
    uClickPos.value[slot].set(event.uv.x * SCREEN_RES, event.uv.y * SCREEN_RES);
    uClickTimes.value[slot] = uTime.value;
    nextClick.current = (slot + 1) % MAX_CLICKS;
  }, []);

  return (
    <Screen {...props} onPanelPointerDown={handlePointerDown}>
      <PixelBlastSurface materialRef={materialRef} />
    </Screen>
  );
}
