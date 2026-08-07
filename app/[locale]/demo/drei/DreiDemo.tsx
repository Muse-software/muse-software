"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

const DreiDemoScene = dynamic(() => import("./DreiDemoScene"), { ssr: false });

/**
 * Intersection-gated mount (the `DitherCursor.tsx` pattern) and a plain DOM
 * fallback under reduced motion — `Float`'s bob/rotate and `PresentationControls`'
 * damped drag are both continuous animation with no "off" switch worth adding
 * for a demo, so this skips the canvas entirely rather than half-animate it.
 */
export default function DreiDemo() {
  const reducedMotion = usePrefersReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry?.isIntersecting ?? false),
      { rootMargin: "50% 0px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  if (reducedMotion) {
    return (
      <div ref={hostRef} className="flex h-[480px] w-full items-center justify-center rounded-2xl border border-white/10 bg-black/40">
        <p className="max-w-sm px-6 text-center text-white/50">
          This drei showcase is a continuously-animated 3D scene, disabled under reduced motion.
        </p>
      </div>
    );
  }

  return (
    <div ref={hostRef} className="h-[480px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
      {isNearViewport && <DreiDemoScene />}
    </div>
  );
}
