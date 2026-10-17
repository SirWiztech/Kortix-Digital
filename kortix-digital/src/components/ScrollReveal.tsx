import type { ReactNode } from "react";

/**
 * Animation disabled: renders children immediately with no fade, slide,
 * observer or transition. Props are kept so existing usages
 * (<ScrollReveal direction="up" delay={0.2}>) keep working unchanged.
 */
export default function ScrollReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}