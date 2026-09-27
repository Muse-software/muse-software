import ProjectInquiry from "@/components/inquiry/ProjectInquiry";
import {buildMetadata} from "@/lib/seo";
import {setRequestLocale} from "next-intl/server";
import {isIntent} from "@/lib/project-inquiry";
import type {Locale} from "@/i18n/routing";

type Props={params:Promise<{locale:Locale}>;searchParams:Promise<{intent?:string}>};
export async function generateMetadata({params}:Props){const {locale}=await params;return buildMetadata({title:locale==='ar'?'نتكلم عن فكرتك':"Let’s talk about your idea",description:locale==='ar'?'احكِ لنا عن مشروعك، ونجهّز لك إيميل بإجاباتك.':'Tell us about your project and prepare an email with your answers.',path:'/start',locale});}
export default async function StartPage({params,searchParams}:Props){const {locale}=await params;const {intent}=await searchParams;setRequestLocale(locale);return <ProjectInquiry initialIntent={isIntent(intent)?intent:undefined}/>;}
