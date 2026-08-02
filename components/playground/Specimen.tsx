import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * PLAYGROUND — the specimen sheet's furniture. Not shipped.
 *
 * One framed cell per component, carrying the two facts that decide whether it
 * can be used anywhere: which engine it runs on, and what that costs. Those
 * are printed on every specimen rather than kept in the plan doc because the
 * engine choice is the decision people get wrong, and it is invisible in a
 * screenshot.
 */
export type Engine = "css" | "svg" | "webgl";

const engineLabel: Record<Engine, { label: string; cost: string; tone: string }> = {
  css: { label: "CSS lattice", cost: "free", tone: "text-white/50" },
  svg: { label: "SVG stroke", cost: "free", tone: "text-white/50" },
  webgl: { label: "PixelBlast", cost: "1 GL context", tone: "text-[#fd4601]" },
};

export default function Specimen({
  id,
  name,
  engine,
  note,
  stageClassName,
  children,
}: {
  /** `P8`, or `§3` for a primitive. Matches docs/dither-system-plan.md. */
  id: string;
  name: string;
  engine: Engine;
  /** One line on what it is FOR. Not what it looks like. */
  note: string;
  stageClassName?: string;
  children: ReactNode;
}) {
  const meta = engineLabel[engine];

  return (
    <section className="border-t border-white/10 pt-6">
      <header className="flex flex-wrap items-baseline gap-x-4 gap-y-2 px-1">
        <span className="font-space-grotesk text-xs font-bold tracking-[0.18em] text-[#fd4601]">
          {id}
        </span>
        <h2 className="font-space-grotesk text-lg font-bold tracking-tight text-white">{name}</h2>
        <span
          className={cn(
            "font-space-grotesk text-[11px] uppercase tracking-[0.16em]",
            meta.tone,
          )}
        >
          {meta.label} · {meta.cost}
        </span>
      </header>

      {/* `dir="ltr"`, and it is the specimens either side of it that must NOT
          get the same treatment. These notes are English documentation chrome;
          left in an RTL container their trailing punctuation jumps to the far
          end of the line, which is correct bidi and looks like a bug. The
          components below are the thing under test and stay in the page's
          direction, because a mask that fails to mirror is exactly what this
          sheet exists to catch. */}
      <p dir="ltr" className="mt-2 max-w-[70ch] px-1 text-sm leading-6 text-white/45">
        {note}
      </p>

      <div
        className={cn(
          "spec-grid relative mt-5 overflow-hidden rounded-lg border border-white/10 bg-[#08080a]",
          stageClassName ?? "p-8 md:p-12",
        )}
      >
        {children}
      </div>
    </section>
  );
}
