import type { ReactNode } from "react";
import DitherLayers, { type DitherCell } from "./DitherLayers";
import DitherMask from "./DitherMask";
import { cn } from "@/lib/utils";

/**
 * PLAYGROUND — P4 in docs/dither-system-plan.md, generalised. Not shipped.
 *
 * Dither inside anything that is a FILL rather than a stroke: the Muse mark,
 * the pixel arrow, a solid icon.
 *
 * `DitherIcon` dashes the stroke, which is the right answer for the outline
 * set and no answer at all for a filled mark, because there is no stroke to
 * dash. Those go through `DitherMask` instead, where the glyph is the stencil
 * and the dither shows through its silhouette.
 *
 * The size floor is the thing to watch. A shape needs to be several cells
 * across before a lattice inside it reads as texture rather than as damage:
 * at `sm` (4px cell) a 24px icon holds about six dots across, which is
 * legible-but-crunchy, and anything smaller is mush. The logo mark is the
 * natural fit — it is already drawn as a stepped, blocky silhouette, so a
 * square-dot lattice inside it looks like the mark's own construction rather
 * than like a texture laid over it.
 *
 * `--dither-mask-ground` is exposed so a glyph can sit on a surface other
 * than page black without a seam around its box.
 */
export default function DitherGlyph({
  cell = "sm",
  ground,
  className,
  children,
}: {
  cell?: DitherCell;
  /** Match the surface this sits on, or the box outlines itself. */
  ground?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <DitherMask
      mode="fill"
      cell={cell}
      className={cn("align-middle", className)}
      style={ground ? ({ "--dither-mask-ground": ground } as React.CSSProperties) : undefined}
      field={<DitherLayers variant="wash" />}
    >
      {children}
    </DitherMask>
  );
}
