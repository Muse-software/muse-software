import { getTranslations } from "next-intl/server";
import WordReveal from "../WordReveal";

/**
 * Two paragraphs, drawn from the same facts already public on `/about`
 * (Riyadh-based, Saudi, hires Saudi, small and multidisciplinary by choice) —
 * nothing here is new to the site, only shorter and placed where an
 * evaluator scanning the homepage will actually read it.
 */
export default async function WhyMuse() {
  const t = await getTranslations("Home.whyMuse");

  return (
    <section id="why-muse" className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-[900px] px-5 md:px-10">
        <WordReveal
          as="h2"
          className="font-space-grotesk text-2xl font-bold text-white md:text-4xl"
        >
          {t("heading")}
        </WordReveal>
        <div className="mt-8 flex flex-col gap-6 md:mt-10">
          <p className="max-w-[65ch] text-base leading-8 text-white/70 md:text-lg md:leading-9">
            {t("paragraph1")}
          </p>
          <p className="max-w-[65ch] text-base leading-8 text-white/70 md:text-lg md:leading-9">
            {t("paragraph2")}
          </p>
        </div>
      </div>
    </section>
  );
}
