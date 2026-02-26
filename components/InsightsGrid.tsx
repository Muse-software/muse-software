"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import GlassCard from "./ui/GlassCard";
import type { Insight } from "../lib/content";

const categories: Insight["category"][] = [
  "Strategy",
  "Engineering",
  "Operations",
  "Research",
];

type InsightsGridProps = {
  insights: Insight[];
};

export default function InsightsGrid({ insights }: InsightsGridProps) {
  const [active, setActive] = useState<Insight["category"] | "All">("All");

  const filtered = useMemo(() => {
    if (active === "All") return insights;
    return insights.filter((item) => item.category === active);
  }, [active, insights]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setActive("All")}
          className={`h-10 rounded-full border px-4 text-xs font-semibold uppercase tracking-[0.3em] transition ${
            active === "All"
              ? "border-[var(--gold)] text-[var(--gold)]"
              : "border-white/20 text-white/70 hover:border-[var(--coral)]"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={`h-10 rounded-full border px-4 text-xs font-semibold uppercase tracking-[0.3em] transition ${
              active === category
                ? "border-[var(--gold)] text-[var(--gold)]"
                : "border-white/20 text-white/70 hover:border-[var(--coral)]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((item) => (
          <GlassCard key={item.slug} className="flex h-full flex-col gap-4 p-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/60">
              <span>{item.category}</span>
              <span>{item.minutes} min</span>
            </div>
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <p className="text-sm leading-6 text-white/70">{item.excerpt}</p>
            <Link
              href={`/insights/${item.slug}`}
              className="mt-auto text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)]"
            >
              Read insight
            </Link>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
