export interface CurriculumModule {
  title: string;
  topics: string[];
}

export interface CohortStep {
  title: string;
  description: string;
}

export interface CohortFaq {
  question: string;
  answer: string;
}

export interface Cohort {
  slug: string;
  track: string;
  /** Summary shown on cards, page intros and in structured data. */
  description: string;
  /** Current fee, as shown to users on the page. */
  price: string;
  /** Listed "was" price the current fee is discounted from. */
  originalPrice: string;
  /** Machine-readable current fee, must match `price`. */
  priceValue: number;
  /** ISO 8601 duration for schema, e.g. "P6M". Must match `duration`. */
  durationIso: string;
  duration: string;
  curriculum: CurriculumModule[];
  whatsappLink: string;
  iconName: string;
  /** Meta description, 140-160 chars. */
  metaDescription: string;
  /** Who the cohort is for, from the track description and curriculum. */
  audience: string;
  /** What learners can do at the end — derived from the curriculum only. */
  outcomes: string[];
  faqs: CohortFaq[];
  /** Cross-link to the matching agency service, where one exists. */
  relatedServiceSlug?: string;
  /** Flagged in the content-gap report for thin copy or missing links. */
  thinContent?: boolean;
  /** ISO date this entry's copy last changed; drives sitemap lastModified. */
  updated: string;
}

/**
 * How enrollment works. This is intentionally the same on every cohort page:
 * it reflects what the site already states (WhatsApp groups are the delivery
 * channel, payment plans are available for most tracks).
 */
export const enrollmentSteps: CohortStep[] = [
  {
    title: "Join the cohort WhatsApp group",
    description:
      "Use the join button on this page. That group is where lessons, announcements and support discussions happen.",
  },
  {
    title: "Confirm your fee and payment plan",
    description:
      "A mentor confirms the current fee and the payment options available for the track. Instalment plans are offered on most tracks — ask before you pay.",
  },
  {
    title: "Start learning with your cohort",
    description:
      "Work through the curriculum modules, build the projects, and get mentor and peer feedback as you go.",
  },
];

