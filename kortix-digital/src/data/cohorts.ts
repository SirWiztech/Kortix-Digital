export interface Cohort {
  slug: string;
  track: string;
  description: string;
  price: string;
  priceValue: number;
  duration: string;
  curriculum: string[];
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
    priceValue: 100000,
    duration: "6 months (3 months frontend + 3 months backend)",
    curriculum: [
      "HTML, CSS & JavaScript Fundamentals",
      "Responsive Design & CSS Frameworks",
      "React.js & Modern Frontend Development",
      "Node.js & Express Backend",
      "Database Design (MongoDB & PostgreSQL)",
      "RESTful API Development",
      "Authentication & Security",
      "Deployment & DevOps Basics",
      "Capstone Project & Portfolio",
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
    priceValue: 100000,
    duration: "3 months",
    curriculum: [
      "Mobile Development Fundamentals",
      "React Native / Flutter Framework",
      "UI/UX for Mobile Apps",
      "State Management",
      "Native Device APIs & Integrations",
      "Backend Integration & APIs",
      "Testing & Debugging",
      "App Store Deployment",
      "Capstone Project",
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
    priceValue: 50000,
    duration: "3 months",
    curriculum: [
      "Introduction to Cybersecurity",
      "Network Security Fundamentals",
      "Operating System Security",
      "Ethical Hacking & Penetration Testing",
      "Cryptography Basics",
      "Incident Response & Forensics",
      "Security Tools & Frameworks",
      "Compliance & Governance",
      "Capstone Security Project",
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
    priceValue: 50000,
    duration: "3 months",
    curriculum: [
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
    priceValue: 50000,
    duration: "1 month",
    curriculum: [
      "Digital Marketing Landscape",
      "Social Media Marketing (Meta, X, LinkedIn)",
      "Search Engine Optimization (SEO)",
      "Google Ads & PPC Campaigns",
      "Email Marketing Automation",
      "Content Marketing Strategy",
      "Analytics & Performance Tracking",
      "Campaign Management & Optimization",
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
    priceValue: 50000,
    duration: "3 months",
    curriculum: [
      "Design Thinking & UX Fundamentals",
      "User Research & Persona Development",
      "Information Architecture",
      "Wireframing & Low-Fidelity Prototypes",
      "Figma Mastery",
      "UI Design Principles & Systems",
      "High-Fidelity Prototyping",
      "Usability Testing & Iteration",
      "Portfolio Development",
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
    priceValue: 50000,
    duration: "1 month",
    curriculum: [
      "Content Strategy & Planning",
      "Storytelling & Scriptwriting",
      "Video Production Basics",
      "Photography for Content Creators",
      "Editing for Social Media",
      "Building a Personal Brand",
      "Growth & Monetization Strategies",
      "Platform-Specific Optimization",
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
    priceValue: 50000,
    duration: "1 month",
    curriculum: [
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
    priceValue: 100000,
    duration: "3 months",
    curriculum: [
      "Blockchain Fundamentals",
      "Ethereum & Smart Contracts",
      "Solidity Programming",
      "DApp Development",
      "DeFi Concepts & Protocols",
      "NFTs & Token Standards",
      "Web3.js & Ethers.js",
      "Security in Web3",
      "Capstone DApp Project",
    ],
    whatsappLink:
      "https://chat.whatsapp.com/JPScQLffyrA01Ovxr46OAg?s=cl&p=a&mlu=4",
    iconName: "Link2",
  },
];

export function getCohortBySlug(slug: string): Cohort | undefined {
  return cohorts.find((c) => c.slug === slug);
}
