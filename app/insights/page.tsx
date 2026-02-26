import CTA from "../../components/sections/CTA";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import CollectionHero from "../../components/sections/CollectionHero";
import InsightsGrid from "../../components/InsightsGrid";
import { insights } from "../../lib/content";

export const metadata = {
  title: "Insights",
  description: "Research, strategy, and engineering guidance for enterprise AI.",
};

export default function InsightsPage() {
  return (
    <div className="min-h-screen text-white">
      <Nav />
      <main className="pt-20">
        <CollectionHero
          eyebrow="Insights"
          title="Research, strategy, and engineering guidance for AI leaders."
          subtitle="Actionable insight across AI strategy, engineering, operations, and edge delivery."
          gradient="purple-gold"
        />
        <section className="mx-auto w-full max-w-6xl px-6 py-12">
          <InsightsGrid insights={insights} />
        </section>
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
