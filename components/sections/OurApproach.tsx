import { getTranslations } from "next-intl/server";
import WordReveal from "../WordReveal";

/**
 * A reading section, not another card grid — Capabilities above already
 * covers the grid-of-boxes shape, and repeating it here would make two
 * sections feel like one. Four beliefs read down a single editorial column
 * instead: an oversized, low-opacity ordinal marks each one the way a
 * magazine department number would. On desktop the four readings resolve
 * into a compact 2×2 editorial field. The second column begins one baseline
 * step lower, preserving asymmetry without turning four short beliefs into
 * several screens of empty space. Mobile remains one natural reading column.
 */
export default async function OurApproach() {
  const t = await getTranslations("Home.approach");
  const beliefs = t.raw("beliefs") as { title: string; body: string }[];

  return (
    <section id="approach" className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <div className="max-w-xl">
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

        <div className="mt-10 grid gap-y-10 md:mt-16 md:grid-cols-2 md:gap-x-20 md:gap-y-16 lg:gap-x-28">
          {beliefs.map((belief, i) => (
            <div
              key={belief.title}
              className={`max-w-[640px] ${i % 2 === 1 ? "md:translate-y-10" : ""}`}
            >
              <span
                aria-hidden="true"
                className="block font-space-grotesk text-5xl font-bold leading-none text-white/10 md:text-7xl"
              >
                {`0${i + 1}`}
              </span>
              <h3 className="mt-3 font-space-grotesk text-2xl font-bold text-white md:text-3xl">
                {belief.title}
              </h3>
              <p className="mt-4 max-w-[60ch] text-base leading-8 text-white/70 md:text-lg md:leading-9">
                {belief.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
