import type { BlogPost } from "@/data/blog";
import type { Cohort } from "@/data/cohorts";
import type { Service } from "@/data/services";
import {
  absoluteUrl,
  CONTACT_EMAIL,
  DISCORD_URL,
  PHONE_NUMBER_E164,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  WHATSAPP_NUMBER_E164,
} from "./site";

/** A single JSON-LD node. */
export type SchemaNode = Record<string, unknown>;

/** Breadcrumb entry shared by the visible trail and its JSON-LD. */
export interface Crumb {
  name: string;
  path: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Reference to the single Organization node declared in the root layout. */
const organizationRef = { "@id": ORGANIZATION_ID };

/**
 * TODO(owner): add `address`, `openingHoursSpecification`, `geo` and a
 * `LocalBusiness` type only when you have a real, verifiable business address.
 * They are deliberately omitted rather than guessed.
 */
export function organizationSchema(): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "EducationalOrganization", "ProfessionalService"],
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    slogan: SITE_TAGLINE,
    url: SITE_URL,
    description:
      "Kortix Digital is a Nigerian digital agency and tech training platform. We build websites and mobile apps, and run mentorship cohorts in web development, app development, cybersecurity, data analysis, design and marketing.",
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/logo.svg"),
      width: 280,
      height: 60,
    },
    image: absoluteUrl("/logo.svg"),
    email: CONTACT_EMAIL,
    telephone: PHONE_NUMBER_E164,
    areaServed: { "@type": "Country", name: "Nigeria" },
    founder: [
      {
        "@type": "Person",
        name: "Ogaraku Ugochukwu",
        jobTitle: "Founder & Backend Engineer",
      },
      {
        "@type": "Person",
        name: "Okanta Onubuikem",
        jobTitle: "Co-founder & Frontend Engineer",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: WHATSAPP_NUMBER_E164,
        email: CONTACT_EMAIL,
        areaServed: "NG",
        availableLanguage: ["en"],
      },
      {
        "@type": "ContactPoint",
        contactType: "telephone",
        telephone: PHONE_NUMBER_E164,
        areaServed: "NG",
        availableLanguage: ["en"],
      },
    ],
    // Only profiles that are actually linked from the site.
    sameAs: [DISCORD_URL],
  };
}

export function websiteSchema(): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "en-NG",
    publisher: organizationRef,
  };
}

export function serviceSchema(service: Service): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/services/${service.slug}#service`),
    name: `${service.title} services`,
    serviceType: service.title,
    description: service.longDescription,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: organizationRef,
    areaServed: { "@type": "Country", name: "Nigeria" },
    // TODO(owner): add `offers` for services with published prices. Only
    // Web Development currently lists starting prices, and a starting price is
    // a range — do not emit an `Offer` until fixed prices are agreed.
  };
}

export function courseSchema(cohort: Cohort): SchemaNode {
  const course: SchemaNode = {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": absoluteUrl(`/cohorts/${cohort.slug}#course`),
    name: `${cohort.track} Cohort`,
    description: cohort.description,
    url: absoluteUrl(`/cohorts/${cohort.slug}`),
    provider: organizationRef,
    inLanguage: "en-NG",
    offers: {
      "@type": "Offer",
      category: "Paid",
      price: cohort.priceValue,
      priceCurrency: "NGN",
      url: absoluteUrl(`/cohorts/${cohort.slug}`),
      availability: "https://schema.org/InStock",
    },
  };

  if (cohort.durationIso) {
    course.hasCourseInstance = [
      {
        "@type": "CourseInstance",
        // Delivery is through online mentorship and the cohort WhatsApp group.
        courseMode: "online",
        duration: cohort.durationIso,
      },
    ];
  }

  return course;
}

export function faqSchema(items: FaqItem[]): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: Crumb[]): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Only emitted for published posts — drafts stay out of structured data. */
export function articleSchema(post: BlogPost): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": absoluteUrl(`/blog/${post.slug}#article`),
    headline: post.title,
    description: post.description,
    url: absoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    dateModified: post.updated,
    inLanguage: "en-NG",
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: organizationRef,
    isAccessibleForFree: true,
  };
}
