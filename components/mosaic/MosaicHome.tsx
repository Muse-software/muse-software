"use client";

import Icon from "@/components/Icon";
import {useIntentSwipe} from "./useIntentSwipe";

import { useState, type CSSProperties } from "react";
import { preload } from "react-dom";
import { Link } from "@/i18n/navigation";
import { studioServices } from "@/lib/studio-services";
import MosaicHeroField from "./MosaicHeroField";
import EmailCTA from "@/components/site/EmailCTA";
import { inquiryHref } from "@/lib/contact";
import MosaicParticleMark, { MosaicMorphMark } from "./MosaicParticleMark";

type Locale = "en" | "ar";
const copy = {
 en: {
  hero:["Bringing greatness", "to life"],
  intro:"Websites, apps, and better ways to work. We bring the thinking, design, and build together to move your business forward.",
  start:"Let's build something", aside:"From the first question\nto the thing that works.", disciplines:["Strategy","Design","Engineering"],
   goalTitle:"Where can we help?", goalIntro:"Build something new, improve what you have, or take repetitive tasks off your team’s hands.",
  choices:["I have an idea.","My website or app needs work.","We do too much by hand."],
  mobileChoices:["A new idea","An existing product","Everyday work"],
  mobileGoals:[
   {title:"An idea you want to build?",body:"A website, an app, or a new service. We help you work out what matters and build a useful first version.",cta:"Tell us about your idea"},
   {title:"Something isn’t working well?",body:"A confusing booking, a slow checkout, a screen that’s awkward on a phone. We help make your website or app easier to use.",cta:"Let’s improve it"},
   {title:"Too much work between the work?",body:"Copying information, chasing updates, repeating the same steps. We help make those tasks easier.",cta:"Let’s simplify it"},
  ],
  choiceHints:["A new website, app, or digital service.","Make an existing product easier to use.","Less repetitive admin for your team."],
  goals:[
   {title:"Turn the idea into something people can use.",body:"A website, an app, or a service people need. We help you work out what matters, try the experience, and build the parts that earn their place.",question:"What are you thinking of building?",cta:"Tell us about your idea",intent:"build"},
   {title:"Make your website or app easier to use.",body:"A confusing booking, a slow checkout, or a screen that doesn’t work well on a phone. We find what gets in the way and make it easier for people to finish what they came to do.",question:"Where do your customers or your team get stuck?",cta:"Let's improve your product",intent:"improve"},
   {title:"Less copying. More getting things done.",body:"Connect the repeated steps that slow your team down. Use automation or AI where it helps, with people in control of the decisions.",question:"Which task keeps taking more time than it should?",cta:"Simplify your workflow",intent:"ai"},
  ],
   servicesTitle:"What we build",servicesIntro:"From planning your product to designing and building it, with automation where it helps.", serviceLink:"Explore the capability", allServices:"See all services",
  faqTitle:"FAQ",faqs:[
   ["Do I need a complete brief?","No. Start with the idea, the problem, or the thing that is taking too much effort. We can help you work out what to build and where to begin."],
   ["How do we get started, and what does it cost?","Share your idea in the short form, then send the prepared email. Getting in touch is free; we agree on the scope, cost and timeline before project work begins."],
   ["Do you design in Arabic and English?","Yes. Language, reading direction and mobile use are part of the design from the start. The Arabic experience gets the same attention as the English one."],
   ["What happens after launch?","We agree on handover, documentation and any ongoing support as part of the scope. You will know what is included and who is responsible for the next step."],
  ], endTitle:"Let’s make\nit happen.",endBody:"An early idea, an existing challenge, or a question you haven’t answered yet. We’d love to hear it.",endCta:"Get started",
 },
 ar: {
  hero:["أفكارك تستاهل تكون ","أكثر من مجرد أفكار."],
  intro:"سواء كانت منصة أو تطبيق أو مجرد طريقة أسهل للعمل، احنا بنفكر معك ونصمم ونطلق فكرتك وبنساعدك تاخذ أعمالك لبُعد ثاني.",start:"ابدأ مجانًا",aside:"من أول سؤال،\nإلى منتج يؤدي غرضه.",disciplines:["استراتيجية","تصميم","تطوير"],
  goalTitle:"وش بنسوي لك؟",goalIntro:"نبني فكرة جديدة، نحسّن موقعك أو تطبيقك، أو نخفّف المهام المتكررة عن فريقك.",choices:["تطوير فكرة جديدة","تحسين مشروع قائم","تقليل العبء التشغيلي"],
  mobileChoices:["تطوير فكرة جديدة","تحسين مشروع قائم","تقليل العبء التشغيلي"],
  mobileGoals:[
   {title:"عندك فكرة ودّك تبنيها؟",body:"موقع، تطبيق، أو خدمة جديدة. نساعدك تحدد المهم وتبني أول نسخة لها فائدة.",cta:"احكِ لنا عن فكرتك"},
   {title:"فيه شيء يصعّب التجربة؟",body:"حجز مربك، دفع بطيء، أو شاشة ما تضبط على الجوال. نساعدك نخلي موقعك أو تطبيقك أسهل في الاستخدام.",cta:"خلّنا نحسّنه"},
   {title:"الشغل المتكرر يأخذ وقتك؟",body:"نقل معلومات، متابعة تحديثات، ونفس الخطوات كل يوم. نساعدك تخلي هالمهام أسهل.",cta:"خلّنا نسهّله"},
  ],
  choiceHints:["موقع، تطبيق، أو خدمة جديدة.","تجربة أوضح وأسهل للي يستخدمونه.","مهام متكررة أقل، ووقت أكثر لفريقك."],
  goals:[
   {title:"خلّنا نبني أول نسخة لها فائدة.",body:"موقع، تطبيق، أو خدمة يحتاجها الناس. نساعدك تعرف وش المهم، تجرّب التجربة، وتبني الأجزاء اللي لها قيمة فعلية.",question:"وش الفكرة اللي ودّك تبنيها؟",cta:"احكِ لنا عن فكرتك",intent:"build"},
   {title:"نفهم وين تتعثر التجربة. ونحسّنها.",body:"حجز مربك، دفع بطيء، أو شاشة ما تضبط على الجوال. نحدد اللي يعطّل المستخدم ونحسّنه عشان يقدر ينجز اللي جاء عشانه.",question:"وين يتعثر عملاؤك أو فريقك؟",cta:"خلّنا نحسّن منتجك",intent:"improve"},
   {title:"نقل معلومات أقل. وإنجاز أكثر.",body:"نربط الخطوات المتكررة اللي تعطّل فريقك. ونستخدم الأتمتة أو الذكاء الاصطناعي في المكان المفيد، والقرار يبقى بيد الناس.",question:"وش المهمة اللي تأخذ منكم أكثر من وقتها؟",cta:"لنسهّل طريقة العمل",intent:"ai"},
  ],
  servicesTitle:"مجالات عملنا",servicesIntro:"نخطط لمنتجك، نصمم تجربته ونطوّره، ونستخدم الأتمتة لتسهيل شغلك.",serviceLink:"اكتشف الخدمة",allServices:"تعلّم المزيد",
  faqTitle:"الأسئلة الشائعة",faqs:[
   ["لازم تكون عندي متطلبات كاملة؟","لا. ابدأ بفكرة، مشكلة، أو شغلة تأخذ منكم جهد أكثر من اللازم. نساعدك تحدد وش يستحق البناء ومن وين تبدأ."],
   ["كيف نبدأ، وكم التكلفة؟","اكتب فكرتك في النموذج، ثم أرسل الإيميل الجاهز. التواصل مجاني، ونتفق معك على نطاق المشروع والتكلفة والجدول قبل التنفيذ."],
   ["تصمّمون بالعربي والإنجليزي؟","نعم. اللغة واتجاه القراءة واستخدام الجوال جزء من التصميم من البداية. ونعطي التجربة العربية نفس الاهتمام اللي نعطيه للإنجليزية."],
   ["وش يصير بعد الإطلاق؟","نتفق ضمن نطاق العمل على التسليم والتوثيق وأي دعم مستمر. تكون عارف وش المشمول ومين مسؤول عن الخطوة التالية."],
  ],endTitle:"فكرتك تستحق\nأن تكون واقعًا.",endBody:"احكِ لنا عن مشروعك، ونشوف معك من وين نبدأ.",endCta:"ابدأ مجانًا",
 },
};

