import { z } from "zod";

/**
 * Single source of truth for the service request payload.
 *
 * The client form and the API route both validate against this, so the browser
 * can never send something the server would silently accept (or reject) under
 * different rules. The API always re-validates: client-side validation is a
 * convenience, not a control.
 */

/** Currencies the form offers. Anything else is rejected server-side. */
export const REQUEST_CURRENCIES = ["NGN", "USD", "GBP", "EUR"] as const;

/** Names of the hidden honeypot field and its bait label. */
export const HONEYPOT_FIELD = "kortix_hp";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const requestServiceSchema = z.object({
  service: z.string().trim().min(1, "Please select a service").max(80),
  // Optional rather than `.default()` so the parsed input and output types stay
  // identical, which is what react-hook-form's resolver generics require. The
  // API normalises a missing currency to NGN.
  currency: z.enum(REQUEST_CURRENCIES).optional(),
  // Free-text budget: kept optional, and capped so nobody can post a novel.
  budget: z
    .string()
    .trim()
    .max(20)
    .regex(/^[0-9]*$/, "Budget should be a number")
    .optional()
    .or(z.literal("")),
  name: z
    .string()
    .trim()
    .min(2, "Name is required")
    .max(80, "Please use 80 characters or fewer"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .regex(emailPattern, "Please enter a valid email address")
    .max(160),
  details: z
    .string()
    .trim()
    .min(10, "Please provide more details (min 10 characters)")
    .max(3000, "Please keep this under 3000 characters"),
  // Honeypot: must stay empty. Bots that fill every field trip it.
  [HONEYPOT_FIELD]: z.string().max(100).optional(),
});

export type RequestServiceInput = z.infer<typeof requestServiceSchema>;

/**
 * Collapses whitespace and drops control characters. HTML escaping happens
 * where the value is interpolated (see lib/brevo.ts), because that is the only
 * place it matters.
 */
export function cleanText(value: string): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\r\n/g, "\n")
    .trim();
}
