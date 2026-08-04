import type { ReactNode } from "react";
import DitherLayers from "./DitherLayers";
import DitherMask from "./DitherMask";
import { cn } from "@/lib/utils";

/**
 * PLAYGROUND — P1 in docs/dither-system-plan.md. Not shipped.
 *
 * A display headline whose letterforms are filled with the halftone instead of
 * solid white, with the density ramping across the line so the last word is
 * nearly dissolved. Type that is arriving or departing, rather than type with
 * a texture on it.
 *
 * Two things here are per-script, and both are the same class of problem
 * `.hero-highlight` already solves for the hero's highlight box.
 *
 * The cell size. Arabic strokes are thinner and far more connected than Latin
 * ones, so a 16px cell that gives a Latin capital four dots across gives an
 * Arabic stroke one, and the word reads as broken rather than as dithered.
 * Arabic drops one preset, to `lg`. The override is in globals.css under
 * `[lang="ar"] .dither-display` rather than being branched on the locale here,
 * so this stays a Server Component with no locale prop.
 *
 * The ramp direction. `.dither-ramp-inline` is one of the very few masks on
 * this site that runs on a physical axis rather than the block axis, so it is
 * mirrored under `[dir="rtl"]`. Left alone, an Arabic headline would dissolve
 * at the START of the sentence, which is the same bug class as the `to-r`
 * scrim that used to sit behind the subpage hero's eyebrow.
 */
export default function DitherDisplay({
  as: Tag = "span",
  ramp = true,
  className,
  children,
}: {
  /** Intrinsic tags only, not a generic ElementType: the union keeps the
   *  children typing intact and there is no case for rendering a headline
   *  through an arbitrary component. */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  /** Off gives an even fill at full density, which is the right setting for a
   *  short mark or a single word where a ramp has no room to read. */
  ramp?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <DitherMask
      mode="fill"
      cell="xl"
      className="dither-display"
      field={<DitherLayers variant={ramp ? "ramp-inline" : "wash"} />}
    >
      <Tag
        className={cn(
          // `dither-mask-hug` goes HERE, on the element that carries the
          // display size, not on the stencil wrapper: its padding is in `em`
          // and has to resolve against 72px, not against the inherited 16px.
          // Without it, descenders fall outside the blend sandwich, have no
          // backdrop left to multiply against, and composite as pure white.
          "dither-mask-hug font-space-grotesk text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl",
          className,
        )}
      >
        {children}
      </Tag>
    </DitherMask>
  );
}
