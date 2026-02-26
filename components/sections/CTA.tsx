import Button from "../ui/Button";
import GlassCard from "../ui/GlassCard";

export default function CTA() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 py-20">
      <GlassCard className="glow-border space-y-6 p-10 text-center md:p-14">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--gold)]">
          Start the engagement
        </p>
        <h2 className="text-balance text-3xl font-semibold leading-[1.1] text-white md:text-4xl">
          Ready to launch a trusted AI program that scales?
        </h2>
        <p className="mx-auto max-w-2xl text-pretty text-base leading-7 text-white/70">
          Book a strategy session to align stakeholders, define the roadmap, and
          build a secure AI foundation.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/contact" label="Start Project" />
          <Button href="/insights" label="Explore Insights" variant="secondary" />
        </div>
      </GlassCard>
    </section>
  );
}
