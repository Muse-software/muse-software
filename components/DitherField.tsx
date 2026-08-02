"use client";

import dynamic from "next/dynamic";
import { useResponsivePixelSize } from "@/lib/use-responsive-pixel-size";

/**
 * Same shader as the Hero, deliberately tuned to a different texture: the
 * Hero is a coarse jittered *square* dither that drifts and answers clicks
 * with a ripple, this is a fine, still, regular *dot* field — the brand
 * guideline's halftone dissolve rather than the pixel blast. Sparser feed,
 * no jitter, a third of the speed, and a wide edge fade so it resolves into
 * the page black on every side instead of ending on a straight line.
 *
 * It is decorative and non-interactive: ripples are off and the wrapper is
 * pointer-events-none, so it never eats a click or a text selection from the
 * heading sitting on top of it.
 *
 * Also the reason this wrapper exists at all: PixelBlast is client-only, and
 * `next/dynamic` with `ssr: false` cannot be called from a Server Component.
 * SubpageHero is one, so the dynamic import has to happen behind a
 * "use client" boundary.
 */
const PixelBlast = dynamic(() => import("./PixelBlast"), { ssr: false });

/** Finer than the Hero's 4/5/6 — dots need a smaller cell to read as a
 *  halftone rather than as a row of circles. */
const PIXEL_SIZES = { mobile: 3, tablet: 4, desktop: 5 } as const;

export default function DitherField({ className }: { className?: string }) {
  const pixelSize = useResponsivePixelSize(
    PIXEL_SIZES.mobile,
    PIXEL_SIZES.tablet,
    PIXEL_SIZES.desktop,
  );

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      <PixelBlast
        variant="circle"
        pixelSize={pixelSize}
        color="#fd4601"
        patternScale={4}
        patternDensity={1.15}
        pixelSizeJitter={0}
        speed={0.2}
        edgeFade={0.28}
        transparent
      />
    </div>
  );
}
