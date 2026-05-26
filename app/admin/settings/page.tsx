"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { createClient } from "@/lib/supabase/client";
import { Settings, Save, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface SettingItem {
  id: string;
  key: string;
  value: string;
  value_type: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SettingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();

  useEffect(() => {
    async function loadSettings() {
      try {
        const { data, error: fetchErr } = await supabase
          .from("settings")
          .select("id, key, value, value_type")
          .order("key");

        if (fetchErr) throw fetchErr;
        setSettings(data || []);
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleValueChange = (id: string, newVal: string) => {
    setSettings((prev) => prev.map((s) => (s.id === id ? { ...s, value: newVal } : s)));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError("");

    try {
      // Loop and update each setting row in Supabase
      const promises = settings.map((s) =>
        supabase
          .from("settings")
          .update({ value: s.value, updated_at: new Date().toISOString() })
          .eq("id", s.id)
      );

      const results = await Promise.all(promises);
      const failed = results.find((r) => r.error);
      if (failed) throw failed.error;

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to update configuration settings.");
    } finally {
      setSaving(false);
    }
  };

  const friendlyLabels: Record<string, string> = {
    business_name: "Business / Brokerage Name",
    broker_name: "Broker First Name",
    phone: "Contact Phone Number",
    email: "Contact Email Address",
    website: "Public Web Domain",
    address: "Office Suite Street Address",
    hours_weekday: "Weekday Hours (Mon-Fri)",
    hours_saturday: "Saturday Hours",
    hours_sunday: "Sunday Hours",
    google_rating: "Google Business Star Rating",
    review_count: "Google Reviews Count",
    clients_protected: "Clients Protected Count",
    insurers_compared: "Insurers Compared Count",
    years_experience: "Years of Experience Count",
    email_new_lead_notify: "Notify Admin of New Quotes (true/false)",
    email_contact_notify: "Notify Admin of Contact Form (true/false)",
    tagline: "Corporate Tagline"
  };

  return (
    <AdminShell>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-big-dark">System Configurations</h1>
          <p className="text-sm text-mid-gray mt-1">Configure global numbers, addresses, hours, and statistics.</p>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center bg-white rounded-3xl border border-gray-150 shadow-sm">
            <Loader2 className="w-8 h-8 text-big-red animate-spin mb-4" />
            <p className="text-xs text-mid-gray">Loading system settings...</p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="bg-white rounded-3xl border border-gray-150 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <Settings className="w-5 h-5 text-big-red" />
                <h3 className="font-poppins font-bold text-lg text-big-dark">Global Contact & Statistics</h3>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Settings updated successfully! Changes reflect on the public site immediately.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                {settings.map((item) => (
                  <div key={item.id} className="space-y-1.5">
                    <label className="font-bold text-charcoal uppercase tracking-wider block">
                      {friendlyLabels[item.key] || item.key}
                    </label>
                    <input
                      type={item.value_type === "number" ? "number" : "text"}
                      step={item.value_type === "number" ? "any" : undefined}
                      value={item.value || ""}
                      onChange={(e) => handleValueChange(item.id, e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red text-sm text-big-dark font-medium transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3.5 bg-big-red hover:bg-deep-red disabled:bg-big-red/50 text-white font-poppins font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-98"
              >
                {saving ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Settings
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminShell>
  );
}
