"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Wires Lenis's smoothed scroll into gsap's own ticker — the integration path
 * documented by both projects — so every existing `ScrollTrigger` (WordReveal,
 * the demo pins) reads Lenis's animated position instead of the instantaneous
 * native one. Renders no DOM of its own: Lenis with no `wrapper`/`content`
 * option animates the real `window` scroll, so `PageDither` and `SiteHeader`'s
 * plain `window.scrollY` listeners keep working unmodified.
 *
 * Reduced motion skips Lenis entirely — native instant scroll is the correct
 * "reduced" behaviour, not a slowed-down animation of the same thing.
 */
export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({ autoRaf: false });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  // Next scrolls the real `window` to the top instantly on a client-side route
  // change, but Lenis tracks its own animated-scroll value separately from the
  // DOM — without this reset it resumes the *next* gesture from the previous
  // page's offset instead of the new page's top.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <>{children}</>;
}
