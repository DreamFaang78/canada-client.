import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/server";

const consentSchema = z.object({
  sessionId: z.string().optional(),
  analytics: z.boolean(),
  marketing: z.boolean(),
  functional: z.boolean(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = consentSchema.parse(body);

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

    const supabase = createServiceClient();
    await supabase.from("cookie_consents").upsert({
      session_id: data.sessionId || crypto.randomUUID(),
      analytics_consent: data.analytics,
      marketing_consent: data.marketing,
      preference_consent: data.functional,
      ip_hash: ip,
    }, { onConflict: "session_id" });

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
    console.error("Consent API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
