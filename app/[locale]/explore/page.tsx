import SubpageHero from "@/components/sections/SubpageHero";
import Services from "@/components/sections/Services";
import CTA from "@/components/sections/CTA";
import { buildMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return buildMetadata({
    title: t("explore.title"),
    description: t("explore.description"),
    path: "/explore",
    locale,
  });
}

export default async function ExplorePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Explore.hero");

  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <SubpageHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      <Services locale={locale} />
      <CTA />
    </div>
  );
}
