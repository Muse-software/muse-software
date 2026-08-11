import DitherLayers, { type DitherCell } from "./DitherLayers";
import { cn } from "@/lib/utils";

/**
 * PLAYGROUND — P6 in docs/dither-system-plan.md. Not shipped.
 *
 * The site's hairline rule, fraying into dots at both ends instead of stopping
 * on a cut edge. Small, and it appears more times across the site than any
 * hero will, so it does more for perceived craft per line of CSS than
 * anything else in the catalogue.
 *
 * Two variants, and the difference is what the object IS:
 *
 * - `fray` is a rule made ENTIRELY of dots, densest in the middle. The
 *   material is the dither.
 * - `core` is a solid hairline that dissolves into its own dots. The masks on
 *   the line and on the lattice are inverses of each other, so the dots pick
 *   up exactly where the line gives out and it reads as one object changing
 *   state rather than two decorations overlapping.
 *
 * The host is exactly one cell tall and hides the two block-offset layers (see
 * `.dither-rule-row`): the lattice is a two-dimensional grid, so a 12px box on
 * a 6px cell renders three staggered rows and the thing stops reading as a
 * line. Only visible in a browser, which is where it was caught.
 *
 * The cell class goes on the HOST rather than on the layers, because `.dither`
 * is `position: absolute` and would win over any height set on it — the layers
 * fill the host, and the host is what has a size.
 *
 * Both masks are symmetric about the inline axis, so neither needs an RTL
 * counterpart, for the same reason `.dissolve-band` does not.
 */
export default function DitherRule({
  variant = "fray",
  cell = "md",
  className,
}: {
  variant?: "fray" | "core";
  cell?: DitherCell;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "dither-rule-row relative w-full text-[#fd4601]/70",
        `dither-cell-${cell}`,
        className,
      )}
    >
      <DitherLayers variant="fray" />
      {variant === "core" ? <span className="dither-rule-core" /> : null}
    </div>
  );
}
