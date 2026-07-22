import type { Metadata } from "next";
import { Suspense } from "react";
import RequestForm from "@/components/RequestForm";
import ScrollReveal from "@/components/ScrollReveal";
import ElectricBorder from "@/components/ui/ElectricBorder";

export const metadata: Metadata = {
  title: "Request a Service",
  description:
    "Request a quote for web development, graphic design, video editing, UI/UX design, or app development services from Kortix Digital.",
};

async function RequestFormWrapper({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const params = await searchParams;
  return <RequestForm defaultService={params.service} />;
}

export default async function RequestPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  return (
    <>
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-kortix-green/5 to-transparent" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Request a Service
            </h1>
            <p className="text-kortix-text-secondary text-lg max-w-xl mx-auto">
              Tell us about your project and we&apos;ll get back to you within 24 hours
              with a tailored proposal.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <ElectricBorder borderRadius={16}>
            <div className="p-8 sm:p-10 rounded-2xl bg-kortix-card">
              <Suspense>
                <RequestFormWrapper searchParams={searchParams} />
              </Suspense>
            </div>
            </ElectricBorder>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
