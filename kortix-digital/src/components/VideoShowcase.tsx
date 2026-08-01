"use client";

import ScrollReveal from "./ScrollReveal";
import { Play, Film } from "lucide-react";

export default function VideoShowcase() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-kortix-green mb-3">
              Brand Reveal
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Brand Story in Motion
            </h2>
            <p className="text-kortix-text-secondary text-lg max-w-2xl mx-auto">
              A look at who we are and what we stand for — built, designed, and
              edited in-house by the Kortix team.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="relative rounded-3xl overflow-hidden aspect-video bg-kortix-card border border-kortix-border shadow-lg shadow-kortix-green/5">
            {/* TODO: replace with the latest brand reveal video at /public/logo-reveal.mp4 */}
            <video
              className="absolute inset-0 w-full h-full object-contain object-center z-10"
              src="/logo-reveal.mp4"
              controls
              preload="metadata"
              playsInline
            />

            <div className="absolute inset-0 z-0 flex flex-col items-center justify-center gap-4 pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-kortix-green/10 border border-kortix-green/30 flex items-center justify-center">
                <Play size={28} className="text-kortix-green ml-1" />
              </div>
              <p className="text-kortix-text-secondary text-sm">
                Brand reveal video coming soon
              </p>
            </div>

            <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-xs font-medium text-kortix-text-secondary pointer-events-none">
              <Film size={14} className="text-kortix-green" />
              Motion Graphics
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
