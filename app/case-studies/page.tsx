import Link from "next/link";
import CTA from "../../components/sections/CTA";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import GlassCard from "../../components/ui/GlassCard";
import CollectionHero from "../../components/sections/CollectionHero";
import { caseStudies } from "../../lib/content";

export const metadata = {
  title: "Case Studies",
  description: "Outcome-driven AI engagements across regulated industries.",
};

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen text-white">
      <Nav />
      <main className="pt-20">
        <CollectionHero
          eyebrow="Case Studies"
          title="AI programs with measurable results and enterprise trust."
          subtitle="Explore real outcomes across logistics, finance, and healthcare."
          gradient="coral-purple"
        />
        <section className="mx-auto w-full max-w-6xl px-6 py-12">
          <div className="grid gap-6 md:grid-cols-3">
            {caseStudies.map((study) => (
              <GlassCard key={study.slug} className="flex h-full flex-col gap-4 p-6">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    {study.industry}
                  </p>
                  <h3 className="text-xl font-semibold text-white">
                    {study.client}
                  </h3>
                </div>
                <p className="text-sm leading-6 text-white/70">{study.summary}</p>
                <p className="text-base font-semibold text-[var(--gold)]">
                  {study.outcome}
                </p>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="mt-auto text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)]"
                >
                  Read case study
                </Link>
              </GlassCard>
            ))}
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
