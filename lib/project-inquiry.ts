import type {Locale} from '@/i18n/routing';
import {CONTACT_EMAIL} from './contact';

// v2: the single-page form has no contact-preference field and new timeline
// values, so drafts saved by the old three-step form are not restored.
export const INQUIRY_DRAFT_KEY = 'muse-enquiry-v2';

/** Project types (approved content review): value, English, Arabic. */
export const intents = [
  ['build','A new product','منتج جديد'],
  ['improve','Improve an existing product','تطوير منتج قائم'],
  ['ai','AI and automation','الذكاء الاصطناعي والأتمتة'],
  ['gamification','Gamification','التلعيب'],
  ['unsure','Help us find the direction','محتاج نحدد الاتجاه'],
] as const;

/** The details field adapts to the selected project type: [label, helper]. */
export const intentDetails: Record<string,{en:[string,string];ar:[string,string]}> = {
  build:{en:['What’s the idea?','Share the problem you’re solving or the product you have in mind.'],ar:['وش الفكرة؟','شاركنا المشكلة اللي تحاول تحلها أو المنتج اللي تفكر فيه.']},
  improve:{en:['What would you like to improve?','For example the user experience, design, performance, or a new feature.'],ar:['وش حاب تطور؟','مثل تجربة الاستخدام، التصميم، الأداء، أو إضافة ميزة جديدة.']},
  ai:{en:['Which process would you like to improve?','Share the repetitive work or the challenge you expect technology to help with.'],ar:['وش العملية اللي حاب تطورها؟','شاركنا العمل المتكرر أو التحدي اللي تتوقع التقنية تساعد فيه.']},
  gamification:{en:['Which engagement would you like to improve?','For example engagement, retention, progress, or motivation.'],ar:['وش التفاعل اللي حاب تحسّنه؟','مثل زيادة التفاعل، الاستمرار، التقدم، أو التحفيز.']},
  unsure:{en:['What are you trying to solve or improve?','Share the problem or the opportunity, and we’ll help you find the right direction.'],ar:['وش اللي تحاول تحله أو تحسّنه؟','شاركنا المشكلة أو الفرصة، ونساعدك نحدد الاتجاه المناسب.']},
};

export const timings = [
  ['soon','As soon as possible','في أقرب وقت'],
  ['1-3 months','Within 1–3 months','خلال 1–3 أشهر'],
  ['3-6 months','Within 3–6 months','خلال 3–6 أشهر'],
  ['unsure','Not decided yet','ما تحدد بعد'],
] as const;

