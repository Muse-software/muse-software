"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { useResponsivePixelSize } from "@/lib/use-responsive-pixel-size";
import { cn } from "@/lib/utils";

/**
 * The dot field that runs under a whole page, so the sections read as one
 * surface instead of a stack. It is the same shader as the subpage heroes —
 * see DitherField — tuned down until you register the page as textured
 * without being able to point at the texture.
 *
 * It is deliberately not built on the `.dither` CSS lattice the cards and the
 * hover use. That version was tried here first and read as a printed halftone
 * screen: evenly spaced, motionless, obviously laid on top. The thing that
 * makes this field read as dither is that the dots are thresholded out of a
 * drifting noise field, so they are scattered and they move. That is worth one
 * WebGL context.
 *
 * One context, and only ever a viewport of pixels. The canvas is `fixed` and
 * the *mask* is what scrolls — the composition of five blooms is anchored to
 * positions in the document and slides through the viewport as you go, rather
 * than the layer being as tall as the page. A full-height canvas on a 6000px
 * page would be an enormous framebuffer for a decoration. The blooms and the
 * RTL mirror live in `.page-wash` in globals.css.
 *
 * The host page needs `relative isolate` for `-z-10` to land under the
 * sections but over the page's own background, and its sections must not
 * restate `bg-[#060608]` — an opaque section background is a hole punched in
 * the wash. Both are safe: `<body>` already carries the page colour.
 */
const PixelBlast = dynamic(() => import("./PixelBlast"), { ssr: false });

/** Coarser than DitherField's 3/4/5. This sits behind body copy at very low
 *  opacity, where a fine grain turns to mush; larger, sparser dots stay
 *  legible as dots. */
const PIXEL_SIZES = { mobile: 5, tablet: 6, desktop: 7 } as const;

export default function PageDither({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const pixelSize = useResponsivePixelSize(
    PIXEL_SIZES.mobile,
    PIXEL_SIZES.tablet,
    PIXEL_SIZES.desktop,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const write = () => {
      frame = 0;
      el.style.setProperty("--wash-scroll", `${window.scrollY}px`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };

    // Document height, for the mask box. It is not stable at mount — fonts
    // swap, images decode, and the WebGL heroes fall back to CSS if a context
    // fails, each of which moves the bottom of the page. A ResizeObserver
    // catches all of them without caring which.
    const measure = () => {
      el.style.setProperty("--wash-page", `${document.documentElement.scrollHeight}px`);
    };
    measure();
    write();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(document.documentElement);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className={cn("page-wash", className)}>
      <PixelBlast
        variant="circle"
        pixelSize={pixelSize}
        color="#fd4601"
        patternScale={5}
        patternDensity={1.05}
        pixelSizeJitter={0}
        /* Half the subpage hero's 0.2. At full-page scale the drift should be
           something you notice only if you stop and watch for it. */
        speed={0.1}
        /* No edge fade: the bloom mask is already doing every edge, and a
           second falloff on top of it just eats the blooms nearest the
           viewport sides. */
        edgeFade={0}
        transparent
      />
    </div>
  );
}
