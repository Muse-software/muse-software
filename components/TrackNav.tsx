"use client";

import { useTranslations } from "next-intl";

/**
 * Previous/next controls for the two snap-scroll card tracks (BeliefSlider,
 * OutlineTrack). Both files carried a byte-identical copy of this markup, and
 * both carried the same RTL defect in it — which is the argument for one
 * component rather than two: the fix had to be made twice and could be made
 * once.
 *
 * The defect: the chevron paths are drawn pointing at a PHYSICAL direction,
 * and `dir` does not flip a path. `useHorizontalScroll` already inverts the
 * scroll sign under RTL, so the buttons *worked* — they just pointed the wrong
 * way while working, which is worse than being broken, because nothing about
 * the page tells you to distrust them.
 *
 * Measured on /ar/about at 1440 before this component existed: "previous" sat
 * at x=1186 and "next" at x=1130, so previous was the rightmost control — and
 * it rendered a left-pointing chevron. Reading the pair left to right you got
 * "> <": next pointing back at the cards it came from, previous pointing away
 * from them.
 *
 * Both glyphs carry `.arrow-inline`, the site's existing device for exactly
 * this (see globals.css). Under RTL it mirrors them, so previous — on the
 * right — points right, and next — on the left — points left. Same treatment
 * the PixelArrow, the nav's up-and-out arrow and the hero rule's arrowhead
 * already get, so there is one rule for directional glyphs on the site rather
 * than one per component.
 *
 * `place-items-center` blockifies the svg, so `.arrow-inline`'s
 * `display: inline-block` is inert here and the glyph stays centred.
 */
export default function TrackNav({
  onScroll,
  previousLabel,
  nextLabel,
  className,
}: {
  /** `-1` is previous, `1` is next — the hook maps the sign onto the inline
   *  axis, so this stays logical rather than physical. */
  onScroll: (direction: 1 | -1) => void;
  /** Overrides for tracks whose items have their own name for the step
   *  ("previous belief" rather than "previous"). Defaults to `Common`. */
  previousLabel?: string;
  nextLabel?: string;
  className?: string;
}) {
  const common = useTranslations("Common");

  const buttonClass =
    "grid h-11 w-11 place-items-center border border-white/30 text-white transition-colors hover:border-[#fd4601] hover:text-[#fd4601] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fd4601]";

  return (
    <div className={`flex gap-3 ${className ?? ""}`}>
      <button
        type="button"
        aria-label={previousLabel ?? common("previous")}
        onClick={() => onScroll(-1)}
        className={buttonClass}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="arrow-inline"
        >
          <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <button
        type="button"
        aria-label={nextLabel ?? common("next")}
        onClick={() => onScroll(1)}
        className={buttonClass}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="arrow-inline"
        >
          <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}
