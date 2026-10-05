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
   servicesTitle:"What we build",servicesIntro:"From planning your product to designing and building it, with automation where it helps.", allServices:"See all services",
  faqTitle:"FAQ",faqs:[
   ["Do I need a complete brief?","No. Start with the idea, the problem, or the thing that is taking too much effort. We can help you work out what to build and where to begin."],
   ["How do we get started, and what does it cost?","Share your idea or what you need, and we agree on the scope, timeline and cost before project work begins."],
   ["Do you design in Arabic and English?","Yes. Language, reading direction and mobile use are part of the design from the start. The Arabic experience gets the same attention as the English one."],
   ["What happens after launch?","We agree on handover, documentation and any ongoing support as part of the scope. You will know what is included and who is responsible for the next step."],
  ], endTitle:"Let’s make\nit happen.",endBody:"",endCta:"Get started",
 },
 ar: {
  // Approved platform content review (October 2026). Each "How we help"
  // state shows the same headline, description, prompt and CTA on every
  // screen size, so mobileGoals repeats goals rather than shorter copy.
  hero:["من فكرة واضحة ","إلى منتج جاهز للإطلاق."],
  intro:"نساعدك تحوّل فكرتك إلى منتج وتجربة رقمية، من الاستراتيجية والتصميم إلى التطوير والذكاء الاصطناعي.",start:"شاركنا فكرتك",aside:"من أول سؤال،\nإلى منتج يؤدي غرضه.",disciplines:["استراتيجية","تصميم","تطوير"],
  goalTitle:"كيف نساعدك؟",goalIntro:"سواء عندك فكرة جديدة، منتج يحتاج تطوير، أو عمليات تستهلك وقت فريقك، نساعدك نبني الحل المناسب.",choices:["تطوير فكرة جديدة","تحسين مشروع قائم","دعم فريقك بالأتمتة"],
  mobileChoices:["تطوير فكرة جديدة","تحسين مشروع قائم","دعم فريقك بالأتمتة"],
  mobileGoals:[
   {title:"نحوّل الفكرة إلى أول نسخة قابلة للتجربة.",body:"نحدد الأولويات، نختبر التجربة، ونبني أول نسخة تركز على ما يحتاجه المستخدم فعلاً.",cta:"شاركنا إياها"},
   {title:"نحدد وين تتعثر التجربة، ونحسّنها.",body:"نراجع رحلة المستخدم، نحدد نقاط التعثر، ونحسّن التجربة بناءً على الاستخدام الفعلي.",cta:"حسّن منتجك معنا"},
   {title:"نقلل العمل المتكرر، ونبسّط سير العمل.",body:"نربط الأنظمة ونؤتمت الخطوات المتكررة لتقليل العمل اليدوي ورفع كفاءة العمليات.",cta:"بسّط طريقة العمل"},
  ],
  choiceHints:["نحوّل فكرتك إلى موقع، تطبيق، أو خدمة قابلة للإطلاق.","نحسّن التجربة ونخليها أوضح وأسهل للمستخدم.","نؤتمت المهام المتكررة ونبسّط سير العمل."],
  goals:[
   {title:"نحوّل الفكرة إلى أول نسخة قابلة للتجربة.",body:"نحدد الأولويات، نختبر التجربة، ونبني أول نسخة تركز على ما يحتاجه المستخدم فعلاً.",question:"وش الفكرة اللي ودك تطورها؟",cta:"شاركنا إياها",intent:"build"},
   {title:"نحدد وين تتعثر التجربة، ونحسّنها.",body:"نراجع رحلة المستخدم، نحدد نقاط التعثر، ونحسّن التجربة بناءً على الاستخدام الفعلي.",question:"وش الجزء اللي يحتاج تحسين؟",cta:"حسّن منتجك معنا",intent:"improve"},
   {title:"نقلل العمل المتكرر، ونبسّط سير العمل.",body:"نربط الأنظمة ونؤتمت الخطوات المتكررة لتقليل العمل اليدوي ورفع كفاءة العمليات.",question:"وش المهمة اللي تستهلك وقت فريقك؟",cta:"بسّط طريقة العمل",intent:"ai"},
  ],
  servicesTitle:"مجالات عملنا",servicesIntro:"نخطط لمنتجك، نصمم تجربته، ونطوّره بالتقنية المناسبة لاحتياجه.",allServices:"تعلّم المزيد",
  faqTitle:"الأسئلة الشائعة",faqs:[
   ["لازم تكون عندي كل المتطلبات؟","لا. يكفي تكون عندك فكرة أو احتياج واضح، ونساعدك نحدد المتطلبات والأولويات قبل ما نبدأ."],
   ["كيف نبدأ، وكم التكلفة؟","شاركنا فكرتك أو احتياجك، وبعدها نحدد نطاق المشروع والمدة والتكلفة قبل بدء التنفيذ."],
   ["تصمّمون بالعربي والإنجليزي؟","نعم. نصمم التجربة بالعربي والإنجليزي من البداية، مع مراعاة اللغة واتجاه القراءة في كل تجربة."],
   ["وش يصير بعد ما نطلق المنتج؟","يشمل نطاق العمل التسليم والتوثيق، ويمكن إضافة دعم بعد الإطلاق حسب احتياج المشروع."],
  ],endTitle:"فكرتك تستحق\nأن تكون واقعًا. نبدأ؟",endBody:"",endCta:"تواصل معنا",
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
   <div className="mx-capability-grid">{studioServices[locale].map((s,i)=><Link className={`mx-capability mx-capability-${i}`} data-mosaic-card key={s.slug} href={`${base}/services/${s.slug}`}><PixelMark variant={i}/><h3>{s.title}</h3><p>{"homeSummary" in s?s.homeSummary:s.summary}</p><span className="mx-capability-link" aria-hidden="true"><Icon name="arrow-right"/></span></Link>)}</div>
  </section>


  <section className="mx-human" dir={ar?"rtl":"ltr"} aria-labelledby="mx-belief-title"><div className="mx-wrap mx-editorial-card"><div className="mx-human-heading"><p className="mx-belief-label">{ar?"ما نؤمن به":"What we believe"}</p><h2 id="mx-belief-title">{ar?<>التقنية تبدأ<br/>من <em>الناس.</em></>:<>Good technology<br/>should feel <em>human.</em></>}</h2></div><p className="mx-belief-body">{ar?"نصمم منتجات واضحة وسهلة من البداية، ونبني تجارب تخدم احتياج المستخدم بدون تعقيد.":"Building software is getting easier. Using it should be, too. A website you can find your way around. An app that makes the next step clear. A system that simplifies the work instead of giving you more to learn."}</p></div></section>
  <section className="mx-faq mx-wrap mx-section" aria-labelledby="mx-faq-title"><div><h2 id="mx-faq-title">{c.faqTitle}</h2></div><div className="mx-faq-list">{c.faqs.map(([q,a])=><details key={q}><summary><span className="mx-faq-question">{q}</span><span aria-hidden="true"><Icon name="plus"/></span></summary><p>{a}</p></details>)}</div></section>

  <section className="mx-ending" aria-labelledby="mx-end-title"><div className="mx-wrap mx-editorial-card"><div className="mx-ending-grid"><h2 id="mx-end-title">{c.endTitle}</h2><div>{c.endBody&&<p>{c.endBody}</p>}<a className="mx-button" href={inquiryHref(locale)}>{c.endCta}<Arrow/></a></div></div></div></section>
 </div>;
}