export type InquiryDraft = {intent:string;description:string;timeline:string;firstName:string;email:string;company:string;phone:string};
export const blankDraft: InquiryDraft = {intent:'',description:'',timeline:'unsure',firstName:'',email:'',company:'',phone:''};
export const isIntent = (value: unknown): value is string => intents.some(i=>i[0]===value);
export function normalizePhone(value: string) {
  return value.replace(/[٠-٩۰-۹]/g,c=>String(c.charCodeAt(0)-(c<='٩'?0x660:0x6f0))).trim();
}
export const LIMITS = {name:100,email:254,company:200,description:4000,phone:50} as const;
const EMAIL = /^[^\s@"<>(),;:]{1,64}@(?=.{1,253}$)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)*\.[a-z]{2,}$/i;
// Control characters are never legitimate in these single-line fields.
const CONTROL = /[\u0000-\u001f\u007f]/;

/** Every rule the form enforces. The browser and the API run the same function. */
export function validateInquiry(draft: InquiryDraft, locale:Locale) {
  const ar=locale==='ar',errors:Record<string,string>={};
  if(!isIntent(draft.intent))errors.intent=ar?'اختر نوع المشروع، أو «محتاج نحدد الاتجاه».':'Choose a project type. “Help us find the direction” is fine too.';
  if(draft.description.length>LIMITS.description)errors.description=ar?`التفاصيل طويلة، الحد ${LIMITS.description} حرف.`:`Keep the details under ${LIMITS.description} characters.`;
  if(!timings.some(t=>t[0]===draft.timeline))errors.timeline=ar?'اختر موعد البداية.':'Choose when you expect to start.';
  const name=draft.firstName.trim();
  if(!name)errors.firstName=ar?'اكتب اسمك.':'Please enter your name.';
  else if(name.length<2||name.length>LIMITS.name||CONTROL.test(name)||!/\p{L}/u.test(name))errors.firstName=ar?`اكتب اسمًا حقيقيًا من حرفين إلى ${LIMITS.name} حرف.`:`Enter your name (2–${LIMITS.name} characters, including letters).`;
  const email=draft.email.trim();
  if(!email)errors.email=ar?'اكتب بريدك الإلكتروني.':'Please enter your email address.';
  else if(email.length>LIMITS.email||email.includes('..')||!EMAIL.test(email))errors.email=ar?'اكتب بريدًا صحيحًا، مثل name@company.com.':'Enter a valid email, for example name@company.com.';
  if(draft.company.length>LIMITS.company||CONTROL.test(draft.company))errors.company=ar?`اسم الجهة طويل، الحد ${LIMITS.company} حرف.`:`Keep the company name under ${LIMITS.company} characters.`;
  // Optional: only checked when something was entered.
  const phone=normalizePhone(draft.phone),digits=phone.replace(/\D/g,'');
  if(phone&&(!/^\+?[\d\s().-]+$/.test(phone)||digits.length<7||digits.length>15))errors.phone=ar?'اكتب رقم جوال صحيح (7–15 رقم).':'Enter a valid mobile number (7–15 digits).';
  return errors;
}

/** Server-side: accept only the known string fields; unknown keys are ignored, wrong types rejected. */
export function parseInquiry(input:unknown):InquiryDraft|null {
  if(!input||typeof input!=='object')return null;
  const value=input as Record<string,unknown>,draft={...blankDraft};
  for(const key of Object.keys(draft) as (keyof InquiryDraft)[]){
    if(value[key]===undefined)continue;
    if(typeof value[key]!=='string'||(value[key] as string).length>LIMITS.description)return null;
    Object.assign(draft,{[key]:value[key]});
  }
  return draft;
}

/** The organised shape stored and emailed for one enquiry. */
export function inquiryRecord(draft:InquiryDraft) {
  const intent=intents.find(i=>i[0]===draft.intent)!,timing=timings.find(t=>t[0]===draft.timeline)!,phone=normalizePhone(draft.phone);
  return {
    project:{
      intent:{value:intent[0],label:intent[1]},
      timeline:{value:timing[0],label:timing[1]},
      description:draft.description.trim()||null,
    },
    contact:{
      name:draft.firstName.trim(),
      email:draft.email.trim().toLowerCase(),
      company:draft.company.trim()||null,
      phone:phone||null,
    },
  };
}

/** Fallback when sending fails: the same answers as a prepared email. */
export function prepareInquiryEmail(draft:InquiryDraft,locale:Locale) {
  const ar=locale==='ar',index=ar?2:1;
  const subject=`${ar?'استفسار عن مشروع':'Project enquiry'} — ${draft.firstName.trim().replace(/[\r\n]/g,' ')}`;
  const lines=[ar?'مرحبًا،':'Hello,','',ar?'أود التحدث معكم عن المشروع التالي:':'I’d like to talk with Muse about the following project:','',`${ar?'نوع المشروع':'Project type'}: ${intents.find(i=>i[0]===draft.intent)?.[index]||intents[4][index]}`,`${ar?'موعد البداية':'Timeframe'}: ${timings.find(i=>i[0]===draft.timeline)?.[index]||timings[3][index]}`,'',draft.description.trim()||(ar?'أرغب في مناقشة نقطة البداية المناسبة.':'I would like to discuss the right starting point.'),'',`${ar?'الاسم':'Name'}: ${draft.firstName.trim()}`,`${ar?'البريد الإلكتروني':'Email'}: ${draft.email.trim()}`];
  if(draft.company.trim())lines.push(`${ar?'الجهة':'Company'}: ${draft.company.trim()}`);
  if(normalizePhone(draft.phone))lines.push(`${ar?'رقم الجوال':'Mobile'}: ${normalizePhone(draft.phone)}`);
  const body=lines.join('\r\n');
  return {subject,body,href:`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`};
}

export function readInquiryDraft(raw:string):InquiryDraft|null {
  try {
    const value=JSON.parse(raw);if(!value||typeof value!=='object')return null;
    const draft={...blankDraft};
    for(const key of Object.keys(draft) as (keyof InquiryDraft)[]){if(typeof value[key]==='string')Object.assign(draft,{[key]:value[key].slice(0,key==='description'?LIMITS.description:200)});}
    if(!isIntent(draft.intent))draft.intent='';
    if(!timings.some(t=>t[0]===draft.timeline))draft.timeline='unsure';
    // Nothing worth restoring.
    if(!draft.intent&&!draft.description.trim()&&!draft.firstName.trim()&&!draft.email.trim())return null;
    return draft;
  } catch{return null;}
}
