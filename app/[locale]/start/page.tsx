import ProjectInquiry from "@/components/inquiry/ProjectInquiry";
import {buildMetadata} from "@/lib/seo";
import {getTranslations,setRequestLocale} from "next-intl/server";
import {isIntent} from "@/lib/project-inquiry";
import type {Locale} from "@/i18n/routing";

type Props={params:Promise<{locale:Locale}>;searchParams:Promise<{intent?:string}>};
export async function generateMetadata({params}:Props){const {locale}=await params;return buildMetadata({title:locale==='ar'?'تواصل معنا':"Let’s talk about your idea",description:(await getTranslations({locale,namespace:"Metadata"}))("start.description"),path:'/start',locale});}
export default async function StartPage({params,searchParams}:Props){const {locale}=await params;const {intent}=await searchParams;setRequestLocale(locale);return <ProjectInquiry initialIntent={isIntent(intent)?intent:undefined}/>;}
