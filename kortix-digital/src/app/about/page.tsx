import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import BrandPatternSection from "@/components/BrandPatternSection";
import ElectricBorder from "@/components/ui/ElectricBorder";
import {
  Globe,
  Palette,
  Video,
  PenTool,
  Smartphone,
  Users,
  Target,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Kortix Digital — a dual-purpose digital agency and mentorship platform building the next generation of digital professionals.",
};

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description:
      "We exist to bridge the gap between digital skills education and real-world agency work, creating a pipeline of job-ready professionals.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "Every cohort is a community. We believe in collaborative learning, peer support, and building networks that last beyond the program.",
  },
  {
    icon: Zap,
    title: "Results-Focused",
    description:
      "Whether it's a client project or a student outcome, we measure success by tangible results — launches, placements, and revenue growth.",
  },
];

const services = [
  { icon: Globe, name: "Web Development" },
  { icon: Palette, name: "Graphic Design" },
  { icon: Video, name: "Video Editing" },
  { icon: PenTool, name: "UI/UX Design" },
  { icon: Smartphone, name: "App Development" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-kortix-green/5 to-transparent" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              About Kortix Digital
            </h1>
            <p className="text-kortix-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
              We are a dual-purpose digital agency and mentorship platform,
              on a mission to build the next generation of digital professionals
              while delivering exceptional work for our clients.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="prose prose-invert max-w-none">
              <ElectricBorder borderRadius={16}>
              <div className="p-8 rounded-2xl bg-kortix-card">
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Story</h2>
                <p className="text-kortix-text-secondary leading-relaxed mb-4">
                  Kortix Digital was founded with a simple observation: the digital
                  economy is booming, but there&apos;s a massive gap between what
                  institutions teach and what the market needs. On the other side,
                  businesses struggle to find reliable, skilled digital professionals
                  to handle their web development, design, and content needs.
                </p>
                <p className="text-kortix-text-secondary leading-relaxed mb-4">
                  We decided to solve both problems simultaneously. Our agency arm
                  delivers professional digital services — from websites to brand
                  identities to mobile apps. Our education arm runs intensive
                  mentorship cohorts that take students from beginner to job-ready
                  in the most in-demand digital skills.
                </p>
                <p className="text-kortix-text-secondary leading-relaxed">
                  The result is a self-reinforcing ecosystem: students learn by
                  working on real client projects, and clients benefit from fresh
                  talent guided by experienced mentors.
                </p>
              </div>
              </ElectricBorder>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <BrandPatternSection className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-12">
              Our Values
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <ScrollReveal key={value.title} delay={i * 0.1}>
                  <ElectricBorder borderRadius={16}>
                  <div className="p-8 rounded-2xl bg-kortix-card text-center">
                    <div className="w-12 h-12 rounded-xl bg-kortix-green/10 flex items-center justify-center mx-auto mb-5">
                      <Icon size={24} className="text-kortix-green" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-sm text-kortix-text-secondary leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                  </ElectricBorder>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </BrandPatternSection>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-12">
              What We Offer
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <ScrollReveal key={service.name} delay={i * 0.05}>
                  <ElectricBorder borderRadius={12}>
                  <div className="p-6 rounded-xl bg-kortix-card text-center">
                    <Icon size={28} className="text-kortix-green mx-auto mb-3" />
                    <p className="text-sm font-medium text-foreground">
                      {service.name}
                    </p>
                  </div>
                  </ElectricBorder>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
