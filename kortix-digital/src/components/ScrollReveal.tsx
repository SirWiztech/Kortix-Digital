"use client";

import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import { type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
}

const directionMap: Record<string, { x: number; y: number }> = {
  up: { y: 80, x: 0 },
  down: { y: -80, x: 0 },
  left: { x: 80, y: 0 },
  right: { x: -80, y: 0 },
};

function buildVariants(direction: string): Variants {
  const offset = directionMap[direction];
  return {
    offscreen: {
      opacity: 0,
      ...offset,
    },
    onscreen: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const variants = buildVariants(direction);

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
      style={{ transitionDelay: `${delay}s` }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
