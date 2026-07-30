import Image from "next/image";

/**
 * Full-bleed ambient background built from a single copper 3D render frame
 * from the brand guideline (docs/Assets/Powerpoint-05/06/07 — the object is
 * a chain-like stack, closer to a DNA strand than a flat photo). One frame
 * per placement — callers vary which one via `frame` so different pages
 * don't all show the same shot, but a single instance never cycles between
 * multiple images.
 *
 * The motion is a seamless infinite horizontal scroll: the frame is
 * rendered twice, side by side, in a container twice its width, translated
 * left by exactly one copy's width in a linear loop — the same
 * duplicate-and-loop technique the site's own ticker uses for its marquee.
 * Because the second copy is already in place when the first scrolls out,
 * there's no jump at the wrap point.
 */
const frames = ["/brand/motion-05.webp", "/brand/motion-06.webp", "/brand/motion-07.webp"];

export default function Motion3D({
  frame = 1,
  variant = "pan",
  className,
  objectPosition,
  priority = false,
}: {
  frame?: 1 | 2 | 3;
  variant?: "pan" | "float";
  className?: string;
  objectPosition?: string;
  /** Set on the one instance per page that's actually the LCP candidate
   * (the Hero/SubpageHero background) — never on CTA's, which sits below
   * the fold on first load and should stay lazy. */
  priority?: boolean;
}) {
  const src = frames[frame - 1];
  const speedClass = variant === "pan" ? "motion3d-scroll-fast" : "motion3d-scroll-slow";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      <div className={`motion3d-scroll flex h-full ${speedClass}`}>
        <div className="relative h-full w-1/2 shrink-0">
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            priority={priority}
            className={`object-cover ${objectPosition ?? ""}`}
          />
        </div>
        <div className="relative h-full w-1/2 shrink-0">
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            priority={priority}
            className={`object-cover ${objectPosition ?? ""}`}
          />
        </div>
      </div>
    </div>
  );
}
