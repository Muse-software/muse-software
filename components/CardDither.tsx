"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { useResponsivePixelSize } from "@/lib/use-responsive-pixel-size";
import { cn } from "@/lib/utils";

/**
 * The dither that fills a card on hover — the same drifting dot field as the
 * subpage headers, not an approximation of it.
 *
 * One canvas serves every card on the page. A shader per card would mean a
 * WebGL context per card, which is the constraint that pushed the first two
 * attempts into CSS: a Bayer lattice (too regular — it read as a printed
 * halftone screen) and then that lattice intersected with turbulence (which
 * read as camouflage, because the noise clumped at a completely different
 * scale from the dots). Only one card can be hovered at a time, though, and
 * that dissolves the problem: keep a single fixed, viewport-sized canvas and
 * move the *mask* onto whichever card the pointer is on.
 *
 * Mount it once per page, on a wrapper that is `relative isolate` — `-z-10`
 * then puts the field above the page background and below every card's
 * content, so it fills the card behind its own text. Sections on that page
 * must not carry an opaque background for the same reason PageDither needs
 * that; both are safe, since `<body>` already sets the page colour.
 *
 * Cards opt in with `data-dither-card`. Binding is delegated from `document`
 * rather than by querying for them at mount, so a card that appears later —
 * the careers list re-renders its grid whenever the department filter
 * changes — is picked up with no registration step.
 */
const PixelBlast = dynamic(() => import("./PixelBlast"), { ssr: false });

/** Matches DitherField, so a card and a subpage header read as the same
 *  material at the same distance. */
const PIXEL_SIZES = { mobile: 3, tablet: 4, desktop: 5 } as const;

export default function CardDither({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const pixelSize = useResponsivePixelSize(
    PIXEL_SIZES.mobile,
    PIXEL_SIZES.tablet,
    PIXEL_SIZES.desktop,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let card: HTMLElement | null = null;
    let frame = 0;

    /**
     * Re-read every frame while a card is active rather than caching on
     * enter: the page scrolls under a stationary pointer, the Approach list
     * travels past a pinned heading, and the mask is in viewport coordinates,
     * so a cached rect would slide out from under the card immediately. One
     * layout read per frame, and only ever for the one card being hovered.
     */
    const follow = () => {
      if (!card) {
        frame = 0;
        return;
      }
      const r = card.getBoundingClientRect();
      el.style.setProperty("--cd-x", `${r.left}px`);
      el.style.setProperty("--cd-y", `${r.top}px`);
      el.style.setProperty("--cd-w", `${r.width}px`);
      el.style.setProperty("--cd-h", `${r.height}px`);
      frame = requestAnimationFrame(follow);
    };

    const activate = (next: HTMLElement) => {
      if (card === next) return;
      card = next;
      el.dataset.active = "true";
      // Place it before the opacity transition starts, or the field fades in
      // over the previous card and slides across to this one.
      follow();
    };

    const deactivate = (leaving: HTMLElement) => {
      if (card !== leaving) return;
      card = null;
      el.dataset.active = "false";
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const cardFrom = (target: EventTarget | null) =>
      target instanceof Element
        ? (target.closest<HTMLElement>("[data-dither-card]") ?? null)
        : null;

    const onOver = (event: PointerEvent) => {
      const next = cardFrom(event.target);
      if (next) activate(next);
    };

    const onOut = (event: PointerEvent) => {
      const from = cardFrom(event.target);
      // `pointerout` also fires moving between children of the same card, so
      // only treat it as a leave when the pointer has genuinely left the box.
      if (from && !from.contains(event.relatedTarget as Node | null)) deactivate(from);
    };

    // Keyboard parity: tabbing to a card lights it the same way hovering does.
    const onFocusIn = (event: FocusEvent) => {
      const next = cardFrom(event.target);
      if (next) activate(next);
    };
    const onFocusOut = (event: FocusEvent) => {
      const from = cardFrom(event.target);
      if (from && !from.contains(event.relatedTarget as Node | null)) deactivate(from);
    };

    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);

    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" data-active="false" className={cn("card-dither", className)}>
      <PixelBlast
        variant="circle"
        pixelSize={pixelSize}
        color="#fd4601"
        patternScale={4}
        patternDensity={1.15}
        pixelSizeJitter={0}
        speed={0.25}
        /* The ellipse mask is already handling every edge; a second falloff
           on top of it just hollows the field out. */
        edgeFade={0}
        transparent
      />
    </div>
  );
}
