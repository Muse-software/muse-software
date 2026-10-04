"use client";

import { useEffect, useRef } from "react";
import { createMosaicRenderer, type MosaicRenderer } from "./mosaic-renderer";
import "./mosaic-pixels.css";

export default function MosaicHeroField({ locale }: { locale: "en" | "ar" }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stage = element.parentElement?.parentElement;
    let renderer: MosaicRenderer | null = null;
    let frame = 0;
    let lastFrame = 0;
    // Match the original PixelBlast phase and 0.6x evolving noise clock.
    let time = Math.random() * 1000;
    let visible = false;
    let failed = false;
    let disposed = false;
    // The still artwork paints first; the live field starts once the page has
    // loaded and the browser is idle, so it never competes with first paint.
    let ready = false;
    const canAnimate = () => !disposed && ready && visible && !document.hidden && !preference.matches && !failed;
    const stop = () => { cancelAnimationFrame(frame); frame = 0; lastFrame = 0; };
    const draw = (now: number) => {
      frame = 0;
      if (!canAnimate() || !renderer) return;
      frame = requestAnimationFrame(draw);
      // 30 fps, like the card field: the noise drifts slowly, so extra frames add cost, not motion.
      if (lastFrame && now - lastFrame < 1000 / 30) return;
      time += lastFrame ? Math.min((now - lastFrame) / 1000, 0.08) * 0.6 : 0;
      lastFrame = now;
      renderer.draw(time);
    };
    const resize = () => {
      if (!renderer || !visible || document.hidden || preference.matches || failed) return;
      const rect = element.getBoundingClientRect();
      renderer.resize(rect.width, rect.height);
      renderer.draw(time);
    };
    const contextLost = (event: Event) => {
      event.preventDefault();
      failed = true;
      stop();
      element.dataset.live = "false";
    };
    const sync = () => {
      stop();
      if (disposed) return;
      if (preference.matches || failed) {
        element.dataset.live = "false";
        return;
      }
      if (!ready || !visible || document.hidden) return;
      if (!renderer) {
        try { renderer = createMosaicRenderer("hero"); } catch { renderer = null; }
        if (!renderer) { failed = true; return; }
        renderer.canvas.addEventListener("webglcontextlost", contextLost);
        element.appendChild(renderer.canvas);
      }
      resize();
      element.dataset.live = "true";
      if (canAnimate()) frame = requestAnimationFrame(draw);
    };
    const ripple = (event: PointerEvent) => {
      if (!renderer || !canAnimate() || event.pointerType === "touch" || (event.target as Element).closest("a, button, input, select, textarea")) return;
      const rect = element.getBoundingClientRect();
      const x = locale === "ar" ? rect.right - event.clientX : event.clientX - rect.left;
      renderer.ripple(x, event.clientY - rect.top, time);
    };
    let idle = 0;
    const start = () => {
      const begin = () => { ready = true; sync(); };
      if ("requestIdleCallback" in window) idle = requestIdleCallback(begin, { timeout: 2000 });
      else idle = globalThis.setTimeout(begin, 200) as unknown as number;
    };
    if (document.readyState === "complete") start(); else window.addEventListener("load", start, { once: true });
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0 });
    observer.observe(element);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(element);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    stage?.addEventListener("pointerdown", ripple, { passive: true });
    return () => {
      disposed = true;
      stop();
      window.removeEventListener("load", start);
      if ("cancelIdleCallback" in window) cancelIdleCallback(idle); else clearTimeout(idle);
      observer.disconnect();
      resizeObserver.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      stage?.removeEventListener("pointerdown", ripple);
      renderer?.canvas.removeEventListener("webglcontextlost", contextLost);
      renderer?.dispose();
      renderer?.canvas.remove();
    };
  }, [locale]);

  return (
    <div className="mosaic-pixel-field">
      <div ref={host} className="mosaic-hero-pixels" aria-hidden="true" data-live="false">
        <div className="mosaic-hero-still" />
      </div>

    </div>
  );
}
