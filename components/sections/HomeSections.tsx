import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import Approach from "@/components/sections/Approach";
import CTA from "@/components/sections/CTA";
import FAQ from "@/components/sections/FAQ";
import Hero from "@/components/sections/Hero";
import HeroMonitors from "@/components/sections/HeroMonitors";
import Manifesto from "@/components/sections/Manifesto";
import CardDither from "@/components/CardDither";
import PageDither from "@/components/PageDither";
import Ticker from "@/components/Ticker";
import type { SceneGrade } from "@/components/hero3d/MonitorsScene";
import type { Locale } from "@/i18n/routing";

const SAME_AS = [
  "https://www.linkedin.com/company/musesoftware/",
  "https://x.com/muse_software",
  "https://www.instagram.com/muse_software",
];

/**
 * The home page body: everything between the nav and the footer, in order.
 *
 * Lifted out of `app/[locale]/page.tsx` so the hero candidates can each be
 * looked at on the *whole* page rather than on a stub. Three heroes are in
 * play and only one of them can be judged in isolation — the other two have to
 * be seen handing off to the Approach section, and read against the CTA panel
 * at the other end of the scroll. Keeping one body and swapping one section
 * means none of that context can drift between the routes being compared.
 *
 * | `hero`     | where            | what it is                              |
 * | ---------- | ---------------- | --------------------------------------- |
 * | `pixel`    | `/[locale]`      | live: always-on orange pixel field       |
 * | `dither`   | `/preview/hero-dither` | pointer-driven ink, from the minimal template |
 * | `monitors` | `/hero-preview`  | the pmndrs monitor wall                  |
 *
 * All three are temporary except whichever wins. When one is chosen, drop the
 * prop, delete the other two branches and both preview routes.
 */
export type HeroChoice = "pixel" | "dither" | "monitors";

export default async function HomeSections({
  locale,
  hero = "pixel",
  monitorGrade,
  children,
}: {
  locale: Locale;
  hero?: HeroChoice;
  /** Only read when `hero` is `monitors`. */
  monitorGrade?: SceneGrade;
  /** Rendered after the CTA, inside the page wrapper. The monitor preview uses
   *  it for the model's required CC-BY attribution. */
  children?: ReactNode;
}) {
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
      {hero === "monitors" ? (
        <HeroMonitors grade={monitorGrade} />
      ) : (
        <Hero variant={hero} />
      )}
      <Approach locale={locale} />
      {/* The pressure line that used to sit here as its own section now closes
          the Manifesto's argument — see PressureStatement. */}
      <Manifesto />
      <Ticker text={home("ticker")} />
      <FAQ />
      <CTA />
      {children}
    </div>
  );
}
