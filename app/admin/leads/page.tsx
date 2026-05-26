"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { createClient } from "@/lib/supabase/client";
import {
  Search,
  Filter,
  ArrowUpDown,
  X,
  FileText,
  Phone,
  Mail,
  Calendar,
  Plus,
  Send,
  Loader2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  service_type: string;
  status: string;
  follow_up_date: string | null;
  details: string | null;
  created_at: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [service, setService] = useState("");
  const [loading, setLoading] = useState(true);

  // Drawer details
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [notes, setNotes] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [newNote, setNewNote] = useState("");
  const [leadStatus, setLeadStatus] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  const supabase = createClient();

  const fetchLeads = async () => {
    setLoading(true);
    try {
      let url = `/api/admin/leads?page=${page}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      if (status) url += `&status=${status}`;
      if (service) url += `&service=${service}`;

      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) {
        setLeads(data.leads || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
      }
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page, status, service]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchLeads();
  };

  const handleSelectLead = async (lead: Lead) => {
    setSelectedLead(lead);
    setLeadStatus(lead.status);
    setFollowUpDate(lead.follow_up_date || "");
    setDrawerOpen(true);
    setDrawerLoading(true);
    setNotes([]);
    setActivities([]);

    try {
      // Fetch details, notes, activities
      const res = await fetch(`/api/admin/leads/${lead.id}`);
      const data = await res.json();
      if (res.ok) {
        setNotes(data.lead_notes || []);
        setActivities(data.lead_activities || []);
      }
    } catch (err) {
      console.error("Failed to load lead details:", err);
    } finally {
      setDrawerLoading(false);
    }
  };

  const handleUpdateLead = async () => {
    if (!selectedLead) return;
    try {
      const res = await fetch(`/api/admin/leads/${selectedLead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: leadStatus,
          follow_up_date: followUpDate || null
        })
      });

      const updated = await res.json();
      if (res.ok) {
        // Refresh local leads list
        setLeads((prev) =>
          prev.map((l) => (l.id === selectedLead.id ? { ...l, status: leadStatus, follow_up_date: followUpDate || null } : l))
        );
        setSelectedLead((prev: any) => ({ ...prev, status: leadStatus, follow_up_date: followUpDate || null }));

        // Insert manual activity log
        const { data: { user } } = await supabase.auth.getUser();
        await supabase.from("lead_activities").insert({
          lead_id: selectedLead.id,
          activity_type: "status_change",
          metadata: { new_status: leadStatus, follow_up_date: followUpDate },
          admin_id: user?.id
        });

        // reload activities
        const detailsRes = await fetch(`/api/admin/leads/${selectedLead.id}`);
        const detailsData = await detailsRes.json();
        if (detailsRes.ok) {
          setActivities(detailsData.lead_activities || []);
        }
      }
    } catch (err) {
      console.error("Failed to update lead:", err);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedLead) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("lead_notes")
        .insert({
          lead_id: selectedLead.id,
          content: newNote,
          admin_id: user?.id
        })
        .select()
        .single();

      if (error) throw error;

      setNotes((prev) => [data, ...prev]);
      setNewNote("");

      // Log note added activity
      await supabase.from("lead_activities").insert({
        lead_id: selectedLead.id,
        activity_type: "note_added",
        metadata: { snippet: data.content.substring(0, 30) },
        admin_id: user?.id
      });

      // reload activities
      const detailsRes = await fetch(`/api/admin/leads/${selectedLead.id}`);
      const detailsData = await detailsRes.json();
      if (detailsRes.ok) {
        setActivities(detailsData.lead_activities || []);
      }
    } catch (err) {
      console.error("Failed to add note:", err);
    }
  };

  const serviceLabels: Record<string, string> = {
    home: "Home Insurance",
    auto: "Auto Insurance",
    life: "Life Insurance",
    business: "Business Insurance"
  };

  const statusColors: Record<string, string> = {
    new: "bg-blue-50 text-blue-700 border-blue-200",
    contacted: "bg-amber-50 text-amber-700 border-amber-200",
    quoted: "bg-purple-50 text-purple-700 border-purple-200",
    won: "bg-emerald-50 text-emerald-700 border-emerald-200",
    lost: "bg-red-50 text-red-700 border-red-200"
  };

  // Safe JSON parse for lead details
  const renderLeadDetails = (lead: Lead) => {
    if (!lead.details) return <p className="text-xs text-mid-gray italic">No specific details provided.</p>;
    try {
      const parsed = JSON.parse(lead.details);
      return (
        <div className="grid grid-cols-2 gap-4 bg-light-gray p-4 rounded-2xl border border-gray-200 text-xs mt-2">
          {Object.entries(parsed).map(([key, val]: any) => {
            if (key === "notes") return null; // Rendered separately
            return (
              <div key={key} className="space-y-1">
                <span className="text-gray-400 uppercase tracking-wider block font-bold text-[9px]">{key.replace(/([A-Z])/g, " $1")}</span>
                <span className="text-big-dark font-medium block capitalize">{val}</span>
              </div>
            );
          })}
          {parsed.notes && (
            <div className="col-span-2 space-y-1 pt-2 border-t border-gray-250">
              <span className="text-gray-400 uppercase tracking-wider block font-bold text-[9px]">Additional Notes</span>
              <span className="text-big-dark font-medium block">{parsed.notes}</span>
            </div>
          )}
        </div>
      );
    } catch {
      return <p className="text-xs text-charcoal">{lead.details}</p>;
    }
  };

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-big-dark">Leads Management</h1>
            <p className="text-sm text-mid-gray">Follow up with incoming client quote requests.</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-3xl border border-gray-150 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <form onSubmit={handleSearchSubmit} className="relative w-full md:max-w-md">
            <input
              type="text"
              placeholder="Search leads by name, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent transition-all"
            />
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-mid-gray">
              <Search className="w-4 h-4" />
            </span>
          </form>

          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent transition-all bg-white"
            >
              <option value="">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="quoted">Quoted</option>
              <option value="won">Won (Policy Issued)</option>
              <option value="lost">Lost</option>
            </select>

            <select
              value={service}
              onChange={(e) => {
                setService(e.target.value);
                setPage(1);
              }}
              className="px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent transition-all bg-white"
            >
              <option value="">All Insurances</option>
              <option value="auto">Auto</option>
              <option value="home">Home</option>
              <option value="life">Life</option>
              <option value="business">Business</option>
            </select>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-3xl border border-gray-150 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-big-red animate-spin mb-4" />
              <p className="text-xs text-mid-gray">Loading leads list...</p>
            </div>
          ) : leads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-bold text-charcoal uppercase tracking-wider">
                    <th className="p-4 sm:p-5">Client Name</th>
                    <th className="p-4 sm:p-5">Insurance</th>
                    <th className="p-4 sm:p-5">Status</th>
                    <th className="p-4 sm:p-5">Follow Up</th>
                    <th className="p-4 sm:p-5">Created At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => handleSelectLead(lead)}
                      className="hover:bg-gray-50/70 transition-colors cursor-pointer group"
                    >
                      <td className="p-4 sm:p-5 font-semibold text-big-dark group-hover:text-big-red transition-colors">
                        {lead.first_name} {lead.last_name}
                      </td>
                      <td className="p-4 sm:p-5">
                        <span className="text-xs text-charcoal">
                          {serviceLabels[lead.service_type] || lead.service_type}
                        </span>
                      </td>
                      <td className="p-4 sm:p-5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border capitalize ${statusColors[lead.status]}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="p-4 sm:p-5 text-xs text-mid-gray">
                        {lead.follow_up_date ? new Date(lead.follow_up_date).toLocaleDateString() : "—"}
                      </td>
                      <td className="p-4 sm:p-5 text-xs text-gray-400">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-20 text-mid-gray">
              No leads found. Check filters or submit a test quote!
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-mid-gray">
                Showing page {page} of {totalPages} ({total} total leads)
              </span>
              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Details Slide-Over Drawer */}
      {drawerOpen && selectedLead && (
        <div className="fixed inset-0 z-[999] overflow-hidden">
          <div className="absolute inset-0 bg-black/45 backdrop-blur-xs transition-opacity" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-lg bg-white shadow-2xl border-l border-gray-250 flex flex-col justify-between">
              {/* Drawer Header */}
              <div className="h-16 px-6 border-b border-gray-200 flex items-center justify-between bg-gray-50 shrink-0">
                <div>
                  <h3 className="font-poppins font-bold text-base text-big-dark">Lead Details</h3>
                  <span className="text-[10px] text-gray-400 block font-light">ID: {selectedLead.id}</span>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-gray-200 flex items-center justify-center text-charcoal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar">
                {/* Contact Card */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h2 className="font-poppins font-bold text-xl text-big-dark">
                      {selectedLead.first_name} {selectedLead.last_name}
                    </h2>
                    <span className="bg-big-red/10 text-big-red text-xs font-semibold px-3 py-1 rounded-full uppercase">
                      {serviceLabels[selectedLead.service_type] || selectedLead.service_type}
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs text-charcoal">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-mid-gray" />
                      <a href={`mailto:${selectedLead.email}`} className="hover:underline font-medium text-big-red">{selectedLead.email}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-mid-gray" />
                      <a href={`tel:${selectedLead.phone}`} className="hover:underline font-medium">{selectedLead.phone}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-mid-gray" />
                      <span>Created on {new Date(selectedLead.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Specific Quote Info */}
                <div className="space-y-3 pt-6 border-t border-gray-100">
                  <h4 className="font-poppins font-bold text-sm text-big-dark">Quote Request Profile</h4>
                  {renderLeadDetails(selectedLead)}
                </div>

                {/* Status & Follow Up controls */}
                <div className="space-y-4 pt-6 border-t border-gray-100 bg-gray-50/50 p-4 rounded-2xl border border-gray-200">
                  <h4 className="font-poppins font-bold text-sm text-big-dark">Lead Actions</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-charcoal uppercase tracking-wider block">CRM Status</label>
                      <select
                        value={leadStatus}
                        onChange={(e) => setLeadStatus(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-big-red bg-white"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="quoted">Quoted</option>
                        <option value="won">Won (Policy Issued)</option>
                        <option value="lost">Lost</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-charcoal uppercase tracking-wider block">Follow Up Date</label>
                      <input
                        type="date"
                        value={followUpDate}
                        onChange={(e) => setFollowUpDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-big-red bg-white"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleUpdateLead}
                    className="w-full py-2 bg-big-red hover:bg-deep-red text-white text-xs font-poppins font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Save Actions
                  </button>
                </div>

                {/* Notes log */}
                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <h4 className="font-poppins font-bold text-sm text-big-dark">Lead Notes</h4>
                  
                  <form onSubmit={handleAddNote} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add an internal follow-up note..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent transition-all"
                    />
                    <button
                      type="submit"
                      className="px-3 bg-big-red hover:bg-deep-red text-white rounded-xl flex items-center justify-center transition-all active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </form>

                  {drawerLoading ? (
                    <div className="flex justify-center py-4">
                      <Loader2 className="w-5 h-5 text-big-red animate-spin" />
                    </div>
                  ) : notes.length > 0 ? (
                    <div className="space-y-2.5 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                      {notes.map((note) => (
                        <div key={note.id} className="p-3 bg-light-gray rounded-xl border border-gray-150 text-xs">
                          <p className="text-charcoal leading-relaxed font-light">{note.content}</p>
                          <span className="text-[10px] text-gray-400 block mt-1">
                            Added on {new Date(note.created_at).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-mid-gray italic text-center py-4">No notes recorded.</p>
                  )}
                </div>

                {/* Audit Activity log */}
                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <h4 className="font-poppins font-bold text-sm text-big-dark">Audit & Action Timeline</h4>
                  {drawerLoading ? (
                    <div className="flex justify-center py-4">
                      <Loader2 className="w-5 h-5 text-big-red animate-spin" />
                    </div>
                  ) : activities.length > 0 ? (
                    <div className="relative border-l border-gray-200 ml-2 pl-4 space-y-4">
                      {activities.map((act) => (
                        <div key={act.id} className="relative text-xs">
                          <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-big-red border-2 border-white" />
                          <h5 className="font-bold text-big-dark uppercase text-[10px] tracking-wider leading-none">
                            {act.activity_type.replace("_", " ")}
                          </h5>
                          {act.metadata && Object.keys(act.metadata).length > 0 && (
                            <p className="text-mid-gray text-[10px] mt-0.5">
                              {JSON.stringify(act.metadata)}
                            </p>
                          )}
                          <span className="text-[9px] text-gray-400 block mt-0.5">
                            {new Date(act.created_at).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-mid-gray italic text-center py-4">No audit timeline recorded.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
