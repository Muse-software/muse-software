import DitherLayers from "./DitherLayers";
import { cn } from "@/lib/utils";

/**
 * PLAYGROUND — P9 in docs/dither-system-plan.md. Not shipped, and now
 * SUPERSEDED for its original purpose. Read this before picking it.
 *
 * P9 was written against `DitherHover`, which put a CSS Bayer lattice behind
 * each card and ran a requestAnimationFrame loop per card to trail the brush
 * behind the pointer. The pitch was that a twelve-card grid meant twelve loops,
 * so the hover should be a plain CSS transition instead.
 *
 * That premise is gone. `components/CardDither.tsx` replaced `DitherHover`
 * mid-flight and answers the same problem better: one fixed viewport-sized
 * shader canvas for the whole page, whose MASK moves onto whichever card the
 * pointer is on. Only one card can be hovered at a time, so one canvas and one
 * rAF serve any number of cards, with delegated listeners and keyboard parity.
 * The cost argument P9 was built on no longer holds.
 *
 * Worse for this component: `.card-dither`'s own comment records that the CSS
 * lattice was tried for exactly this job and rejected on material grounds — it
 * read as a printed halftone screen, too regular and motionless. This is that
 * material, doing that job.
 *
 * It is kept in the sheet anyway, next to the shipped treatment, for the one
 * thing it still does that `CardDither` cannot: work with no JavaScript, no
 * canvas and no WebGL context at all. If that is never a requirement, cut it.
 *
 * Host requirements, unchanged: `group` (the hover is CSS, not state),
 * `relative isolate` (so `-z-10` lands behind the content but inside the
 * card), and `overflow-hidden` (or the brush spills past the border).
 */
export default function DitherWick({ className }: { className?: string }) {
  return (
    <DitherLayers
      variant="pointer"
      className={cn("dither-wick -z-10 text-[#fd4601]", className)}
    />
  );
}
