import Image from "next/image";
import Icon from "@/components/Icon";
import GetStartedForm from "@/components/sections/GetStartedForm";
import SubpageHero from "@/components/sections/SubpageHero";
import { buildMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return buildMetadata({
    title: t("getStarted.title"),
    description: t("getStarted.description"),
    path: "/get-started",
    locale,
  });
}

export default async function GetStartedPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("GetStarted");
  const points = t.raw("points") as string[];

  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <SubpageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <div className="mx-auto w-full max-w-[1400px] px-5 pb-20 md:px-10 md:pb-28">
        <div className="grid gap-14 md:grid-cols-2 md:gap-20">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {points.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-[#fd4601]" />
                  <p className="text-lg text-white/80">{point}</p>
                </div>
              ))}
            </div>

            <div className="relative mt-6 hidden h-[520px] w-full overflow-hidden md:block">
              <Image
                src="/hero-bg-new.webp"
                alt=""
                fill
                unoptimized
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#060608] via-transparent to-transparent" />
            </div>
          </div>

          <div>
            <GetStartedForm />
          </div>
        </div>
      </div>
    </div>
  );
}
