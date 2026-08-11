import { getTranslations } from "next-intl/server";
import WordReveal from "../WordReveal";

/** Editorial block, no hover. Sits between the hero and AboutTabs. */
export default async function AboutMoment() {
  const t = await getTranslations("About.moment");

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-[900px] px-5 md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#fd4601]">
          {t("eyebrow")}
        </p>
        <WordReveal
          as="h2"
          className="mt-4 font-space-grotesk text-2xl font-bold leading-[1.25] text-white md:text-4xl"
        >
          {t("lead")}
        </WordReveal>
        <p className="mt-6 max-w-[65ch] text-lg leading-8 text-white/70">
          {t("continuation")}
        </p>
      </div>
    </section>
  );
}
