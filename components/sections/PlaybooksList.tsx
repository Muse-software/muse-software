"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import Pagination from "../Pagination";
import type { PlaybookSummary, ContentCategory } from "../../lib/content";

// `ALL` is a sentinel, not a category name: the visible "All" label is a
// translated string, while category names are content and arrive already
// localized from the server.
const ALL = "__all__";
type Filter = ContentCategory | typeof ALL;

const PAGE_SIZE = 6;

/**
 * `categories` is a prop rather than a module import. It used to read
 * `playbookCategories` straight from `lib/content`, and because that const was
 * derived from the `playbooks` array in the same module, this Client Component
 * pulled all 288 KB of article bodies into the browser bundle — quietly
 * undoing the `PlaybookSummary` boundary that the server-side prop was built
 * to enforce. Splitting the content layer per locale would have doubled it.
 */
export default function PlaybooksList({
  playbooks,
  categories: contentCategories,
}: {
  playbooks: PlaybookSummary[];
  categories: ContentCategory[];
}) {
  const categories: Filter[] = [ALL, ...contentCategories];
  const t = useTranslations("Playbooks");
  const [active, setActive] = useState<Filter>(ALL);
  const [page, setPage] = useState(1);

  const filtered =
    active === ALL ? playbooks : playbooks.filter((item) => item.category === active);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page]
  );

  function selectCategory(cat: Filter) {
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
              {cat === ALL ? t("all") : cat}
            </button>
          ))}
        </div>

        {!pageItems.length ? (
          <p className="mt-14 text-white/50">{t("empty")}</p>
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
                      {t("cardMeta", {
                        category: playbook.category,
                        minutes: playbook.minutes,
                      })}
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
