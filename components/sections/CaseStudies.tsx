import WordReveal from "../WordReveal";

// Placeholder case studies — swap for real client work once available.
const caseStudies = [
  {
    client: "Acme",
    result: "Cut onboarding time 40%",
    copy: "Automated a manual approvals workflow end to end, freeing up a full day a week per team lead.",
  },
  {
    client: "Globex",
    result: "Shipped 3x faster",
    copy: "An embedded engineering pod took a stalled roadmap from quarterly releases to weekly ones.",
  },
  {
    client: "Initech",
    result: "+18% checkout conversion",
    copy: "A ground-up redesign of the purchase flow, backed by real usage data instead of guesswork.",
  },
  {
    client: "Vandelay",
    result: "3x week-1 retention",
    copy: "Turned a flat onboarding flow into a guided, reward-driven first-run experience.",
  },
];

export default function CaseStudies() {
  return (
    <section className="relative bg-[#4C0014] py-20 md:py-28">
      <div className="pattern-halftone pointer-events-none absolute inset-0 text-[#fd4601] opacity-15" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[1100px] px-5 md:px-10">
        <WordReveal
          as="h2"
          className="font-space-grotesk text-2xl font-bold text-white md:text-4xl"
        >
          Selected work.
        </WordReveal>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2">
          {caseStudies.map((study) => (
            <div key={study.client} className="border border-white/15 bg-[#4C0014] p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                {study.client}
              </p>
              <h3 className="mt-3 font-space-grotesk text-xl font-bold text-[#fd4601] md:text-2xl">
                {study.result}
              </h3>
              <p className="mt-3 text-base leading-7 text-white/70">{study.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
