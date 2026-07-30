"use client";

import { useState } from "react";
import WordReveal from "../WordReveal";

const faqs = [
  {
    q: "How is Muse different from a typical dev shop?",
    a: "We're a small, senior team — not a rotating cast of offshore contractors. Every engagement is staffed by people who've shipped production AI systems before, not people learning on your dime.",
  },
  {
    q: "What does AI transformation actually mean?",
    a: "Finding where AI removes real friction in how your business runs, building the systems that do it reliably, and getting your team using them — then repeating that cycle as the tools improve.",
  },
  {
    q: "How does pricing work?",
    a: "Depends on the engagement. Fixed-scope builds are quoted up front; ongoing transformation work is a monthly partnership scaled to what you need. Happy to walk through it on a call.",
  },
  {
    q: "What's different about Muse compared to other agencies?",
    a: "No 100-slide strategy decks with no execution behind them. We scope fast, build in public with you, and measure ourselves on what actually shipped.",
  },
  {
    q: "Who do you typically work with?",
    a: "Teams that want to move at startup speed — whether that's a founder shipping a first product or an enterprise team trying to get an AI initiative out of pilot purgatory.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#060608] py-20 md:py-32">
      <div className="mx-auto w-full max-w-[900px] px-5 md:px-10">
        <WordReveal
          as="h2"
          className="font-space-grotesk text-2xl font-bold text-white md:text-4xl"
        >
          Questions? We have answers.
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
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
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
