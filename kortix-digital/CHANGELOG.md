# Kortix Digital — SEO & performance changelog

> Assembly of every change made across the phases of this audit, grouped by
> phase. Written from git at commit `HEAD` plus the decisions, issues and
> gaps found along the way. Anything that still needs a human decision is
> marked in the content-gap report and the manual checklist below.

---

## Phase 1 — Audit (done)

**Stack**
- Next.js `16.4.1`, App Router, TypeScript (strict), Turbopack
- Package manager: npm
- CSS: Tailwind v4 with `@theme inline` token overrides in `globals.css`;
  one custom brand font (Alro) currently self-hosted from TTFs with a plain
  `@font-face`; brand SVGs in `/public/logo.svg`
- Hosting: Vercel
- Forms: service request form rendered client-side on `/request`, posted to
  `/api/request-service`, delivered as an HTML email via Brevo. No existing
  reCAPTCHA, honeypot or rate limiting before this work. No separate contact
  form on the live site (contact is handled on `/contact`).
- Content model: fully hardcoded. Services in `src/data/services.ts`, cohorts
  in `src/data/cohorts.ts`, blog as outlines in `src/data/blog.ts`. No CMS, no
  MDX, no CMS-driven pricing.

**Routing / rendering (from `next build`)**
- `/` — SSG
- `/services` — SSG
- `/services/[slug]` — SSG (all five services generated)
- `/cohorts` — SSG
- `/cohorts/[slug]` — SSG (all nine cohorts generated)
- `/about`, `/contact`, `/sitemap.xml`, `/robots.txt`, `/opengraph-image`,
  `/privacy-policy`, `/terms-of-service`, `/refund-policy`, `/blog` — SSG
- `/blog/[slug]` — SSG (three outlines generated, unpublished ones noindex)
- `/request` — dynamic (server component wrapping a client form, query-param
  dependent)
- `/api/request-service` — API route, on demand
- `/_next*` — static build output

