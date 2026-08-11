"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { trackConversion } from "@/lib/analytics";

export default function WhatsAppBubble() {
  const [isOpen, setIsOpen] = useState(false);

  const phone = "16475018013";
  const categories = [
    { label: "Home Insurance", text: "Hi Sharan, I'd like a quote for Home Insurance" },
    { label: "Auto Insurance", text: "Hi Sharan, I'd like a quote for Auto Insurance" },
    { label: "Life Insurance", text: "Hi Sharan, I'd like a quote for Life Insurance" },
    { label: "Business Insurance", text: "Hi Sharan, I'd like a quote for Business Insurance" },
    { label: "General Inquiry", text: "Hi Sharan, I'd like a quote for insurance" },
  ];

  const handleOpenWhatsApp = (customText?: string) => {
    const defaultText = customText || "Hi Sharan, I'd like a quote for insurance";
    const encoded = encodeURIComponent(defaultText);
    const url = `https://wa.me/${phone}?text=${encoded}`;
    trackConversion("whatsapp_click", { message: defaultText });
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
      {/* Quick Select Popup */}
      {isOpen && (
        <div className="mb-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
            <span className="font-poppins font-bold text-xs text-big-dark flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
              Chat on WhatsApp
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[11px] text-mid-gray mb-3">Select coverage to pre-fill your message:</p>
          <div className="space-y-1.5">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => handleOpenWhatsApp(cat.text)}
                className="w-full text-left px-3 py-2 rounded-xl text-xs text-charcoal hover:bg-green-50 hover:text-green-700 font-medium transition-colors flex items-center justify-between group"
              >
                {cat.label}
                <span className="text-green-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main WhatsApp Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with Sharan on WhatsApp"
        className="flex items-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-poppins font-semibold text-xs rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all group"
      >
        <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
        <span className="hidden sm:inline">Chat with Sharan</span>
      </button>
    </div>
  );
}
