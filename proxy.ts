import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleLocale = createMiddleware(routing);

/** next-intl's default cookie. When present it outranks Accept-Language. */
const LOCALE_COOKIE = "NEXT_LOCALE";

/**
 * True when Accept-Language expresses a preference for a locale we actually
 * publish. Only the primary subtag is compared, so `en-GB` counts as English
 * and `ar-EG` as Arabic.
 *
 * A wildcard (`*`), an empty header, or a missing one all return false: they
 * say "no preference", which is the same case as a preference we cannot
 * serve.
 */
function prefersSupportedLocale(header: string | null): boolean {
  if (!header) return false;

  return header
    .split(",")
    .map((part) => part.split(";")[0]!.trim().toLowerCase())
    .some((tag) =>
      routing.locales.some((locale) => tag === locale || tag.startsWith(`${locale}-`))
    );
}

/**
 * Locale routing, with one deliberate departure from next-intl's default.
 *
 * next-intl resolves an unmatched Accept-Language to `defaultLocale`, which
 * here is `ar` — so a French speaker typing muse.sa would land on Arabic.
 * That contradicts the hreflang `x-default` the site already advertises,
 * which points at `/en` on the reasoning that a visitor who reads neither
 * language is better served English (docs/i18n-plan.md section 1).
 *
 * Left alone, the same person gets a different language depending on how
 * they arrive: `/en` when they come through a search result honouring
 * x-default, `/ar` when they type the domain. This closes that gap by
 * forcing the English branch for exactly the "matches neither" case, so the
 * runtime and the crawler hint finally agree.
 *
 * `defaultLocale` stays `ar` — Rule Zero is unchanged, and a visitor who
 * does ask for Arabic, or who has no Accept-Language preference but a
 * NEXT_LOCALE cookie, is unaffected. The override is applied by rewriting
 * the header and handing the request back to next-intl rather than by
 * redirecting here, so its cookie handling and redirect shape stay intact.
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocalePrefix = routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  const hasLocaleCookie = request.cookies.has(LOCALE_COOKIE);

  if (
    !hasLocalePrefix &&
    !hasLocaleCookie &&
    !prefersSupportedLocale(request.headers.get("accept-language"))
  ) {
    const headers = new Headers(request.headers);
    headers.set("accept-language", "en");
    return handleLocale(new NextRequest(request, { headers }));
  }

  return handleLocale(request);
}

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
