"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/use-media-query";

/**
 * A pointer-following reticle (source technique: codrops/CrosshairDistortion,
 * MIT — see `THIRD-PARTY-LICENSES.md`): four corner brackets that lock onto
 * whatever is under the pointer, framing it, and collapse to a small square
 * around the bare pointer over everything else.
 *
 * Pure SVG/DOM — **zero WebGL contexts** — the biggest reason it's global
 * rather than intersection-gated like the R3F surfaces. Positions are pushed
 * with direct DOM attribute writes inside a single rAF loop (the same
 * imperative-over-`window` pattern as `PageDither`'s scroll listener) instead
 * of React state, since this runs every frame the pointer moves.
 *
 * Elements under `[data-no-crosshair]` (the CTA panel, which already runs its
 * own `DitherCursor`) hide this entirely rather than let two pointer-driven
 * effects fight over the same area.
 */
const HOVER_SELECTOR = "a, button, [role='button'], input, textarea, select, summary, [data-cursor-target]";
const SUPPRESS_SELECTOR = "[data-no-crosshair]";
const ARM = 14;
const IDLE_HALF = 20;
const PADDING = 6;
const EASE = 0.22;

type Box = { left: number; top: number; right: number; bottom: number };

function idleBox(x: number, y: number): Box {
  return { left: x - IDLE_HALF, top: y - IDLE_HALF, right: x + IDLE_HALF, bottom: y + IDLE_HALF };
}

function cornerPath(box: Box, corner: 0 | 1 | 2 | 3): string {
  const armX = Math.max(0, Math.min(ARM, (box.right - box.left) / 2 - 1));
  const armY = Math.max(0, Math.min(ARM, (box.bottom - box.top) / 2 - 1));
  switch (corner) {
    case 0: // top-left
      return `M ${box.left} ${box.top + armY} L ${box.left} ${box.top} L ${box.left + armX} ${box.top}`;
    case 1: // top-right
      return `M ${box.right - armX} ${box.top} L ${box.right} ${box.top} L ${box.right} ${box.top + armY}`;
    case 2: // bottom-right
      return `M ${box.right} ${box.bottom - armY} L ${box.right} ${box.bottom} L ${box.right - armX} ${box.bottom}`;
    default: // bottom-left
      return `M ${box.left + armX} ${box.bottom} L ${box.left} ${box.bottom} L ${box.left} ${box.bottom - armY}`;
  }
}

export default function CrosshairCursor() {
  const isFinePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = usePrefersReducedMotion();
  const mounted = isFinePointer && !reducedMotion;

  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([null, null, null, null]);

  useEffect(() => {
    if (!mounted) return;

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let box = idleBox(pointerX, pointerY);
    let targetBox = box;
    let visible = false;

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      const target = event.target as Element | null;

      if (target?.closest(SUPPRESS_SELECTOR)) {
        visible = false;
        return;
      }
      visible = true;

      const hovered = target?.closest(HOVER_SELECTOR);
      if (hovered) {
        const rect = hovered.getBoundingClientRect();
        targetBox = {
          left: rect.left - PADDING,
          top: rect.top - PADDING,
          right: rect.right + PADDING,
          bottom: rect.bottom + PADDING,
        };
      } else {
        targetBox = idleBox(pointerX, pointerY);
      }
    };

    const onPointerLeaveDocument = () => {
      visible = false;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeaveDocument);

    let rafId: number;
    const tick = () => {
      box = {
        left: box.left + (targetBox.left - box.left) * EASE,
        top: box.top + (targetBox.top - box.top) * EASE,
        right: box.right + (targetBox.right - box.right) * EASE,
        bottom: box.bottom + (targetBox.bottom - box.bottom) * EASE,
      };

      if (svgRef.current) svgRef.current.style.opacity = visible ? "1" : "0";
      pathRefs.current.forEach((path, i) => {
        path?.setAttribute("d", cornerPath(box, i as 0 | 1 | 2 | 3));
      });

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeaveDocument);
      cancelAnimationFrame(rafId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 h-full w-full opacity-0 transition-opacity duration-150"
    >
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          ref={(el) => {
            pathRefs.current[i] = el;
          }}
          stroke="#fd4601"
          strokeWidth={1.5}
          fill="none"
        />
      ))}
    </svg>
  );
}
