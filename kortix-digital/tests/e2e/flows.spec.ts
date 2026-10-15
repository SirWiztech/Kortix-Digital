import { expect, test, type Page } from "@playwright/test";

/**
 * Flow checks: the request form, the API's validation rules, and the outbound
 * links people use to reach us (WhatsApp, email, Discord).
 */

/**
 * Navigate and wait until the page is interactive.
 *
 * Interacting before React hydrates is a known trap: react-hook-form reads
 * values from its own store, which only starts listening once hydration runs,
 * so a field filled in that window looks set in the DOM but is empty to the
 * form. Waiting for the network to settle before typing avoids the race.
 */
async function gotoHydrated(page: Page, path: string): Promise<void> {
  await page.goto(path);

  // The cookie banner is rendered by JavaScript only (the server cannot know
  // the stored choice), so it doubles as a hydration signal AND has to be
  // dismissed: it is fixed to the bottom of the viewport and would otherwise
  // intercept clicks on the form's submit button.
  const banner = page.getByRole("button", { name: "Decline" });
  await banner.waitFor({ state: "visible", timeout: 15_000 });
  await banner.click();
  await banner.waitFor({ state: "hidden", timeout: 15_000 });
}

test.describe("service request form", () => {
  test("rejects empty submissions with field-level messages", async ({ page }) => {
    await gotoHydrated(page, "/request");
    await page.getByRole("button", { name: /Submit Request/i }).click();

    await expect(page.getByText("Please select a service")).toBeVisible();
    await expect(page.getByText("Name is required")).toBeVisible();
    await expect(page.getByText("Please enter a valid email address")).toBeVisible();
    await expect(page.getByText(/Please provide more details/)).toBeVisible();
  });

  test("submits and confirms without leaving the page", async ({ page }) => {
    // The email provider is stubbed: this test is about the form UI, not Brevo.
    let posted: Record<string, unknown> | null = null;
    await page.route("**/api/request-service", async (route) => {
      posted = route.request().postDataJSON() as Record<string, unknown>;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await gotoHydrated(page, "/request");
    await page.getByLabel("Service Type").selectOption("Web Development");
    await page.getByLabel("Proposed Budget").fill("120000");
    await page.getByLabel("Full Name").fill("Test Visitor");
    await page.getByLabel("Email Address").fill("visitor@example.com");
    await page
      .getByLabel("Project Details")
      .fill("Smoke test submission with enough detail to pass validation.");
    await page.getByRole("button", { name: /Submit Request/i }).click();

    await expect(page.getByText("Request Submitted!")).toBeVisible();

    expect(posted, "the form posted to the API").not.toBeNull();
    expect(posted).toMatchObject({
      service: "Web Development",
      name: "Test Visitor",
      email: "visitor@example.com",
      currency: "NGN",
    });
    // The honeypot field is part of the payload and must be left empty.
    expect(posted!.kortix_hp ?? "").toBe("");
  });

  test("preselects the service when linked from a service page", async ({ page }) => {
    await gotoHydrated(page, "/services/graphic-design");
    await page.getByRole("link", { name: /Request this service/i }).click();
    await expect(page).toHaveURL(/\/request\?service=graphic-design/);
    await expect(page.getByLabel("Service Type")).toHaveValue("Graphic Design");
  });
});

test.describe("request API", () => {
  test("returns 400 with field errors for invalid input", async ({ request }) => {
    const response = await request.post("/api/request-service", {
      data: { service: "", name: "x", email: "not-an-email", details: "short" },
    });

    expect(response.status()).toBe(400);
    const body = (await response.json()) as {
      error: string;
      fieldErrors: Record<string, string>;
    };
    expect(body.error).toBeTruthy();
    expect(Object.keys(body.fieldErrors)).toEqual(
      expect.arrayContaining(["service", "name", "email", "details"]),
    );
  });

  test("silently drops honeypot submissions", async ({ request }) => {
    const response = await request.post("/api/request-service", {
      data: {
        service: "Web Development",
        name: "Bot Bot",
        email: "bot@example.com",
        details: "definitely spam, definitely a bot filling every field",
        kortix_hp: "https://spam.example",
      },
    });

    // 200 so the bot learns nothing, and no email is sent.
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ success: true });
  });

  test("never caches a submission", async ({ request }) => {
    const response = await request.post("/api/request-service", { data: {} });
    expect(response.headers()["cache-control"]).toBe("no-store");
  });
});

test.describe("navigation and outbound links", () => {
  test("every navigation and footer link resolves", async ({ page, request }) => {
    // ~40 links, so give the parallel check room beyond the default 30s.
    test.setTimeout(90_000);

    await page.goto("/");
    const hrefs = (await page.locator("header a, footer a").evaluateAll((els) =>
      els.map((el) => el.getAttribute("href") ?? ""),
    )) as string[];

    expect(hrefs.length).toBeGreaterThan(20);

    const internal = [...new Set(hrefs.filter((href) => href.startsWith("/")))];
    const results = await Promise.all(
      internal.map(async (href) => ({
        href,
        status: (await request.get(href)).status(),
      })),
    );

    const broken = results.filter((result) => result.status >= 400);
    expect(broken, JSON.stringify(broken)).toEqual([]);
  });

  test("WhatsApp and Discord links are safe and correct", async ({ page }) => {
    await page.goto("/contact");

    const whatsapp = page.locator('a[href*="wa.me"]').first();
    await expect(whatsapp).toHaveAttribute("target", "_blank");
    await expect(whatsapp).toHaveAttribute("rel", /noopener/);
    await expect(whatsapp).toHaveAttribute("href", /2347071617216/);

    const discord = page.locator('a[href*="discord"]').first();
    await expect(discord).toHaveAttribute("rel", /noopener/);

    const email = page.locator('a[href^="mailto:"]').first();
    await expect(email).toHaveAttribute("href", "mailto:kortixdigital@gmail.com");
  });

  test("the request form is reachable from the homepage in two clicks", async ({
    page,
  }) => {
    await gotoHydrated(page, "/");
    // Only the visible CTA: the desktop nav copy is hidden on mobile, and the
    // footer has its own "Request a Service" link.
    await page
      .locator('a:visible', { hasText: /Request a Service/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/request$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Request a Service",
    );
  });
});
