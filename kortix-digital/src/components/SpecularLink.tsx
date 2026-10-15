"use client";

import { type ReactNode } from "react";
import SpecularButton from "./ui/SpecularButton";
import { useMounted } from "@/lib/use-mounted";
import { trackEvent } from "@/lib/analytics";

/**
 * Outbound CTAs are tracked centrally here, so a Server Component can render a
 * tracked WhatsApp/email/Discord button without passing a handler down. An
 * explicit `onClick` always wins, so a caller can report something more
 * specific (see JoinCohortButton).
 */
function trackingFor(href: string): (() => void) | undefined {
  if (href.startsWith("https://wa.me/") || href.includes("chat.whatsapp.com")) {
    return () => trackEvent("click_whatsapp", { location: "cta" });
  }
  if (href.startsWith("mailto:")) {
    return () => trackEvent("click_email");
  }
  if (href.includes("discord")) {
    return () => trackEvent("click_discord");
  }
  return undefined;
}

interface SpecularLinkProps {
  href: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  lineColor?: string;
  baseColor?: string;
  textColor?: string;
  thickness?: number;
  intensity?: number;
  target?: string;
  rel?: string;
  onClick?: () => void;
  "aria-label"?: string;
}

export default function SpecularLink({
  href,
  children,
  size = "md",
  className = "",
  lineColor,
  baseColor,
  textColor,
  thickness,
  intensity,
  target,
  rel,
  onClick,
  "aria-label": ariaLabel,
}: SpecularLinkProps) {
  const mounted = useMounted();
  const handleClick = onClick ?? trackingFor(href);

  if (!mounted) {
    const finalTarget = target || (href?.startsWith("http") ? "_blank" : undefined);
    const finalRel = rel || (href?.startsWith("http") ? "noopener noreferrer" : undefined);
    return (
      <a
        href={href}
        target={finalTarget}
        rel={finalRel}
        aria-label={ariaLabel}
        onClick={handleClick}
        className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-kortix-green text-kortix-darker rounded-lg transition-all duration-200 ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <SpecularButton
      as="a"
      href={href}
      size={size}
      className={className}
      lineColor={lineColor}
      baseColor={baseColor}
      textColor={textColor}
      thickness={thickness}
      intensity={intensity}
      target={target}
      rel={rel}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {children}
    </SpecularButton>
  );
}
