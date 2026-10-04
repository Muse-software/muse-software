import {SiteServices} from "@/components/site/SitePages";
import JsonLd from "@/components/JsonLd";
import {buildBreadcrumbJsonLd,buildMetadata} from "@/lib/seo";
import {getTranslations,setRequestLocale} from "next-intl/server";
import type {Locale} from "@/i18n/routing";
type Props={params:Promise<{locale:Locale}>};
export async function generateMetadata({params}:Props){const {locale}=await params;return buildMetadata({title:locale==="ar"?"ماذا نبني":"What we build",description:(await getTranslations({locale,namespace:"Metadata"}))("services.description"),path:"/services",locale});}
export default async function Page({params}:Props){const {locale}=await params;setRequestLocale(locale);return <><JsonLd data={buildBreadcrumbJsonLd(locale,[{name:locale==="ar"?"ماذا نبني":"What we build",path:"/services"}])}/><SiteServices locale={locale}/></>;}
