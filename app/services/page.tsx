import Link from "next/link";
import CTA from "../../components/sections/CTA";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import GlassCard from "../../components/ui/GlassCard";
import CollectionHero from "../../components/sections/CollectionHero";
import { services } from "../../lib/content";

export const metadata = {
  title: "Services",
  description: "Enterprise AI services across transformation, engineering, and digital systems.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen text-white">
      <Nav />
      <main className="pt-20">
        <CollectionHero
          eyebrow="Services"
          title="Enterprise AI delivery across transformation, engineering, and platforms."
          subtitle="Choose a focused engagement or a multi-quarter transformation program."
          gradient="gold-coral"
        />
        <section className="mx-auto w-full max-w-6xl px-6 py-12">
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <GlassCard key={service.slug} className="flex h-full flex-col gap-4 p-6">
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                <p className="text-sm leading-6 text-white/70">{service.summary}</p>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-auto text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)]"
                >
                  View service
                </Link>
              </GlassCard>
            ))}
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
