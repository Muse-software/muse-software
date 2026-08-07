"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

export interface MagneticProps {
  children: ReactNode;
  /** Fraction of the pointer offset the wrapper travels. 1 would track the pointer exactly. */
  strength?: number;
  /** Pixels from centre at which the pull starts falling off to nothing. */
  radius?: number;
  className?: string;
}

const SPRING = { stiffness: 150, damping: 15, mass: 0.1 };

/**
 * A hover-pull wrapper (source technique: codrops/MagneticButtons, MIT — see
 * `THIRD-PARTY-LICENSES.md`), reimplemented as a `motion.span` around
 * arbitrary children rather than the upstream `motion.button`.
 *
 * The site's CTAs are `<Link>`/`<PillButton>` anchors, not buttons — replacing
 * the tag would change semantics (and drop the hover/RTL styling already on
 * those components), so this wraps them instead of becoming one. `href`,
 * click handling and keyboard activation all stay on the child, untouched.
 *
 * Gated to `(pointer: fine)` so a touch tap never leaves a residual offset
 * with no pointerleave to clear it, and off entirely under reduced motion —
 * both checks read live via `useMediaQuery`, not just at mount.
 */
export default function Magnetic({ children, strength = 0.3, radius = 100, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const isFinePointer = useMediaQuery("(pointer: fine)");
  const active = isFinePointer && !reducedMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  const handlePointerMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);

    if (Math.hypot(relX, relY) > radius) {
      x.set(0);
      y.set(0);
      return;
    }
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={active ? { x: springX, y: springY } : undefined}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.span>
  );
}
