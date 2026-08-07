import { setRequestLocale } from "next-intl/server";
import Magnetic from "@/components/effects/Magnetic";
import PillButton from "@/components/PillButton";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "Magnetic — Effects & 3D demos",
};

type Props = { params: Promise<{ locale: string }> };

export default async function MagneticDemoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-10">
      <h1 className="font-space-grotesk text-3xl font-bold">Magnetic</h1>
      <p className="mt-3 max-w-[60ch] text-white/70">
        A hover-pull wrapper around the site&apos;s real CTA components — not a
        rewritten button. Move the pointer near each one. Off on touch
        (no <code className="text-white/90">(pointer: fine)</code>) and under
        reduced motion.
      </p>

      <div className="mt-12 flex flex-wrap items-center gap-10">
        <Magnetic strength={0.3} radius={90}>
          <PillButton href="#" variant="onDark">
            strength 0.3
          </PillButton>
        </Magnetic>

        <Magnetic strength={0.5} radius={120}>
          <PillButton href="#" variant="onDark">
            strength 0.5
          </PillButton>
        </Magnetic>

        <Magnetic strength={0.15} radius={140}>
          <PillButton href="#" variant="onAccent" className="bg-[#fd4601] text-black">
            strength 0.15, wide radius
          </PillButton>
        </Magnetic>
      </div>

      <p className="mt-12 text-sm text-white/50">
        Production wiring: <code className="text-white/90">Hero.tsx</code>&apos;s contact CTA and{" "}
        <code className="text-white/90">CTA.tsx</code>&apos;s closing button, both gated the same
        way.
      </p>
    </div>
  );
}
