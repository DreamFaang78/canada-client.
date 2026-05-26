import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const serviceClient = createServiceClient();
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const prevWeekStart = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString();

    const [todayRes, weekRes, prevWeekRes, funnelRes, servicesRes] =
      await Promise.all([
        serviceClient
          .from("leads")
          .select("id", { count: "exact", head: true })
          .gte("created_at", todayStart),
        serviceClient
          .from("leads")
          .select("id", { count: "exact", head: true })
          .gte("created_at", weekStart),
        serviceClient
          .from("leads")
          .select("id", { count: "exact", head: true })
          .gte("created_at", prevWeekStart)
          .lt("created_at", weekStart),
        serviceClient.from("leads").select("status"),
        serviceClient.from("leads").select("service_type"),
      ]);

    const funnel = {
      new: 0,
      contacted: 0,
      quoted: 0,
      won: 0,
      lost: 0,
    };
    funnelRes.data?.forEach((l: any) => {
      if (l.status in funnel) funnel[l.status as keyof typeof funnel]++;
    });

    const services: Record<string, number> = {};
    servicesRes.data?.forEach((l: any) => {
      services[l.service_type] = (services[l.service_type] || 0) + 1;
    });

    const weekCount = weekRes.count || 0;
    const prevWeekCount = prevWeekRes.count || 0;
    const weekOverWeek =
      prevWeekCount === 0
        ? 100
        : Math.round(((weekCount - prevWeekCount) / prevWeekCount) * 100);

    return NextResponse.json({
      today: todayRes.count || 0,
      thisWeek: weekCount,
      weekOverWeek,
      funnel,
      services,
    });
  } catch (err) {
    console.error("Analytics API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
