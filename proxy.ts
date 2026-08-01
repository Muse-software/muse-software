import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

/**
 * Everything the locale proxy must NOT touch:
 *
 * - `api`      the three form routes live outside [locale]; prefixing them
 *              would 404 every submission.
 * - `_next`    build output.
 * - `_vercel`  platform endpoints (speed insights, etc).
 * - `opengraph-image`
 *              `app/opengraph-image.tsx` stays at the root and, unlike
 *              sitemap.xml or favicon.ico, its route has no file extension —
 *              so the `.*\..*` escape below does not cover it. Without this
 *              entry it gets rewritten to `/ar/opengraph-image`, which does
 *              not exist, and every social preview on the site breaks.
 * - `.*\..*`   any path with a dot: static assets, sitemap.xml, robots.txt.
 */
export const config = {
  matcher: "/((?!api|_next|_vercel|opengraph-image|.*\\..*).*)",
};
