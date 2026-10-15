import ScrollReveal from "./ScrollReveal";
import FaqAccordion from "./FaqAccordion";
import { type FaqItem } from "@/lib/schema";

// TODO(owner): confirm this copy, then reuse it for the FAQPage markup below.
// Every answer here is rendered into the HTML (no click required to exist).
export const homeFaqs: FaqItem[] = [
  {
    question: "How do the mentorship cohorts work?",
    answer:
      "Each cohort is a structured, mentor-led program with a set curriculum, weekly lessons, practical projects, and a capstone. You learn at your own pace within the program window, with support from mentors and peers along the way.",
  },
  {
    question: "How do I get access to the WhatsApp group?",
    answer:
      "Once you enroll in a cohort, you'll receive a link to the dedicated WhatsApp group where lessons, announcements, and support discussions happen. Some public groups are also linked directly from the cohort page.",
  },
  {
    question: "What are the pricing and payment options?",
    answer:
      "Cohort fees vary by track and are listed on each cohort page. We offer flexible payment plans for most tracks — reach out on WhatsApp to discuss an installment plan that works for you.",
  },
  {
    question: "How do I request a service or get a budget quote?",
    answer:
      "Use the 'Request a Service' form on the site and tell us about your project. We'll review your requirements and get back to you with a timeline and a clear, fixed budget quote — no hidden charges.",
  },
  {
    question: "How long does it take to complete a project or cohort?",
    answer:
      "Cohorts typically run 3–6 months depending on the track. Client projects depend on scope — a landing page may take days, while a full web or app build can take a few weeks. You'll always get a realistic timeline upfront.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "Yes. If something goes wrong with a cohort enrollment or a project, contact us on WhatsApp or by email with your payment details and what happened. We review each request against our written refund policy: delivered and approved work is payable, and undisputed or undelivered work is refundable.",
  },
  {
    question: "What support is available after I enroll or hire Kortix?",
    answer:
      "Cohort members get ongoing mentor support and community access. Clients get post-delivery support for a defined period, and you can always reach our team on WhatsApp or Discord.",
  },
];

export default function FAQ() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-kortix-green/3 to-transparent" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-kortix-green mb-3">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-kortix-text-secondary text-lg max-w-2xl mx-auto">
              Everything you need to know about our cohorts, services, pricing,
              and support.
            </p>
          </div>
        </ScrollReveal>

        {/* FAQPage markup lives here, next to the answers it describes. */}
        <FaqAccordion items={homeFaqs} />
      </div>
    </section>
  );
}
