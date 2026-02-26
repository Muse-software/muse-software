import { notFound } from "next/navigation";
import CTA from "../../../components/sections/CTA";
import Footer from "../../../components/Footer";
import Nav from "../../../components/Nav";
import GlassCard from "../../../components/ui/GlassCard";
import CollectionHero from "../../../components/sections/CollectionHero";
import ImagePlaceholder from "../../../components/sections/ImagePlaceholder";
import AnimatedMetrics from "../../../components/sections/AnimatedMetrics";
import AnimatedCardReveal from "../../../components/sections/AnimatedCardReveal";
import { caseStudies } from "../../../lib/content";

export const dynamicParams = true;
export const revalidate = 60;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) return {};

  return {
    title: `${study.client} Case Study`,
    description: study.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) return notFound();

  return (
    <div className="min-h-screen text-white">
      <Nav />
      <main className="pt-20">
        <CollectionHero
          eyebrow="Case Study"
          title={study.client}
          subtitle={study.summary}
          gradient="coral-purple"
        />
        <section className="mx-auto w-full max-w-6xl px-6 py-4">
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-white/60 justify-center">
            <span>{study.industry}</span>
          </div>
        </section>
        <section className="mx-auto w-full max-w-6xl px-6 py-12">
          <ImagePlaceholder src={study.image} alt={`${study.client} project`} />
        </section>
        <section className="mx-auto w-full max-w-6xl px-6 py-12">
          <AnimatedMetrics
            metrics={[
              { label: "Outcome", value: study.outcome },
              { label: "Quantified Impact", value: study.metric },
            ]}
          />
        </section>
        <section className="mx-auto w-full max-w-6xl px-6 py-12">
          <div className="grid gap-6 md:grid-cols-3">
            <AnimatedCardReveal delay={0}>
              <GlassCard className="space-y-3 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
                  Challenge
                </p>
                <p className="text-sm leading-6 text-white/70">{study.challenge}</p>
              </GlassCard>
            </AnimatedCardReveal>
            <AnimatedCardReveal delay={0.1}>
              <GlassCard className="space-y-3 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
                  Strategy
                </p>
                <p className="text-sm leading-6 text-white/70">{study.strategy}</p>
              </GlassCard>
            </AnimatedCardReveal>
            <AnimatedCardReveal delay={0.2}>
              <GlassCard className="space-y-3 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
                  Execution
                </p>
                <ul className="space-y-2 text-sm text-white/70">
                  {study.execution.map((item) => (
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
                  Tech stack
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {study.techStack.map((tool) => (
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
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                  Results
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  {study.results.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-white/10 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                  Testimonial
                </p>
                <p className="mt-3 text-base text-white/80">"{study.testimonial}"</p>
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
