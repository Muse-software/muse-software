import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import GlassCard from "../../components/ui/GlassCard";
import SectionHeading from "../../components/ui/SectionHeading";

export const metadata = {
  title: "Terms",
  description: "Terms of service for Muse AI.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen  text-white">
      <Nav />
      <main className="pt-28">
        <section className="mx-auto w-full max-w-6xl px-6 py-16">
          <SectionHeading
            eyebrow="Terms"
            title="Clear terms for enterprise engagements."
            subtitle="Engagements are governed by statements of work and enterprise security requirements."
          />
        </section>
        <section className="mx-auto w-full max-w-4xl px-6 pb-20">
          <GlassCard className="space-y-4 p-10 text-sm leading-6 text-white/70">
            <p>
              Services are provided under mutually agreed statements of work.
              Payment terms, IP ownership, and confidentiality clauses are
              negotiated per engagement.
            </p>
            <p>
              Contact us for the latest master services agreement or security
              addendum.
            </p>
          </GlassCard>
        </section>
      </main>
      <Footer />
    </div>
  );
}
