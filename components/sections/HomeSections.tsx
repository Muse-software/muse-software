import { getTranslations } from "next-intl/server";
import Capabilities from "@/components/sections/Capabilities";
import CTA from "@/components/sections/CTA";
import FAQ from "@/components/sections/FAQ";
import Hero from "@/components/sections/Hero";
import IntentRouter from "@/components/sections/IntentRouter";
import OurApproach from "@/components/sections/OurApproach";
import WhyMuse from "@/components/sections/WhyMuse";
import FromTheStudio from "@/components/sections/FromTheStudio";
import CardDither from "@/components/CardDither";
import PageDither from "@/components/PageDither";

const SAME_AS = [
  "https://www.linkedin.com/company/musesoftware/",
  "https://x.com/muse_software",
  "https://www.instagram.com/muse_software",
];

/**
 * The home page body: everything between the nav and the footer, in order.
 * Direction 4 homepage gate, Phases 2 and 3. The eight structural positions
 * are Hero → IntentRouter → Capabilities → OurApproach → WhyMuse →
 * FromTheStudio → FAQ → CTA. FromTheStudio deliberately returns null while
 * its verified-items array is empty. `Manifesto`, `WhoWeBuildFor`,
 * `OutcomesBand`, and `Ticker` are retired from this page, not deleted, in
 * case another page wants them. The hero is the always-on orange pixel field
 * (`components/PixelBlast.tsx`, via `Hero.tsx`).
 */
export default async function HomeSections() {
  const t = await getTranslations("Metadata");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: t("siteName"),
    url: "https://muse.sa",
    description: t("organizationDescription"),
    sameAs: SAME_AS,
  };

  return (
    /* `relative isolate` is PageDither's requirement, not decoration: it is
       what lets the wash sit at `-z-10`, above this wrapper's black but under
       every section in the page. The sections that used to restate
       `bg-[#060608]` have had it removed for the same reason — the colour was
       already coming from here and from `<body>`, and an opaque section
       background is a hole punched in the wash. */
    <div className="relative isolate min-h-screen bg-[#060608] text-white">
      <PageDither />
      <CardDither />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <IntentRouter />
      <Capabilities />
      <OurApproach />
      <WhyMuse />
      <FromTheStudio />
      <FAQ />
      <CTA />
    </div>
  );
}
