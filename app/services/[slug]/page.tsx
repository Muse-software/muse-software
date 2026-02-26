import { notFound } from "next/navigation";
import CTA from "../../../components/sections/CTA";
import Footer from "../../../components/Footer";
import Nav from "../../../components/Nav";
import GlassCard from "../../../components/ui/GlassCard";
import CollectionHero from "../../../components/sections/CollectionHero";
import ImagePlaceholder from "../../../components/sections/ImagePlaceholder";
import AnimatedMetrics from "../../../components/sections/AnimatedMetrics";
import AnimatedCardReveal from "../../../components/sections/AnimatedCardReveal";
import { services } from "../../../lib/content";

export const dynamicParams = true;
export const revalidate = 60;

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

  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return notFound();

  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main className="pt-20">
        <CollectionHero
          eyebrow="Service"
          title={service.title}
          subtitle={service.summary}
          gradient="gold-coral"
        />
        <section className="mx-auto w-full max-w-6xl px-6 py-12">
          <ImagePlaceholder src={service.image} alt={service.title} />
        </section>
        <section className="mx-auto w-full max-w-6xl px-6 py-12">
          <div className="grid gap-6 md:grid-cols-2">
            <AnimatedCardReveal delay={0}>
              <GlassCard className="space-y-4 p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
                  Problem
                </p>
                <p className="text-base leading-7 text-white/70">
                  {service.problem}
                </p>
              </GlassCard>
            </AnimatedCardReveal>
            <AnimatedCardReveal delay={0.1}>
              <GlassCard className="space-y-4 p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
                  Approach
                </p>
                <p className="text-base leading-7 text-white/70">
                  {service.approach}
                </p>
              </GlassCard>
            </AnimatedCardReveal>
          </div>
        </section>
        <section className="mx-auto w-full max-w-6xl px-6 py-12">
          <div className="grid gap-6 md:grid-cols-2">
            <AnimatedCardReveal delay={0}>
              <GlassCard className="space-y-4 p-8">
                <h3 className="text-lg font-semibold text-white">Technical breakdown</h3>
                <ul className="space-y-3 text-sm text-white/70">
                  {service.breakdown.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </GlassCard>
            </AnimatedCardReveal>
            <AnimatedCardReveal delay={0.1}>
              <GlassCard className="space-y-4 p-8">
                <h3 className="text-lg font-semibold text-white">Deliverables</h3>
                <ul className="space-y-3 text-sm text-white/70">
                  {service.deliverables.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </GlassCard>
            </AnimatedCardReveal>
          </div>
        </section>
        <section className="mx-auto w-full max-w-6xl px-6 py-12">
          <AnimatedCardReveal>
            <GlassCard className="space-y-6 p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
                  Tools stack
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {service.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-t border-white/10 pt-6">
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                  Case proof
                </p>
                <p className="mt-3 text-base text-white/80">
                  {service.caseProof}
                </p>
              </div>
            </GlassCard>
          </AnimatedCardReveal>
        </section>
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
