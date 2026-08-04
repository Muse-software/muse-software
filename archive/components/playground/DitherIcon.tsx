"use client";

import { useEffect, useRef } from "react";
import Icon from "../Icon";
import { cn } from "@/lib/utils";

/**
 * PLAYGROUND — P8 in docs/dither-system-plan.md. Not shipped.
 *
 * The house dither at icon scale, which is a different problem from the house
 * dither at card scale and needs a different answer.
 *
 * A 6px lattice cell inside a 1.5px stroke catches one dot and reads as
 * damage, so this does not use the lattice at all. It turns the STROKE into
 * the dot run: a zero-length dash with a round cap renders a dot exactly
 * `stroke-width` across. Every path in `components/Icon.tsx` becomes a
 * halftone with no new geometry and no per-icon artwork, and hover
 * interpolates the dash to solid so the icon resolves under attention rather
 * than lighting up.
 *
 * The measuring pass below is the difference between this looking designed and
 * looking broken. A fixed dash period in user units gives even spacing but
 * does not divide evenly into a closed path, so every circle in the set ends
 * with one short gap where the pattern wraps. Setting `pathLength` to a whole
 * number of dots makes the period exactly 1 and the pattern close cleanly,
 * and choosing that number as `length / SPACING` keeps the physical spacing
 * the same across paths of wildly different lengths. Both properties at once,
 * which is why it is measured at runtime rather than hand-tuned per icon: it
 * works on all fourteen existing icons and on the fifteenth.
 *
 * No JS is not a broken state. The server render carries the user-unit dash,
 * which is correct everywhere and merely imperfect where a path closes.
 */

/** Target gap between dot centres, in the 24-unit viewBox. Tuned against the
 *  lattice: a 1.5px dot every 3.2 units is ~47% coverage, which is the same
 *  density as `.dither`'s 1.3px dot on a 6px cell. The two textures read as
 *  the same material at completely different scales, which is the point. */
const SPACING = 3.2;

/** Below this, a path is too short to read as a dot run and is better left as
 *  a solid tick (the check glyph, the dots in the social marks). */
const MIN_DOTS = 3;

type DitherIconProps = {
  name: React.ComponentProps<typeof Icon>["name"];
  className?: string;
  /** Renders the resolved state without needing a hover, for the specimen
   *  sheet and for anywhere the icon is the subject rather than an accent. */
  solid?: boolean;
};

/**
 * The same fourteen icons as solid silhouettes rather than outlines: closed
 * paths fill, open paths thicken into bars (see `.dither-icon-fill`). On its
 * own it is just a heavier icon set; its reason for existing is to give
 * `DitherGlyph` a stencil, since a fill has no stroke to dash.
 *
 * Not every glyph survives the treatment — `gear` becomes a blob and `share`
 * loses its connecting lines into the nodes. The ones that work are the ones
 * built from closed shapes or from strokes that were already reading as bars.
 */
export function SolidIcon({
  name,
  className,
}: {
  name: React.ComponentProps<typeof Icon>["name"];
  className?: string;
}) {
  return <Icon name={name} className={cn("dither-icon-fill", className)} />;
}

export default function DitherIcon({ name, className, solid = false }: DitherIconProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const svg = ref.current?.querySelector("svg");
    if (!svg) return;

    const shapes = svg.querySelectorAll<SVGGeometryElement>(
      "path, circle, rect, line, ellipse, polyline, polygon",
    );

    for (const shape of shapes) {
      // getTotalLength is on SVGGeometryElement, so circles and rects answer
      // it too — no need to special-case the shape primitives in the set.
      const length = shape.getTotalLength();
      if (!length) continue;
      const dots = Math.round(length / SPACING);
      if (dots < MIN_DOTS) continue;
      shape.setAttribute("pathLength", String(dots));
      shape.style.setProperty("--dither-dash", "1");
    }

    // A frame later, so the browser computes styles once with the new
    // pathLength and the transition still switched off, then re-enables it.
    // Same task and every icon animates from sparse to correct on mount.
    const frame = requestAnimationFrame(() => svg.setAttribute("data-measured", "true"));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <span ref={ref} className="contents">
      <Icon name={name} className={cn("dither-icon", solid && "dither-icon-solid", className)} />
    </span>
  );
}
