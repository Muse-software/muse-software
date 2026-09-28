/**
 * In-memory sliding-window rate limiting for the API routes.
 *
 * Two layers per endpoint:
 *  - per client IP, to stop one visitor or script hammering the form;
 *  - site-wide, a ceiling that still holds if an attacker rotates IPs or
 *    forges X-Forwarded-For, so the team inbox cannot be flooded.
 *
 * State lives in this process. A multi-instance deployment needs a shared
 * store (Redis or similar), as with burned captcha tokens.
 */
type Window = {limit:number;windowMs:number};
export type RateRule = {name:string;perIp:Window[];global:Window[]};

const MINUTE = 60_000,HOUR = 60*MINUTE,DAY = 24*HOUR;

export const RULES = {
  // Every POST counts, including captcha mistakes: room for a few typos, not for scripts.
  inquiry:{name:'inquiry',perIp:[{limit:8,windowMs:10*MINUTE},{limit:30,windowMs:DAY}],global:[{limit:100,windowMs:HOUR}]},
  // Page loads, "New code" clicks and automatic refreshes before expiry.
  captcha:{name:'captcha',perIp:[{limit:30,windowMs:10*MINUTE}],global:[{limit:3000,windowMs:HOUR}]},
} satisfies Record<string,RateRule>;

const hits = new Map<string,number[]>();
const MAX_KEYS = 50_000;
let lastSweep = 0;

// Drop expired history so memory stays bounded however many IPs appear.
function sweep(now:number) {
  if (now-lastSweep<MINUTE&&hits.size<MAX_KEYS) return;
  lastSweep = now;
  for (const [key,times] of hits) if (!times.length||now-times[times.length-1]>DAY) hits.delete(key);
  // Still over the cap (e.g. a spoofed-IP flood): forget the oldest keys. The global limit still applies.
  if (hits.size>=MAX_KEYS) for (const key of [...hits.keys()].slice(0,hits.size-MAX_KEYS/2)) hits.delete(key);
}

/** Seconds until `key` may act again under `windows`, or 0 if allowed now. */
function wait(key:string,windows:Window[],now:number) {
  const times = hits.get(key)||[];
  let retry = 0;
  for (const {limit,windowMs} of windows) {
    const recent = times.filter(t => now-t<windowMs);
    if (recent.length>=limit) retry = Math.max(retry,Math.ceil((recent[recent.length-limit]+windowMs-now)/1000));
  }
  return retry;
}
function record(key:string,windows:Window[],now:number) {
  // Keep only what these windows can still need: nothing older than the
  // longest window, and no more entries than the largest limit.
  const span = Math.max(...windows.map(w => w.windowMs)),keep = Math.max(...windows.map(w => w.limit));
  const times = (hits.get(key)||[]).filter(t => now-t<span);
  times.push(now);
  hits.set(key,times.length>keep?times.slice(-keep):times);
}

/**
 * Client IP from X-Forwarded-For. Each trusted proxy appends the address it
 * saw, so the real client is `TRUSTED_PROXY_HOPS` entries from the right
 * (default 1: one reverse proxy such as nginx or a load balancer). Next.js
 * only fills the header when it is absent, so without a proxy in front a
 * client can forge it; the global limit is the backstop for that case.
 */
export function clientIp(request:Request) {
  const hops = Math.max(1,Number(process.env.TRUSTED_PROXY_HOPS)||1);
  const chain = (request.headers.get('x-forwarded-for')||'').split(',').map(part => part.trim()).filter(Boolean);
  return chain[chain.length-hops]||chain[0]||request.headers.get('x-real-ip')||'unknown';
}

export type RateResult = {ok:true}|{ok:false;retryAfter:number;scope:'ip'|'global'};

/** Checks both layers and, only when allowed, records the hit. */
export function rateLimit(rule:RateRule,request:Request):RateResult {
  const now = Date.now();
  sweep(now);
  const ipKey = `${rule.name}:ip:${clientIp(request)}`,globalKey = `${rule.name}:global`;
  const ipWait = wait(ipKey,rule.perIp,now);
  if (ipWait) return {ok:false,retryAfter:ipWait,scope:'ip'};
  const globalWait = wait(globalKey,rule.global,now);
  if (globalWait) return {ok:false,retryAfter:globalWait,scope:'global'};
  record(ipKey,rule.perIp,now);
  record(globalKey,rule.global,now);
  return {ok:true};
}

export function tooManyRequests(result:Extract<RateResult,{ok:false}>) {
  return Response.json({error:'rate-limited',retryAfter:result.retryAfter},{status:429,headers:{'Retry-After':String(result.retryAfter),'Cache-Control':'no-store'}});
}
