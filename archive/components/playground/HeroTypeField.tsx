import type { ReactNode } from "react";
import DitherMask from "./DitherMask";
import DitherFieldDense from "./DitherFieldDense";
import { cn } from "@/lib/utils";

/**
 * PLAYGROUND — P16 in docs/dither-system-plan.md. Not shipped.
 *
 * P2 at hero scale, and the answer to the question the shipped hero cannot
 * answer: why is the most expensive effect on the site being spent on
 * background? Here the shader field is visible ONLY inside the headline and
 * everything else is pure black, so the WebGL context stops decorating the
 * subject and becomes it.
 *
 * Costs one GL context — the one the hero already spends. Not an addition.
 *
 * THE SAFARI CAVEAT IS DIFFERENT HERE, AND IT IS BETTER. `mix-blend-mode` over
 * a live canvas has historically been unreliable in Safari, which is the known
 * risk on `DitherPlate`'s knockout branch. But the two modes fail in opposite
 * directions. If the blend is dropped:
 *
 *   knockout  the stencil is dark type on a WHITE ground, so the panel
 *             renders as a white slab — visibly broken.
 *   fill      the stencil is WHITE type on the ground colour, so it renders
 *             as solid white type on black.
 *
 * Solid white type on black is not a degradation, it is the fallback the plan
 * asked for, and `fill` arrives at it by construction rather than through a
 * `@supports` guard that cannot actually test the thing that breaks. That
 * makes P16 the safer of the two masked-type ideas, which is the opposite of
 * what the catalogue assumed.
 *
 * The ground is `#000` rather than the usual `#060608`. Multiply cannot
 * produce a colour lighter than either input, so anything outside the glyphs
 * lands at the ground colour: on page black that is a near-black rectangle
 * against a near-black page, which is invisible at the site's contrast but
 * visible on a bright display at a shallow angle. Pure black here, and the
 * component is meant for `bg-black` surfaces, which is what `Hero` already is.
 */
export default function HeroTypeField({
  as: Tag = "h2",
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  children: ReactNode;
}) {
  return (
    <DitherMask
      mode="fill"
      field={<DitherFieldDense />}
      // `dither-mask-block` rather than a Tailwind `block w-full`: this whole
      // CSS block sits outside `@layer utilities`, and an unlayered
      // `display: inline-block` beats a layered utility in the cascade with no
      // specificity warning to explain why. See the note in globals.css.
      className={cn("dither-mask-block bg-black", className)}
      style={{ "--dither-mask-ground": "#000" } as React.CSSProperties}
    >
      <Tag className="dither-mask-hug px-6 py-16 font-space-grotesk text-5xl font-bold leading-[1.05] tracking-tight md:px-12 md:py-24 md:text-7xl">
        {children}
      </Tag>
    </DitherMask>
  );
}
