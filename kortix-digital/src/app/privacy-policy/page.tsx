import LegalDoc, { type LegalSection } from "@/components/LegalDoc";
import { createPageMetadata } from "@/lib/metadata";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "What Kortix Digital collects when you request a service or contact us, how it is used, who processes it, and how to ask us to delete it.",
  path: "/privacy-policy",
});

const sections: LegalSection[] = [
  {
    heading: "Who we are",
    body: [
      "Kortix Digital is a digital agency and tech training business that builds websites, apps and design work, and runs paid mentorship cohorts. This policy covers the kortixdigital.com website.",
      `Questions about this policy, or any request to access or delete your data, can go to ${CONTACT_EMAIL} or to our WhatsApp line on ${WHATSAPP_DISPLAY}.`,
    ],
  },
  {
    heading: "What we collect",
    body: [
      "Service request form (/request): the service you selected, your proposed budget and its currency, your full name, your email address, and the project details you write. All of these fields are submitted by you.",
      "Messages you send us: if you email us, message us on WhatsApp or contact us on Discord, we receive the contact details and content of those messages through those platforms.",
      "Analytics: if you accept analytics cookies, we collect aggregated usage data (pages viewed, approximate location derived from IP, device type). No analytics runs before you accept.",
      "We do not run an account system, we do not take card payments on this website, and we do not collect or store payment card details. Cohort payments are arranged directly with us, typically by bank transfer, after you join a cohort group.",
    ],
  },
  {
    heading: "Why we use it",
    body: [
      "To reply to your request, prepare a quote, and deliver the work or the training you asked about.",
      "To keep a record of enquiries in case you come back to us later.",
      "To understand which pages and content are useful, so we can improve the site — only where you have accepted analytics cookies.",
      "We do not sell your data, and we do not add you to a marketing list without your consent.",
    ],
  },
  {
    heading: "Who else processes it",
    body: [
      "Brevo — our email delivery provider. When you submit the request form, its contents are emailed to us through Brevo's API.",
      "Vercel — our hosting provider, which serves this website and keeps short-lived technical logs (including IP addresses) for security and reliability.",
      "WhatsApp (Meta) and Discord — only if you choose to contact us or join a cohort group on those platforms. Their own privacy policies apply to those conversations.",
      "Analytics provider — only loaded after you accept analytics cookies.",
      // TODO(owner): name the exact analytics provider here once GA4 (or an
      // alternative) is configured, and add your registered business details if
      // you have them, so this list is complete.
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "Enquiry emails and their contents are kept for as long as we need them to manage the enquiry and any resulting work, and then for a reasonable period afterwards so we can look up past quotes.",
      "Analytics data is retained according to the analytics provider's default retention period.",
      "If you ask us to delete your enquiry data, we will do so unless we are required to keep it for accounting or legal reasons.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      "You can accept or decline analytics cookies in the banner shown on your first visit. Declining does not limit any part of the site.",
      "You can ask us what data we hold about you, ask for a copy, ask for corrections, or ask us to delete it, by emailing the address above.",
      "You can clear the cookie choice at any time by clearing this site's data in your browser, and the banner will ask you again.",
    ],
  },
  {
    heading: "Security",
    body: [
      "The site is served over HTTPS. Form submissions are sent over HTTPS and validated on our server before being forwarded by email.",
      "No method of transmission or storage is completely secure, so we cannot promise absolute security. We do keep the amount of data we collect to a minimum for that reason.",
    ],
  },
  {
    heading: "Children",
    body: [
      "This site and our cohorts are intended for people aged 18 and over. If a younger person wants to join a cohort, a parent or guardian should contact us first.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "If we change how we handle data, we will update this page and its last-updated date. Significant changes will be noted on the site.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDoc
      path="/privacy-policy"
      title="Privacy Policy"
      intro="A plain-English summary of what we collect through this website, why, who processes it, and how to get it removed."
      sections={sections}
    />
  );
}
