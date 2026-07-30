"use client";

import { useMemo, useState, type ReactNode } from "react";
import Pagination from "./Pagination";

/**
 * Shared pagination/grid shell for NewsletterList — a plain client-paginated
 * 2-col grid of cards with no other logic. Insights and Playbooks both grew
 * their own category filter on top of pagination (Insights additionally has
 * a featured-hero-card layout for page 1), genuinely different UI per list,
 * so they're hand-rolled rather than threading filter/feature-slot props
 * through a component only one caller would use each prop for.
 */
export default function PaginatedCardGrid<T>({
  items,
  pageSize,
  renderCard,
  heading,
  className = "bg-[#060608] pb-16 md:pb-24",
}: {
  items: T[];
  pageSize: number;
  renderCard: (item: T) => ReactNode;
  heading?: string;
  className?: string;
}) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const pageItems = useMemo(
    () => items.slice((page - 1) * pageSize, page * pageSize),
    [items, page, pageSize]
  );

  function goToPage(next: number) {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className={className}>
      <div className="mx-auto w-full max-w-[1100px] px-5 md:px-10">
        {heading && (
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
            {heading}
          </p>
        )}
        <div className={`grid gap-6 md:grid-cols-2 ${heading ? "mt-8" : ""}`}>
          {pageItems.map(renderCard)}
        </div>
        <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
      </div>
    </section>
  );
}
