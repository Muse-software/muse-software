"use client";

import { useState } from "react";
import DitherLayers from "./DitherLayers";

/**
 * PLAYGROUND — P21 in docs/dither-system-plan.md. Not shipped.
 *
 * The open panel carries a field and the closed ones do not, so which item is
 * open is a change of MATERIAL rather than a rotated chevron. Density as
 * state, which is the section 0 thesis applied to the smallest piece of UI on
 * the site.
 *
 * The chevron stays. This adds the thing that is legible from across the room;
 * it does not replace the thing that is legible at reading distance, and
 * `aria-expanded` is what actually carries the state to anyone not looking at
 * either.
 *
 * The expand mechanism is the shipped one, untouched — `.accordion-item` /
 * `.accordion-panel` and their `grid-template-rows: 0fr → 1fr` transition from
 * globals.css. That is deliberate: the only variable under test here is the
 * surface, so reimplementing the animation next to it would make the two
 * incomparable and would drift the moment either changed.
 *
 * `pinch` rather than a flat wash, and this is the detail that makes it
 * usable. A field across the whole open item puts dots behind the answer, and
 * rule 8 caps texture behind body copy at roughly 25% effective coverage
 * before the paragraph needs its own scrim. `pinch` is dense at the item's two
 * block edges and clear through the middle, so the material change lands on
 * the seams where the eye reads it and the copy sits in clean space. No scrim
 * needed, and the effect is stronger rather than weaker for being partial.
 *
 * Block axis throughout, so none of this needs RTL work.
 */
export type FaqItem = { q: string; a: string };

export default function DitherFAQ({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.q}
            className={`dither-faq-item accordion-item relative isolate border-b border-white/15 text-[#fd4601] ${
              isOpen ? "open" : ""
            }`}
          >
            {/* Only mounted while open. A permanently mounted field faded to
                zero would be four more painted layers per item for the 80% of
                the accordion that is closed at any moment.

                The opacity lives on `.dither-faq-item .dither` in globals.css
                rather than on a Tailwind `opacity-*` here, and deliberately:
                that block is unlayered, so it would beat the utility silently
                if both existed. One owner, and it is the one that wins. */}
            {isOpen ? <DitherLayers variant="pinch" cell="md" /> : null}

            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="dither-focus relative z-10 flex w-full items-center justify-between gap-6 py-6 text-start outline-none"
            >
              <span className="font-space-grotesk text-lg text-white md:text-xl">{item.q}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className={`shrink-0 text-white transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>

            <div className="accordion-panel relative z-10">
              <div>
                <p className="max-w-[65ch] pb-6 text-base leading-7 text-white/60">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
