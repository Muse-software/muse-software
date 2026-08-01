import SubpageHero from "@/components/sections/SubpageHero";
import NewsletterForm from "@/components/sections/NewsletterForm";
import { buildMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return buildMetadata({
    title: t("newsletter.title"),
    description: t("newsletter.description"),
    path: "/newsletter",
    locale,
  });
}

export default async function NewsletterPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Newsletter");
  const points = t.raw("points") as string[];

  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <SubpageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <section className="bg-[#060608] pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-[700px] px-5 md:px-10">
          <ul className="space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-base text-white/70 md:text-lg">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#fd4601]" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
