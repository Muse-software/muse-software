"use client";

import { useHorizontalScroll } from "../lib/useHorizontalScroll";

type OutlineTrackProps = {
  items: { title: string; body: string }[];
};

export default function OutlineTrack({ items }: OutlineTrackProps) {
  const { trackRef, scroll } = useHorizontalScroll();

  return (
    <div>
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
      >
        {items.map((item) => (
          <div
            data-card
            key={item.title}
            className="flex w-[80vw] max-w-[300px] shrink-0 snap-start flex-col gap-3 border border-white/15 p-6 transition-colors duration-300 hover:border-[#fd4601]"
          >
            <h3 className="font-space-grotesk text-lg font-bold text-[#fd4601]">{item.title}</h3>
            <p className="text-sm leading-6 text-white/70">{item.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => scroll(-1, 20, 320)}
          className="grid h-11 w-11 place-items-center border border-white/30 text-white transition-colors hover:border-[#fd4601] hover:text-[#fd4601]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => scroll(1, 20, 320)}
          className="grid h-11 w-11 place-items-center border border-white/30 text-white transition-colors hover:border-[#fd4601] hover:text-[#fd4601]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
