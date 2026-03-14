import type { MetadataRoute } from "next";
import { caseStudies, insights, services } from "../lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://muse.sa";
  const now = new Date();

  return [
    { url: baseUrl, lastModified: now },
    { url: `${baseUrl}/about`, lastModified: now },
    { url: `${baseUrl}/insights`, lastModified: now },
    { url: `${baseUrl}/contact`, lastModified: now },
    { url: `${baseUrl}/privacy`, lastModified: now },
    { url: `${baseUrl}/terms`, lastModified: now },
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: now,
    })),
    ...caseStudies.map((study) => ({
      url: `${baseUrl}/case-studies/${study.slug}`,
      lastModified: now,
    })),
    ...insights.map((insight) => ({
      url: `${baseUrl}/insights/${insight.slug}`,
      lastModified: now,
    })),
  ];
}
