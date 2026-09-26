import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware replacements for the `next/link` and `next/navigation` exports.
 * Anything that renders an internal href or reads/pushes a route must come
 * from here, or the locale prefix falls off on client-side navigation.

 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