export const cohorts: Cohort[] = [
  {
    slug: "web-development",
    track: "Web Development",
    description:
      "Master frontend and backend web development from zero to job-ready. Build real-world projects with HTML, CSS, JavaScript, React, Node.js, and databases.",
    price: "₦100,000",
    originalPrice: "₦300,000",
    priceValue: 100000,
    durationIso: "P6M",
    duration: "6 months (3 months frontend + 3 months backend)",
    curriculum: [
      {
        title: "Frontend",
        topics: ["HTML", "CSS", "JavaScript", "TypeScript", "Git"],
      },
      {
        title: "Backend",
        topics: ["PHP", "Node.js", "Laravel", "Next.js"],
      },
      {
        title: "Database",
        topics: ["SQLite", "MySQL", "PostgreSQL", "MongoDB"],
      },
      {
        title: "Bonus",
        topics: [
          "How to Deploy on Webservers",
          "Free PHP Scripts",
          "Pentesting",
        ],
      },
    ],
    whatsappLink:
      "https://chat.whatsapp.com/DqODmH902UN4xqmyID5Lm1?s=cl&p=a&mlu=4",
    iconName: "Code",
    metaDescription:
      "A 6-month web development cohort covering HTML, CSS, JavaScript, TypeScript, React, Node.js, PHP, Laravel and databases. ₦100,000 with payment plans available.",
    audience:
      "Complete beginners who want a career they can build on, career switchers, and self-taught developers with gaps they want closed properly. You do not need a computer science degree.",
    outcomes: [
      "Build and style responsive pages with HTML, CSS and JavaScript",
      "Write typed, maintainable frontend code with TypeScript and React",
      "Build backend logic and APIs with Node.js, PHP and Laravel",
      "Work with SQLite, MySQL, PostgreSQL and MongoDB",
      "Deploy a finished project to a live web server",
    ],
    faqs: [
      {
        question: "What does the Web Development cohort cost?",
        answer:
          "The current fee is ₦100,000, reduced from ₦300,000. Instalment plans are available — ask in the WhatsApp group before you pay.",
      },
      {
        question: "How long is the Web Development cohort?",
        answer:
          "Six months: roughly three months on frontend fundamentals and three months on backend, databases and deployment.",
      },
      {
        question: "Do I need coding experience to join?",
        answer:
          "No. The cohort starts from HTML, CSS and JavaScript fundamentals and builds up to React, Node.js and databases.",
      },
      {
        question: "How do I enroll?",
        answer:
          "Join the Web Development WhatsApp group from this page, then confirm your fee and payment plan with a mentor inside the group.",
      },
    ],
    relatedServiceSlug: "web-development",
    updated: "2026-10-14",
  },
  {
    slug: "app-development",
    track: "App Development",
    description:
      "Learn to build mobile applications for iOS and Android using React Native and Flutter. From UI design to app store deployment.",
    price: "₦100,000",
    originalPrice: "₦300,000",
    priceValue: 100000,
    durationIso: "P3M",
    duration: "3 months",
    curriculum: [
      {
        title: "Fundamentals",
        topics: ["Dart", "Flutter / React Native", "Git"],
      },
      {
        title: "State & Architecture",
        topics: ["Redux", "MVC / MVVM"],
      },
      {
        title: "Backend & APIs",
        topics: ["REST APIs", "Node.js", "Firebase"],
      },
      {
        title: "Database",
        topics: ["SQLite", "MySQL", "PostgreSQL", "MongoDB"],
      },
      {
        title: "Bonus",
        topics: [
          "Push Notifications",
          "Payment Gateway Integration",
          "App Store / Play Store Deployment",
        ],
      },
    ],
    whatsappLink:
      "https://chat.whatsapp.com/Be4OXW3A8qd2uPrRgvawgA?s=cl&p=a&mlu=4",
    iconName: "Smartphone",
    metaDescription:
      "A 3-month mobile app development cohort: Dart, Flutter and React Native, state management, REST APIs, Firebase, databases and app store release. ₦100,000.",
    audience:
      "Developers who already know some programming and want to ship mobile apps, and beginners ready to move straight into mobile rather than web.",
    outcomes: [
      "Build cross-platform apps with Flutter or React Native",
      "Manage app state with Redux and structure projects with MVC/MVVM",
      "Connect apps to REST APIs, Node.js services and Firebase",
      "Store and query data in SQLite, MySQL, PostgreSQL or MongoDB",
      "Add push notifications and payment gateways, then publish to the stores",
    ],
    faqs: [
      {
        question: "What does the App Development cohort cost?",
        answer:
          "The current fee is ₦100,000, reduced from ₦300,000. Instalment plans are available — ask in the WhatsApp group before you pay.",
      },
      {
        question: "How long is the App Development cohort?",
        answer: "Three months, covering fundamentals, state management, APIs, databases and deployment to the app stores.",
      },
      {
        question: "Do I build a real app?",
        answer:
          "Yes. The curriculum is project-based, including app store deployment, push notifications and payment gateway integration.",
      },
      {
        question: "How do I enroll?",
        answer:
          "Join the App Development WhatsApp group from this page, then confirm your fee and payment plan with a mentor inside the group.",
      },
    ],
    relatedServiceSlug: "app-development",
    updated: "2026-10-14",
  },
  {
    slug: "cybersecurity",
    track: "Cybersecurity",
    description:
      "Develop the skills to protect systems, networks, and data from digital attacks. Learn ethical hacking, threat analysis, and security protocols.",
    price: "₦50,000",
    originalPrice: "₦150,000",
    priceValue: 50000,
    durationIso: "P3M",
    duration: "3 months",
    curriculum: [
      {
        title: "Fundamentals",
        topics: [
          "Networking (TCP/IP, DNS, Ports)",
          "Linux",
          "Windows Security Basics",
          "CIA Triad",
        ],
      },
      {
        title: "Offensive Security",
        topics: ["Nmap", "Burp Suite", "Metasploit", "OWASP Top 10"],
      },
      {
        title: "Defensive Security",
        topics: ["Firewalls", "IDS / IPS", "Incident Response"],
      },
      {
        title: "Tools",
        topics: ["Wireshark", "Kali Linux", "Nessus"],
      },
      {
        title: "Bonus",
        topics: [
          "Security+ / CEH Certification Prep",
          "Bug Bounty Basics",
          "Pentest Report Writing",
        ],
      },
    ],
    whatsappLink:
      "https://chat.whatsapp.com/GH6onAcWPDz3n7GZh1ZFN7?s=cl&p=a&mlu=4",
    iconName: "Shield",
    metaDescription:
      "A 3-month cybersecurity cohort: networking and Linux fundamentals, Nmap, Burp Suite, Metasploit, OWASP Top 10, defence, incident response and CEH prep. ₦50,000.",
    audience:
      "IT staff who need to defend the systems they already run, and beginners aiming at an entry-level security or SOC role.",
    outcomes: [
      "Understand networking, Linux and Windows security fundamentals",
      "Run authorised offensive testing with Nmap, Burp Suite and Metasploit",
      "Work through the OWASP Top 10 and write up findings",
      "Set up and reason about firewalls, IDS/IPS and incident response",
      "Prepare for Security+ or CEH certification topics",
    ],
    faqs: [
      {
        question: "What does the Cybersecurity cohort cost?",
        answer:
          "The current fee is ₦50,000, reduced from ₦150,000. Instalment plans are available — ask in the WhatsApp group before you pay.",
      },
      {
        question: "How long is the Cybersecurity cohort?",
        answer:
          "Three months, split across fundamentals, offensive security, defensive security and tooling.",
      },
      {
        question: "Does the cohort cover certification prep?",
        answer:
          "Yes — Security+ and CEH preparation is part of the curriculum, along with bug bounty basics and pentest report writing.",
      },
      {
        question: "How do I enroll?",
        answer:
          "Join the Cybersecurity WhatsApp group from this page, then confirm your fee and payment plan with a mentor inside the group.",
      },
    ],
    relatedServiceSlug: "web-development",
    updated: "2026-10-14",
  },
  {
    slug: "data-analysis",
    track: "Data Analysis",
    description:
      "Transform raw data into actionable insights. Master Excel, SQL, Python, and data visualization tools to make data-driven decisions.",
    price: "₦50,000",
    originalPrice: "₦150,000",
    priceValue: 50000,
    durationIso: "P3M",
    duration: "3 months",
    curriculum: [
      {
        title: "Core Curriculum",
        topics: [
          "Data Analysis Fundamentals",
          "Advanced Excel & Google Sheets",
          "SQL for Data Querying",
          "Python for Data Analysis (Pandas, NumPy)",
          "Data Visualization (Matplotlib, Power BI)",
          "Statistical Analysis",
          "Data Cleaning & Preparation",
          "Business Intelligence Reporting",
          "Capstone Data Project",
        ],
      },
    ],
    whatsappLink:
      "https://chat.whatsapp.com/HXUIftXJHijBNRhdyWfK3D?s=cl&p=a&mlu=4",
    iconName: "BarChart3",
    metaDescription:
      "A 3-month data analysis cohort: advanced Excel, SQL, Python with Pandas, statistics, data cleaning, Power BI dashboards and a capstone project. ₦50,000.",
    audience:
      "Analysts, business owners, ops and finance staff who already handle spreadsheets and reports, and career switchers who want a data role.",
    outcomes: [
      "Clean and prepare messy data instead of only charting it",
      "Query databases with SQL",
      "Analyse data in Python with Pandas and NumPy",
      "Apply statistical analysis to real questions",
      "Build dashboards and business intelligence reports in Power BI",
      "Deliver a capstone data project end to end",
    ],
    faqs: [
      {
        question: "What does the Data Analysis cohort cost?",
        answer:
          "The current fee is ₦50,000, reduced from ₦150,000. Instalment plans are available — ask in the WhatsApp group before you pay.",
      },
      {
        question: "How long is the Data Analysis cohort?",
        answer: "Three months, ending with a capstone data project.",
      },
      {
        question: "Do I need to know Python already?",
        answer:
          "No. The curriculum starts with data fundamentals, advanced Excel and SQL, then moves into Python for analysis.",
      },
      {
        question: "How do I enroll?",
        answer:
          "Join the Data Analysis WhatsApp group from this page, then confirm your fee and payment plan with a mentor inside the group.",
      },
    ],
    relatedServiceSlug: "web-development",
    updated: "2026-10-14",
  },
  {
    slug: "digital-marketing",
    track: "Digital Marketing",
    description:
      "Learn to build and execute digital marketing strategies across social media, search engines, email, and content platforms.",
    price: "₦50,000",
    originalPrice: "₦150,000",
    priceValue: 50000,
    durationIso: "P1M",
    duration: "1 month",
    curriculum: [
      {
        title: "Core Curriculum",
        topics: [
          "Digital Marketing Landscape",
          "Social Media Marketing (Meta, X, LinkedIn)",
          "Search Engine Optimization (SEO)",
          "Google Ads & PPC Campaigns",
          "Email Marketing Automation",
          "Content Marketing Strategy",
          "Analytics & Performance Tracking",
          "Campaign Management & Optimization",
        ],
      },
    ],
    whatsappLink:
      "https://chat.whatsapp.com/CA5A0pkg8LXA71R50ij3fS?s=cl&p=a&mlu=4",
    iconName: "Megaphone",
    metaDescription:
      "A 1-month digital marketing cohort: social media marketing, SEO, Google Ads and PPC, email automation, content strategy and campaign analytics. ₦50,000.",
    audience:
      "Business owners who currently run their own marketing, social media managers, and anyone moving into a marketing role.",
    outcomes: [
      "Plan campaigns across Meta, X and LinkedIn",
      "Do on-page and content SEO instead of guessing at keywords",
      "Set up and read Google Ads and PPC campaigns",
      "Build email marketing automation",
      "Track and optimise campaign performance with analytics",
    ],
    faqs: [
      {
        question: "What does the Digital Marketing cohort cost?",
        answer:
          "The current fee is ₦50,000, reduced from ₦150,000. Instalment plans are available — ask in the WhatsApp group before you pay.",
      },
      {
        question: "How long is the Digital Marketing cohort?",
        answer:
          "One month of intensive lessons covering social media, SEO, paid ads, email and analytics.",
      },
      {
        question: "Is this beginner friendly?",
        answer:
          "Yes. It starts with the digital marketing landscape and builds up to running and optimising campaigns.",
      },
      {
        question: "How do I enroll?",
        answer:
          "Join the Digital Marketing WhatsApp group from this page, then confirm your fee and payment plan with a mentor inside the group.",
      },
    ],
    relatedServiceSlug: "graphic-design",
    updated: "2026-10-14",
  },
  {
    slug: "ui-ux-design",
    track: "UI/UX Design",
    description:
      "Design intuitive, beautiful digital products. Learn user research, wireframing, prototyping, and high-fidelity UI design with Figma.",
    price: "₦50,000",
    originalPrice: "₦150,000",
    priceValue: 50000,
    durationIso: "P3M",
    duration: "3 months",
    curriculum: [
      {
        title: "Research & Strategy",
        topics: [
          "User Research",
          "Personas",
          "User Flows",
          "Information Architecture",
        ],
      },
      {
        title: "Design Tools",
        topics: ["Figma", "Wireframing", "Prototyping"],
      },
      {
        title: "Visual Design",
        topics: ["Typography", "Color Theory", "Design Systems"],
      },
      {
        title: "Testing",
        topics: ["Usability Testing", "Accessibility (WCAG)"],
      },
      {
        title: "Bonus",
        topics: [
          "Portfolio Building",
          "Freelancing on Design Platforms",
          "Developer Handoff (Specs & Redlining)",
        ],
      },
    ],
    whatsappLink:
      "https://chat.whatsapp.com/L6KCoZRWTgHEtK4XENr83W?s=cl&p=a&mlu=4",
    iconName: "PenTool",
    metaDescription:
      "A 3-month UI/UX design cohort: user research, personas, user flows, Figma wireframing and prototyping, design systems, accessibility and portfolio building. ₦50,000.",
    audience:
      "Beginners who want to design digital products, graphic designers moving into product work, and developers who want to design what they build.",
    outcomes: [
      "Run user research and turn findings into personas and user flows",
      "Wireframe and prototype in Figma",
      "Apply typography, colour theory and design systems",
      "Run usability testing and work to WCAG accessibility guidance",
      "Build a portfolio and hand designs to developers with proper specs",
    ],
    faqs: [
      {
        question: "What does the UI/UX Design cohort cost?",
        answer:
          "The current fee is ₦50,000, reduced from ₦150,000. Instalment plans are available — ask in the WhatsApp group before you pay.",
      },
      {
        question: "How long is the UI/UX Design cohort?",
        answer:
          "Three months, covering research and strategy, design tools, visual design and testing.",
      },
      {
        question: "Do I need to know how to draw?",
        answer:
          "No. The work is interface and product design in Figma — research, structure, layout and systems rather than illustration.",
      },
      {
        question: "How do I enroll?",
        answer:
          "Join the UI/UX Design WhatsApp group from this page, then confirm your fee and payment plan with a mentor inside the group.",
      },
    ],
    relatedServiceSlug: "ui-ux-design",
    updated: "2026-10-14",
  },
  {
    slug: "content-creation",
    track: "Content Creation",
    description:
      "Build a personal brand and create compelling content across platforms. Learn scripting, storytelling, production, and growth strategies.",
    price: "₦50,000",
    originalPrice: "₦150,000",
    priceValue: 50000,
    durationIso: "P1M",
    duration: "1 month",
    curriculum: [
      {
        title: "Core Curriculum",
        topics: [
          "Content Strategy & Planning",
          "Storytelling & Scriptwriting",
          "Video Production Basics",
          "Photography for Content Creators",
          "Editing for Social Media",
          "Building a Personal Brand",
          "Growth & Monetization Strategies",
          "Platform-Specific Optimization",
        ],
      },
    ],
    whatsappLink: "#",
    iconName: "Pen",
    metaDescription:
      "A 1-month content creation cohort: content strategy, storytelling and scriptwriting, photography, social editing, personal branding and monetisation. ₦50,000.",
    audience:
      "Creators building their first audience, business owners who need to post consistently, and anyone turning a skill into content.",
    outcomes: [
      "Plan content instead of posting reactively",
      "Write scripts and tell stories that hold attention",
      "Shoot and edit content for specific platforms",
      "Build and position a personal brand",
      "Understand growth and monetisation strategies",
    ],
    faqs: [
      {
        question: "What does the Content Creation cohort cost?",
        answer:
          "The current fee is ₦50,000, reduced from ₦150,000. Instalment plans are available — ask before you pay.",
      },
      {
        question: "How long is the Content Creation cohort?",
        answer: "One month of intensive lessons on strategy, production and growth.",
      },
      {
        question: "How do I enroll?",
        answer:
          "The WhatsApp invite for this track is not published on the site yet. Use the contact page to reach us on WhatsApp or email and we will send the invite when enrollment opens.",
      },
    ],
    relatedServiceSlug: "video-editing",
    thinContent: true,
    updated: "2026-10-14",
  },
  {
    slug: "video-editing",
    track: "Video Editing",
    description:
      "Master professional video editing from cuts to color grading. Learn industry-standard tools and techniques for social media, YouTube, and commercial projects.",
    price: "₦50,000",
    originalPrice: "₦150,000",
    priceValue: 50000,
    durationIso: "P1M",
    duration: "1 month",
    curriculum: [
      {
        title: "Core Curriculum",
        topics: [
          "Video Editing Fundamentals",
          "Adobe Premiere Pro / DaVinci Resolve",
          "Cuts, Transitions & Pacing",
          "Color Grading & Correction",
          "Audio Design & Mixing",
          "Motion Graphics Basics",
          "Social Media Video Formats",
          "Export Settings & Delivery",
          "Portfolio Project",
        ],
      },
    ],
    whatsappLink:
      "https://chat.whatsapp.com/B6dhVwFb46ED7pLN1sR44q?s=cl&p=a&mlu=4",
    iconName: "Video",
    metaDescription:
      "A 1-month video editing cohort: Premiere Pro and DaVinci Resolve, pacing and transitions, colour grading, audio design, motion graphics and a portfolio project. ₦50,000.",
    audience:
      "Aspiring editors, content creators who edit their own videos, and business owners who want their brand videos finished in-house.",
    outcomes: [
      "Cut and pace footage with intent in Premiere Pro or DaVinci Resolve",
      "Colour grade and correct footage",
      "Design and mix audio",
      "Add motion graphics basics",
      "Export correctly for each social platform and finish a portfolio project",
    ],
    faqs: [
      {
        question: "What does the Video Editing cohort cost?",
        answer:
          "The current fee is ₦50,000, reduced from ₦150,000. Instalment plans are available — ask in the WhatsApp group before you pay.",
      },
      {
        question: "How long is the Video Editing cohort?",
        answer: "One month, ending with a portfolio project.",
      },
      {
        question: "Which software do I learn?",
        answer: "Adobe Premiere Pro and DaVinci Resolve, plus motion graphics basics and export settings for social platforms.",
      },
      {
        question: "How do I enroll?",
        answer:
          "Join the Video Editing WhatsApp group from this page, then confirm your fee and payment plan with a mentor inside the group.",
      },
    ],
    relatedServiceSlug: "video-editing",
    thinContent: true,
    updated: "2026-10-14",
  },
  {
    slug: "web3",
    track: "Web3",
    description:
      "Explore blockchain technology, smart contracts, and decentralized applications. Learn Solidity, DeFi concepts, and Web3 development.",
    price: "₦100,000",
    originalPrice: "₦300,000",
    priceValue: 100000,
    durationIso: "P3M",
    duration: "3 months",
    curriculum: [
      {
        title: "Blockchain Basics",
        topics: [
          "Blockchain Fundamentals",
          "Wallets & Keys",
          "Ethereum / EVM",
        ],
      },
      {
        title: "Smart Contracts",
        topics: [
          "Solidity",
          "Hardhat / Foundry",
          "Token Standards (ERC-20, ERC-721, ERC-1155)",
        ],
      },
      {
        title: "Frontend Integration",
        topics: [
          "Ethers.js / Web3.js",
          "Wagmi",
          "MetaMask / WalletConnect",
        ],
      },
      {
        title: "Backend & Infra",
        topics: ["The Graph", "IPFS", "Chainlink Oracles"],
      },
      {
        title: "Bonus",
        topics: [
          "Testnet / Mainnet Deployment",
          "Smart Contract Auditing Basics",
          "DAO Fundamentals",
        ],
      },
    ],
    whatsappLink:
      "https://chat.whatsapp.com/JPScQLffyrA01Ovxr46OAg?s=cl&p=a&mlu=4",
    iconName: "Link2",
    metaDescription:
      "A 3-month Web3 cohort: blockchain fundamentals, Solidity smart contracts, Hardhat and Foundry, token standards, ethers.js and wagmi frontends. ₦100,000.",
    audience:
      "Developers who already write JavaScript or a backend language and want to move into smart contracts and decentralised apps.",
    outcomes: [
      "Explain how blockchains, wallets and keys actually work",
      "Write and test Solidity smart contracts with Hardhat or Foundry",
      "Implement ERC-20, ERC-721 and ERC-1155 token standards",
      "Connect contracts to a frontend with ethers.js, wagmi and MetaMask",
      "Deploy to testnet and mainnet and understand auditing basics",
    ],
    faqs: [
      {
        question: "What does the Web3 cohort cost?",
        answer:
          "The current fee is ₦100,000, reduced from ₦300,000. Instalment plans are available — ask in the WhatsApp group before you pay.",
      },
      {
        question: "How long is the Web3 cohort?",
        answer:
          "Three months across blockchain basics, smart contracts, frontend integration and infrastructure.",
      },
      {
        question: "Is this suitable for beginners?",
        answer:
          "It is the most technical track on the list. Some programming experience before you start will make it considerably easier.",
      },
      {
        question: "How do I enroll?",
        answer:
          "Join the Web3 WhatsApp group from this page, then confirm your fee and payment plan with a mentor inside the group.",
      },
    ],
    relatedServiceSlug: "web-development",
    thinContent: true,
    updated: "2026-10-14",
  },
];

export function getCohortBySlug(slug: string): Cohort | undefined {
  return cohorts.find((c) => c.slug === slug);
}
