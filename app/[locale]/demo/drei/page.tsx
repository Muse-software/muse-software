import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import DreiDemo from "./DreiDemo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "drei showcase — Effects & 3D demos",
};

type Props = { params: Promise<{ locale: string }> };

export default async function DreiDemoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 md:px-10">
      <h1 className="font-space-grotesk text-3xl font-bold">drei showcase</h1>
      <p className="mt-3 max-w-[60ch] text-white/70">
        A curated 5 of drei&apos;s ~13 components (plan §8 defers the rest): glass (
        <code className="text-white/90">MeshTransmissionMaterial</code>), particles (
        <code className="text-white/90">Sparkles</code>), idle motion (
        <code className="text-white/90">Float</code>), drag-to-orbit (
        <code className="text-white/90">PresentationControls</code>) and procedural lighting/
        reflections (<code className="text-white/90">Environment</code> +{" "}
        <code className="text-white/90">Lightformer</code>, no external HDRI — this repo&apos;s
        CSP doesn&apos;t allow the CDN drei&apos;s presets hotlink to). Drag to orbit.
      </p>

      <div className="mt-12">
        <DreiDemo />
      </div>
    </div>
  );
}
