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
