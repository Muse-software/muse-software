"use client";

import WordReveal from "../WordReveal";
import { useHorizontalScroll } from "../../lib/useHorizontalScroll";

// Placeholder testimonials — swap for real client quotes once available.
const stories = [
  {
    company: "Acme",
    quote:
      "Muse gives us the equivalent of an in-house AI team on demand. We ship features in weeks that used to take quarters, without lowering the bar on quality.",
  },
  {
    company: "Globex",
    quote:
      "What stood out was the pace of iteration. They didn't hand us a strategy deck — they had a working prototype in front of us inside the first two weeks.",
  },
  {
    company: "Initech",
    quote:
      "They care about our business outcomes as much as we do. It never feels like a vendor relationship — more like an extension of our own team.",
  },
];

export default function Testimonials() {
  const { trackRef, scroll } = useHorizontalScroll();

  return (
    <section className="bg-[#060608] py-20 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <WordReveal
          as="h2"
          className="font-space-grotesk text-2xl font-bold text-white md:text-4xl"
        >
          Real stories, real results.
        </WordReveal>

        <div
          ref={trackRef}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 md:mt-14"
        >
          {stories.map((story) => (
            <div
              data-card
              key={story.company}
              className="flex w-[85vw] max-w-[560px] shrink-0 snap-start flex-col justify-between gap-8 border border-white/10 p-8 md:p-10"
            >
              <p className="text-lg leading-8 text-white/80 md:text-xl md:leading-9">
                &ldquo;{story.quote}&rdquo;
              </p>
              <p className="font-space-grotesk text-sm uppercase tracking-[0.3em] text-white/50">
                {story.company}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            aria-label="Previous story"
            onClick={() => scroll(-1, 24, 600)}
            className="grid h-11 w-11 place-items-center border border-white/30 text-white transition-colors hover:border-[#fd4601] hover:text-[#fd4601]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next story"
            onClick={() => scroll(1, 24, 600)}
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
