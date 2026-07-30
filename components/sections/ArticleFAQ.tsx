"use client";

import { useState } from "react";
import type { Faq } from "../../lib/content";

export default function ArticleFAQ({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs.length) return null;

  return (
    <div className="mt-16 border-t border-white/10 pt-12 md:mt-20 md:pt-16">
      <h2 className="font-space-grotesk text-2xl font-bold text-white md:text-3xl">
        Frequently asked questions
      </h2>

      <div className="mt-8">
        {faqs.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={item.question}
              className={`accordion-item border-b border-white/15 ${isOpen ? "open" : ""}`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="font-space-grotesk text-base text-white md:text-lg">
                  {item.question}
                </span>
                <svg
                  width="18"
                  height="18"
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
                  <p className="pb-5 text-base leading-7 text-white/60">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
