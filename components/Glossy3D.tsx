"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * A real WebGL-rendered glossy copper/orange 3D shape (three.js), matching
 * the brand guideline's metallic ring/orb renders. Falls back to a CSS
 * gradient approximation if WebGL is unavailable (disabled, unsupported, or
 * a sandboxed environment) — a failed context must never crash the page.
 */
type Glossy3DProps = {
  variant?: "orb" | "ring";
  size?: number;
  className?: string;
};

export default function Glossy3D({ variant = "orb", size = 220, className }: Glossy3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    let geometry: THREE.BufferGeometry;
    let material: THREE.MeshPhysicalMaterial;
    let frameId: number;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.set(0, 0, 6);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(size, size);
      mount.appendChild(renderer.domElement);

      geometry =
        variant === "ring"
          ? new THREE.TorusGeometry(1.5, 0.55, 64, 128)
          : new THREE.IcosahedronGeometry(1.7, 8);

      material = new THREE.MeshPhysicalMaterial({
        color: 0xfd4601,
        metalness: 1,
        roughness: 0.22,
        clearcoat: 1,
        clearcoatRoughness: 0.15,
        reflectivity: 1,
        emissive: 0x4c0014,
        emissiveIntensity: 0.15,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const keyLight = new THREE.PointLight(0xffd8b0, 40, 0, 2);
      keyLight.position.set(3, 3, 4);
      scene.add(keyLight);

      const rimLight = new THREE.PointLight(0xff8a3d, 20, 0, 2);
      rimLight.position.set(-4, -2, -3);
      scene.add(rimLight);

      scene.add(new THREE.AmbientLight(0x1a0500, 1.2));

      let angle = 0;
      const animate = () => {
        if (!reduceMotion) {
          angle += 0.004;
          mesh.rotation.y = angle;
          mesh.rotation.x = Math.sin(angle * 0.6) * 0.3;
        }
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };
      animate();
    } catch (err) {
      console.warn("[Glossy3D] WebGL unavailable, falling back to CSS shape:", err);
      // WebGL context creation is synchronous and can only be verified by
      // attempting it — there's no async boundary to defer this through,
      // and it only fires on the failure path, not on every effect run.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWebglFailed(true);
      return;
    }

    return () => {
      cancelAnimationFrame(frameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [variant, size]);

  if (webglFailed) {
    const fallbackStyle: React.CSSProperties = {
      width: size,
      height: size,
      background:
        "radial-gradient(circle at 32% 28%, #ffd8b0 0%, #fd4601 30%, #6b1800 70%, #1a0500 100%)",
      boxShadow:
        "inset -18px -18px 50px rgba(0,0,0,.55), inset 12px 12px 30px rgba(255,210,160,.3), 0 30px 60px rgba(253,70,1,.25)",
      ...(variant === "ring"
        ? {
            maskImage: "radial-gradient(circle, transparent 34%, black 35%)",
            WebkitMaskImage: "radial-gradient(circle, transparent 34%, black 35%)",
          }
        : {}),
    };
    return (
      <div aria-hidden="true" className={`rounded-full ${className ?? ""}`} style={fallbackStyle} />
    );
  }

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
