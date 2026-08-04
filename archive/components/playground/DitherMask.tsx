import type { ReactNode } from "react";
import DitherLayers, { type DitherCell } from "./DitherLayers";
import { cn } from "@/lib/utils";

/**
 * PLAYGROUND — see docs/dither-system-plan.md §3. Not shipped.
 *
 * Puts the dither INSIDE a shape (live text, an icon, a mark) or knocks the
 * shape out of a dither field. The one primitive most of the catalogue is
 * built on.
 *
 * A `mix-blend-mode: multiply` sandwich inside an isolated stacking context.
 * The full reasoning, including why `background-clip: text` and an SVG
 * `mask-image` were both rejected, is on `.dither-mask` in globals.css. The
 * short version: this is the only one of the three that keeps a single real
 * text node, so the type stays selectable, stays in the accessibility tree,
 * and shapes Arabic natively.
 *
 * The field is a prop rather than a variant because the engine choice is the
 * expensive decision and should be visible at the call site. Default is the
 * zero-cost CSS lattice; passing a `<DitherField />` here spends a WebGL
 * context, and there are only ever about 8 to 16 of those on a page.
 */
export type DitherMaskMode = "fill" | "knockout";

export default function DitherMask({
  mode = "fill",
  field,
  cell,
  className,
  stencilClassName,
  style,
  children,
}: {
  /** `fill` puts the dither inside the glyphs. `knockout` runs the field full
   *  bleed and punches the glyphs out of it as holes. */
  mode?: DitherMaskMode;
  /** Any dither engine. Defaults to the lattice at half density. */
  field?: ReactNode;
  cell?: DitherCell;
  className?: string;
  stencilClassName?: string;
  /** For `--dither-mask-ground`, so a mask can sit on a surface other than
   *  page black without its own box showing as a seam. */
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  return (
    <span
      style={style}
      className={cn("dither-mask", `dither-mask-${mode}`, cell && `dither-cell-${cell}`, className)}
    >
      <span className="dither-mask-field">{field ?? <DitherLayers variant="wash" />}</span>
      {/*
        Not aria-hidden, and there is no second copy of the text anywhere:
        this IS the content. The blend mode is a paint-time concern and the
        accessibility tree never sees it.
      */}
      <span className={cn("dither-mask-stencil", stencilClassName)}>{children}</span>
    </span>
  );
}
