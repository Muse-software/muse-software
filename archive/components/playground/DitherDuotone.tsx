import Image from "next/image";
import DitherLayers, { type DitherCell } from "./DitherLayers";
import { cn } from "@/lib/utils";

/**
 * PLAYGROUND — P10 in docs/dither-system-plan.md. Not shipped.
 *
 * The site's photography, resolved into an orange-on-black halftone and
 * returning to the real photo on hover.
 *
 * Worth building because the stock imagery is currently the weakest visual
 * layer on the site: it is the one surface carrying no brand material at all,
 * so it reads as placeholder even though the photographs themselves are real
 * and licensed (see the credits at the top of `lib/content/shared.ts`).
 *
 * This is option (a) from the plan and it is not a true dither — it is a
 * duotone with a screen laid over it. The honest upgrade, if the effect is
 * picked, is a one-shot canvas 2D Bayer threshold at idle cached as a data
 * URL: a real 1-bit result for about 8ms of main thread per image, permitted
 * by the CSP (`img-src data: blob:`) as long as it stays off the critical
 * path. The difference shows on faces, and not much anywhere else.
 *
 * The return to the real photo is a cross-fade between two stacked images
 * rather than a filter transition, because `mix-blend-mode` is not animatable.
 * `Approach` already does exactly this for its icon-to-photograph swap.
 *
 * `sizes` is passed through rather than defaulted: every call site here knows
 * its own layout and a wrong `sizes` silently ships a 2000px file to a 200px
 * box, which is the kind of thing that never shows up in review.
 */
export default function DitherDuotone({
  src,
  alt = "",
  sizes,
  cell = "md",
  className,
}: {
  src: string;
  /** Decorative by default. Pass real alt text if the image carries meaning. */
  alt?: string;
  sizes: string;
  cell?: DitherCell;
  className?: string;
}) {
  return (
    <div className={cn("dither-duotone group relative", className)}>
      {/* The real photograph, underneath and revealed on hover. */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
      />

      {/* The treated copy, on top and fading out. `aria-hidden` and an empty
          alt: this is the same photograph twice, and a screen reader should be
          told about it once. */}
      <div
        aria-hidden="true"
        className="dither-duotone-treated absolute inset-0 transition-opacity duration-500 group-hover:opacity-0 group-focus-visible:opacity-0"
      >
        <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
        {/* 0.45. At full strength the screen swallows the photograph: the
            first pass put an unmodulated wash over these three and the person
            in the gamification frame stopped being a person. The dots have to
            read as a treatment ON an image, which means the image has to
            still be winning. Same call every other component here makes, and
            the same number range. */}
        <DitherLayers variant="wash" cell={cell} className="opacity-45" />
      </div>
    </div>
  );
}
