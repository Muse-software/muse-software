import CardDither from "@/components/CardDither";
import SubpageHero from "@/components/sections/SubpageHero";
import StartConversationFlow from "@/components/StartConversationFlow";
import { buildMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ intent?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return buildMetadata({
    title: t("start.title"),
    description: t("start.description"),
    path: "/start",
    locale,
  });
}

const KNOWN_INTENTS = ["build", "improve", "ai", "capability"] as const;

/**
 * SSR shell only (metadata, hero). The guided conversation itself (§10) is a
 * client island — it needs React state for the screen machine, the browser
 * History API for back/forward, and a real submit — none of which a server
 * component can do.
 */
export default async function StartPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { intent } = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations("Start");
  const knownIntent = KNOWN_INTENTS.find((candidate) => candidate === intent);

  return (
    <div className="relative isolate min-h-screen bg-[#060608] text-white">
      <CardDither />
      <SubpageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <section className="pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-[1100px] px-5 md:px-10">
          <StartConversationFlow initialIntent={knownIntent} />
        </div>
      </section>
    </div>
  );
}
