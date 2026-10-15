/**
 * SEO check — run against a production build.
 *
 *   npm run build
 *   npm run start            # or: npm run start -- -p 3000
 *   npm run seo:check        # SEO_BASE_URL=http://localhost:3000 by default
 *
 * Exits non-zero when anything fails, so it can gate a deploy. No dependencies:
 * it crawls the rendered HTML the way a search engine would (fetch + parse).
 *
 * What it checks:
 *   - robots.txt: sitemap reference, no blocking of /_next/static or /_next/image
 *   - sitemap.xml: every URL returns 200, is indexable and is self-canonical
 *   - titles, meta descriptions and H1s: present, unique, sensible length
 *   - canonicals: absolute, on the canonical host, matching the page URL
 *   - internal links in the HTML: all resolve (no 404s)
 *   - images: every <img> has an alt attribute (empty alt is fine if decorative)
 *   - JSON-LD: parses, required fields present, and FAQ/price/duration values
 *     actually appear in the visible text
 */

import { setTimeout as sleep } from "node:timers/promises";

const BASE = (process.env.SEO_BASE_URL ?? "http://localhost:3000").replace(/\/+$/, "");
const CONCURRENCY = 4;

type Level = "error" | "warn";
interface Finding {
  level: Level;
  page: string;
  message: string;
}

const findings: Finding[] = [];
const error = (page: string, message: string) => findings.push({ level: "error", page, message });
const warn = (page: string, message: string) => findings.push({ level: "warn", page, message });

/* ------------------------------------------------------------------ helpers */

function text(value: string): string {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

/** Digits only, so "₦100,000", "100000" and "100,000" can be compared. */
function digitsOnly(value: string): string {
  return value.replace(/[^0-9]/g, "");
}

function matchAll(html: string, pattern: RegExp): string[] {
  return [...html.matchAll(pattern)].map((m) => m[1] ?? "");
}

interface PageReport {
  url: string;
  path: string;
  status: number;
  html: string;
  title: string | null;
  description: string | null;
  canonical: string | null;
  robots: string | null;
  h1s: string[];
  visibleText: string;
}

function parsePage(path: string, status: number, html: string): PageReport {
  return {
    url: path,
    path,
    status,
    html,
    title: (() => {
      const raw = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
      return raw ? decodeEntities(raw) : null;
    })(),
    description:
      (() => {
        const raw = html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i)?.[1];
        return raw ? decodeEntities(raw) : null;
      })(),
    canonical:
      html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i)?.[1] ?? null,
    robots: html.match(/<meta[^>]+name="robots"[^>]+content="([^"]*)"/i)?.[1] ?? null,
    h1s: matchAll(html, /<h1[^>]*>([\s\S]*?)<\/h1>/gi).map((h) => text(h)),
    visibleText: text(html),
  };
}

async function get(url: string): Promise<{ status: number; body: string }> {
  const res = await fetch(url, { redirect: "manual" });
  const body = await res.text();
  return { status: res.status, body };
}

async function mapLimited<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = [];
  let index = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (index < items.length) {
      const current = index++;
      results[current] = await fn(items[current]);
    }
  });
  await Promise.all(workers);
  return results;
}

