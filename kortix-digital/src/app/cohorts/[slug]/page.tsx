import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import SpecularLink from "@/components/SpecularLink";
import ElectricBorder from "@/components/ui/ElectricBorder";
import { cohorts, getCohortBySlug } from "@/data/cohorts";
import { ArrowRight, Users, Clock } from "lucide-react";
import { getIcon } from "@/lib/icon-map";

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
  if (!cohort) return { title: "Cohort Not Found" };
  return {
    title: `${cohort.track} Cohort`,
    description: cohort.description,
  };
}

export default async function CohortDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cohort = getCohortBySlug(slug);

  if (!cohort) notFound();

  const Icon = getIcon(cohort.iconName);
  const isPlaceholder = cohort.whatsappLink === "#";

  return (
    <>
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-kortix-green/5 to-transparent" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Link
              href="/cohorts"
              className="inline-flex items-center gap-1 text-sm text-kortix-muted hover:text-kortix-green transition-colors mb-8"
            >
              <ArrowRight size={14} className="rotate-180" />
              All Cohorts
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-kortix-green/10 flex items-center justify-center">
                <Icon size={28} className="text-kortix-green" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                  {cohort.track}
                </h1>
                <p className="text-kortix-muted text-sm">Cohort</p>
              </div>
            </div>

            <p className="text-lg text-kortix-text-secondary leading-relaxed mb-8">
              {cohort.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-foreground">
                <span className="text-3xl font-bold text-kortix-green">
                  {cohort.price}
                </span>
              </div>
              <div className="flex items-center gap-2 text-kortix-text-secondary">
                <Clock size={18} />
                {cohort.duration}
              </div>
            </div>

            {isPlaceholder ? (
              <div className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base bg-kortix-border text-kortix-muted cursor-not-allowed">
                <Users size={20} />
                WhatsApp Link Coming Soon
              </div>
            ) : (
              <SpecularLink
                href={cohort.whatsappLink}
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                lineColor="#25D366"
              >
                <Users size={20} />
                Join WhatsApp Group
              </SpecularLink>
            )}
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-foreground mb-8">Curriculum</h2>
            <div className="space-y-3">
              {cohort.curriculum.map((item, i) => (
                <ElectricBorder key={i} borderRadius={12}>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-kortix-card"
                >
                  <span className="w-8 h-8 rounded-lg bg-kortix-green/10 flex items-center justify-center text-sm font-bold text-kortix-green shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-kortix-text-secondary">
                    {item}
                  </span>
                </div>
                </ElectricBorder>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <ElectricBorder borderRadius={16}>
            <div className="mt-12 p-6 rounded-2xl bg-kortix-card text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">
                Ready to Start?
              </h3>
              <p className="text-kortix-text-secondary mb-6">
                Join the WhatsApp group to get started with the {cohort.track} cohort.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {isPlaceholder ? (
                  <div className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base bg-kortix-border text-kortix-muted cursor-not-allowed">
                    <Users size={20} />
                    Link Coming Soon
                  </div>
                ) : (
                  <SpecularLink
                    href={cohort.whatsappLink}
                    size="lg"
                    target="_blank"
                    rel="noopener noreferrer"
                    lineColor="#25D366"
                  >
                    <Users size={20} />
                    Join WhatsApp Group
                  </SpecularLink>
                )}
                <SpecularLink
                  href="/request"
                  size="lg"
                  baseColor="#0a0a0a"
                  thickness={0.5}
                >
                  Request a Service
                  <ArrowRight size={18} />
                </SpecularLink>
              </div>
            </div>
            </ElectricBorder>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
