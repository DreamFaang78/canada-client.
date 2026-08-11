"use client";

import { useState } from "react";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { trackConversion } from "@/lib/analytics";

interface LocalQuoteFormProps {
  cityName: string;
}

export default function LocalQuoteForm({ cityName }: LocalQuoteFormProps) {
  const [serviceType, setServiceType] = useState("auto");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      setErrorMsg("Please complete all required fields.");
      return;
    }
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: name.split(" ")[0] || name,
          lastName: name.split(" ").slice(1).join(" ") || "Local Client",
          email: email,
          phone: phone,
          serviceType: serviceType,
          details: `Local page quote request for ${cityName}`,
          source: "website_quote_form",
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
        trackConversion("local_quote_submit", { cityName, serviceType });
      } else {
        setErrorMsg("Something went wrong. Please call (647) 501-8013.");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-150 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-big-red/5 rounded-bl-full pointer-events-none" />

      {isSuccess ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="font-poppins font-bold text-2xl text-big-dark">
            Quote Request Received!
          </h3>
          <p className="text-sm text-mid-gray max-w-sm mx-auto leading-relaxed">
            Thank you! Sharan Kaur will compare rates for {cityName} and reach out to you shortly.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <span className="text-xs font-bold text-big-red uppercase tracking-wider block mb-1">
              Instant Local Rates
            </span>
            <h3 className="font-poppins font-bold text-2xl text-big-dark">
              Get Your {cityName} Insurance Quote
            </h3>
            <p className="text-xs text-mid-gray mt-1">
              Compare 30+ top Ontario insurers in under 60 seconds with RIBO Broker Sharan Kaur.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Coverage Needed *</label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-big-red/20 focus:border-big-red"
              >
                <option value="auto">Auto Insurance</option>
                <option value="home">Home & Property Insurance</option>
                <option value="life">Life Insurance</option>
                <option value="business">Commercial / Business Insurance</option>
                <option value="travel">Travel Insurance</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-big-red/20 focus:border-big-red"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(647) 000-0000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-big-red/20 focus:border-big-red"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-big-red/20 focus:border-big-red"
              />
            </div>

            {errorMsg && <p className="text-xs text-red-600 font-medium">{errorMsg}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 bg-big-red hover:bg-deep-red text-white font-poppins font-bold text-sm rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isSubmitting ? "Calculating..." : `Get My ${cityName} Quote`}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
              100% Free · No Obligation · Licensed RIBO Advice
            </div>
          </form>
        </>
      )}
    </div>
  );
}
