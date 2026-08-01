export interface CurriculumModule {
  title: string;
  topics: string[];
}

export interface Cohort {
  slug: string;
  track: string;
  description: string;
  price: string;
  originalPrice: string;
  priceValue: number;
  duration: string;
  curriculum: CurriculumModule[];
  whatsappLink: string;
  iconName: string;
}

export const cohorts: Cohort[] = [
  {
    slug: "web-development",
    track: "Web Development",
    description:
      "Master frontend and backend web development from zero to job-ready. Build real-world projects with HTML, CSS, JavaScript, React, Node.js, and databases.",
    price: "₦100,000",
    originalPrice: "₦300,000",
    priceValue: 100000,
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
  },
  {
    slug: "app-development",
    track: "App Development",
    description:
      "Learn to build mobile applications for iOS and Android using React Native and Flutter. From UI design to app store deployment.",
    price: "₦100,000",
    originalPrice: "₦300,000",
    priceValue: 100000,
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
  },
  {
    slug: "cybersecurity",
    track: "Cybersecurity",
    description:
      "Develop the skills to protect systems, networks, and data from digital attacks. Learn ethical hacking, threat analysis, and security protocols.",
    price: "₦50,000",
    originalPrice: "₦150,000",
    priceValue: 50000,
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
  },
  {
    slug: "data-analysis",
    track: "Data Analysis",
    description:
      "Transform raw data into actionable insights. Master Excel, SQL, Python, and data visualization tools to make data-driven decisions.",
    price: "₦50,000",
    originalPrice: "₦150,000",
    priceValue: 50000,
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
  },
  {
    slug: "digital-marketing",
    track: "Digital Marketing",
    description:
      "Learn to build and execute digital marketing strategies across social media, search engines, email, and content platforms.",
    price: "₦50,000",
    originalPrice: "₦150,000",
    priceValue: 50000,
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
  },
  {
    slug: "ui-ux-design",
    track: "UI/UX Design",
    description:
      "Design intuitive, beautiful digital products. Learn user research, wireframing, prototyping, and high-fidelity UI design with Figma.",
    price: "₦50,000",
    originalPrice: "₦150,000",
    priceValue: 50000,
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
  },
  {
    slug: "content-creation",
    track: "Content Creation",
    description:
      "Build a personal brand and create compelling content across platforms. Learn scripting, storytelling, production, and growth strategies.",
    price: "₦50,000",
    originalPrice: "₦150,000",
    priceValue: 50000,
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
  },
  {
    slug: "video-editing",
    track: "Video Editing",
    description:
      "Master professional video editing from cuts to color grading. Learn industry-standard tools and techniques for social media, YouTube, and commercial projects.",
    price: "₦50,000",
    originalPrice: "₦150,000",
    priceValue: 50000,
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
  },
  {
    slug: "web3",
    track: "Web3",
    description:
      "Explore blockchain technology, smart contracts, and decentralized applications. Learn Solidity, DeFi concepts, and Web3 development.",
    price: "₦100,000",
    originalPrice: "₦300,000",
    priceValue: 100000,
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
  },
];

export function getCohortBySlug(slug: string): Cohort | undefined {
  return cohorts.find((c) => c.slug === slug);
}
