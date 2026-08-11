import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware replacements for the `next/link` and `next/navigation` exports.
 * Anything that renders an internal href or reads/pushes a route must come
 * from here, or the locale prefix falls off on client-side navigation.
 *
 * Deliberate exception: `components/PageLoader.tsx` keeps `next/navigation`'s
 * `usePathname`, because it compares the hook's value against
 * `window.location.pathname`. The version below strips the locale prefix, so
 * that comparison would never match and the loader would dissolve instantly.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
