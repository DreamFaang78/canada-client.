"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { createClient } from "@/lib/supabase/client";
import { Search, Plus, Filter, Mail, Phone, Calendar, User, Shield, Info, Loader2, X, CheckCircle2 } from "lucide-react";

interface Customer {
  id: string;
  lead_id: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  current_insurer: string | null;
  renewal_date: string | null;
  policy_types: string[];
  preferred_contact: string;
  tags: string[];
  is_active: boolean;
  created_at: string;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [filterPolicy, setFilterPolicy] = useState("");
  const [loading, setLoading] = useState(true);

  // Drawer
  const [selectedCust, setSelectedCust] = useState<Customer | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Form for adding a customer directly
  const [addOpen, setAddOpen] = useState(false);
  const [newCust, setNewCust] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "Mississauga",
    postalCode: "",
    currentInsurer: "",
    renewalDate: "",
    policyTypes: [] as string[],
    preferredContact: "email"
  });

  const supabase = createClient();

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      let query = supabase.from("customers").select("*").order("created_at", { ascending: false });

      if (search) {
        query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;

      let filtered = data || [];
      if (filterPolicy) {
        filtered = filtered.filter((c: Customer) => c.policy_types?.includes(filterPolicy));
      }

      setCustomers(filtered);
    } catch (err) {
      console.error("Failed to load customers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [search, filterPolicy]);

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("customers")
        .insert({
          full_name: newCust.fullName,
          email: newCust.email,
          phone: newCust.phone || null,
          address: newCust.address || null,
          city: newCust.city || null,
          postal_code: newCust.postalCode || null,
          current_insurer: newCust.currentInsurer || null,
          renewal_date: newCust.renewalDate || null,
          policy_types: newCust.policyTypes,
          preferred_contact: newCust.preferredContact,
          is_active: true
        })
        .select()
        .single();

      if (error) throw error;

      setCustomers((prev) => [data, ...prev]);
      setAddOpen(false);
      // Reset form
      setNewCust({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "Mississauga",
        postalCode: "",
        currentInsurer: "",
        renewalDate: "",
        policyTypes: [],
        preferredContact: "email"
      });
    } catch (err) {
      console.error("Failed to create customer:", err);
    }
  };

  const handleTogglePolicyType = (type: string) => {
    setNewCust((prev) => {
      const exists = prev.policyTypes.includes(type);
      return {
        ...prev,
        policyTypes: exists
          ? prev.policyTypes.filter((t) => t !== type)
          : [...prev.policyTypes, type]
      };
    });
  };

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-big-dark">Customers Directory</h1>
            <p className="text-sm text-mid-gray">Manage your issued policies and active book of business.</p>
          </div>
          <button
            onClick={() => setAddOpen(true)}
            className="px-4 py-2.5 bg-big-red hover:bg-deep-red text-white text-xs font-poppins font-bold rounded-xl shadow-sm flex items-center gap-1.5 active:scale-98 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Customer
          </button>
        </div>

        {/* Filter controls */}
        <div className="bg-white p-4 rounded-3xl border border-gray-150 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              placeholder="Search customers by name, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent transition-all"
            />
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-mid-gray">
              <Search className="w-4 h-4" />
            </span>
          </div>

          <select
            value={filterPolicy}
            onChange={(e) => setFilterPolicy(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent bg-white"
          >
            <option value="">All Policies</option>
            <option value="auto">Auto</option>
            <option value="home">Home</option>
            <option value="life">Life</option>
            <option value="business">Business</option>
          </select>
        </div>

        {/* Table list */}
        <div className="bg-white rounded-3xl border border-gray-150 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-big-red animate-spin mb-4" />
              <p className="text-xs text-mid-gray">Loading customers directory...</p>
            </div>
          ) : customers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-bold text-charcoal uppercase tracking-wider">
                    <th className="p-4 sm:p-5">Name</th>
                    <th className="p-4 sm:p-5">Policies</th>
                    <th className="p-4 sm:p-5">Insurer</th>
                    <th className="p-4 sm:p-5">Renewal Date</th>
                    <th className="p-4 sm:p-5">Preferred Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {customers.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() => {
                        setSelectedCust(c);
                        setDrawerOpen(true);
                      }}
                      className="hover:bg-gray-50/70 transition-colors cursor-pointer group"
                    >
                      <td className="p-4 sm:p-5 font-semibold text-big-dark group-hover:text-big-red transition-colors">
                        {c.full_name}
                      </td>
                      <td className="p-4 sm:p-5">
                        <div className="flex flex-wrap gap-1">
                          {c.policy_types?.map((t) => (
                            <span key={t} className="bg-gray-100 border text-charcoal text-[9px] font-bold px-2 py-0.5 rounded-full capitalize">
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 text-xs text-charcoal">
                        {c.current_insurer || "—"}
                      </td>
                      <td className="p-4 sm:p-5 text-xs text-mid-gray">
                        {c.renewal_date ? new Date(c.renewal_date).toLocaleDateString() : "—"}
                      </td>
                      <td className="p-4 sm:p-5 text-xs text-gray-400 capitalize">
                        {c.preferred_contact}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-20 text-mid-gray">
              No active customers recorded yet. Add your first customer!
            </div>
          )}
        </div>
      </div>

      {/* Customer Details Drawer */}
      {drawerOpen && selectedCust && (
        <div className="fixed inset-0 z-[999] overflow-hidden">
          <div className="absolute inset-0 bg-black/45 backdrop-blur-xs transition-opacity" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-lg bg-white shadow-2xl border-l border-gray-250 flex flex-col justify-between">
              <div className="h-16 px-6 border-b border-gray-200 flex items-center justify-between bg-gray-50 shrink-0">
                <div>
                  <h3 className="font-poppins font-bold text-base text-big-dark">Customer Profile</h3>
                  <span className="text-[10px] text-gray-400 block font-light">Active Book File</span>
                </div>
                <button onClick={() => setDrawerOpen(false)} className="w-8 h-8 rounded-lg hover:bg-gray-200 flex items-center justify-center text-charcoal">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-big-red/10 rounded-full flex items-center justify-center text-big-red border border-big-red/10">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="font-poppins font-bold text-lg text-big-dark leading-tight">{selectedCust.full_name}</h2>
                      <span className="text-xs text-mid-gray capitalize">Prefers {selectedCust.preferred_contact} contact</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs text-charcoal border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-mid-gray" />
                      <a href={`mailto:${selectedCust.email}`} className="text-big-red hover:underline font-medium">{selectedCust.email}</a>
                    </div>
                    {selectedCust.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-mid-gray" />
                        <a href={`tel:${selectedCust.phone}`} className="hover:underline font-medium">{selectedCust.phone}</a>
                      </div>
                    )}
                    {selectedCust.address && (
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-mid-gray mt-0.5" />
                        <span>
                          {selectedCust.address}, {selectedCust.city} {selectedCust.postal_code}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Policy Profile */}
                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <h4 className="font-poppins font-bold text-sm text-big-dark">Active Coverages</h4>
                  
                  <div className="grid grid-cols-2 gap-4 bg-light-gray p-4 rounded-2xl border border-gray-200 text-xs">
                    <div className="space-y-1">
                      <span className="text-gray-400 block font-bold text-[9px] uppercase tracking-wider">Current Insurer</span>
                      <span className="text-big-dark font-medium block">{selectedCust.current_insurer || "None"}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-gray-400 block font-bold text-[9px] uppercase tracking-wider">Annual Renewal</span>
                      <span className="text-big-dark font-medium block">
                        {selectedCust.renewal_date ? new Date(selectedCust.renewal_date).toLocaleDateString() : "—"}
                      </span>
                    </div>
                    <div className="col-span-2 space-y-1 pt-2 border-t border-gray-250">
                      <span className="text-gray-400 block font-bold text-[9px] uppercase tracking-wider">Policy Products</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedCust.policy_types?.map((t) => (
                          <span key={t} className="bg-white border text-big-dark text-[9px] font-bold px-2 py-0.5 rounded-full capitalize">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {addOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-xl w-full p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-poppins font-bold text-xl text-big-dark">Record New Active Policyholder</h3>
              <button onClick={() => setAddOpen(false)} className="w-8 h-8 rounded-lg hover:bg-gray-150 flex items-center justify-center text-charcoal">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCustomer} className="space-y-4 text-xs text-big-dark">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-charcoal uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newCust.fullName}
                    onChange={(e) => setNewCust((c) => ({ ...c, fullName: e.target.value }))}
                    placeholder="e.g. John Doe"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-big-red"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-charcoal uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newCust.email}
                    onChange={(e) => setNewCust((c) => ({ ...c, email: e.target.value }))}
                    placeholder="e.g. john@example.com"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-big-red"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-charcoal uppercase tracking-wider">Phone Number</label>
                  <input
                    type="tel"
                    value={newCust.phone}
                    onChange={(e) => setNewCust((c) => ({ ...c, phone: e.target.value }))}
                    placeholder="e.g. 647-555-0100"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-big-red"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-charcoal uppercase tracking-wider">Preferred Contact</label>
                  <select
                    value={newCust.preferredContact}
                    onChange={(e) => setNewCust((c) => ({ ...c, preferredContact: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-big-red bg-white"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone Call</option>
                    <option value="text">SMS Text</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-1.5">
                  <label className="font-bold text-charcoal uppercase tracking-wider">Street Address</label>
                  <input
                    type="text"
                    value={newCust.address}
                    onChange={(e) => setNewCust((c) => ({ ...c, address: e.target.value }))}
                    placeholder="e.g. 100 Main St"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-big-red"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-charcoal uppercase tracking-wider">Postal Code</label>
                  <input
                    type="text"
                    value={newCust.postalCode}
                    onChange={(e) => setNewCust((c) => ({ ...c, postalCode: e.target.value }))}
                    placeholder="e.g. L5R 3L1"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-big-red"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-charcoal uppercase tracking-wider">Current Insurer</label>
                  <input
                    type="text"
                    value={newCust.currentInsurer}
                    onChange={(e) => setNewCust((c) => ({ ...c, currentInsurer: e.target.value }))}
                    placeholder="e.g. Intact"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-big-red"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-charcoal uppercase tracking-wider">Renewal Date</label>
                  <input
                    type="date"
                    value={newCust.renewalDate}
                    onChange={(e) => setNewCust((c) => ({ ...c, renewalDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-big-red"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-charcoal uppercase tracking-wider block">Policy Types</label>
                <div className="flex gap-2">
                  {["auto", "home", "life", "business"].map((type) => {
                    const isChecked = newCust.policyTypes.includes(type);
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleTogglePolicyType(type)}
                        className={`px-3 py-2 border rounded-xl font-semibold capitalize transition-all ${
                          isChecked
                            ? "bg-big-red text-white border-big-red shadow-xs"
                            : "bg-white text-charcoal border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-big-red hover:bg-deep-red text-white text-xs font-poppins font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                Add Customer
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
