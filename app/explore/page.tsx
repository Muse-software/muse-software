import SubpageHero from "../../components/sections/SubpageHero";
import Services from "../../components/sections/Services";
import CaseStudies from "../../components/sections/CaseStudies";
import CTA from "../../components/sections/CTA";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Explore",
  description:
    "AI transformation, product engineering, and gamification & experience — how Muse Studios builds, and selected work.",
  path: "/explore",
});

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <SubpageHero
        eyebrow="Explore"
        title="What we build."
        subtitle="Three ways we help teams move at startup speed — pick one, or combine all three."
      />
      <Services />
      <CaseStudies />
      <CTA />
    </div>
  );
}
