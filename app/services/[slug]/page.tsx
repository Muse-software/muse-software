import { notFound } from "next/navigation";
import Link from "next/link";
import SubpageHero from "../../../components/sections/SubpageHero";
import OutlineTrack from "../../../components/OutlineTrack";
import Ticker from "../../../components/Ticker";
import CTA from "../../../components/sections/CTA";
import { services } from "../../../lib/content";
import { buildMetadata } from "../../../lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${slug}`,
    image: service.image,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return notFound();

  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <SubpageHero
        eyebrow="Explore"
        title={service.title}
        subtitle={service.summary}
        image={service.image}
      />

      {/* Intro / context */}
      <section className="bg-[#060608] pb-4">
        <div className="mx-auto w-full max-w-[900px] px-5 md:px-10">
          <div className="space-y-4 border-t border-white/10 pt-10">
            {service.intro.map((paragraph, i) => (
              <p key={i} className="text-lg leading-8 text-white/70">
                {paragraph}
              </p>
            ))}
          </div>
          <Link
            href="/get-started"
            className="mt-8 inline-flex items-center gap-3 border border-black bg-white px-6 py-3 text-base font-medium font-space-grotesk text-black transition-colors duration-200 hover:bg-[#fd4601]"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Strategy / What we believe + pillars */}
      <section className="bg-[#4C0014] py-16 md:py-24">
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
                    {pillar.crossLinkLabel} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why you need us */}
      <section className="bg-[#060608] py-16 md:py-24">
        <div className="mx-auto w-full max-w-[900px] px-5 md:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
            Why you need us
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
      <section className="bg-[#060608] pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-[1100px] px-5 md:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
            What we do
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
        <section className="bg-[#4C0014] py-16 md:py-24">
          <div className="mx-auto w-full max-w-[1000px] px-5 md:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#fd4601]">
              Why work with us
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

      <Ticker text="Built for the AI-native era" />
      <CTA />
    </div>
  );
}
