import LegalDoc, { type LegalSection } from "@/components/LegalDoc";
import { createPageMetadata } from "@/lib/metadata";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Refund Policy",
  description:
    "How refund requests work for Kortix Digital mentorship cohorts and client projects: what to send us, how we decide, and what we cannot refund.",
  path: "/refund-policy",
});

const sections: LegalSection[] = [
  {
    heading: "The short version",
    body: [
      `If something has gone wrong with a cohort enrollment or a project, contact us on WhatsApp (${WHATSAPP_DISPLAY}) or by email (${CONTACT_EMAIL}) and tell us what happened. We would rather fix the problem or refund you than keep money for something that did not work.`,
      "This page explains how we handle those requests. It is deliberately honest about the one thing we have not finalised yet: the exact refund windows. They are marked as outstanding below rather than invented here.",
    ],
  },
  {
    heading: "Cohort fees",
    body: [
      "If you have paid for a cohort and cannot start at all, contact us before the cohort begins and we will either move you to the next cohort or refund you.",
      "If you start and then stop, tell us why. Where the reason is on our side — the cohort did not run as described, lessons did not happen, or mentor support was not provided — we will refund the unused portion.",
      "Where a payment plan is in place, your remaining instalments are adjusted before any refund is calculated.",
      // TODO(owner): state the exact refund window you will honour after a
      // cohort starts (for example "full refund within X days of the first
      // lesson") and any partial refund percentages. Do not publish a window
      // you are not prepared to honour for every track.
    ],
  },
  {
    heading: "Client projects",
    body: [
      "Project work is priced by milestones. Milestones that have been delivered and approved are payable; milestones that have not started are refundable.",
      "If you stop a project mid-milestone, we will show you what was completed on that milestone and agree a fair split before we issue anything. Any deposit becomes credit against the completed work first.",
      "If we cannot deliver work we agreed to and you would rather not wait, we will refund the portion of the project we have not delivered.",
    ],
  },
  {
    heading: "What we cannot refund",
    body: [
      "Third-party costs we have already paid on your behalf and cannot recover — domain names, hosting, paid licences, stock assets or ad spend.",
      "Custom work that was completed and approved under a written scope.",
      "Bank charges, transfer fees or currency conversion differences charged by your bank or ours.",
    ],
  },
  {
    heading: "How to make a request",
    body: [
      "Message us on WhatsApp or email us from the address you used when you paid, and include the name or cohort you are enrolled in, the payment date and reference, and what went wrong.",
      "We will acknowledge your request, ask for anything we still need, and give you a decision in writing.",
      // TODO(owner): commit to a response time (for example "within 5 working
      // days") once you can staff it consistently.
    ],
  },
  {
    heading: "Approved refunds",
    body: [
      "Approved refunds are returned to the account the payment came from, in the same currency, within a reasonable period after approval. We will tell you the exact amount and expected date in writing before you wait on it.",
      "If a refund is not possible for a reason outside our control, we will tell you that in writing and explain what we can do instead.",
    ],
  },
  {
    heading: "Escalation",
    body: [
      `If you are not satisfied with the outcome, reply to the same thread and ask for it to be reviewed again. Reviews go to a different member of the team than the person who handled the first request.`,
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <LegalDoc
      path="/refund-policy"
      title="Refund Policy"
      intro="How we handle refund requests for cohort fees and client projects — including what is still to be finalised."
      sections={sections}
      notice="This page states how we handle refund requests today, but the specific refund windows and response times still need to be confirmed and finalised by the owner before it should be treated as a binding policy."
    />
  );
}
