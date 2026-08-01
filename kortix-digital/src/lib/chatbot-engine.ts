// ============================================================
// KORTIX ASSISTANT — MANUAL KNOWLEDGE BASE & INTENT ENGINE
// ------------------------------------------------------------
// This is where you "train" the assistant by hand. Edit the
// keyword lists and responses below to teach it new answers.
//
// HOW IT WORKS:
// 1. respondToMessage(text) normalizes the user's message.
// 2. It first checks for a specific track (service/cohort).
// 3. It then runs through the KNOWLEDGE entries top-to-bottom
//    and replies with the first entry whose keyword matches.
// 4. If nothing matches, it falls back to FALLBACK_RESPONSE.
//
// A real AI backend can be dropped in later by replacing
// respondToMessage with a fetch() to your API.
// ============================================================

export const WHATSAPP_LINK = "https://wa.me/2347071617216";
export const EMAIL = "kortixdigital@gmail.com";

// ---- TRACKS (services + cohorts share the same names) ----
// Each track maps to both an agency service and a mentorship
// cohort. The engine replies based on the intent in the message.

interface Track {
  slug: string;
  label: string;
  keywords: string[];
  servicePricing: string;
  cohortPrice: string;
  cohortDuration: string;
}

const TRACKS: Track[] = [
  {
    slug: "app-development",
    label: "App Development",
    keywords: [
      "app development",
      "mobile app",
      "react native",
      "flutter",
      "android",
      "ios app",
      "native app",
      "cross-platform",
    ],
    servicePricing: "Custom quote — depends on scope (contact for pricing)",
    cohortPrice: "₦100,000",
    cohortDuration: "3 months",
  },
  {
    slug: "cybersecurity",
    label: "Cybersecurity",
    keywords: [
      "cybersecurity",
      "cyber security",
      "security",
      "ethical hacking",
      "penetration",
      "hacking",
      "network security",
    ],
    servicePricing: "Contact for pricing",
    cohortPrice: "₦50,000",
    cohortDuration: "3 months",
  },
  {
    slug: "data-analysis",
    label: "Data Analysis",
    keywords: [
      "data analysis",
      "data analytics",
      "excel",
      "sql",
      "power bi",
      "python",
      "pandas",
      "data scientist",
    ],
    servicePricing: "Contact for pricing",
    cohortPrice: "₦50,000",
    cohortDuration: "3 months",
  },
  {
    slug: "digital-marketing",
    label: "Digital Marketing",
    keywords: [
      "digital marketing",
      "marketing",
      "seo",
      "google ads",
      "social media marketing",
      "content marketing",
      "ads campaign",
    ],
    servicePricing: "Contact for pricing",
    cohortPrice: "₦50,000",
    cohortDuration: "1 month",
  },
  {
    slug: "ui-ux-design",
    label: "UI/UX Design",
    keywords: ["ui/ux", "ui ux", "ux design", "ui design", "figma", "prototype", "ux"],
    servicePricing: "Contact for pricing",
    cohortPrice: "₦50,000",
    cohortDuration: "3 months",
  },
  {
    slug: "content-creation",
    label: "Content Creation",
    keywords: [
      "content creation",
      "content creator",
      "personal brand",
      "youtube growth",
      "content",
    ],
    servicePricing: "Contact for pricing",
    cohortPrice: "₦50,000",
    cohortDuration: "1 month",
  },
  {
    slug: "video-editing",
    label: "Video Editing",
    keywords: [
      "video editing",
      "video editor",
      "premiere pro",
      "davinci",
      "motion graphics",
      "color grading",
      "edit my video",
    ],
    servicePricing: "Contact for pricing",
    cohortPrice: "₦50,000",
    cohortDuration: "1 month",
  },
  {
    slug: "web3",
    label: "Web3",
    keywords: ["web3", "blockchain", "crypto", "solidity", "smart contract", "nft", "defi"],
    servicePricing: "Contact for pricing",
    cohortPrice: "₦100,000",
    cohortDuration: "3 months",
  },
  {
    slug: "web-development",
    label: "Web Development",
    keywords: [
      "web development",
      "web dev",
      "website",
      "frontend",
      "backend",
      "full stack",
      "fullstack",
      "html",
      "css",
      "javascript",
      "react",
      "landing page",
    ],
    servicePricing: "Frontend from ₦50,000 · Backend from ₦50,000 · Full Stack from ₦100,000",
    cohortPrice: "₦100,000",
    cohortDuration: "6 months (3 months frontend + 3 months backend)",
  },
];

