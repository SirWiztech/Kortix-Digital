import ServiceCard from "@/components/ServiceCard";
import ScrollReveal from "@/components/ScrollReveal";
import BrandPatternSection from "@/components/BrandPatternSection";
import { services } from "@/data/services";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Digital Agency Services in Nigeria",
  description:
    "Web development, app development, graphic design, video editing and UI/UX design for Nigerian businesses — scoped, quoted and delivered by the Kortix Digital team.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-kortix-green/5 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Our Services
            </h1>
            <p className="text-kortix-text-secondary text-lg max-w-2xl mx-auto">
              End-to-end digital solutions crafted by experienced professionals.
              From concept to launch, we bring your vision to life.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <BrandPatternSection className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </BrandPatternSection>
    </>
  );
}
