import {SiteLegal} from "@/components/site/SitePages";
import {buildMetadata} from "@/lib/seo";
import {getTranslations,setRequestLocale} from "next-intl/server";
import type {Locale} from "@/i18n/routing";
type Props={params:Promise<{locale:Locale}>};
export async function generateMetadata({params}:Props){const {locale}=await params;return buildMetadata({title:locale==="ar"?"الخصوصية":"Privacy",description:(await getTranslations({locale,namespace:"Metadata"}))("privacy.description"),path:"/privacy",locale});}
export default async function Page({params}:Props){const {locale}=await params;setRequestLocale(locale);return <SiteLegal locale={locale} base="" kind="privacy"/>;}
