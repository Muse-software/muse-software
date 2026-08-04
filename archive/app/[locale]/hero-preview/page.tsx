import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import HomeSections from "@/components/sections/HomeSections";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ post?: string }>;
};

/**
 * A throwaway route for looking at the candidate 3D hero next to the live one.
 *
 * It renders the whole landing page, not just the hero: same Approach, the
 * same Manifesto, ticker, FAQ and the orange CTA panel, and the same footer
 * from the layout. A hero cannot be judged on its own — half of whether this
 * one works is how it hands off to the section under it.
 *
 * It is deliberately *not* built through `buildMetadata`: that helper emits a
 * self-referential canonical and hreflang alternates, which is exactly what a
 * scratch page must not advertise. Hard `noindex` instead, and it is absent
 * from the sitemap because that file lists its routes explicitly.
 *
 * The on-page credit for the CC-BY model was removed to keep the preview clean.
 * That is fine while this is a local `noindex` scratch route, but the licence
 * obligation attaches on publication, so it has to come back — footer or
 * /terms — if this hero is the one that ships. The licence and author are
 * recorded at the top of `components/hero3d/Computers.tsx`.
 *
 * Delete this route, or promote it, once the hero is decided.
 */
export const metadata: Metadata = {
  title: "Hero preview — monitor wall",
  robots: { index: false, follow: false },
};

export default async function HeroPreviewPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // `?post=upstream` renders the pmndrs example's post-processing values
  // untouched; the default is the regraded version. See GRADES in
  // MonitorsScene.tsx for why the two differ.
  const { post } = await searchParams;
  const grade = post === "upstream" ? "upstream" : "tuned";

  return <HomeSections locale={locale} hero="monitors" monitorGrade={grade} />;
}
