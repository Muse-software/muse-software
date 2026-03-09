import Hero from "../components/sections/Hero";
import StaggeredMenu from "../components/StaggeredMenu";

const menuItems = [
  { label: 'Get in Touch', ariaLabel: 'Get in touch', link: 'https://wa.me/966592731040' },
];

const socialItems = [
  { label: 'LinkedIn', link: 'https://www.linkedin.com/company/musesoftware/' },
  { label: 'X', link: 'https://x.com/muse_software' },
  { label: 'Instagram', link: 'https://www.instagram.com/muse_software' },
  { label: 'WhatsApp', link: 'https://wa.me/966592731040' },
  { label: 'Email', link: 'mailto:abdullah@muse.sa' },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Muse AI Agency",
  url: "https://muse.ai",
  description:
    "Enterprise AI agency delivering transformation, engineering, and digital systems with measurable outcomes.",
  sameAs: ["https://www.linkedin.com/company/musesoftware/", "https://x.com/muse_software", "https://www.instagram.com/muse_software"],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#060508] text-white">
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
      <Hero />
    </div>
  );
}
