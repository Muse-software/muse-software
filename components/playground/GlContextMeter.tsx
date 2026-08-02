"use client";

import { useEffect, useState } from "react";

/**
 * PLAYGROUND — see docs/dither-system-plan.md §5. Not shipped.
 *
 * Live count of WebGL contexts on the page.
 *
 * Rule 1 of the plan is that the context budget is real: browsers keep on the
 * order of 8 to 16 live contexts and silently drop the oldest past that, which
 * is why nothing in the catalogue defaults to a shader. That rule is
 * completely invisible while you are reading it and completely obvious the
 * moment you watch the number climb and a canvas somewhere go black, which is
 * the whole reason the specimens are on a real page rather than in a doc.
 *
 * Counting by patching `getContext` rather than by walking the DOM, because
 * walking is not free of side effects: calling `canvas.getContext("webgl2")`
 * to test a canvas CREATES a context on one that does not have it yet, so the
 * measurement would be the thing causing the problem. The patch installs on
 * mount and every shader on this page is behind `next/dynamic`, so it is in
 * place before any of them load.
 */
type Tracked = { canvas: HTMLCanvasElement; lost: boolean };

const GL_KINDS = new Set(["webgl", "webgl2", "experimental-webgl"]);

/**
 * Module scope, not a closure inside the effect, and that is not a style
 * preference: the patch has to read `this` to know which canvas asked, and the
 * React Compiler bails out of compiling any component containing a function
 * that uses `this`. Hoisting it keeps the meter itself compilable.
 *
 * Returns its own uninstaller so the prototype is always restored, including
 * on a fast-refresh remount, which would otherwise stack patches.
 */
function installContextTracker(tracked: Tracked[], sync: () => void) {
  const original = HTMLCanvasElement.prototype.getContext;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, ...args: any[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const context = (original as any).apply(this, args);

    // getContext returns the SAME context object on repeat calls for the same
    // kind, so a canvas already tracked must not be counted twice.
    if (context && GL_KINDS.has(String(args[0] ?? "")) && !tracked.some((t) => t.canvas === this)) {
      const entry: Tracked = { canvas: this, lost: false };
      tracked.push(entry);
      // A dropped context is the failure this is watching for: it is the
      // signal that the page has overspent rather than merely spent.
      this.addEventListener("webglcontextlost", () => {
        entry.lost = true;
        sync();
      });
      this.addEventListener("webglcontextrestored", () => {
        entry.lost = false;
        sync();
      });
      sync();
    }

    return context;
  };

  return () => {
    HTMLCanvasElement.prototype.getContext = original;
  };
}

export default function GlContextMeter() {
  const [live, setLive] = useState(0);
  const [lost, setLost] = useState(0);

  useEffect(() => {
    const tracked: Tracked[] = [];

    const sync = () => {
      // A canvas removed from the document has released its context, so
      // detached ones do not count against the budget. This is the number
      // that matters, not the number ever created — DitherCursor in
      // particular unmounts itself once it is far enough from the viewport.
      const attached = tracked.filter((t) => t.canvas.isConnected);
      setLive(attached.filter((t) => !t.lost).length);
      setLost(attached.filter((t) => t.lost).length);
    };

    const uninstall = installContextTracker(tracked, sync);

    // Canvases mount asynchronously behind next/dynamic and unmount on
    // scroll, so the count has to be re-derived on any tree change and not
    // only when one is created.
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      uninstall();
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex items-center gap-2 font-space-grotesk text-[11px] uppercase tracking-[0.18em]">
      <span className="text-white/40">WebGL</span>
      <span
        className={
          live >= 8
            ? "rounded-sm bg-[#fd4601] px-1.5 py-0.5 font-semibold text-black"
            : "rounded-sm bg-white/10 px-1.5 py-0.5 font-semibold text-white"
        }
      >
        {live}
      </span>
      {lost > 0 ? (
        <span className="rounded-sm bg-red-500 px-1.5 py-0.5 font-semibold text-black">
          {lost} lost
        </span>
      ) : null}
    </div>
  );
}
