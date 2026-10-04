import MosaicHome from "@/components/mosaic/MosaicHome";
import JsonLd from "@/components/JsonLd";
import { buildHomeJsonLd, buildMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return buildMetadata({
    title: t("home.title"),
    description: t("home.description"),
    path: "/",
    locale,
  });
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <><JsonLd data={buildHomeJsonLd(locale)} /><MosaicHome locale={locale} base="" /></>;
}
