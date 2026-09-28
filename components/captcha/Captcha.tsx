"use client";
import {useCallback,useEffect,useImperativeHandle,useRef,useState,type Ref} from 'react';
import {useLocale} from 'next-intl';
import {CAPTCHA_LENGTH,type CaptchaAnswer} from '@/lib/captcha-shared';
import './captcha.css';

export type CaptchaHandle = {
  /** Current token and typed answer, to send with the form. */
  value():CaptchaAnswer;
  /** Load a new image and clear the answer. Call after every server rejection. */
  reset():void;
  focus():void;
};

type Challenge = {token:string;image:string;expiresAt:number};

/**
 * Reusable six-character, case-sensitive hexadecimal captcha.
 *
 * Usage in any form:
 *   const captcha = useRef<CaptchaHandle>(null);
 *   <Captcha ref={captcha} error={errors.captcha} onAnswer={() => clearError('captcha')}/>
 *   fetch(url, {body: JSON.stringify({...fields, captcha: captcha.current!.value()})})
 * and on the server: `verifyCaptcha(body.captcha?.token, body.captcha?.answer)`.
 *
 * Native form posts work too: the token and answer are submitted as
 * `captchaToken` and `captchaAnswer`.
 */
export default function Captcha({ref,id='captcha',error,onAnswer}:{ref?:Ref<CaptchaHandle>;id?:string;error?:string;onAnswer?:(answer:string)=>void}) {
  const ar = useLocale()==='ar';
  const tr = (en:string,arabic:string) => ar?arabic:en;
  const [challenge,setChallenge] = useState<Challenge|null>(null);
  const [status,setStatus] = useState<'loading'|'ready'|'failed'|'limited'>('loading');
  const [answer,setAnswer] = useState('');
  const input = useRef<HTMLInputElement>(null),request = useRef(0);

  const load = useCallback(async () => {
    const current = ++request.current;
    setStatus('loading');
    setAnswer('');
    try {
      const response = await fetch('/api/captcha',{cache:'no-store'});
      if (response.status===429) { if (current===request.current) setStatus('limited'); return; }
      if (!response.ok) throw new Error(String(response.status));
      const next = await response.json() as Challenge;
      if (current!==request.current) return;
      setChallenge(next);
      setStatus('ready');
    } catch {
      if (current===request.current) setStatus('failed');
    }
  },[]);

  useEffect(() => { load(); },[load]);
  // Swap the image shortly before the token expires so a slow visitor never submits a dead code.
  useEffect(() => {
    if (!challenge) return;
    const timer = setTimeout(load,Math.max(challenge.expiresAt-Date.now()-30_000,5_000));
    return () => clearTimeout(timer);
  },[challenge,load]);

  useImperativeHandle(ref,() => ({
    value:() => ({token:challenge?.token||'',answer}),
    reset:() => { load(); },
    focus:() => input.current?.focus(),
  }),[challenge,answer,load]);

  const describedBy = [`${id}-help`,error?`${id}-error`:''].filter(Boolean).join(' ');
  return <div className="captcha" data-status={status}>
    <label htmlFor={id}>{tr('Security check','رمز التحقق')} <span aria-hidden="true">*</span></label>
    <p className="field-help" id={`${id}-help`}>{tr(`Type the ${CAPTCHA_LENGTH} characters you see. Upper and lower case matter.`,`اكتب الخانات الـ${CAPTCHA_LENGTH} الظاهرة في الصورة. الحروف الكبيرة والصغيرة تفرق.`)}</p>
    <div className="captcha-row">
      <div className="captcha-image" aria-live="polite">
        {status==='ready'&&challenge
          // eslint-disable-next-line @next/next/no-img-element -- server-generated data URL, nothing to optimise
          ?<img src={challenge.image} width={240} height={72} alt={tr('Security code image','صورة رمز التحقق')}/>
          :<span role="status">{status==='limited'?tr('Too many new codes. Wait a few minutes, then try again.','طلبت رموز كثيرة. انتظر دقائق ثم حاول مرة ثانية.'):status==='failed'?tr('Couldn’t load the code.','ما قدرنا نحمّل الرمز.'):tr('Loading code…','نحمّل الرمز…')}</span>}
      </div>
      <button type="button" className="captcha-refresh" onClick={() => { load(); input.current?.focus(); }} disabled={status==='loading'}>
        {status==='failed'||status==='limited'?tr('Try again','حاول مرة ثانية'):tr('New code','رمز جديد')}
      </button>
    </div>
    <input ref={input} id={id} className="captcha-input" name="captchaAnswer" type="text" inputMode="text" dir="ltr" required
      autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck={false}
      // No maxLength: it would truncate a paste like "2A-f3 45" before separators are stripped.
      value={answer} onChange={e => { const next = e.target.value.replace(/[^0-9a-fA-F]/g,'').slice(0,CAPTCHA_LENGTH); setAnswer(next); onAnswer?.(next); }}
      aria-invalid={!!error} aria-describedby={describedBy}/>
    <input type="hidden" name="captchaToken" value={challenge?.token||''}/>
    {error&&<p className="field-error" role="alert" id={`${id}-error`}>{error}</p>}
  </div>;
}
