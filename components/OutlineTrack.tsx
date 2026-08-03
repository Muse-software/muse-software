"use client";

import TrackNav from "./TrackNav";
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
      <TrackNav className="mt-6" onScroll={(direction) => scroll(direction, 20, 320)} />
    </div>
  );
}
