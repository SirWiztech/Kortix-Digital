"use client";

import Link from "next/link";
import { motion } from "motion/react";
import ScrollReveal from "./ScrollReveal";
import SpecularLink from "./SpecularLink";
import { WhatsAppIcon } from "./BrandIcons";
import { ArrowRight, Users } from "lucide-react";

export default function CommunitySpotlight() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative min-h-[320px] sm:min-h-[440px] rounded-3xl overflow-hidden isolate border border-kortix-border">
            {/* TODO: replace with a community/group photo on /public/images/group-photo.jpg */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#0b120c] via-kortix-dark to-black"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom right, rgba(11,18,12,0.6), rgba(5,5,5,0.9)), url('/images/group-photo.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <div className="absolute inset-0 grain-overlay" />

            <div className="absolute inset-0 bg-gradient-to-r from-kortix-green/10 via-transparent to-transparent" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="relative z-10 flex flex-col justify-end h-full p-6 sm:p-12 min-h-[320px] sm:min-h-[440px]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="max-w-2xl"
              >
                <div className="flex items-center gap-2 text-kortix-green text-sm font-semibold uppercase tracking-wider mb-3">
                  <Users size={16} />
                  Our Community
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                  Join a Growing Community of Digital Creators
                </h2>
                <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8">
                  Connect with mentors, collaborate with peers, and grow
                  alongside hundreds of learners and businesses building the
                  future with Kortix Digital.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <SpecularLink
                    href="/cohorts"
                    size="md"
                    className="w-full sm:w-auto"
                  >
                    Join a Cohort
                  </SpecularLink>
                  <a
                    href="https://wa.me/2347071617216"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white/90 hover:text-white transition-colors"
                  >
                    <WhatsAppIcon size={18} className="text-kortix-whatsapp" />
                    Chat on WhatsApp
                    <ArrowRight size={16} className="opacity-70" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
