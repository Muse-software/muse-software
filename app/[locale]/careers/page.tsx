import SubpageHero from "@/components/sections/SubpageHero";
import CareersIntro from "@/components/sections/CareersIntro";
import CareersList from "@/components/sections/CareersList";
import CardDither from "@/components/CardDither";
import CTA from "@/components/sections/CTA";
import { Link } from "@/i18n/navigation";
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
  const tCareers = await getTranslations("Careers");

  return (
    <div className="relative isolate min-h-screen bg-[#060608] text-white">
      <CardDither />
      <SubpageHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      <CareersIntro />
      <CareersList roles={getCareerRoles(locale)} />
      <section className="pb-14 md:pb-20">
        <div className="mx-auto w-full max-w-[900px] px-5 md:px-10 text-center">
          <Link
            href="/contact"
            className="text-lg text-white/70 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
          >
            {tCareers("noMatch")}
          </Link>
        </div>
      </section>
      <CTA />
    </div>
  );
}
