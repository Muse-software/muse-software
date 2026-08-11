import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import WordReveal from "../WordReveal";

/**
 * Five disciplines, each linked to its truthful capability page.
 */
const CAPABILITIES = [
  { key: "strategyDiscovery", href: "/services/product-strategy-discovery", signature: false, span: "lg:col-span-6" },
  { key: "design", href: "/services/product-experience-design", signature: false, span: "lg:col-span-6" },
  { key: "productEngineering", href: "/services/product-engineering", signature: false, span: "lg:col-span-4" },
  { key: "ai", href: "/services/ai-transformation", signature: true, span: "lg:col-span-4" },
  { key: "gamification", href: "/services/gamification-experience", signature: true, span: "lg:col-span-4" },
] as const;

export default async function Capabilities() {
  const t = await getTranslations("Home.capabilities");

  return (
    <section id="capabilities" className="scroll-mt-24 py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <div className="max-w-2xl">
          <WordReveal
            as="h2"
            className="font-space-grotesk text-2xl font-bold leading-[1.1] text-white md:text-5xl md:leading-[1.05]"
          >
            {t("heading")}
          </WordReveal>
          <p className="mt-4 max-w-lg text-lg leading-7 text-white/70 md:text-xl">
            {t("lede")}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-5 lg:grid-cols-12">
          {CAPABILITIES.map((capability) => {
            const body = (
              <>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-space-grotesk text-xl font-bold text-white md:text-2xl">
                    {t(`items.${capability.key}.title`)}
                  </h3>
                  {capability.signature ? (
                    <span className="mt-1 shrink-0 rounded-full bg-[#fd4601] px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-black">
                      {t("signature")}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 max-w-[52ch] text-sm leading-6 text-white/60 md:text-base">
                  {t(`items.${capability.key}.body`)}
                </p>
              </>
            );

            return (
              <Link
                key={capability.key}
                href={capability.href}
                data-dither-card
                className={`group border border-white/15 p-6 transition-colors duration-300 hover:border-[#fd4601] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fd4601] md:p-8 ${capability.span}`}
              >
                {body}
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#fd4601]">
                  {t("linkLabel")}{" "}
                  <span aria-hidden="true" className="arrow-inline">
                    →
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
