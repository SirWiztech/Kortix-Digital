"use client";

import { useRef, useEffect, type CSSProperties, type ReactNode } from "react";
import { useMounted } from "@/lib/use-mounted";

// Paddings are set so every size clears a 48px tap target on mobile: the small
// size used to be 10px of padding (about 40px tall) on the most-tapped buttons.
const SIZES = {
  sm: "text-[0.85rem] px-[22px] py-[14px]",
  md: "text-[1rem] px-[30px] py-[14px]",
  lg: "text-[1.15rem] px-10 py-[18px]",
};

interface SpecularButtonProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  radius?: number;
  blur?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  thickness?: number;
  speed?: number;
  followMouse?: boolean;
  proximity?: number;
  autoAnimate?: boolean;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  as?: "button" | "a";
  /** Accessible name for icon-only or repeated labels (e.g. one card per track). */
  "aria-label"?: string;
  /** Only used when `as="button"`. Defaults to the browser default (submit in a form). */
  type?: "button" | "submit" | "reset";
}

export default function SpecularButton({
  children,
  size = "md",
  radius = 18,
  blur = 0,
  textColor = "#f5f5f5",
  lineColor = "#23F855",
  baseColor = "#080908",
  intensity = 1,
  thickness = 1,
  speed = 0.35,
  followMouse = true,
  proximity = 250,
  autoAnimate = false,
  className = "",
  onClick,
  href,
  target,
  rel,
  disabled,
  as = "button",
  type,
  "aria-label": ariaLabel,
}: SpecularButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const mounted = useMounted();

  useEffect(() => {
    if (!mounted || !followMouse) return;

    const container = containerRef.current;
    const shine = shineRef.current;
    if (!container || !shine) return;

    function handleMouseMove(e: MouseEvent) {
      const r = container!.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const opacity = dist < proximity / 500 ? intensity * 0.35 : 0;
      shine!.style.background = `radial-gradient(ellipse 120% 100% at ${x}% ${y}%, ${lineColor}${Math.round(opacity * 255).toString(16).padStart(2, "0")} 0%, transparent 70%)`;
    }

    function handleMouseLeave() {
      shine!.style.background = "transparent";
    }

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mounted, followMouse, lineColor, intensity, proximity]);

  useEffect(() => {
    if (!mounted || !autoAnimate || followMouse) return;

    const shine = shineRef.current;
    if (!shine) return;

    let animId: number;
    const startTime = performance.now();

    function animate(time: number) {
      const elapsed = (time - startTime) / 1000;
      const angle = elapsed * speed * 360;
      const x = 50 + Math.cos((angle * Math.PI) / 180) * 40;
      const y = 50 + Math.sin((angle * Math.PI) / 180) * 40;
      shine!.style.background = `radial-gradient(ellipse 120% 100% at ${x}% ${y}%, ${lineColor}${Math.round(intensity * 0.35 * 255).toString(16).padStart(2, "0")} 0%, transparent 70%)`;
      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [mounted, autoAnimate, followMouse, lineColor, intensity, speed]);

  const finalTarget = target || (href?.startsWith("http") ? "_blank" : undefined);
  const finalRel = rel || (href?.startsWith("http") ? "noopener noreferrer" : undefined);
  const contentClass = `relative z-10 cursor-pointer font-medium transition-all duration-200 w-full inline-flex items-center justify-center gap-2 ${disabled ? "opacity-50 pointer-events-none" : ""} ${SIZES[size] || SIZES.md}`;
  const contentStyle: CSSProperties = {
    color: textColor,
    backgroundColor: "transparent",
    backdropFilter: blur ? `blur(${blur}px)` : "none",
    borderRadius: radius,
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center justify-center overflow-hidden ${className}`}
      style={{
        backgroundColor: baseColor,
        borderRadius: radius,
        border: `${thickness}px solid ${lineColor}22`,
      }}
    >
      <div
        ref={shineRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{ zIndex: 0, borderRadius: radius }}
      />
      {as === "a" ? (
        <a
          href={href}
          target={finalTarget}
          rel={finalRel}
          aria-label={ariaLabel}
          onClick={onClick}
          className={contentClass}
          style={contentStyle}
        >
          {children}
        </a>
      ) : (
        <button
          type={type}
          aria-label={ariaLabel}
          onClick={onClick}
          disabled={disabled}
          className={contentClass}
          style={contentStyle}
        >
          {children}
        </button>
      )}
    </div>
  );
}
