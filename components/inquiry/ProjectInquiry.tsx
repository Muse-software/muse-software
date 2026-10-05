"use client";
import {useEffect,useRef,useState,type FormEvent} from 'react';
import {useLocale} from 'next-intl';
import {Link} from '@/i18n/navigation';
import Icon from '@/components/Icon';
import Captcha,{type CaptchaHandle} from '@/components/captcha/Captcha';
import {captchaAnswerError,captchaRejectedMessage} from '@/lib/captcha-shared';
import {CONTACT_EMAIL,contactHref,WHATSAPP_URL,WHATSAPP_NUMBER} from '@/lib/contact';
import {INQUIRY_DRAFT_KEY,LIMITS,blankDraft,intentDetails,intents,timings,isIntent,normalizePhone,prepareInquiryEmail,readInquiryDraft,validateInquiry,type InquiryDraft} from '@/lib/project-inquiry';
import './inquiry.css';

// Top-to-bottom order of the form, used to focus the first problem.
const FIELD_ORDER = ['intent','description','timeline','firstName','email','company','phone'] as const;

/**
 * Single-page adaptive enquiry form (approved content review, October 2026).
 * The project type drives the details label and helper; drafts are kept
 * silently in this tab and offered back on return.
 */
export default function ProjectInquiry({initialIntent}:{initialIntent?:string}) {
 const locale=useLocale()==='ar'?'ar':'en',ar=locale==='ar';
 const tr=(en:string,arabic:string)=>ar?arabic:en;
 const [draft,setDraft]=useState<InquiryDraft>({...blankDraft,intent:isIntent(initialIntent)?initialIntent:''});
 const [saved,setSaved]=useState<InquiryDraft|null>(null);
 const [loaded,setLoaded]=useState(false),[canSave,setCanSave]=useState(true);
 const [errors,setErrors]=useState<Record<string,string>>({});
 const [sending,setSending]=useState(false),[formError,setFormError]=useState<''|'failed'|'limited'>(''),[retryMinutes,setRetryMinutes]=useState(1);
 const [submitted,setSubmitted]=useState<{id:string;name:string}|null>(null);
 const edited=useRef(false),heading=useRef<HTMLHeadingElement>(null),form=useRef<HTMLFormElement>(null),captcha=useRef<CaptchaHandle>(null);
 const [detailsLabel,detailsHelp]=intentDetails[draft.intent||'unsure'][locale];
 // Browser-owned drafts must be read after hydration; SSR cannot access tab storage.
 useEffect(()=>{
  try{const raw=sessionStorage.getItem(INQUIRY_DRAFT_KEY);if(raw)setSaved(readInquiryDraft(raw));}catch{setCanSave(false);}
  setLoaded(true);
 },[]);
 useEffect(()=>{
  if(!loaded||saved||!canSave||!edited.current)return;
  try{sessionStorage.setItem(INQUIRY_DRAFT_KEY,JSON.stringify(draft));}catch{setCanSave(false);}
 },[draft,loaded,saved,canSave]);
 function update<K extends keyof InquiryDraft>(key:K,value:InquiryDraft[K]){edited.current=true;setDraft(d=>({...d,[key]:value}));setErrors(e=>({...e,[key]:''}));setFormError('');}
 // Check a field as soon as the visitor leaves it, but never nag about a field they haven't typed in yet.
 function check(key:keyof InquiryDraft){if(!draft[key].trim())return;setErrors(e=>({...e,[key]:validateInquiry(draft,locale)[key]||''}));}
 function restore(){if(saved){edited.current=true;setDraft(saved);setSaved(null);}}
 function discard(){try{sessionStorage.removeItem(INQUIRY_DRAFT_KEY);}catch{}edited.current=false;setSaved(null);}
 function focusFirst(invalid:Record<string,string>){
  const key=FIELD_ORDER.find(k=>invalid[k]);
  if(key==='intent')form.current?.querySelector<HTMLInputElement>('input[name="intent"]')?.focus();
  else if(key)form.current?.querySelector<HTMLElement>(`[name="${key}"]`)?.focus();
  else if(invalid.captcha)captcha.current?.focus();
 }
 async function submit(event:FormEvent){
  event.preventDefault();
  if(sending)return;
  const invalid:Record<string,string>=validateInquiry(draft,locale);
  const answer=captcha.current?.value()||{token:'',answer:''};
  const captchaError=captchaAnswerError(answer.answer,locale);
  if(captchaError)invalid.captcha=captchaError;
  setErrors(invalid);setFormError('');
  if(Object.keys(invalid).length){focusFirst(invalid);return;}
  setSending(true);
  try{
   const response=await fetch('/api/inquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({locale,inquiry:draft,captcha:answer})});
   const result=await response.json().catch(()=>({})) as {id?:string;error?:string;reason?:string;errors?:Record<string,string>;retryAfter?:number};
   if(response.status===201&&result.id){
    try{sessionStorage.removeItem(INQUIRY_DRAFT_KEY);}catch{}
    edited.current=false;
    setSubmitted({id:result.id,name:draft.firstName.trim()});
    setDraft({...blankDraft});setErrors({});
    requestAnimationFrame(()=>{heading.current?.focus({preventScroll:true});heading.current?.scrollIntoView({block:'start',behavior:'instant'});});
    return;
   }
   // Rate limiting happens before the captcha is checked, so the typed code is still valid: keep it.
   if(response.status===429){setRetryMinutes(Math.max(1,Math.ceil((result.retryAfter||Number(response.headers.get('Retry-After'))||60)/60)));setFormError('limited');return;}
   if(result.error==='captcha'){captcha.current?.reset();setErrors({captcha:captchaRejectedMessage(result.reason,locale)});captcha.current?.focus();return;}
   // Any captcha the server saw is now spent, so every other failure needs a fresh one too.
   captcha.current?.reset();
   if(result.error==='validation'&&result.errors){setErrors(result.errors);focusFirst(result.errors);return;}
   setFormError('failed');
  }catch{captcha.current?.reset();setFormError('failed');}
  finally{setSending(false);}
 }
 function startOver(){setSubmitted(null);setDraft({...blankDraft});requestAnimationFrame(()=>heading.current?.focus());}
 const fallback=prepareInquiryEmail(draft,locale);
 const fieldError=(key:string)=>errors[key]&&<p className="field-error" role="alert" id={`${key}-error`}>{errors[key]}</p>;
 const optional=<span>{tr('(optional)','(اختياري)')}</span>;
 return <div className="dir-inquiry"><div className="inquiry-layout shell" data-ready={loaded} data-state={submitted?'sent':'form'}>
  <aside className="inquiry-aside"><h1>{tr('What would you like\nto build or improve?','وش حاب تبني\nأو تطور؟')}</h1><p>{tr('Choose what’s closest to your project, and share the details that help us understand it.','اختر الأقرب لمشروعك، وشاركنا التفاصيل اللي تساعدنا نفهمه.')}</p>
   <div className="inquiry-expect"><p>{tr('What happens next','وش يصير بعدها؟')}</p><ol><li>{tr('We review what you need.','نراجع احتياجك.')}</li><li>{tr('We get in touch to understand the details.','نتواصل معك لفهم التفاصيل.')}</li><li>{tr('We agree on the right next step for your project.','نحدد الخطوة المناسبة للمشروع.')}</li></ol></div>
   <a href={contactHref(locale)} className="text-link"><span dir="ltr">{CONTACT_EMAIL}</span><Icon/></a>
   <a href={WHATSAPP_URL} className="text-link">{tr('WhatsApp','واتساب')} <bdi dir="ltr">{WHATSAPP_NUMBER}</bdi><Icon/></a>
  </aside>
  <div className="inquiry-panel">
   {saved&&!submitted&&<div className="draft-notice" role="status"><p>{tr('You have an unfinished enquiry in this tab.','عندك طلب ما كملته في هذا التبويب.')}</p><div><button type="button" onClick={restore}>{tr('Restore it','استعادته')}</button><button type="button" onClick={discard}>{tr('Start fresh','ابدأ من جديد')}</button></div></div>}
   {!loaded&&<p role="status">{tr('Preparing the form…','نجهّز النموذج…')}</p>}
   <div className="inquiry-content" inert={(!!saved&&!submitted)||!loaded}>
    {submitted?<div className="inquiry-handoff">
     <h2 ref={heading} tabIndex={-1}>{tr('Thanks, we’ve got it.','وصلتنا، شكرًا لك.')}</h2>
     <p role="status">{tr(`Thanks, ${submitted.name}. Your enquiry reached our team, and we’ll be in touch soon.`,`شكرًا ${submitted.name}. وصل طلبك لفريقنا، وبنتواصل معك قريبًا.`)}</p>
     <p className="field-help">{tr('Reference','رقم المرجع')}: <bdi dir="ltr" className="inquiry-reference">{submitted.id.slice(0,8).toUpperCase()}</bdi></p>
     <div className="inquiry-copy-actions"><Link className="studio-button secondary" href="/">{tr('Back to home','العودة للرئيسية')}</Link><button type="button" className="text-link" onClick={startOver}>{tr('Send another enquiry','أرسل طلبًا آخر')}</button></div>
    </div>:<form ref={form} onSubmit={submit} noValidate className="inquiry-fields inquiry-single" aria-busy={sending} aria-labelledby="inquiry-form-title">
     <h2 ref={heading} tabIndex={-1} id="inquiry-form-title" className="sr-only">{tr('Project enquiry','طلب مشروع')}</h2>
     <fieldset className="intent-options" aria-describedby={errors.intent?'intent-error':undefined}><legend className="inquiry-question">{tr('What kind of project is it?','وش نوع المشروع؟')}</legend>
      {intents.map(([value,en,arabic])=><label key={value} data-selected={draft.intent===value}><input type="radio" name="intent" value={value} checked={draft.intent===value} onChange={()=>update('intent',value)}/><span>{ar?arabic:en}</span><span className="inquiry-radio-mark" aria-hidden="true"/></label>)}
     </fieldset>
     {fieldError('intent')}
     <label htmlFor="description" className="inquiry-question">{detailsLabel}</label><p className="field-help" id="description-help">{detailsHelp}</p>
     <textarea id="description" name="description" dir="auto" value={draft.description} onChange={e=>update('description',e.target.value)} maxLength={LIMITS.description} rows={7} aria-invalid={!!errors.description} aria-describedby={`description-help description-limit${errors.description?' description-error':''}`}/>
     <p className="field-help inquiry-count" id="description-limit">{draft.description.length} / {LIMITS.description}</p>
     {fieldError('description')}
     <label htmlFor="timeline" className="inquiry-question">{tr('When do you expect to start?','متى تتوقع تبدأ؟')}</label><select id="timeline" name="timeline" value={draft.timeline} onChange={e=>update('timeline',e.target.value)} aria-invalid={!!errors.timeline} aria-describedby={errors.timeline?'timeline-error':undefined}>{timings.map(([value,en,arabic])=><option key={value} value={value}>{ar?arabic:en}</option>)}</select>
     {fieldError('timeline')}
     <h3 className="inquiry-section-title">{tr('Contact details','بيانات التواصل')}</h3>
     <div className="field-pair">{(['firstName','email'] as const).map(key=><div key={key}><label htmlFor={key}>{key==='firstName'?tr('Name','الاسم'):tr('Email address','البريد الإلكتروني')} <span aria-hidden="true">*</span></label><input id={key} name={key} type={key==='email'?'email':'text'} dir={key==='email'?'ltr':'auto'} autoComplete={key==='email'?'email':'name'} required maxLength={key==='email'?LIMITS.email:LIMITS.name} value={draft[key]} onChange={e=>update(key,e.target.value)} onBlur={()=>check(key)} aria-invalid={!!errors[key]} aria-describedby={errors[key]?`${key}-error`:undefined}/>{fieldError(key)}</div>)}</div>
     <div className="field-pair">
      <div><label htmlFor="company">{tr('Company','اسم الجهة')} {optional}</label><input id="company" name="company" autoComplete="organization" dir="auto" maxLength={LIMITS.company} value={draft.company} onChange={e=>update('company',e.target.value)} onBlur={()=>check('company')} aria-invalid={!!errors.company} aria-describedby={errors.company?'company-error':undefined}/>{fieldError('company')}</div>
      <div><label htmlFor="phone">{tr('Mobile number','رقم الجوال')} {optional}</label><input id="phone" name="phone" type="tel" autoComplete="tel" dir="ltr" maxLength={LIMITS.phone} value={draft.phone} onChange={e=>update('phone',normalizePhone(e.target.value))} onBlur={()=>check('phone')} aria-invalid={!!errors.phone} aria-describedby={errors.phone?'phone-error':undefined}/>{fieldError('phone')}</div>
     </div>
     <div className="inquiry-captcha"><Captcha ref={captcha} id="captcha" error={errors.captcha} onAnswer={()=>{if(errors.captcha)setErrors(e=>({...e,captcha:''}));}}/></div>
     <p className="form-privacy">{tr('Your answers go straight to the Muse team by email. We only use them to respond to this enquiry.','توصل إجاباتك مباشرة إلى فريق ميوز بالإيميل، ونستخدمها فقط للرد على طلبك.')} <Link href="/privacy">{tr('Privacy','الخصوصية')}</Link></p>
     {formError&&<div className="field-error inquiry-form-error" role="alert">{formError==='limited'
      ?<p>{tr(`Too many attempts from your connection. Please wait about ${retryMinutes} minute${retryMinutes===1?'':'s'} and try again, or email us instead:`,`محاولات كثيرة من اتصالك. انتظر تقريبًا ${retryMinutes} ${retryMinutes<=10&&retryMinutes>2?'دقائق':'دقيقة'} وحاول مرة ثانية، أو راسلنا بالإيميل:`)} <a href={fallback.href} dir="ltr">{CONTACT_EMAIL}</a></p>
      :<p>{tr('We couldn’t send your enquiry. Please try again, or email it to us instead:','ما قدرنا نرسل طلبك. حاول مرة ثانية، أو أرسله لنا بالإيميل:')} <a href={fallback.href} dir="ltr">{CONTACT_EMAIL}</a></p>}</div>}
     <div className="form-actions"><button className="studio-button" type="submit" disabled={sending}>{sending?tr('Sending…','جارٍ الإرسال…'):tr('Send details','أرسل التفاصيل')}<Icon/></button></div>
    </form>}
   </div>
  </div>
 </div></div>;
}
