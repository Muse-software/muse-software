"use client";

import { useEffect, useRef } from "react";

/**
 * Shared behavior for the site's three snap-scroll card tracks (Testimonials,
 * BeliefSlider, OutlineTrack) — was hand-copied identically in all three.
 *
 * Also fixes a real gap none of the three had: `overflow-x: auto` only
 * responds to touch/trackpad horizontal swipes and the prev/next buttons —
 * a plain vertical mouse wheel does nothing to the track (the browser just
 * scrolls the page past it instead), which reads as the carousel being
 * unresponsive to anyone without a trackpad. Remaps a vertical wheel gesture
 * to horizontal scrollLeft while the pointer is over the track, but only
 * when the track actually overflows and the gesture isn't already
 * horizontal (trackpad swipes pass through untouched).
 */
export function useHorizontalScroll() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleWheel = (e: WheelEvent) => {
      const canScroll = track.scrollWidth > track.clientWidth;
      const isVerticalGesture = Math.abs(e.deltaY) > Math.abs(e.deltaX);
      if (!canScroll || !isVerticalGesture) return;
      e.preventDefault();
      track.scrollLeft += e.deltaY;
    };

    track.addEventListener("wheel", handleWheel, { passive: false });
    return () => track.removeEventListener("wheel", handleWheel);
  }, []);

  const scroll = (direction: 1 | -1, gapPx: number, fallbackWidth: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const width = card ? card.offsetWidth + gapPx : fallbackWidth;
    track.scrollBy({ left: direction * width, behavior: "smooth" });
  };

  return { trackRef, scroll };
}
