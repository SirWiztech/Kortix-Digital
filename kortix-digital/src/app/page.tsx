import Link from "next/link";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import CohortCard from "@/components/CohortCard";
import Testimonials from "@/components/Testimonials";
import VideoShowcase from "@/components/VideoShowcase";
import CommunitySpotlight from "@/components/CommunitySpotlight";
import FAQ from "@/components/FAQ";
import ScrollReveal from "@/components/ScrollReveal";
import BrandPatternSection from "@/components/BrandPatternSection";
import SpecularLink from "@/components/SpecularLink";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { services } from "@/data/services";
import { cohorts } from "@/data/cohorts";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Digital Agency Services
              </h2>
              <p className="text-kortix-text-secondary text-lg max-w-2xl mx-auto">
                Websites, mobile apps, brand design and video editing for
                businesses in Nigeria and beyond — scoped, quoted and delivered
                by the Kortix Digital team.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="text-center mt-12">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-kortix-green hover:text-kortix-green-light transition-colors"
              >
                Compare all {services.length} agency services
                <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <BrandPatternSection className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Paid Mentorship Cohorts &amp; Tech Courses
              </h2>
              <p className="text-kortix-text-secondary text-lg max-w-2xl mx-auto">
                Intensive, mentor-led cohorts that take you from beginner to
                job-ready in web development, app development, data analysis,
                cybersecurity, UI/UX design, digital marketing and more.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* All cohorts are listed here so every track is one click from
                the homepage rather than hidden behind /cohorts. */}
            {cohorts.map((cohort, i) => (
              <CohortCard key={cohort.slug} cohort={cohort} index={i} />
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="text-center mt-12">
              <Link
                href="/cohorts"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-kortix-green hover:text-kortix-green-light transition-colors"
              >
                See all {cohorts.length} cohorts, fees and durations
                <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </BrandPatternSection>

      <Testimonials />

      <VideoShowcase />

      <CommunitySpotlight />

      <FAQ />

      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-kortix-green/10 via-kortix-green/5 to-kortix-green/10" />
        <div className="absolute inset-0 grain-overlay" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-kortix-text-secondary text-lg mb-8 max-w-xl mx-auto">
              Whether you need a website built or want to learn a new skill,
              we&apos;re here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <SpecularLink
                href="/request"
                size="lg"
                className="w-full sm:w-auto"
              >
                Request a Service
              </SpecularLink>
              <SpecularLink
                href="https://wa.me/2347071617216"
                size="lg"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
                lineColor="#25D366"
              >
                <WhatsAppIcon size={20} />
                Chat on WhatsApp
              </SpecularLink>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
