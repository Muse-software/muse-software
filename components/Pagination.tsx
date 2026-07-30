"use client";

function pageRange(current: number, total: number): (number | "ellipsis")[] {
  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = Array.from(pages)
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const result: (number | "ellipsis")[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) result.push("ellipsis");
    result.push(p);
    prev = p;
  }
  return result;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-14 flex items-center justify-center gap-2 md:mt-20"
    >
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
        className="border border-white/35 px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:border-white/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/35 disabled:hover:text-white/60"
      >
        Prev
      </button>

      {pageRange(page, totalPages).map((item, i) =>
        item === "ellipsis" ? (
          <span key={`e-${i}`} className="px-2 text-sm text-white/45">
            &hellip;
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            aria-current={item === page ? "page" : undefined}
            className={`h-10 w-10 shrink-0 border text-sm font-medium transition-colors ${
              item === page
                ? "border-[#fd4601] text-[#fd4601]"
                : "border-white/35 text-white/60 hover:border-white/40 hover:text-white"
            }`}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
        className="border border-white/35 px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:border-white/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/35 disabled:hover:text-white/60"
      >
        Next
      </button>
    </nav>
  );
}
