"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

// TODO: confirm real FAQ copy
const faqs = [
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
      "We want you to be confident in your investment. If you're not satisfied within a short window after starting, contact us and we'll work out a fair resolution or refund per our policy.",
  },
  {
    question: "What support is available after I enroll or hire Kortix?",
    answer:
      "Cohort members get ongoing mentor support and community access. Clients get post-delivery support for a defined period, and you can always reach our team on WhatsApp or Discord.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <ScrollReveal key={faq.question} delay={i * 0.05}>
                <div
                  className={`rounded-2xl border bg-kortix-card transition-all duration-300 ${
                    isOpen
                      ? "border-l-kortix-green border-kortix-green/30 border-l-2 shadow-lg shadow-kortix-green/5"
                      : "border-kortix-border hover:border-kortix-green/20"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 sm:px-6 sm:py-5"
                  >
                    <span className="font-semibold text-foreground text-sm sm:text-base">
                      {faq.question}
                    </span>
                    <span
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isOpen
                          ? "bg-kortix-green text-kortix-darker border-kortix-green"
                          : "bg-transparent text-kortix-green border-kortix-border"
                      }`}
                    >
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 sm:px-6 sm:pb-6 text-kortix-text-secondary text-sm sm:text-base leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
