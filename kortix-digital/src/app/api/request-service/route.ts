import { NextResponse } from "next/server";
import { sendRequestEmail } from "@/lib/brevo";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { service, currency, budget, name, email, details } = body;

    if (!service || !name || !email || !details) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    await sendRequestEmail({
      service,
      currency: currency || "NGN",
      budget: budget || "",
      name,
      email,
      details,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Request service error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
