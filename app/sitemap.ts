import type { MetadataRoute } from "next";
import {
  services,
  insights,
  playbooks,
  newsletters,
  careerRoles,
  insightCategories,
  insightCategorySlug,
} from "../lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://muse.sa";
  const now = new Date();

  return [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/explore`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/insights`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/playbooks`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/newsletter`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/get-started`, lastModified: now, changeFrequency: "yearly", priority: 0.9 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...insights.map((insight) => ({
      url: `${baseUrl}/insights/${insight.slug}`,
      lastModified: new Date(insight.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...insightCategories.map((category) => ({
      url: `${baseUrl}/insights/${insightCategorySlug(category)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...playbooks.map((playbook) => ({
      url: `${baseUrl}/playbooks/${playbook.slug}`,
      lastModified: new Date(playbook.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...newsletters.map((issue) => ({
      url: `${baseUrl}/newsletter/${issue.slug}`,
      lastModified: new Date(issue.date),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...careerRoles
      .filter((role) => role.slug)
      .map((role) => ({
        url: `${baseUrl}/careers/${role.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
  ];
}
