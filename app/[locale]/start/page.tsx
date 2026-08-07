import CardDither from "@/components/CardDither";
import Icon from "@/components/Icon";
import SubpageHero from "@/components/sections/SubpageHero";
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

const KNOWN_INTENTS = ["build", "improve", "ai"] as const;

// `detail` and `href` are data, not copy — mirrors app/[locale]/contact/page.tsx.
const methods = [
  {
    key: "whatsapp",
    detail: "+966 59 273 1040",
    href: "https://wa.me/966592731040",
    icon: "chat",
  },
  {
    key: "email",
    detail: "info@muse.sa",
    href: "mailto:info@muse.sa",
    icon: "mail",
  },
] as const;

/**
 * The truthful shell the Direction 4 gate needs: Hero and IntentRouter's
 * `/start?intent=…` links land somewhere real, not a 404. This is not the
 * two-screen guided flow from the plan (§10) — that is Phase 4 — so it does
 * no more than confirm the visitor's intent honestly and offer real ways to
 * reach the team today.
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
          {knownIntent ? (
            <p className="mb-10 max-w-[60ch] border-s-2 border-[#fd4601] ps-4 text-lg leading-8 text-white/80">
              {t(`intentNote.${knownIntent}`)}
            </p>
          ) : null}

          <div className="grid gap-6 md:grid-cols-2">
            {methods.map((method) => (
              <a
                key={method.key}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                data-dither-card
                className="group flex items-center justify-between gap-6 border border-white/15 p-8 transition-colors duration-300 hover:border-[#fd4601] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fd4601] md:p-10"
              >
                <div>
                  <p className="font-space-grotesk text-xl font-bold md:text-2xl">
                    {t(`methods.${method.key}`)}
                  </p>
                  {/* `dir="ltr"` on the run — see the identical note in
                      app/[locale]/contact/page.tsx for why a phone number
                      and an email reorder under an RTL paragraph otherwise. */}
                  <p className="mt-2 text-white/60">
                    <span dir="ltr">{method.detail}</span>
                  </p>
                </div>
                <Icon name={method.icon} className="h-8 w-8 shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
