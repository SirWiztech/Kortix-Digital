"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { Play, Film } from "lucide-react";

/**
 * The brand reveal video is published at /public/logo-reveal.mp4.
 *
 * It is loaded on click rather than on page load: the file is a couple of
 * megabytes, so `preload="none"` behind a facade keeps it off the critical
 * path (and off mobile data) until someone actually wants to watch it. The
 * container keeps a fixed 16:9 box in both states, so nothing shifts.
 *
 * TODO(owner): add `VideoObject` structured data once a real thumbnail image
 * exists for the video — Google requires `thumbnailUrl`, and there is no
 * honest thumbnail to point at on the site today.
 */
const VIDEO_SRC = "/logo-reveal.mp4";

export default function VideoShowcase() {
  const [playing, setPlaying] = useState(false);

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
            {playing ? (
              <video
                className="absolute inset-0 w-full h-full object-contain object-center z-10"
                src={VIDEO_SRC}
                controls
                autoPlay
                playsInline
              />
            ) : (
              <>
                <div
                  className="absolute inset-0 bg-gradient-to-br from-kortix-green/15 via-kortix-dark to-black"
                  aria-hidden
                />
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="group absolute inset-0 z-20 flex flex-col items-center justify-center gap-4"
                  aria-label="Play the Kortix Digital brand reveal video"
                >
                  <span className="w-16 h-16 rounded-full bg-kortix-green/10 border border-kortix-green/30 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 group-hover:bg-kortix-green/20">
                    <Play size={28} className="text-kortix-green ml-1" />
                  </span>
                  <span className="text-kortix-text-secondary text-sm">
                    Play the brand reveal
                  </span>
                </button>
              </>
            )}

            <div className="absolute top-4 right-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-xs font-medium text-kortix-text-secondary pointer-events-none">
              <Film size={14} className="text-kortix-green" />
              Motion Graphics
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