function isSameOrigin(href: string, origin: string): boolean {
  try {
    return new URL(href, origin).origin === new URL(origin).origin;
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------- checks */

interface JsonLdRequirement {
  fields: string[];
  /** Fields that must contain at least one entry in an array. */
  arrayFields?: string[];
}

const REQUIRED: Record<string, JsonLdRequirement> = {
  Organization: { fields: ["name", "url", "logo"] },
  EducationalOrganization: { fields: ["name", "url"] },
  ProfessionalService: { fields: ["name", "url"] },
  WebSite: { fields: ["name", "url"] },
  Service: { fields: ["name", "description", "provider", "url"] },
  Course: {
    fields: ["name", "description", "provider", "offers", "hasCourseInstance"],
    arrayFields: ["hasCourseInstance"],
  },
  FAQPage: { fields: ["mainEntity"], arrayFields: ["mainEntity"] },
  BreadcrumbList: { fields: ["itemListElement"], arrayFields: ["itemListElement"] },
  Article: { fields: ["headline", "description", "dateModified", "author"] },
  Question: { fields: ["name", "acceptedAnswer"] },
  Offer: { fields: ["price", "priceCurrency", "availability"] },
  CourseInstance: { fields: ["courseMode", "duration"] },
};

function checkJsonLd(page: PageReport): void {
  const blocks = [
    ...page.html.matchAll(
      /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ].map((m) => m[1]);

  if (blocks.length === 0) {
    error(page.path, "no JSON-LD found on the page");
    return;
  }

  const seenTypes = new Set<string>();

  const visit = (node: unknown, path = ""): void => {
    if (Array.isArray(node)) {
      node.forEach((child) => visit(child, path));
      return;
    }
    if (!node || typeof node !== "object") return;

    const record = node as Record<string, unknown>;
    const types = Array.isArray(record["@type"])
      ? (record["@type"] as string[])
      : typeof record["@type"] === "string"
        ? [record["@type"] as string]
        : [];

    for (const type of types) {
      seenTypes.add(type);
      const requirement = REQUIRED[type];
      if (!requirement) continue;

      for (const field of requirement.fields) {
        const value = record[field];
        const empty =
          value === undefined ||
          value === null ||
          (typeof value === "string" && value.trim() === "") ||
          (Array.isArray(value) && value.length === 0);
        if (empty) error(page.path, `${type} is missing "${field}"`);
      }

      for (const field of requirement.arrayFields ?? []) {
        const value = record[field];
        if (Array.isArray(value) && value.length === 0) {
          error(page.path, `${type}.${field} is an empty array`);
        }
      }
    }

    for (const [key, value] of Object.entries(record)) {
      if (key.startsWith("@")) continue;
      visit(value, `${path}.${key}`);
    }
  };

  for (const block of blocks) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(block);
    } catch (cause) {
      error(page.path, `JSON-LD does not parse: ${(cause as Error).message}`);
      continue;
    }
    visit(parsed);
  }

  // Every page should describe where it sits in the site.
  if (!seenTypes.has("BreadcrumbList") && page.path !== "/" && page.path !== "/_not-found") {
    warn(page.path, "no BreadcrumbList JSON-LD");
  }

  // FAQ answers must be visible on the page, not only in the markup.
  const faqAnswers = [...page.html.matchAll(/"acceptedAnswer"[\s\S]*?"text":"([^"]+)"/g)].map(
    (m) => decodeEntities(m[1].replace(/\\"/g, '"').replace(/\\n/g, " ")),
  );
  for (const answer of faqAnswers) {
    const probe = answer.slice(0, 60).replace(/\s+/g, " ");
    if (probe.length > 20 && !page.visibleText.includes(probe)) {
      warn(page.path, `FAQPage answer is not visible on the page: "${probe.slice(0, 50)}…"`);
    }
  }

  // Course price/duration must match what a visitor can read.
  const courses = [...page.html.matchAll(/"@type":"Course"[\s\S]*?"offers":\{"@type":"Offer"[^}]*"price":(\d+)[\s\S]*?"duration":"(P[^"]+)"/g)];
  for (const [, price, duration] of courses) {
    const formatted = Number(price).toLocaleString("en-NG");
    if (!digitsOnly(page.visibleText).includes(digitsOnly(price))) {
      error(page.path, `Course schema price ${price} does not appear in the visible text`);
    }
    void formatted;

    const iso = duration.match(/^P(\d+)([YMD])$/);
    if (iso) {
      const [, amount, unit] = iso;
      const word = { Y: "year", M: "month", D: "day" }[unit] ?? "";
      const phrase = `${amount} ${word}`;
      if (!page.visibleText.toLowerCase().includes(phrase)) {
        error(page.path, `Course duration ${duration} does not match visible text ("${phrase}")`);
      }
    }
  }
}

function checkMeta(page: PageReport, seen: Map<string, string[]>): void {
  if (page.status !== 200) {
    error(page.path, `sitemap URL returned HTTP ${page.status}`);
    return;
  }

  if (!page.title) error(page.path, "missing <title>");
  else {
    if (page.title.length < 25 || page.title.length > 70) {
      warn(page.path, `title length ${page.title.length} (aim for 50-60): "${page.title}"`);
    }
    const bucket = seen.get(`title:${page.title}`) ?? [];
    bucket.push(page.path);
    seen.set(`title:${page.title}`, bucket);
  }

  if (!page.description) error(page.path, "missing meta description");
  else {
    if (page.description.length < 100 || page.description.length > 170) {
      warn(
        page.path,
        `description length ${page.description.length} (aim for 140-160)`,
      );
    }
    const bucket = seen.get(`desc:${page.description}`) ?? [];
    bucket.push(page.path);
    seen.set(`desc:${page.description}`, bucket);
  }

  if (page.h1s.length === 0) error(page.path, "no H1");
  else if (page.h1s.length > 1) {
    error(page.path, `${page.h1s.length} H1 elements: ${page.h1s.join(" | ")}`);
  } else {
    const bucket = seen.get(`h1:${page.h1s[0]}`) ?? [];
    bucket.push(page.path);
    seen.set(`h1:${page.h1s[0]}`, bucket);
  }

  // Canonical: absolute, self-referencing, on the canonical host.
  if (!page.canonical) {
    error(page.path, "missing rel=canonical");
  } else {
    const canonical = page.canonical;
    if (!/^https?:\/\//.test(canonical)) {
      error(page.path, `canonical is not absolute: ${canonical}`);
    } else {
      const canonicalUrl = new URL(canonical);
      const expectedHost = new URL(CANONICAL_HOST).host;
      if (canonicalUrl.host !== expectedHost) {
        error(
          page.path,
          `canonical host ${canonicalUrl.host} does not match the canonical host ${expectedHost}`,
        );
      }
      const normalize = (value: string) => value.replace(/\/+$/, "");
      if (normalize(canonicalUrl.pathname) !== normalize(page.path)) {
        error(page.path, `canonical points at ${canonicalUrl.pathname}`);
      }
      if (page.path === "/" && /^https?:\/\/www\./.test(canonical) === false) {
        // Purely informational: the apex/www choice must be consistent, not
        // necessarily www.
        warn(page.path, `root canonical is ${canonical}`);
      }
    }
  }

  if (page.robots?.includes("noindex")) {
    error(page.path, "listed in the sitemap but marked noindex");
  }

  // Images.
  const imgTags = page.html.match(/<img\b[^>]*>/gi) ?? [];
  const withoutAlt = imgTags.filter((tag) => !/\balt=/.test(tag));
  if (withoutAlt.length > 0) {
    error(page.path, `${withoutAlt.length} <img> without an alt attribute`);
  }

  checkJsonLd(page);
}

/* --------------------------------------------------------------------- main */

let CANONICAL_HOST = "";

async function main(): Promise<void> {
  console.log(`SEO check against ${BASE}\n`);

  // --- sitemap.xml (first, so the canonical host is known) -----------------
  const sitemap = await get(`${BASE}/sitemap.xml`);
  if (sitemap.status !== 200) {
    error("/sitemap.xml", `returned HTTP ${sitemap.status}`);
    report();
    return;
  }

  const urls = matchAll(sitemap.body, /<loc>([^<]+)<\/loc>/g).map(decodeEntities);
  if (urls.length === 0) {
    error("/sitemap.xml", "contains no URLs");
    report();
    return;
  }

  CANONICAL_HOST = new URL(urls[0]).origin;
  console.log(`Canonical host: ${CANONICAL_HOST} (${urls.length} sitemap URLs)\n`);

  // --- robots.txt ---------------------------------------------------------
  // Checked after the sitemap so the expected host is the canonical one, not
  // whatever host this script happens to run against.
  const robots = await get(`${BASE}/robots.txt`);
  if (robots.status !== 200) {
    error("/robots.txt", `returned HTTP ${robots.status}`);
  } else {
    const sitemapLine = robots.body.match(/^Sitemap:\s*(\S+)/im)?.[1];
    if (!sitemapLine) error("/robots.txt", "has no Sitemap: line");
    else if (new URL(sitemapLine).origin !== CANONICAL_HOST) {
      error(
        "/robots.txt",
        `sitemap points at ${new URL(sitemapLine).origin}, expected ${CANONICAL_HOST}`,
      );
    }

    for (const blocked of ["/_next/static", "/_next/image"]) {
      if (new RegExp(`^Disallow:\\s*${blocked}`, "im").test(robots.body)) {
        error(
          "/robots.txt",
          `blocks ${blocked}, which stops Google rendering the site properly`,
        );
      }
    }

    // A page that must not be indexed should not be crawl-blocked either, or
    // Google can never see the noindex.
    if (/^Disallow:\s*\/(privacy-policy|terms-of-service|refund-policy)/im.test(robots.body)) {
      warn("/robots.txt", "disallows a legal page that should be indexable");
    }
  }

  for (const url of urls) {
    if (!url.startsWith(CANONICAL_HOST)) {
      error("/sitemap.xml", `URL on a different host: ${url}`);
    }
    if (!sitemap.body.includes("<lastmod>")) {
      warn("/sitemap.xml", "no lastmod values");
    }
  }

  // --- crawl each sitemap URL --------------------------------------------
  const seen = new Map<string, string[]>();
  const pages = await mapLimited(urls, CONCURRENCY, async (url) => {
    const path = new URL(url).pathname;
    // The sitemap lists canonical (www) URLs; the check runs against BASE, so
    // rewrite the origin while keeping the path.
    const { status, body } = await get(`${BASE}${path}`);
    return parsePage(path, status, body);
  });

  for (const page of pages) checkMeta(page, seen);

  // Duplicate detection.
  for (const [key, paths] of seen) {
    if (paths.length > 1) {
      const kind = key.split(":")[0];
      error(paths.join(", "), `duplicate ${kind} across ${paths.length} pages`);
    }
  }

  // --- internal links -----------------------------------------------------
  const internal = new Set<string>();
  for (const page of pages) {
    for (const href of matchAll(page.html, /href="([^"]+)"/g).map(decodeEntities)) {
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("http") && !isSameOrigin(href, BASE)
      ) {
        continue;
      }
      if (!isSameOrigin(href, BASE)) continue;
      const target = new URL(href, BASE);
      if (target.protocol !== "http:" && target.protocol !== "https:") continue;
      internal.add(`${target.pathname}${target.search}`);
    }
  }

  const linkTargets = [...internal].filter((href) => !href.startsWith("/_next"));
  const checks = await mapLimited(linkTargets, CONCURRENCY, async (href) => {
    const res = await fetch(`${BASE}${href}`, { redirect: "manual" });
    return { href, status: res.status };
  });
  const broken = checks.filter((c) => c.status >= 400);
  if (broken.length > 0) {
    error(
      "internal links",
      `${broken.length} broken: ${broken.map((b) => `${b.href} (${b.status})`).join(", ")}`,
    );
  }
  console.log(`Checked ${linkTargets.length} internal links.`);

  // --- 404 behaviour ------------------------------------------------------
  const notFound = await get(`${BASE}/this-page-does-not-exist-seo-check`);
  if (notFound.status !== 404) {
    error("/this-page-does-not-exist-seo-check", `expected 404, got ${notFound.status}`);
  }

  // --- www / non-www ------------------------------------------------------
  const otherHost = CANONICAL_HOST.includes("://www.")
    ? CANONICAL_HOST.replace("://www.", "://")
    : CANONICAL_HOST.replace("://", "://www.");
  const redirect = await fetch(otherHost, { redirect: "manual" });
  if (redirect.status < 300 || redirect.status >= 400) {
    warn(
      otherHost,
      `expected the non-canonical host to redirect, saw HTTP ${redirect.status}`,
    );
  }

  report();
}

function report(): void {
  const errors = findings.filter((f) => f.level === "error");
  const warnings = findings.filter((f) => f.level === "warn");

  if (warnings.length > 0) {
    console.log(`\nWarnings (${warnings.length}):`);
    for (const f of warnings) console.log(`  ~ ${f.page} — ${f.message}`);
  }

  if (errors.length > 0) {
    console.log(`\nErrors (${errors.length}):`);
    for (const f of errors) console.log(`  ✗ ${f.page} — ${f.message}`);
    console.log("\nFAILED");
    process.exitCode = 1;
    return;
  }

  console.log("\nPASSED — no SEO errors found.");
}

main().catch(async (cause) => {
  console.error("\nseo-check could not complete:", cause);
  await sleep(0);
  process.exitCode = 1;
});
