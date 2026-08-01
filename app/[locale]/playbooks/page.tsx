import SubpageHero from "@/components/sections/SubpageHero";
import PlaybooksList from "@/components/sections/PlaybooksList";
import { getPlaybookCategories, getPlaybooks, toPlaybookSummary } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return buildMetadata({
    title: t("playbooks.title"),
    description: t("playbooks.description"),
    path: "/playbooks",
    locale,
  });
}

export default async function PlaybooksPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Playbooks.hero");

  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <SubpageHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      <PlaybooksList
        playbooks={getPlaybooks(locale).map(toPlaybookSummary)}
        categories={getPlaybookCategories(locale)}
      />
    </div>
  );
}
