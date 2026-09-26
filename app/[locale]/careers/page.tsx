import SubpageHero from "@/components/sections/SubpageHero";
import CareersList from "@/components/sections/CareersList";
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
      <SubpageHero
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <CareersList roles={getCareerRoles(locale)} />
      <section className="recruitment-panel shell">
        <h2>{tCareers("noMatch")}</h2>
        <p>
          {locale === "ar"
            ? "عرّفنا بنفسك وبنوع العمل اللي يهمك. أرسل سيرتك أو رابط ملفك المهني، وأمثلة من أعمالك إذا عندك."
            : "Tell us about yourself and the work you’d like to do. Email your CV or professional profile, with examples of your work if you have them."}
        </p>
        <a
          className="studio-button secondary"
          href={`mailto:abdullah@muse.sa?subject=${encodeURIComponent(tCareers("generalSubject"))}`}
        >
          {locale === "ar"
            ? "عرّفنا بنفسك بالإيميل"
            : "Introduce yourself by email"}{" "}
          <span aria-hidden>↗</span>
        </a>
        <a className="recruitment-email" href="mailto:abdullah@muse.sa" dir="ltr">
          abdullah@muse.sa
        </a>
      </section>
    </div>
  );
}
