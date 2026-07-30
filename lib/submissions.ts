import { promises as fs } from "fs";
import path from "path";

/**
 * Logs every form submission (contact, get-started, newsletter) to a local
 * JSON Lines file — one JSON object per line, appended per submission.
 * JSONL instead of a single JSON array deliberately: appending a line is
 * far safer under concurrent requests than a read-modify-write of one big
 * array, which can silently drop a submission if two land at once.
 *
 * IMPORTANT — this only persists on a traditional Node server (local dev,
 * a VPS, a Docker container with a real disk). On serverless hosting like
 * Vercel, the filesystem is read-only outside /tmp, and /tmp is wiped
 * between invocations — writes here will fail (and get logged, not lost
 * silently) rather than actually being stored. If this ships to Vercel,
 * swap this for a real datastore (Postgres, a hosted KV store, etc.).
 */

const DATA_DIR = path.join(process.cwd(), "data");
const SUBMISSIONS_FILE = path.join(DATA_DIR, "submissions.jsonl");

export type SubmissionRecord = {
  id: string;
  formType: string;
  timestamp: string;
  ip: string;
  userAgent: string;
  referrer: string;
  data: Record<string, unknown>;
};

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

export async function recordSubmission(
  formType: string,
  data: Record<string, unknown>,
  request: Request
): Promise<void> {
  const record: SubmissionRecord = {
    id: crypto.randomUUID(),
    formType,
    timestamp: new Date().toISOString(),
    ip: getClientIp(request),
    userAgent: request.headers.get("user-agent") || "unknown",
    referrer: request.headers.get("referer") || "",
    data,
  };

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.appendFile(SUBMISSIONS_FILE, JSON.stringify(record) + "\n", "utf-8");
  } catch (err) {
    // A logging failure must never break the actual submission flow.
    console.error("[submissions] Failed to write submission log:", err);
  }
}
