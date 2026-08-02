import type { ReactNode } from "react";
import DitherLayers from "./DitherLayers";
import { cn } from "@/lib/utils";

/**
 * PLAYGROUND — P15 in docs/dither-system-plan.md. Not shipped.
 *
 * The composition divides on the inline axis: one half flat black carrying the
 * headline, the other a dense field, and the two meet on a dithered edge
 * rather than a straight one.
 *
 * FULLY PHYSICAL, and the most RTL-exposed thing in the catalogue. Two
 * separate things have to mirror and they mirror by different mechanisms:
 *
 *  1. WHICH HALF the field is on. This is free — the field is the second grid
 *     item, and grid tracks are laid out in writing order, so it lands on the
 *     inline end in both scripts with no override.
 *  2. WHICH WAY the field dissolves. This is not free. The mask has to be
 *     dense at the outer edge and thin toward the type, and "outer" is the
 *     right in English and the left in Arabic. `.dither-ramp-inline-end`
 *     carries the `[dir="rtl"]` counterpart for exactly this.
 *
 * Getting (1) right and (2) wrong is the plausible failure: the layout looks
 * mirrored, and the field quietly dissolves at the wrong end, densest right
 * where the headline is. Worth checking on `/ar` rather than reasoning about.
 *
 * Stacks on mobile, where there is no inline split to make. The field becomes
 * a band under the type and the same mask still runs on the inline axis, which
 * is a different composition but not a broken one.
 */
export default function HeroSplit({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("relative isolate overflow-hidden bg-[#060608]", className)}>
      <div className="grid md:grid-cols-2">
        <div className="relative z-10 px-6 py-20 md:px-12 md:py-28">{children}</div>

        {/* `min-h` rather than a fixed height: on mobile this is a band under
            the type and needs a floor, on desktop the type column is taller
            and the grid stretches it to match. */}
        <div className="relative min-h-[10rem] text-[#fd4601]">
          <DitherLayers variant="ramp-inline-end" cell="lg" className="opacity-60" />
        </div>
      </div>
    </div>
  );
}
