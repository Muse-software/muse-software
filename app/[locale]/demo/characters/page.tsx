import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import CharactersDemo from "./CharactersDemo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "3D characters — Effects & 3D demos",
};

type Props = { params: Promise<{ locale: string }> };

export default async function CharactersDemoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 md:px-10">
      <h1 className="font-space-grotesk text-3xl font-bold">3D characters</h1>
      <p className="mt-3 max-w-[60ch] text-white/70">
        Three real, verbatim glTF-Sample-Assets models — Fox, Cesium Man, Rigged Simple (
        <a
          href="https://github.com/KhronosGroup/glTF-Sample-Assets"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-white"
        >
          KhronosGroup/glTF-Sample-Assets
        </a>
        , CC0/CC-BY — see{" "}
        <code className="text-white/90">public/models/khronos/ATTRIBUTION.md</code>). KayKit,
        the plan&apos;s primary stylized-character direction, is deferred — its itch.io download
        needs a manual claim click this environment can&apos;t script (see the attribution file
        for the exact drop-in path once it&apos;s downloaded by hand).
      </p>

      <div className="mt-12">
        <CharactersDemo />
      </div>
    </div>
  );
}
