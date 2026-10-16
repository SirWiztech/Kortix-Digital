"use client";

import { readConsent } from "./consent";

/**
 * Google Analytics 4 events, gated on cookie consent.
 *
 * Nothing is loaded or sent until the visitor accepts: the GA script itself is
 * only injected by <Analytics /> after consent, and every event helper here
 * checks consent again before calling gtag. If GA is not configured
 * (NEXT_PUBLIC_GA_MEASUREMENT_ID unset) every call is a no-op, so the site runs
 * fine without analytics.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Conversion events actually used on this site. */
export type AnalyticsEvent =
  /** A service request was submitted successfully (/request). */
  | "generate_lead"
  /** Someone opened a WhatsApp conversation with us. */
  | "click_whatsapp"
  /** Someone asked to join a specific cohort group (has `cohort` param). */
  | "join_cohort_click"
  /** Someone opened the mailto link on the contact page. */
  | "click_email"
  /** Someone opened a Discord profile link. */
  | "click_discord"
  /** Someone tapped the phone number to call us. */
  | "click_phone"
  /** The in-page chatbot was opened. */
  | "open_chatbot";

export function isAnalyticsEnabled(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
}

/** True only when analytics is configured AND the visitor accepted cookies. */
function canTrack(): boolean {
  if (typeof window === "undefined" || !isAnalyticsEnabled()) return false;
  return readConsent() === "accepted";
}

export function trackEvent(
  event: AnalyticsEvent,
  params: Record<string, string | number | boolean> = {},
): void {
  if (!canTrack() || typeof window.gtag !== "function") return;

  window.gtag("event", event, {
    // Which page the interaction happened on, since these are not page views.
    page_path: window.location.pathname,
    ...params,
  });
}
