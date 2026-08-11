"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useIsDesktop } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

/**
 * Pointer-driven ink dither, ported from the "minimal" landing template. The
 * shaders and the ping-pong simulation live in `DitherCursorScene`; this file
 * is the part that decides whether any of that should exist yet.
 *
 * Same split, and for the same reason, as DitherField around PixelBlast:
 * `next/dynamic` with `ssr: false` cannot be called from a Server Component,
 * and both call sites for this (the CTA panel, optionally the Hero) are
 * server-rendered. Keeping the boundary here also means R3F, drei and three
 * land in their own async chunk instead of the shared bundle.
 */
const DitherCursorScene = dynamic(() => import("./DitherCursorScene"), { ssr: false });

export interface DitherCursorProps {
  ditherSize?: number;
  radius?: number;
  exponent?: number;
  decay?: number;
  intensity?: number;
  color?: string;
  className?: string;
  opacity?: number;
  position?: "fixed" | "absolute";
  /**
   * LOCAL: the template repeated `window.innerWidth < 768` at each call site
   * to keep this off phones. It is a mousemove effect, so on a touch device
   * it renders a blank canvas and burns a WebGL context to do it. Gating is
   * the component's own business, not the caller's.
   */
  desktopOnly?: boolean;
}

export default function DitherCursor({
  ditherSize = 3.0,
  /** LOCAL: upstream's default is `#ffd900`, the template's yellow. */
  color = "#fd4601",
  radius = 0.075,
  exponent = 3.0,
  decay = 0.005,
  intensity = 0.5,
  className,
  opacity = 1,
  position = "fixed",
  desktopOnly = true,
}: DitherCursorProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  /**
   * UPSTREAM FIX: the template's rAF loop never stopped. Two full-screen
   * passes per frame kept running while the section was three screens away,
   * and with an instance in both the hero and the CTA that is two idle
   * simulations for the length of the visit. R3F's `frameloop="demand"` is
   * the documented pause but wants a render request per frame, which suits a
   * static scene and not a continuously evolving simulation. Unmounting is
   * simpler and also releases the WebGL context.
   *
   * The margin is generous on purpose: mounting exactly at the section edge
   * shows a frame of empty canvas before the first ink lands.
   */
  const [isNearViewport, setIsNearViewport] = useState(false);

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

  const shouldRender = isNearViewport && (isDesktop || !desktopOnly);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={cn(
        position === "fixed" ? "fixed" : "absolute",
        "pointer-events-none inset-0 z-0 h-full w-full select-none",
        className,
      )}
    >
      {shouldRender && (
        <DitherCursorScene
          ditherSize={ditherSize}
          radius={radius}
          exponent={exponent}
          decay={decay}
          intensity={intensity}
          color={color}
          opacity={opacity}
        />
      )}
    </div>
  );
}
