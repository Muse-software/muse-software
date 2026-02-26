import Link from "next/link";
import GlassCard from "../ui/GlassCard";
import SectionHeading from "../ui/SectionHeading";
import { services } from "../../lib/content";

const icons = [
  "M3 6h18M3 12h12M3 18h9",
  "M5 6h14l2 6-2 6H5l-2-6 2-6z",
  "M6 6h12v12H6z",
];

export default function Services() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 py-16">
      <div className="grid gap-10">
        <SectionHeading
          eyebrow="Services"
          title="Three pillars to accelerate enterprise AI adoption."
          subtitle="From transformation strategy to production engineering, we deliver full-stack AI capability with measurable outcomes."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <GlassCard
              key={service.slug}
              className="group flex h-full flex-col gap-4 p-6 transition hover:border-[var(--coral)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/5 text-[var(--gold)]">
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={icons[index]} />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">
                {service.title}
              </h3>
              <p className="text-sm leading-6 text-white/70">
                {service.summary}
              </p>
              <Link
                href={`/services/${service.slug}`}
                className="mt-auto text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)] transition group-hover:text-[var(--coral)]"
              >
                Explore service
              </Link>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
