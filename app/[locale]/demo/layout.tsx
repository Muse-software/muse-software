import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

/**
 * Every route under `demo/*` is an internal effects/3D showcase (L2 in
 * `docs/effects-3d-implementation-plan.md`), never production content.
 * Setting `robots` here — rather than per-page — means a future demo page
 * that forgets to call `buildMetadata` still can't leak into the index: Next
 * only overrides a metadata key a child segment actually sets, so an
 * unspecified `robots` on the page falls through to this layout's value.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DemoLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // next-intl's static-rendering optimization requires every layout and page
  // in a segment to call this, or the whole route falls back to dynamic
  // rendering — see `app/[locale]/layout.tsx`'s use of the same call.
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <div className="border-b border-white/10 bg-[#fd4601]/10 px-5 py-3 text-center text-sm md:px-10">
        <Link href="/demo" className="font-medium underline underline-offset-2">
          Demo index
        </Link>
        <span className="mx-2 text-white/40">·</span>
        <span className="text-white/60">
          Internal effects/3D showcase — noindex, not part of the production site.
        </span>
      </div>
      {children}
    </div>
  );
}
