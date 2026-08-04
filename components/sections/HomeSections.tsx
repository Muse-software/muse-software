import { getTranslations } from "next-intl/server";
import CTA from "@/components/sections/CTA";
import FAQ from "@/components/sections/FAQ";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import OutcomesBand from "@/components/sections/OutcomesBand";
import CardDither from "@/components/CardDither";
import PageDither from "@/components/PageDither";
import ThreeDoors from "@/components/sections/ThreeDoors";
import Ticker from "@/components/Ticker";
import type { Locale } from "@/i18n/routing";

const SAME_AS = [
  "https://www.linkedin.com/company/musesoftware/",
  "https://x.com/muse_software",
  "https://www.instagram.com/muse_software",
];

/**
 * The home page body: everything between the nav and the footer, in order.
 * Hero → ThreeDoors → Manifesto → OutcomesBand → Ticker → FAQ → CTA.
 * The hero is the always-on orange pixel field
 * (`components/PixelBlast.tsx`, via `Hero.tsx`).
 */
export default async function HomeSections({ locale }: { locale: Locale }) {
  const t = await getTranslations("Metadata");
  const home = await getTranslations("Home");

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
      <ThreeDoors locale={locale} />
      <Manifesto />
      <OutcomesBand />
      <Ticker text={home("ticker")} />
      <FAQ />
      <CTA />
    </div>
  );
}
