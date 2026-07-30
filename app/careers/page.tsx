import SubpageHero from "../../components/sections/SubpageHero";
import CareersList from "../../components/sections/CareersList";
import CTA from "../../components/sections/CTA";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Careers",
  description: "Join the small, senior team building Muse Studios from Riyadh.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <SubpageHero
        eyebrow="Careers"
        title="Come build with us."
        subtitle="We're a small, senior team based in Riyadh. These are the kinds of roles we typically grow into — reach out even if nothing below is an exact match."
      />
      <CareersList />
      <CTA />
    </div>
  );
}
