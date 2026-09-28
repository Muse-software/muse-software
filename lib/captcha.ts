import {createHmac,randomBytes,randomInt,timingSafeEqual} from 'node:crypto';
import {CAPTCHA_ALPHABET,CAPTCHA_LENGTH,CAPTCHA_PATTERN} from './captcha-shared';

/**
 * Stateless, server-verified captcha.
 *
 * The code is six case-sensitive hexadecimal characters (0-9, a-f, A-F). The
 * server never stores it. The token is `payload.payloadMac.answerMac`: the
 * first MAC proves the server issued the payload (so forged tokens are
 * rejected before any state is touched), the second is an HMAC of
 * `payload + code`, so only someone who read the image can match it. Each token is single use; any verification attempt (right or wrong)
 * burns it, which rules out brute-forcing one image.
 *
 * The image is SVG built from stroked paths rather than <text>, so the code is
 * not sitting in the markup for a scraper to read.
 */
const TTL_MS = 10*60*1000;

function secret() {
  const value = process.env.CAPTCHA_SECRET;
  if (!value || value.length < 32) throw new Error('CAPTCHA_SECRET must be set to at least 32 characters.');
  return value;
}
const mac = (data:string) => createHmac('sha256',secret()).update(data).digest('base64url');
const sign = (payload:string,code:string) => mac(`${payload}.${code}`);
function same(a:string,b:string) {
  const x = Buffer.from(a),y = Buffer.from(b);
  return x.length===y.length&&timingSafeEqual(x,y);
}

// Burned token ids, kept until they would have expired anyway. Per process: on
// a multi-instance deployment this needs a shared store (Redis, database).
const used = new Map<string,number>();
function burn(id:string,exp:number) {
  const now = Date.now();
  for (const [key,expiry] of used) if (expiry < now) used.delete(key);
  used.set(id,exp);
}

export function createCaptcha() {
  let code = '';
  for (let i=0;i<CAPTCHA_LENGTH;i++) code += CAPTCHA_ALPHABET[randomInt(CAPTCHA_ALPHABET.length)];
  const expiresAt = Date.now()+TTL_MS;
  const payload = Buffer.from(JSON.stringify({id:randomBytes(12).toString('base64url'),exp:expiresAt})).toString('base64url');
  return {token:`${payload}.${mac(`issued.${payload}`)}.${sign(payload,code)}`,image:`data:image/svg+xml;base64,${Buffer.from(renderCaptcha(code)).toString('base64')}`,expiresAt};
}

export type CaptchaResult = {ok:true}|{ok:false;reason:'missing'|'malformed'|'expired'|'used'|'mismatch'};

export function verifyCaptcha(token:unknown,answer:unknown):CaptchaResult {
  if (typeof token!=='string'||typeof answer!=='string'||!token||!answer) return {ok:false,reason:'missing'};
  const [payload,issued,signature,extra] = token.split('.');
  if (!payload||!issued||!signature||extra!==undefined||!same(mac(`issued.${payload}`),issued)) return {ok:false,reason:'malformed'};
  let claims:{id?:unknown;exp?:unknown};
  try { claims = JSON.parse(Buffer.from(payload,'base64url').toString('utf8')); } catch { return {ok:false,reason:'malformed'}; }
  if (typeof claims.id!=='string'||typeof claims.exp!=='number') return {ok:false,reason:'malformed'};
  if (claims.exp < Date.now()) return {ok:false,reason:'expired'};
  if (used.has(claims.id)) return {ok:false,reason:'used'};
  burn(claims.id,claims.exp);
  if (!CAPTCHA_PATTERN.test(answer)) return {ok:false,reason:'mismatch'};
  return same(sign(payload,answer),signature) ? {ok:true} : {ok:false,reason:'mismatch'};
}

/*
 * Stroke glyphs on a 10-wide grid. Capitals and digits run from y=4 to the
 * baseline at y=20; lowercase a/c/e sit on the x-height (y=10), b/d/f keep
 * ascenders. The height difference is what makes the case readable.
 */
