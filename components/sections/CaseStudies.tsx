import Link from "next/link";
import GlassCard from "../ui/GlassCard";
import SectionHeading from "../ui/SectionHeading";
import { caseStudies } from "../../lib/content";

export default function CaseStudies() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 py-16">
      <div className="space-y-10">
        <SectionHeading
          eyebrow="Case Studies"
          title="Proof of performance across critical industries."
          subtitle="Every engagement is tied to measurable impact, operational resilience, and stakeholder trust."
        />
        <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6">
          {caseStudies.map((study) => (
            <div key={study.slug} className="min-w-[280px] snap-start sm:min-w-[360px]">
              <GlassCard className="relative h-full overflow-hidden p-0">
                <div className="absolute inset-0 case-gradient" aria-hidden="true" />
                <div className="relative flex h-full flex-col gap-4 p-6">
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                      {study.industry}
                    </p>
                    <h3 className="text-xl font-semibold text-white">
                      {study.client}
                    </h3>
                  </div>
                  <p className="text-sm text-white/70">{study.summary}</p>
                  <div className="mt-auto space-y-2">
                    <p className="text-lg font-semibold text-[var(--gold)]">
                      {study.outcome}
                    </p>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                      {study.metric}
                    </p>
                  </div>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)]"
                  >
                    Read case study
                  </Link>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
