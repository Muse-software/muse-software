import type {Locale} from '@/i18n/routing';
import {CONTACT_EMAIL} from './contact';
export const INQUIRY_DRAFT_KEY = 'muse-email-enquiry-v1';
export const intents = [
  ['build','A new website or product','موقع أو منتج جديد'],
  ['improve','Improve an existing product','تحسين مشروع قائم'],
  ['ai','AI or workflow automation','ذكاء اصطناعي أو أتمتة'],
  ['unsure','Let’s figure it out together','نحددها مع بعض'],
] as const;
export const timings = [
  ['unsure','Still figuring it out','لسه ما حددنا'],
  ['soon','As soon as it makes sense','في أقرب وقت مناسب'],
  ['1-3 months','In the next 1–3 months','خلال 1–3 أشهر'],
  ['later','Later this year','لاحقًا هذا العام'],
] as const;
export type InquiryDraft = {intent:string;description:string;timeline:string;firstName:string;email:string;company:string;phone:string;preferredContact:'write'|'call'};
export const blankDraft: InquiryDraft = {intent:'',description:'',timeline:'unsure',firstName:'',email:'',company:'',phone:'',preferredContact:'write'};
export const isIntent = (value: unknown): value is string => intents.some(i=>i[0]===value);
export function normalizePhone(value: string) {
  return value.replace(/[٠-٩۰-۹]/g,c=>String(c.charCodeAt(0)-(c<='٩'?0x660:0x6f0))).trim();
}
export function validateInquiry(draft: InquiryDraft, locale:Locale) {
  const ar=locale==='ar',errors:Record<string,string>={};
  if(!draft.firstName.trim())errors.firstName=ar?'اكتب اسمك.':'Please enter your name.';
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim()))errors.email=ar?'اكتب بريدًا صحيحًا، مثل name@company.com.':'Enter a valid email, for example name@company.com.';
  const phone=normalizePhone(draft.phone),digits=phone.replace(/\D/g,'');
  if(draft.preferredContact==='call'&&(!/^[+\d\s().-]+$/.test(phone)||digits.length<7||digits.length>15))errors.phone=ar?'اكتب رقم جوال نقدر نتصل عليه.':'Add a phone number we can call.';
  return errors;
}
export function prepareInquiryEmail(draft:InquiryDraft,locale:Locale) {
  const ar=locale==='ar',index=ar?2:1;
  const subject=`${ar?'استفسار عن مشروع':'Project enquiry'} — ${draft.firstName.trim().replace(/[\r\n]/g,' ')}`;
  const lines=[ar?'مرحبًا عبدالله،':'Hello Abdullah,','',ar?'أود التحدث معكم عن المشروع التالي:':'I’d like to talk with Muse about the following project:','',`${ar?'المشروع':'Project'}: ${intents.find(i=>i[0]===draft.intent)?.[index]||intents[3][index]}`,`${ar?'موعد البداية':'Timeframe'}: ${timings.find(i=>i[0]===draft.timeline)?.[index]||timings[0][index]}`,'',draft.description.trim()||(ar?'أرغب في مناقشة نقطة البداية المناسبة.':'I would like to discuss the right starting point.'),'',`${ar?'الاسم':'Name'}: ${draft.firstName.trim()}`,`${ar?'البريد الإلكتروني':'Email'}: ${draft.email.trim()}`];
  if(draft.company.trim())lines.push(`${ar?'الجهة':'Company'}: ${draft.company.trim()}`);
  lines.push(`${ar?'طريقة التواصل المفضلة':'Preferred reply'}: ${draft.preferredContact==='call'?(ar?'مكالمة':'Phone call'):(ar?'الإيميل':'Email')}`);
  if(draft.preferredContact==='call')lines.push(`${ar?'رقم الجوال':'Phone'}: ${normalizePhone(draft.phone)}`);
  const body=lines.join('\r\n');
  return {subject,body,href:`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`};
}
export function readInquiryDraft(raw:string):{draft:InquiryDraft;step:number}|null {
  try {
    const value=JSON.parse(raw);if(!value||typeof value!=='object'||!isIntent(value.intent))return null;
    const draft={...blankDraft};
    for(const key of Object.keys(draft) as (keyof InquiryDraft)[]){if(typeof value[key]==='string')Object.assign(draft,{[key]:value[key].slice(0,key==='description'?4000:200)});}
    draft.preferredContact=draft.preferredContact==='call'?'call':'write';
    if(!timings.some(t=>t[0]===draft.timeline))draft.timeline='unsure';
    return {draft,step:[1,2,3].includes(value.step)?value.step:2};
  } catch{return null;}
}
