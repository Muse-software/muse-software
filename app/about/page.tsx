import SubpageHero from "../../components/sections/SubpageHero";
import AboutTabs from "../../components/sections/AboutTabs";
import Leadership from "../../components/sections/Leadership";
import BeliefSlider from "../../components/sections/BeliefSlider";
import TrustedBy from "../../components/sections/TrustedBy";
import CareersTeaser from "../../components/sections/CareersTeaser";
import Ticker from "../../components/Ticker";
import CTA from "../../components/sections/CTA";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Muse Studios is a Saudi technology company in Riyadh building distinctive digital experiences through innovation, craftsmanship, and forward-thinking design.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <SubpageHero
        eyebrow="About Us"
        title="Riyadh-built. Globally standard."
        subtitle="A Saudi technology studio building distinctive digital experiences — from Riyadh, for the world."
      />
      <AboutTabs />
      <Leadership />
      <BeliefSlider />
      <TrustedBy />
      <CareersTeaser />
      <Ticker text="Built by builders, trusted by leaders" />
      <CTA />
    </div>
  );
}
