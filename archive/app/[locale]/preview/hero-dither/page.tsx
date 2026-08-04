import type { Metadata } from "next";
import HomeSections from "@/components/sections/HomeSections";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";

/**
 * TEMPORARY — delete once the hero background is decided.
 *
 * The home page, identical in every respect except that the hero renders the
 * pointer-driven ink dither ported from the "minimal" template instead of the
 * shipped PixelBlast field. Open this next to `/[locale]` to compare them on
 * the real page with the real copy.
 *
 * Deliberately not linked from anywhere and marked `noindex, nofollow`. It is
 * still a real, publicly reachable URL on a deploy preview, which is the
 * point; it just must not end up in an index or a sitemap. `lib/seo.ts`'s
 * `buildMetadata` is not used here precisely because it emits canonicals and
 * hreflang alternates, which this page should not have.
 *
 * To remove: delete `app/[locale]/preview/`, drop the `hero` prop from
 * HomeSections, and reduce Hero to whichever branch won.
 */
export const metadata: Metadata = {
  title: "Hero preview: dither",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HeroDitherPreview({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeSections locale={locale} hero="dither" />;
}
