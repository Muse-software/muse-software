import GlassCard from "../ui/GlassCard";
import SectionHeading from "../ui/SectionHeading";

const steps = [
  { title: "Discover", detail: "Align on targets, risks, and measurable impact." },
  { title: "Architect", detail: "Design systems, data flows, and AI guardrails." },
  { title: "Build", detail: "Ship production-grade AI systems with observability." },
  { title: "Scale", detail: "Optimize cost, speed, and global adoption." },
];

export default function Process() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 py-16">
      <div className="space-y-10">
        <SectionHeading
          eyebrow="Process"
          title="A repeatable delivery system for complex AI programs."
          subtitle="We guide teams from discovery to global rollout with a clear, transparent process."
        />
        <div className="relative grid gap-4 md:grid-cols-4 md:gap-6 md:before:absolute md:before:left-6 md:before:right-6 md:before:top-8 md:before:h-px md:before:bg-white/10 md:before:content-['']">
          {steps.map((step, index) => (
            <GlassCard key={step.title} className="relative p-6">
              <span className="absolute right-6 top-6 text-xs font-semibold text-white/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">
                {step.detail}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
