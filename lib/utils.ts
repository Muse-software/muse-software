import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Conditional class names with later Tailwind utilities winning over earlier
 * conflicting ones. Added alongside the ported minimal-template components,
 * which assume it exists at `@/lib/utils` — keeping the import path identical
 * means a future re-pull from that template drops in without a rewrite.
 *
 * Most of this codebase builds class strings with template literals and does
 * not need it. Reach for `cn` when a component takes a `className` prop that
 * has to be able to *override* one of its own defaults; a template literal
 * concatenates in that case and leaves both classes fighting on specificity.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
