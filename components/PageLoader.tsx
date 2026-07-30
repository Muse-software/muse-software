"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const CELL_COUNT = 100;
const STAGGER_MS = 1.2;
const FADE_MS = 200;
// Upper bound on how long the loader will wait for a clicked navigation to
// actually land before dissolving anyway — a safety net against a stuck
// loader if a click turns out not to trigger a real route change.
const MAX_WAIT_MS = 5000;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * A brief halftone-dissolve mask shown on the initial hard load and again
 * on every internal client-side navigation — a deliberate branded
 * transition moment, not a network-slowness spinner.
 *
 * App Router has no native "navigation started" event, so a capturing
 * click listener on internal links is the earliest reliable signal to show
 * it. It then dissolves once `usePathname()` confirms the target route has
 * actually mounted, rather than on a fixed timer — a guessed delay would
 * either finish too early on a slow/first-compile-in-dev navigation
 * (revealing a gap before the new page is ready) or add pointless wait on
 * a fast one.
 */
export default function PageLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [waitingFor, setWaitingFor] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Initial hard-load reveal — nothing to wait for, dissolves immediately.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
  }, []);

  // Show again the instant the user clicks an internal link to a different
  // page. Registered on the capture phase, not bubble: Next's <Link> calls
  // preventDefault() inside its own React-delegated click handler, which
  // (via React's root-level event delegation) fires before a plain
  // bubble-phase document listener would see the event — by then
  // e.defaultPrevented is already true. Capture fires on the way down,
  // ahead of that.
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const onClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (!href || /^(#|mailto:|tel:)/.test(href)) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      setWaitingFor(window.location.pathname);
      setVisible(true);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Run the staggered dissolve-out once the grid is visible and either
  // there's nothing to wait for (initial mount) or the route has actually
  // changed since the click that triggered this.
  useEffect(() => {
    if (!visible) return;
    if (waitingFor !== null && waitingFor === pathname) return;

    const grid = gridRef.current;
    if (!grid) return;

    const cells = Array.from(grid.children) as HTMLElement[];
    const timeouts: number[] = [];

    cells
      .map((cell) => ({ cell, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .forEach(({ cell }, i) => {
        timeouts.push(
          window.setTimeout(() => cell.classList.add("loader-cell-out"), i * STAGGER_MS)
        );
      });

    const removeTimeout = window.setTimeout(() => {
      setVisible(false);
      setWaitingFor(null);
    }, cells.length * STAGGER_MS + FADE_MS);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(removeTimeout);
    };
  }, [visible, pathname, waitingFor]);

  // Safety net: force the dissolve to start if a clicked navigation never
  // actually lands (pathname never changes), so the loader can't get stuck.
  useEffect(() => {
    if (!visible || waitingFor === null) return;
    const timer = window.setTimeout(() => setWaitingFor(null), MAX_WAIT_MS);
    return () => window.clearTimeout(timer);
  }, [visible, waitingFor]);

  if (!visible) return null;

  return (
    <div ref={gridRef} className="loader-grid" aria-hidden="true">
      {Array.from({ length: CELL_COUNT }).map((_, i) => (
        <div key={i} className="loader-cell" />
      ))}
    </div>
  );
}
