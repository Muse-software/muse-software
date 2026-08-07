import { setRequestLocale } from "next-intl/server";
import ProofWallCarousel from "@/components/sections/ProofWallCarousel";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "ProofWallCarousel — Effects & 3D demos",
};

type Props = { params: Promise<{ locale: string }> };

export default async function ProofWallCarouselDemoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-10">
      <h1 className="font-space-grotesk text-3xl font-bold">ProofWallCarousel</h1>
      <p className="mt-3 max-w-[70ch] text-white/70">
        The real production candidate for the homepage ProofWall section — same{" "}
        <code className="text-white/90">Home.proofWall.items</code> content, R3F wave carousel
        instead of the grid. Case-study text is real DOM (drei <code className="text-white/90">&lt;Html transform&gt;</code>
        ), not canvas glyphs, so it&apos;s selectable, indexable, and correct under Arabic bidi.
      </p>
      <p className="mt-3 max-w-[70ch] rounded-lg border border-[#fd4601]/30 bg-[#fd4601]/5 p-4 text-sm text-white/70">
        <strong className="text-[#fd4601]">Not wired into the homepage.</strong> The plan gates
        this swap on a QA pass (WebGL context count, LCP/CLS parity, RTL drag direction) that
        needs a GPU-capable browser — unavailable in the sandbox this was built in. The homepage
        keeps the grid (<code className="text-white/90">ProofWall</code>) until that QA runs. See{" "}
        <code className="text-white/90">docs/effects-3d-implementation-report.md</code>.
      </p>

      <div className="mt-8 rounded-2xl border border-white/10">
        <ProofWallCarousel locale={locale} />
      </div>
    </div>
  );
}
