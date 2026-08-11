import SubpageHero from "@/components/sections/SubpageHero";
import LegalContent, { type LegalSection } from "@/components/sections/LegalContent";
import { buildMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return buildMetadata({
    title: t("privacy.title"),
    description: t("privacy.description"),
    path: "/privacy",
    locale,
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Legal");
  const sections = t.raw("privacy.sections") as LegalSection[];

  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <SubpageHero eyebrow={t("eyebrow")} title={t("privacy.title")} />
      <LegalContent sections={sections} updated={t("updated")} />
    </div>
  );
}
