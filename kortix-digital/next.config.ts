import type { NextConfig } from "next";
import { fileURLToPath } from "url";
import path from "path";
import { ALT_HOST, SITE_HOST, SITE_URL } from "./src/lib/site";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: dirname,
  },
  // Build into an isolated directory when NEXT_DIST_DIR is set (used for
  // verification builds so a running `next dev` server is never clobbered).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // One URL per page: no `/about/` duplicates of `/about`.
  trailingSlash: false,
  poweredByHeader: false,
  images: {
    // AVIF first (smallest), WebP as the fallback. next/image negotiates.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    // Unhashed files served straight out of /public. They are not
    // content-addressed, so they get a day of freshness plus a week of
    // stale-while-revalidate rather than the `immutable` treatment.
    const publicAsset = ["jpg", "jpeg", "png", "svg", "webp", "avif", "ico", "mp4", "woff2"];

    return [
      {
        // Hashed build output — safe to cache forever.
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // HTML and API responses always revalidate, so a deploy is live on the
        // next request instead of waiting for a CDN TTL to expire. API routes
        // are excluded from caching entirely.
        source: "/((?!api|_next).*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
      // Listed after the catch-all on purpose: Next applies the last matching
      // rule for a given header key.
      ...publicAsset.map((ext) => ({
        source: `/:path*.:ext(${ext})`,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      })),
    ];
  },
  async redirects() {
    return [
      // Apex -> canonical host (single hop, preserves path).
      {
        source: "/:path*",
        has: [{ type: "host", value: ALT_HOST }],
        destination: `${SITE_URL}/:path*`,
        permanent: true,
      },
      // http -> https on the canonical host. Combined with the rule above this
      // stays a single hop for `http://apex/...` requests.
      {
        source: "/:path*",
        has: [
          { type: "host", value: SITE_HOST },
          { type: "header", key: "x-forwarded-proto", value: "http" },
        ],
        destination: `${SITE_URL}/:path*`,
        permanent: true,
      },
      // Asset renamed to drop the spaces from the filename. Both the literal
      // and the percent-encoded form are listed because browsers/clients send
      // the encoded path. The original file is kept in /public as a fallback
      // alias so the old URL can never hard-404.
      {
        source: "/Kortix Favicon .png",
        destination: "/kortix-favicon.png",
        permanent: true,
      },
      {
        source: "/Kortix%20Favicon%20.png",
        destination: "/kortix-favicon.png",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
