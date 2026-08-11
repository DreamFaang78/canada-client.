import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(7).max(25),
  message: z.string().min(1).max(3000),
});

// Simple in-memory rate limit
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600_000 });
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const data = contactSchema.parse(body);

    const supabase = createServiceClient();
    const clientEmail = data.email || "callback@sharanbroker.com";
    await supabase.from("contact_submissions").insert({
      name: data.name,
      email: clientEmail,
      phone: data.phone,
      message: data.message,
    });

    await resend.emails.send({
      from: "Sharan Kaur Insurance <noreply@sharanbroker.com>",
      to: process.env.ADMIN_EMAIL || "sharan@sharanbroker.com",
      subject: `New Contact/Callback Request from ${data.name}`,
      html: `
        <h2>New Contact / Callback Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Email:</strong> ${data.email || "N/A (Phone Callback)"}</p>
        <p><strong>Message / Details:</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", issues: err.issues },
        { status: 400 }
      );
    }
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
