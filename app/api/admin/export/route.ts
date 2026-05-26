import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { status, service, dateFrom, dateTo, search } = body;

    const serviceClient = createServiceClient();
    let query = serviceClient
      .from("leads")
      .select("id,first_name,last_name,email,phone,service_type,status,source,created_at,follow_up_date")
      .order("created_at", { ascending: false });

    if (status) query = query.eq("status", status);
    if (service) query = query.eq("service_type", service);
    if (dateFrom) query = query.gte("created_at", dateFrom);
    if (dateTo) query = query.lte("created_at", dateTo);
    if (search) {
      query = query.or(
        `first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`
      );
    }

    const { data, error } = await query;
    if (error) throw error;

    // Build CSV
    const headers = [
      "ID","First Name","Last Name","Email","Phone",
      "Service","Status","Source","Created","Follow-up Date",
    ];
    const rows = data.map((l: any) => [
      l.id, l.first_name, l.last_name, l.email, l.phone || "",
      l.service_type, l.status, l.source || "",
      new Date(l.created_at).toLocaleDateString("en-CA"),
      l.follow_up_date || "",
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((v: any) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\r\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="leads-export-${Date.now()}.csv"`,
      },
    });
  } catch (err) {
    console.error("Export API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
