"use client";
import {useEffect,useRef,useState,type FormEvent} from 'react';
import {useLocale} from 'next-intl';
import {Link} from '@/i18n/navigation';
import Icon from '@/components/Icon';
import {CONTACT_EMAIL,contactHref,WHATSAPP_URL,WHATSAPP_NUMBER} from '@/lib/contact';
import {INQUIRY_DRAFT_KEY,blankDraft,intents,timings,isIntent,normalizePhone,prepareInquiryEmail,readInquiryDraft,validateInquiry,type InquiryDraft} from '@/lib/project-inquiry';
import './inquiry.css';

export default function ProjectInquiry({initialIntent}:{initialIntent?:string}) {
 const locale=useLocale()==='ar'?'ar':'en',ar=locale==='ar';
 const tr=(en:string,arabic:string)=>ar?arabic:en;
 const [draft,setDraft]=useState<InquiryDraft>({...blankDraft,intent:isIntent(initialIntent)?initialIntent:''});
 const [step,setStep]=useState(initialIntent&&isIntent(initialIntent)?2:1);
 const [saved,setSaved]=useState<ReturnType<typeof readInquiryDraft>>(null);
 const [loaded,setLoaded]=useState(false),[canSave,setCanSave]=useState(true);
 const [errors,setErrors]=useState<Record<string,string>>({});
 const [expanded,setExpanded]=useState(false),[copyState,setCopyState]=useState<'idle'|'copying'|'copied'|'manual'>('idle');
 const edited=useRef(false),moved=useRef(false),heading=useRef<HTMLHeadingElement>(null),form=useRef<HTMLFormElement>(null),emailLink=useRef<HTMLAnchorElement>(null),message=useRef<HTMLTextAreaElement>(null);
 const email=prepareInquiryEmail(draft,locale);
 const intentLabel=intents.find(i=>i[0]===draft.intent)?.[ar?2:1]||'';
 // Browser-owned drafts must be read after hydration; SSR cannot access tab storage.
 /* eslint-disable react-hooks/set-state-in-effect */
 useEffect(()=>{
  try{const raw=sessionStorage.getItem(INQUIRY_DRAFT_KEY);if(raw)setSaved(readInquiryDraft(raw));}catch{setCanSave(false);}
  setLoaded(true);
 },[]);
 useEffect(()=>{
  if(!loaded||saved||!canSave||!edited.current)return;
  try{sessionStorage.setItem(INQUIRY_DRAFT_KEY,JSON.stringify({...draft,step:Math.min(step,3)}));}catch{setCanSave(false);}
 },[draft,step,loaded,saved,canSave]);
 /* eslint-enable react-hooks/set-state-in-effect */
 useEffect(()=>{
  if(moved.current){heading.current?.focus({preventScroll:true});heading.current?.scrollIntoView({block:'start',behavior:'instant'});}
 },[step]);
 useEffect(()=>{
  const pop=()=>{const next=Number(location.hash.replace('#step-',''));setStep(next>=1&&next<=3?next:initialIntent?2:1);setErrors({});moved.current=true;};
  addEventListener('popstate',pop);return()=>removeEventListener('popstate',pop);
 },[initialIntent]);
 function update<K extends keyof InquiryDraft>(key:K,value:InquiryDraft[K]){edited.current=true;setDraft(d=>({...d,[key]:value}));setErrors(e=>({...e,[key]:''}));setCopyState('idle');}
 function go(next:number){if(next===step)requestAnimationFrame(()=>heading.current?.focus());moved.current=true;setErrors({});setStep(next);history.pushState(null,'',`#step-${Math.min(next,3)}`);}
 function next(){if(step===1&&!draft.intent){setErrors({intent:tr('Choose a starting point. “Let’s figure it out together” is fine too.','اختر نقطة البداية، أو اختر «نحددها مع بعض».')});return;}go(step+1);}
 function restore(){if(saved){edited.current=true;setDraft(saved.draft);const target=saved.step;setSaved(null);go(target);}}
 function discard(){try{sessionStorage.removeItem(INQUIRY_DRAFT_KEY);}catch{}edited.current=false;setSaved(null);heading.current?.focus();}
 function submit(event:FormEvent){event.preventDefault();const invalid=validateInquiry(draft,locale);setErrors(invalid);if(Object.keys(invalid).length){form.current?.querySelector<HTMLInputElement>(`[name="${Object.keys(invalid)[0]}"]`)?.focus();return;}emailLink.current?.click();setCopyState('idle');go(4);}
 async function copy(){if(copyState==='copying')return;setCopyState('copying');try{await navigator.clipboard.writeText(`${email.subject}\n\n${email.body}`);setCopyState('copied');}catch{setCopyState('manual');message.current?.focus();message.current?.select();}}
 const back=<button type="button" className="text-link" onClick={()=>go(step-1)}><Icon name="arrow-left"/>{tr('Back','رجوع')}</button>;
 return <div className="dir-inquiry"><div className="inquiry-layout shell" data-step={step} data-ready={loaded}>
  <aside className="inquiry-aside"><h1>{tr('Tell us what’s\non your mind.','وش الفكرة\nاللي في بالك؟')}</h1><p>{tr('A rough idea. A stubborn problem. Something you wish worked better. We’re listening.','فكرة مبدئية، مشكلة متكررة، أو تجربة تتمنى تكون أفضل. نسمع منك.')}</p>
   <div className="inquiry-expect"><p>{tr('What happens next','وش يصير بعدها؟')}</p><ol><li>{tr('Share a little about your project.','احكِ لنا شوي عن مشروعك.')}</li><li>{tr('We prepare an email with your answers. You review it and send it from your email app.','نجهّز إيميل بإجاباتك. تراجعه وترسله من تطبيق البريد عندك.')}</li><li>{tr('Getting in touch is free. We agree on scope and cost before work begins.','التواصل معنا مجاني. نتفق على نطاق العمل والتكلفة قبل البداية.')}</li></ol></div>
   <a href={contactHref(locale)} className="text-link"><span dir="ltr">{CONTACT_EMAIL}</span><Icon/></a>
   <a href={WHATSAPP_URL} className="text-link">{tr('WhatsApp','واتساب')} <bdi dir="ltr">{WHATSAPP_NUMBER}</bdi><Icon/></a>
  </aside>
  <div className="inquiry-panel">
   {saved&&<div className="draft-notice" role="status"><p>{tr('You have an unfinished note in this tab.','عندك مسودة ما كملتها في هذا التبويب.')}</p><div><button type="button" onClick={restore}>{tr('Restore draft','استعادة المسودة')}</button><button type="button" onClick={discard}>{tr('Start fresh','بدء مسودة جديدة')}</button></div></div>}
   {!loaded&&<p role="status">{tr('Preparing your note…','نجهّز المسودة…')}</p>}
   <div className="inquiry-content" inert={!!saved||!loaded}>
    <div className="inquiry-progress" aria-label={tr(`Step ${Math.min(step,3)} of 3`,`الخطوة ${Math.min(step,3)} من 3`)}>{[tr('Your goal','هدفك'),tr('The idea','الفكرة'),tr('Your details','بياناتك')].map((label,i)=><div key={label} data-active={step>=i+1} aria-current={step===i+1?'step':undefined}><span>{i+1}</span><span>{label}</span></div>)}</div>
    <h2 ref={heading} tabIndex={-1}>{step===1?tr('Where shall we start?','من وين نبدأ؟'):step===2?tr('A little about the idea.','احكِ لنا عن فكرتك.'):step===3?tr('How can we reach you?','كيف نتواصل معك؟'):tr('Your email is ready.','إيميلك جاهز.')}</h2>
    {step===1&&<fieldset className="intent-options"><legend className="sr-only">{tr('Your project goal','هدف مشروعك')}</legend>{intents.map(([value,en,arabic])=><label key={value} data-selected={draft.intent===value}><input type="radio" name="intent" value={value} checked={draft.intent===value} onChange={()=>update('intent',value)} aria-describedby={errors.intent?'intent-error':undefined}/><span>{ar?arabic:en}</span><span className="inquiry-radio-mark" aria-hidden="true"/></label>)}</fieldset>}
    {step===2&&<div className="inquiry-fields"><div className="chosen-intent"><span>{intentLabel}</span><button type="button" onClick={()=>go(1)}>{tr('Change','تغيير')}</button></div>
     <label htmlFor="description">{tr('What would you like to make or improve?','وش تبغى تبني أو تطوّر؟')} <span>{tr('(optional)','(اختياري)')}</span></label><p className="field-help" id="description-help">{tr('Who is it for? What should be easier? A few sentences are enough.','لمين الفكرة؟ وش الشيء اللي ودّك يصير أسهل؟ كم جملة تكفي.')}</p>
     <textarea id="description" name="description" dir="auto" value={draft.description} onChange={e=>update('description',e.target.value)} maxLength={4000} rows={expanded?12:5} aria-describedby="description-help description-limit"/>
     <div className="note-tools"><p id="description-limit">{draft.description.length} / 4000</p><button type="button" onClick={()=>setExpanded(!expanded)}>{expanded?tr('Smaller writing space','تصغير مساحة الكتابة'):tr('More writing space','توسيع مساحة الكتابة')}</button></div>
     <label htmlFor="timeline">{tr('When would you like to start?','متى ودّك تبدأ؟')}</label><select id="timeline" value={draft.timeline} onChange={e=>update('timeline',e.target.value)}>{timings.map(([value,en,arabic])=><option key={value} value={value}>{ar?arabic:en}</option>)}</select>
    </div>}
    {step===3&&<form ref={form} onSubmit={submit} noValidate className="inquiry-fields"><div className="chosen-intent"><span>{intentLabel}</span><button type="button" onClick={()=>go(2)}>{tr('Edit idea','تعديل الفكرة')}</button></div>
     <details className="inquiry-review"><summary>{tr('Review your note and timeframe','راجع فكرتك وموعد البداية')}<span className="inquiry-review-indicator" aria-hidden="true"/></summary><dl><dt>{tr('Timeframe','موعد البداية')}</dt><dd>{timings.find(t=>t[0]===draft.timeline)?.[ar?2:1]}</dd><dt>{tr('Your note','فكرتك')}</dt><dd dir="auto">{draft.description||tr('No extra context added. We can explore it together.','ما أضفت تفاصيل. نقدر نناقشها مع بعض.')}</dd></dl></details>
     <div className="field-pair">{(['firstName','email'] as const).map(key=><div key={key}><label htmlFor={key}>{key==='firstName'?tr('Your name','اسمك'):tr('Email address','البريد الإلكتروني')} <span aria-hidden="true">*</span></label><input id={key} name={key} type={key==='email'?'email':'text'} dir={key==='email'?'ltr':'auto'} autoComplete={key==='email'?'email':'name'} required maxLength={200} value={draft[key]} onChange={e=>update(key,e.target.value)} aria-invalid={!!errors[key]} aria-describedby={errors[key]?`${key}-error`:undefined}/>{errors[key]&&<p className="field-error" role="alert" id={`${key}-error`}>{errors[key]}</p>}</div>)}</div>
     <label htmlFor="company">{tr('Company','اسم الجهة')} <span>{tr('(optional)','(اختياري)')}</span></label><input id="company" name="company" autoComplete="organization" dir="auto" maxLength={200} value={draft.company} onChange={e=>update('company',e.target.value)}/>
     <fieldset className="contact-preference"><legend>{tr('How would you like to hear from us?','كيف تفضّل نتواصل معك؟')}</legend>{(['write','call'] as const).map(value=><label key={value} data-selected={draft.preferredContact===value}><input type="radio" name="preferredContact" checked={draft.preferredContact===value} value={value} onChange={()=>update('preferredContact',value)}/>{value==='write'?tr('Email me','بالإيميل'):tr('Call me','بمكالمة')}</label>)}</fieldset>
     {draft.preferredContact==='call'&&<div><label htmlFor="phone">{tr('Phone number','رقم الجوال')} <span aria-hidden="true">*</span></label><input id="phone" name="phone" type="tel" autoComplete="tel" dir="ltr" required maxLength={50} value={draft.phone} onChange={e=>update('phone',normalizePhone(e.target.value))} aria-invalid={!!errors.phone} aria-describedby={errors.phone?'phone-error':undefined}/>{errors.phone&&<p role="alert" className="field-error" id="phone-error">{errors.phone}</p>}</div>}
     <p className="form-privacy">{tr('This opens a prepared draft in your email app. Review it and press Send there. Nothing is submitted by this website.','يفتح مسودة جاهزة في تطبيق البريد عندك. راجعها واضغط إرسال هناك. الموقع ما يرسل بياناتك.')} <Link href="/privacy">{tr('Privacy','الخصوصية')}</Link></p>
     <div className="form-actions">{back}<button className="studio-button" type="submit">{tr('Continue to email','متابعة إلى الإيميل')}<Icon/></button></div>
    </form>}
    {step===4&&<div className="inquiry-handoff"><p role="status">{tr('Finish by pressing Send in your email app. We can’t confirm sending or delivery from this page.','كمّل بالضغط على إرسال في تطبيق البريد. ما نقدر نؤكد الإرسال أو وصول الرسالة من هذه الصفحة.')}</p>
     <a className="studio-button" href={email.href}>{tr('Open email again','افتح الإيميل مرة ثانية')}<Icon/></a>
     <p>{tr('Email didn’t open? Copy the message below and email it to','ما فتح الإيميل؟ انسخ الرسالة أدناه وأرسلها إلى')} <a href={contactHref(locale)} dir="ltr">{CONTACT_EMAIL}</a>.</p>
     {email.href.length>1800&&<p className="field-help">{tr('Long messages can be cut off by some email apps. Copy the full message below if your draft is incomplete.','بعض تطبيقات البريد تختصر الرسائل الطويلة. انسخ الرسالة كاملة من هنا إذا كانت المسودة ناقصة.')}</p>}
     <label htmlFor="prepared-message">{tr('Your message','رسالتك')}</label><textarea ref={message} id="prepared-message" readOnly dir="auto" rows={10} value={`${email.subject}\n\n${email.body}`}/>
     <div className="inquiry-copy-actions"><button type="button" className="studio-button secondary" onClick={copy} disabled={copyState==='copying'}>{copyState==='copying'?tr('Copying…','جارٍ النسخ…'):copyState==='copied'?tr('Message copied','تم نسخ الرسالة'):tr('Copy message','انسخ الرسالة')}</button><button type="button" className="text-link" onClick={()=>go(3)}>{tr('Edit details','تعديل البيانات')}</button></div>
     <p role="status" className="field-help">{copyState==='manual'?tr('Copying isn’t available here. Your message is selected—use your device’s Copy command.','النسخ التلقائي مو متاح هنا. حددنا الرسالة؛ استخدم خيار النسخ في جهازك.'):copyState==='copied'?tr('Copied. Paste it into your email and send when you’re ready.','تم النسخ. الصقها في الإيميل وأرسلها لما تكون جاهز.'):''}</p>
    </div>}
    {step<3&&<>{errors.intent&&<p className="field-error" id="intent-error" role="alert">{errors.intent}</p>}<div className="form-actions">{step>1?back:<span className="form-time">{tr('About 2 minutes','حوالي دقيقتين')}</span>}<button type="button" className="studio-button" onClick={next}>{tr('Continue','متابعة')}<Icon name="arrow-right"/></button></div></>}
    <p className="draft-help">{canSave?tr('Your answers stay in this tab until you close it or choose Start fresh.','إجاباتك تبقى في هذا التبويب إلى أن تغلقه أو تختار بدء مسودة جديدة.'):tr('Draft saving is unavailable. Keep this page open until you finish.','حفظ المسودة مو متاح. خلّ الصفحة مفتوحة إلى أن تنتهي.')}</p>
   </div>
  </div>
  <a hidden ref={emailLink} href={email.href} tabIndex={-1} aria-hidden="true">{tr('Open prepared email','افتح الإيميل الجاهز')}</a>
 </div></div>;
}
