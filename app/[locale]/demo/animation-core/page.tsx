import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import AnimationCoreDemo from "./AnimationCoreDemo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "Animation core — Effects & 3D demos",
};

type Props = { params: Promise<{ locale: string }> };

export default async function AnimationCoreDemoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-5 md:px-10">
        <h1 className="font-space-grotesk text-3xl font-bold">Animation core</h1>
        <p className="mt-3 max-w-[60ch] text-white/70">
          Runtime proof for Phase A/B: Lenis feeding gsap&apos;s ticker (mounted globally, see{" "}
          <code className="text-white/90">SmoothScrollProvider.tsx</code>), plus SplitText, Flip
          and a ScrollTrigger pin — three gsap bonus plugins verified present in{" "}
          <code className="text-white/90">node_modules</code> but not previously exercised in this
          app outside <code className="text-white/90">WordReveal.tsx</code>&apos;s plain
          ScrollTrigger use.
        </p>
      </div>
      <AnimationCoreDemo />
    </div>
  );
}
