"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import WordReveal from "../WordReveal";

type FaqItem = { q: string; a: string };

/**
 * Home renders this with no props and reads its own `Home.faq` namespace.
 * Service detail pages pass `heading` + `items` explicitly (`Services.detail.faq`
 * + the service's own FAQ records) so the same accordion doesn't fork.
 */
export default function FAQ({
  heading,
  items,
}: {
  heading?: string;
  items?: FaqItem[];
}) {
  const t = useTranslations("Home.faq");
  // `t.raw` because the questions are a list, not a single message — ICU has
  // no array form, so the shape is read straight out of the catalogue.
  const faqs = items ?? (t.raw("items") as FaqItem[]);
  const resolvedHeading = heading ?? t("heading");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    // No background: the page wash runs underneath — see PageDither.
    <section className="py-20 md:py-32">
      <div className="mx-auto w-full max-w-[900px] px-5 md:px-10">
        <WordReveal
          as="h2"
          className="font-space-grotesk text-2xl font-bold text-white md:text-4xl"
        >
          {resolvedHeading}
        </WordReveal>

        <div className="mt-10 md:mt-14">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.q}
                className={`accordion-item border-b border-white/15 ${isOpen ? "open" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-start"
                >
                  <span className="font-space-grotesk text-lg text-white md:text-xl">
                    {item.q}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  >
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
                <div className="accordion-panel">
                  <div>
                    <p className="max-w-[65ch] pb-6 text-base leading-7 text-white/60">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
