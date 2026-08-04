import type { ReactNode } from "react";
import DitherLayers, { type DitherCell, type DitherVariant } from "./DitherLayers";
import { cn } from "@/lib/utils";

/**
 * PLAYGROUND — P25 in docs/dither-system-plan.md. Not shipped.
 *
 * One continuous field spans the entire grid; the cards are transparent
 * windows onto it and the gutters are solid page black. The texture belongs to
 * the surface UNDERNEATH the layout rather than to each card, so the grid
 * reads as holes cut in a page rather than as tiles placed on one.
 *
 * Strictly cheaper than any per-card treatment, and the saving grows with the
 * card count: one field for the whole grid, at any size, with no hover
 * plumbing, no per-card state and no shared-canvas machinery. `CardDither`
 * exists to make one moving mask serve many cards; this needs no mask at all
 * because nothing moves.
 *
 * THE GUTTERS ARE BORDERS, NOT A GAP, and that is the whole implementation.
 * A `gap` would let the field show through between the cards, which is the
 * exact inverse of the intended effect — the windows would join up and the
 * cards would become the solid parts. A border painted in the page colour
 * covers the field, works for any grid including spans and uneven rows, and
 * gives the outer edge its frame for free so the field never leaks past the
 * container.
 *
 * No RTL work: a uniform field has no direction, and CSS Grid places tracks in
 * writing order on its own.
 */
export default function InverseBento({
  variant = "wash",
  cell = "lg",
  className,
  gridClassName,
  children,
}: {
  variant?: DitherVariant;
  cell?: DitherCell;
  className?: string;
  gridClassName?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("inverse-bento text-[#fd4601]", className)}>
      <DitherLayers variant={variant} cell={cell} className="opacity-55" />
      <div className={cn("inverse-bento-grid", gridClassName)}>{children}</div>
    </div>
  );
}

/**
 * One window. The border is the gutter, so the padding has to live on an inner
 * element — putting it on the cell would push the border outward and widen the
 * gutter instead of insetting the content.
 */
export function BentoCell({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("inverse-bento-cell", className)}>
      <div className="p-6 md:p-8">{children}</div>
    </div>
  );
}
