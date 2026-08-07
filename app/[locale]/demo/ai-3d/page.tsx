import { readdir } from "node:fs/promises";
import path from "node:path";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import AiThreeDViewer from "./AiThreeDViewer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "AI 3D (Meshy) — Effects & 3D demos",
};

type Props = { params: Promise<{ locale: string }> };

/**
 * Lists whatever `.glb` files `scripts/ai-3d/meshy-generate.mjs` has written
 * to `public/models/ai/` — empty today (no `MESHY_API_KEY` in this
 * environment, plan §11 R-6), so this returns `[]` and the page below
 * renders documentation + an empty state instead of faking a result. Drop a
 * real generated `.glb` there and this page picks it up with no code change.
 */
async function listGeneratedModels(): Promise<string[]> {
  const dir = path.join(process.cwd(), "public", "models", "ai");
  try {
    const entries = await readdir(dir);
    return entries.filter((entry) => entry.endsWith(".glb"));
  } catch {
    return [];
  }
}

export default async function Ai3dDemoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const models = await listGeneratedModels();

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 md:px-10">
      <h1 className="font-space-grotesk text-3xl font-bold">AI 3D (Meshy)</h1>
      <p className="mt-3 max-w-[60ch] text-white/70">
        Plan L3: AI-generated 3D uses the <strong className="text-white">Meshy API only</strong>.
        TRELLIS and TripoSR are documented as alternatives below, never installed locally.
      </p>

      {models.length > 0 ? (
        <div className="mt-12">
          <AiThreeDViewer modelUrl={`/models/ai/${models[0]}`} />
        </div>
      ) : (
        <div className="mt-12 space-y-8">
          <div className="rounded-2xl border border-[#fd4601]/30 bg-[#fd4601]/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#fd4601]">
              Generation: blocked / deferred
            </p>
            <p className="mt-3 text-white/80">
              No model has been generated. There is no <code className="text-white/90">MESHY_API_KEY</code>{" "}
              in this environment — that needs a paid Meshy plan ($20/mo, plan §11 R-6), a
              real-money decision that hasn&apos;t been made, not a missing script. Nothing here
              is a placeholder or a faked result standing in for a real one.
            </p>
          </div>

          <div>
            <h2 className="font-space-grotesk text-xl font-bold">The pipeline, as written</h2>
            <p className="mt-2 max-w-[65ch] text-white/70">
              <code className="text-white/90">scripts/ai-3d/meshy-generate.mjs</code> is a real,
              runnable script (verified against Meshy&apos;s actual API shape, not guessed) — it
              just has never executed here:
            </p>
            <ol className="mt-4 list-decimal space-y-2 ps-6 text-white/70">
              <li>
                <code className="text-white/90">
                  POST https://api.meshy.ai/openapi/v1/image-to-3d
                </code>{" "}
                with a Muse-owned image (local file or URL) and{" "}
                <code className="text-white/90">Authorization: Bearer $MESHY_API_KEY</code> —
                commercial use of the output also needs rights to that input image.
              </li>
              <li>
                Poll <code className="text-white/90">GET .../image-to-3d/:id</code> until{" "}
                <code className="text-white/90">status: &quot;SUCCEEDED&quot;</code>.
              </li>
              <li>
                Download <code className="text-white/90">model_urls.glb</code> into{" "}
                <code className="text-white/90">public/models/ai/</code> — this page then
                renders it automatically, no code change.
              </li>
            </ol>
            <p className="mt-4 max-w-[65ch] text-white/70">
              Run: <code className="text-white/90">MESHY_API_KEY=... node scripts/ai-3d/meshy-generate.mjs --image public/photos/pillar-ai-transformation.jpg</code>
            </p>
          </div>

          <div>
            <h2 className="font-space-grotesk text-xl font-bold">Documented, not installed</h2>
            <p className="mt-2 max-w-[65ch] text-white/70">
              Per plan L3, these are alternative image/text-to-3D pipelines worth knowing about —
              neither is installed in this repo, and this branch doesn&apos;t add them:
            </p>
            <ul className="mt-4 space-y-2 text-white/70">
              <li>
                <strong className="text-white">
                  <a
                    href="https://github.com/microsoft/TRELLIS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2"
                  >
                    microsoft/TRELLIS
                  </a>
                </strong>{" "}
                — MIT-licensed, self-hostable, needs a real GPU to run inference (not viable in a
                sandboxed CI/build environment).
              </li>
              <li>
                <strong className="text-white">
                  <a
                    href="https://github.com/VAST-AI-Research/TripoSR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2"
                  >
                    VAST-AI-Research/TripoSR
                  </a>
                </strong>{" "}
                — MIT-licensed, faster/lighter single-image-to-3D, same GPU-hosting requirement.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-space-grotesk text-xl font-bold">CSP, if this ever goes live</h2>
            <p className="mt-2 max-w-[65ch] text-white/70">
              This repo&apos;s CSP is <code className="text-white/90">connect-src &apos;self&apos; blob:</code> — no
              external hosts. The script above runs at build/CLI time, outside the browser, so it
              needs no CSP change. A live in-browser call to Meshy&apos;s API (plan §11 R-5) would;
              verify the exact hosts from{" "}
              <a
                href="https://docs.meshy.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                docs.meshy.ai
              </a>{" "}
              before editing <code className="text-white/90">next.config.ts</code>, and re-test the
              whole site — that CSP also protects the 3D hero&apos;s Draco/blob flows.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