function findTrack(text: string): Track | null {
  let best: Track | null = null;
  let bestScore = 0;
  for (const track of TRACKS) {
    let score = 0;
    for (const kw of track.keywords) {
      if (text.includes(kw)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      best = track;
    }
  }
  return bestScore > 0 ? best : null;
}

// Intent words that suggest the user wants to LEARN (cohort) vs HIRE (service).
const COHORT_INTENT = [
  "cohort",
  "learn",
  "course",
  "class",
  "train",
  "training",
  "program",
  "mentorship",
  "mentor",
  "study",
  "enroll",
  "student",
  "teach",
  "skill",
  "certificate",
  "beginner",
  "job-ready",
  "join a cohort",
  "how to learn",
];

// ---- KNOWLEDGE BASE ----
// Ordered list. First entry whose keyword matches wins.
// Add new Q&A pairs here to keep training the assistant.

interface KnowledgeEntry {
  id: string;
  keywords?: string[];
  pattern?: RegExp;
  response: string;
}

function entryMatches(entry: KnowledgeEntry, text: string): boolean {
  if (entry.pattern && entry.pattern.test(text)) return true;
  if (entry.keywords && entry.keywords.some((kw) => text.includes(kw))) return true;
  return false;
}

const KNOWLEDGE: KnowledgeEntry[] = [
  {
    id: "about",
    keywords: [
      "about kortix",
      "what is kortix",
      "who are you",
      "who are you",
      "tell me about",
      "about you",
      "your company",
      "what do you do",
      "what does kortix do",
    ],
    response:
      "Kortix Digital is a dual-purpose digital agency AND mentorship platform. We build websites, apps, brand identities, videos, and UI/UX — and we run intensive mentorship cohorts that take students from beginner to job-ready. We Build. We Teach. We Transform. 🚀",
  },
  {
    id: "services",
    keywords: ["services", "what do you offer", "your services", "offerings", "what can you do"],
    response:
      "We offer 5 core services:\n\n🌐 Web Development — from ₦50,000\n🎨 Graphic Design\n🎬 Video Editing\n📱 App Development\n🧩 UI/UX Design\n\nWant details or a quote? Just say the name, or tap Explore Services.",
  },
  {
    id: "cohorts",
    keywords: ["cohorts", "cohort", "courses", "classes", "learn a skill", "skills", "programs"],
    response:
      "We run 9 mentorship cohorts:\n\n💻 Web Development — ₦100,000 (6 months)\n📱 App Development — ₦100,000 (3 months)\n🛡️ Cybersecurity — ₦50,000 (3 months)\n📊 Data Analysis — ₦50,000 (3 months)\n📣 Digital Marketing — ₦50,000 (1 month)\n🎨 UI/UX Design — ₦50,000 (3 months)\n✍️ Content Creation — ₦50,000 (1 month)\n🎬 Video Editing — ₦50,000 (1 month)\n⛓️ Web3 — ₦100,000 (3 months)\n\nName any track to hear more!",
  },
  {
    id: "how_cohort_works",
    keywords: [
      "how does the cohort work",
      "how do cohorts work",
      "how it works",
      "how does it work",
      "cohort structure",
      "what to expect",
      "how are classes",
    ],
    response:
      "Each cohort is mentor-led with a structured curriculum: weekly lessons, hands-on projects, and a final capstone. You get access to a WhatsApp group for support and join a community of peers. You learn at your own pace within the program window — from beginner to job-ready.",
  },
  {
    id: "whatsapp_access",
    keywords: [
      "whatsapp group",
      "whatsapp link",
      "join whatsapp",
      "group access",
      "how do i join the whatsapp",
      "whatsapp access",
    ],
    response:
      "When you enroll in a cohort you'll get a direct link to the dedicated WhatsApp group for lessons, announcements, and support. Public group links are also listed on each cohort page. Want to join a specific track? Tell me which one!",
  },
  {
    id: "pricing_general",
    keywords: [
      "price",
      "pricing",
      "how much",
      "cost",
      "fees",
      "fee",
      "payment",
      "pay",
      "installment",
      "budget",
      "afford",
      "payment plan",
    ],
    response:
      "Here's the quick breakdown:\n\n🛠️ Services — Web dev from ₦50,000; others by custom quote.\n🎓 Cohorts — ₦50,000 for most tracks; Web Dev, App Dev & Web3 are ₦100,000.\n\nWe also offer flexible payment plans on most cohorts. Want a specific quote? Tap 'Talk to a human' or the WhatsApp button.",
  },
  {
    id: "request_service",
    keywords: [
      "request a service",
      "request service",
      "request quote",
      "get a quote",
      "budget quote",
      "hire you",
      "want to hire",
      "start a project",
      "work with you",
      "i need a website",
      "i need an app",
    ],
    response:
      "Easy! Fill in the 'Request a Service' form on the site and tell us about your project. We'll review it and get back to you with a clear timeline and a fixed budget quote. You can also reach us on WhatsApp for a faster response. 💬",
  },
  {
    id: "timeline",
    keywords: [
      "how long",
      "timeline",
      "duration",
      "how many weeks",
      "how many months",
      "deadline",
      "when will",
      "delivery time",
      "how fast",
      "how soon",
    ],
    response:
      "Cohorts run 1–6 months depending on the track (most are 3 months). For client projects, it depends on scope — a landing page can take days, a full website or app a few weeks. You'll always get a realistic timeline upfront. ⏱️",
  },
  {
    id: "refund",
    keywords: ["refund", "money back", "cancel", "cancellation", "dissatisfied", "guarantee"],
    response:
      "We want you to be confident in your investment. If you're not satisfied shortly after starting a cohort or project, contact us and we'll work out a fair resolution or refund per our policy. Just reach us on WhatsApp to start that conversation.",
  },
  {
    id: "location",
    keywords: ["location", "where are you", "address", "based", "office", "nigeria", "lagos", "abuja"],
    response:
      "Kortix Digital is based in Nigeria and works fully online — so we serve clients and students from anywhere. All cohort sessions and client delivery happen virtually. 🌍",
  },
  {
    id: "contact_human",
    keywords: ["talk to a human", "human", "agent", "customer service", "real person", "representative", "support team", "reach you", "contact"],
    response:
      `No problem! You can reach our team directly:\n\n💬 WhatsApp: wa.me/2347071617216\n✉️ Email: ${EMAIL}\n🎮 Discord: Kortix community\n\nWe usually reply quickly!`,
  },
  {
    id: "email_phone",
    keywords: ["email", "phone number", "call", "telephone", "contact number", "mail"],
    response:
      `You can reach us at:\n✉️ ${EMAIL}\n💬 WhatsApp: +234 707 161 7216\n\nPrefer to chat? Use the WhatsApp button and we'll reply fast.`,
  },
  {
    id: "discord",
    keywords: ["discord", "community server", "join discord"],
    response:
      "We have a Discord community for cohort members and collaborators! You'll get the invite link once you join a cohort or you can connect with us there for updates. 🎮",
  },
  {
    id: "certificate",
    keywords: ["certificate", "certification", "certified", "proof of completion"],
    response:
      "Yes! Completing a cohort earns you a certificate of completion, and you graduate with a real portfolio project you can show employers. 🎓",
  },
  {
    id: "greeting",
    pattern: /\b(hi|hey|hello|yo|hola|howdy|how far|howfar|wetin dey|good (morning|afternoon|evening|day))\b/,
    response:
      "Hello! 👋 Great to see you. I can help with our services, cohorts, pricing, and more. What would you like to know?",
  },
  {
    id: "thanks",
    keywords: ["thank", "thanks", "appreciated", "grateful", "bless you", "nice", "great help"],
    response: "You're very welcome! 😊 Anything else I can help you with — services, cohorts, or pricing?",
  },
  {
    id: "bye",
    keywords: ["bye", "goodbye", "see you", "see ya", "good night", "laters"],
    response: "Thanks for stopping by! 👋 If you need anything, we're just a message away. Have a great day!",
  },
];

const FALLBACK_RESPONSE =
  `I'm not 100% sure about that one, but I can point you in the right direction! 🙏\n\nFor anything specific, tap "Talk to a human" to reach our team on WhatsApp, or explore the site for more. What can I help you with next?`;

function trackReply(track: Track, isCohort: boolean): string {
  if (isCohort) {
    return `${track.label} Cohort\n🎓 Price: ${track.cohortPrice}\n⏱ Duration: ${track.cohortDuration}\n\nTo join, tap "Join a Cohort" or open the cohort page for the WhatsApp group link.`;
  }
  return `${track.label}\n🛠️ ${track.servicePricing}\n\nWant a full quote? Tap "Request a Service" or reach us on WhatsApp.`;
}

export function respondToMessage(text: string): string {
  const t = text.toLowerCase().replace(/\s+/g, " ").trim();

  const track = findTrack(t);
  if (track) {
    const isCohort = COHORT_INTENT.some((w) => t.includes(w));
    return trackReply(track, isCohort);
  }

  for (const entry of KNOWLEDGE) {
    if (entryMatches(entry, t)) {
      return entry.response;
    }
  }

  return FALLBACK_RESPONSE;
}
