import { notFound } from "next/navigation";

/**
 * Unmatched paths inside a locale would otherwise fall through to Next's
 * built-in root 404, which renders *outside* `[locale]/layout.tsx` — no
 * `<html lang>`, no `dir`, no nav, no footer. Catching them here means
 * `notFound()` resolves to `app/[locale]/not-found.tsx` instead, so a 404
 * keeps the site chrome and the correct text direction.
 */
export default function CatchAllPage() {
  notFound();
}
