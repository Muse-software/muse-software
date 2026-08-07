"use client";

/**
 * R3F internals for `R3FCarousel.tsx` — adapted from colindmg/r3f-experimental-
 * carousel (`src/components/{Carousel,GLImage}.tsx`, MIT — see
 * `THIRD-PARTY-LICENSES.md`). The per-plane wave shader and the "shift every
 * plane by the same delta, then wrap each one independently modulo the row's
 * total width" infinite-loop technique are the same algorithm as upstream.
 *
 * What changed, and why: upstream drives the row from `useLenis`'s global
 * page-scroll velocity — correct for its demo, where the carousel *is* the
 * page. Here the carousel is one section embedded in a normal page (and,
 * as `ProofWallCarousel`, sits inside real page content), so it can't own
 * page scroll. `R3FCarousel.tsx` captures drag and a scoped wheel gesture on
 * the section itself and exposes them as a single accumulating "impulse" ref
 * (`CarouselVelocity`); `CarouselGroup` below drains that ref every frame and
 * applies the same friction-decay model Lenis's own inertia gave upstream for
 * free. Texture `colorSpace` and the renderer's `outputColorSpace` are also
 * new — upstream's `.webp` assets rendered fine without it; our own sRGB
 * JPEGs (`public/photos/*`) look washed out without an explicit decode.
 */
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { carouselFragmentShader, carouselVertexShader } from "./r3fCarouselShaders";

export type CarouselVelocity = { impulse: number };

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

interface CarouselPlaneProps {
  url: string;
  index: number;
  imageSize: [number, number];
  gap: number;
  curveStrength: number;
  curveFrequency: number;
  onRefs: (mesh: THREE.Mesh | null, material: THREE.ShaderMaterial | null) => void;
}

function CarouselPlane({ url, index, imageSize, gap, curveStrength, curveFrequency, onRefs }: CarouselPlaneProps) {
  const texture = useTexture(url);
  // `react-hooks/immutability` treats every hook return value as frozen, but
  // three.js's `Texture` is a genuinely mutable external object — setting
  // `colorSpace` after load is the documented way to fix an sRGB decode, not
  // a purity violation the rule is actually guarding against.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    texture.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);

  const imageSizes = useMemo(() => {
    const image = texture.image as { width: number; height: number } | undefined;
    return new THREE.Vector2(image?.width ?? 1, image?.height ?? 1);
  }, [texture]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uScrollSpeed: { value: 0 },
      uPlaneSizes: { value: new THREE.Vector2(imageSize[0], imageSize[1]) },
      uImageSizes: { value: imageSizes },
      uCurveStrength: { value: curveStrength },
      uCurveFrequency: { value: curveFrequency },
    }),
    [texture, imageSize, imageSizes, curveStrength, curveFrequency],
  );

  return (
    <mesh
      position={[index * (imageSize[0] + gap), 0, 0]}
      scale={[imageSize[0], imageSize[1], 1]}
      ref={(mesh) => onRefs(mesh, mesh ? (mesh.material as THREE.ShaderMaterial) : null)}
    >
      <planeGeometry args={[1, 1, 16, 16]} />
      <shaderMaterial vertexShader={carouselVertexShader} fragmentShader={carouselFragmentShader} uniforms={uniforms} />
    </mesh>
  );
}

interface CarouselGroupProps {
  images: string[];
  imageSize: [number, number];
  gap: number;
  curveStrength: number;
  curveFrequency: number;
  velocityRef: React.RefObject<CarouselVelocity>;
}

/** How fast the drag/wheel impulse itself decays once input stops — the same job Lenis's own scroll inertia did upstream. */
const IMPULSE_FRICTION = 0.9;
/** How quickly the row's motion follows the (decaying) impulse, vs. jumping straight to it. */
const VELOCITY_SMOOTHING = 0.25;
/** Scales smoothed velocity into the shader's per-plane skew — matches upstream's `-velocity * ...` sign on the horizontal path. */
const SKEW_SCALE = 8;

function CarouselGroup({ images, imageSize, gap, curveStrength, curveFrequency, velocityRef }: CarouselGroupProps) {
  const count = images.length;
  const totalWidth = count * gap + count * imageSize[0];
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const materialRefs = useRef<(THREE.ShaderMaterial | null)[]>([]);
  const smoothedVelocity = useRef(0);

  useFrame(() => {
    const velocity = velocityRef.current;
    smoothedVelocity.current += (velocity.impulse - smoothedVelocity.current) * VELOCITY_SMOOTHING;
    velocity.impulse *= IMPULSE_FRICTION;

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.position.x = mod(mesh.position.x + smoothedVelocity.current + totalWidth / 2, totalWidth) - totalWidth / 2;
      const material = materialRefs.current[i];
      if (material) material.uniforms.uScrollSpeed.value = -smoothedVelocity.current * SKEW_SCALE;
    });
  });

  return (
    <>
      {images.map((url, i) => (
        <CarouselPlane
          key={url}
          url={url}
          index={i}
          imageSize={imageSize}
          gap={gap}
          curveStrength={curveStrength}
          curveFrequency={curveFrequency}
          onRefs={(mesh, material) => {
            meshRefs.current[i] = mesh;
            materialRefs.current[i] = material;
          }}
        />
      ))}
    </>
  );
}

export interface R3FCarouselSceneProps {
  images: string[];
  imageSize: [number, number];
  gap: number;
  curveStrength: number;
  curveFrequency: number;
  velocityRef: React.RefObject<CarouselVelocity>;
}

/** Default export so `next/dynamic` can pull R3F/drei/three into their own async chunk — see `R3FCarousel.tsx`. */
export default function R3FCarouselScene({ images, imageSize, gap, curveStrength, curveFrequency, velocityRef }: R3FCarouselSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, outputColorSpace: THREE.SRGBColorSpace }}
    >
      <Suspense fallback={null}>
        <CarouselGroup
          images={images}
          imageSize={imageSize}
          gap={gap}
          curveStrength={curveStrength}
          curveFrequency={curveFrequency}
          velocityRef={velocityRef}
        />
      </Suspense>
    </Canvas>
  );
}
