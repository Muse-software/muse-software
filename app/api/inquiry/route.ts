import {after} from 'next/server';
import {verifyCaptcha} from '@/lib/captcha';
import {deliverInquiry,notifyInquiry} from '@/lib/inquiry-notification';
import {inquiryRecord,parseInquiry,validateInquiry} from '@/lib/project-inquiry';
import {RULES,rateLimit,tooManyRequests} from '@/lib/rate-limit';
import {createRecord,requestMeta,saveSubmission,storageMode} from '@/lib/submissions';

const MAX_BODY_BYTES = 32*1024;
const noStore = {'Cache-Control':'no-store'};

/**
 * Project enquiry submission. Order matters: fields are validated first (so a
 * typo does not cost the visitor their captcha), then the single-use captcha
 * is verified, and only then is the enquiry stored or emailed.
 */
export async function POST(request:Request) {
  // Checked first, before any parsing: every attempt counts, including wrong captchas.
  const limited = rateLimit(RULES.inquiry,request);
  if (!limited.ok) return tooManyRequests(limited);
  if (!request.headers.get('content-type')?.includes('application/json')) return Response.json({error:'unsupported'},{status:415,headers:noStore});
  const raw = await request.text();
  if (Buffer.byteLength(raw) > MAX_BODY_BYTES) return Response.json({error:'too-large'},{status:413,headers:noStore});

  let body:{locale?:unknown;inquiry?:unknown;captcha?:{token?:unknown;answer?:unknown}};
  try { body = JSON.parse(raw); } catch { return Response.json({error:'invalid'},{status:400,headers:noStore}); }
  const locale = body.locale==='ar'?'ar':'en';
  const draft = parseInquiry(body.inquiry);
  if (!draft) return Response.json({error:'invalid'},{status:400,headers:noStore});

  const errors = validateInquiry(draft,locale);
  if (Object.keys(errors).length) return Response.json({error:'validation',errors},{status:422,headers:noStore});

  const captcha = verifyCaptcha(body.captcha?.token,body.captcha?.answer);
  if (!captcha.ok) return Response.json({error:'captcha',reason:captcha.reason},{status:400,headers:noStore});

  const record = createRecord('project-inquiry',locale,inquiryRecord(draft),requestMeta(request));

  // Email only (Vercel): the email is the only copy, so send it before replying
  // and let a failure reach the visitor, whose form offers an email fallback.
  if (storageMode()==='none') {
    const delivery = await deliverInquiry(record);
    return delivery.ok
      ?Response.json({id:record.id},{status:201,headers:noStore})
      :Response.json({error:'delivery'},{status:502,headers:noStore});
  }

  // Stored: the file is the source of truth, and the email goes out after the
  // response so a slow or failing mail server never affects the visitor.
  try {
    const key = await saveSubmission(record);
    after(() => notifyInquiry(key));
    return Response.json({id:record.id},{status:201,headers:noStore});
  } catch (error) {
    console.error('[inquiry] could not store submission',error);
    return Response.json({error:'storage'},{status:500,headers:noStore});
  }
}
