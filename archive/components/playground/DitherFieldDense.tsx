"use client";

import dynamic from "next/dynamic";
import { useResponsivePixelSize } from "@/lib/use-responsive-pixel-size";

/**
 * PLAYGROUND — the shader field for `DitherKnockout`. Not shipped.
 *
 * `DitherField` is tuned to sit BEHIND a headline: sparse, slow, wide edge
 * fade, so you register the page as textured without being able to point at
 * the texture. Reusing it under a knockout does not work, and the reason is
 * structural rather than a matter of taste — a knockout is legible only in
 * proportion to how dense the field around the hole is, so the setting that
 * makes a good backdrop makes an invisible knockout. Verified in the browser:
 * the words did not read at all.
 *
 * So: three times the pattern density, half the feature scale, and no edge
 * fade, because the panel's own rounded clip is already the edge. Same shader,
 * same one WebGL context, opposite job.
 */
const PixelBlast = dynamic(() => import("../PixelBlast"), { ssr: false });

/** Between the Hero's 4/5/6 and DitherField's 3/4/5. Fine enough to read as a
 *  halftone at headline scale, coarse enough that the dots survive being
 *  interrupted by a letterform. */
const PIXEL_SIZES = { mobile: 3, tablet: 4, desktop: 4 } as const;

export default function DitherFieldDense({ className }: { className?: string }) {
  const pixelSize = useResponsivePixelSize(
    PIXEL_SIZES.mobile,
    PIXEL_SIZES.tablet,
    PIXEL_SIZES.desktop,
  );

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 select-none overflow-hidden ${className ?? ""}`}
    >
      <PixelBlast
        /* Square, to match the Hero and the lattice's square mode. The
           shipped DitherField/PageDither/CardDither all still ask for
           circles; if squares win, those three switch too. */
        variant="square"
        pixelSize={pixelSize}
        color="#fd4601"
        /* Lower scale means larger noise features, so the field breaks into
           readable clumps rather than an even sprinkle. */
        patternScale={2}
        patternDensity={1.65}
        pixelSizeJitter={0}
        speed={0.16}
        edgeFade={0}
        transparent
      />
    </div>
  );
}
