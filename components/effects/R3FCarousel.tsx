"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";
import type { CarouselVelocity } from "./R3FCarouselScene";

const R3FCarouselScene = dynamic(() => import("./R3FCarouselScene"), { ssr: false });

export interface R3FCarouselImage {
  src: string;
  alt: string;
}

export interface R3FCarouselProps {
  images: R3FCarouselImage[];
  imageSize?: [number, number];
  gap?: number;
  curveStrength?: number;
  curveFrequency?: number;
  className?: string;
}

const DRAG_SCALE = 0.006;
const WHEEL_SCALE = 0.0025;

/** Same rule `lib/useHorizontalScroll.ts` uses for the DOM card tracks: under `dir="rtl"` a physical rightward drag has to read as "backward," not "forward." */
function inlineSign(el: HTMLElement): 1 | -1 {
  return getComputedStyle(el).direction === "rtl" ? -1 : 1;
}

/**
 * Public wrapper around `R3FCarouselScene` (source technique: colindmg/
 * r3f-experimental-carousel, MIT). Handles everything the plan's §2 WebGL
 * budget rules require and the R3F internals shouldn't have to know about:
 * intersection-gated mounting (the `DitherCursor.tsx` pattern — unmounts,
 * and so disposes, once scrolled away), a DOM fallback under reduced motion
 * (no rAF-driven distortion, per §2 rule 5), and drag/wheel capture scoped to
 * this element so the carousel doesn't fight the page's own scroll.
 */
export default function R3FCarousel({
  images,
  imageSize = [1.6, 1],
  gap = 0.35,
  curveStrength = 0.4,
  curveFrequency = 0.35,
  className,
}: R3FCarouselProps) {
  const reducedMotion = usePrefersReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const velocityRef = useRef<CarouselVelocity>({ impulse: 0 });
  const dragState = useRef({ dragging: false, lastX: 0 });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry?.isIntersecting ?? false),
      { rootMargin: "50% 0px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  // Scoped, non-passive wheel listener — same shape as useHorizontalScroll's,
  // so this carousel and the site's DOM card tracks feel identical to drive.
  // A vertical wheel gesture only drives the carousel while the host is
  // fully inside the viewport — the moment its top or bottom edge crosses
  // the viewport boundary, the user is scrolling *past* the section, not
  // driving it, so the gesture passes through untouched. Without that check
  // every normal scroll wheel tick over any part of a tall host gets
  // hijacked into carousel motion, trapping the page underneath it.
  useEffect(() => {
    const host = hostRef.current;
    if (!host || reducedMotion) return;

    const isFullyInViewport = () => {
      const rect = host.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= window.innerHeight;
    };

    const handleWheel = (event: WheelEvent) => {
      const isVerticalGesture = Math.abs(event.deltaY) > Math.abs(event.deltaX);
      if (!isVerticalGesture || !isFullyInViewport()) return;
      event.preventDefault();
      velocityRef.current.impulse += inlineSign(host) * event.deltaY * WHEEL_SCALE;
    };

    host.addEventListener("wheel", handleWheel, { passive: false });
    return () => host.removeEventListener("wheel", handleWheel);
  }, [reducedMotion]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragState.current = { dragging: true, lastX: event.clientX };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.dragging) return;
    const dx = event.clientX - dragState.current.lastX;
    dragState.current.lastX = event.clientX;
    velocityRef.current.impulse += inlineSign(event.currentTarget) * dx * DRAG_SCALE;
  };

  const stopDragging = () => {
    dragState.current.dragging = false;
  };

  if (reducedMotion) {
    return (
      <div ref={hostRef} className={cn("flex gap-4 overflow-x-auto", className)}>
        {images.map((image) => (
          // eslint-disable-next-line @next/next/no-img-element -- a handful of static thumbnails, not worth next/image's config here
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            className="h-full w-auto shrink-0 rounded-lg object-cover"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={hostRef}
      className={cn("touch-none select-none", className)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerLeave={stopDragging}
      onPointerCancel={stopDragging}
    >
      {/* The WebGL canvas carries no DOM alt text of its own, so only this
          wrapper (not the whole host) is hidden from assistive tech.
          `images[].alt` still reaches a screen reader via the sr-only list
          below — present under normal motion too, not only in the
          reduced-motion fallback above. */}
      <div aria-hidden="true" className="h-full w-full">
        {isNearViewport && (
          <R3FCarouselScene
            images={images.map((image) => image.src)}
            imageSize={imageSize}
            gap={gap}
            curveStrength={curveStrength}
            curveFrequency={curveFrequency}
            velocityRef={velocityRef}
          />
        )}
      </div>
      <ul className="sr-only">
        {images.map((image) => (
          <li key={image.src}>{image.alt}</li>
        ))}
      </ul>
    </div>
  );
}
