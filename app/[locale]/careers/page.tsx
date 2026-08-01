import SubpageHero from "@/components/sections/SubpageHero";
import CareersList from "@/components/sections/CareersList";
import CTA from "@/components/sections/CTA";
import { getCareerRoles } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return buildMetadata({
    title: t("careers.title"),
    description: t("careers.description"),
    path: "/careers",
    locale,
  });
}

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Careers.hero");

  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <SubpageHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      <CareersList roles={getCareerRoles(locale)} />
      <CTA />
    </div>
  );
}
