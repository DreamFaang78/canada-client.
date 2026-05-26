"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ArrowRight, ArrowLeft, CheckCircle, Home, Car, Heart, Briefcase, Info } from "lucide-react";
import Link from "next/link";

type ServiceType = "home" | "auto" | "life" | "business";

export default function GetAQuotePage() {
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState<ServiceType | null>(null);

  // Common fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  // Auto specific fields
  const [autoVehicle, setAutoVehicle] = useState("");
  const [autoDrivers, setAutoDrivers] = useState("1");
  const [autoHistory, setAutoHistory] = useState("clean");

  // Home specific fields
  const [homeType, setHomeType] = useState("detached");
  const [homeStatus, setHomeStatus] = useState("owner");
  const [homeAddress, setHomeAddress] = useState("");

  // Life specific fields
  const [lifeCoverage, setLifeCoverage] = useState("500k");
  const [lifeTerm, setLifeTerm] = useState("20");
  const [lifeTobacco, setLifeTobacco] = useState("no");

  // Business specific fields
  const [businessType, setBusinessType] = useState("");
  const [businessRevenue, setBusinessRevenue] = useState("under_100k");
  const [businessEmployees, setBusinessEmployees] = useState("1-5");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && !serviceType) {
      setError("Please select an insurance type to proceed.");
      return;
    }
    setError("");
    setStep(step + 1);
  };

  const handleBack = () => {
    setError("");
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Package the specific details based on serviceType
    let detailsObj: Record<string, string> = {};
    if (serviceType === "auto") {
      detailsObj = { autoVehicle, autoDrivers, autoHistory };
    } else if (serviceType === "home") {
      detailsObj = { homeType, homeStatus, homeAddress };
    } else if (serviceType === "life") {
      detailsObj = { lifeCoverage, lifeTerm, lifeTobacco };
    } else if (serviceType === "business") {
      detailsObj = { businessType, businessRevenue, businessEmployees };
    }

    const payload = {
      firstName,
      lastName,
      email,
      phone,
      serviceType,
      details: JSON.stringify({ ...detailsObj, notes }),
      source: "website_quote_form"
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit quote request.");
      }

      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const serviceOptions = [
    { type: "auto" as ServiceType, label: "Auto Insurance", desc: "Compare Ontario's best car rates", icon: Car },
    { type: "home" as ServiceType, label: "Home Insurance", desc: "For homeowners, condos & tenants", icon: Home },
    { type: "life" as ServiceType, label: "Life Insurance", desc: "Term, whole life & critical illness", icon: Heart },
    { type: "business" as ServiceType, label: "Business Insurance", desc: "Liability, property & commercial auto", icon: Briefcase }
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-light-gray flex items-center justify-center">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-150 p-6 sm:p-10 relative overflow-hidden">
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-100">
            <div
              className="h-full bg-big-red transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 space-y-6"
            >
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto border border-green-200">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h2 className="font-poppins font-bold text-2xl text-big-dark">Quote Request Submitted!</h2>
                <p className="text-mid-gray max-w-md mx-auto text-sm leading-relaxed font-light">
                  Thank you, {firstName}. Sharan is already shopping your profile across 30+ insurance carriers. We'll be in touch within 15–30 minutes during business hours.
                </p>
              </div>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/"
                  className="px-6 py-3 bg-big-red hover:bg-deep-red text-white font-poppins font-semibold text-sm rounded-xl transition-all shadow-sm"
                >
                  Return Home
                </Link>
                <a
                  href="tel:+16475018013"
                  className="px-6 py-3 border border-gray-250 text-charcoal font-poppins font-semibold text-sm rounded-xl hover:bg-gray-50 transition-all"
                >
                  Call Directly
                </a>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {/* Step Title */}
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold text-big-red uppercase tracking-wider block mb-1">
                    Step {step} of 3
                  </span>
                  <h1 className="font-poppins font-bold text-xl sm:text-2xl text-big-dark">
                    {step === 1 && "What needs protecting?"}
                    {step === 2 && `Tell us about your ${serviceType} needs`}
                    {step === 3 && "Where should we send your quote?"}
                  </h1>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-mid-gray bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                  <ShieldCheck className="w-4 h-4 text-big-red" />
                  <span>Secure RIBO Broker Submission</span>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-start gap-2">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* STEP 1: Select Service Type */}
              {step === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {serviceOptions.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = serviceType === opt.type;
                    return (
                      <button
                        key={opt.type}
                        onClick={() => {
                          setServiceType(opt.type);
                          setError("");
                        }}
                        className={`p-6 rounded-2xl border text-left flex items-start gap-4 transition-all hover:shadow-md ${
                          isSelected
                            ? "border-big-red bg-red-50/20 shadow-sm"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? "bg-big-red text-white" : "bg-light-gray text-charcoal"
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-poppins font-bold text-base text-big-dark">{opt.label}</h4>
                          <p className="text-xs text-mid-gray font-light leading-relaxed">{opt.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* STEP 2: Service Details */}
              {step === 2 && (
                <div className="space-y-4">
                  {serviceType === "auto" && (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Vehicle Year, Make, & Model</label>
                        <input
                          type="text"
                          required
                          value={autoVehicle}
                          onChange={(e) => setAutoVehicle(e.target.value)}
                          placeholder="e.g. 2022 Honda Civic"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Number of Drivers</label>
                          <select
                            value={autoDrivers}
                            onChange={(e) => setAutoDrivers(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all"
                          >
                            <option value="1">1 Driver</option>
                            <option value="2">2 Drivers</option>
                            <option value="3+">3+ Drivers</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Clean Driving Record?</label>
                          <select
                            value={autoHistory}
                            onChange={(e) => setAutoHistory(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all"
                          >
                            <option value="clean">Yes — No tickets or accidents in past 3 years</option>
                            <option value="minor">Minor — 1-2 tickets, no accidents</option>
                            <option value="major">Major — Tickets & accidents on record</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {serviceType === "home" && (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Property Street Address</label>
                        <input
                          type="text"
                          required
                          value={homeAddress}
                          onChange={(e) => setHomeAddress(e.target.value)}
                          placeholder="e.g. 123 Main St, Mississauga, ON"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Property Type</label>
                          <select
                            value={homeType}
                            onChange={(e) => setHomeType(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all"
                          >
                            <option value="detached">Detached House</option>
                            <option value="semi">Semi-Detached / Townhouse</option>
                            <option value="condo">Condo Apartment</option>
                            <option value="tenant">Rental Tenant</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Occupancy Status</label>
                          <select
                            value={homeStatus}
                            onChange={(e) => setHomeStatus(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all"
                          >
                            <option value="owner">Owner Occupied</option>
                            <option value="rented">Rented to Tenants</option>
                            <option value="seasonal">Seasonal / Vacation Home</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {serviceType === "life" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Desired Coverage Amount</label>
                          <select
                            value={lifeCoverage}
                            onChange={(e) => setLifeCoverage(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all"
                          >
                            <option value="250k">$250,000</option>
                            <option value="500k">$500,000</option>
                            <option value="1m">$1,000,000</option>
                            <option value="2m+">$2,000,000+</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Policy Duration</label>
                          <select
                            value={lifeTerm}
                            onChange={(e) => setLifeTerm(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all"
                          >
                            <option value="10">10-Year Term</option>
                            <option value="20">20-Year Term</option>
                            <option value="30">30-Year Term</option>
                            <option value="whole">Whole Life (Permanent)</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-charcoal uppercase tracking-wider font-semibold">Tobacco or Nicotine Use?</label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer text-sm text-charcoal select-none">
                            <input
                              type="radio"
                              name="tobacco"
                              value="no"
                              checked={lifeTobacco === "no"}
                              onChange={() => setLifeTobacco("no")}
                              className="text-big-red focus:ring-big-red"
                            />
                            No — Non-smoker
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer text-sm text-charcoal select-none">
                            <input
                              type="radio"
                              name="tobacco"
                              value="yes"
                              checked={lifeTobacco === "yes"}
                              onChange={() => setLifeTobacco("yes")}
                              className="text-big-red focus:ring-big-red"
                            />
                            Yes — Smoker / Vape user
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {serviceType === "business" && (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Industry & Business Type</label>
                        <input
                          type="text"
                          required
                          value={businessType}
                          onChange={(e) => setBusinessType(e.target.value)}
                          placeholder="e.g. Retail Store, Contractor, Tech Consulting"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Estimated Annual Revenue</label>
                          <select
                            value={businessRevenue}
                            onChange={(e) => setBusinessRevenue(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all"
                          >
                            <option value="under_100k">Under $100,000</option>
                            <option value="100k_500k">$100,000 - $500,000</option>
                            <option value="500k_2m">$500,000 - $2,000,000</option>
                            <option value="over_2m">Over $2,000,000</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Number of Employees</label>
                          <select
                            value={businessEmployees}
                            onChange={(e) => setBusinessEmployees(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all"
                          >
                            <option value="1-5">1-5 Employees</option>
                            <option value="6-20">6-20 Employees</option>
                            <option value="21-50">21-50 Employees</option>
                            <option value="50+">50+ Employees</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Additional details or coverage goals (Optional)</label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="List any details, drivers, renewals dates, or current rates that help Sharan negotiate on your behalf..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all resize-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Contact Info */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="first_name" className="text-xs font-bold text-charcoal uppercase tracking-wider">First Name</label>
                      <input
                        type="text"
                        id="first_name"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="e.g. John"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="last_name" className="text-xs font-bold text-charcoal uppercase tracking-wider">Last Name</label>
                      <input
                        type="text"
                        id="last_name"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="e.g. Doe"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-charcoal uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs font-bold text-charcoal uppercase tracking-wider">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 647-555-0100"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-100 mt-6">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-3 border border-gray-350 text-charcoal font-poppins font-semibold text-sm rounded-xl hover:bg-gray-50 transition-all flex items-center gap-1.5 active:scale-98"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 bg-big-red hover:bg-deep-red text-white font-poppins font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center gap-1.5 active:scale-98"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || !firstName || !lastName || !email || !phone}
                    className="px-8 py-3.5 bg-big-red hover:bg-deep-red disabled:bg-big-red/50 text-white font-poppins font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Get My Free Quote
                        <CheckCircle className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
