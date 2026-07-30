"use client";

import WordReveal from "../WordReveal";
import { useHorizontalScroll } from "../../lib/useHorizontalScroll";

const beliefs = [
  "Digital transformation isn't optional anymore — it's the difference between growing and getting replaced by someone who moved faster.",
  "There are three kinds of businesses today: digitally absent, digitally competent, and digitally native. Most are stuck in the middle.",
  "The only way to build something that lasts is to treat design, engineering, and AI as one discipline — not three separate handoffs.",
  "Most companies don't lack ambition. They lack a team that can execute at a global standard, from right here in Saudi Arabia.",
];

export default function BeliefSlider() {
  const { trackRef, scroll } = useHorizontalScroll();

  return (
    <section className="bg-[#060608] py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1100px] px-5 md:px-10">
        <WordReveal
          as="h2"
          className="font-space-grotesk text-2xl font-bold text-white md:text-3xl"
        >
          What we believe
        </WordReveal>

        <div
          ref={trackRef}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
        >
          {beliefs.map((belief, i) => (
            <div
              data-card
              key={belief}
              className="relative w-[85vw] max-w-[420px] shrink-0 snap-start overflow-hidden border border-white/10 p-8 md:p-10"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-6 font-space-grotesk text-[7rem] font-bold leading-none text-white/5 md:text-[8rem]"
              >
                {i + 1}
              </span>
              <p className="relative text-lg leading-8 text-white/80">{belief}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            aria-label="Previous belief"
            onClick={() => scroll(-1, 24, 420)}
            className="grid h-11 w-11 place-items-center border border-white/30 text-white transition-colors hover:border-[#fd4601] hover:text-[#fd4601]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next belief"
            onClick={() => scroll(1, 24, 420)}
            className="grid h-11 w-11 place-items-center border border-white/30 text-white transition-colors hover:border-[#fd4601] hover:text-[#fd4601]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
