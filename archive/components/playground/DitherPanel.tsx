import type { ReactNode } from "react";
import DitherLayers, { type DitherCell, type DitherVariant } from "./DitherLayers";
import { cn } from "@/lib/utils";

/**
 * PLAYGROUND — P12 in docs/dither-system-plan.md. Not shipped.
 *
 * The CTA panel's treatment, generalised: a framed panel where the dither
 * reaches the edges and is what defines the shape, so the border can fall back
 * to a hairline or disappear entirely and the box still holds together.
 *
 * The reusable part is `emphasis`. Density is a value here rather than a
 * constant, so a set of these can be ranked — a featured item, a recommended
 * model, an alert that matters more than the one above it — with no badge, no
 * size change and no second colour. That is rule 3 satisfied and P18's whole
 * mechanism in one prop.
 *
 * `interactive` moves that emphasis onto hover and focus instead of fixing it,
 * which is the honest default when there is no real ranking to encode: the
 * panel being pointed at is real state, a "recommended" tier that the business
 * does not actually publish is not (rule 9). It runs on `.group`, so a grid of
 * these costs no JS and no animation loop.
 */
export default function DitherPanel({
  variant = "pinch",
  cell = "md",
  emphasis,
  interactive = false,
  bare = false,
  className,
  children,
}: {
  variant?: DitherVariant;
  cell?: DitherCell;
  /** 0 to 1. Ignored when `interactive`, which drives it from hover instead. */
  emphasis?: number;
  interactive?: boolean;
  /** Drops the hairline, leaving the field as the only thing describing the
   *  shape. The point of the component, and only legible at higher density. */
  bare?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      style={
        emphasis !== undefined && !interactive
          ? ({ "--dither-level": emphasis } as React.CSSProperties)
          : undefined
      }
      className={cn(
        "dither-panel text-[#fd4601]",
        interactive && "dither-panel-interactive",
        bare && "border-transparent",
        className,
      )}
    >
      {/* 0.5 for the same reason `DitherSeam` carries 0.55: the lattice at full
          density is roughly 60% coverage, so an unmodulated panel renders as a
          solid orange block rather than as a framed surface. The ramp scales
          this, it does not replace it. */}
      <DitherLayers variant={variant} ramp cell={cell} className="opacity-50" />
      {children}
    </div>
  );
}
