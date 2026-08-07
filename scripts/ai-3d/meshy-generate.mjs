/**
 * Meshy Image-to-3D pipeline (plan §4 Phase H, L3: "AI 3D uses Meshy API
 * only. Document TRELLIS & TripoSR; do not install locally.").
 *
 * This script is real and runnable — it is not a stub — but it has never
 * been run in this environment: there is no `MESHY_API_KEY` here (checked;
 * no `.env*` file exists either), and per plan §11 R-6 that key needs a paid
 * Meshy plan ($20/mo), which is a real-money decision for Abdullah to make,
 * not something to assume. Without a key this exits at the first check
 * below and generates nothing — `app/[locale]/demo/ai-3d` renders an honest
 * empty state instead of a faked result. See that route's page for the
 * demo-side half of this story.
 *
 * API shape (verified against https://docs.meshy.ai/en/api/image-to-3d,
 * fetched 2026-08-07 — not guessed):
 *   POST https://api.meshy.ai/openapi/v1/image-to-3d
 *     Authorization: Bearer <MESHY_API_KEY>
 *     body: { image_url, should_texture, enable_pbr, target_formats: ["glb"] }
 *     → { result: "<task-id>" }
 *   GET  https://api.meshy.ai/openapi/v1/image-to-3d/:id   (poll)
 *     → { status: "PENDING"|"IN_PROGRESS"|"SUCCEEDED"|"FAILED", progress,
 *         model_urls: { glb, fbx, obj, usdz, ... }, thumbnail_url, texture_urls }
 *
 * Usage (once a key exists):
 *   MESHY_API_KEY=... node scripts/ai-3d/meshy-generate.mjs --image public/photos/pillar-ai-transformation.jpg
 *
 * `--image` must be a Muse-owned image (local file path or a public URL) —
 * plan §6/R-6: commercial use of Meshy's output also needs rights to the
 * *input* image, so this never defaults to a stock/placeholder photo.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const API_BASE = "https://api.meshy.ai/openapi/v1";
const POLL_INTERVAL_MS = 5000;
const POLL_TIMEOUT_MS = 10 * 60 * 1000;

function parseArgs(argv) {
  const args = { out: "public/models/ai" };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--image") args.image = argv[++i];
    else if (argv[i] === "--out") args.out = argv[++i];
  }
  return args;
}

async function toImageUrlOrDataUri(imageArg) {
  if (/^https?:\/\//.test(imageArg)) return imageArg;
  const buffer = await readFile(imageArg);
  const ext = path.extname(imageArg).slice(1).toLowerCase();
  const mime = ext === "png" ? "image/png" : "image/jpeg";
  return `data:${mime};base64,${buffer.toString("base64")}`;
}

async function createTask(apiKey, imageUrl) {
  const response = await fetch(`${API_BASE}/image-to-3d`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      image_url: imageUrl,
      should_texture: true,
      enable_pbr: true,
      target_formats: ["glb"],
    }),
  });
  if (!response.ok) {
    throw new Error(`Meshy create-task failed: ${response.status} ${await response.text()}`);
  }
  const { result } = await response.json();
  return result;
}

async function pollTask(apiKey, taskId) {
  const deadline = Date.now() + POLL_TIMEOUT_MS;
  while (Date.now() < deadline) {
    const response = await fetch(`${API_BASE}/image-to-3d/${taskId}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (!response.ok) {
      throw new Error(`Meshy poll failed: ${response.status} ${await response.text()}`);
    }
    const task = await response.json();
    console.log(`  status=${task.status} progress=${task.progress ?? "?"}%`);
    if (task.status === "SUCCEEDED") return task;
    if (task.status === "FAILED" || task.status === "CANCELED") {
      throw new Error(`Meshy task ${task.status.toLowerCase()}: ${JSON.stringify(task.task_error ?? task)}`);
    }
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
  }
  throw new Error(`Meshy task ${taskId} did not finish within ${POLL_TIMEOUT_MS / 1000}s`);
}

async function main() {
  const apiKey = process.env.MESHY_API_KEY;
  if (!apiKey) {
    console.error(
      "MESHY_API_KEY is not set — nothing to do. This is expected in an environment with " +
        "no paid Meshy plan (plan §11 R-6); see this file's header comment for how to run it " +
        "once a key exists. Exiting without generating anything.",
    );
    process.exitCode = 1;
    return;
  }

  const args = parseArgs(process.argv.slice(2));
  if (!args.image) {
    console.error("Usage: MESHY_API_KEY=... node scripts/ai-3d/meshy-generate.mjs --image <muse-owned-image>");
    process.exitCode = 1;
    return;
  }

  console.log(`Uploading ${args.image} to Meshy image-to-3D...`);
  const imageUrl = await toImageUrlOrDataUri(args.image);
  const taskId = await createTask(apiKey, imageUrl);
  console.log(`Task created: ${taskId}. Polling...`);
  const task = await pollTask(apiKey, taskId);

  const glbUrl = task.model_urls?.glb;
  if (!glbUrl) throw new Error(`Task succeeded but no glb in model_urls: ${JSON.stringify(task.model_urls)}`);

  await mkdir(args.out, { recursive: true });
  const outPath = path.join(args.out, `${taskId}.glb`);
  const glbResponse = await fetch(glbUrl);
  await writeFile(outPath, Buffer.from(await glbResponse.arrayBuffer()));

  console.log(`Wrote ${outPath}`);
  console.log(
    "Reminder (plan §6): Meshy free-tier output is CC-BY 4.0 (credit Meshy in " +
      "public/models/ai/ATTRIBUTION.md); a Pro plan grants full ownership instead. Either way, " +
      "commercial use also needs rights to the input image — confirm that before shipping.",
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
