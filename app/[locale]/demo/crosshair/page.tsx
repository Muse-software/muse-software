import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "Crosshair — Effects & 3D demos",
};

type Props = { params: Promise<{ locale: string }> };

export default async function CrosshairDemoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-10">
      <h1 className="font-space-grotesk text-3xl font-bold">Crosshair cursor</h1>
      <p className="mt-3 max-w-[60ch] text-white/70">
        Mounted globally (<code className="text-white/90">app/[locale]/layout.tsx</code>) — this
        is the same cursor following your pointer on every page right now, not a separate
        instance. Pure SVG, zero WebGL contexts. Off on touch and under reduced motion.
      </p>

      <div className="mt-12 flex flex-wrap items-center gap-6">
        <a href="#" className="border border-white/30 px-5 py-3 font-space-grotesk hover:border-[#fd4601]">
          Link target
        </a>
        <button type="button" className="border border-white/30 px-5 py-3 font-space-grotesk hover:border-[#fd4601]">
          Button target
        </button>
        <input
          type="text"
          placeholder="Input target"
          className="border border-white/30 bg-transparent px-5 py-3 font-space-grotesk placeholder:text-white/40"
        />
      </div>

      <div
        data-no-crosshair
        className="mt-12 rounded-2xl border border-dashed border-white/20 bg-white/5 p-10 text-center text-white/60"
      >
        <code className="text-white/90">data-no-crosshair</code> — the reticle hides entirely
        inside this box, the same opt-out used on the production closing CTA panel (which already
        runs its own <code className="text-white/90">DitherCursor</code>).
      </div>
    </div>
  );
}
