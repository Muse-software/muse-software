"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Pagination from "../Pagination";
import { playbookCategories } from "../../lib/content";
import type { PlaybookSummary, InsightCategory } from "../../lib/content";

const categories: (InsightCategory | "All")[] = ["All", ...playbookCategories];

const PAGE_SIZE = 6;

export default function PlaybooksList({ playbooks }: { playbooks: PlaybookSummary[] }) {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [page, setPage] = useState(1);

  const filtered =
    active === "All" ? playbooks : playbooks.filter((item) => item.category === active);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page]
  );

  function selectCategory(cat: (typeof categories)[number]) {
    setActive(cat);
    setPage(1);
  }

  function goToPage(next: number) {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className="bg-[#060608] pb-16 md:pb-24">
      <div className="mx-auto w-full max-w-[1100px] px-5 md:px-10">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => selectCategory(cat)}
              className={`border px-5 py-2 text-sm font-medium transition-colors md:text-base ${
                active === cat
                  ? "border-[#fd4601] text-[#fd4601]"
                  : "border-white/35 text-white/60 hover:border-white/40 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {!pageItems.length ? (
          <p className="mt-14 text-white/50">No playbooks in this category yet.</p>
        ) : (
          <>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {pageItems.map((playbook) => (
                <Link
                  key={playbook.slug}
                  href={`/playbooks/${playbook.slug}`}
                  className="group overflow-hidden border border-white/10 transition-colors duration-300 hover:border-[#fd4601]"
                >
                  <div className="relative h-40 w-full">
                    <Image
                      src={playbook.featuredImage.src}
                      alt={playbook.featuredImage.alt}
                      fill
                      sizes="(min-width: 768px) 550px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                      {playbook.category} · {playbook.minutes} min read
                    </p>
                    <h3 className="mt-3 font-space-grotesk text-lg font-bold text-white md:text-xl">
                      {playbook.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-white/70">{playbook.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>

            <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
          </>
        )}
      </div>
    </section>
  );
}
