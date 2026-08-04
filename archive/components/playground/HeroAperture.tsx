"use client";

import { useState, type ReactNode } from "react";
import DitherLayers from "./DitherLayers";
import { cn } from "@/lib/utils";

/**
 * PLAYGROUND — P14 in docs/dither-system-plan.md. Not shipped.
 *
 * Page black on load. A circular dither aperture opens once from the centre
 * over 900ms, revealing the field and the headline, and then settles. One
 * motion, on arrival, never again.
 *
 * The mechanism is `--dither-burst` on the four concentric `.dither-pointer`
 * masks, which is the property `.dither-wick` already registers at the top of
 * the playground CSS block. Registered means typed, typed means interpolable,
 * so the four rings open as one aperture instead of snapping between values.
 * The animation is CSS end to end — no rAF, no JS in the critical path, and
 * it starts at first paint rather than after hydration.
 *
 * That last part is why the animation is NOT gated on a mounted flag. Doing
 * this the obvious way — render settled, flip a state on mount, animate —
 * shows the finished frame first and then plays the arrival, which is worse
 * than no animation at all. The attribute is in the server HTML instead, and
 * `prefers-reduced-motion` is handled where it belongs, in the media query.
 *
 * The only thing the client boundary buys is `replay`, which is specimen-sheet
 * furniture: an arrival animation is by definition something you cannot see
 * twice, so there has to be a way to see it twice while judging it. Remounting
 * on a key is the reliable way to restart a CSS animation; toggling the class
 * within a frame is the trick that works until the browser coalesces the two
 * style recalculations.
 *
 * Reduced motion renders open, immediately, with no animation.
 *
 * NOT COMPATIBLE WITH `PageLoader`, which already runs a 100-cell halftone
 * dissolve on every navigation. Two dissolves back to back on the home page is
 * one too many; if this is wanted, that one goes.
 */
export default function HeroAperture({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const [run, setRun] = useState(0);

  return (
    <div className={cn("relative isolate overflow-hidden bg-[#060608]", className)}>
      <div key={run} data-aperture="opening" className="contents">
        <DitherLayers
          variant="pointer"
          cell="lg"
          className="dither-aperture text-[#fd4601] opacity-55"
        />
        <div className="dither-aperture-type relative z-10 px-6 py-24 md:px-12 md:py-32">
          {children}
        </div>
      </div>

      {/* Sheet furniture, not part of the component. */}
      <button
        type="button"
        onClick={() => setRun((n) => n + 1)}
        className="dither-focus absolute bottom-3 end-3 z-20 rounded-md border border-white/15 px-3 py-1.5 font-space-grotesk text-[11px] uppercase tracking-[0.16em] text-white/50 outline-none transition-colors hover:border-[#fd4601]/50 hover:text-white"
      >
        Replay
      </button>
    </div>
  );
}
