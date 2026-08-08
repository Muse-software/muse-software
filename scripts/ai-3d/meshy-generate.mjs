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
 * `--image` must be a Muse-owned image (local file path or a public http(s)
 * URL) — plan §6/R-6: commercial use of Meshy's output also needs rights to
 * the *input* image, so this never defaults to a stock/placeholder photo.
 *
 * Security notes (acceptance-phase hardening, this is untrusted-input-adjacent
 * since `--image`/`--out` are attacker-controllable if this is ever wired
 * into anything less trusted than a developer's own CLI invocation):
 *   - CLI flags are an explicit allowlist; anything else is a hard error.
 *   - `--image` accepts only known local image extensions or an http(s) URL
 *     with a non-loopback host — no `file:`/`data:`/`javascript:` etc.
 *   - `--out` is resolved and must stay inside the project directory —
 *     no `../` escapes.
 *   - The downloaded `.glb` is size-capped, magic-byte checked, written to a
 *     temp file, and atomically renamed — a failed/invalid download never
 *     leaves a partial or fake `.glb` at the final path.
 *   - `MESHY_API_KEY` is read once into a local and never logged, echoed, or
 *     included in any thrown error message.
 */
import { readFile, writeFile, mkdir, rm, rename } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const API_BASE = "https://api.meshy.ai/openapi/v1";
const POLL_INTERVAL_MS = 5000;
const POLL_TIMEOUT_MS = 10 * 60 * 1000;

// Real Meshy `.glb` outputs run a few MB to a few tens of MB. 200MB is a
// generous ceiling meant to catch a runaway or unexpected response, not a
// realistic expected size.
const MAX_GLB_BYTES = 200 * 1024 * 1024;
const GLB_MAGIC = Buffer.from("glTF", "ascii");
const ALLOWED_IMAGE_EXTENSIONS = new Map([
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".png", "image/png"],
  [".webp", "image/webp"],
]);
const KNOWN_FLAGS = new Set(["--image", "--out"]);
const BLOCKED_URL_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"]);

export class CliError extends Error {}

export function parseArgs(argv) {
  const args = { out: "public/models/ai" };
  for (let i = 0; i < argv.length; i += 1) {
    const flag = argv[i];
    if (!KNOWN_FLAGS.has(flag)) {
      throw new CliError(`Unknown option: ${flag}`);
    }
    const value = argv[i + 1];
    if (value === undefined || value.startsWith("--")) {
      throw new CliError(`${flag} requires a value`);
    }
    if (flag === "--image") args.image = value;
    else if (flag === "--out") args.out = value;
    i += 1;
  }
  return args;
}

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isSafeHttpUrl(value) {
  if (!isHttpUrl(value)) return false;
  const { hostname } = new URL(value);
  return !BLOCKED_URL_HOSTS.has(hostname.toLowerCase());
}

/** Resolves `--out` to an absolute path and rejects anything that escapes the project directory (e.g. `--out ../../etc`). */
export function resolveOutputDir(outArg, cwd = process.cwd()) {
  const resolved = path.resolve(cwd, outArg);
  const relative = path.relative(cwd, resolved);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new CliError(`--out must resolve inside the project directory, got "${outArg}"`);
  }
  return resolved;
}

export async function toImageUrlOrDataUri(imageArg) {
  if (isHttpUrl(imageArg)) {
    if (!isSafeHttpUrl(imageArg)) {
      throw new CliError(`Refusing --image URL pointing at a local/loopback host: ${imageArg}`);
    }
    return imageArg;
  }

  const ext = path.extname(imageArg).toLowerCase();
  const mime = ALLOWED_IMAGE_EXTENSIONS.get(ext);
  if (!mime) {
    throw new CliError(
      `Unsupported --image type "${ext || "(none)"}" — expected one of ` +
        `${[...ALLOWED_IMAGE_EXTENSIONS.keys()].join(", ")} or an http(s) URL, got "${imageArg}".`,
    );
  }

  let buffer;
  try {
    buffer = await readFile(imageArg);
  } catch (error) {
    throw new CliError(`Could not read --image "${imageArg}": ${error.message}`);
  }
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

/**
 * Downloads `url`, validates it's an actual GLB (size cap + `glTF` magic
 * bytes), then writes it to `outPath` via a temp file + atomic rename so a
 * failed or invalid download never leaves a partial/fake `.glb` behind.
 */
export async function downloadGlb(url, outPath) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Meshy glb download failed: ${response.status} ${response.statusText}`);
  }

  const declaredLength = Number(response.headers.get("content-length") ?? "0");
  if (declaredLength > MAX_GLB_BYTES) {
    throw new Error(`Meshy glb download exceeds ${MAX_GLB_BYTES}-byte limit (content-length: ${declaredLength})`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.byteLength > MAX_GLB_BYTES) {
    throw new Error(`Meshy glb download exceeds ${MAX_GLB_BYTES}-byte limit (got ${buffer.byteLength} bytes)`);
  }
  if (!buffer.subarray(0, 4).equals(GLB_MAGIC)) {
    throw new Error("Downloaded file is not a valid GLB (missing 'glTF' magic bytes) — refusing to write it");
  }

  await mkdir(path.dirname(outPath), { recursive: true });
  const tmpPath = `${outPath}.${crypto.randomUUID()}.tmp`;
  try {
    await writeFile(tmpPath, buffer);
    await rename(tmpPath, outPath);
  } catch (error) {
    await rm(tmpPath, { force: true });
    throw error;
  }
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

  const usage =
    "Usage: MESHY_API_KEY=... node scripts/ai-3d/meshy-generate.mjs --image <muse-owned-image-or-https-url> [--out <dir>]";

  let args;
  try {
    args = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    console.error(usage);
    process.exitCode = 1;
    return;
  }
  if (!args.image) {
    console.error(usage);
    process.exitCode = 1;
    return;
  }

  let outDir;
  let imageUrl;
  try {
    outDir = resolveOutputDir(args.out);
    imageUrl = await toImageUrlOrDataUri(args.image);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
    return;
  }

  console.log(`Uploading ${args.image} to Meshy image-to-3D...`);
  const taskId = await createTask(apiKey, imageUrl);
  console.log(`Task created: ${taskId}. Polling...`);
  const task = await pollTask(apiKey, taskId);

  const glbUrl = task.model_urls?.glb;
  if (!glbUrl) throw new Error(`Task succeeded but no glb in model_urls: ${JSON.stringify(task.model_urls)}`);

  const outPath = path.join(outDir, `${taskId}.glb`);
  await downloadGlb(glbUrl, outPath);

  console.log(`Wrote ${outPath}`);
  console.log(
    "Reminder (plan §6): Meshy free-tier output is CC-BY 4.0 (credit Meshy in " +
      "public/models/ai/ATTRIBUTION.md); a Pro plan grants full ownership instead. Either way, " +
      "commercial use also needs rights to the input image — confirm that before shipping.",
  );
}

const isMain = process.argv[1] && import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  main().catch((error) => {
    console.error(error.message ?? error);
    process.exitCode = 1;
  });
}
