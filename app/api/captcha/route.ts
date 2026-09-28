import {createCaptcha} from '@/lib/captcha';
import {RULES,rateLimit,tooManyRequests} from '@/lib/rate-limit';

/** Issues a fresh challenge. Never cached: every request must get its own code. */
export async function GET(request:Request) {
  const limited = rateLimit(RULES.captcha,request);
  if (!limited.ok) return tooManyRequests(limited);
  return Response.json(createCaptcha(),{headers:{'Cache-Control':'no-store'}});
}
