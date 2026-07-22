import { type ReactNode } from "react";

interface BrandPatternSectionProps {
  children: ReactNode;
  className?: string;
}

export default function BrandPatternSection({
  children,
  className = "",
}: BrandPatternSectionProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="brand-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#1DB954" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#brand-dots)" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-kortix-green/5 via-transparent to-kortix-green/3" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
