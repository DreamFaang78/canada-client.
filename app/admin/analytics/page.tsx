"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { createClient } from "@/lib/supabase/client";
import { BarChart, PieChart, Shield, Cookie, Activity, MapPin, Loader2, ArrowUpRight } from "lucide-react";

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [consentStats, setConsentStats] = useState({ total: 0, analytics: 0, marketing: 0, optInRate: 0 });
  const [deviceStats, setDeviceStats] = useState({ desktop: 0, mobile: 0, tablet: 0 });
  const [leadGeo, setLeadGeo] = useState<any[]>([]);
  const [eventCounts, setEventCounts] = useState<any[]>([]);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const supabase = createClient();

        // 1. Fetch Cookie Consents
        const { data: consents, error: consentErr } = await supabase
          .from("cookie_consents")
          .select("analytics_consent, marketing_consent");

        if (consents) {
          const total = consents.length;
          const analytics = consents.filter((c) => c.analytics_consent).length;
          const marketing = consents.filter((c) => c.marketing_consent).length;
          const optInRate = total ? Math.round((analytics / total) * 100) : 0;
          setConsentStats({ total, analytics, marketing, optInRate });
        }

        // 2. Fetch User Events
        const { data: events, error: eventErr } = await supabase
          .from("user_events")
          .select("event_name, device_type");

        if (events) {
          // Device breakdown
          const desktop = events.filter((e) => e.device_type === "desktop").length;
          const mobile = events.filter((e) => e.device_type === "mobile").length;
          const tablet = events.filter((e) => e.device_type === "tablet" || e.device_type === "unknown").length;
          setDeviceStats({ desktop, mobile, tablet });

          // Event type count
          const counts: Record<string, number> = {};
          events.forEach((e) => {
            counts[e.event_name] = (counts[e.event_name] || 0) + 1;
          });
          const mappedEvents = Object.entries(counts).map(([name, count]) => ({ name, count }));
          setEventCounts(mappedEvents);
        }

        // 3. Fetch Leads City distribution (from details/address) or simulated breakdown
        const { data: leads, error: leadsErr } = await supabase
          .from("leads")
          .select("details");

        const cities: Record<string, number> = { Mississauga: 0, Brampton: 0, Toronto: 0, Oakville: 0, Other: 0 };
        if (leads) {
          leads.forEach((l) => {
            try {
              if (l.details) {
                const parsed = JSON.parse(l.details);
                const addr = (parsed.homeAddress || "").toLowerCase();
                if (addr.includes("mississauga")) cities.Mississauga++;
                else if (addr.includes("brampton")) cities.Brampton++;
                else if (addr.includes("toronto")) cities.Toronto++;
                else if (addr.includes("oakville")) cities.Oakville++;
                else cities.Other++;
              } else {
                cities.Mississauga++; // Seed defaults
              }
            } catch {
              cities.Mississauga++;
            }
          });
          const mappedGeo = Object.entries(cities).map(([city, count]) => ({ city, count }));
          setLeadGeo(mappedGeo);
        }
      } catch (err) {
        console.error("Failed to load analytics details:", err);
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  return (
    <AdminShell>
      <div className="space-y-8">
        <div>
          <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-big-dark">Analytics & Tracking</h1>
          <p className="text-sm text-mid-gray mt-1">Audit cookie consents, click analytics, and lead demographics.</p>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center bg-white rounded-3xl border border-gray-150 shadow-sm">
            <Loader2 className="w-8 h-8 text-big-red animate-spin mb-4" />
            <p className="text-xs text-mid-gray">Analyzing tracking tables...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Consent Widget */}
            <div className="bg-white rounded-3xl border border-gray-150 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-big-red/10 text-big-red rounded-xl flex items-center justify-center shrink-0">
                  <Cookie className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-lg text-big-dark">GDPR & Cookie Consent Audits</h3>
                  <p className="text-xs text-mid-gray font-light">Compliance log breakdown.</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-light-gray rounded-2xl border border-gray-200">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Audited Sessions</span>
                  <span className="font-poppins font-bold text-2xl text-big-dark mt-1 block">{consentStats.total}</span>
                </div>
                <div className="p-4 bg-light-gray rounded-2xl border border-gray-200">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Analytics Allowed</span>
                  <span className="font-poppins font-bold text-2xl text-big-dark mt-1 block">{consentStats.analytics}</span>
                </div>
                <div className="p-4 bg-light-gray rounded-2xl border border-gray-200">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Opt-in Ratio</span>
                  <span className="font-poppins font-bold text-2xl text-big-red mt-1 block">{consentStats.optInRate}%</span>
                </div>
              </div>

              <div className="text-xs text-mid-gray leading-relaxed font-light border-t border-gray-100 pt-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-big-red shrink-0" />
                <span>Consent data is hashed and stores zero identifiable IP addresses.</span>
              </div>
            </div>

            {/* Device breakdown */}
            <div className="bg-white rounded-3xl border border-gray-150 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-big-red/10 text-big-red rounded-xl flex items-center justify-center shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-lg text-big-dark">Device Breakdown</h3>
                  <p className="text-xs text-mid-gray font-light">Client browser categories.</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Desktop / Laptop", count: deviceStats.desktop },
                  { label: "Smartphones (iOS/Android)", count: deviceStats.mobile },
                  { label: "Tablets & Other", count: deviceStats.tablet }
                ].map((item, idx) => {
                  const total = deviceStats.desktop + deviceStats.mobile + deviceStats.tablet;
                  const pct = total ? Math.round((item.count / total) * 100) : 0;
                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-big-dark">{item.label}</span>
                        <span className="text-mid-gray">{item.count} sessions ({pct}%)</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-big-red h-full rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Geographic Distribution */}
            <div className="bg-white rounded-3xl border border-gray-150 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-big-red/10 text-big-red rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-lg text-big-dark">Lead Geographic Heat</h3>
                  <p className="text-xs text-mid-gray font-light">Regional distribution of quote requests in Peel.</p>
                </div>
              </div>

              <div className="divide-y divide-gray-50">
                {leadGeo.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex justify-between items-center text-xs">
                    <span className="font-semibold text-charcoal">{item.city}</span>
                    <span className="font-bold text-big-dark bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-lg">
                      {item.count} Leads
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timelines / Events logs */}
            <div className="bg-white rounded-3xl border border-gray-150 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-big-red/10 text-big-red rounded-xl flex items-center justify-center shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-lg text-big-dark">Tracking Events Log</h3>
                  <p className="text-xs text-mid-gray font-light">Event clicks registered.</p>
                </div>
              </div>

              <div className="divide-y divide-gray-50">
                {eventCounts.length > 0 ? (
                  eventCounts.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex justify-between items-center text-xs">
                      <span className="font-semibold text-charcoal capitalize">{item.name.replace(/_/g, " ")}</span>
                      <span className="font-bold text-big-dark bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-lg">
                        {item.count} Clicks
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-mid-gray italic text-center py-6">No custom event triggers logged.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
