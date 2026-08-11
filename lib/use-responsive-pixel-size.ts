"use client";

import { useEffect, useState } from "react";

/**
 * PixelBlast multiplies pixelSize by the device pixel ratio (PixelBlast.tsx,
 * `uPixelSize` in setSize), so one fixed value becomes two to three times as
 * many device pixels on a phone and the field reads as coarse blocks rather
 * than a dither. Step the value down with the viewport so the texture keeps
 * the same visual weight everywhere.
 *
 * pixelSize is in PixelBlast's effect dependency array, so a change here
 * rebuilds the WebGL context. That is fine because this only fires when a
 * breakpoint is actually crossed, not on every resize frame.
 *
 * Shared by the Hero's full-bleed field and the DitherField used behind
 * section headers, which run at different densities but need the same
 * DPR compensation.
 */
export function useResponsivePixelSize(mobile: number, tablet: number, desktop: number) {
  const [size, setSize] = useState<number>(desktop);

  useEffect(() => {
    const tabletQuery = window.matchMedia("(min-width: 768px)");
    const desktopQuery = window.matchMedia("(min-width: 1280px)");
    const update = () =>
      setSize(desktopQuery.matches ? desktop : tabletQuery.matches ? tablet : mobile);
    update();
    tabletQuery.addEventListener("change", update);
    desktopQuery.addEventListener("change", update);
    return () => {
      tabletQuery.removeEventListener("change", update);
      desktopQuery.removeEventListener("change", update);
    };
  }, [mobile, tablet, desktop]);

  return size;
}