type Stroke = [number,number][];
const GLYPHS:Record<string,Stroke[]> = {
  '0':[[[2,4],[8,4],[10,7],[10,17],[8,20],[2,20],[0,17],[0,7],[2,4]],[[2,17],[8,7]]],
  '1':[[[3,7],[6,4],[6,20]],[[3,20],[9,20]]],
  '2':[[[0,7],[2,4],[8,4],[10,7],[10,10],[0,20],[10,20]]],
  '3':[[[0,4],[10,4],[5,11],[8,11],[10,14],[10,17],[8,20],[2,20],[0,18]]],
  '4':[[[7,20],[7,4],[0,15],[10,15]]],
  '5':[[[10,4],[1,4],[0,11],[7,11],[10,14],[10,17],[8,20],[0,20]]],
  '6':[[[9,4],[4,4],[0,10],[0,17],[2,20],[8,20],[10,17],[10,14],[8,11],[0,11]]],
  '7':[[[0,4],[10,4],[4,20]]],
  '8':[[[5,12],[1,10],[1,6],[3,4],[7,4],[9,6],[9,10],[5,12],[0,15],[0,18],[2,20],[8,20],[10,18],[10,15],[5,12]]],
  '9':[[[10,11],[2,11],[0,9],[0,6],[2,4],[8,4],[10,6],[10,14],[6,20],[1,20]]],
  A:[[[0,20],[5,4],[10,20]],[[2,14],[8,14]]],
  B:[[[0,4],[0,20],[7,20],[10,17],[10,15],[7,12],[0,12]],[[0,4],[7,4],[9,6],[9,9],[7,12]]],
  C:[[[10,6],[8,4],[3,4],[0,8],[0,16],[3,20],[8,20],[10,18]]],
  D:[[[0,4],[0,20],[6,20],[10,16],[10,8],[6,4],[0,4]]],
  E:[[[10,4],[0,4],[0,20],[10,20]],[[0,12],[7,12]]],
  F:[[[10,4],[0,4],[0,20]],[[0,12],[7,12]]],
  a:[[[1,11],[3,10],[7,10],[8,12],[8,20]],[[8,15],[3,14],[1,16],[1,18],[3,20],[6,20],[8,18]]],
  b:[[[0,4],[0,20]],[[0,13],[3,10],[6,10],[8,12],[8,18],[6,20],[3,20],[0,17]]],
  c:[[[8,11],[6,10],[3,10],[1,12],[1,18],[3,20],[6,20],[8,19]]],
  d:[[[8,4],[8,20]],[[8,13],[5,10],[2,10],[0,12],[0,18],[2,20],[5,20],[8,17]]],
  e:[[[1,15],[8,15],[8,12],[6,10],[3,10],[1,12],[1,18],[3,20],[7,20]]],
  f:[[[8,5],[6,4],[4,5],[3,7],[3,20]],[[0,10],[7,10]]],
};
const WIDTH = 240,HEIGHT = 72,SCALE = 2.3;
const INK = ['#f4f1ec','#ffb59c','#e7dfd7','#fd8a5e'];
const rand = (min:number,max:number) => min+Math.random()*(max-min);
const n = (value:number) => value.toFixed(1);

export function renderCaptcha(code:string) {
  const parts:string[] = [];
  for (let i=0;i<7;i++) parts.push(`<path d="M${n(rand(0,20))} ${n(rand(8,64))} C${n(rand(40,100))} ${n(rand(0,72))} ${n(rand(140,200))} ${n(rand(0,72))} ${n(rand(220,240))} ${n(rand(8,64))}" stroke="${INK[i%INK.length]}" stroke-opacity="${n(rand(.18,.35))}" stroke-width="${n(rand(1,2))}" fill="none"/>`);
  for (let i=0;i<40;i++) parts.push(`<circle cx="${n(rand(0,WIDTH))}" cy="${n(rand(0,HEIGHT))}" r="${n(rand(.6,1.6))}" fill="${INK[i%INK.length]}" fill-opacity="${n(rand(.2,.5))}"/>`);
  [...code].forEach((char,index) => {
    const x = 14+index*36+rand(-3,3),y = 8+rand(-4,4),angle = rand(-16,16);
    // Nudge every point so no two renders share path data a scraper could match.
    const d = GLYPHS[char].map(stroke => stroke.map(([px,py],k) => `${k?'L':'M'}${n(px+rand(-.35,.35))} ${n(py+rand(-.35,.35))}`).join(' ')).join(' ');
    parts.push(`<path transform="translate(${n(x)} ${n(y)}) rotate(${n(angle)} 12 30) scale(${SCALE})" d="${d}" stroke="${INK[randomInt(INK.length)]}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`);
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}"><rect width="100%" height="100%" fill="#18181b"/>${parts.join('')}</svg>`;
}
