import { NextResponse } from "next/server";
import { sendRequestEmail } from "@/lib/brevo";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import {
  HONEYPOT_FIELD,
  cleanText,
  requestServiceSchema,
} from "@/lib/request-schema";

/** Rate limit: 5 submissions per IP per 10 minutes. */
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

/** Responses are per-request; never let a proxy cache a form submission. */
const noStore = { "Cache-Control": "no-store" } as const;

export async function POST(request: Request) {
  const { ok, retryAfter } = rateLimit(clientKey(request), {
    limit: LIMIT,
    windowMs: WINDOW_MS,
  });

  if (!ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { ...noStore, "Retry-After": String(retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400, headers: noStore },
    );
  }

  // Honeypot: a real visitor never fills a field they cannot see. Answer 200 so
  // the bot has nothing to learn, but send no email.
  if (
    typeof body === "object" &&
    body !== null &&
    typeof (body as Record<string, unknown>)[HONEYPOT_FIELD] === "string" &&
    ((body as Record<string, unknown>)[HONEYPOT_FIELD] as string).length > 0
  ) {
    return NextResponse.json({ success: true }, { headers: noStore });
  }

  const parsed = requestServiceSchema.safeParse(body);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "form");
      fieldErrors[field] ??= issue.message;
    }
    // Only field-level messages are returned: no schema dump, no stack trace.
    return NextResponse.json(
      { error: "Please check the form and try again.", fieldErrors },
      { status: 400, headers: noStore },
    );
  }

  const data = parsed.data;

  try {
    await sendRequestEmail({
      service: cleanText(data.service),
      currency: data.currency ?? "NGN",
      budget: data.budget ? cleanText(data.budget) : "",
      name: cleanText(data.name),
      email: data.email,
      details: cleanText(data.details),
    });

    return NextResponse.json({ success: true }, { headers: noStore });
  } catch (error) {
    // Logged server-side only; the client gets a generic message.
    console.error("Request service error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: noStore },
    );
  }
}
