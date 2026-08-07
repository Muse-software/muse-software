import { setRequestLocale } from "next-intl/server";
import R3FCarousel from "@/components/effects/R3FCarousel";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "R3F Carousel — Effects & 3D demos",
};

type Props = { params: Promise<{ locale: string }> };

const PHOTOS = [
  { src: "/photos/cover-neon-city.jpg", alt: "Neon-lit city street at night" },
  { src: "/photos/cover-orange-blur.jpg", alt: "Abstract orange motion blur" },
  { src: "/photos/cover-red-light-figure.jpg", alt: "Figure lit in red light" },
  { src: "/photos/hero-group-silhouette.jpg", alt: "Group silhouette against light" },
  { src: "/photos/hero-silhouette-sunset.jpg", alt: "Silhouette at sunset" },
  { src: "/photos/pillar-ai-transformation.jpg", alt: "AI transformation visual" },
  { src: "/photos/pillar-gamification.jpg", alt: "Gamification visual" },
  { src: "/photos/pillar-product-engineering.jpg", alt: "Product engineering visual" },
];

export default async function CarouselDemoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 md:px-10">
      <h1 className="font-space-grotesk text-3xl font-bold">R3F Carousel</h1>
      <p className="mt-3 max-w-[60ch] text-white/70">
        A wavy infinite carousel — R3F planes, a GLSL wave-distortion shader, drag or wheel driven.
        Technique source: colindmg/r3f-experimental-carousel (MIT). Textured with Muse&apos;s own{" "}
        <code className="text-white/90">public/photos/*</code>, not the upstream demo&apos;s
        Midjourney images. Drag horizontally, or scroll with a vertical wheel gesture over the
        canvas. RTL-aware: try this page&apos;s <code className="text-white/90">/ar</code>{" "}
        counterpart and the direction flips.
      </p>

      <div className="mt-12 h-[420px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
        <R3FCarousel images={PHOTOS} className="h-full w-full" />
      </div>

      <p className="mt-6 text-sm text-white/50">
        Reduced motion swaps this for a plain scrollable strip of real <code className="text-white/90">img</code>{" "}
        elements — no canvas, no rAF loop. Intersection-gated: scroll away and back to see the
        WebGL context mount and unmount.
      </p>
    </div>
  );
}
