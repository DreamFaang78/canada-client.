import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory rate limit store (per IP, resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const quoteSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  serviceType: z.enum(["home", "auto", "life", "business"]),
  details: z.string().max(2000).optional(),
  source: z.enum(["organic", "direct", "referral", "google_ads", "social", "other", "website_quote_form"]).default("organic"),
});

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600_000 });
    return true;
  }

  if (entry.count >= 3) {
    return false;
  }

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
    const data = quoteSchema.parse(body);

    const supabase = createServiceClient();
    // Map website_quote_form to "other" to satisfy DB enum constraint
    const dbSource = data.source === "website_quote_form" ? "other" : data.source;
    const { data: lead, error } = await supabase
      .from("leads")
      .insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        service_type: data.serviceType,
        details: data.details || null,
        source: dbSource,
        status: "new",
      })
      .select("id")
      .single();

    if (error) throw error;

    // Send notification email to Sharan
    await resend.emails.send({
      from: "BIG Insurance Website <noreply@thebig.ca>",
      to: process.env.ADMIN_EMAIL || "sharan@thebig.ca",
      subject: `New Quote Request: ${data.serviceType} insurance — ${data.firstName} ${data.lastName}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Service:</strong> ${data.serviceType}</p>
        <p><strong>Details:</strong> ${data.details || "N/A"}</p>
        <p><strong>Source:</strong> ${data.source}</p>
        <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/leads">View in Admin →</a></p>
      `,
    });

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", issues: err.issues },
        { status: 400 }
      );
    }
    console.error("Quote API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
