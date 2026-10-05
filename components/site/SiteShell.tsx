"use client";

import Icon from "@/components/Icon";
import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import MosaicCardField from "@/components/mosaic/MosaicCardField";
import SiteMotion from "./SiteMotion";
import SiteFooter from "./SiteFooter";
import MuseLogo from "@/components/MuseLogo";
import {CONTACT_EMAIL,contactHref,inquiryHref,WHATSAPP_URL} from "@/lib/contact";
import LocaleSwitch from "@/components/LocaleSwitch";

export default function SiteShell({children}: {children: ReactNode}) {
  const ar = useLocale() === "ar";
  const base = "";
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    // Lock the viewport, not body: body overflow creates a new scroll
    // container and detaches the sticky header from the scrolled viewport.
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const close = () => {setOpen(false); toggle.current?.focus({preventScroll:true});};
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); close(); }
      if (e.key === "Tab") {
        const targets = Array.from(header.current?.querySelectorAll<HTMLElement>('a[href],button') || []).filter(el => el.getClientRects().length);
        const first = targets[0], last = targets[targets.length - 1];
        if(e.shiftKey && document.activeElement === first) {e.preventDefault();last?.focus({preventScroll:true});}
        if(!e.shiftKey && document.activeElement === last) {e.preventDefault();first?.focus({preventScroll:true});}
      }
    };
    const media = matchMedia("(min-width: 800px)");
    const resize = () => {if(media.matches) setOpen(false);};
    addEventListener("keydown", key); media.addEventListener("change", resize);
    return () => {document.documentElement.style.overflow = previous;removeEventListener("keydown",key);media.removeEventListener("change",resize);};
  },[open]);
  const links = [
    [base+"/services", ar?"مجالات عملنا":"What we build"],
    [base+"/about", ar?"عن Muse":"The studio"],
  ];
  return <div className="direction-site direction-mosaic" data-page={path === "/" ? "home" : path}>
    <SiteMotion/>
    <header ref={header} className="dir-header">
      <div className="dir-header-inner">
        <Link href="/" className="dir-brand" aria-label={ar?"ميوز، الرئيسية":"Muse, home"} onClick={()=>setOpen(false)}><MuseLogo iconClassName="dir-logo" /></Link>
        <nav className="dir-desktop-nav" aria-label={ar?"التنقل الرئيسي":"Main navigation"}>{links.map(([href,label])=><Link key={href} href={href} aria-current={path===href?"page":path.startsWith(href+"/")?"true":undefined}>{label}</Link>)}</nav>
        <div className="dir-header-actions"><LocaleSwitch className="dir-locale"/><a href={inquiryHref(ar?"ar":"en")} className="dir-header-cta">{ar?"تواصل معنا":"Let's talk"}<Icon name="arrow-up-right"/></a><button ref={toggle} className="dir-menu-toggle" aria-expanded={open} aria-controls="direction-navigation" aria-label={open?(ar?"إغلاق القائمة":"Close menu"):(ar?"فتح القائمة":"Open menu")} onClick={()=>setOpen(v=>!v)}><span className="dir-menu-icon" aria-hidden="true"><i/><i/></span></button></div>
      </div>
      <nav id="direction-navigation" className="dir-mobile-nav" aria-label={ar?"قائمة الجوال":"Mobile navigation"} hidden={!open}>
        {links.map(([href,label],i)=><Link key={href} href={href} onClick={()=>setOpen(false)}><span>{String(i+1).padStart(2,"0")}</span>{label}<Icon name="arrow-up-right"/></Link>)}
        <a href={inquiryHref(ar?"ar":"en")} onClick={()=>setOpen(false)}>{ar?"احكِ لنا عن فكرتك":"Tell us your idea"}<Icon name="arrow-up-right"/></a>
        <a className="dir-menu-email" href={contactHref(ar?"ar":"en")} dir="ltr">{CONTACT_EMAIL}</a><a className="dir-menu-email" href={WHATSAPP_URL}>{ar?"واتساب":"WhatsApp"} <Icon name="arrow-up-right"/></a>
      </nav>
    </header>
    <main id="main-content" tabIndex={-1} inert={open}>
      {/* Isolate homepage hydration without streaming pages that need to return
          an HTTP redirect or 404 before their response headers are committed. */}
      {/* The fallback fills the viewport so the footer starts below the fold: if
          it painted mid-screen, the arriving page would push it down (CLS 0.26). */}
      {path === "/" ? <Suspense fallback={<div className="route-state route-state-home shell" role="status">{ar?"جارٍ تحميل الصفحة…":"Loading the page…"}</div>}>{children}</Suspense> : children}
    </main>
    <div inert={open}><SiteFooter/></div>
    <MosaicCardField/>
  </div>;
}
