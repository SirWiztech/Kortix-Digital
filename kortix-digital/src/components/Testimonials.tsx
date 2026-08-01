"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

// TODO: replace with real testimonials
const testimonials = [
  {
    name: "Adaeze O.",
    role: "Cohort Graduate",
    tag: "Web Development",
    quote:
      "The web development cohort completely changed my career. I went from zero coding experience to building real client projects in six months. The mentors are incredibly patient and hands-on.",
    rating: 5,
    // TODO: replace with real avatar image
  },
  {
    name: "Tunde A.",
    role: "Client",
    tag: "Web Development",
    quote:
      "Kortix built my business website exactly how I imagined it, and delivered ahead of schedule. The communication was clear throughout and the design is stunning. Highly recommend them.",
    rating: 5,
    // TODO: replace with real avatar image
  },
  {
    name: "Chioma E.",
    role: "Cohort Graduate",
    tag: "Graphic Design",
    quote:
      "I joined the graphic design cohort to learn a new skill while working full-time. The flexible structure and practical projects meant I had a portfolio ready before graduation.",
    rating: 5,
    // TODO: replace with real avatar image
  },
  {
    name: "Farouk B.",
    role: "Client",
    tag: "Video Editing",
    quote:
      "Our brand reveal video came out better than we hoped. Kortix really understands how to tell a story visually. We received so many compliments from our audience after publishing it.",
    rating: 5,
    // TODO: replace with real avatar image
  },
  {
    name: "Ifeanyi N.",
    role: "Cohort Graduate",
    tag: "Cybersecurity",
    quote:
      "The cybersecurity track is intense but worth every minute. The hands-on labs and real-world scenarios prepared me for my first security role. The WhatsApp group support was always active.",
    rating: 5,
    // TODO: replace with real avatar image
  },
  {
    name: "Bisi A.",
    role: "Client",
    tag: "UI/UX Design",
    quote:
      "From the first wireframe to the final handoff, Kortix was professional, creative, and easy to work with. They turned our vague idea into a product our users love.",
    rating: 5,
    // TODO: replace with real avatar image
  },
];

const AUTOPLAY_MS = 6000;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = testimonials.length;

  const goTo = useCallback((next: number) => {
    setIndex((next + count) % count);
  }, [count]);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % count);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, count]);

  const active = testimonials[index];

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-kortix-green/3 to-transparent" />
      <div className="absolute inset-0 grain-overlay" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-kortix-green mb-3">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              What Our Community Says
            </h2>
            <p className="text-kortix-text-secondary text-lg max-w-2xl mx-auto">
              Real stories from clients and cohort graduates who have grown with
              Kortix Digital.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div
            className="relative max-w-3xl mx-auto"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative min-h-[320px] sm:min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={index}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute inset-0 bg-kortix-card border border-kortix-border rounded-2xl p-6 sm:p-10 flex flex-col justify-between hover:shadow-lg hover:shadow-kortix-green/10 transition-shadow duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <Quote size={36} className="text-kortix-green/40" />
                      <div className="flex items-center gap-1">
                        {Array.from({ length: active.rating }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className="text-kortix-green"
                            fill="currentColor"
                          />
                        ))}
                      </div>
                    </div>
                    <blockquote className="text-kortix-text-secondary leading-relaxed text-base sm:text-lg mb-6">
                      &ldquo;{active.quote}&rdquo;
                    </blockquote>
                  </div>

                  <figcaption className="flex items-center gap-4">
                    {/* TODO: replace initials circle with real avatar image */}
                    <div className="w-12 h-12 rounded-full bg-kortix-green/10 border border-kortix-green/20 flex items-center justify-center font-bold text-kortix-green shrink-0">
                      {getInitials(active.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground truncate">
                        {active.name}
                      </p>
                      <p className="text-xs text-kortix-muted truncate">
                        {active.role} &middot; {active.tag}
                      </p>
                    </div>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="absolute left-0 sm:-left-16 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-kortix-card border border-kortix-border flex items-center justify-center text-kortix-green hover:bg-kortix-green hover:text-kortix-darker transition-all duration-200 z-10"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="absolute right-0 sm:-right-16 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-kortix-card border border-kortix-border flex items-center justify-center text-kortix-green hover:bg-kortix-green hover:text-kortix-darker transition-all duration-200 z-10"
            >
              <ChevronRight size={20} />
            </button>

            <div className="flex items-center justify-center gap-2 mt-8">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-8 bg-kortix-green"
                      : "w-2 bg-kortix-border hover:bg-kortix-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
