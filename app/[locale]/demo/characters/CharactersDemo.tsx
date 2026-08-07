"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

const CharactersScene = dynamic(() => import("./CharactersScene"), { ssr: false });

const MODELS = [
  { key: "fox", label: "Fox", url: "/models/khronos/fox/Fox.glb" },
  { key: "cesium-man", label: "Cesium Man", url: "/models/khronos/cesium-man/CesiumMan.glb" },
  { key: "rigged-simple", label: "Rigged Simple", url: "/models/khronos/rigged-simple/RiggedSimple.glb" },
] as const;

/**
 * Intersection-gated mount (the `DitherCursor.tsx` pattern) and a plain DOM
 * fallback under reduced motion — every model here plays a looping animation
 * with no "off" switch worth adding for a demo, so this skips the canvas
 * entirely rather than half-animate it, same call as `DreiDemo.tsx`.
 */
export default function CharactersDemo() {
  const reducedMotion = usePrefersReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [selected, setSelected] = useState<(typeof MODELS)[number]["key"]>("fox");

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

  const activeModel = MODELS.find((model) => model.key === selected) ?? MODELS[0];

  return (
    <div>
      <div className="flex flex-wrap gap-3" role="group" aria-label="Choose a character">
        {MODELS.map((model) => (
          <button
            key={model.key}
            type="button"
            onClick={() => setSelected(model.key)}
            aria-pressed={selected === model.key}
            className={cn(
              "rounded-md border px-4 py-2 text-sm font-medium transition-colors",
              selected === model.key
                ? "border-[#fd4601] bg-[#fd4601]/10 text-[#fd4601]"
                : "border-white/20 text-white/80 hover:border-white/40",
            )}
          >
            {model.label}
          </button>
        ))}
        <button
          type="button"
          disabled
          title="Pending manual download — see public/models/khronos/ATTRIBUTION.md"
          className="cursor-not-allowed rounded-md border border-white/10 px-4 py-2 text-sm font-medium text-white/30"
        >
          KayKit Adventurer — deferred
        </button>
      </div>

      {reducedMotion ? (
        <div
          ref={hostRef}
          className="mt-6 flex h-[480px] w-full items-center justify-center rounded-2xl border border-white/10 bg-black/40"
        >
          <p className="max-w-sm px-6 text-center text-white/50">
            This character viewer runs a looping animation and drag-to-orbit, disabled under
            reduced motion.
          </p>
        </div>
      ) : (
        <div ref={hostRef} className="mt-6 h-[480px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
          {isNearViewport && <CharactersScene modelUrl={activeModel.url} />}
        </div>
      )}
    </div>
  );
}
