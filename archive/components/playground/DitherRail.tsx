"use client";

import { useEffect, useRef, useState } from "react";
import DitherLayers from "./DitherLayers";
import { cn } from "@/lib/utils";

/**
 * PLAYGROUND — P7 in docs/dither-system-plan.md. Not shipped.
 *
 * A stepped process where the rail connecting the steps is a dither column
 * whose density rises as each step is passed. Progress as texture rather than
 * as a filled bar, and without a second colour (rule 3).
 *
 * RULE 7 IS THE WHOLE DESIGN CONSTRAINT, not a caveat bolted on afterwards.
 * Scroll may drive the RAIL's density and nothing else. Every heading and
 * every paragraph is fully opaque from first paint, before the observer has
 * fired, and stays that way whether or not the callback ever runs. What
 * changes with scroll is the texture beside the words. Reveal-on-scrub body
 * copy reads as a broken page, which is why this component renders its content
 * eagerly and animates only the material.
 *
 * That also gives it the right no-JS behaviour for free. With scripting off
 * this renders every step at its base density, fully legible, permanently —
 * the honest static state, which is the call `.dither-wash` already makes.
 *
 * ONE IntersectionObserver for the whole rail, not one per step. The plan doc
 * is explicit about this and it is the same lesson `CardDither` learned the
 * expensive way: only one thing can be observed-and-changed at a time, so the
 * machinery should be built once and pointed at whatever is current. A rail of
 * twelve steps costs exactly what a rail of two costs.
 *
 * Steps are unobserved once seen. Progress only ever rises: scrolling back up
 * must not un-complete a step, because that is not what the texture is
 * claiming. It says "you have passed this", not "this is on screen".
 */
export type RailStep = { title: string; body: string };

export default function DitherRail({
  steps,
  className,
}: {
  steps: RailStep[];
  className?: string;
}) {
  const rootRef = useRef<HTMLOListElement>(null);
  const [seen, setSeen] = useState<boolean[]>(() => steps.map(() => false));

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-rail-step]"));

    const observer = new IntersectionObserver(
      (entries) => {
        const reached: number[] = [];

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = items.indexOf(entry.target as HTMLElement);
          if (index === -1) continue;
          reached.push(index);
          // Progress is monotonic, so a step that has been counted has no
          // further news to report. Unobserving here rather than tearing the
          // whole observer down keeps the remaining steps live.
          observer.unobserve(entry.target);
        }

        if (reached.length === 0) return;

        setSeen((prev) => {
          const next = [...prev];
          for (const index of reached) next[index] = true;
          return next;
        });
      },
      // Fires when a step reaches the lower third rather than the very bottom
      // edge, so the density change happens while the step is being read
      // instead of as it leaves.
      { rootMargin: "0px 0px -35% 0px", threshold: 0.15 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [steps.length]);

  return (
    <ol ref={rootRef} className={cn("flex flex-col", className)}>
      {steps.map((step, i) => (
        <li
          key={step.title}
          data-rail-step
          data-rail-seen={seen[i] ? "true" : "false"}
          // `ps-*`, not `pl-*`: the rail is on the inline start edge, so the
          // copy has to be indented from whichever side that is.
          className="dither-cell-sm relative ps-8 pb-10 text-[#fd4601] last:pb-0 md:ps-10"
          style={{ "--dither-level": seen[i] ? 1 : 0.12 } as React.CSSProperties}
        >
          {/* Two absolutely positioned decorations, then the content. The
              content is a sibling of the rail rather than a child of it, so
              nothing about the copy can ever inherit the rail's opacity. */}
          <DitherLayers variant="wash" ramp className="dither-rail" />
          <span aria-hidden="true" className="dither-rail-marker" />

          <h4 className="font-space-grotesk text-lg font-bold leading-snug text-white">
            {step.title}
          </h4>
          <p className="mt-2 max-w-[52ch] text-sm leading-6 text-white/60">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
