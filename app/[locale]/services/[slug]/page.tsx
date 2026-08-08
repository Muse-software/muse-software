import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import SubpageHero from "@/components/sections/SubpageHero";
import PageDither from "@/components/PageDither";
import OutlineTrack from "@/components/OutlineTrack";
import Ticker from "@/components/Ticker";
import CTA from "@/components/sections/CTA";
import FAQ from "@/components/sections/FAQ";
import ServiceSubnav from "@/components/sections/ServiceSubnav";
import { allSlugs, getService, getServices } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export const dynamicParams = false;

// Union across locales, not this locale's slugs — see `allSlugs`. The page
// body resolves the record in its own locale and 404s if there is none.
export function generateStaticParams() {
  return allSlugs(getServices);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = getService(locale, slug);
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${slug}`,
    image: service.image,
    locale,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = getService(locale, slug);
  if (!service) return notFound();

  const t = await getTranslations("Services.detail");

  return (
    /* `relative isolate` and the bare sections below are PageDither's two
       requirements — see the component. */
    <div className="relative isolate min-h-screen bg-[#060608] text-white">
      <PageDither />
      <SubpageHero
        eyebrow={t("eyebrow")}
        title={service.title}
        subtitle={service.summary}
        image={service.image}
        staticDitherSurface
      />

      <ServiceSubnav
        items={[
          { id: "overview", label: t("nav.overview") },
          { id: "why", label: t("nav.why") },
          { id: "what-we-do", label: t("nav.whatWeDo") },
          ...(service.faq && service.faq.length > 0
            ? [{ id: "faq", label: t("nav.faq") }]
            : []),
        ]}
      />

      {/* Intro / context */}
      <section id="overview" className="pb-4">
        <div className="mx-auto w-full max-w-[900px] px-5 md:px-10">
          <div className="space-y-4 border-t border-white/10 pt-10">
            {service.intro.map((paragraph, i) => (
              <p key={i} className="text-lg leading-8 text-white/70">
                {paragraph}
              </p>
            ))}
          </div>
          <Link
            href="/start?intent=capability"
            className="mt-8 inline-flex items-center gap-3 border border-black bg-white px-6 py-3 text-base font-medium font-space-grotesk text-black transition-colors duration-200 hover:bg-[#fd4601]"
          >
            {t("getStarted")}
          </Link>
        </div>
      </section>

      {/* Strategy / What we believe + pillars. The maroon these two sections
          carried came off on 2026-08-02 — see Manifesto. The page wash is what
          separates them from the black either side now. */}
      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1000px] px-5 md:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#fd4601]">
            {service.approachHeading}
          </p>
          {service.approachIntro.length > 0 && (
            <div className="mt-4 max-w-2xl space-y-3">
              {service.approachIntro.map((paragraph, i) => (
                <p key={i} className="text-base leading-7 text-white/70">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {service.pillars.map((pillar) => (
              <div key={pillar.title} className="border border-white/15 p-6">
                <h3 className="font-space-grotesk text-lg font-bold text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/70">{pillar.body}</p>
                {pillar.crossLinkSlug && (
                  <Link
                    href={`/services/${pillar.crossLinkSlug}`}
                    className="mt-4 inline-block text-sm font-semibold text-[#fd4601] hover:text-white"
                  >
                    {pillar.crossLinkLabel} <span aria-hidden="true" className="arrow-inline">→</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why you need us */}
      <section id="why" className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-[900px] px-5 md:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
            {t("whyYouNeedUs")}
          </p>
          <h2 className="mt-3 font-space-grotesk text-2xl font-bold text-white md:text-3xl">
            {service.whyHeadline}
          </h2>
          <ul className="mt-8 space-y-4">
            {service.whyReasons.map((reason) => (
              <li key={reason} className="flex items-start gap-3 text-lg text-white/80">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#fd4601]" />
                {reason}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What we do */}
      <section id="what-we-do">
        <div className="mx-auto w-full max-w-[1100px] px-5 md:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
            {t("whatWeDo")}
          </p>
          <h2 className="mt-3 font-space-grotesk text-2xl font-bold text-white md:text-3xl">
            {service.whatWeDoHeadline}
          </h2>
          <div className="mt-8">
            <OutlineTrack items={service.whatWeDo} />
          </div>
        </div>
      </section>

      {/* Why work with us (optional) */}
      {service.whyWorkWithUs && (
        <section className="py-16 md:py-24">
          <div className="mx-auto w-full max-w-[1000px] px-5 md:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#fd4601]">
              {t("whyWorkWithUs")}
            </p>
            <h2 className="mt-3 font-space-grotesk text-2xl font-bold text-white md:text-3xl">
              {service.whyWorkHeadline}
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {service.whyWorkWithUs.map((item) => (
                <div key={item.title} className="border border-white/15 p-6">
                  <h3 className="font-space-grotesk text-base font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Per-service FAQ (optional) */}
      {service.faq && service.faq.length > 0 && (
        <div>
          <FAQ heading={t("faq")} items={service.faq} />
        </div>
      )}

      <Ticker text={t("ticker")} />
      <CTA staticDitherSurface />
    </div>
  );
}
