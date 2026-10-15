import LegalDoc, { type LegalSection } from "@/components/LegalDoc";
import { createPageMetadata } from "@/lib/metadata";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "The terms that apply when you use kortixdigital.com, request agency work, or enroll in a Kortix Digital mentorship cohort.",
  path: "/terms-of-service",
});

const sections: LegalSection[] = [
  {
    heading: "These terms",
    body: [
      `These terms apply to kortixdigital.com and to any work or training you arrange with Kortix Digital. By using the site or arranging work with us, you accept them. Questions go to ${CONTACT_EMAIL} or ${WHATSAPP_DISPLAY}.`,
    ],
  },
  {
    heading: "Quotes and scope",
    body: [
      "Prices shown on this site are starting points for defined scopes, and cohort fees are the figures published on each cohort page at the time you enroll.",
      "Agency work is confirmed by a written scope and a fixed quote. That written scope and quote form part of these terms for that project. Anything not in the written scope is out of scope.",
      "We do not charge for work we have not agreed with you in writing.",
    ],
  },
  {
    heading: "Payments",
    body: [
      "Cohort fees are paid in Nigerian Naira unless we agree otherwise in writing. Instalment plans are available on most tracks and must be agreed with us before you start.",
      "Project payments are made in the milestones and currency set out in your quote.",
      "We do not process card payments on this website.",
      // TODO(owner): confirm the exact deposit/milestone schedule you want to
      // commit to publicly, and whether VAT applies to your invoices.
    ],
  },
  {
    heading: "Client responsibilities",
    body: [
      "You are responsible for providing the content, access, decisions and feedback needed to keep a project moving.",
      "You confirm that any content you send us (text, images, logos, video, fonts) is yours to use, or that you have permission to use it.",
      "Delays caused by outstanding content, access or feedback will move the delivery date with them.",
    ],
  },
  {
    heading: "Ownership and delivery",
    body: [
      "Once a project is paid for in full, you own the final deliverables we produced for it: the code, the design files and the accounts we set up for you.",
      "We keep the right to show the finished work in our portfolio and on social media unless you ask us in writing not to.",
      "Third-party components (open-source libraries, fonts, stock assets, platforms) stay under their own licences.",
      // TODO(owner): confirm the exact ownership position you want, and whether
      // hosting, domains and maintenance are handed over permanently.
    ],
  },
  {
    heading: "Cohort participation",
    body: [
      "Cohort lessons are delivered online through a private WhatsApp group, with mentor support. Live sessions and cohort conversations are for members only — please do not record or redistribute them without asking.",
      "Behave respectfully in cohort groups. We may remove a participant who harasses others, spams, or shares paid materials outside the group.",
      "Course outlines are published in good faith and may be adjusted as tools and industry practice change. We do not promise a certificate, a job, a salary or a client unless we have agreed that in writing.",
    ],
  },
  {
    heading: "Liability",
    body: [
      "We deliver our services with reasonable skill and care, but we do not guarantee specific commercial results — for example rankings, traffic, follower counts or revenue.",
      "To the extent the law allows, our liability for a project is limited to the amount you paid us for that project.",
      // TODO(owner): have a lawyer confirm this limitation clause is enforceable
      // under Nigerian law and add the governing-law clause below.
    ],
  },
  {
    heading: "Changes and contact",
    body: [
      "We may update these terms; the last-updated date on this page will change when we do. Material changes will be flagged on the site.",
      `To reach us about these terms, email ${CONTACT_EMAIL} or message ${WHATSAPP_DISPLAY}.`,
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalDoc
      path="/terms-of-service"
      title="Terms of Service"
      intro="What you can expect from us, what we need from you, and the rules that apply to agency projects and mentorship cohorts."
      sections={sections}
    />
  );
}
