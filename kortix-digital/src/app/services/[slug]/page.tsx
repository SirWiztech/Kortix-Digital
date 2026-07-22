import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import SpecularLink from "@/components/SpecularLink";
import ElectricBorder from "@/components/ui/ElectricBorder";
import { services, getServiceBySlug } from "@/data/services";
import { Check, ArrowRight } from "lucide-react";
import { getIcon } from "@/lib/icon-map";

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
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const Icon = getIcon(service.iconName);

  return (
    <>
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-kortix-green/5 to-transparent" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-sm text-kortix-muted hover:text-kortix-green transition-colors mb-8"
            >
              <ArrowRight size={14} className="rotate-180" />
              All Services
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-kortix-green/10 flex items-center justify-center">
                <Icon size={28} className="text-kortix-green" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                {service.title}
              </h1>
            </div>

            <p className="text-lg text-kortix-text-secondary leading-relaxed mb-8">
              {service.longDescription}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ScrollReveal>
                <h2 className="text-2xl font-bold text-foreground mb-6">What&apos;s Included</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, i) => (
                    <ElectricBorder key={i} borderRadius={12}>
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-kortix-card"
                    >
                      <Check size={18} className="text-kortix-green mt-0.5 shrink-0" />
                      <span className="text-sm text-kortix-text-secondary">
                        {feature}
                      </span>
                    </div>
                    </ElectricBorder>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            <div>
              <ScrollReveal delay={0.1}>
                <ElectricBorder borderRadius={16}>
                <div className="sticky top-28 p-6 rounded-2xl bg-kortix-card">
                  <h3 className="text-lg font-bold text-foreground mb-3">Pricing</h3>
                  <p className="text-sm text-kortix-text-secondary mb-6 leading-relaxed">
                    {service.pricing}
                  </p>
                  <SpecularLink
                    href={`/request?service=${service.slug}`}
                    size="md"
                    className="w-full"
                  >
                    Request This Service
                    <ArrowRight size={16} />
                  </SpecularLink>
                </div>
                </ElectricBorder>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
