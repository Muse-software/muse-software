"use client";

import { RenderTexture, useCursor } from "@react-three/drei";
import type { ThreeElements, ThreeEvent } from "@react-three/fiber";
import { useState, type ReactNode } from "react";
import { useComputersModel } from "./useComputersModel";

/**
 * Side of the square render target behind every monitor face.
 *
 * Also the coordinate space the interactive screen maps clicks into: a pointer
 * hit on the panel arrives as a UV in 0..1, and the shader wants framebuffer
 * pixels, so the two have to agree on this number. See PixelBlastScreen.
 */
export const SCREEN_RES = 512;

type ScreenProps = Omit<ThreeElements["group"], "children"> & {
  /** GLTF node name of the monitor's bezel/casing mesh. */
  frame: string;
  /** GLTF node name of the flat glass mesh the texture is projected onto. */
  panel: string;
  /** The sub-scene rendered into the panel, live, every frame. */
  children: ReactNode;
  /** Supplying this makes the panel raycastable and gives it a pointer cursor. */
  onPanelPointerDown?: (event: ThreeEvent<PointerEvent>) => void;
};

/**
 * One monitor: a lit bezel plus a screen showing a scene that is being rendered
 * off-screen this frame.
 *
 * The panel is not a video texture or an image — `RenderTexture` runs a second
 * react-three-fiber scene into a framebuffer and hands it back as the material's
 * map, so whatever is passed as `children` is genuinely live and interactive.
 * `toneMapped={false}` keeps the screen out of the renderer's tone-mapping curve
 * so it reads as an emitting surface and feeds the bloom pass cleanly.
 */
export function Screen({ frame, panel, children, onPanelPointerDown, ...props }: ScreenProps) {
  const { meshes, materials } = useComputersModel();
  const [hovered, setHovered] = useState(false);
  const interactive = Boolean(onPanelPointerDown);

  useCursor(hovered && interactive);

  return (
    <group {...props}>
      <mesh castShadow receiveShadow geometry={meshes[frame].geometry} material={materials.Texture} />
      {/* Handlers are attached only when the screen is actually interactive:
          react-three-fiber raycasts against the objects that have them, and
          there are nine screens in the scene that never need testing. */}
      <mesh
        geometry={meshes[panel].geometry}
        onPointerDown={onPanelPointerDown}
        onPointerOver={interactive ? () => setHovered(true) : undefined}
        onPointerOut={interactive ? () => setHovered(false) : undefined}
      >
        <meshBasicMaterial toneMapped={false}>
          <RenderTexture width={SCREEN_RES} height={SCREEN_RES} attach="map" anisotropy={16}>
            {children}
          </RenderTexture>
        </meshBasicMaterial>
      </mesh>
    </group>
  );
}
