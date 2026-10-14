import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Crawling is fully open except for API endpoints (which never belong in the
 * index). `/_next/static` and `/_next/image` are intentionally NOT blocked:
 * blocking them stops Google from rendering pages properly.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
