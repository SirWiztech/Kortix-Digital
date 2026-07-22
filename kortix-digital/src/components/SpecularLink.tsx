"use client";

import { useRef, useEffect, useState } from "react";
import SpecularButton from "./ui/SpecularButton";
import { type ReactNode } from "react";

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
}: SpecularLinkProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    const finalTarget = target || (href?.startsWith("http") ? "_blank" : undefined);
    const finalRel = rel || (href?.startsWith("http") ? "noopener noreferrer" : undefined);
    return (
      <a
        href={href}
        target={finalTarget}
        rel={finalRel}
        onClick={onClick}
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
      onClick={onClick}
    >
      {children}
    </SpecularButton>
  );
}
