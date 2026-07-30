const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

// Periodic sweep so IPs that stop sending requests don't linger in the map
// forever — bounds memory to only keys with activity inside the current
// window instead of growing with every unique visitor over the process
// lifetime. `unref()` so this timer never keeps the process alive on its own.
const sweep = setInterval(() => {
  const now = Date.now();
  for (const [key, timestamps] of hits) {
    const fresh = timestamps.filter((t) => now - t < WINDOW_MS);
    if (fresh.length === 0) hits.delete(key);
    else hits.set(key, fresh);
  }
}, WINDOW_MS);
sweep.unref?.();

/**
 * In-memory sliding-window rate limiter, keyed by caller-supplied string
 * (e.g. `${route}:${ip}`). Fine for the current single-process deployment —
 * same limitation as lib/submissions.ts applies here: state resets on
 * restart and isn't shared across serverless instances. Swap for a shared
 * store (Redis/KV) if this moves to a multi-instance deployment.
 */
export function isRateLimited(key: string, max = MAX_REQUESTS, windowMs = WINDOW_MS): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (timestamps.length >= max) {
    hits.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return false;
}
