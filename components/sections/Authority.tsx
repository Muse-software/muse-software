import GlassCard from "../ui/GlassCard";
import SectionHeading from "../ui/SectionHeading";

const metrics = [
  { label: "Revenue generated", value: "$280M+" },
  { label: "AI systems built", value: "120+" },
  { label: "Global clients", value: "32" },
];

export default function Authority() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 py-16">
      <GlassCard className="space-y-8 p-8 md:p-12">
        <SectionHeading
          eyebrow="Authority"
          title="We architect AI programs that executives trust with mission-critical decisions."
          subtitle="Our team blends enterprise security, applied research, and high-performance product delivery to move the metrics that matter."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <p className="text-2xl font-semibold text-white md:text-3xl">
                {metric.value}
              </p>
              <p className="text-sm uppercase tracking-[0.25em] text-white/60">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}
