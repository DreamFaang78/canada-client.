import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const updateSchema = z.object({
  status: z.enum(["new", "contacted", "quoted", "won", "lost"]).optional(),
  notes: z.string().max(5000).optional(),
  follow_up_date: z.string().optional().nullable(),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const serviceClient = createServiceClient();
    const { data: lead, error } = await serviceClient
      .from("leads")
      .select("*, lead_notes(*), lead_activities(*)")
      .eq("id", params.id)
      .single();

    if (error) throw error;
    return NextResponse.json(lead);
  } catch (err) {
    console.error("Lead GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const updates = updateSchema.parse(body);

    const serviceClient = createServiceClient();
    const { data, error } = await serviceClient
      .from("leads")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", params.id)
      .select()
      .single();

    if (error) throw error;

    // Log activity
    if (updates.status) {
      await serviceClient.from("lead_activities").insert({
        lead_id: params.id,
        activity_type: "status_change",
        metadata: { new_status: updates.status },
        admin_id: user.id,
      });
    }

    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", issues: err.issues }, { status: 400 });
    }
    console.error("Lead PATCH error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
