"use client";

import { useTranslations } from "next-intl";
import WordReveal from "../WordReveal";
import TrackNav from "../TrackNav";
import { useHorizontalScroll } from "../../lib/useHorizontalScroll";

export default function BeliefSlider() {
  const t = useTranslations("About.beliefs");
  const beliefs = t.raw("items") as string[];
  const { trackRef, scroll } = useHorizontalScroll();

  return (
    <section className="bg-[#060608] py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1100px] px-5 md:px-10">
        <WordReveal
          as="h2"
          className="font-space-grotesk text-2xl font-bold text-white md:text-3xl"
        >
          {t("heading")}
        </WordReveal>

        <div
          ref={trackRef}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
        >
          {beliefs.map((belief, i) => (
            <div
              data-card
              key={belief}
              className="relative w-[85vw] max-w-[420px] shrink-0 snap-start overflow-hidden border border-white/10 p-8 md:p-10"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -end-2 -top-6 font-space-grotesk text-[7rem] font-bold leading-none text-white/5 md:text-[8rem]"
              >
                {i + 1}
              </span>
              <p className="relative text-lg leading-8 text-white/80">{belief}</p>
            </div>
          ))}
        </div>

        <TrackNav
          className="mt-6"
          onScroll={(direction) => scroll(direction, 24, 420)}
          previousLabel={t("previous")}
          nextLabel={t("next")}
        />
      </div>
    </section>
  );
}
