# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: flows.spec.ts >> service request form >> preselects the service when linked from a service page
- Location: tests\e2e\flows.spec.ts:75:7

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
    - generic [ref=e28]:
      - navigation "Breadcrumb" [ref=e29]:
        - list [ref=e30]:
          - listitem [ref=e31]:
            - link "Home" [ref=e32] [cursor=pointer]:
              - /url: /
          - listitem [ref=e33]:
            - link "Services" [ref=e36] [cursor=pointer]:
              - /url: /services
          - listitem [ref=e37]: Graphic Design
      - heading "Graphic Design Services in Nigeria" [level=1] [ref=e48]
      - paragraph [ref=e49]: Great design is more than aesthetics — it's strategic communication. We create brand identities, marketing collateral, social media assets, and print materials that resonate with your audience and elevate your brand perception.
      - paragraph [ref=e50]: New brands that need an identity from scratch and established businesses whose visuals have drifted out of sync with where they are now.
    - generic [ref=e53]:
      - generic [ref=e55]:
        - heading "What's included" [level=2] [ref=e56]
        - generic [ref=e57]:
          - generic [ref=e58]: Logo & brand identity design
          - generic [ref=e68]: Marketing collateral
          - generic [ref=e78]: Social media graphics
          - generic [ref=e88]: Print design (flyers, banners, brochures)
          - generic [ref=e98]: Brand guideline documentation
          - generic [ref=e108]: Packaging design
      - generic [ref=e127]:
        - heading "Pricing" [level=2] [ref=e128]
        - paragraph [ref=e129]: Contact for pricing
        - link "Request this service" [ref=e130] [cursor=pointer]:
          - /url: /request?service=graphic-design
    - generic [ref=e134]:
      - heading "How we work" [level=2] [ref=e136]
      - list [ref=e137]:
        - listitem [ref=e139]:
          - text: "01"
          - heading "Tell us about the project" [level=3] [ref=e140]
          - paragraph [ref=e141]: "Send the details through the request form: what you need, who it is for, your timeline and your budget range."
        - listitem [ref=e143]:
          - text: "02"
          - heading "Scope and fixed quote" [level=3] [ref=e144]
          - paragraph [ref=e145]: We review the requirements and reply with a written scope, a realistic timeline and a clear fixed budget quote — no hidden charges.
        - listitem [ref=e147]:
          - text: "03"
          - heading "Design and build" [level=3] [ref=e148]
          - paragraph [ref=e149]: We build in reviewable stages and keep you updated, so feedback lands while there is still time to act on it.
        - listitem [ref=e151]:
          - text: "04"
          - heading "Launch and handover" [level=3] [ref=e152]
          - paragraph [ref=e153]: We deploy, hand over the files and accounts you own, and stay available for a defined support period after delivery.
    - generic [ref=e155]:
      - heading "Graphic Design FAQs" [level=2] [ref=e157]
      - generic [ref=e158]:
        - group [ref=e159]:
          - heading "How much does brand design cost?" [level=3] [ref=e161]
        - group [ref=e165]:
          - heading "How long does a design project take?" [level=3] [ref=e167]
        - group [ref=e171]:
          - heading "How do I get started?" [level=3] [ref=e173]
    - generic [ref=e178]:
      - generic [ref=e180]:
        - heading "Want to learn ui/ux design yourself?" [level=2] [ref=e181]
        - paragraph [ref=e182]: We also teach it. The UI/UX Design cohort runs for 3 months and costs ₦50,000 — Design intuitive, beautiful digital products. Learn user research, wireframing, prototyping, and high-fidelity UI design with Figma.
        - link "See the UI/UX Design cohort" [ref=e183] [cursor=pointer]:
          - /url: /cohorts/ui-ux-design
      - generic [ref=e186]:
        - heading "Other services" [level=2] [ref=e187]
        - list [ref=e188]:
          - listitem [ref=e189]:
            - link "Web Development servicesCustom websites and web applications built with modern frameworks for speed, scalability, and stunning design." [ref=e190] [cursor=pointer]:
              - /url: /services/web-development
              - generic [ref=e191]: Web Development services
              - text: Custom websites and web applications built with modern frameworks for speed, scalability, and stunning design.
          - listitem [ref=e192]:
            - link "Video Editing servicesProfessional video editing, motion graphics, and post-production that brings your stories to life." [ref=e193] [cursor=pointer]:
              - /url: /services/video-editing
              - generic [ref=e194]: Video Editing services
              - text: Professional video editing, motion graphics, and post-production that brings your stories to life.
          - listitem [ref=e195]:
            - link "UI/UX Design servicesUser-centered design that transforms complex problems into intuitive, beautiful digital experiences." [ref=e196] [cursor=pointer]:
              - /url: /services/ui-ux-design
              - generic [ref=e197]: UI/UX Design services
              - text: User-centered design that transforms complex problems into intuitive, beautiful digital experiences.
          - listitem [ref=e198]:
            - link "App Development servicesNative and cross-platform mobile applications that deliver seamless experiences on iOS and Android." [ref=e199] [cursor=pointer]:
              - /url: /services/app-development
              - generic [ref=e200]: App Development services
              - text: Native and cross-platform mobile applications that deliver seamless experiences on iOS and Android.
      - link "Request a service" [ref=e203] [cursor=pointer]:
        - /url: /request
  - contentinfo [ref=e206]:
    - generic [ref=e207]:
      - generic [ref=e208]:
        - generic [ref=e209]:
          - link "Kortix Digital" [ref=e210] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e213]: Digital agency services and mentorship cohorts for the next generation.
          - generic [ref=e214]:
            - link "WhatsApp" [ref=e215] [cursor=pointer]:
              - /url: https://wa.me/2347071617216
            - link "Discord" [ref=e218] [cursor=pointer]:
              - /url: https://discordapp.com/users/1466951307708469516
            - link "kortixdigital@gmail.com" [ref=e223] [cursor=pointer]:
              - /url: mailto:kortixdigital@gmail.com
        - generic [ref=e227]:
          - heading "Services" [level=4] [ref=e228]
          - list [ref=e229]:
            - listitem [ref=e230]:
              - link "Web Development" [ref=e231] [cursor=pointer]:
                - /url: /services/web-development
            - listitem [ref=e232]:
              - link "Graphic Design" [ref=e233] [cursor=pointer]:
                - /url: /services/graphic-design
            - listitem [ref=e234]:
              - link "Video Editing" [ref=e235] [cursor=pointer]:
                - /url: /services/video-editing
            - listitem [ref=e236]:
              - link "UI/UX Design" [ref=e237] [cursor=pointer]:
                - /url: /services/ui-ux-design
            - listitem [ref=e238]:
              - link "App Development" [ref=e239] [cursor=pointer]:
                - /url: /services/app-development
        - generic [ref=e240]:
          - heading "Cohorts" [level=4] [ref=e241]
          - list [ref=e242]:
            - listitem [ref=e243]:
              - link "Web Development" [ref=e244] [cursor=pointer]:
                - /url: /cohorts/web-development
            - listitem [ref=e245]:
              - link "App Development" [ref=e246] [cursor=pointer]:
                - /url: /cohorts/app-development
            - listitem [ref=e247]:
              - link "Data Analysis" [ref=e248] [cursor=pointer]:
                - /url: /cohorts/data-analysis
            - listitem [ref=e249]:
              - link "Cybersecurity" [ref=e250] [cursor=pointer]:
                - /url: /cohorts/cybersecurity
            - listitem [ref=e251]:
              - link "UI/UX Design" [ref=e252] [cursor=pointer]:
                - /url: /cohorts/ui-ux-design
            - listitem [ref=e253]:
              - link "Digital Marketing" [ref=e254] [cursor=pointer]:
                - /url: /cohorts/digital-marketing
            - listitem [ref=e255]:
              - link "Content Creation" [ref=e256] [cursor=pointer]:
                - /url: /cohorts/content-creation
            - listitem [ref=e257]:
              - link "Video Editing" [ref=e258] [cursor=pointer]:
                - /url: /cohorts/video-editing
            - listitem [ref=e259]:
              - link "Web3" [ref=e260] [cursor=pointer]:
                - /url: /cohorts/web3
        - generic [ref=e261]:
          - heading "Company" [level=4] [ref=e262]
          - list [ref=e263]:
            - listitem [ref=e264]:
              - link "About Us" [ref=e265] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e266]:
              - link "Contact" [ref=e267] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e268]:
              - link "Request a Service" [ref=e269] [cursor=pointer]:
                - /url: /request
            - listitem [ref=e270]:
              - link "Blog & Guides" [ref=e271] [cursor=pointer]:
                - /url: /blog
      - generic [ref=e272]:
        - list [ref=e273]:
          - listitem [ref=e274]:
            - link "Privacy Policy" [ref=e275] [cursor=pointer]:
              - /url: /privacy-policy
          - listitem [ref=e276]:
            - link "Terms of Service" [ref=e277] [cursor=pointer]:
              - /url: /terms-of-service
          - listitem [ref=e278]:
            - link "Refund Policy" [ref=e279] [cursor=pointer]:
              - /url: /refund-policy
        - generic [ref=e280]:
          - paragraph [ref=e281]: © 2026 Kortix Digital. All rights reserved.
          - paragraph [ref=e282]: We Build. We Teach. We Transform.
    - paragraph [ref=e284]: KORTIX DIGITAL
  - generic [ref=e285]:
    - button "Open chat" [ref=e287]
    - generic [ref=e290]:
      - link "Chat on WhatsApp" [ref=e291] [cursor=pointer]:
        - /url: https://wa.me/2347071617216
        - text: Chat with us
      - link "Join Discord" [ref=e295] [cursor=pointer]:
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