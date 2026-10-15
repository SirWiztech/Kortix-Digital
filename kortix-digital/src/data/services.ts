export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  title: string;
  /** Short summary used on cards and in structured data. */
  description: string;
  longDescription: string;
  features: string[];
  iconName: string;
  pricing: string;
  /** Meta description, 140-160 chars, written for search intent. */
  metaDescription: string;
  /** Who the service is for — positioning, not a statistic. */
  audience: string;
  process: ServiceProcessStep[];
  /**
   * Technologies named in this service's own copy. Empty when the site does not
   * name any — nothing is guessed here.
   * TODO(owner): confirm the tool list for each service.
   */
  tools: string[];
  faqs: ServiceFaq[];
  /** Cross-link to the matching training cohort, where one exists. */
  relatedCohortSlug?: string;
  /** ISO date this entry's copy last changed; drives sitemap lastModified. */
  updated: string;
}

/**
 * Shared process steps. These repeat on every service page on purpose: they
 * describe how Kortix already says it works (see the site FAQs about quotes,
 * timelines and post-delivery support) and never promise a specific date.
 */
const standardProcess: ServiceProcessStep[] = [
  {
    title: "Tell us about the project",
    description:
      "Send the details through the request form: what you need, who it is for, your timeline and your budget range.",
  },
  {
    title: "Scope and fixed quote",
    description:
      "We review the requirements and reply with a written scope, a realistic timeline and a clear fixed budget quote — no hidden charges.",
  },
  {
    title: "Design and build",
    description:
      "We build in reviewable stages and keep you updated, so feedback lands while there is still time to act on it.",
  },
  {
    title: "Launch and handover",
    description:
      "We deploy, hand over the files and accounts you own, and stay available for a defined support period after delivery.",
  },
];

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    description:
      "Custom websites and web applications built with modern frameworks for speed, scalability, and stunning design.",
    longDescription:
      "From landing pages to full-stack web applications, we craft digital experiences that convert visitors into customers. Our team uses cutting-edge technologies like React, Next.js, and Node.js to build fast, secure, and scalable solutions tailored to your business goals.",
    features: [
      "Responsive design for all devices",
      "SEO-optimized architecture",
      "Performance-first development",
      "Custom CMS integrations",
      "E-commerce solutions",
      "API development & integration",
    ],
    iconName: "Globe",
    pricing:
      "Frontend from ₦50,000 · Backend from ₦50,000 · Full Stack from ₦100,000",
    metaDescription:
      "Get a fast, SEO-ready website or web app built in Nigeria. Frontend from ₦50,000, backend from ₦50,000 and full stack from ₦100,000 with a fixed quote.",
    audience:
      "Businesses, startups and personal brands that need a website that loads quickly, ranks on Google and is built to grow — not a template that breaks the moment you need to change something.",
    process: standardProcess,
    tools: ["React", "Next.js", "Node.js"],
    faqs: [
      {
        question: "How much does a website cost?",
        answer:
          "Frontend work starts from ₦50,000, backend from ₦50,000, and a full stack build from ₦100,000. Because scope changes the price, we confirm a fixed budget quote in writing before any work starts.",
      },
      {
        question: "How long does a website take?",
        answer:
          "It depends on scope — a landing page can take days, while a full site or web application can take a few weeks. You always get a realistic timeline upfront with your quote.",
      },
      {
        question: "How do I get started?",
        answer:
          "Fill in the request form with your goals, timeline and budget range. We review it and get back to you within 24 hours with a tailored proposal.",
      },
    ],
    relatedCohortSlug: "web-development",
    updated: "2026-10-14",
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    description:
      "Visual identities, brand systems, and marketing materials that make your brand unforgettable.",
    longDescription:
      "Great design is more than aesthetics — it's strategic communication. We create brand identities, marketing collateral, social media assets, and print materials that resonate with your audience and elevate your brand perception.",
    features: [
      "Logo & brand identity design",
      "Marketing collateral",
      "Social media graphics",
      "Print design (flyers, banners, brochures)",
      "Brand guideline documentation",
      "Packaging design",
    ],
    iconName: "Palette",
    pricing: "Contact for pricing",
    metaDescription:
      "Logo, brand identity, social media graphics, print and packaging design for Nigerian businesses — with brand guidelines you can actually reuse.",
    audience:
      "New brands that need an identity from scratch and established businesses whose visuals have drifted out of sync with where they are now.",
    process: standardProcess,
    // TODO(owner): list the design tools you actually use so they can be shown
    // here. Nothing in the current site copy names them, so none are listed.
    tools: [],
    faqs: [
      {
        question: "How much does brand design cost?",
        answer:
          "It depends on scope — a single logo is a different job from a full identity system with guidelines. Send your requirements through the request form and we'll quote a fixed price.",
      },
      {
        question: "How long does a design project take?",
        answer:
          "It depends on scope and on how quickly feedback comes back. We give you a realistic timeline with the quote, and flag anything that would push it.",
      },
      {
        question: "How do I get started?",
        answer:
          "Fill in the request form with your goals, timeline and budget range. We review it and get back to you within 24 hours with a tailored proposal.",
      },
    ],
    relatedCohortSlug: "ui-ux-design",
    updated: "2026-10-14",
  },
  {
    slug: "video-editing",
    title: "Video Editing",
    description:
      "Professional video editing, motion graphics, and post-production that brings your stories to life.",
    longDescription:
      "From social media reels to full-length promotional videos, we handle all aspects of post-production. Our editors craft compelling narratives with smooth transitions, color grading, sound design, and motion graphics that captivate audiences.",
    features: [
      "Social media reels & shorts",
      "Promotional & explainer videos",
      "Color grading & correction",
      "Sound design & mixing",
      "Motion graphics & VFX",
      "YouTube content editing",
    ],
    iconName: "Video",
    pricing: "Contact for pricing",
    metaDescription:
      "Video editing and post-production for reels, YouTube and brand films: cuts, colour grading, sound design and motion graphics, edited in-house.",
    audience:
      "Creators, brands and businesses that shoot footage but need it finished properly — paced, graded, mixed and sized for each platform.",
    process: standardProcess,
    // TODO(owner): confirm the editing software you want listed here. The video
    // cohort mentions Adobe Premiere Pro and DaVinci Resolve, but this service
    // page does not name any tool, so none are listed rather than assumed.
    tools: [],
    faqs: [
      {
        question: "How much does video editing cost?",
        answer:
          "It depends on the length, the amount of footage and the finishing you need — reels are a very different job from a full brand film. Send the brief and we'll quote a fixed price.",
      },
      {
        question: "How many revisions are included?",
        answer:
          "Revisions are agreed as part of the scope so nothing is ambiguous. Tell us how many review rounds you expect when you send the brief and we'll build that into the quote.",
      },
      {
        question: "How do I get started?",
        answer:
          "Fill in the request form with your goals, timeline and budget range. We review it and get back to you within 24 hours with a tailored proposal.",
      },
    ],
    relatedCohortSlug: "video-editing",
    updated: "2026-10-14",
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "User-centered design that transforms complex problems into intuitive, beautiful digital experiences.",
    longDescription:
      "We design interfaces that users love. Through research-driven UX strategy and pixel-perfect UI design, we create digital products that are not only visually stunning but also intuitive and accessible. From wireframes to high-fidelity prototypes, every interaction is crafted with purpose.",
    features: [
      "User research & persona development",
      "Wireframing & prototyping",
      "UI design systems",
      "Usability testing",
      "Interaction design",
      "Accessibility compliance",
    ],
    iconName: "PenTool",
    pricing: "Contact for pricing",
    metaDescription:
      "UI/UX design for web and mobile products: user research, wireframes, high-fidelity UI, design systems and clickable prototypes built in Figma.",
    audience:
      "Teams building a product or rebuilding one that users find confusing — especially where development is about to start and the flows still need to be right.",
    process: standardProcess,
    tools: ["Figma"],
    faqs: [
      {
        question: "How much does UI/UX design cost?",
        answer:
          "It depends on how many screens and flows are involved. Send the scope through the request form and we'll quote a fixed price before starting.",
      },
      {
        question: "Can you work with our existing developers?",
        answer:
          "Yes. We hand over design systems, specs and prototypes that developers can build from directly, and we stay reachable while the build runs.",
      },
      {
        question: "How do I get started?",
        answer:
          "Fill in the request form with your goals, timeline and budget range. We review it and get back to you within 24 hours with a tailored proposal.",
      },
    ],
    relatedCohortSlug: "ui-ux-design",
    updated: "2026-10-14",
  },
  {
    slug: "app-development",
    title: "App Development",
    description:
      "Native and cross-platform mobile applications that deliver seamless experiences on iOS and Android.",
    longDescription:
      "We build mobile applications that users love to use. Whether you need a native iOS/Android app or a cross-platform solution with React Native or Flutter, our team delivers high-performance apps with beautiful interfaces and robust backend systems.",
    features: [
      "iOS & Android native development",
      "Cross-platform (React Native / Flutter)",
      "Backend API development",
      "Push notifications",
      "App Store submission",
      "Post-launch maintenance",
    ],
    iconName: "Smartphone",
    pricing: "Contact for pricing",
    metaDescription:
      "Mobile app development for iOS and Android in Nigeria — native or cross-platform with React Native and Flutter, plus backend APIs and store submission.",
    audience:
      "Businesses that need a mobile product rather than a website: booking flows, marketplaces, internal tools or customer apps that have to work on the phones your users already own.",
    process: standardProcess,
    tools: ["React Native", "Flutter", "Node.js"],
    faqs: [
      {
        question: "How much does an app cost to build?",
        answer:
          "It depends on the number of screens, the integrations (payments, notifications, dashboards) and whether you need backend work. Send the scope and we'll quote a fixed price.",
      },
      {
        question: "Can you publish the app to the App Store and Play Store?",
        answer:
          "Yes — store submission is part of the work, and we handle the build and release setup with you rather than leaving you to work it out alone.",
      },
      {
        question: "How do I get started?",
        answer:
          "Fill in the request form with your goals, timeline and budget range. We review it and get back to you within 24 hours with a tailored proposal.",
      },
    ],
    relatedCohortSlug: "app-development",
    updated: "2026-10-14",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