function Arrow(){return <Icon name="arrow-up-right" className="mx-arrow"/>;}
function PixelMark({variant=0}:{variant?:number}) {
 const shapes=[[[0,0],[1,0],[2,0],[0,1],[0,2],[2,2],[3,2],[2,3],[3,3]],[[0,0],[1,0],[2,0],[3,0],[0,1],[3,1],[0,2],[3,2],[0,3],[1,3],[2,3],[3,3]],[[0,0],[0,1],[0,2],[1,2],[2,2],[2,1],[2,0],[3,0]],[[0,1],[1,1],[1,0],[2,1],[2,2],[3,2],[3,3]],[[0,0],[3,0],[1,1],[2,1],[1,2],[2,2],[0,3],[3,3]]];
 return <svg className="mx-pixel-mark" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">{shapes[variant%5].map(([x,y],i)=><rect key={i} x={x*25+1} y={y*25+1} width="22" height="22" />)}</svg>;
}

export default function MosaicHome({locale,base}:{locale:Locale;base:string}) {
 // The hero still is the largest paint on phones, but CSS backgrounds are only
 // discovered after the stylesheet loads. Preloading lets it download at once;
 // the media queries mirror mosaic-pixels.css so each screen fetches one file.
 preload("/studio/mosaic-hero-still.svg",{as:"image",media:"(min-width: 701px)",fetchPriority:"high"});
 preload("/studio/mosaic-hero-mobile-still.svg",{as:"image",media:"(max-width: 700px)",fetchPriority:"high"});
 const c=copy[locale], ar=locale==="ar";
 const [goal,setGoal]=useState(0);
 const swipe=useIntentSwipe(c.goals.length,ar,setGoal);
 const g=c.goals[goal];
 return <div className="mosaic-home" dir={ar?"rtl":"ltr"}>
  <section className="mx-hero" aria-labelledby="mx-hero-title">
   <MosaicHeroField locale={locale}/>
   <div className="mx-wrap mx-hero-content">
    <h1 id="mx-hero-title"><span>{c.hero[0]}</span><span className="mx-hero-highlight">{c.hero[1]}</span></h1>
    <div className="mx-hero-bottom"><div><p className="mx-hero-description">{c.intro}</p><EmailCTA locale={locale}/></div><p className="mx-hero-aside">{c.aside}</p></div>
   </div>
  </section>

  <section id="starting-point" className="mx-goals mx-wrap mx-section" aria-labelledby="mx-goal-title">
   <div className="mx-section-head"><h2 id="mx-goal-title">{c.goalTitle}</h2><p>{c.goalIntro}</p></div>
   <div className="mx-intent-panel" {...swipe} style={{"--intent-index":goal} as CSSProperties}>
    <div className="mx-choices" role="group" aria-label={ar?"اختر نقطة البداية":"Choose your starting point"}>
     <span className="mx-choice-track" aria-hidden="true"/>
     {c.choices.map((label,i)=><button className="mx-choice" type="button" key={label} aria-pressed={goal===i} aria-controls="mx-goal-result" onClick={()=>setGoal(i)} data-mosaic-card>
      <MosaicParticleMark variant={(["idea","improve","workflow"] as const)[i]} active={goal===i} size={44}/>
      <span className="mx-choice-copy"><span>{label}</span><small>{c.choiceHints[i]}</small></span>
      <span className="mx-choice-short">{c.mobileChoices[i]}</span><Arrow/>
     </button>)}
    </div>
    <div id="mx-goal-result" className="mx-goal-result">
     <div className="mx-intent-art"><MosaicMorphMark variant={(["idea","improve","workflow"] as const)[goal]}/></div>
     <div className="mx-goal-copy" aria-live="polite" aria-atomic="true">
      <div className="mx-goal-desktop"><h3>{g.title}</h3><p>{g.body}</p></div>
      <div className="mx-goal-mobile">{c.mobileGoals.map((item,i)=><div key={i} className="mx-intent-message" data-selected={goal===i} aria-hidden={goal!==i}><h3>{item.title}</h3><p>{item.body}</p></div>)}</div>
     </div>
     <div className="mx-goal-next"><p className="mx-goal-question">{g.question}</p><a className="mx-button" href={inquiryHref(locale,g.intent)}><span className="mx-goal-desktop">{g.cta}</span><span className="mx-goal-mobile">{c.mobileGoals[goal].cta}</span><Arrow/></a></div>
    </div>
   </div>
  </section>

  <section className="mx-capabilities mx-wrap mx-section" aria-labelledby="mx-services-title">
   <div className="mx-section-head mx-services-head"><h2 id="mx-services-title">{c.servicesTitle}</h2><Link className="mx-text-link" href={`${base}/services`}>{c.allServices}<Arrow/></Link><p>{c.servicesIntro}</p></div>
   <div className="mx-capability-grid">{studioServices[locale].map((s,i)=><Link className={`mx-capability mx-capability-${i}`} data-mosaic-card key={s.slug} href={`${base}/services/${s.slug}`}><PixelMark variant={i}/><h3>{s.title}</h3><p>{s.summary}</p><span className="mx-capability-link"><span className="mx-capability-action">{c.serviceLink}</span><Icon name="arrow-right"/></span></Link>)}</div>
  </section>


  <section className="mx-human" dir={ar?"rtl":"ltr"} aria-labelledby="mx-belief-title"><div className="mx-wrap mx-editorial-card"><div className="mx-human-heading"><p className="mx-belief-label">{ar?"ما نؤمن به":"What we believe"}</p><h2 id="mx-belief-title">{ar?<>التقنية يجب أن<br/>تخدم <em>الإنسان.</em></>:<>Good technology<br/>should feel <em>human.</em></>}</h2></div><p className="mx-belief-body">{ar?"بناء البرامج صار أسهل. والمفروض استخدامها يصير أسهل بعد. موقع تعرف تتنقّل فيه. تطبيق يوضّح لك الخطوة الجاية. نظام يسهّل الشغل بدل ما يزيد عليك أشياء تتعلّمها.":"Building software is getting easier. Using it should be, too. A website you can find your way around. An app that makes the next step clear. A system that simplifies the work instead of giving you more to learn."}</p></div></section>
  <section className="mx-faq mx-wrap mx-section" aria-labelledby="mx-faq-title"><div><h2 id="mx-faq-title">{c.faqTitle}</h2></div><div className="mx-faq-list">{c.faqs.map(([q,a])=><details key={q}><summary><span className="mx-faq-question">{q}</span><span aria-hidden="true"><Icon name="plus"/></span></summary><p>{a}</p></details>)}</div></section>

  <section className="mx-ending" aria-labelledby="mx-end-title"><div className="mx-wrap mx-editorial-card"><div className="mx-ending-grid"><h2 id="mx-end-title">{c.endTitle}</h2><div><p>{c.endBody}</p><a className="mx-button" href={inquiryHref(locale)}>{c.endCta}<Arrow/></a></div></div></div></section>
 </div>;
}
