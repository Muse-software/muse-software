import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import GlassCard from "../../components/ui/GlassCard";
import SectionHeading from "../../components/ui/SectionHeading";

export const metadata = {
  title: "Privacy",
  description: "Privacy practices for Muse AI.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen text-white">
      <Nav />
      <main className="pt-28">
        <section className="mx-auto w-full max-w-6xl px-6 py-16">
          <SectionHeading
            eyebrow="Privacy"
            title="We protect your data with enterprise-grade controls."
            subtitle="Our privacy posture emphasizes minimal data collection and rigorous security controls."
          />
        </section>
        <section className="mx-auto w-full max-w-4xl px-6 pb-20">
          <GlassCard className="space-y-4 p-10 text-sm leading-6 text-white/70">
            <p>
              We collect only the information needed to deliver services, respond
              to inquiries, and improve performance. Data is encrypted in transit
              and at rest.
            </p>
            <p>
              We do not sell customer data. Access is limited to authorized
              personnel and governed by security policies.
            </p>
            <p>
              Contact us for a copy of our data processing addendum or security
              documentation.
            </p>
          </GlassCard>
        </section>
      </main>
      <Footer />
    </div>
  );
}
