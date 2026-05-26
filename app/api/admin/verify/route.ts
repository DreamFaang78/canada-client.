import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest) {
  try {
    // Get the current session user via the normal (cookie-based) client
    const supabase = createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ authorized: false, reason: "not_authenticated" }, { status: 401 });
    }

    // Use service role to bypass RLS and check the admins table
    const serviceClient = createServiceClient();
    const { data: profile, error: profileError } = await serviceClient
      .from("admins")
      .select("id, role, is_active, full_name")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ authorized: false, reason: "not_in_admins_table" }, { status: 403 });
    }

    if (!profile.is_active) {
      return NextResponse.json({ authorized: false, reason: "account_inactive" }, { status: 403 });
    }

    return NextResponse.json({
      authorized: true,
      role: profile.role,
      fullName: profile.full_name,
    });
  } catch (err) {
    console.error("Admin verify error:", err);
    return NextResponse.json({ authorized: false, reason: "server_error" }, { status: 500 });
  }
}
