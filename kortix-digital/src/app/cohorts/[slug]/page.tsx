import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import ScrollReveal from "@/components/ScrollReveal";
import SpecularLink from "@/components/SpecularLink";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import FaqAccordion from "@/components/FaqAccordion";
import JoinCohortButton from "@/components/JoinCohortButton";
import ElectricBorder from "@/components/ui/ElectricBorder";
import { cohorts, enrollmentSteps, getCohortBySlug } from "@/data/cohorts";
import { getServiceBySlug } from "@/data/services";
import { ArrowRight, Clock, Check } from "lucide-react";
import { fallbackIcon, icons } from "@/lib/icon-map";
import { courseSchema, faqSchema } from "@/lib/schema";

export function generateStaticParams() {
  return cohorts.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cohort = getCohortBySlug(slug);
  // Unknown slug: return nothing so the not-found page's own metadata (title,
  // noindex) is used instead of inventing a title for a page that 404s.
  if (!cohort) return {};

  return createPageMetadata({
    title: `${cohort.track} Course & Mentorship Cohort`,
    description: cohort.metaDescription,
    path: `/cohorts/${cohort.slug}`,
  });
}

export default async function CohortDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cohort = getCohortBySlug(slug);

  if (!cohort) notFound();

  const Icon = icons[cohort.iconName] ?? fallbackIcon;
  const relatedService = cohort.relatedServiceSlug
    ? getServiceBySlug(cohort.relatedServiceSlug)
    : undefined;
  const otherCohorts = cohorts.filter((c) => c.slug !== cohort.slug);
  let topicIndex = 0;

  return (
    <>
      <JsonLd data={[courseSchema(cohort), faqSchema(cohort.faqs)]} />

      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-kortix-green/5 to-transparent" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Cohorts", path: "/cohorts" },
                { name: cohort.track, path: `/cohorts/${cohort.slug}` },
              ]}
            />

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-kortix-green/10 flex items-center justify-center">
                <Icon size={28} className="text-kortix-green" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                  {cohort.track} Cohort
                </h1>
                <p className="text-kortix-muted text-sm">
                  Paid mentorship cohort · online
                </p>
              </div>
            </div>

            <p className="text-lg text-kortix-text-secondary leading-relaxed mb-6">
              {cohort.description}
            </p>

            <p className="text-base text-kortix-text-secondary leading-relaxed mb-8">
              {cohort.audience}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mb-8">
              {/*
                The "now" price is the current fee and the struck-through price
                is the one it was reduced from.
                TODO(owner): confirm this is the correct way round before launch.
              */}
              <div className="flex items-baseline gap-3 text-foreground">
                <span className="text-xs uppercase tracking-wider text-kortix-muted">
                  Now
                </span>
                <span className="text-3xl font-bold text-kortix-green">
                  {cohort.price}
                </span>
                <span className="text-xs uppercase tracking-wider text-kortix-muted">
                  was
                </span>
                <span className="text-xl font-medium text-kortix-muted line-through">
                  {cohort.originalPrice}
                </span>
              </div>
              <div className="flex items-center gap-2 text-kortix-text-secondary">
                <Clock size={18} />
                {cohort.duration}
              </div>
            </div>

            <JoinCohortButton
              cohortTrack={cohort.track}
              whatsappLink={cohort.whatsappLink}
            />
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              What you&apos;ll be able to do
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
              {cohort.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex items-start gap-3 p-4 rounded-xl bg-kortix-card border border-kortix-border"
                >
                  <Check
                    size={18}
                    className="text-kortix-green mt-0.5 shrink-0"
                  />
                  <span className="text-sm text-kortix-text-secondary leading-relaxed">
                    {outcome}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Curriculum
            </h2>
            <div className="space-y-10">
              {cohort.curriculum.map((module, mi) => (
                <div key={mi}>
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-5 rounded-full bg-kortix-green shrink-0" />
                    {module.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {module.topics.map((topic, ti) => {
                      const num = topicIndex++;
                      return (
                        <ElectricBorder key={ti} borderRadius={12}>
                          <div className="flex items-center gap-4 p-4 rounded-xl bg-kortix-card">
                            <span className="w-8 h-8 rounded-lg bg-kortix-green/10 flex items-center justify-center text-sm font-bold text-kortix-green shrink-0">
                              {String(num + 1).padStart(2, "0")}
                            </span>
                            <span className="text-sm text-kortix-text-secondary">
                              {topic}
                            </span>
                          </div>
                        </ElectricBorder>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-kortix-dark/40 border-y border-kortix-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-foreground mb-8">
              How enrollment works
            </h2>
          </ScrollReveal>
          <ol className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {enrollmentSteps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.05}>
                <li className="h-full p-6 rounded-2xl bg-kortix-card border border-kortix-border">
                  <span className="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-kortix-green/10 text-sm font-bold text-kortix-green mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-kortix-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-foreground mb-8">
              {cohort.track} cohort FAQs
            </h2>
          </ScrollReveal>
          <FaqAccordion items={cohort.faqs} withSchema={false} />

          <ScrollReveal delay={0.2}>
            <ElectricBorder borderRadius={16}>
              <div className="mt-12 p-6 rounded-2xl bg-kortix-card text-center">
                <h2 className="text-xl font-bold text-foreground mb-2">
                  Ready to start?
                </h2>
                <p className="text-kortix-text-secondary mb-6">
                  Join the WhatsApp group to get started with the {cohort.track}{" "}
                  cohort, or ask us anything first.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <JoinCohortButton
                    cohortTrack={cohort.track}
                    whatsappLink={cohort.whatsappLink}
                  />
                  <SpecularLink
                    href="/contact"
                    size="lg"
                    baseColor="#0a0a0a"
                    thickness={0.5}
                  >
                    Ask a question
                    <ArrowRight size={18} />
                  </SpecularLink>
                </div>
              </div>
            </ElectricBorder>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-kortix-dark/40 border-t border-kortix-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {relatedService && (
            <ScrollReveal>
              <div className="p-6 sm:p-8 rounded-2xl bg-kortix-card border border-kortix-border mb-12">
                <h2 className="text-xl font-bold text-foreground mb-3">
                  Need {relatedService.title.toLowerCase()} done for you?
                </h2>
                <p className="text-sm text-kortix-text-secondary leading-relaxed mb-6">
                  Our agency arm delivers the work you are learning to do:{" "}
                  {relatedService.description} {relatedService.pricing}
                </p>
                <Link
                  href={`/services/${relatedService.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-kortix-green hover:text-kortix-green-light transition-colors"
                >
                  See {relatedService.title} services
                  <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal>
            <h2 className="text-xl font-bold text-foreground mb-6">
              Other cohorts
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherCohorts.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/cohorts/${other.slug}`}
                    className="block h-full p-5 rounded-xl bg-kortix-card border border-kortix-border hover:border-kortix-green/30 transition-colors"
                  >
                    <span className="block text-sm font-semibold text-foreground mb-1">
                      {other.track} cohort — {other.price}
                    </span>
                    <span className="block text-sm text-kortix-muted leading-relaxed">
                      {other.duration}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
