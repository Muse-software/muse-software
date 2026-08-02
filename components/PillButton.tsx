import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * The Muse arrow, as a bare glyph.
 *
 * The site's existing buttons inline this as a 30x30 SVG with a black `rect`
 * behind it, so the mark reads as a white arrow on a black tile. That works on
 * a white button and not inside a coloured chip, where a hard black square
 * fights the circle it sits in. Here the tile is dropped and the path is filled
 * with `currentColor`, so the chip's own background does the job the rect used
 * to do.
 *
 * `.arrow-inline` mirrors it under RTL. Forward is left in Arabic, and an
 * unmirrored arrow on a "Get started" button points back at the word.
 */
export function PixelArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 30 30"
      aria-hidden="true"
      className={cn("arrow-inline h-4 w-4 fill-current", className)}
    >
      <path d="M10.0066 22V21.0033H11.0053V20.0066H12.004V19.0099H13.0026V18.0132H14.0013V17.0165H15V16.0198H15.9987V15.0231H16.9974V14.0264H17.996V13.0297H18.9947V12.033H19.9934V17.0316H22V8H13.004V10.0026H18.0145V10.9993H17.0159V11.996H16.0172V12.9927H15.0185V13.9895H14.0198V14.9862H13.0211V15.9829H12.0225V16.9796H11.0238V17.9763H10.0251V18.973H9.02642V19.9697H8V21.9723H10.0066V22Z" />
    </svg>
  );
}

type Variant = "onAccent" | "onDark";

/**
 * The button shape from the "minimal" template: a squared-off pill that eases
 * out to a full 50px radius on hover, with the arrow carried in a circular
 * chip that scales up with it. Two surfaces to sit on, hence two variants —
 * `onAccent` for the orange CTA panel and orange footer, `onDark` for page
 * black. In both cases the chip inverts against the button.
 *
 * A single component rather than the four near-copies the template carried,
 * which had already drifted: three different paddings and two different
 * shadow treatments for what is meant to read as one control.
 *
 * Padding is logical (`ps`/`pe`), so the tighter side stays next to the arrow
 * when the whole thing mirrors into Arabic.
 */
type PillButtonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & ({ href: string; external?: false } | { href: string; external: true });

const surface: Record<Variant, string> = {
  onAccent: "bg-white text-black hover:shadow-lg hover:shadow-black/20",
  onDark: "bg-white text-black hover:shadow-lg hover:shadow-[#fd4601]/25",
};

const chip: Record<Variant, string> = {
  onAccent: "bg-[#fd4601] text-black",
  onDark: "bg-[#fd4601] text-black",
};

export default function PillButton({
  children,
  href,
  external,
  variant = "onDark",
  className,
}: PillButtonProps) {
  const content = (
    <>
      <span>{children}</span>
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110",
          chip[variant],
        )}
      >
        <PixelArrow />
      </span>
    </>
  );

  const classes = cn(
    "group inline-flex items-center gap-3 rounded-md py-3 ps-5 pe-3 font-space-grotesk text-base font-medium",
    "transition-all duration-500 ease-out hover:rounded-[50px]",
    surface[variant],
    className,
  );

  if (external) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href as ComponentProps<typeof Link>["href"]} className={classes}>
      {content}
    </Link>
  );
}
