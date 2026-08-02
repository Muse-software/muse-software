"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribes to a media query without the mount-time flash.
 *
 * The minimal template this replaces spelled the same idea three separate
 * times — `useState(false)` plus a `resize` listener reading
 * `window.innerWidth`, once in its hero, once in its final CTA, once as a
 * `useSyncExternalStore` in its header. Two problems with the `resize`
 * version, which is why only the third survives here: it recomputes on every
 * resize frame rather than when the breakpoint is actually crossed, and its
 * `false` initial value means a desktop browser renders one frame as mobile.
 *
 * `useSyncExternalStore` also gives an explicit server snapshot, which the
 * `useState` + `useEffect` shape cannot. The default is `false` — the server
 * cannot know the viewport, and every caller here is gating an *expensive*
 * effect (a WebGL context), so the honest default is the cheap branch.
 *
 * @param query   a media query string, e.g. `"(min-width: 768px)"`
 * @param serverSnapshot what to assume during SSR and the first client render
 */
export function useMediaQuery(query: string, serverSnapshot = false): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverSnapshot,
  );
}

/** Tailwind's `md` breakpoint. The cutoff the ported components use to decide
 *  whether a pointer-driven WebGL surface is worth mounting at all. */
export const useIsDesktop = () => useMediaQuery("(min-width: 768px)");

/** Honour the OS "reduce motion" setting. PixelBlast reads the same query
 *  internally; this is for the components around it. */
export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");
