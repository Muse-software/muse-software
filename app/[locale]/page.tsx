import Hero from "@/components/sections/Hero";
import Approach from "@/components/sections/Approach";
import Manifesto from "@/components/sections/Manifesto";
import TrustedBy from "@/components/sections/TrustedBy";
import Ticker from "@/components/Ticker";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import { buildMetadata } from "@/lib/seo";
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

const SAME_AS = [
  "https://www.linkedin.com/company/musesoftware/",
  "https://x.com/muse_software",
  "https://www.instagram.com/muse_software",
];

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Metadata");
  const home = await getTranslations("Home");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: t("siteName"),
    url: "https://muse.sa",
    description: t("organizationDescription"),
    sameAs: SAME_AS,
  };

  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Approach locale={locale} />
      <Manifesto />
      <TrustedBy />
      <Ticker text={home("ticker")} />
      <FAQ />
      <CTA />
    </div>
  );
}
