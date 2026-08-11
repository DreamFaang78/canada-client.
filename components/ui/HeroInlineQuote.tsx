"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Car, Heart, Briefcase, Plane, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import { trackConversion } from "@/lib/analytics";

const coverageTypes = [
  { id: "auto", label: "Auto", icon: Car, color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  { id: "home", label: "Home", icon: Home, color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  { id: "life", label: "Life", icon: Heart, color: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
  { id: "business", label: "Business", icon: Briefcase, color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  { id: "travel", label: "Travel", icon: Plane, color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
];

export default function HeroInlineQuote() {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedCoverage, setSelectedCoverage] = useState("auto");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSelectCoverage = (id: string) => {
    setSelectedCoverage(id);
    setStep(2);
    trackConversion("hero_step1_select", { coverage: id });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      setErrorMessage("Please enter your name, phone number, and email.");
      return;
    }
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: name.split(" ")[0] || name,
          lastName: name.split(" ").slice(1).join(" ") || "Client",
          email: email,
          phone: phone,
          serviceType: selectedCoverage,
          details: `Hero 2-step quote request for ${selectedCoverage} insurance`,
          source: "website_quote_form",
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
        trackConversion("hero_quote_submit", { coverage: selectedCoverage, name, phone });
      } else {
        setErrorMessage("Something went wrong. Please call (647) 501-8013.");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 sm:p-6 shadow-2xl text-white">
      {isSuccess ? (
        <div className="py-6 text-center space-y-3">
          <div className="w-14 h-14 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-poppins font-bold text-xl sm:text-2xl text-white">
            Quote Request Received!
          </h3>
          <p className="text-xs sm:text-sm text-white/80 max-w-xs mx-auto leading-relaxed">
            Thank you, {name.split(" ")[0]}! RIBO Broker Sharan Kaur will compare rates for your {selectedCoverage} policy and reach out shortly.
          </p>
          <button
            onClick={() => { setIsSuccess(false); setStep(1); setName(""); setPhone(""); setEmail(""); }}
            className="text-xs text-red-300 hover:text-white underline pt-2"
          >
            Start another quote
          </button>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-red-300 uppercase tracking-widest block">
                    Step 1 of 2
                  </span>
                  <h3 className="font-poppins font-bold text-lg sm:text-xl text-white">
                    What coverage do you need?
                  </h3>
                </div>
                <span className="text-xs text-white/60 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                  Tap to select
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2 pt-1">
                {coverageTypes.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectCoverage(item.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all hover:scale-105 active:scale-95 group ${item.color}`}
                    >
                      <Icon className="w-6 h-6 mb-1.5 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-semibold">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] text-white/60">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                  30+ Insurers Compared
                </span>
                <span>Fast 60s Form</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 text-xs text-white/70 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Change ({selectedCoverage})
                </button>
                <span className="text-[10px] font-bold text-red-300 uppercase tracking-widest">
                  Step 2 of 2
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name *"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number *"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address *"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs text-red-300 font-medium">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-big-red hover:bg-deep-red text-white font-poppins font-bold text-sm rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : `Get My Free ${selectedCoverage.toUpperCase()} Quote`}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
