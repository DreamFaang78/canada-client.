"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Download, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { trackConversion } from "@/lib/analytics";

export default function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"quote" | "guide">("quote");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSubmittingSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Check if already shown in this session
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("exit_intent_modal_dismissed")) return;

    let hasFired = false;

    const triggerShow = () => {
      if (hasFired) return;
      hasFired = true;
      sessionStorage.setItem("exit_intent_modal_dismissed", "true");
      setIsOpen(true);
      trackConversion("exit_intent_shown", { trigger: "scroll_or_mouseleave" });
    };

    // Desktop exit intent
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && window.innerWidth >= 768) {
        triggerShow();
      }
    };

    // Mobile 70% scroll trigger
    const handleScroll = () => {
      if (window.innerWidth < 768) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0 && window.scrollY / totalHeight >= 0.7) {
          triggerShow();
        }
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      setErrorMessage("Please enter both your name and phone number.");
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
          email: "exitpopup@sharanbroker.com",
          phone: phone,
          serviceType: "auto",
          details: "Exit-intent 60-second quote request",
          source: "website_quote_form",
        }),
      });

      if (res.ok) {
        setIsSubmittingSuccess(true);
        trackConversion("exit_intent_quote_submit", { name, phone });
      } else {
        setErrorMessage("Something went wrong. Please try calling (647) 501-8013.");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitGuide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Guide Subscriber",
          email: email,
          message: "Downloaded Free Guide: 5 Ways to Cut Your Ontario Auto Insurance Bill",
        }),
      });

      if (res.ok) {
        setIsSubmittingSuccess(true);
        trackConversion("lead_magnet_download", { email });
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 p-6 sm:p-8"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-big-red text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Special No-Obligation Offer
            </div>

            {isSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-poppins font-bold text-2xl text-big-dark">
                  {activeTab === "quote" ? "Request Received!" : "Guide On Its Way!"}
                </h3>
                <p className="text-sm text-mid-gray max-w-sm mx-auto leading-relaxed">
                  {activeTab === "quote"
                    ? "Sharan Kaur will review your details and call or text you shortly with custom savings."
                    : "Check your inbox in 2 minutes for your free PDF guide: '5 Ways to Cut Your Ontario Auto Insurance Bill'."}
                </p>
                <button
                  onClick={handleClose}
                  className="mt-4 px-6 py-3 bg-big-red text-white font-semibold rounded-xl hover:bg-deep-red transition-all"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                {/* Tab selector */}
                <div className="flex bg-gray-100 p-1 rounded-2xl mb-6 text-xs font-semibold">
                  <button
                    onClick={() => { setActiveTab("quote"); setErrorMessage(""); }}
                    className={`flex-1 py-2.5 rounded-xl transition-all ${
                      activeTab === "quote" ? "bg-white text-big-dark shadow-sm" : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    Quick Quote (60s)
                  </button>
                  <button
                    onClick={() => { setActiveTab("guide"); setErrorMessage(""); }}
                    className={`flex-1 py-2.5 rounded-xl transition-all ${
                      activeTab === "guide" ? "bg-white text-big-dark shadow-sm" : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    Free Savings Guide PDF
                  </button>
                </div>

                {activeTab === "quote" ? (
                  <div>
                    <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-big-dark leading-tight mb-2">
                      Wait — Get Your Free Quote in 60 Seconds.
                    </h2>
                    <p className="text-xs sm:text-sm text-mid-gray mb-6">
                      No spam, no hassle. RIBO-licensed broker Sharan Kaur will match you with Ontario&apos;s lowest rates across 30+ insurers.
                    </p>

                    <form onSubmit={handleSubmitQuote} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-charcoal mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Navdeep Singh"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-big-red/20 focus:border-big-red"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-charcoal mb-1">Phone Number (Call or Text) *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(647) 000-0000"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-big-red/20 focus:border-big-red"
                        />
                      </div>

                      {errorMessage && (
                        <p className="text-xs text-red-600 font-medium">{errorMessage}</p>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 bg-big-red hover:bg-deep-red text-white font-poppins font-bold text-base rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group disabled:opacity-50"
                      >
                        {isSubmitting ? "Submitting..." : "Get My Quote"}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 pt-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                        100% Confidential · Zero Obligation · RIBO Compliant
                      </div>
                    </form>
                  </div>
                ) : (
                  <div>
                    <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-big-dark leading-tight mb-2">
                      Get Our Free Guide: 5 Ways to Cut Your Ontario Auto Insurance Bill
                    </h2>
                    <p className="text-xs sm:text-sm text-mid-gray mb-6">
                      Discover the exact discounts, policy tweaks, and rate hacks Ontario drivers use to save up to $600/year.
                    </p>

                    <form onSubmit={handleSubmitGuide} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-charcoal mb-1">Your Email Address *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-big-red/20 focus:border-big-red"
                        />
                      </div>

                      {errorMessage && (
                        <p className="text-xs text-red-600 font-medium">{errorMessage}</p>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 bg-big-dark hover:bg-black text-white font-poppins font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <Download className="w-4 h-4 text-red-400" />
                        {isSubmitting ? "Sending..." : "Download Free Guide PDF"}
                      </button>

                      <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 pt-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                        Instant Download · No Spam Ever
                      </div>
                    </form>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
