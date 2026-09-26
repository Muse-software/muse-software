import {notFound} from "next/navigation";
import {SiteService} from "@/components/site/SitePages";
import {studioServices} from "@/lib/studio-services";
import {buildMetadata} from "@/lib/seo";
import {setRequestLocale} from "next-intl/server";
import type {Locale} from "@/i18n/routing";
type Props={params:Promise<{locale:Locale;slug:string}>};
export async function generateMetadata({params}:Props){const {locale,slug}=await params;const s=studioServices[locale]?.find(s=>s.slug===slug);return s?buildMetadata({title:s.title,description:s.summary,path:`/services/${slug}`,locale}):{};}
export default async function Page({params}:Props){const {locale,slug}=await params;setRequestLocale(locale);if(!studioServices[locale].some(s=>s.slug===slug))notFound();return <SiteService locale={locale} slug={slug}/>;}
