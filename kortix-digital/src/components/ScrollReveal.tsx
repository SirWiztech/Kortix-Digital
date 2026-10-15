"use client";

import { useEffect, useRef, type ReactNode } from "react";

const OFFSETS: Record<string, string> = {
  up: "translate-y-8",
  down: "-translate-y-8",
  left: "translate-x-8",
  right: "-translate-x-8",
};

/** Applied only once JavaScript is running, to elements still below the fold. */
const SHOWN = [
  "opacity-100",
  "translate-x-0",
  "translate-y-0",
  "transition-[opacity,transform]",
  "duration-700",
  "ease-out",
];

/**
 * Fade/slide content into view with IntersectionObserver + CSS transitions.
 *
 * This replaced a motion/react implementation that server-rendered every
 * wrapped section with an inline `opacity: 0`. That made headings, copy and
 * cards invisible in the raw HTML and left them invisible until React hydrated
 * — bad for Largest Contentful Paint and completely broken without JavaScript.
 *
 * Two things keep it honest:
 *   1. The markup is visible by default; the "hidden" classes are added by JS.
 *   2. Elements already on screen at mount are left alone, so nothing flashes
 *      out and back in, and above-the-fold content never animates.
 *
 * The class names below are Tailwind utilities, so they stay in the stylesheet.
 */
export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    // Already in view: leave it exactly as the server rendered it.
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    const hidden = ["opacity-0", "transition-none", OFFSETS[direction] ?? OFFSETS.up];
    element.classList.add(...hidden);

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        element.classList.remove(...hidden);
        element.classList.add(...SHOWN);
        if (delay) element.style.transitionDelay = `${delay}s`;
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [direction, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