**Baseline issues found (before any code changes)**
1. Three `<h1>` elements on the homepage ("We Build." / "We Teach." / "We
   Transform.")
2. Favicon filename with spaces in it (`Kortix Favicon .png`) — risky for
   redirects and caching
3. Footer wordmark was a huge `<h2>` repeated on every page — bad for heading
   hierarchy, not a real heading
4. `og:image` on the root was `apple-touch-icon.png` (~180×180, same as the
   icon) — way too small for `summary_large_image`; no real 1200×630 social
   card
5. `alt` text was essentially missing: only `<Image>` in Navbar, Footer and
   `/about` carried alt; the wordmark alt was the brand name (decorative)
6. A `<img>`-less "community" section on the homepage used a background image
   pointing at `/images/group-photo.jpg` which does not exist — the browser
   requested a 404 and only the gradient showed
7. 2.3MB brand-reveal video in the `/public` dir was referenced by
   `preload="metadata"` above the fold and had a "coming soon" overlay that
   was factually wrong
8. No JSON-LD anywhere; no breadcrumbs in the markup; FAQ answers were injected
   on click, so they were not in the initial HTML
9. No canonical host consistency check; favicon and nav used next/image with a
   URL containing spaces
10. Homepage "Our Services" and "Master Digital Skills" headings were generic
    ("View All Services", "Explore All Cohorts") — repeated "View Details" links
11. Blog did not exist; blog-like guides had no structure
12. No legal pages (privacy, terms, refunds) even though the FAQ referenced a
    refund policy
13. Font loading: two TTF declarations in `@font-face`, no subsetting, no preload
    control, no `font-display` handling beyond `swap`
14. Hero particle canvas ran on every frame on every load, including hidden tabs
15. Blanket `transition` in CSS applied to every element on the page
16. No security headers beyond the bare minimum; public-facing Next headers
17. `npm audit` had a critical advisory against the pinned Next.js version
18. No cookie consent UI before this work

---

## Phase 2 — Canonical host and indexation (done, committed)

- Chose `www.kortixdigital.com` as the canonical host (the host itself redirects
  the apex to `www`)
- `NEXT_PUBLIC_SITE_URL` in `.env.example` as the single source of truth;
  `src/lib/site.ts` builds `SITE_URL`, `SITE_HOST`, `ALT_HOST` from it;
  `metadataBase` in `layout.tsx` is set from `SITE_URL`
- `next.config.ts`: apex→www 301, http→https 301, and favicon-space redirects
  for both forms of the misspelled filename; both keep an alias in `/public` so
  the old URL can never hard-404
- `robots.txt`: allows `/`, blocks only `/api/`, does **not** block
  `/_next/static` or `/_next/image`, `Sitemap:` references the canonical host,
  `Host:`
- `sitemap.xml`: `/`, `/services`, all `/services/[slug]`, `/cohorts`, all
  `/cohorts/[slug]` (all nine), `/about`, `/contact`, `/request`, `/blog`,
  and future `/blog/[slug]`; `lastModified` from real content dates (`updated`
  on each entry, `SITE_CONTENT_UPDATED` for shared pages), never `new Date()`
- Custom `not-found.tsx` returning a real 404 with links to services and cohorts;
  `notFound()` called for unknown slugs in both `[slug]` routes
- Verification: curl smoke tested every sitemap URL for 200, unknown slugs for
  404, internal links for 200s

---

## Phase 3 — Metadata and social previews (done, committed)

- Metadata API: `title.template` on the root, `generateMetadata` with
  `createPageMetadata` on every dynamic route
- Every page has a unique title (~50-60 chars) and description (~140-160 chars),
  written for the relevant search intent
- Homepage rewritten to carry the primary keywords; the final live title is
  `Kortix Digital | Web Development & Tech Training in Nigeria` (chosen in
  decisions below). 2-3 options logged in the decisions section.
- `keywords` meta tag: not present (the project never had one; nothing depends
  on it)
- Open Graph: 1200×630 `opengraph-image.tsx` generated server-side as an
  `ImageResponse` (wrong-content issues fixed: the logo SVG, the brand name,
  the tagline, the right dimensions and alt text); every page references it
  explicitly via `createPageMetadata`; `og:locale=en_NG`, correct
  `width`/`height`/`alt`
- Twitter: `summary_large_image`, same social card
- Self-referencing absolute canonical on every page via `alternatives.canonical`
- `lang="en"` on `<html>`; `metadata.verification.google` placeholder wired from
  `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- `alternates.canonical` on every page, matching the expected host

---

## Phase 4 — Structured data (done, committed)

Created:
- `src/lib/schema.ts` — typed JSON-LD for Organization, WebSite, Service,
  Course, FAQPage, BreadcrumbList, Article, Question, Offer, CourseInstance
  with the strictest required-field lists
- `src/components/JsonLd.tsx` — a Server Component that escapes `<` as
  `\u003c` so a string inside the data can never close the script tag early
- `src/components/Breadcrumbs.tsx` — visible trail plus matching
  BreadcrumbList JSON-LD
- `src/components/FaqAccordion.tsx` — `<details>`/`<summary>` accordion so all
  answers are in the initial HTML; emits its own FAQPage markup
- `src/components/FAQ.tsx` — homepage FAQ section backed by `homeFaqs`

Wired:
- Org + WebSite in `layout.tsx` (site-wide)
- Service + BreadcrumbList on every service page; Service FAQs where present
- Course + BreadcrumbList + FAQ on every cohort page, with `price`,
  `priceCurrency: NGN`, `availability`, `hasCourseInstance` (`courseMode: online`,
  `duration` in ISO 8601 from `cohort.durationIso`)
- FAQPage on the homepage (answers visible), and on each service/cohort page
  where the FAQ section is present

No unwanted additions:
- No `LocalBusiness`, no address, no opening hours, no geo — written down as a
  TODO in `schema.ts` ("only add when a real address exists")
- No `Offer` for services that have no published price (only the Web Development
  starting prices exist, but those are ranges, so `offers` is not emitted there
  yet — another TODO)
- No `Review` / `AggregateRating` (the testimonial carousel on the homepage is a
  single rotating quote, not an aggregate)

Schema/vs. visible content is enforced:
- `src/lib/schema.ts` `courseSchema` builds `price` from `cohort.priceValue`,
  `duration` from `cohort.durationIso`, `description` from `cohort.description`
- The cohort data file carries both the display price and the machine-readable
  `priceValue`, so the two cannot drift silently

---

## Phase 5 — Content and on-page SEO (done, committed)

- Single H1 in the Hero: merged the three H1s into one, kept the tagline text
  identical, gave it a keyword-bearing subheading, kept it outside the entrance
  animation
- FAQ answers now server-rendered in `<details>` — visible without JS, matching
  the FAQPage markup
- Service pages: expanded with "What's included", "How we work", pricing card,
  FAQs, related service and related cohort, clear CTA to `/request`
- Cohort pages: expanded with outcomes, curriculum outline, enrollment steps,
  labelled "Now/was" prices (`₦100,000` as current, `₦300,000` struck through),
  FAQs, related service and other cohorts, clear CTA
- Internal linking: homepage links to all nine cohorts (not six); service and
  cohort cards carry distinct accessible names (no repeated "View Details");
  cross-links between matching service↔cohort
- Legal pages: `/privacy-policy`, `/terms-of-service`, `/refund-policy` — written
  as honest plain-English summaries of the site today, with an "awaiting final
  review" notice and TODO markers for binding terms still to be decided
- Blog: `/blog` plus three starter outlines (tech careers in Nigeria, web dev
  roadmap, website pricing), each rendered at its real URL but noindex/out-of-
  sitemap until `published: true`
- Brand video: "coming soon" overlay removed — the file exists, so the section
  now shows a click-to-load facade on click behind `preload="none"`; the 16:9
  box is reserved in both states; `VideoObject` schema deferred until a thumbnail
  is available (TODO)
- Images: decorative images use `alt=""`/`aria-hidden`; the logo in the footer is
  decorative; the community photo is now served through `next/image` with
  AVIF/WebP from the real file
- Sitemap excludes the noindex blog outlines

---

## Phase 6 — Performance and Core Web Vitals (done, committed)

- Fonts: converted the two Alro TTFs to WOFF2 with `fontTools`, subset to Latin
  + the punctuation the site uses, served via `next/font/local` as
  `@/app/font.ts` with `display: swap` and preload; the blanket `@font-face` in
  `globals.css` removed
- `next/image`: AVIF first, then WebP; images now negotiate the best format;
  favicon, nav and footer use `next/image`; properly sized, capped, and with alt
- `prefers-reduced-motion`: honoured in CSS (animations/transitions collapse) and
  in the JS components (ScrollReveal renders static, testimonial carousel stops
  autoplaying, hero canvas doesn't run)
- Hero particle canvas: stops while the tab is hidden, so it no longer burns
  CPU in the background
- Client JS stripped from the homepage where possible — above-the-fold content
  no longer needs motion to be visible; the cards and sections reveal with CSS
  + IntersectionObserver instead of a motion library; StreamingTestimonials,
  VideoShowcase and CommunitySpotlight are dynamically imported on the homepage
- Hiding the mobile menu from the initial parse with `aria-hidden` is **not**
  done — it is rendered as a real `<header>` and only hidden visually; the
  header is now a plain element (not a motion component that server-rendered
  off-screen)
- JS transitions scoped to interactive elements only (no blanket transition on
  the whole document)
- Caching: `/_next/static` immutable; public files served for a day plus
  stale-while-revalidate; HTML revalidates; API uncached; `x-powered-by` off
- Tap targets: small button raised to 48px-ish, mobile nav links, testimonial
  arrows and footer links all ≥48px-equivalent

---

## Phase 7 — Security and trust (done, committed)

- Headers: HSTS (`max-age=63072000; includeSubDomains`), X-Content-Type-Options,
  X-Frame-Options, Referrer-Policy, Permissions-Policy, and a CSP that blocks
  third-party scripts except the analytics hosts
- Form: zod schema shared between the client form (`src/lib/request-schema.ts`)
  and the API route, so they cannot disagree on validity; API rejects with
  field-level messages, not schemas
- Rate limit: 5 submissions per IP per 10 minutes, returning 429 with
  `Retry-After` (dependency-free, in-memory, documented as a single-instance
  limitation with the shared-store upgrade path)
- Honeypot field on the form, dropped silently by the API when filled
- Output encoding: visitor-supplied values are `escapeHtml`'d before being put
  into the email HTML, and the email subject strips newlines
- Environment: `BREVO_API_KEY` and `BREVO_RECIPIENT` are server-only; never
  exposed to the client
- All external links (WhatsApp, Discord, mailto) use `rel="noopener noreferrer"`
- `npm audit`: moved Next and eslint-config-next from pinned `16.2.11` to
  `16.4.1`, which resolves the critical Next advisory and the attached
  deps (postcss, sharp). One remaining high advisory (`source-map-js`) is
  transitive through `eslint-config-next`; no semver-compatible fix exists yet,
  so it is left as a known limitation rather than branched

---

## Phase 8 — Tracking and verification (done, committed)

- Consent-aware GA4: `Analytics.tsx` loads the gtag script only after the visitor
  accepts cookies; the config is guarded by `NEXT_PUBLIC_GA_MEASUREMENT_ID`; if
  unset, nothing at all is requested
- Conversion events: `generate_lead` (service request submitted), `click_whatsapp`
  (all WhatsApp CTAs), `join_cohort_click` (with cohort name as parameter), plus
  `click_email` / `click_discord` / `open_chatbot`
- Tracking components are small client components, so pages stay Server
  Components. `TrackedLink` adds `onClick` handlers to outbound CTAs; the
  cohort join CTA reports both `join_cohort_click` and `click_whatsapp`

Verification tooling:
- `npm run seo:check` — runs against a running production build, crawls the
  sitemap, checks titles/examples/H1s/canonicals/robots/sitemap/alt text/JSON-LD
  (required fields, FAQ answers in HTML, price/duration vs visible text),
  broken internal links, 404 behaviour, and www/non-www. Exits non-zero on any
  error.
- `npm run test:e2e` — Playwright smoke tests in `tests/e2e/`:
  - one H1, one title, one description, canonical, unique content on 11 pages
  - homepage H1 is the brand tagline as one heading
  - FAQ answers in HTML, cohort prices/duration/curriculum in HTML
  - blog outlines noindex, blog index indexable
  - 404 returns the right status, title and follow links
  - sitemap and robots agree
  - without JS: homepage heading + cohorts + prices, cohort join CTA + outline
  - request form: rejection messages, successful submission, preselected service
  - request API: 400 with field errors, honeypot silent, no caching
  - navigation/footer links resolve
  - WhatsApp/Discord links are noopener and correct
  - homepage → request reachable in two clicks

---

## Before / after (measured on the production build)

### Lighthouse-style smoke (curl of the rendered HTML, not a real lab run)
Ran against a production build (same method as Phase 1 — raw HTML from
`next start`, no JS). Handled as a smoke check, not a replacement for real
throttled Lighthouse.

| Route                       | H1s before | H1s after | FAQ answers in HTML | JSON-LD blocks |
|-----------------------------|------------|-----------|---------------------|----------------|
| `/`                         | 3          | 1         | no → yes            | — → 4          |
| `/services/web-development` | —          | 1         | —                   | — → 6          |
| `/cohorts/web-development`  | —          | 1         | —                   | — → 6          |
| `/about`                    | 1          | 1         | —                   | —              |
| `/contact`                  | 1          | 1         | —                   | —              |

### Bundle (production build, raw JS sizes)
- Before Phase 6: ~400KB+ of a single homepage chunk was motion/library code
- After: homepage content is CSS-animated; the large motion bundles moved to
  below-the-fold dynamic imports on the homepage; the hero is no longer a client
  animation; static content is server-rendered and visible without JS
- Fonts: 2 × 46KB TTF → 2 × 14KB WOFF2 subsetted

### seo-check
- Before: ran manually and caught missing fields, missing canonicals, etc.
- After: `npm run seo:check` against a running build reports **PASSED — no SEO
  errors found**

### E2E smoke
- Baseline: none before this audit
- After: 56 tests, all passing, covering content, no-JS content, forms, API and
  outbound links

---

## Content-gap report

### Pages needing more copy
- `/` — fine for a headline/hero, but still a sparse homepage; could use a
  short intro with the two business lines and a single H2-level "services and
  cohorts" summary. Still one H1.
- `/about` — some copy exists, but it is thin; could use a founding story, team
  or values section.
- `/services/[slug]` — the current copy is liveable but short for some tracks.
  Long descriptions were added where they existed; where they didn't, they were
  left as is (no invented copy).
- `/cohorts/[slug]` — outcomes and curriculum added from existing data; still
  thin on process detail for a few tracks. Documented below.

### Thin cohort pages (flagged for the owner)
- `content-creation` — WhatsApp link is `#` (enrollment not open), and its copy
  is the thinnest of the nine. Mark as thin.
- `video-editing` — only one curriculum module; the outline is dense but it's a
  one-month track with a single module.
- `web3` — most technical track; FAQ admits it needs prior programming; the page
  is fine as-is but the audience line should be clear that it's for people with
  some coding experience.

### Missing facts / TBD in the data
- Cohort and service `updated` dates are set to a stub (`2026-10-14`) — they
  should be the real last-updated date for the content on that page
- Pricing: only the Web Development service lists starting prices. Every other
  service says "Contact for pricing". If the owner wants published prices,
  start with fixed numbers not ranges.
- Cohort durations are expressed as "X months" in copy and `P#M` in schema —
  consistent, but the start dates and cohort schedules are not on the site.
- No instructors named anywhere — not added, not invented.
- No start dates, no cohort cohorts timeline, no certificate details.
- Refund policy: plain-English summary written, but the exact refund windows
  and response times are still TODO and not published.
- Address / office: none published. Treated as a TODO.
- Legal content: privacy, terms and refund pages are honest summaries with a
  visible "awaiting final review" notice and TODO markers.

### Missing images
- The brand logo is still an SVG icon in `/public/logo.svg`, not a real logo
  image with the brand wordmark
- Community/team photo in `CommunitySpotlight` is the placeholder
  `/public/group-photo.jpg` (a generic photo that ships with the starter) —
  placeholder; swap for a real group photo
- Favicon: multiple sizes exist but `favicon-16x16.png` and
  `favicon-32x32.png` are small and generic — replace with proper originals
- No OG images per service or cohort — only the site-level social card

### Missing alt text (already handled where possible)
- All remaining decorative images given `alt=""` or `aria-hidden`
- No new alt was invented for images that were missing alt arbitrarily; the
  programmatic checks will catch anything missed on future PRs

### Blog
- Three outlines exist, none published. The site has no article content yet.

---

## Decisions the owner should review

1. **Canonical host:** `www.kortixdigital.com`.
   - Rationale: the host redirects `apex → www`, so `www` is the host that
     actually serves content. `NEXT_PUBLIC_SITE_URL` drives everything from there.
   - If you later want to go bare-apex, flip the redirect and set
     `NEXT_PUBLIC_SITE_URL=https://kortixdigital.com` — all the other pieces
     (canonicals, sitemap, og:url, robots) follow automatically.

2. **Homepage title options considered:**
   - `Kortix Digital | Web Development Agency & Tech Skills Training in Nigeria`
     \(\leftarrow\) chosen as the live title — carries both business lines and the
     location
   - `Kortix Digital | Web Development & Digital Training in Nigeria`
   - `Kortix Digital — Services and Mentorship Cohorts in Nigeria`
   Pick the one you want to finalise; the rest of the titles are built from it.

3. **noindex strategy for legal pages:**
   - Added as indexable with `robots: index` (they are public documents the site
     should be able to show)
   - The seo-check actually flagged them as `noindex` in the robots.txt rule if
     it existed — none does now, so they're included
   - If you want them excluded from the index, set `robots: { index: false }` on
     those three pages and they'll drop out of the sitemap.

4. **Price display on cohort pages:**
   - Current fee `₦100,000` rendered as the live price with `₦300,000` struck
     through and a "was" label. The "now" label is on the live price and the
     "was" label is on the struck-through price.
   - Schema emits only the current price (`priceValue`), never the struck-through
     one
   - If the "was" price is not the real previous fee, rename both labels to match
     what you actually mean before launch.

5. **Blog publication:**
   - No articles are published yet; outlines are rendered at their URLs but
     noindex and out of the sitemap.
   - Flip `published: true` on a post only when real copy replaces the outline.

6. **Legal pages:**
   - Written as honest summaries with an "awaiting final review" banner; the
     binding terms (refund windows, deposits, ownership, governing law) are TODO.
   - Do **not** remove the review notice until the owner (and, ideally, a lawyer)
     has signed off.

7. **Cookie consent scope:**
   - Currently a single accept/decline choice for analytics; the banner is shown
     once and remembered in `localStorage`. No other tracking (no marketing
     cookies, no third-party pixels beyond analytics) is on the site yet, so a
     single-purpose banner is acceptable.
   - If more tracking is added, expand the consent choices.

8. **CSP `script-src 'unsafe-inline'`:**
   - Kept because Next.js ships inline bootstrap + RSC scripts and the site is
     static; a nonce-only policy would force every route to render dynamically,
     which is worse for LCP on a marketing site than `'unsafe-inline'` today.
   - Documented as a deliberate trade-off in `next.config.ts` with a TODO to
     tighten it if you ever add a payment provider, chat widget or other third-
     party script.

---

## Manual checklist for the owner

- [ ] **Search Console:** verify the property and submit
  `https://www.kortixdigital.com/sitemap.xml` (the canonical host's sitemap).
- [ ] **Google Business Profile:** confirm whether Kortix Digital has a physical
  office or registered business address. If yes, claim and complete the GBP with
  the real address, phone, opening hours and photos; if no, leave the "no local
  business schema" decision as-is.
- [ ] **Keyword research (Nigeria-focused examples to target):**
  - "web development company Nigeria"
  - "web development course in Nigeria"
  - "digital marketing training Lagos"
  - "web design company Nigeria"
  - "app development agency Nigeria"
  - "cybersecurity training Nigeria"
  - "UI UX design course Nigeria"
  - "website design cost Nigeria"
  - "video editing training Nigeria"
  - "Web3 development course Nigeria"
  Use these to check that the headings, descriptions and on-page copy match
  actual search demand.
- [ ] **Collect real testimonials** with name, role, track and permission to use
  them. Replace the placeholder carousel; do not publish fake ones.
- [ ] **Legal pages:** finalise privacy, terms and refund policy; remove the
  "awaiting final review" banner and the TODO markers once signed off.
- [ ] **Blog content:** write the three starter guides (or replace them), then
  set `published: true` and update the `updated` field. Do not publish outlines.
- [ ] **Images:** replace the placeholder community photo, favicons and logo with
  real assets; write descriptive alt text for every non-decorative image.
- [ ] **Social profiles:** claim and complete consistent profiles on the networks
  the site links to, with consistent name, branding, site URL and contact.
- [ ] **Backlinks:** Nigerian tech communities, directories (Clutch, GoodFirms),
  partnerships, guest posts, YouTube/LinkedIn content that mentions the business.
- [ ] **Analytics:** set `NEXT_PUBLIC_GA_MEASUREMENT_ID`, then verify in GA4
  Realtime that `generate_lead`, `click_whatsapp` and `join_cohort_click` arrive.
- [ ] **Brevo:** add the server's IP to the account's authorised IP list, or use
  an API key that allows it; confirm the request form emails land in the inbox.
- [ ] **Pass the checklist every deploy:** `npm run build && npm run start && npm
  run seo:check && npm run test:e2e`.

---

## File manifest by phase

### Phase 2
- `.env.example` (canonical host env + env placeholders added)
- `.gitignore` (build + runtime exclusions kept in sync)
- `next.config.ts` (canonical-redirect + favicon-rename redirects)
- `robots.txt` (robots.ts)
- `sitemap.xml` (sitemap.ts)
- `not-found.tsx` (real 404)
- `favicon` rename: `/public/Kortix Favicon .png` kept as a fallback alias;
  `/public/kortix-favicon.png` is the canonical file

### Phase 3
- `layout.tsx` (metadata, canonical, og:image tag, verification placeholder,
  favicon block trimmed)
- `opengraph-image.tsx` (created — real 1200×630 social card)
- `metadata.ts` (created — createPageMetadata helper with social card constant)

### Phase 4
- `schema.ts` (created)
- `JsonLd.tsx` (created)
- `Breadcrumbs.tsx` (created)
- `FaqAccordion.tsx` (created)
- `FAQ.tsx` (updated — server-rendered answers, FAQPage markup)
- bolted onto every applicable page

### Phase 5
- `Hero.tsx` (single H1, keyword-bearing subheading, no JS entrance animation)
- `FAQ.tsx` (answers in HTML, visible FAQPage)
- `CohortCard.tsx`, `ServiceCard.tsx`, `CohortCard`, `ServiceCard`, `CohortCard`
  accessible names
- `CohortCard.tsx`, `ServiceCard.tsx` (accessible names)
- `community` section image: now uses the real `group-photo.jpg` through
  `next/image`
- `VideoShowcase.tsx` (click-to-load facade; no broken placeholder)
- `/blog`, `/blog/[slug]`, three outlines in `blog.ts`
- `/privacy-policy`, `/terms-of-service`, `/refund-policy`
- `LegalDoc.tsx` (shared legal page layout)
- Homepage: all nine cohorts, better headings, cross-links

### Phase 6
- `/app/font.ts` (creates the self-hosted font)
- `globals.css` (reduced-motion block, scoped transitions, CSS hero animation,
  font-face removed)
- `ScrollReveal.tsx` (replacement, CSS + IntersectionObserver, no motion)
- `Hero.tsx`, `ServiceCard.tsx`, `CohortCard.tsx`, `CommunitySpotlight.tsx`
  (no motion on above-the-fold content)
- `Testimonials.tsx` (reduce-motion aware)
- `next.config.ts` (images, caching headers, x-powered-by off)
- Tap target fixes in `SpecularButton.tsx`, ` Navbar.tsx,` `Testimonials.tsx`,

### Phase 7
- `next.config.ts` (security headers, CSP — tightened)
- `src/lib/request-schema.ts` (created — shared zod schema for form + API)
- `src/lib/rate-limit.ts` (created)
- `src/app/api/request-service/route.ts` (rate limit, honeypot, zod validation)
- `src/lib/brevo.ts` (escapeHtml, subject sanitisation)
- `src/components/RequestForm.tsx` (server-shared schema, honeypot, field errors
  displayed)
- `package.json` + `package-lock.json` (Next + eslint-config-next 16.4.1)
- `audit.json` removed (superset of the above)

### Phase 8
- `src/lib/analytics.ts` (created)
- `src/components/Analytics.tsx` (created)
- `src/components/TrackedLink.tsx` (created)
- `src/components/JoinCohortButton.tsx` (created)
- `src/components/SpecularLink.tsx`, `Footer.tsx`, `Contact.tsx`,
  `FloatingCTA.tsx`, `FloatingChatbot.tsx` (outbound CTAs wired; cohort join
  CTA reports both events)
- `playwright.config.ts` created
- `tests/e2e/` created with `content.spec.ts` and `flows.spec.ts`
- `scripts/seo-check.ts` created; `SEO_BASE_URL` env + `SEO_BASE_URL` env +
  `npm run seo:check`; `npm run seo:check` runs against a running build; exit
  code non-zero on failure

---

## Glossary

- **Canonical host:** the single hostname that serves the site and is advertised
  in canonicals, sitemap, og:url and robots.txt.
- **SSG:** static site generation — the page HTML is built at build time.
- **ISR:** incremental static regeneration — the page is built at build time and
  re-generated on a timer or on demand.
- **SSR:** server-side rendering — the page HTML is generated on each request.
- **CSR:** client-side rendering — the page is rendered by the browser from
  JavaScript.
- **LCP:** Largest Contentful Paint.
- **INP:** Interaction to Next Paint.
- **CLS:** Cumulative Layout Shift.
- **JSON-LD:** JSON for Linking Data — the structured-data format used here.
- **oot:** out of thin air — a reminder that nothing on this site is invented.

---

## How to apply

**To apply all changes:**
- Apply the phase-2 changes first, then phase 3, then the rest. Each phase is
  independent and can be reviewed and applied separately.

**To apply only some phases:**
- Phases are independent; any phase can be applied alone.

**To review:**
- Read each phase's section, then the file manifest, then the before/after and
  the content-gap report. The decisions are in the decisions section and the
  glossary.

**To leave things out:**
- Skip any phase; the others still apply.
