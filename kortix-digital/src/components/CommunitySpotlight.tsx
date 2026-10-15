"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import SpecularLink from "./SpecularLink";
import TrackedLink from "./TrackedLink";
import { WhatsAppIcon } from "./BrandIcons";
import { ArrowRight, Users } from "lucide-react";

export default function CommunitySpotlight() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative min-h-[320px] sm:min-h-[440px] rounded-3xl overflow-hidden isolate border border-kortix-border">
            {/*
              The photo lives at /public/group-photo.jpg. The old CSS
              background pointed at /images/group-photo.jpg, which does not
              exist, so the browser requested a 404 and only the gradient
              showed. Serving it through next/image now gives correctly sized
              AVIF/WebP variants. Decorative: the copy beside it describes the
              community, so the alt is intentionally empty.
              TODO(owner): swap in a photo you have permission to publish.
            */}
            <Image
              src="/group-photo.jpg"
              alt=""
              fill
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#0b120c]/70 via-kortix-dark/80 to-black/90"
              aria-hidden
            />

            <div className="absolute inset-0 grain-overlay" />

            <div className="absolute inset-0 bg-gradient-to-r from-kortix-green/10 via-transparent to-transparent" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="relative z-10 flex flex-col justify-end h-full p-6 sm:p-12 min-h-[320px] sm:min-h-[440px]">
              <ScrollReveal delay={0.1} className="max-w-2xl">
                <div className="flex items-center gap-2 text-kortix-green text-sm font-semibold uppercase tracking-wider mb-3">
                  <Users size={16} />
                  Our Community
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                  Join a Growing Community of Digital Creators
                </h2>
                <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8">
                  Connect with mentors, collaborate with peers, and grow
                  alongside other learners and businesses building the future
                  with Kortix Digital.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <SpecularLink
                    href="/cohorts"
                    size="md"
                    className="w-full sm:w-auto"
                  >
                    Join a Cohort
                  </SpecularLink>
                  <TrackedLink
                    href="https://wa.me/2347071617216"
                    event="click_whatsapp"
                    params={{ location: "community_section" }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white/90 hover:text-white transition-colors"
                  >
                    <WhatsAppIcon size={18} className="text-kortix-whatsapp" />
                    Chat on WhatsApp
                    <ArrowRight size={16} className="opacity-70" />
                  </TrackedLink>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
