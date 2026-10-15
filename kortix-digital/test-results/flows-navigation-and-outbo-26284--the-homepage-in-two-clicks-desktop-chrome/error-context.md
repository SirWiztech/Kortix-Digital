# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: flows.spec.ts >> navigation and outbound links >> the request form is reachable from the homepage in two clicks
- Location: tests\e2e\flows.spec.ts:161:7

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
      - generic [ref=e29]: Digital Agency & Mentorship Platform
      - heading "We Build. We Teach. We Transform." [level=1] [ref=e31]
      - generic [ref=e32]:
        - paragraph [ref=e33]: Professional digital agency services paired with intensive mentorship cohorts — everything you need to succeed in the digital economy.
        - paragraph [ref=e34]: Web development, app development, graphic design and video editing for businesses, plus paid mentorship cohorts in web development, data analysis, cybersecurity, UI/UX design and digital marketing.
      - generic [ref=e35]:
        - link "Explore Services" [ref=e37] [cursor=pointer]:
          - /url: /services
        - link "Join a Cohort" [ref=e39] [cursor=pointer]:
          - /url: /cohorts
    - generic [ref=e41]:
      - generic [ref=e43]:
        - heading "Digital Agency Services" [level=2] [ref=e44]
        - paragraph [ref=e45]: Websites, mobile apps, brand design and video editing for businesses in Nigeria and beyond — scoped, quoted and delivered by the Kortix Digital team.
      - generic [ref=e46]:
        - 'link "Web Development services: what''s included, pricing and how to request a quote" [ref=e55] [cursor=pointer]':
          - /url: /services/web-development
          - heading "Web Development" [level=3] [ref=e60]
          - paragraph [ref=e61]: Custom websites and web applications built with modern frameworks for speed, scalability, and stunning design.
          - generic [ref=e62]: Request Quote
        - 'link "Graphic Design services: what''s included, pricing and how to request a quote" [ref=e73] [cursor=pointer]':
          - /url: /services/graphic-design
          - heading "Graphic Design" [level=3] [ref=e81]
          - paragraph [ref=e82]: Visual identities, brand systems, and marketing materials that make your brand unforgettable.
          - generic [ref=e83]: Request Quote
        - 'link "Video Editing services: what''s included, pricing and how to request a quote" [ref=e94] [cursor=pointer]':
          - /url: /services/video-editing
          - heading "Video Editing" [level=3] [ref=e99]
          - paragraph [ref=e100]: Professional video editing, motion graphics, and post-production that brings your stories to life.
          - generic [ref=e101]: Request Quote
        - 'link "UI/UX Design services: what''s included, pricing and how to request a quote" [ref=e112] [cursor=pointer]':
          - /url: /services/ui-ux-design
          - heading "UI/UX Design" [level=3] [ref=e119]
          - paragraph [ref=e120]: User-centered design that transforms complex problems into intuitive, beautiful digital experiences.
          - generic [ref=e121]: Request Quote
        - 'link "App Development services: what''s included, pricing and how to request a quote" [ref=e132] [cursor=pointer]':
          - /url: /services/app-development
          - heading "App Development" [level=3] [ref=e136]
          - paragraph [ref=e137]: Native and cross-platform mobile applications that deliver seamless experiences on iOS and Android.
          - generic [ref=e138]: Request Quote
      - link "Compare all 5 agency services" [ref=e143] [cursor=pointer]:
        - /url: /services
    - generic [ref=e151]:
      - generic [ref=e153]:
        - heading "Paid Mentorship Cohorts & Tech Courses" [level=2] [ref=e154]
        - paragraph [ref=e155]: Intensive, mentor-led cohorts that take you from beginner to job-ready in web development, app development, data analysis, cybersecurity, UI/UX design, digital marketing and more.
      - generic [ref=e156]:
        - generic [ref=e165]:
          - heading "Web Development" [level=3] [ref=e170]
          - paragraph [ref=e171]: Master frontend and backend web development from zero to job-ready. Build real-world projects with HTML, CSS, JavaScript, React, Node.js, and databases.
          - generic [ref=e172]: 6 months (3 months frontend + 3 months backend)
          - generic [ref=e177]: ₦100,000₦300,000
          - generic [ref=e178]:
            - link "Join the Web Development cohort WhatsApp group" [ref=e180] [cursor=pointer]:
              - /url: https://chat.whatsapp.com/DqODmH902UN4xqmyID5Lm1?s=cl&p=a&mlu=4
              - text: Join WhatsApp Group
            - 'link "Web Development cohort details: 6 months (3 months frontend + 3 months backend), curriculum and fees" [ref=e187] [cursor=pointer]':
              - /url: /cohorts/web-development
              - text: Web Development cohort details
        - generic [ref=e198]:
          - heading "App Development" [level=3] [ref=e202]
          - paragraph [ref=e203]: Learn to build mobile applications for iOS and Android using React Native and Flutter. From UI design to app store deployment.
          - generic [ref=e204]: 3 months
          - generic [ref=e209]: ₦100,000₦300,000
          - generic [ref=e210]:
            - link "Join the App Development cohort WhatsApp group" [ref=e212] [cursor=pointer]:
              - /url: https://chat.whatsapp.com/Be4OXW3A8qd2uPrRgvawgA?s=cl&p=a&mlu=4
              - text: Join WhatsApp Group
            - 'link "App Development cohort details: 3 months, curriculum and fees" [ref=e219] [cursor=pointer]':
              - /url: /cohorts/app-development
              - text: App Development cohort details
        - generic [ref=e230]:
          - heading "Cybersecurity" [level=3] [ref=e234]
          - paragraph [ref=e235]: Develop the skills to protect systems, networks, and data from digital attacks. Learn ethical hacking, threat analysis, and security protocols.
          - generic [ref=e236]: 3 months
          - generic [ref=e241]: ₦50,000₦150,000
          - generic [ref=e242]:
            - link "Join the Cybersecurity cohort WhatsApp group" [ref=e244] [cursor=pointer]:
              - /url: https://chat.whatsapp.com/GH6onAcWPDz3n7GZh1ZFN7?s=cl&p=a&mlu=4
              - text: Join WhatsApp Group
            - 'link "Cybersecurity cohort details: 3 months, curriculum and fees" [ref=e251] [cursor=pointer]':
              - /url: /cohorts/cybersecurity
              - text: Cybersecurity cohort details
        - generic [ref=e262]:
          - heading "Data Analysis" [level=3] [ref=e266]
          - paragraph [ref=e267]: Transform raw data into actionable insights. Master Excel, SQL, Python, and data visualization tools to make data-driven decisions.
          - generic [ref=e268]: 3 months
          - generic [ref=e273]: ₦50,000₦150,000
          - generic [ref=e274]:
            - link "Join the Data Analysis cohort WhatsApp group" [ref=e276] [cursor=pointer]:
              - /url: https://chat.whatsapp.com/HXUIftXJHijBNRhdyWfK3D?s=cl&p=a&mlu=4
              - text: Join WhatsApp Group
            - 'link "Data Analysis cohort details: 3 months, curriculum and fees" [ref=e283] [cursor=pointer]':
              - /url: /cohorts/data-analysis
              - text: Data Analysis cohort details
        - generic [ref=e294]:
          - heading "Digital Marketing" [level=3] [ref=e299]
          - paragraph [ref=e300]: Learn to build and execute digital marketing strategies across social media, search engines, email, and content platforms.
          - generic [ref=e301]: 1 month
          - generic [ref=e306]: ₦50,000₦150,000
          - generic [ref=e307]:
            - link "Join the Digital Marketing cohort WhatsApp group" [ref=e309] [cursor=pointer]:
              - /url: https://chat.whatsapp.com/CA5A0pkg8LXA71R50ij3fS?s=cl&p=a&mlu=4
              - text: Join WhatsApp Group
            - 'link "Digital Marketing cohort details: 1 month, curriculum and fees" [ref=e316] [cursor=pointer]':
              - /url: /cohorts/digital-marketing
              - text: Digital Marketing cohort details
        - generic [ref=e327]:
          - heading "UI/UX Design" [level=3] [ref=e334]
          - paragraph [ref=e335]: Design intuitive, beautiful digital products. Learn user research, wireframing, prototyping, and high-fidelity UI design with Figma.
          - generic [ref=e336]: 3 months
          - generic [ref=e341]: ₦50,000₦150,000
          - generic [ref=e342]:
            - link "Join the UI/UX Design cohort WhatsApp group" [ref=e344] [cursor=pointer]:
              - /url: https://chat.whatsapp.com/L6KCoZRWTgHEtK4XENr83W?s=cl&p=a&mlu=4
              - text: Join WhatsApp Group
            - 'link "UI/UX Design cohort details: 3 months, curriculum and fees" [ref=e351] [cursor=pointer]':
              - /url: /cohorts/ui-ux-design
              - text: UI/UX Design cohort details
        - generic [ref=e362]:
          - heading "Content Creation" [level=3] [ref=e366]
          - paragraph [ref=e367]: Build a personal brand and create compelling content across platforms. Learn scripting, storytelling, production, and growth strategies.
          - generic [ref=e368]: 1 month
          - generic [ref=e373]: ₦50,000₦150,000
          - generic [ref=e374]:
            - generic [ref=e375]: Link Coming Soon
            - 'link "Content Creation cohort details: 1 month, curriculum and fees" [ref=e382] [cursor=pointer]':
              - /url: /cohorts/content-creation
              - text: Content Creation cohort details
        - generic [ref=e393]:
          - heading "Video Editing" [level=3] [ref=e398]
          - paragraph [ref=e399]: Master professional video editing from cuts to color grading. Learn industry-standard tools and techniques for social media, YouTube, and commercial projects.
          - generic [ref=e400]: 1 month
          - generic [ref=e405]: ₦50,000₦150,000
          - generic [ref=e406]:
            - link "Join the Video Editing cohort WhatsApp group" [ref=e408] [cursor=pointer]:
              - /url: https://chat.whatsapp.com/B6dhVwFb46ED7pLN1sR44q?s=cl&p=a&mlu=4
              - text: Join WhatsApp Group
            - 'link "Video Editing cohort details: 1 month, curriculum and fees" [ref=e415] [cursor=pointer]':
              - /url: /cohorts/video-editing
              - text: Video Editing cohort details
        - generic [ref=e426]:
          - heading "Web3" [level=3] [ref=e431]
          - paragraph [ref=e432]: Explore blockchain technology, smart contracts, and decentralized applications. Learn Solidity, DeFi concepts, and Web3 development.
          - generic [ref=e433]: 3 months
          - generic [ref=e438]: ₦100,000₦300,000
          - generic [ref=e439]:
            - link "Join the Web3 cohort WhatsApp group" [ref=e441] [cursor=pointer]:
              - /url: https://chat.whatsapp.com/JPScQLffyrA01Ovxr46OAg?s=cl&p=a&mlu=4
              - text: Join WhatsApp Group
            - 'link "Web3 cohort details: 3 months, curriculum and fees" [ref=e448] [cursor=pointer]':
              - /url: /cohorts/web3
              - text: Web3 cohort details
      - link "See all 9 cohorts, fees and durations" [ref=e453] [cursor=pointer]:
        - /url: /cohorts
    - generic [ref=e457]:
      - generic [ref=e459]:
        - text: Testimonials
        - heading "What Our Community Says" [level=2] [ref=e460]
        - paragraph [ref=e461]: Real stories from clients and cohort graduates who have grown with Kortix Digital.
      - generic [ref=e463]:
        - figure "AO Adaeze O. Cohort Graduate · Web Development" [ref=e465]:
          - blockquote [ref=e482]: “The web development cohort completely changed my career. I went from zero coding experience to building real client projects in six months. The mentors are incredibly patient and hands-on.”
          - generic [ref=e483]:
            - generic [ref=e484]: AO
            - generic [ref=e485]:
              - paragraph [ref=e486]: Adaeze O.
              - paragraph [ref=e487]: Cohort Graduate · Web Development
        - button "Previous testimonial" [ref=e488]
        - button "Next testimonial" [ref=e491]
        - generic [ref=e494]:
          - button "Go to testimonial 1" [ref=e495]
          - button "Go to testimonial 2" [ref=e496]
          - button "Go to testimonial 3" [ref=e497]
          - button "Go to testimonial 4" [ref=e498]
          - button "Go to testimonial 5" [ref=e499]
          - button "Go to testimonial 6" [ref=e500]
    - generic [ref=e502]:
      - generic [ref=e504]:
        - text: Brand Reveal
        - heading "Our Brand Story in Motion" [level=2] [ref=e505]
        - paragraph [ref=e506]: A look at who we are and what we stand for — built, designed, and edited in-house by the Kortix team.
      - generic [ref=e508]:
        - button "Play the Kortix Digital brand reveal video" [ref=e509]: Play the brand reveal
        - generic [ref=e513]: Motion Graphics
    - generic [ref=e521]:
      - generic [ref=e522]: Our Community
      - heading "Join a Growing Community of Digital Creators" [level=2] [ref=e528]
      - paragraph [ref=e529]: Connect with mentors, collaborate with peers, and grow alongside other learners and businesses building the future with Kortix Digital.
      - generic [ref=e530]:
        - link "Join a Cohort" [ref=e531] [cursor=pointer]:
          - /url: /cohorts
        - link "Chat on WhatsApp" [ref=e532] [cursor=pointer]:
          - /url: https://wa.me/2347071617216
    - generic [ref=e539]:
      - generic [ref=e541]:
        - text: FAQ
        - heading "Frequently Asked Questions" [level=2] [ref=e542]
        - paragraph [ref=e543]: Everything you need to know about our cohorts, services, pricing, and support.
      - generic [ref=e544]:
        - group [ref=e545]:
          - heading "How do the mentorship cohorts work?" [level=3] [ref=e547]
        - group [ref=e551]:
          - heading "How do I get access to the WhatsApp group?" [level=3] [ref=e553]
        - group [ref=e557]:
          - heading "What are the pricing and payment options?" [level=3] [ref=e559]
        - group [ref=e563]:
          - heading "How do I request a service or get a budget quote?" [level=3] [ref=e565]
        - group [ref=e569]:
          - heading "How long does it take to complete a project or cohort?" [level=3] [ref=e571]
        - group [ref=e575]:
          - heading "Is there a refund policy?" [level=3] [ref=e577]
        - group [ref=e581]:
          - heading "What support is available after I enroll or hire Kortix?" [level=3] [ref=e583]
    - generic [ref=e589]:
      - heading "Ready to Get Started?" [level=2] [ref=e590]
      - paragraph [ref=e591]: Whether you need a website built or want to learn a new skill, we're here to help you succeed.
      - generic [ref=e592]:
        - link "Request a Service" [ref=e593] [cursor=pointer]:
          - /url: /request
        - link "Chat on WhatsApp" [ref=e594] [cursor=pointer]:
          - /url: https://wa.me/2347071617216
  - contentinfo [ref=e598]:
    - generic [ref=e599]:
      - generic [ref=e600]:
        - generic [ref=e601]:
          - link "Kortix Digital" [ref=e602] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e605]: Digital agency services and mentorship cohorts for the next generation.
          - generic [ref=e606]:
            - link "WhatsApp" [ref=e607] [cursor=pointer]:
              - /url: https://wa.me/2347071617216
            - link "Discord" [ref=e610] [cursor=pointer]:
              - /url: https://discordapp.com/users/1466951307708469516
            - link "kortixdigital@gmail.com" [ref=e615] [cursor=pointer]:
              - /url: mailto:kortixdigital@gmail.com
        - generic [ref=e619]:
          - heading "Services" [level=4] [ref=e620]
          - list [ref=e621]:
            - listitem [ref=e622]:
              - link "Web Development" [ref=e623] [cursor=pointer]:
                - /url: /services/web-development
            - listitem [ref=e624]:
              - link "Graphic Design" [ref=e625] [cursor=pointer]:
                - /url: /services/graphic-design
            - listitem [ref=e626]:
              - link "Video Editing" [ref=e627] [cursor=pointer]:
                - /url: /services/video-editing
            - listitem [ref=e628]:
              - link "UI/UX Design" [ref=e629] [cursor=pointer]:
                - /url: /services/ui-ux-design
            - listitem [ref=e630]:
              - link "App Development" [ref=e631] [cursor=pointer]:
                - /url: /services/app-development
        - generic [ref=e632]:
          - heading "Cohorts" [level=4] [ref=e633]
          - list [ref=e634]:
            - listitem [ref=e635]:
              - link "Web Development" [ref=e636] [cursor=pointer]:
                - /url: /cohorts/web-development
            - listitem [ref=e637]:
              - link "App Development" [ref=e638] [cursor=pointer]:
                - /url: /cohorts/app-development
            - listitem [ref=e639]:
              - link "Data Analysis" [ref=e640] [cursor=pointer]:
                - /url: /cohorts/data-analysis
            - listitem [ref=e641]:
              - link "Cybersecurity" [ref=e642] [cursor=pointer]:
                - /url: /cohorts/cybersecurity
            - listitem [ref=e643]:
              - link "UI/UX Design" [ref=e644] [cursor=pointer]:
                - /url: /cohorts/ui-ux-design
            - listitem [ref=e645]:
              - link "Digital Marketing" [ref=e646] [cursor=pointer]:
                - /url: /cohorts/digital-marketing
            - listitem [ref=e647]:
              - link "Content Creation" [ref=e648] [cursor=pointer]:
                - /url: /cohorts/content-creation
            - listitem [ref=e649]:
              - link "Video Editing" [ref=e650] [cursor=pointer]:
                - /url: /cohorts/video-editing
            - listitem [ref=e651]:
              - link "Web3" [ref=e652] [cursor=pointer]:
                - /url: /cohorts/web3
        - generic [ref=e653]:
          - heading "Company" [level=4] [ref=e654]
          - list [ref=e655]:
            - listitem [ref=e656]:
              - link "About Us" [ref=e657] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e658]:
              - link "Contact" [ref=e659] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e660]:
              - link "Request a Service" [ref=e661] [cursor=pointer]:
                - /url: /request
            - listitem [ref=e662]:
              - link "Blog & Guides" [ref=e663] [cursor=pointer]:
                - /url: /blog
      - generic [ref=e664]:
        - list [ref=e665]:
          - listitem [ref=e666]:
            - link "Privacy Policy" [ref=e667] [cursor=pointer]:
              - /url: /privacy-policy
          - listitem [ref=e668]:
            - link "Terms of Service" [ref=e669] [cursor=pointer]:
              - /url: /terms-of-service
          - listitem [ref=e670]:
            - link "Refund Policy" [ref=e671] [cursor=pointer]:
              - /url: /refund-policy
        - generic [ref=e672]:
          - paragraph [ref=e673]: © 2026 Kortix Digital. All rights reserved.
          - paragraph [ref=e674]: We Build. We Teach. We Transform.
    - paragraph [ref=e676]: KORTIX DIGITAL
  - generic [ref=e677]:
    - button "Open chat" [ref=e679]
    - generic [ref=e682]:
      - link "Chat on WhatsApp" [ref=e683] [cursor=pointer]:
        - /url: https://wa.me/2347071617216
        - text: Chat with us
      - link "Join Discord" [ref=e687] [cursor=pointer]:
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