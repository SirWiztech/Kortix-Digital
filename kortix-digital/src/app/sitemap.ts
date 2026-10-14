import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { cohorts } from "@/data/cohorts";
import { blogPosts } from "@/data/blog";
import { absoluteUrl, SITE_CONTENT_UPDATED } from "@/lib/site";

/**
 * `lastModified` comes from real content dates (see `updated` on each service
 * and cohort, and SITE_CONTENT_UPDATED for shared pages) — never `new Date()`,
 * so the value only changes when content actually changes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: SITE_CONTENT_UPDATED, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/services"), lastModified: SITE_CONTENT_UPDATED, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/cohorts"), lastModified: SITE_CONTENT_UPDATED, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/request"), lastModified: SITE_CONTENT_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/about"), lastModified: SITE_CONTENT_UPDATED, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/contact"), lastModified: SITE_CONTENT_UPDATED, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/blog"), lastModified: SITE_CONTENT_UPDATED, changeFrequency: "weekly", priority: 0.5 },
    { url: absoluteUrl("/privacy-policy"), lastModified: SITE_CONTENT_UPDATED, changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/terms-of-service"), lastModified: SITE_CONTENT_UPDATED, changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/refund-policy"), lastModified: SITE_CONTENT_UPDATED, changeFrequency: "yearly", priority: 0.2 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified: service.updated ?? SITE_CONTENT_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const cohortPages: MetadataRoute.Sitemap = cohorts.map((cohort) => ({
    url: absoluteUrl(`/cohorts/${cohort.slug}`),
    lastModified: cohort.updated ?? SITE_CONTENT_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Only published posts are listed; drafts stay out of the index.
  const blogPages: MetadataRoute.Sitemap = blogPosts
    .filter((post) => post.published)
    .map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.updated,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    }));

  return [...staticPages, ...servicePages, ...cohortPages, ...blogPages];
}
