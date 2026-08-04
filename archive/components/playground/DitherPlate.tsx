import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import DitherLayers from "./DitherLayers";
import { cn } from "@/lib/utils";

/**
 * PLAYGROUND — P2/P12 in docs/dither-system-plan.md. Not shipped.
 *
 * A panel of dither with a headline in it. Replaces `DitherKnockout`, which
 * offered exactly one colour arrangement and one way of placing the type, both
 * of which turned out to be the wrong defaults.
 *
 * The knockout was the whole idea originally: the field runs edge to edge and
 * the words are holes cut in it. Over the lattice that reads well. Over the
 * shader it very nearly does not, because the shader's dots come and go with
 * the noise and a dark hole needs a dense field to be a hole IN. So placing
 * the type became a choice rather than the concept:
 *
 * - `over` puts solid type ON the field. No blend mode anywhere, which also
 *   makes it the one arrangement with no Safari question mark, and the only
 *   one that is reliably legible over a sparse or moving field.
 * - `knockout` cuts the type OUT of the field. More confident, and it depends
 *   entirely on the field being dense.
 *
 * and the colour trio became a `tone`, because the plate colour, the dot
 * colour and the type colour are one decision, not three:
 *
 * - `ink`         page black plate, orange dither, white type
 * - `accentBlack` orange plate, black dither, white type
 * - `accentWhite` orange plate, white dither, black type
 *
 * Contrast is not uniform across them and one of them is restricted: white on
 * the accent orange is 3.4:1, which clears the 3:1 bar for large text and
 * fails everywhere else. The table and the reasoning are on `.dither-plate` in
 * globals.css. `accentWhite` is the accent tone that is safe at any size.
 *
 * Knockout on the accent plate uses `lighten` rather than `multiply`, because
 * multiply only darkens and those words have to come back UP to the plate
 * colour. Same sandwich, opposite operator.
 */
const DitherFieldDense = dynamic(() => import("./DitherFieldDense"));

export type PlateTone = "ink" | "accentBlack" | "accentWhite";
export type PlateType = "over" | "knockout";

export default function DitherPlate({
  as: Tag = "h3",
  tone = "ink",
  type = "over",
  engine = "lattice",
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  tone?: PlateTone;
  type?: PlateType;
  /** `lattice` is free. `shader` spends one of the page's ~8-16 contexts. */
  engine?: "lattice" | "shader";
  className?: string;
  children: ReactNode;
}) {
  const heading = (
    <Tag
      className={cn(
        // `dither-mask-hug` only matters in knockout mode, where the type is
        // inside a blend sandwich and overflowing ink has no backdrop left to
        // multiply against. Harmless in `over` mode, so it is unconditional
        // rather than another branch.
        "dither-mask-hug font-space-grotesk text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl",
        className,
      )}
    >
      {children}
    </Tag>
  );

  const field =
    engine === "shader" ? <DitherFieldDense /> : <DitherLayers variant="crest" cell="xl" />;

  if (type === "knockout") {
    return (
      <div className={cn("dither-plate", `dither-plate-${tone}`)}>
        {field}
        <div
          className={cn(
            "px-6 py-14 md:px-12 md:py-20",
            tone === "ink" ? "dither-plate-knockout-ink" : "dither-plate-knockout-accent",
          )}
        >
          {heading}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("dither-plate", `dither-plate-${tone}`)}>
      {field}
      <div className="dither-plate-type px-6 py-14 md:px-12 md:py-20">{heading}</div>
    </div>
  );
}
