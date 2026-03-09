import CTA from "../components/sections/CTA";
import Authority from "../components/sections/Authority";
import CaseStudies from "../components/sections/CaseStudies";
import Hero from "../components/sections/Hero";
import Process from "../components/sections/Process";
import Services from "../components/sections/Services";
import Testimonials from "../components/sections/Testimonials";
import Footer from "../components/Footer";
import StaggeredMenu from "../components/StaggeredMenu";
import Reveal from "../components/Reveal";

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Services', ariaLabel: 'View our services', link: '/services' },
  { label: 'Case Studies', ariaLabel: 'View case studies', link: '/case-studies' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Insights', ariaLabel: 'Read our insights', link: '/insights' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
];

const socialItems = [
  { label: 'LinkedIn', link: 'https://www.linkedin.com' },
  { label: 'X', link: 'https://www.x.com' },
];

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
      <StaggeredMenu
        position="right"
        isFixed={true}
        items={menuItems}
        socialItems={socialItems}
        colors={['#fd4601', '#c23800']}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#000"
        changeMenuColorOnOpen={true}
        accentColor="#fd4601"
        displayItemNumbering={true}
        displaySocials={true}
      />
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
