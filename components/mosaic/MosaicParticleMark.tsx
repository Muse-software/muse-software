"use client";

import { useEffect, useRef } from "react";
import "./mosaic-particle-mark.css";

export type MosaicParticleVariant = "idea" | "improve" | "workflow";

type Props = {
  variant?: MosaicParticleVariant;
  active?: boolean;
  size?: number;
  className?: string;
};

// Original Muse artwork and motion. Reference: libraries.dev/orbs (inspected
// 2026-09-22). No thinking-orbs source or presets are copied into this component.
const patterns: Record<MosaicParticleVariant, readonly string[]> = {
  idea: [
    "....#....", ".#..#..#.", "..#.#.#..", "...###...", "#########",
    "...###...", "..#.#.#..", ".#..#..#.", "....#....",
  ],
  improve: [
    "..#####..", ".##...##.", ".#.....#.", ".#..#..#.", ".#.###.#.",
    ".#..#..#.", ".#.....#.", ".##...##.", "..#####..",
  ],
  workflow: [
    ".........", ".###.....", ".#.#.....", ".###.....", "...###...",
    ".....###.", ".....#.#.", ".....###.", ".........",
  ],
};

const particles = Object.fromEntries(Object.entries(patterns).map(([variant, rows]) => [
  variant,
  rows.flatMap((row, y) => [...row].flatMap((cell, x) => cell === "#" ? [{ x, y }] : [])),
])) as Record<MosaicParticleVariant, { x: number; y: number }[]>;

/** Decorative feedback: settles in under a second, never implies background work.
 * In a button/link, pointer entry and keyboard focus trigger a single pass.
 * `active` triggers one pass on selection, or first visibility if initially active.
 * For a noninteractive illustration, put data-particle-trigger on its container.
 */
export default function MosaicParticleMark({ variant = "idea", active = false, size = 40, className = "" }: Props) {
  const svg = useRef<SVGSVGElement>(null);
  const play = useRef<(() => void) | null>(null);
  const selected = useRef(active);

  useEffect(() => {
    const element = svg.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const trigger = element.closest<HTMLElement>("button, a, [data-particle-trigger]");
    const marks = Array.from(element.querySelectorAll("rect"));
    let visible = false;
    let entered = false;
    let animations: Animation[] = [];
    const stop = () => {
      animations.forEach(animation => animation.cancel());
      animations = [];
      element.dataset.moving = "false";
    };
    const animate = () => {
      if (!visible || document.hidden || preference.matches || !element.animate) return;
      stop();
      element.dataset.moving = "true";
      animations = marks.map((mark, index) => {
        const point = particles[variant][index];
        const dx = variant === "idea" ? (point.x - 4) * 2.4 : variant === "improve" ? (index % 2 ? 5 : -5) : (point.x - 4) * 2;
        const dy = variant === "idea" ? (point.y - 4) * 2.4 : variant === "improve" ? ((index % 3) - 1) * 8 : (index % 2 ? 3 : -3);
        return mark.animate([
          { transform: `translate(${dx}px, ${dy}px)`, opacity: 0.18 },
          { transform: "translate(0px, 0px)", opacity: 1 },
        ], { duration: 660, delay: (index % 7) * 24, easing: "cubic-bezier(.2,.75,.25,1)", fill: "backwards" });
      });
      const current = animations;
      Promise.all(current.map(animation => animation.finished)).then(() => {
        if (animations === current) stop();
      }).catch(() => { /* Cancellation is expected when motion becomes unavailable. */ });
    };
    const hover = (event: PointerEvent) => {
      if (event.pointerType === "mouse" || event.pointerType === "pen") animate();
    };
    const focus = () => { if (trigger?.matches(":focus-visible")) animate(); };
    const visibility = () => { if (document.hidden) stop(); };
    const reducedMotion = () => { if (preference.matches) stop(); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) stop();
      else if (!entered) {
        entered = true;
        if (selected.current) animate();
      }
    }, { threshold: 0 });
    observer.observe(element);
    trigger?.addEventListener("pointerenter", hover);
    trigger?.addEventListener("focus", focus);
    document.addEventListener("visibilitychange", visibility);
    preference.addEventListener("change", reducedMotion);
    play.current = animate;
    return () => {
      stop();
      observer.disconnect();
      trigger?.removeEventListener("pointerenter", hover);
      trigger?.removeEventListener("focus", focus);
      document.removeEventListener("visibilitychange", visibility);
      preference.removeEventListener("change", reducedMotion);
      play.current = null;
    };
  }, [variant]);

  useEffect(() => {
    selected.current = active;
    if (active) play.current?.();
  }, [active]);

  return <svg ref={svg} className={`mx-particle-mark ${className}`} viewBox="0 0 64 64" width={size} height={size} data-variant={variant} data-active={active} data-moving="false" fill="currentColor" aria-hidden="true" focusable="false">
    {particles[variant].map(({ x, y }, index) => <rect key={index} x={8 + x * 5.5} y={8 + y * 5.5} width="3.7" height="3.7" />)}
  </svg>;
}

/** One continuous set of pixels moves between the three intent shapes. */
export function MosaicMorphMark({variant}:{variant:MosaicParticleVariant}) {
 const target=particles[variant];
 const count=Math.max(...Object.values(particles).map(points=>points.length));
 return <svg className="mx-intent-morph" viewBox="0 0 64 64" width="80" height="80" aria-hidden="true" focusable="false">
  {Array.from({length:count},(_,i)=>{
   const point=target[i];
   return <rect key={i} x="0" y="0" width="3.7" height="3.7" rx=".35" style={{transform:`translate(${point?8+point.x*5.5:30}px,${point?8+point.y*5.5:30}px) scale(${point?1:0})`,opacity:point?1:0}}/>;
  })}
 </svg>;
}
