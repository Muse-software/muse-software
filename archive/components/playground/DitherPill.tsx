import type { ReactNode } from "react";
import { PixelArrow } from "@/components/PillButton";
import DitherLayers from "./DitherLayers";
import { cn } from "@/lib/utils";

/**
 * PLAYGROUND — P23 in docs/dither-system-plan.md. Not shipped.
 *
 * `PillButton` with the field bursting outward from the arrow chip on hover,
 * on its way to the 50px radius it already eases to.
 *
 * Deliberately a copy of the shipped button's shape rather than a prop on it.
 * `PillButton` is on nearly every page; adding a variant would put playground
 * CSS in the shipped bundle and make the experiment un-deletable, which is the
 * one thing the whole `components/playground/` arrangement exists to avoid. If
 * this is picked, the burst moves into `PillButton` and this file goes.
 *
 * The interesting part is that it EXTENDS an interaction instead of adding
 * one. The button already has a good hover — the corners round out, the chip
 * scales — and those run on `border-radius` and `transform`, both of which the
 * compositor handles. The field is masked painting on top, and it shares the
 * same 500ms/620ms envelope, so the three read as one gesture rather than as
 * three effects that happen to fire together.
 *
 * `--dither-x` is the chip, which sits at the inline end, so it is physical
 * and flips under RTL. `.dither-pill` carries the counterpart.
 *
 * Contrast: orange dither under black text on a white button. The dots are
 * held at 0.22 opacity, which is well under rule 8's ~25% coverage ceiling for
 * texture behind type, and the label is 18.9:1 on white to begin with.
 */
export default function DitherPill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={cn(
        // `isolate` and `overflow-hidden` are new relative to PillButton: the
        // field has to be clipped to the pill, and it has to be clipped to the
        // ANIMATING radius, which means the clip lives on the element whose
        // radius is transitioning.
        "dither-focus group relative isolate inline-flex items-center gap-3 overflow-hidden rounded-md bg-white py-3 ps-5 pe-3 font-space-grotesk text-base font-medium text-black outline-none",
        "transition-all duration-500 ease-out hover:rounded-[50px] hover:shadow-lg hover:shadow-[#fd4601]/25",
        className,
      )}
    >
      <DitherLayers variant="pointer" cell="sm" className="dither-pill" />

      <span className="relative z-10">{children}</span>
      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fd4601] text-black transition-transform duration-300 group-hover:scale-110">
        <PixelArrow />
      </span>
    </button>
  );
}
