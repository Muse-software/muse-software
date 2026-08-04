import type { ReactNode } from "react";
import DitherLayers from "./DitherLayers";
import { cn } from "@/lib/utils";

/**
 * PLAYGROUND — P13 in docs/dither-system-plan.md. Not shipped.
 *
 * The field is dense along the bottom edge and thins upward, so the headline
 * floats above a ground rather than sitting on a flat wash. Depth from density
 * alone: no gradient scrim, no parallax, no second colour.
 *
 * The argument for it is a cost argument as much as a visual one. The shipped
 * hero spends a WebGL context on a field that is close to uniform — it drifts,
 * but it is the same density everywhere, so the most expensive thing on the
 * page is buying an effect the free engine can match. A still field is exactly
 * the case where the lattice's regularity is supposed to show, and at `xl` it
 * mostly does not, because a 16px cell at the bottom of a hero is read as
 * ground rather than as pattern.
 *
 * Block axis, so nothing here needs RTL work.
 *
 * `bloom` is the existing `.copper-bloom`, and on this component it earns its
 * layer: dots over a warm gradient read as texture over depth, dots on flat
 * black read as a screen laid on top, and depth is the entire point.
 */
/**
 * The ground's height, and it is a fixed length rather than a share of the
 * box. See the note in the component: this one constant is what stops a
 * longer headline from walking into the dense part of the field.
 */
const GROUND = "13rem";

export default function HeroHorizon({
  bloom = true,
  className,
  children,
}: {
  bloom?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{ "--dither-band-height": GROUND } as React.CSSProperties}
      className={cn(
        "relative isolate overflow-hidden bg-[#060608] text-[#fd4601]",
        className,
      )}
    >
      {bloom ? (
        // Anchored low, matching where the density peaks. `.dissolve-band`
        // keeps the gradient from ending on a visible rule at the box edge.
        <div className="copper-bloom dissolve-band absolute inset-0 opacity-70" />
      ) : null}

      {/* `band`, and that is the fix rather than a detail.

          The first build ran `.dither-up` across the WHOLE box, which makes
          the ground a percentage of the box height — so the taller the
          content, the taller the ground, and the dense zone climbs to meet
          whatever is above it. On /ar the headline wraps a line earlier than
          in English and its third line landed at roughly 60% coverage, well
          past rule 8's ~25% ceiling. Padding the content upward does not fix
          that; it makes the box taller, which makes the ground taller.

          `.dither-band` pins the field to a fixed height at one block edge,
          which is what it was added for, and decouples the ground from the
          content entirely. A horizon is a distance, not a proportion.

          `xl` is the one place the largest cell preset is right: the ground
          has to read as ground from across the room, and at `md` the same
          mask is a fine grey haze with no horizon in it at all. */}
      <DitherLayers variant="up" band cell="xl" className="opacity-55" />

      {/* Bottom padding clears the band. It is the same constant, so the two
          cannot drift: type never enters the ground, at any content length,
          in either script. */}
      <div
        style={{ paddingBottom: `calc(${GROUND} + 2rem)` }}
        className="relative z-10 px-6 pt-16 md:px-12 md:pt-24"
      >
        {children}
      </div>
    </div>
  );
}
