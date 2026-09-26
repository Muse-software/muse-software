"use client";
import {useLocale} from "next-intl";
import {Link} from "@/i18n/navigation";
import MuseLogo from "@/components/MuseLogo";
import {CONTACT_EMAIL,contactHref,WHATSAPP_URL,WHATSAPP_NUMBER,SOCIAL_LINKS} from "@/lib/contact";
import LocaleSwitch from "@/components/LocaleSwitch";
export default function SiteFooter(){const ar=useLocale()==="ar",base="";return (    <footer className="dir-footer">
      <div className="dir-footer-top"><Link href="/" aria-label={ar?"ميوز، الرئيسية":"Muse, home"}><MuseLogo iconClassName="dir-footer-logo"/></Link><p>{ar?"أفكار تستحق أن تصبح واقعًا.":"Good ideas deserve to happen."}</p><a href={contactHref(ar?"ar":"en")} dir="ltr">{CONTACT_EMAIL} ↗</a></div>
      <div className="dir-footer-connections">
        <a className="dir-whatsapp" href={WHATSAPP_URL}><span>{ar?"واتساب":"WhatsApp"}</span><span dir="ltr">{WHATSAPP_NUMBER}</span><span aria-hidden="true">↗</span></a>
        <nav className="dir-socials" aria-label={ar?"حسابات ميوز":"Muse on social media"}>{SOCIAL_LINKS.map(s=><a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label}${ar?" — يفتح في نافذة جديدة":" — opens in a new tab"}`}>{s.label}<span aria-hidden="true">↗</span></a>)}</nav>
      </div>
      <div className="dir-footer-bottom"><span>© {new Date().getFullYear()} Muse Studios</span><nav aria-label={ar?"روابط الموقع":"Footer navigation"}><Link href={base+"/services"}>{ar?"الخدمات":"Services"}</Link><Link href={base+"/about"}>{ar?"عن ميوز":"About"}</Link><Link href={base+"/privacy"}>{ar?"الخصوصية":"Privacy"}</Link><Link href={base+"/terms"}>{ar?"الشروط":"Terms"}</Link><LocaleSwitch fullLabel/></nav></div>
    </footer>
);}
