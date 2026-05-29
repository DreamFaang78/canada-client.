"use client";

import { motion } from "framer-motion";
import { Cookie, ShieldAlert, CheckCircle, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function CookiePolicyPage() {
  const [resetState, setResetState] = useState<"idle" | "done">("idle");

  const handleResetConsent = () => {
    localStorage.removeItem("cookie_consent");
    setResetState("done");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-light-gray">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 bg-white rounded-3xl border border-gray-150 shadow-sm mt-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-big-red/10 text-big-red rounded-xl flex items-center justify-center">
            <Cookie className="w-6 h-6" />
          </div>
          <h1 className="font-poppins font-bold text-3xl sm:text-4xl text-big-dark">
            Cookie Policy
          </h1>
        </div>
        <p className="text-xs text-mid-gray mb-8">Last Updated: May 26, 2026</p>

        <div className="space-y-6 text-charcoal text-sm leading-relaxed font-light">
          <p>
            This Cookie Policy explains how Sharan Kaur (Billyard Insurance Group) uses cookies and similar tracking technologies on our website. It explains what these technologies are, why we use them, and your rights to control their use.
          </p>

          <h2 className="font-poppins font-bold text-xl text-big-dark pt-4">1. What Are Cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>

          <h2 className="font-poppins font-bold text-xl text-big-dark pt-4">2. Types of Cookies We Use</h2>
          <div className="space-y-4">
            <div className="p-4 bg-light-gray rounded-2xl border border-gray-150">
              <h3 className="font-poppins font-bold text-base text-big-dark mb-1">Essential / Functional Cookies</h3>
              <p className="text-xs text-mid-gray">
                These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as security checks, secure forms, and layout rendering. You cannot disable these as they are required for core operations.
              </p>
            </div>

            <div className="p-4 bg-light-gray rounded-2xl border border-gray-150">
              <h3 className="font-poppins font-bold text-base text-big-dark mb-1">Analytics / Performance Cookies</h3>
              <p className="text-xs text-mid-gray">
                These cookies collect information that is used in aggregate form to help us understand how our website is being used (e.g. which pages are popular, how users navigate). We use Google Analytics (GA4) to compile these insights.
              </p>
            </div>

            <div className="p-4 bg-light-gray rounded-2xl border border-gray-150">
              <h3 className="font-poppins font-bold text-base text-big-dark mb-1">Marketing / Advertising Cookies</h3>
              <p className="text-xs text-mid-gray">
                These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.
              </p>
            </div>
          </div>

          <h2 className="font-poppins font-bold text-xl text-big-dark pt-4">3. How Can I Control Cookies?</h2>
          <p>
            You have the right to decide whether to accept or reject non-essential cookies. You can manage your preferences using our interactive Cookie Banner that appears on your first visit, or you can clear your settings at any time to reopen the preferences menu.
          </p>

          {/* Manage preferences control */}
          <div className="p-6 bg-red-50/20 border border-big-red/10 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-poppins font-bold text-base text-big-dark">Reset Cookie Preferences</h4>
              <p className="text-xs text-mid-gray">
                Click the button to clear your stored consent state and reload the site to choose again.
              </p>
            </div>
            <button
              onClick={handleResetConsent}
              className="px-5 py-2.5 bg-big-red hover:bg-deep-red text-white text-xs font-poppins font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-sm active:scale-98"
            >
              {resetState === "done" ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Resetting...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Reset Preferences
                </>
              )}
            </button>
          </div>

          <h2 className="font-poppins font-bold text-xl text-big-dark pt-4">4. Policy Updates</h2>
          <p>
            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
          </p>
        </div>
      </div>
    </div>
  );
}
