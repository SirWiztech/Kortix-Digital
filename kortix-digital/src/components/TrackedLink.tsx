"use client";

import type { ReactNode } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

/**
 * A plain <a> that reports a conversion event on click.
 *
 * Server components cannot pass an onClick handler down to an anchor, so the
 * places that link out to WhatsApp, email or Discord use this instead. Events
 * are consent-gated inside `trackEvent`, so this stays a no-op for visitors who
 * declined cookies.
 */
export default function TrackedLink({
  href,
  event,
  params,
  className,
  children,
  target,
  rel,
  ariaLabel,
}: {
  href: string;
  event: AnalyticsEvent;
  params?: Record<string, string | number | boolean>;
  className?: string;
  children: ReactNode;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      className={className}
      onClick={() => trackEvent(event, params)}
    >
      {children}
    </a>
  );
}
