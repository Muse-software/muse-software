import CTA from "../components/sections/CTA";
import Authority from "../components/sections/Authority";
import CaseStudies from "../components/sections/CaseStudies";
import Hero from "../components/sections/Hero";
import Process from "../components/sections/Process";
import Services from "../components/sections/Services";
import Testimonials from "../components/sections/Testimonials";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Reveal from "../components/Reveal";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Muse AI Agency",
  url: "https://muse.ai",
  description:
    "Enterprise AI agency delivering transformation, engineering, and digital systems with measurable outcomes.",
  sameAs: ["https://www.linkedin.com", "https://www.x.com"],
};

export default function Home() {
  return (
    <div className="min-h-screen  text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <Reveal>
          <Authority />
        </Reveal>
        <Reveal>
          <Services />
        </Reveal>
        <Reveal>
          <CaseStudies />
        </Reveal>
        <Reveal>
          <Process />
        </Reveal>
        <Reveal>
          <Testimonials />
        </Reveal>
        <Reveal>
          <CTA />
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
