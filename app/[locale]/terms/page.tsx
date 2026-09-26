import {SiteLegal} from "@/components/site/SitePages";
import {buildMetadata} from "@/lib/seo";
import {setRequestLocale} from "next-intl/server";
import type {Locale} from "@/i18n/routing";
type Props={params:Promise<{locale:Locale}>};
export async function generateMetadata({params}:Props){const {locale}=await params;return buildMetadata({title:locale==="ar"?"الشروط":"Terms",description:locale==="ar"?"ميوز — استوديو لتصميم وتطوير المنتجات الرقمية.":"Muse — a studio for thoughtful digital products.",path:"/terms",locale});}
export default async function Page({params}:Props){const {locale}=await params;setRequestLocale(locale);return <SiteLegal locale={locale} base="" kind="terms"/>;}
