"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { createClient } from "@/lib/supabase/client";
import {
  FileText,
  Users,
  Award,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

interface StatItem {
  label: string;
  value: string | number;
  change: string;
  icon: any;
  color: string;
}

interface LeadRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  service_type: string;
  status: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [recentLeads, setRecentLeads] = useState<LeadRow[]>([]);
  const [followUps, setFollowUps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const supabase = createClient();

        // 1. Fetch leads count
        const { count: totalLeads } = await supabase
          .from("leads")
          .select("*", { count: "exact", head: true });

        // 2. Fetch contacted leads count
        const { count: contactedLeads } = await supabase
          .from("leads")
          .select("*", { count: "exact", head: true })
          .eq("status", "contacted");

        // 3. Fetch won leads count
        const { count: wonLeads } = await supabase
          .from("leads")
          .select("*", { count: "exact", head: true })
          .eq("status", "won");

        // 4. Fetch total customers count
        const { count: totalCustomers } = await supabase
          .from("customers")
          .select("*", { count: "exact", head: true });

        const conversionRate = totalLeads ? Math.round(((wonLeads || 0) / totalLeads) * 100) : 0;

        setStats([
          {
            label: "Total Leads",
            value: totalLeads || 0,
            change: "+12% this month",
            icon: FileText,
            color: "bg-blue-500 text-blue-500"
          },
          {
            label: "Contacted Leads",
            value: contactedLeads || 0,
            change: "Active follow ups",
            icon: Clock,
            color: "bg-amber-500 text-amber-500"
          },
          {
            label: "Won Policies",
            value: wonLeads || 0,
            change: "Policy issued",
            icon: Award,
            color: "bg-emerald-500 text-emerald-500"
          },
          {
            label: "Conversion Rate",
            value: `${conversionRate}%`,
            change: "Industry avg: 15%",
            icon: TrendingUp,
            color: "bg-purple-500 text-purple-500"
          }
        ]);

        // Fetch recent leads
        const { data: leadsData } = await supabase
          .from("leads")
          .select("id, first_name, last_name, email, service_type, status, created_at")
          .order("created_at", { ascending: false })
          .limit(5);

        setRecentLeads(leadsData || []);

        // Fetch upcoming follow ups
        const todayStr = new Date().toISOString().split("T")[0];
        const { data: followUpsData } = await supabase
          .from("leads")
          .select("id, first_name, last_name, service_type, follow_up_date")
          .not("follow_up_date", "is", null)
          .order("follow_up_date", { ascending: true })
          .limit(5);

        setFollowUps(followUpsData || []);
      } catch (err) {
        console.error("Dashboard load failed:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const serviceLabels: Record<string, string> = {
    home: "Home",
    auto: "Auto",
    life: "Life",
    business: "Business"
  };

  const statusColors: Record<string, string> = {
    new: "bg-blue-50 text-blue-700 border-blue-200",
    contacted: "bg-amber-50 text-amber-700 border-amber-200",
    quoted: "bg-purple-50 text-purple-700 border-purple-200",
    follow_up: "bg-indigo-50 text-indigo-700 border-indigo-200",
    won: "bg-emerald-50 text-emerald-700 border-emerald-200",
    lost: "bg-red-50 text-red-700 border-red-200",
    dormant: "bg-gray-50 text-gray-700 border-gray-200"
  };

  return (
    <AdminShell>
      <div className="space-y-8">
        {/* Welcome Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-big-dark">
              Broker CRM Dashboard
            </h1>
            <p className="text-sm text-mid-gray mt-1">
              Real-time monitoring of policy quotes, lead flow, and regulatory activities.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl font-semibold">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>RIBO Audit Compliant</span>
          </div>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 h-28 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
                >
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-mid-gray uppercase tracking-wider block">
                      {stat.label}
                    </span>
                    <span className="font-poppins font-bold text-3xl text-big-dark block leading-none">
                      {stat.value}
                    </span>
                    <span className="text-[10px] text-gray-400 block font-light">
                      {stat.change}
                    </span>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center`}>
                    <StatIcon className="w-6 h-6 text-big-red" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Leads */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-150 shadow-sm p-6 sm:p-8 flex flex-col justify-between min-h-[400px]">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-poppins font-bold text-lg text-big-dark">Recent Lead Requests</h3>
                  <p className="text-xs text-mid-gray font-light">Real-time quotes incoming from the public site.</p>
                </div>
                <Link
                  href="/admin/leads"
                  className="text-xs font-semibold text-big-red hover:underline flex items-center gap-1.5"
                >
                  All Leads
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-14 bg-gray-50 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : recentLeads.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 text-xs font-bold text-charcoal uppercase tracking-wider">
                        <th className="pb-3">Name</th>
                        <th className="pb-3">Insurance</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3">Created</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-sm">
                      {recentLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-3 font-semibold text-big-dark">
                            {lead.first_name} {lead.last_name}
                          </td>
                          <td className="py-3">
                            <span className="capitalize text-xs font-semibold text-charcoal">
                              {serviceLabels[lead.service_type] || lead.service_type}
                            </span>
                          </td>
                          <td className="py-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[lead.status]}`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="py-3 text-xs text-mid-gray">
                            {new Date(lead.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-16 text-mid-gray text-sm">
                  No leads received yet. Test your quote request page!
                </div>
              )}
            </div>
          </div>

          {/* Follow ups column */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-gray-150 shadow-sm p-6 sm:p-8 flex flex-col justify-between min-h-[400px]">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-poppins font-bold text-lg text-big-dark">Upcoming Reminders</h3>
                  <p className="text-xs text-mid-gray font-light">Renewal schedules & client call-backs.</p>
                </div>
                <Calendar className="w-5 h-5 text-big-red" />
              </div>

              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-16 bg-gray-50 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : followUps.length > 0 ? (
                <div className="space-y-3">
                  {followUps.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-light-gray rounded-2xl border border-gray-200/50 flex items-start gap-3 hover:border-big-red/10 hover:bg-white transition-all cursor-pointer"
                    >
                      <AlertCircle className="w-5 h-5 text-big-red shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-poppins font-bold text-xs text-big-dark leading-tight">
                          Call {item.first_name} {item.last_name}
                        </h4>
                        <span className="text-[10px] text-mid-gray font-semibold bg-gray-100 border px-2 py-0.5 rounded-full mt-1.5 inline-block uppercase">
                          {serviceLabels[item.service_type] || item.service_type}
                        </span>
                        <p className="text-[10px] text-gray-500 font-medium mt-1">
                          Date: {new Date(item.follow_up_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-mid-gray text-xs font-light">
                  No upcoming follow-up reminders. Keep up the good work!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
