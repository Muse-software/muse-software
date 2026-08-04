import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * PLAYGROUND — P11 in docs/dither-system-plan.md. Not shipped.
 *
 * Dither behind the text's own line boxes, so the haze is ragged and stops
 * exactly where each line ends. Type-shaped atmosphere rather than a panel
 * with a texture in it.
 *
 * The plan doc specced this on `DitherMask` and that turned out to be
 * unnecessary, which is the useful finding here. `box-decoration-break: clone`
 * already gives every line box its own background rect, and several
 * `background-image` entries on one element already give the Bayer offsets. So
 * there is no blend mode, no duplicated text, no wrapper: it is one inline
 * element carrying its own dots. All of the CSS is on `.dither-quote`.
 *
 * Two of the four offsets rather than all four, which is `.dither-wash`'s
 * half-density. That is a contrast decision, not a taste one: white on
 * `#fd4601` is 3.4:1 and fails AA, so the dots have to stay sparse enough
 * under the copy that the effective contrast stays near white-on-black.
 *
 * It is the hero's highlighter (`.hero-highlight`) rebuilt in the house
 * texture, and it inherits that component's per-script metrics problem for the
 * same reason: Arabic ink is half again as tall as Latin and its descenders
 * drop twice as far, so one padding pair cannot hug both.
 */
export default function DitherQuote({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <span className={cn("dither-quote", className)}>{children}</span>;
}
