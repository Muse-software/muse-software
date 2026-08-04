import { cn } from "@/lib/utils";

/**
 * PLAYGROUND — see docs/dither-system-plan.md. Not shipped.
 *
 * The four Bayer layers: a dot grid per layer, offset to the four
 * sub-positions of a 2x2 matrix, each taking its own mask through
 * `--dither-mask`.
 *
 * READ THIS BEFORE DELETING ANYTHING. `components/Dither.tsx` and
 * `components/DitherHover.tsx` were removed on 2026-08-02 when `CardDither`
 * took over the card hover, so this file is now the ONLY consumer of the
 * `.dither` / `.dither-layer` / `.dither-down|up|pointer|wash` block in
 * globals.css. That block is otherwise dead code, and if it is cleaned up
 * every specimen in this directory goes blank at once. Either keep them
 * together or fold the rules into the playground block below them.
 *
 * The markup was duplicated from `Dither.tsx` rather than imported even while
 * that file still existed, for a reason that still applies to any future
 * merge: `Dither` built its class as `dither-${direction}` off a closed union,
 * so a new direction could only arrive as an extra `className`, leaving two
 * equally specific rules (`.dither-wash .dither-layer:nth-child(1)` and
 * `.dither-fray .dither-layer:nth-child(1)` are both 0-3-0) to be settled by
 * source order — which works until the two blocks move relative to each other.
 */
export type DitherVariant =
  /* Shipped, in globals.css under `.dither` */
  | "down"
  | "up"
  | "pointer"
  | "wash"
  /* Playground */
  | "crest"
  | "pinch"
  | "fray"
  | "ramp-inline"
  /* The inline ramp reversed: dense at the inline END, dissolving toward the
     start. P15's split hero needs the field to thin toward the type in the
     middle of the composition rather than away from it. Carries its own
     `[dir="rtl"]` counterpart, same as `ramp-inline`. */
  | "ramp-inline-end";

export type DitherCell = "sm" | "md" | "lg" | "xl";

export default function DitherLayers({
  variant = "wash",
  /** Adds `.dither-ramp`, so `--dither-level` gates how many layers are lit.
   *  Composes with `variant`: the direction masks WHERE, the level masks HOW
   *  MUCH. */
  ramp = false,
  cell,
  band = false,
  className,
  style,
}: {
  variant?: DitherVariant;
  ramp?: boolean;
  cell?: DitherCell;
  band?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      style={style}
      className={cn(
        "dither",
        `dither-${variant}`,
        ramp && "dither-ramp",
        cell && `dither-cell-${cell}`,
        band && "dither-band",
        className,
      )}
    >
      {/* Four, and the order is load-bearing — see the `:nth-child` offsets. */}
      <span className="dither-layer" />
      <span className="dither-layer" />
      <span className="dither-layer" />
      <span className="dither-layer" />
    </span>
  );
}
