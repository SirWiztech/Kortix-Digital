# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: flows.spec.ts >> service request form >> rejects empty submissions with field-level messages
- Location: tests\e2e\flows.spec.ts:30:7

# Error details

```
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Decline' }) to be visible

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - navigation [ref=e3]:
      - generic [ref=e4]:
        - link "Kortix Digital" [ref=e5] [cursor=pointer]:
          - /url: /
        - generic [ref=e8]:
          - link "Home" [ref=e9] [cursor=pointer]:
            - /url: /
          - link "Services" [ref=e10] [cursor=pointer]:
            - /url: /services
          - link "Cohorts" [ref=e11] [cursor=pointer]:
            - /url: /cohorts
          - link "About" [ref=e12] [cursor=pointer]:
            - /url: /about
          - link "Contact" [ref=e13] [cursor=pointer]:
            - /url: /contact
        - generic [ref=e14]:
          - button "Switch to light mode" [ref=e15]
          - link "Request a Service" [ref=e22] [cursor=pointer]:
            - /url: /request
        - button "Toggle menu" [ref=e23]
  - main [ref=e25]:
    - generic [ref=e27]:
      - navigation "Breadcrumb" [ref=e29]:
        - list [ref=e30]:
          - listitem [ref=e31]:
            - link "Home" [ref=e32] [cursor=pointer]:
              - /url: /
          - listitem [ref=e33]: Request a Service
      - generic [ref=e36]:
        - heading "Request a Service" [level=1] [ref=e37]
        - paragraph [ref=e38]: Tell us about your project and we'll get back to you within 24 hours with a tailored proposal.
    - generic [ref=e50]:
      - generic [aria-hidden] [ref=e51]:
        - text: Leave this field empty
        - textbox [ref=e52]
      - generic [ref=e53]:
        - text: Service Type
        - combobox "Service Type" [ref=e54]:
          - option "Select a service" [selected]
          - option "Web Development"
          - option "Graphic Design"
          - option "Video Editing"
          - option "UI/UX Design"
          - option "App Development"
      - generic [ref=e55]:
        - generic [ref=e56]:
          - text: Currency
          - combobox "Currency" [ref=e57]:
            - option "NGN" [selected]
            - option "USD"
            - option "GBP"
            - option "EUR"
        - generic [ref=e58]:
          - text: Proposed Budget
          - spinbutton "Proposed Budget" [ref=e59]
      - generic [ref=e60]:
        - generic [ref=e61]:
          - text: Full Name
          - textbox "Full Name" [ref=e62]:
            - /placeholder: John Doe
        - generic [ref=e63]:
          - text: Email Address
          - textbox "Email Address" [ref=e64]:
            - /placeholder: you@example.com
      - generic [ref=e65]:
        - text: Project Details
        - textbox "Project Details" [ref=e66]:
          - /placeholder: Tell us about your project, goals, timeline, and any specific requirements...
      - button "Submit Request" [ref=e68]
  - contentinfo [ref=e72]:
    - generic [ref=e73]:
      - generic [ref=e74]:
        - generic [ref=e75]:
          - link "Kortix Digital" [ref=e76] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e79]: Digital agency services and mentorship cohorts for the next generation.
          - generic [ref=e80]:
            - link "WhatsApp" [ref=e81] [cursor=pointer]:
              - /url: https://wa.me/2347071617216
            - link "Discord" [ref=e84] [cursor=pointer]:
              - /url: https://discordapp.com/users/1466951307708469516
            - link "kortixdigital@gmail.com" [ref=e89] [cursor=pointer]:
              - /url: mailto:kortixdigital@gmail.com
        - generic [ref=e93]:
          - heading "Services" [level=4] [ref=e94]
          - list [ref=e95]:
            - listitem [ref=e96]:
              - link "Web Development" [ref=e97] [cursor=pointer]:
                - /url: /services/web-development
            - listitem [ref=e98]:
              - link "Graphic Design" [ref=e99] [cursor=pointer]:
                - /url: /services/graphic-design
            - listitem [ref=e100]:
              - link "Video Editing" [ref=e101] [cursor=pointer]:
                - /url: /services/video-editing
            - listitem [ref=e102]:
              - link "UI/UX Design" [ref=e103] [cursor=pointer]:
                - /url: /services/ui-ux-design
            - listitem [ref=e104]:
              - link "App Development" [ref=e105] [cursor=pointer]:
                - /url: /services/app-development
        - generic [ref=e106]:
          - heading "Cohorts" [level=4] [ref=e107]
          - list [ref=e108]:
            - listitem [ref=e109]:
              - link "Web Development" [ref=e110] [cursor=pointer]:
                - /url: /cohorts/web-development
            - listitem [ref=e111]:
              - link "App Development" [ref=e112] [cursor=pointer]:
                - /url: /cohorts/app-development
            - listitem [ref=e113]:
              - link "Data Analysis" [ref=e114] [cursor=pointer]:
                - /url: /cohorts/data-analysis
            - listitem [ref=e115]:
              - link "Cybersecurity" [ref=e116] [cursor=pointer]:
                - /url: /cohorts/cybersecurity
            - listitem [ref=e117]:
              - link "UI/UX Design" [ref=e118] [cursor=pointer]:
                - /url: /cohorts/ui-ux-design
            - listitem [ref=e119]:
              - link "Digital Marketing" [ref=e120] [cursor=pointer]:
                - /url: /cohorts/digital-marketing
            - listitem [ref=e121]:
              - link "Content Creation" [ref=e122] [cursor=pointer]:
                - /url: /cohorts/content-creation
            - listitem [ref=e123]:
              - link "Video Editing" [ref=e124] [cursor=pointer]:
                - /url: /cohorts/video-editing
            - listitem [ref=e125]:
              - link "Web3" [ref=e126] [cursor=pointer]:
                - /url: /cohorts/web3
        - generic [ref=e127]:
          - heading "Company" [level=4] [ref=e128]
          - list [ref=e129]:
            - listitem [ref=e130]:
              - link "About Us" [ref=e131] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e132]:
              - link "Contact" [ref=e133] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e134]:
              - link "Request a Service" [ref=e135] [cursor=pointer]:
                - /url: /request
            - listitem [ref=e136]:
              - link "Blog & Guides" [ref=e137] [cursor=pointer]:
                - /url: /blog
      - generic [ref=e138]:
        - list [ref=e139]:
          - listitem [ref=e140]:
            - link "Privacy Policy" [ref=e141] [cursor=pointer]:
              - /url: /privacy-policy
          - listitem [ref=e142]:
            - link "Terms of Service" [ref=e143] [cursor=pointer]:
              - /url: /terms-of-service
          - listitem [ref=e144]:
            - link "Refund Policy" [ref=e145] [cursor=pointer]:
              - /url: /refund-policy
        - generic [ref=e146]:
          - paragraph [ref=e147]: © 2026 Kortix Digital. All rights reserved.
          - paragraph [ref=e148]: We Build. We Teach. We Transform.
    - paragraph [ref=e150]: KORTIX DIGITAL
  - generic [ref=e151]:
    - button "Open chat" [ref=e153]
    - generic [ref=e156]:
      - link "Chat on WhatsApp" [ref=e157] [cursor=pointer]:
        - /url: https://wa.me/2347071617216
        - text: Chat with us
      - link "Join Discord" [ref=e161] [cursor=pointer]:
        - /url: https://discordapp.com/users/1466951307708469516
```

