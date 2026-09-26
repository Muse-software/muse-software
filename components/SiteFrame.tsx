"use client";
import type {ReactNode} from "react";
import SiteShell from "@/components/site/SiteShell";
export default function SiteFrame({children}:{children:ReactNode}){return <SiteShell>{children}</SiteShell>;}
