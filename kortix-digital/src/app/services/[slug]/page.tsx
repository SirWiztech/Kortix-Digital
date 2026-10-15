import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import ScrollReveal from "@/components/ScrollReveal";
import SpecularLink from "@/components/SpecularLink";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import FaqAccordion from "@/components/FaqAccordion";
import ElectricBorder from "@/components/ui/ElectricBorder";
import { services, getServiceBySlug } from "@/data/services";
import { getCohortBySlug } from "@/data/cohorts";
import { Check, ArrowRight } from "lucide-react";
import { fallbackIcon, icons } from "@/lib/icon-map";
import { faqSchema, serviceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found", robots: { index: false } };

  return createPageMetadata({
    title: `${service.title} Services in Nigeria`,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const Icon = icons[service.iconName] ?? fallbackIcon;
  const relatedCohort = service.relatedCohortSlug
    ? getCohortBySlug(service.relatedCohortSlug)
    : undefined;
  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd data={[serviceSchema(service), faqSchema(service.faqs)]} />

      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-kortix-green/5 to-transparent" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Services", path: "/services" },
                { name: service.title, path: `/services/${service.slug}` },
              ]}
            />

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-kortix-green/10 flex items-center justify-center">
                <Icon size={28} className="text-kortix-green" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                {service.title} Services in Nigeria
              </h1>
            </div>

            <p className="text-lg text-kortix-text-secondary leading-relaxed mb-8">
              {service.longDescription}
            </p>

            <p className="text-base text-kortix-text-secondary leading-relaxed">
              {service.audience}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ScrollReveal>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  What&apos;s included
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, i) => (
                    <ElectricBorder key={i} borderRadius={12}>
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-kortix-card">
                        <Check
                          size={18}
                          className="text-kortix-green mt-0.5 shrink-0"
                        />
                        <span className="text-sm text-kortix-text-secondary">
                          {feature}
                        </span>
                      </div>
                    </ElectricBorder>
                  ))}
                </div>
              </ScrollReveal>

              {service.tools.length > 0 && (
                <ScrollReveal delay={0.1}>
                  <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
                    Tools &amp; technologies
                  </h2>
                  <ul className="flex flex-wrap gap-3">
                    {service.tools.map((tool) => (
                      <li
                        key={tool}
                        className="px-4 py-2 rounded-lg bg-kortix-card border border-kortix-border text-sm text-kortix-text-secondary"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              )}
            </div>

            <div>
              <ScrollReveal delay={0.1}>
                <ElectricBorder borderRadius={16}>
                  <div className="sticky top-28 p-6 rounded-2xl bg-kortix-card">
                    <h2 className="text-lg font-bold text-foreground mb-3">
                      Pricing
                    </h2>
                    <p className="text-sm text-kortix-text-secondary mb-6 leading-relaxed">
                      {service.pricing}
                    </p>
                    <SpecularLink
                      href={`/request?service=${service.slug}`}
                      size="md"
                      className="w-full"
                    >
                      Request this service
                      <ArrowRight size={16} />
                    </SpecularLink>
                  </div>
                </ElectricBorder>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-kortix-dark/40 border-y border-kortix-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-foreground mb-8">
              How we work
            </h2>
          </ScrollReveal>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {service.process.map((step, i) => (
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
              {service.title} FAQs
            </h2>
          </ScrollReveal>
          <FaqAccordion items={service.faqs} withSchema={false} />
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-kortix-dark/40 border-t border-kortix-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {relatedCohort && (
            <ScrollReveal>
              <div className="p-6 sm:p-8 rounded-2xl bg-kortix-card border border-kortix-border mb-12">
                <h2 className="text-xl font-bold text-foreground mb-3">
                  Want to learn {relatedCohort.track.toLowerCase()} yourself?
                </h2>
                <p className="text-sm text-kortix-text-secondary leading-relaxed mb-6">
                  We also teach it. The {relatedCohort.track} cohort runs for{" "}
                  {relatedCohort.duration.toLowerCase()} and costs{" "}
                  {relatedCohort.price} — {relatedCohort.description}
                </p>
                <Link
                  href={`/cohorts/${relatedCohort.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-kortix-green hover:text-kortix-green-light transition-colors"
                >
                  See the {relatedCohort.track} cohort
                  <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal>
            <h2 className="text-xl font-bold text-foreground mb-6">
              Other services
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherServices.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/services/${other.slug}`}
                    className="block h-full p-5 rounded-xl bg-kortix-card border border-kortix-border hover:border-kortix-green/30 transition-colors"
                  >
                    <span className="block text-sm font-semibold text-foreground mb-1">
                      {other.title} services
                    </span>
                    <span className="block text-sm text-kortix-muted leading-relaxed">
                      {other.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-12 text-center">
              <SpecularLink href="/request" size="lg">
                Request a service
                <ArrowRight size={18} />
              </SpecularLink>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
