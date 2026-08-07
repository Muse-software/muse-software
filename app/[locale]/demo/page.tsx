import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "Effects & 3D demos — Muse",
};

/**
 * One entry per `demo/*` route, added as each phase of
 * `docs/effects-3d-implementation-plan.md` lands. `href` is locale-free — the
 * `Link` below adds the prefix — and `status` records whether the effect also
 * shipped to production (L1) or stays demo-only (L2), so this index doubles
 * as a live map of what's gated where.
 */
const DEMOS: { href: string; title: string; description: string; status: string }[] = [
  {
    href: "/magnetic",
    title: "Magnetic",
    description: "Hover-pull wrapper around real CTA components (PillButton, Link).",
    status: "Also production: Hero contact CTA, closing CTA",
  },
  {
    href: "/crosshair",
    title: "Crosshair cursor",
    description: "SVG reticle that frames hovered interactive elements. Zero WebGL contexts.",
    status: "Also production: mounted globally in layout.tsx",
  },
];

export default async function DemoIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-10">
      <h1 className="font-space-grotesk text-3xl font-bold">Effects &amp; 3D demos</h1>
      <p className="mt-3 max-w-[60ch] text-white/70">
        Internal showcase for the effect and 3D work in{" "}
        <code className="text-white/90">docs/effects-3d-implementation-plan.md</code>. Every
        route here is <code className="text-white/90">noindex</code>.
      </p>

      {DEMOS.length === 0 ? (
        <p className="mt-10 text-white/50">No demos published yet.</p>
      ) : (
        <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
          {DEMOS.map((demo) => (
            <li key={demo.href} className="py-5">
              <Link href={`/demo${demo.href}`} className="font-space-grotesk text-lg font-medium underline underline-offset-2">
                {demo.title}
              </Link>
              <p className="mt-1 text-sm text-white/60">{demo.description}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-[#fd4601]">{demo.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
