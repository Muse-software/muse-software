"use client";

import { useRef } from "react";
import GlassCard from "../ui/GlassCard";
import SectionHeading from "../ui/SectionHeading";

const testimonials = [
  {
    quote:
      "Muse delivered a trustworthy AI backbone that our regulators embraced.",
    name: "Jenna Park",
    role: "Chief Risk Officer, Nova Finance",
  },
  {
    quote:
      "Their team modernized our digital systems without breaking operations.",
    name: "Luis Romero",
    role: "VP Engineering, Lumen Health",
  },
  {
    quote:
      "We gained speed, transparency, and confidence across the board.",
    name: "Priya Kapoor",
    role: "COO, Axiom Logistics",
  },
];

export default function Testimonials() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (direction: "prev" | "next") => {
    const slider = sliderRef.current;
    if (!slider) return;
    const amount = slider.clientWidth * 0.8;
    slider.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 py-16">
      <div className="space-y-10">
        <SectionHeading
          eyebrow="Testimonials"
          title="Leaders trust Muse with their highest-stakes AI initiatives."
          subtitle="We build with clarity, security, and measurable value from day one."
        />
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Sliding proof
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollByAmount("prev")}
              className="h-10 w-10 rounded-full border border-white/20 text-sm text-white/70 transition hover:border-[var(--coral)]"
              aria-label="Previous testimonials"
            >
              {"<"}
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount("next")}
              className="h-10 w-10 rounded-full border border-white/20 text-sm text-white/70 transition hover:border-[var(--coral)]"
              aria-label="Next testimonials"
            >
              {">"}
            </button>
          </div>
        </div>
        <div
          ref={sliderRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
        >
          {testimonials.map((item) => (
            <div key={item.name} className="min-w-[260px] snap-start sm:min-w-[340px]">
              <GlassCard className="h-full p-6">
                <p className="text-base leading-7 text-white/80">
                  "{item.quote}"
                </p>
                <div className="mt-6 space-y-1">
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                    {item.role}
                  </p>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
