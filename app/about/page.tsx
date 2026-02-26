import CTA from "../../components/sections/CTA";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import GlassCard from "../../components/ui/GlassCard";
import SectionHeading from "../../components/ui/SectionHeading";
import CollectionHero from "../../components/sections/CollectionHero";
import Reveal from "../../components/Reveal";

const team = [
  { name: "Amara Wei", role: "Chief AI Strategist" },
  { name: "Elias Mendoza", role: "Head of Engineering" },
  { name: "Nadia Sol", role: "Security Lead" },
  { name: "Julian Park", role: "Product Director" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen text-white">
      <Nav />
      <main className="pt-20">
        <CollectionHero
          eyebrow="About Muse"
          title="We help enterprises lead with trustworthy AI."
          subtitle="Our mission is to turn AI ambition into operational reality with secure systems, measurable outcomes, and confident teams."
          gradient="purple-gold"
        />
        <Reveal>
          <section className="mx-auto w-full max-w-6xl px-6 py-12">
            <GlassCard className="space-y-6 p-10">
              <h2 className="text-2xl font-semibold text-white">Our philosophy</h2>
              <p className="text-base leading-7 text-white/70">
                We combine deep technical execution with an executive-level view of
                risk, governance, and value. Every program is engineered for
                adoption, accountability, and scale.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  "Outcome over output",
                  "Security as a feature",
                  "AI with human trust",
                ].map((item) => (
                  <div key={item} className="glass-panel p-5 text-sm text-white/70">
                    {item}
                  </div>
                ))}
              </div>
            </GlassCard>
          </section>
        </Reveal>
        <Reveal>
          <section className="mx-auto w-full max-w-6xl px-6 py-16">
            <SectionHeading
              eyebrow="Team"
              title="Cross-functional leaders across strategy, engineering, and security."
              subtitle="A compact team with deep enterprise experience and global delivery expertise."
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              {team.map((member) => (
                <GlassCard key={member.name} className="p-6 text-center">
                  <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-white/10" />
                  <p className="text-sm font-semibold text-white">{member.name}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                    {member.role}
                  </p>
                </GlassCard>
              ))}
            </div>
          </section>
        </Reveal>
        <Reveal>
          <section className="mx-auto w-full max-w-6xl px-6 py-16">
            <GlassCard className="space-y-4 p-10">
              <h2 className="text-2xl font-semibold text-white">Culture</h2>
              <p className="text-base leading-7 text-white/70">
                We operate with a high-trust, high-velocity culture. Every
                engagement is grounded in transparency, measurable outcomes, and
                continuous improvement.
              </p>
            </GlassCard>
          </section>
        </Reveal>
        <Reveal>
          <CTA />
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
