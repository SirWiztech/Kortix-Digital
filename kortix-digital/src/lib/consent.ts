"use client";

/**
 * Tiny external store for the cookie/analytics consent choice, shared by the
 * consent banner and the analytics loader so both stay in sync without
 * `setState` inside an effect.
 */
export const CONSENT_STORAGE_KEY = "cookie-consent";

export type ConsentState =
  /** Server render / hydration: we cannot know yet, so treat as "no consent". */
  | "unknown"
  /** Client, nothing stored yet: show the banner and load no tracking. */
  | "none"
  | "accepted"
  | "declined";

const listeners = new Set<() => void>();

export function subscribeConsent(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener("kortix:consent-change", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("kortix:consent-change", listener);
  };
}

export function readConsent(): ConsentState {
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored === "accepted") return "accepted";
    if (stored === "declined") return "declined";
  } catch {
    // localStorage can throw in private modes — fall through to "none".
  }
  return "none";
}

export function getServerConsent(): ConsentState {
  return "unknown";
}

export function setConsent(value: "accepted" | "declined"): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Ignore storage failures; the banner still closes for this session.
  }
  window.dispatchEvent(new Event("kortix:consent-change"));
}
