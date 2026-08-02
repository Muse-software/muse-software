import SubpageHero from "@/components/sections/SubpageHero";
import AboutTabs from "@/components/sections/AboutTabs";
import Leadership from "@/components/sections/Leadership";
import BeliefSlider from "@/components/sections/BeliefSlider";
import PressureStatement from "@/components/sections/PressureStatement";
import CareersTeaser from "@/components/sections/CareersTeaser";
import Ticker from "@/components/Ticker";
import CTA from "@/components/sections/CTA";
import { buildMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return buildMetadata({
    title: t("about.title"),
    description: t("about.description"),
    path: "/about",
    locale,
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("About");

  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <SubpageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />
      <AboutTabs />
      <Leadership />
      <BeliefSlider />
      {/* No Manifesto on this page to fold the line into, so it stays its own
          beat — but sized to its content instead of the 50vh of flat pattern
          it used to sit in. */}
      <section className="bg-[#060608] px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto w-full max-w-[1250px]">
          <PressureStatement />
        </div>
      </section>
      <CareersTeaser />
      <Ticker text={t("ticker")} />
      <CTA />
    </div>
  );
}
