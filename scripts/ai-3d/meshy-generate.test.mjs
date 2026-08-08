/**
 * Deterministic tests for `meshy-generate.mjs`'s hardening — no network
 * access and no paid Meshy API call. `fetch` is monkey-patched per test;
 * `downloadGlb`'s temp-file/atomic-rename path runs against a real
 * `os.tmpdir()` directory so the on-disk result (and absence of leftover
 * temp files) is actually verified, not just mocked away.
 *
 * Run: node --test scripts/ai-3d/meshy-generate.test.mjs
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import {
  CliError,
  parseArgs,
  resolveOutputDir,
  toImageUrlOrDataUri,
  downloadGlb,
} from "./meshy-generate.mjs";

async function withTmpDir(fn) {
  const dir = await mkdtemp(path.join(tmpdir(), "meshy-test-"));
  try {
    await fn(dir);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

function withFetch(impl, fn) {
  const original = globalThis.fetch;
  globalThis.fetch = impl;
  return Promise.resolve(fn()).finally(() => {
    globalThis.fetch = original;
  });
}

const GLB_MAGIC = Buffer.from("glTF", "ascii");

test("CLI: no MESHY_API_KEY — exits non-zero, explains why, touches no network", () => {
  const env = { ...process.env };
  delete env.MESHY_API_KEY;
  let error;
  try {
    execFileSync(process.execPath, [path.resolve("scripts/ai-3d/meshy-generate.mjs")], {
      env,
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (e) {
    error = e;
  }
  assert.ok(error, "expected the script to exit non-zero");
  assert.equal(error.status, 1);
  assert.match(error.stderr.toString(), /MESHY_API_KEY is not set/);
});

test("parseArgs: rejects unknown flags", () => {
  assert.throws(() => parseArgs(["--image", "a.jpg", "--evil", "x"]), CliError);
  assert.throws(() => parseArgs(["--rm", "-rf"]), CliError);
});

test("parseArgs: rejects a flag with no value", () => {
  assert.throws(() => parseArgs(["--image"]), CliError);
  assert.throws(() => parseArgs(["--image", "--out", "public/models/ai"]), CliError);
});

test("parseArgs: accepts known flags", () => {
  const args = parseArgs(["--image", "public/photos/x.jpg", "--out", "public/models/ai"]);
  assert.equal(args.image, "public/photos/x.jpg");
  assert.equal(args.out, "public/models/ai");
});

test("resolveOutputDir: rejects path traversal outside the project directory", () => {
  assert.throws(() => resolveOutputDir("../../etc", "/project"), CliError);
  assert.throws(() => resolveOutputDir("/etc", "/project"), CliError);
});

test("resolveOutputDir: accepts a path inside the project directory", () => {
  const resolved = resolveOutputDir("public/models/ai", "/project");
  assert.equal(resolved, path.resolve("/project", "public/models/ai"));
});

test("toImageUrlOrDataUri: rejects an unsupported local file extension", async () => {
  await assert.rejects(() => toImageUrlOrDataUri("scripts/ai-3d/meshy-generate.mjs"), CliError);
});

test("toImageUrlOrDataUri: rejects a loopback/local URL", async () => {
  await assert.rejects(() => toImageUrlOrDataUri("http://localhost:9999/image.jpg"), CliError);
  await assert.rejects(() => toImageUrlOrDataUri("http://127.0.0.1/image.jpg"), CliError);
});

test("toImageUrlOrDataUri: rejects non-http(s) protocols", async () => {
  await assert.rejects(() => toImageUrlOrDataUri("file:///etc/passwd"), CliError);
  await assert.rejects(() => toImageUrlOrDataUri("javascript:alert(1)"), CliError);
});

test("toImageUrlOrDataUri: accepts a safe https URL verbatim", async () => {
  const url = await toImageUrlOrDataUri("https://example.com/photo.jpg");
  assert.equal(url, "https://example.com/photo.jpg");
});

test("toImageUrlOrDataUri: encodes a real local image as a data URI", async () => {
  await withTmpDir(async (dir) => {
    const imgPath = path.join(dir, "photo.png");
    await writeFile(imgPath, Buffer.from([0x89, 0x50, 0x4e, 0x47]));
    const uri = await toImageUrlOrDataUri(imgPath);
    assert.match(uri, /^data:image\/png;base64,/);
  });
});

test("downloadGlb: bad response (not ok) throws and writes nothing", async () => {
  await withTmpDir(async (dir) => {
    const outPath = path.join(dir, "model.glb");
    await withFetch(
      async () => ({ ok: false, status: 500, statusText: "Internal Server Error" }),
      async () => {
        await assert.rejects(() => downloadGlb("https://cdn.example.com/model.glb", outPath), /500/);
      },
    );
    const entries = await readdir(dir);
    assert.deepEqual(entries, []);
  });
});

test("downloadGlb: invalid GLB (bad magic bytes) throws and cleans up, writes nothing at the final path", async () => {
  await withTmpDir(async (dir) => {
    const outPath = path.join(dir, "model.glb");
    const fakeBody = Buffer.from("NOT-A-GLB-FILE-CONTENTS");
    await withFetch(
      async () => ({
        ok: true,
        headers: new Map([["content-length", String(fakeBody.byteLength)]]),
        arrayBuffer: async () => fakeBody.buffer.slice(fakeBody.byteOffset, fakeBody.byteOffset + fakeBody.byteLength),
      }),
      async () => {
        await assert.rejects(() => downloadGlb("https://cdn.example.com/model.glb", outPath), /magic bytes/);
      },
    );
    const entries = await readdir(dir);
    assert.deepEqual(entries, [], "no partial/fake file should be left behind, including temp files");
  });
});

test("downloadGlb: oversized declared content-length is rejected before buffering the body", async () => {
  await withTmpDir(async (dir) => {
    const outPath = path.join(dir, "model.glb");
    await withFetch(
      async () => ({
        ok: true,
        headers: new Map([["content-length", String(500 * 1024 * 1024)]]),
        arrayBuffer: async () => {
          throw new Error("should not be called — size check must happen first");
        },
      }),
      async () => {
        await assert.rejects(() => downloadGlb("https://cdn.example.com/model.glb", outPath), /byte limit/);
      },
    );
  });
});

test("downloadGlb: valid GLB is written via atomic rename, no leftover temp file", async () => {
  await withTmpDir(async (dir) => {
    const outPath = path.join(dir, "nested", "model.glb");
    const fakeBody = Buffer.concat([GLB_MAGIC, Buffer.from([0x02, 0x00, 0x00, 0x00])]);
    await withFetch(
      async () => ({
        ok: true,
        headers: new Map([["content-length", String(fakeBody.byteLength)]]),
        arrayBuffer: async () => fakeBody.buffer.slice(fakeBody.byteOffset, fakeBody.byteOffset + fakeBody.byteLength),
      }),
      async () => {
        await downloadGlb("https://cdn.example.com/model.glb", outPath);
      },
    );
    const written = await readFile(outPath);
    assert.ok(written.equals(fakeBody));
    const entries = await readdir(path.dirname(outPath));
    assert.deepEqual(entries, ["model.glb"], "no .tmp file should remain next to the final file");
  });
});
