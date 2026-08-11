import DitherLayers, { type DitherCell } from "./DitherLayers";
import { cn } from "@/lib/utils";

/**
 * PLAYGROUND — P5 in docs/dither-system-plan.md. Not shipped.
 *
 * The boundary between two sections, as a band of dither rather than a cut
 * edge or a gradient scrim.
 *
 * This is the most reusable thing in the catalogue. The site currently ends a
 * section either on a hard edge or on a `bg-linear-to-t from-[#060608]` scrim
 * (SubpageHero, Hero), and a scrim only works when the thing above it is
 * lighter than the page. A seam works between any two sections, carries the
 * house texture, and makes the page read as one surface with a rhythm rather
 * than a stack of boxes — which is the same argument `.page-wash` makes at
 * page scale, for the price of no WebGL context at all.
 *
 * - `crest` is the seam proper: densest along the centre line, dissolving both
 *   ways, so the boundary is where the texture peaks.
 * - `pinch` is the CTA panel's treatment: dense at both block edges, clear
 *   through the middle. For putting AROUND content rather than between it.
 * - `down` / `up` are the shipped single-sided bands, exposed here so the four
 *   can be compared side by side.
 *
 * Every mask runs on the block axis, so none of this needs RTL work.
 *
 * `bloom` adds the existing `.copper-bloom`, a soft orange light under the
 * band. Dots over a warm gradient read as texture over depth; dots on flat
 * black read as a screen laid on top. It is worth the extra layer on a large
 * seam and is noise on a small one.
 */
export default function DitherSeam({
  variant = "crest",
  cell = "md",
  bloom = false,
  height = "clamp(4rem, 12vw, 8rem)",
  className,
}: {
  variant?: "crest" | "pinch" | "down" | "up";
  cell?: DitherCell;
  bloom?: boolean;
  height?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      style={{ height }}
      className={cn("relative w-full overflow-hidden text-[#fd4601]", className)}
    >
      {bloom ? (
        // `.dissolve-band` on top of the bloom, or the gradient is still warm
        // at the box's own bottom edge and the seam ends on a visible rule
        // exactly where the texture it is lighting has already gone.
        <div className="copper-bloom dissolve-band absolute inset-0 opacity-60" />
      ) : null}
      {/* 0.55, tuned by looking. The lattice at full density is roughly 60%
          coverage, so an unmodulated seam renders as a solid orange stripe
          across the page rather than as a swell in the texture. Every shipped
          call site of `.dither` tones it down the same way (`opacity-45` on
          the four DitherHover cards); this is that number for a band. */}
      <DitherLayers variant={variant} cell={cell} className="opacity-55" />
    </div>
  );
}
