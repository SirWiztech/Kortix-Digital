import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import SpecularLink from "@/components/SpecularLink";
import ElectricBorder from "@/components/ui/ElectricBorder";
import { WhatsAppIcon, DiscordIcon } from "@/components/BrandIcons";
import { Mail, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Kortix Digital. Reach us via email, WhatsApp, or Discord for inquiries about our services or cohorts.",
};

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "kortixdigital@gmail.com",
    href: "mailto:kortixdigital@gmail.com",
    color: "text-kortix-green",
    bgColor: "bg-kortix-green/10",
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "+234 707 161 7216",
    href: "https://wa.me/2347071617216",
    color: "text-kortix-whatsapp",
    bgColor: "bg-kortix-whatsapp/10",
  },
  {
    icon: DiscordIcon,
    label: "Discord",
    value: "Join our community",
    href: "https://discordapp.com/users/1466951307708469516",
    color: "text-kortix-discord",
    bgColor: "bg-kortix-discord/10",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-kortix-green/5 to-transparent" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-kortix-text-secondary text-lg max-w-xl mx-auto">
              Have a question about our services or cohorts? We&apos;d love to
              hear from you.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactMethods.map((method, i) => {
              const Icon = method.icon;
              return (
                <ScrollReveal key={method.label} delay={i * 0.1}>
                  <ElectricBorder borderRadius={16} className="block">
                  <a
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-8 rounded-2xl bg-kortix-card transition-all duration-300 text-center group hover:-translate-y-1"
                  >
                    <div
                      className={`w-14 h-14 rounded-xl ${method.bgColor} flex items-center justify-center mx-auto mb-5`}
                    >
                      <Icon size={24} className={method.color} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {method.label}
                    </h3>
                    <p className="text-sm text-kortix-text-secondary">
                      {method.value}
                    </p>
                  </a>
                  </ElectricBorder>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal>
            <ElectricBorder borderRadius={16}>
            <div className="text-center p-8 rounded-2xl bg-kortix-card">
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Ready to Work Together?
              </h2>
              <p className="text-kortix-text-secondary mb-6 max-w-lg mx-auto">
                Whether you need a project built or want to join one of our
                cohorts, we&apos;re ready to help you get started.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <SpecularLink
                  href="/request"
                  size="lg"
                >
                  Request a Service
                  <ArrowRight size={18} />
                </SpecularLink>
                <SpecularLink
                  href="/cohorts"
                  size="lg"
                  baseColor="#0a0a0a"
                  thickness={0.5}
                >
                  View Cohorts
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
