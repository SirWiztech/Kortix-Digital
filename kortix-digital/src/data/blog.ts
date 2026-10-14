export interface BlogOutlineSection {
  heading: string;
  points: string[];
}

/**
 * Blog posts.
 *
 * These are starter outlines only — deliberately no generated filler copy.
 * A post with `published: false` is rendered at its URL but marked `noindex`
 * and excluded from the sitemap until a human writes and publishes it.
 *
 * TODO(owner): write the full articles, then set `published: true` and update
 * `updated`. Do not publish these before the facts (prices, curriculum, team)
 * are confirmed, so nothing on the site contradicts itself.
 */
export interface BlogPost {
  slug: string;
  title: string;
  /** Meta description, ~140-160 chars. */
  description: string;
  published: boolean;
  /** ISO date of the last content change. */
  updated: string;
  author: string;
  /** Primary query this article should target. */
  primaryKeyword: string;
  outline: BlogOutlineSection[];
  /** Internal linking targets (existing routes). */
  relatedCohortSlug?: string;
  relatedServiceSlug?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-start-a-tech-career-in-nigeria",
    title: "How to Start a Tech Career in Nigeria (2026 Beginner's Guide)",
    description:
      "A practical, no-hype guide to starting a tech career in Nigeria: choosing a track, learning roadmap, realistic timelines, and how to get your first paid work.",
    published: false,
    updated: "2026-10-14",
    author: "Kortix Digital",
    primaryKeyword: "how to start a tech career in Nigeria",
    relatedCohortSlug: "web-development",
    relatedServiceSlug: "web-development",
    outline: [
      {
        heading: "Is tech still worth it in Nigeria?",
        points: [
          "Which roles are actually hiring locally vs remotely",
          "Salary ranges: TODO(owner) — collect real, sourced figures before publishing",
          "The difference between a job, freelancing and agency work",
        ],
      },
      {
        heading: "Pick one track and stop switching",
        points: [
          "Frontend/backend web development, mobile apps, data analysis, cybersecurity, UI/UX, digital marketing",
          "Honest skill-fit test for each track",
          "Link each track to its Kortix cohort page",
        ],
      },
      {
        heading: "A 6-month learning plan",
        points: [
          "Months 1-3: fundamentals and one real project",
          "Months 4-6: portfolio, deployment, GitHub, and interviewing",
          "Why building in public beats collecting certificates",
        ],
      },
      {
        heading: "Getting your first paid work",
        points: [
          "Where Nigerian beginners actually find clients",
          "How to price your first three projects",
          "Turning coursework into a portfolio that converts",
        ],
      },
      {
        heading: "FAQ",
        points: [
          "Do I need a computer science degree?",
          "How much does it cost to learn in Nigeria?",
          "Can I learn while keeping a full-time job?",
        ],
      },
    ],
  },
  {
    slug: "web-development-roadmap-for-beginners",
    title: "Web Development Roadmap for Beginners (Step-by-Step)",
    description:
      "A step-by-step web development roadmap for beginners: HTML, CSS, JavaScript, React, Node.js, databases and deployment — with the order that actually works.",
    published: false,
    updated: "2026-10-14",
    author: "Kortix Digital",
    primaryKeyword: "web development roadmap for beginners",
    relatedCohortSlug: "web-development",
    relatedServiceSlug: "web-development",
    outline: [
      {
        heading: "The order matters more than the tools",
        points: [
          "Why beginners stall when they learn frameworks first",
          "The five layers: markup, styling, logic, framework, data",
        ],
      },
      {
        heading: "Weeks 1-4: HTML, CSS and the browser",
        points: [
          "Semantic HTML and why it affects SEO and accessibility",
          "Layout with Flexbox and CSS Grid",
          "Mini-project: a responsive personal page",
        ],
      },
      {
        heading: "Weeks 5-12: JavaScript fundamentals",
        points: [
          "DOM, events, fetch and async/await",
          "Mini-project: a small app that talks to a public API",
        ],
      },
      {
        heading: "Months 4-6: React, Node.js and databases",
        points: [
          "Components, state and routing",
          "Building a REST API with Node.js",
          "SQL vs NoSQL: SQLite, MySQL, PostgreSQL, MongoDB",
        ],
      },
      {
        heading: "From learner to hired",
        points: [
          "Portfolio projects that impress Nigerian employers and clients",
          "Deploying on a real web server",
          "Where the Kortix Web Development cohort fits in",
        ],
      },
    ],
  },
  {
    slug: "how-much-does-a-website-cost-in-nigeria",
    title: "How Much Does a Website Cost in Nigeria? (2026 Breakdown)",
    description:
      "What a website actually costs in Nigeria in 2026: the factors that move the price, typical ranges by site type, and how to avoid paying twice for the same work.",
    published: false,
    updated: "2026-10-14",
    author: "Kortix Digital",
    primaryKeyword: "how much does a website cost in Nigeria",
    relatedServiceSlug: "web-development",
    relatedCohortSlug: "web-development",
    outline: [
      {
        heading: "What you are actually paying for",
        points: [
          "Design, development, content, hosting and maintenance are separate line items",
          "Why 'cheap' sites often cost more in year two",
        ],
      },
      {
        heading: "Price ranges by website type",
        points: [
          "TODO(owner): publish only ranges you can stand behind — qualify them as starting prices",
          "Landing page, business website, e-commerce, custom web application",
          "Kortix published starting prices: frontend from ₦50,000, backend from ₦50,000, full stack from ₦100,000",
        ],
      },
      {
        heading: "The five factors that move the price",
        points: [
          "Number of unique page templates",
          "Custom functionality (payments, dashboards, integrations)",
          "Content readiness (who writes and sources the copy and images)",
          "Timeline and revisions",
          "Who hosts and who maintains it after launch",
        ],
      },
      {
        heading: "How to compare three quotes fairly",
        points: [
          "A checklist of questions to send every agency",
          "Deposits, milestones and what to put in writing",
          "Red flags: no written scope, no post-launch support terms",
        ],
      },
      {
        heading: "FAQ",
        points: [
          "Can I pay in instalments?",
          "Do I own the code and the domain name?",
          "How long does a business website take?",
        ],
      },
    ],
  },
];

export function getPublishedBlogPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.published);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
