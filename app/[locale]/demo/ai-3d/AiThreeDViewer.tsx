"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

const GeneratedModelScene = dynamic(() => import("./GeneratedModelScene"), { ssr: false });

/** Same intersection-gate + reduced-motion-skips-the-canvas shape as `demo/characters`. */
export default function AiThreeDViewer({ modelUrl }: { modelUrl: string }) {
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
      <div
        ref={hostRef}
        className="flex h-[480px] w-full items-center justify-center rounded-2xl border border-white/10 bg-black/40"
      >
        <p className="max-w-sm px-6 text-center text-white/50">
          This viewer runs a looping animation and drag-to-orbit, disabled under reduced motion.
        </p>
      </div>
    );
  }

  return (
    <div ref={hostRef} className="h-[480px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
      {isNearViewport && <GeneratedModelScene modelUrl={modelUrl} />}
    </div>
  );
}
