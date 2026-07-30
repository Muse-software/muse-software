import Hero from "../components/sections/Hero";
import Approach from "../components/sections/Approach";
import Manifesto from "../components/sections/Manifesto";
import LatestPlaybooks from "../components/sections/LatestPlaybooks";
import TrustedBy from "../components/sections/TrustedBy";
import Testimonials from "../components/sections/Testimonials";
import Ticker from "../components/Ticker";
import FAQ from "../components/sections/FAQ";
import CTA from "../components/sections/CTA";
import { buildMetadata } from "../lib/seo";

export const metadata = buildMetadata({
  title: "Muse Studios — AI Transformation & Product Engineering Studio, Riyadh",
  description:
    "We are your all-in-one partner helping you set & execute your digital strategy at startup speed — AI transformation, product engineering, and gamification & experience.",
  path: "/",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Muse",
  url: "https://muse.sa",
  description:
    "We are your all-in-one partner helping you set & execute your digital strategy at startup speed.",
  sameAs: ["https://www.linkedin.com/company/musesoftware/", "https://x.com/muse_software", "https://www.instagram.com/muse_software"],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Approach />
      <Manifesto />
      <LatestPlaybooks />
      <TrustedBy />
      <Testimonials />
      <Ticker text="Built for the AI-native era" />
      <FAQ />
      <CTA />
    </div>
  );
}
