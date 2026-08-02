"use client";

import { useState } from "react";
import DitherLayers from "./DitherLayers";

/**
 * PLAYGROUND — see docs/dither-system-plan.md §5. Not shipped.
 *
 * Live control over the four variables the whole system runs on, so cell sizes
 * get chosen by looking at them rather than by argument.
 *
 * Every value tuned here becomes a hard-coded default in the component that
 * wins. No knob survives into anything shipped: a texture with runtime
 * configuration is a texture nobody has decided about, and the four `.dither`
 * constants in globals.css are each already the result of one of these
 * arguments having been settled once.
 */
const knobs = [
  { key: "--dither-cell", label: "cell", min: 3, max: 24, step: 1, unit: "px", initial: 6 },
  { key: "--dither-dot", label: "dot", min: 0.4, max: 6, step: 0.1, unit: "px", initial: 1.3 },
  { key: "--dither-level", label: "level", min: 0, max: 1, step: 0.01, unit: "", initial: 1 },
  { key: "--dither-burst", label: "burst", min: 0, max: 2, step: 0.01, unit: "", initial: 0.8 },
] as const;

type Values = Record<string, number>;

export default function DitherKnobs() {
  const [values, setValues] = useState<Values>(() =>
    Object.fromEntries(knobs.map((k) => [k.key, k.initial])),
  );
  const [variant, setVariant] = useState<"wash" | "crest" | "pinch" | "fray" | "pointer">("wash");

  const style = Object.fromEntries(
    knobs.map((k) => [k.key, `${values[k.key]}${k.unit}`]),
  ) as React.CSSProperties;

  return (
    <div className="grid gap-6 md:grid-cols-[16rem_1fr]">
      <div className="flex flex-col gap-4">
        {knobs.map((knob) => (
          <label key={knob.key} className="block">
            <span className="flex items-baseline justify-between font-space-grotesk text-[11px] uppercase tracking-[0.16em] text-white/45">
              {knob.label}
              <span className="text-white/70">
                {values[knob.key]}
                {knob.unit}
              </span>
            </span>
            <input
              type="range"
              min={knob.min}
              max={knob.max}
              step={knob.step}
              value={values[knob.key]}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, [knob.key]: Number(event.target.value) }))
              }
              className="mt-2 w-full accent-[#fd4601]"
            />
          </label>
        ))}

        <fieldset className="mt-1">
          <legend className="font-space-grotesk text-[11px] uppercase tracking-[0.16em] text-white/45">
            mask
          </legend>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {(["wash", "crest", "pinch", "fray", "pointer"] as const).map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setVariant(name)}
                aria-pressed={variant === name}
                className={
                  variant === name
                    ? "rounded-sm bg-[#fd4601] px-2 py-1 font-space-grotesk text-[11px] font-semibold text-black"
                    : "rounded-sm bg-white/10 px-2 py-1 font-space-grotesk text-[11px] text-white/70 transition-colors hover:bg-white/20"
                }
              >
                {name}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {/* `--dither-x/y` centred so the `pointer` mask has somewhere to sit
          without a rAF loop writing to it. */}
      <div
        style={{ ...style, "--dither-x": "50%", "--dither-y": "50%" } as React.CSSProperties}
        className="relative min-h-[18rem] overflow-hidden rounded-md border border-white/10 bg-black text-[#fd4601]"
      >
        <DitherLayers variant={variant} ramp />
      </div>
    </div>
  );
}
