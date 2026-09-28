"use client";
import {useEffect,useRef,useState,type FormEvent} from 'react';
import {useLocale} from 'next-intl';
import {Link} from '@/i18n/navigation';
import Icon from '@/components/Icon';
import Captcha,{type CaptchaHandle} from '@/components/captcha/Captcha';
import {captchaAnswerError,captchaRejectedMessage} from '@/lib/captcha-shared';
import {CONTACT_EMAIL,contactHref,WHATSAPP_URL,WHATSAPP_NUMBER} from '@/lib/contact';
import {INQUIRY_DRAFT_KEY,LIMITS,blankDraft,intents,timings,isIntent,normalizePhone,prepareInquiryEmail,readInquiryDraft,validateInquiry,type InquiryDraft} from '@/lib/project-inquiry';
import './inquiry.css';

const STEP3_FIELDS = ['firstName','email','company','phone'] as const;

export default function ProjectInquiry({initialIntent}:{initialIntent?:string}) {
 const locale=useLocale()==='ar'?'ar':'en',ar=locale==='ar';
 const tr=(en:string,arabic:string)=>ar?arabic:en;
 const [draft,setDraft]=useState<InquiryDraft>({...blankDraft,intent:isIntent(initialIntent)?initialIntent:''});
 const [step,setStep]=useState(initialIntent&&isIntent(initialIntent)?2:1);
 const [saved,setSaved]=useState<ReturnType<typeof readInquiryDraft>>(null);
 const [loaded,setLoaded]=useState(false),[canSave,setCanSave]=useState(true);
 const [errors,setErrors]=useState<Record<string,string>>({});
 const [expanded,setExpanded]=useState(false);
 const [sending,setSending]=useState(false),[formError,setFormError]=useState<''|'failed'|'answers'|'limited'>(''),[retryMinutes,setRetryMinutes]=useState(1);
 const [submitted,setSubmitted]=useState<{id:string;name:string;call:boolean}|null>(null);
 const edited=useRef(false),moved=useRef(false),heading=useRef<HTMLHeadingElement>(null),form=useRef<HTMLFormElement>(null),captcha=useRef<CaptchaHandle>(null);
 const intentLabel=intents.find(i=>i[0]===draft.intent)?.[ar?2:1]||'';
 // Browser-owned drafts must be read after hydration; SSR cannot access tab storage.
 useEffect(()=>{
  try{const raw=sessionStorage.getItem(INQUIRY_DRAFT_KEY);if(raw)setSaved(readInquiryDraft(raw));}catch{setCanSave(false);}
  setLoaded(true);
 },[]);
 useEffect(()=>{
  if(!loaded||saved||!canSave||!edited.current)return;
  try{sessionStorage.setItem(INQUIRY_DRAFT_KEY,JSON.stringify({...draft,step:Math.min(step,3)}));}catch{setCanSave(false);}
 },[draft,step,loaded,saved,canSave]);
 useEffect(()=>{
  if(moved.current){heading.current?.focus({preventScroll:true});heading.current?.scrollIntoView({block:'start',behavior:'instant'});}
 },[step]);
 useEffect(()=>{
  const pop=()=>{const next=Number(location.hash.replace('#step-',''));setStep(next>=1&&next<=3?next:initialIntent?2:1);setErrors({});setFormError('');moved.current=true;};
  addEventListener('popstate',pop);return()=>removeEventListener('popstate',pop);
 },[initialIntent]);
 function update<K extends keyof InquiryDraft>(key:K,value:InquiryDraft[K]){edited.current=true;setDraft(d=>({...d,[key]:value}));setErrors(e=>({...e,[key]:''}));setFormError('');}
 // Check a field as soon as the visitor leaves it, but never nag about a field they haven't typed in yet.
 function check(key:keyof InquiryDraft){if(!draft[key].trim())return;setErrors(e=>({...e,[key]:validateInquiry(draft,locale)[key]||''}));}
 function go(next:number){if(next===step)requestAnimationFrame(()=>heading.current?.focus());moved.current=true;setErrors({});setFormError('');setStep(next);history.pushState(null,'',`#step-${Math.min(next,3)}`);}
 function next(){
  const invalid=validateInquiry(draft,locale);
  if(step===1&&invalid.intent){setErrors({intent:invalid.intent});return;}
  if(step===2&&(invalid.description||invalid.timeline)){setErrors({description:invalid.description||'',timeline:invalid.timeline||''});return;}
  go(step+1);
 }
 function restore(){if(saved){edited.current=true;setDraft(saved.draft);const target=saved.step;setSaved(null);go(target);}}
 function discard(){try{sessionStorage.removeItem(INQUIRY_DRAFT_KEY);}catch{}edited.current=false;setSaved(null);heading.current?.focus();}
 function focusFirst(invalid:Record<string,string>){
  const key=STEP3_FIELDS.find(k=>invalid[k]);
  if(key)form.current?.querySelector<HTMLInputElement>(`[name="${key}"]`)?.focus();else if(invalid.captcha)captcha.current?.focus();
 }
 async function submit(event:FormEvent){
  event.preventDefault();
  if(sending)return;
  const invalid:Record<string,string>=validateInquiry(draft,locale);
  const answer=captcha.current?.value()||{token:'',answer:''};
  const captchaError=captchaAnswerError(answer.answer,locale);
  if(captchaError)invalid.captcha=captchaError;
  setErrors(invalid);setFormError('');
  if(Object.keys(invalid).length){
   // Answers from earlier steps can only be wrong if edited elsewhere (e.g. a restored draft).
   if(!STEP3_FIELDS.some(k=>invalid[k])&&!invalid.captcha){setFormError('answers');return;}
   focusFirst(invalid);return;
  }
  setSending(true);
  try{
   const response=await fetch('/api/inquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({locale,inquiry:draft,captcha:answer})});
   const result=await response.json().catch(()=>({})) as {id?:string;error?:string;reason?:string;errors?:Record<string,string>;retryAfter?:number};
   if(response.status===201&&result.id){
    try{sessionStorage.removeItem(INQUIRY_DRAFT_KEY);}catch{}
    edited.current=false;
    setSubmitted({id:result.id,name:draft.firstName.trim(),call:draft.preferredContact==='call'});
    setDraft({...blankDraft});
    moved.current=true;setErrors({});setStep(4);
    history.replaceState(null,'',location.pathname+location.search);
    return;
   }
   // Rate limiting happens before the captcha is checked, so the typed code is still valid: keep it.
   if(response.status===429){setRetryMinutes(Math.max(1,Math.ceil((result.retryAfter||Number(response.headers.get('Retry-After'))||60)/60)));setFormError('limited');return;}
   if(result.error==='captcha'){captcha.current?.reset();setErrors({captcha:captchaRejectedMessage(result.reason,locale)});captcha.current?.focus();return;}
   // Any captcha the server saw is now spent, so every other failure needs a fresh one too.
   captcha.current?.reset();
   if(result.error==='validation'&&result.errors){setErrors(result.errors);if(STEP3_FIELDS.some(k=>result.errors![k]))focusFirst(result.errors);else setFormError('answers');return;}
   setFormError('failed');
  }catch{captcha.current?.reset();setFormError('failed');}
  finally{setSending(false);}
 }
 function startOver(){setSubmitted(null);setDraft({...blankDraft});go(1);}
 const fallback=prepareInquiryEmail(draft,locale);
 const back=<button type="button" className="text-link" onClick={()=>go(step-1)} disabled={sending}><Icon name="arrow-left"/>{tr('Back','رجوع')}</button>;
 const fieldError=(key:string)=>errors[key]&&<p className="field-error" role="alert" id={`${key}-error`}>{errors[key]}</p>;
 return <div className="dir-inquiry"><div className="inquiry-layout shell" data-step={step} data-ready={loaded}>
  <aside className="inquiry-aside"><h1>{tr('Tell us what’s\non your mind.','وش الفكرة\nاللي في بالك؟')}</h1><p>{tr('A rough idea. A stubborn problem. Something you wish worked better. We’re listening.','فكرة مبدئية، مشكلة متكررة، أو تجربة تتمنى تكون أفضل. نسمع منك.')}</p>
   <div className="inquiry-expect"><p>{tr('What happens next','وش يصير بعدها؟')}</p><ol><li>{tr('Share a little about your project.','احكِ لنا شوي عن مشروعك.')}</li><li>{tr('Send it here. Your answers come straight to our team.','أرسلها من هنا، وتوصل إجاباتك لفريقنا مباشرة.')}</li><li>{tr('Getting in touch is free. We agree on scope and cost before work begins.','التواصل معنا مجاني. نتفق على نطاق العمل والتكلفة قبل البداية.')}</li></ol></div>
   <a href={contactHref(locale)} className="text-link"><span dir="ltr">{CONTACT_EMAIL}</span><Icon/></a>
   <a href={WHATSAPP_URL} className="text-link">{tr('WhatsApp','واتساب')} <bdi dir="ltr">{WHATSAPP_NUMBER}</bdi><Icon/></a>
  </aside>
  <div className="inquiry-panel">
   {saved&&<div className="draft-notice" role="status"><p>{tr('You have an unfinished note in this tab.','عندك مسودة ما كملتها في هذا التبويب.')}</p><div><button type="button" onClick={restore}>{tr('Restore draft','استعادة المسودة')}</button><button type="button" onClick={discard}>{tr('Start fresh','بدء مسودة جديدة')}</button></div></div>}
   {!loaded&&<p role="status">{tr('Preparing your note…','نجهّز المسودة…')}</p>}
   <div className="inquiry-content" inert={!!saved||!loaded}>
    {step<4&&<div className="inquiry-progress" aria-label={tr(`Step ${step} of 3`,`الخطوة ${step} من 3`)}>{[tr('Your goal','هدفك'),tr('The idea','الفكرة'),tr('Your details','بياناتك')].map((label,i)=><div key={label} data-active={step>=i+1} aria-current={step===i+1?'step':undefined}><span>{i+1}</span><span>{label}</span></div>)}</div>}
    <h2 ref={heading} tabIndex={-1}>{step===1?tr('Where shall we start?','من وين نبدأ؟'):step===2?tr('A little about the idea.','احكِ لنا عن فكرتك.'):step===3?tr('How can we reach you?','كيف نتواصل معك؟'):tr('Thanks, we’ve got it.','وصلتنا، شكرًا لك.')}</h2>
    {step===1&&<fieldset className="intent-options"><legend className="sr-only">{tr('Your project goal','هدف مشروعك')}</legend>{intents.map(([value,en,arabic])=><label key={value} data-selected={draft.intent===value}><input type="radio" name="intent" value={value} checked={draft.intent===value} onChange={()=>update('intent',value)} aria-describedby={errors.intent?'intent-error':undefined}/><span>{ar?arabic:en}</span><span className="inquiry-radio-mark" aria-hidden="true"/></label>)}</fieldset>}
    {step===2&&<div className="inquiry-fields"><div className="chosen-intent"><span>{intentLabel}</span><button type="button" onClick={()=>go(1)}>{tr('Change','تغيير')}</button></div>
     <label htmlFor="description">{tr('What would you like to make or improve?','وش تبغى تبني أو تطوّر؟')} <span>{tr('(optional)','(اختياري)')}</span></label><p className="field-help" id="description-help">{tr('Who is it for? What should be easier? A few sentences are enough.','لمين الفكرة؟ وش الشيء اللي ودّك يصير أسهل؟ كم جملة تكفي.')}</p>
     <textarea id="description" name="description" dir="auto" value={draft.description} onChange={e=>update('description',e.target.value)} maxLength={LIMITS.description} rows={expanded?12:5} aria-invalid={!!errors.description} aria-describedby={`description-help description-limit${errors.description?' description-error':''}`}/>
     <div className="note-tools"><p id="description-limit">{draft.description.length} / {LIMITS.description}</p><button type="button" onClick={()=>setExpanded(!expanded)}>{expanded?tr('Smaller writing space','تصغير مساحة الكتابة'):tr('More writing space','توسيع مساحة الكتابة')}</button></div>
     {fieldError('description')}
     <label htmlFor="timeline">{tr('When would you like to start?','متى ودّك تبدأ؟')}</label><select id="timeline" value={draft.timeline} onChange={e=>update('timeline',e.target.value)} aria-invalid={!!errors.timeline} aria-describedby={errors.timeline?'timeline-error':undefined}>{timings.map(([value,en,arabic])=><option key={value} value={value}>{ar?arabic:en}</option>)}</select>
     {fieldError('timeline')}
    </div>}
    {step===3&&<form ref={form} onSubmit={submit} noValidate className="inquiry-fields" aria-busy={sending}><div className="chosen-intent"><span>{intentLabel}</span><button type="button" onClick={()=>go(2)} disabled={sending}>{tr('Edit idea','تعديل الفكرة')}</button></div>
     <details className="inquiry-review"><summary>{tr('Review your note and timeframe','راجع فكرتك وموعد البداية')}<span className="inquiry-review-indicator" aria-hidden="true"/></summary><dl><dt>{tr('Timeframe','موعد البداية')}</dt><dd>{timings.find(t=>t[0]===draft.timeline)?.[ar?2:1]}</dd><dt>{tr('Your note','فكرتك')}</dt><dd dir="auto">{draft.description||tr('No extra context added. We can explore it together.','ما أضفت تفاصيل. نقدر نناقشها مع بعض.')}</dd></dl></details>
     <div className="field-pair">{(['firstName','email'] as const).map(key=><div key={key}><label htmlFor={key}>{key==='firstName'?tr('Your name','اسمك'):tr('Email address','البريد الإلكتروني')} <span aria-hidden="true">*</span></label><input id={key} name={key} type={key==='email'?'email':'text'} dir={key==='email'?'ltr':'auto'} autoComplete={key==='email'?'email':'name'} required maxLength={key==='email'?LIMITS.email:LIMITS.name} value={draft[key]} onChange={e=>update(key,e.target.value)} onBlur={()=>check(key)} aria-invalid={!!errors[key]} aria-describedby={errors[key]?`${key}-error`:undefined}/>{fieldError(key)}</div>)}</div>
     <label htmlFor="company">{tr('Company','اسم الجهة')} <span>{tr('(optional)','(اختياري)')}</span></label><input id="company" name="company" autoComplete="organization" dir="auto" maxLength={LIMITS.company} value={draft.company} onChange={e=>update('company',e.target.value)} onBlur={()=>check('company')} aria-invalid={!!errors.company} aria-describedby={errors.company?'company-error':undefined}/>{fieldError('company')}
     <fieldset className="contact-preference"><legend>{tr('How would you like to hear from us?','كيف تفضّل نتواصل معك؟')}</legend>{(['write','call'] as const).map(value=><label key={value} data-selected={draft.preferredContact===value}><input type="radio" name="preferredContact" checked={draft.preferredContact===value} value={value} onChange={()=>update('preferredContact',value)}/>{value==='write'?tr('Email me','بالإيميل'):tr('Call me','بمكالمة')}</label>)}</fieldset>
     {draft.preferredContact==='call'&&<div><label htmlFor="phone">{tr('Phone number','رقم الجوال')} <span aria-hidden="true">*</span></label><input id="phone" name="phone" type="tel" autoComplete="tel" dir="ltr" required maxLength={LIMITS.phone} value={draft.phone} onChange={e=>update('phone',normalizePhone(e.target.value))} onBlur={()=>check('phone')} aria-invalid={!!errors.phone} aria-describedby={errors.phone?'phone-error':undefined}/>{fieldError('phone')}</div>}
     <Captcha ref={captcha} id="captcha" error={errors.captcha} onAnswer={()=>{if(errors.captcha)setErrors(e=>({...e,captcha:''}));}}/>
     <p className="form-privacy">{tr('Your answers go straight to the Muse team by email. We only use them to respond to this enquiry.','توصل إجاباتك مباشرة إلى فريق ميوز بالإيميل، ونستخدمها فقط للرد على طلبك.')} <Link href="/privacy">{tr('Privacy','الخصوصية')}</Link></p>
     {formError&&<div className="field-error inquiry-form-error" role="alert">{formError==='answers'
      ?<p>{tr('Some earlier answers need another look.','بعض الإجابات السابقة تحتاج مراجعة.')} <button type="button" className="text-link" onClick={()=>go(1)}>{tr('Review answers','راجع الإجابات')}</button></p>
      :formError==='limited'
      ?<p>{tr(`Too many attempts from your connection. Please wait about ${retryMinutes} minute${retryMinutes===1?'':'s'} and try again, or email us instead:`,`محاولات كثيرة من اتصالك. انتظر تقريبًا ${retryMinutes} ${retryMinutes<=10&&retryMinutes>2?'دقائق':'دقيقة'} وحاول مرة ثانية، أو راسلنا بالإيميل:`)} <a href={fallback.href} dir="ltr">{CONTACT_EMAIL}</a></p>
      :<p>{tr('We couldn’t send your enquiry. Please try again, or email it to us instead:','ما قدرنا نرسل طلبك. حاول مرة ثانية، أو أرسله لنا بالإيميل:')} <a href={fallback.href} dir="ltr">{CONTACT_EMAIL}</a></p>}</div>}
     <div className="form-actions">{back}<button className="studio-button" type="submit" disabled={sending}>{sending?tr('Sending…','جارٍ الإرسال…'):tr('Send enquiry','أرسل الطلب')}<Icon/></button></div>
    </form>}
    {step===4&&submitted&&<div className="inquiry-handoff"><p role="status">{submitted.call
      ?tr(`Thanks, ${submitted.name}. Your enquiry reached our team, and we’ll call you on the number you gave us.`,`شكرًا ${submitted.name}. وصل طلبك لفريقنا، وبنتصل عليك على الرقم اللي أرسلته.`)
      :tr(`Thanks, ${submitted.name}. Your enquiry reached our team, and we’ll reply by email.`,`شكرًا ${submitted.name}. وصل طلبك لفريقنا، وبنرد عليك بالإيميل.`)}</p>
     <p className="field-help">{tr('Reference','رقم المرجع')}: <bdi dir="ltr" className="inquiry-reference">{submitted.id.slice(0,8).toUpperCase()}</bdi></p>
     <div className="inquiry-copy-actions"><Link className="studio-button secondary" href="/">{tr('Back to home','العودة للرئيسية')}</Link><button type="button" className="text-link" onClick={startOver}>{tr('Send another enquiry','أرسل طلبًا آخر')}</button></div>
    </div>}
    {step<3&&<>{errors.intent&&<p className="field-error" id="intent-error" role="alert">{errors.intent}</p>}<div className="form-actions">{step>1?back:<span className="form-time">{tr('About 2 minutes','حوالي دقيقتين')}</span>}<button type="button" className="studio-button" onClick={next}>{tr('Continue','متابعة')}<Icon name="arrow-right"/></button></div></>}
    {step<4&&<p className="draft-help">{canSave?tr('Your answers stay in this tab until you close it or choose Start fresh.','إجاباتك تبقى في هذا التبويب إلى أن تغلقه أو تختار بدء مسودة جديدة.'):tr('Draft saving is unavailable. Keep this page open until you finish.','حفظ المسودة مو متاح. خلّ الصفحة مفتوحة إلى أن تنتهي.')}</p>}
   </div>
  </div>
 </div></div>;
}
