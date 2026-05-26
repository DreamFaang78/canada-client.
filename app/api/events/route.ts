import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/server";

const eventSchema = z.object({
  name: z.string().min(1).max(100),
  properties: z.record(z.unknown()).optional(),
  sessionId: z.string().optional(),
  page: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = eventSchema.parse(body);

    // Only insert if analytics consent given (check from localStorage via header)
    const hasConsent = req.headers.get("x-analytics-consent") === "true";
    if (!hasConsent) {
      return NextResponse.json({ success: true, skipped: true });
    }

    const supabase = createServiceClient();
    await supabase.from("user_events").insert({
      event_name: data.name,
      properties: data.properties || {},
      session_id: data.sessionId || null,
      page: data.page || null,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
    console.error("Events API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
