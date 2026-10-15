import { expect, test, type APIRequestContext } from "@playwright/test";

/**
 * Crawlability checks: everything a search engine needs has to be in the
 * response HTML, before any JavaScript runs.
 */

const PAGES = [
  "/",
  "/services",
  "/services/web-development",
  "/cohorts",
  "/cohorts/web-development",
  "/about",
  "/contact",
  "/blog",
  "/privacy-policy",
  "/terms-of-service",
  "/refund-policy",
];

async function html(request: APIRequestContext, path: string): Promise<string> {
  const response = await request.get(path);
  expect(response.status(), `${path} should return 200`).toBe(200);
  return response.text();
}

function countH1(html: string): number {
  return (html.match(/<h1[\s>]/g) ?? []).length;
}

test.describe("server HTML content", () => {
  for (const path of PAGES) {
    test(`${path} has one title, one description, one H1 and a canonical`, async ({
      request,
    }) => {
      const body = await html(request, path);

      expect(body.match(/<title[^>]*>/gi)?.length ?? 0, "one <title>").toBe(1);
      expect(
        body.match(/name="description"/g)?.length ?? 0,
        "one meta description",
      ).toBe(1);
      expect(countH1(body), "exactly one H1").toBe(1);
      expect(body, "self-referencing canonical").toContain('rel="canonical"');
    });
  }

  test("homepage H1 is the brand tagline, as one heading", async ({ request }) => {
    const body = await html(request, "/");
    const h1 = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "";
    const text = h1.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

    expect(text).toContain("We Build.");
    expect(text).toContain("We Teach.");
    expect(text).toContain("We Transform.");
  });

  test("FAQ answers are in the HTML, not injected on click", async ({ request }) => {
    const body = await html(request, "/");
    expect(body).toContain("What are the pricing and payment options?");
    expect(body).toContain("flexible payment plans for most tracks");
    expect(body, "answers use <details> so no JS is needed").toContain("<details");
  });

  test("cohort price, duration and curriculum are server-rendered", async ({
    request,
  }) => {
    const body = await html(request, "/cohorts/web-development");
    expect(body).toContain("₦100,000");
    expect(body).toContain("₦300,000");
    expect(body).toContain("6 months");
    expect(body).toContain("Curriculum");
    expect(body, "the course JSON-LD matches the visible price").toContain(
      '"price":100000',
    );
  });

  test("blog outlines are noindex until they are written", async ({ request }) => {
    const response = await request.get("/blog/web-development-roadmap-for-beginners");
    const body = await response.text();
    expect(body).toMatch(/<meta name="robots" content="noindex/);
  });

  test("unknown slugs return a real 404 with helpful links", async ({ request }) => {
    const response = await request.get("/cohorts/does-not-exist");
    expect(response.status()).toBe(404);
    const body = await response.text();
    expect(body).toMatch(/We couldn[\u2019']t find that page/);
    expect(body).toMatch(/name="robots" content="noindex/);
    expect(body).toContain("/services/web-development");
    expect(body, "404s link to the cohorts index").toContain("/cohorts/web3");
  });

  test("sitemap and robots agree with each other", async ({ request }) => {
    const robots = await (await request.get("/robots.txt")).text();
    const sitemap = await (await request.get("/sitemap.xml")).text();

    const sitemapUrl = robots.match(/^Sitemap:\s*(\S+)/im)?.[1] ?? "";
    expect(sitemapUrl).toContain("/sitemap.xml");
    expect(robots).not.toMatch(/Disallow:\s*\/_next\/static/);

    expect(sitemap).toContain("<loc>");
    expect(sitemap).toContain("/cohorts/web-development");
    expect(sitemap, "legal pages are listed").toContain("/privacy-policy");
    expect(sitemap, "noindex blog outlines stay out").not.toContain(
      "/blog/web-development-roadmap-for-beginners",
    );
  });
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the homepage renders its heading, cohorts and prices", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "We Build.",
    );
    await expect(
      page.getByRole("heading", { name: "Web Development", exact: true }).first(),
    ).toBeVisible();
    await expect(page.getByText("₦100,000").first()).toBeVisible();
  });

  test("a cohort page keeps its join CTA and outline", async ({ page }) => {
    await page.goto("/cohorts/web-development");

    await expect(
      page.getByRole("heading", { name: /Web Development Cohort/, level: 1 }),
    ).toBeVisible();
    // Two CTAs point at the same group (top and bottom of the page).
    await expect(
      page
        .getByRole("link", { name: /Join the Web Development cohort WhatsApp group/ })
        .first(),
    ).toHaveAttribute("href", /chat\.whatsapp\.com/);
    await expect(page.getByRole("heading", { name: "Curriculum" })).toBeVisible();
  });
});
