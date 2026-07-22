import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { cohorts } from "@/data/cohorts";

const baseUrl = "https://kortixdigital.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/cohorts`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/request`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const cohortPages: MetadataRoute.Sitemap = cohorts.map((c) => ({
    url: `${baseUrl}/cohorts/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages, ...cohortPages];
}
