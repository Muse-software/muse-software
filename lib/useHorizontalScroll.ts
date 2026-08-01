"use client";

import { useEffect, useRef } from "react";

/**
 * Shared behavior for the site's snap-scroll card tracks (BeliefSlider,
 * OutlineTrack). Was hand-copied identically in each one. A third consumer,
 * Testimonials, was removed on 2026-08-01 along with its invented quotes.
 *
 * Also fixes a real gap none of them had: `overflow-x: auto` only
 * responds to touch/trackpad horizontal swipes and the prev/next buttons.
 * a plain vertical mouse wheel does nothing to the track (the browser just
 * scrolls the page past it instead), which reads as the carousel being
 * unresponsive to anyone without a trackpad. Remaps a vertical wheel gesture
 * to horizontal scrollLeft while the pointer is over the track, but only
 * when the track actually overflows and the gesture isn't already
 * horizontal (trackpad swipes pass through untouched).
 */
/**
 * `scrollLeft` and `scrollBy({ left })` address a physical axis; `dir` does not
 * flip them. Under `dir="rtl"` the inline start edge is the right one, and the
 * spec every current browser follows has `scrollLeft` sit at 0 there and run
 * *negative* toward the end of the content. So "advance one card" is `+width`
 * in LTR and `-width` in RTL, and a wheel gesture has to be remapped the same
 * way. Without this both the prev/next buttons and the wheel run backwards on
 * every Arabic carousel: the Next button walks toward the first card and stops
 * dead at the one already on screen.
 *
 * Read off the element at call time rather than cached at mount, so the hook
 * stays correct wherever a track ends up nested.
 */
function inlineSign(el: HTMLElement): 1 | -1 {
  return getComputedStyle(el).direction === "rtl" ? -1 : 1;
}

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
      track.scrollLeft += inlineSign(track) * e.deltaY;
    };

    track.addEventListener("wheel", handleWheel, { passive: false });
    return () => track.removeEventListener("wheel", handleWheel);
  }, []);

  const scroll = (direction: 1 | -1, gapPx: number, fallbackWidth: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const width = card ? card.offsetWidth + gapPx : fallbackWidth;
    track.scrollBy({
      left: inlineSign(track) * direction * width,
      behavior: "smooth",
    });
  };

  return { trackRef, scroll };
}