# Test source

```ts
  1   | import { expect, test, type Page } from "@playwright/test";
  2   | 
  3   | /**
  4   |  * Flow checks: the request form, the API's validation rules, and the outbound
  5   |  * links people use to reach us (WhatsApp, email, Discord).
  6   |  */
  7   | 
  8   | /**
  9   |  * Navigate and wait until the page is interactive.
  10  |  *
  11  |  * Interacting before React hydrates is a known trap: react-hook-form reads
  12  |  * values from its own store, which only starts listening once hydration runs,
  13  |  * so a field filled in that window looks set in the DOM but is empty to the
  14  |  * form. Waiting for the network to settle before typing avoids the race.
  15  |  */
  16  | async function gotoHydrated(page: Page, path: string): Promise<void> {
  17  |   await page.goto(path);
  18  | 
  19  |   // The cookie banner is rendered by JavaScript only (the server cannot know
  20  |   // the stored choice), so it doubles as a hydration signal AND has to be
  21  |   // dismissed: it is fixed to the bottom of the viewport and would otherwise
  22  |   // intercept clicks on the form's submit button.
  23  |   const banner = page.getByRole("button", { name: "Decline" });
> 24  |   await banner.waitFor({ state: "visible", timeout: 15_000 });
      |                ^ TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
  25  |   await banner.click();
  26  |   await banner.waitFor({ state: "hidden", timeout: 15_000 });
  27  | }
  28  | 
  29  | test.describe("service request form", () => {
  30  |   test("rejects empty submissions with field-level messages", async ({ page }) => {
  31  |     await gotoHydrated(page, "/request");
  32  |     await page.getByRole("button", { name: /Submit Request/i }).click();
  33  | 
  34  |     await expect(page.getByText("Please select a service")).toBeVisible();
  35  |     await expect(page.getByText("Name is required")).toBeVisible();
  36  |     await expect(page.getByText("Please enter a valid email address")).toBeVisible();
  37  |     await expect(page.getByText(/Please provide more details/)).toBeVisible();
  38  |   });
  39  | 
  40  |   test("submits and confirms without leaving the page", async ({ page }) => {
  41  |     // The email provider is stubbed: this test is about the form UI, not Brevo.
  42  |     let posted: Record<string, unknown> | null = null;
  43  |     await page.route("**/api/request-service", async (route) => {
  44  |       posted = route.request().postDataJSON() as Record<string, unknown>;
  45  |       await route.fulfill({
  46  |         status: 200,
  47  |         contentType: "application/json",
  48  |         body: JSON.stringify({ success: true }),
  49  |       });
  50  |     });
  51  | 
  52  |     await gotoHydrated(page, "/request");
  53  |     await page.getByLabel("Service Type").selectOption("Web Development");
  54  |     await page.getByLabel("Proposed Budget").fill("120000");
  55  |     await page.getByLabel("Full Name").fill("Test Visitor");
  56  |     await page.getByLabel("Email Address").fill("visitor@example.com");
  57  |     await page
  58  |       .getByLabel("Project Details")
  59  |       .fill("Smoke test submission with enough detail to pass validation.");
  60  |     await page.getByRole("button", { name: /Submit Request/i }).click();
  61  | 
  62  |     await expect(page.getByText("Request Submitted!")).toBeVisible();
  63  | 
  64  |     expect(posted, "the form posted to the API").not.toBeNull();
  65  |     expect(posted).toMatchObject({
  66  |       service: "Web Development",
  67  |       name: "Test Visitor",
  68  |       email: "visitor@example.com",
  69  |       currency: "NGN",
  70  |     });
  71  |     // The honeypot field is part of the payload and must be left empty.
  72  |     expect(posted!.kortix_hp ?? "").toBe("");
  73  |   });
  74  | 
  75  |   test("preselects the service when linked from a service page", async ({ page }) => {
  76  |     await gotoHydrated(page, "/services/graphic-design");
  77  |     await page.getByRole("link", { name: /Request this service/i }).click();
  78  |     await expect(page).toHaveURL(/\/request\?service=graphic-design/);
  79  |     await expect(page.getByLabel("Service Type")).toHaveValue("Graphic Design");
  80  |   });
  81  | });
  82  | 
  83  | test.describe("request API", () => {
  84  |   test("returns 400 with field errors for invalid input", async ({ request }) => {
  85  |     const response = await request.post("/api/request-service", {
  86  |       data: { service: "", name: "x", email: "not-an-email", details: "short" },
  87  |     });
  88  | 
  89  |     expect(response.status()).toBe(400);
  90  |     const body = (await response.json()) as {
  91  |       error: string;
  92  |       fieldErrors: Record<string, string>;
  93  |     };
  94  |     expect(body.error).toBeTruthy();
  95  |     expect(Object.keys(body.fieldErrors)).toEqual(
  96  |       expect.arrayContaining(["service", "name", "email", "details"]),
  97  |     );
  98  |   });
  99  | 
  100 |   test("silently drops honeypot submissions", async ({ request }) => {
  101 |     const response = await request.post("/api/request-service", {
  102 |       data: {
  103 |         service: "Web Development",
  104 |         name: "Bot Bot",
  105 |         email: "bot@example.com",
  106 |         details: "definitely spam, definitely a bot filling every field",
  107 |         kortix_hp: "https://spam.example",
  108 |       },
  109 |     });
  110 | 
  111 |     // 200 so the bot learns nothing, and no email is sent.
  112 |     expect(response.status()).toBe(200);
  113 |     expect(await response.json()).toEqual({ success: true });
  114 |   });
  115 | 
  116 |   test("never caches a submission", async ({ request }) => {
  117 |     const response = await request.post("/api/request-service", { data: {} });
  118 |     expect(response.headers()["cache-control"]).toBe("no-store");
  119 |   });
  120 | });
  121 | 
  122 | test.describe("navigation and outbound links", () => {
  123 |   test("every navigation and footer link resolves", async ({ page, request }) => {
  124 |     // ~40 links, so give the parallel check room beyond the default 30s.
```