/**
 * Single source of truth for site-wide constants (host, brand, contact).
 *
 * Canonical host decision (verified 2026-10-14): requests to the apex host
 * `kortixdigital.com` are redirected by the host to `www.kortixdigital.com`,
 * so `www` is the host that actually serves content. We therefore advertise
 * `www` in canonicals, `og:url`, the sitemap, `robots.txt` and JSON-LD.
 *
 * Override with `NEXT_PUBLIC_SITE_URL` if the hosting redirect is ever flipped.
 */
const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kortixdigital.com";

/** Absolute origin, no trailing slash. e.g. "https://www.kortixdigital.com" */
export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");

const parsedSiteUrl = new URL(SITE_URL);

/** Hostname that serves the site, e.g. "www.kortixdigital.com" */
export const SITE_HOST = parsedSiteUrl.host;

/** The other host that must 301 to SITE_HOST, e.g. "kortixdigital.com" */
export const ALT_HOST = SITE_HOST.startsWith("www.")
  ? SITE_HOST.slice(4)
  : `www.${SITE_HOST}`;

/** URL scheme of the canonical origin, e.g. "https" */
export const SITE_PROTOCOL = parsedSiteUrl.protocol.replace(":", "");

export const SITE_NAME = "Kortix Digital";
export const SITE_TAGLINE = "We Build. We Teach. We Transform.";

export const CONTACT_EMAIL = "kortixdigital@gmail.com";
/** WhatsApp number in E.164 format (used by schema.org contact points). */
export const WHATSAPP_NUMBER_E164 = "+2347071617216";
export const WHATSAPP_DISPLAY = "+234 707 161 7216";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER_E164.replace(/\D/g, "")}`;
export const DISCORD_URL = "https://discordapp.com/users/1466951307708469516";

/**
 * ISO date the shared, site-wide content (navigation, footer, legal copy)
 * last changed. Used as a real `lastModified` in the sitemap instead of
 * `new Date()` so the value does not change on every build.
 */
export const SITE_CONTENT_UPDATED = "2026-10-14";

/** Build an absolute URL on the canonical host. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, `${SITE_URL}/`).toString();
}
