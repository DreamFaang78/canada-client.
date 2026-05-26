"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Settings, CheckCircle } from "lucide-react";

interface ConsentState {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const DEFAULT_CONSENT: ConsentState = {
  analytics: false,
  marketing: false,
  functional: true,
};

function loadGA4(measurementId: string) {
  if (document.getElementById("ga4-script")) return;
  const script = document.createElement("script");
  script.id = "ga4-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
  const inline = document.createElement("script");
  inline.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}');
  `;
  document.head.appendChild(inline);
}

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [consent, setConsent] = useState<ConsentState>(DEFAULT_CONSENT);

  useEffect(() => {
    const stored = localStorage.getItem("cookie_consent");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.analytics && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
          loadGA4(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
        }
      } catch {}
      return;
    }
    // Show banner after a brief delay
    const timer = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const saveConsent = async (state: ConsentState) => {
    localStorage.setItem(
      "cookie_consent",
      JSON.stringify({ ...state, timestamp: Date.now() })
    );
    setShow(false);
    setShowPreferences(false);

    if (state.analytics && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      loadGA4(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
    }

    const sessionId = localStorage.getItem("session_id") || crypto.randomUUID();
    localStorage.setItem("session_id", sessionId);

    try {
      await fetch("/api/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...state, sessionId }),
      });
    } catch {}
  };

  const acceptAll = () =>
    saveConsent({ analytics: true, marketing: true, functional: true });

  const rejectNonEssential = () =>
    saveConsent({ analytics: false, marketing: false, functional: true });

  const saveCustom = () => saveConsent(consent);

  if (!show && !showPreferences) return null;

  return (
    <>
      <AnimatePresence>
        {show && !showPreferences && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[9998]"
            role="dialog"
            aria-label="Cookie consent"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-big-red/10 flex items-center justify-center shrink-0">
                  <Cookie className="w-5 h-5 text-big-red" />
                </div>
                <div>
                  <h2 className="font-poppins font-semibold text-big-dark text-sm">
                    We value your privacy
                  </h2>
                  <p className="text-xs text-mid-gray mt-1 leading-relaxed">
                    We use cookies to improve your experience and analyse
                    traffic. You can manage your preferences at any time.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={acceptAll}
                  className="w-full bg-big-red hover:bg-deep-red text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
                  id="cookie-accept-all"
                >
                  Accept All
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={rejectNonEssential}
                    className="flex-1 border border-gray-300 text-sm text-charcoal py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                    id="cookie-reject"
                  >
                    Reject Non-Essential
                  </button>
                  <button
                    onClick={() => setShowPreferences(true)}
                    className="flex-1 border border-gray-300 text-sm text-charcoal py-2.5 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
                    id="cookie-manage"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    Manage
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal */}
      <AnimatePresence>
        {showPreferences && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-poppins font-bold text-big-dark">
                  Cookie Preferences
                </h2>
                <button
                  onClick={() => {
                    setShowPreferences(false);
                    setShow(true);
                  }}
                  className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-mid-gray" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {[
                  {
                    key: "functional" as const,
                    label: "Functional (Required)",
                    description:
                      "Essential for the website to function properly.",
                    locked: true,
                  },
                  {
                    key: "analytics" as const,
                    label: "Analytics",
                    description:
                      "Help us understand how visitors use the site (Google Analytics).",
                    locked: false,
                  },
                  {
                    key: "marketing" as const,
                    label: "Marketing",
                    description:
                      "Allow us to deliver more relevant advertisements.",
                    locked: false,
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-charcoal">
                        {item.label}
                      </p>
                      <p className="text-xs text-mid-gray mt-0.5">
                        {item.description}
                      </p>
                    </div>
                    {item.locked ? (
                      <div className="w-10 h-6 bg-big-red rounded-full flex items-center justify-end pr-1 shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <button
                        role="switch"
                        aria-checked={consent[item.key]}
                        onClick={() =>
                          setConsent((c) => ({ ...c, [item.key]: !c[item.key] }))
                        }
                        className={`w-10 h-6 rounded-full transition-colors shrink-0 relative ${
                          consent[item.key] ? "bg-big-red" : "bg-gray-200"
                        }`}
                        id={`cookie-toggle-${item.key}`}
                      >
                        <span
                          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                            consent[item.key] ? "translate-x-4" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={rejectNonEssential}
                  className="flex-1 border border-gray-300 text-sm text-charcoal py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={saveCustom}
                  className="flex-1 bg-big-red text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-deep-red transition-colors"
                  id="cookie-save-prefs"
                >
                  Save Preferences
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
