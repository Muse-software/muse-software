"use client";

import { useEffect, useRef } from "react";
import { createMosaicRenderer, type MosaicRenderer } from "./mosaic-renderer";
import "./mosaic-pixels.css";

/** Mount once in .direction-mosaic. The nearest data-mosaic-card owns the mask. */
export default function MosaicCardField() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = host.current;
    const root = element?.closest<HTMLElement>(".direction-mosaic");
    if (!element || !root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let renderer: MosaicRenderer | null = null;
    let hovered: HTMLElement | null = null;
    let focused: HTMLElement | null = null;
    let active: HTMLElement | null = null;
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;
    let lastFrame = 0;
    let time = 17;
    let failed = false;
    let disposed = false;
    const getCard = (target: EventTarget | null) => {
      const card = target instanceof Element ? target.closest<HTMLElement>("[data-mosaic-card]") : null;
      return card && root.contains(card) ? card : null;
    };
    const stop = () => { cancelAnimationFrame(frame); frame = 0; lastFrame = 0; };
    const place = () => {
      if (!active?.isConnected || document.hidden) { element.dataset.active = "false"; return null; }
      const card = active.getBoundingClientRect();
      const field = element.getBoundingClientRect();
      // A fixed element excludes a reserved scrollbar gutter. Window dimensions
      // do not, so masks and shader coordinates must use this same local space.
      const rect = new DOMRect(card.left - field.left, card.top - field.top, card.width, card.height);
      if (rect.bottom <= 0 || rect.top >= field.height || rect.right <= 0 || rect.left >= field.width) {
        element.dataset.active = "false";
        return null;
      }
      const style = getComputedStyle(active);
      const radii = [style.borderTopLeftRadius, style.borderTopRightRadius, style.borderBottomRightRadius, style.borderBottomLeftRadius].join(" ");
      element.style.clipPath = `inset(${rect.top}px ${field.width - rect.right}px ${field.height - rect.bottom}px ${rect.left}px round ${radii})`;
      element.style.setProperty("--mosaic-card-left", `${rect.left}px`);
      element.style.setProperty("--mosaic-card-top", `${rect.top}px`);
      element.style.setProperty("--mosaic-card-width", `${rect.width}px`);
      element.style.setProperty("--mosaic-card-height", `${rect.height}px`);
      element.dataset.active = "true";
      return rect;
    };
    const draw = (now: number) => {
      frame = 0;
      if (disposed || !active || !renderer || document.hidden || preference.matches || failed) return;
      if (lastFrame && now - lastFrame < 1000 / 30) { frame = requestAnimationFrame(draw); return; }
      const rect = place();
      if (!rect) return;
      time += lastFrame ? Math.min((now - lastFrame) / 1000, 0.08) * 0.3 : 0;
      lastFrame = now;
      renderer.draw(time, rect);
      frame = requestAnimationFrame(draw);
    };
    const contextLost = (event: Event) => {
      event.preventDefault();
      failed = true;
      stop();
      element.dataset.live = "false";
      place();
    };
    const sync = () => {
      stop();
      active = hovered || focused;
      if (disposed || !active || document.hidden) { element.dataset.active = "false"; return; }
      const rect = place();
      if (!rect) return;
      if (preference.matches || failed) { element.dataset.live = "false"; return; }
      if (!renderer) {
        try { renderer = createMosaicRenderer("card"); } catch { renderer = null; }
        if (!renderer) { failed = true; return; }
        renderer.canvas.addEventListener("webglcontextlost", contextLost);
        element.appendChild(renderer.canvas);
        const field = element.getBoundingClientRect();
        renderer.resize(field.width, field.height);
      }
      element.dataset.live = "true";
      renderer.draw(time, rect);
      frame = requestAnimationFrame(draw);
    };
    const over = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType === "touch") return;
      pointer = { x: event.clientX, y: event.clientY };
      const next = getCard(event.target);
      if (next !== hovered) { hovered = next; sync(); }
    };
    const out = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const next = getCard(event.relatedTarget);
      if (next !== hovered) { hovered = next; sync(); }
      if (!event.relatedTarget) pointer = null;
    };
    const move = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType === "touch") return;
      pointer = { x: event.clientX, y: event.clientY };
      const next = getCard(event.target);
      if (next !== hovered) { hovered = next; sync(); }
    };
    const focusIn = (event: FocusEvent) => { hovered = null; pointer = null; focused = getCard(event.target); sync(); };
    const focusOut = (event: FocusEvent) => { focused = getCard(event.relatedTarget); sync(); };
    const reposition = () => {
      if (pointer && finePointer.matches) hovered = getCard(document.elementFromPoint(pointer.x, pointer.y));
      if (active || hovered || focused) sync();
    };
    const resize = () => {
      if (renderer && !document.hidden) {
        const field = element.getBoundingClientRect();
        renderer.resize(field.width, field.height);
      }
      reposition();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(element);
    const preferenceChanged = () => { if (!finePointer.matches) { hovered = null; pointer = null; } sync(); };
    root.addEventListener("pointerover", over, { passive: true });
    root.addEventListener("pointerout", out, { passive: true });
    root.addEventListener("pointermove", move, { passive: true });
    root.addEventListener("focusin", focusIn);
    root.addEventListener("focusout", focusOut);
    window.addEventListener("scroll", reposition, { passive: true, capture: true });
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", sync);
    preference.addEventListener("change", preferenceChanged);
    finePointer.addEventListener("change", preferenceChanged);
    return () => {
      disposed = true;
      stop();
      root.removeEventListener("pointerover", over);
      root.removeEventListener("pointerout", out);
      root.removeEventListener("pointermove", move);
      root.removeEventListener("focusin", focusIn);
      root.removeEventListener("focusout", focusOut);
      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", sync);
      preference.removeEventListener("change", preferenceChanged);
      finePointer.removeEventListener("change", preferenceChanged);
      resizeObserver.disconnect();
      renderer?.canvas.removeEventListener("webglcontextlost", contextLost);
      renderer?.dispose();
      renderer?.canvas.remove();
    };
  }, []);

  return <div ref={host} className="mosaic-card-field" data-active="false" data-live="false" aria-hidden="true"><div className="mosaic-card-still" /></div>;
}
