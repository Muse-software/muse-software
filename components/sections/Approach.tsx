"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import WordReveal from "../WordReveal";
import Icon from "../Icon";
import { services } from "../../lib/content";

const cardCopy: Record<string, string> = {
  "ai-transformation":
    "As the cost of intelligence approaches zero, staying AI-absent isn't a neutral choice — it's a slow decline. We map your workflows, find the highest-leverage places to put AI to work, and stand up agentic systems with guardrails built in from day one. Every engagement ends with something running in production, not a slide deck.",
  "product-engineering":
    "Good ideas stall when engineering can't move at the pace the business needs. We design and ship production-grade software fast, with an outcomes-first model — you pay for what ships, not hours logged. The same senior team stays with you from first prototype to production scale.",
  "gamification-experience":
    "New tools compete with old habits, and habits usually win by default. We design interactive, rewarding digital experiences — reward systems, onboarding journeys, and playable prototypes — that make change stick instead of stalling out. You'll be clicking through something real within the first week.",
};

export default function Approach() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="bg-[#060608] py-20 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-16">
          <div className="md:sticky md:top-28 md:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
              Our approach
            </p>
            <WordReveal
              as="h2"
              className="mt-4 max-w-[10ch] font-space-grotesk text-4xl font-medium leading-[1.05] text-white md:text-5xl"
            >
              Muse helps you shift from AI-absent to AI-native.
            </WordReveal>
          </div>

          <div className="flex flex-col gap-5">
            {services.map((service, i) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className={`group flex items-center justify-between gap-6 border px-6 py-8 transition-colors duration-300 md:px-10 ${
                  active === i
                    ? "border-[#fd4601] bg-[#fd4601] text-black"
                    : "border-white/35 bg-transparent text-white"
                }`}
              >
                <div className="max-w-[48ch]">
                  <h3 className="font-space-grotesk text-2xl font-bold md:text-3xl">
                    {service.title}
                  </h3>
                  <p
                    className={`mt-3 text-sm leading-6 md:text-base ${
                      active === i ? "text-black/80" : "text-white/60"
                    }`}
                  >
                    {cardCopy[service.slug]}
                  </p>
                  <span
                    className={`mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] ${
                      active === i ? "text-black" : "text-[#fd4601]"
                    }`}
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </span>
                </div>

                {/* Outline icon crossfades into a real photo on hover */}
                <div className="relative h-20 w-20 shrink-0 overflow-hidden md:h-28 md:w-28">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 112px, 80px"
                    className={`object-cover transition-opacity duration-500 ${
                      active === i ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                      active === i ? "opacity-0" : "opacity-100"
                    } ${active === i ? "text-black" : "text-white/50"}`}
                  >
                    <Icon name={service.icon} className="h-10 w-10" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
