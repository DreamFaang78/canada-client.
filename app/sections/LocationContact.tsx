"use client";

import { useState } from "react";
import {
  IconPhone, IconMail, IconMapPin, IconClock, IconSend, IconCheck, IconInfo
} from "@/components/ui/BIGIcons";
import { trackConversion } from "@/lib/analytics";

export default function LocationContact() {
  const [formMode, setFormMode] = useState<"message" | "callback">("message");
  
  // Message form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverageNeeded: "Auto Insurance",
    message: ""
  });

  // Callback form data
  const [callbackData, setCallbackData] = useState({
    name: "",
    phone: "",
    bestTime: "ASAP",
    coverageNeeded: "Auto Insurance"
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCallbackChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCallbackData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone) {
      setErrorMessage("Phone number is required for follow-up.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `[Coverage Needed: ${formData.coverageNeeded}]\n\n${formData.message}`
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      trackConversion("contact_form_submit", { coverage: formData.coverageNeeded });
      setFormData({ name: "", email: "", phone: "", coverageNeeded: "Auto Insurance", message: "" });
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "Failed to submit. Please try again.");
    }
  };

  const handleSubmitCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackData.phone) {
      setErrorMessage("Phone number is required for callback.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: callbackData.name || "Callback Client",
          email: "",
          phone: callbackData.phone,
          message: `[Quick Callback Request]\nBest Time to Call: ${callbackData.bestTime}\nCoverage Needed: ${callbackData.coverageNeeded}`
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      trackConversion("callback_request_submit", { time: callbackData.bestTime, coverage: callbackData.coverageNeeded });
      setCallbackData({ name: "", phone: "", bestTime: "ASAP", coverageNeeded: "Auto Insurance" });
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "Failed to submit. Please try again.");
    }
  };

  return (
    <section className="section-padding bg-light-gray relative overflow-hidden" id="contact">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-big-red font-semibold text-sm uppercase tracking-widest mb-3">Get in Touch</p>
              <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-big-dark mb-4">
                Visit Sharan&apos;s Mississauga Office
              </h2>
              <p className="text-mid-gray leading-relaxed">
                Whether you prefer to discuss your needs over the phone, via email, or in person, Sharan is here to help you find the right coverage.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              <a
                href="tel:+16475018013"
                className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-big-red/20 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-big-red/10 flex items-center justify-center text-big-red shrink-0 group-hover:bg-big-red group-hover:text-white transition-all">
                  <IconPhone size={20} variant="bare" className="text-big-red group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-sm text-big-dark uppercase tracking-wider mb-1">Direct Phone</h4>
                  <p className="text-charcoal font-semibold text-base group-hover:text-big-red transition-colors">(647) 501-8013</p>
                  <p className="text-xs text-mid-gray mt-0.5">Call or text for immediate assistance</p>
                </div>
              </a>

              <a
                href="mailto:sharan@sharanbroker.com"
                className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-big-red/20 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-big-red/10 flex items-center justify-center text-big-red shrink-0 group-hover:bg-big-red group-hover:text-white transition-all">
                  <IconMail size={20} variant="bare" className="text-big-red group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-sm text-big-dark uppercase tracking-wider mb-1">Email Sharan</h4>
                  <p className="text-charcoal font-semibold text-base group-hover:text-big-red transition-colors">sharan@sharanbroker.com</p>
                  <p className="text-xs text-mid-gray mt-0.5">Prompt response within 1 business hour</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-big-red/10 flex items-center justify-center text-big-red shrink-0">
                  <IconMapPin size={20} variant="bare" className="text-big-red" />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-sm text-big-dark uppercase tracking-wider mb-1">Office Location</h4>
                  <p className="text-charcoal text-sm leading-relaxed">
                    105D-135 Matheson Blvd West,
                    <br />
                    Mississauga, ON L5R 3L1
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-big-red/10 flex items-center justify-center text-big-red shrink-0">
                  <IconClock size={20} variant="bare" className="text-big-red" />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-sm text-big-dark uppercase tracking-wider mb-1">Business Hours</h4>
                  <div className="text-charcoal text-xs space-y-1 mt-1 leading-relaxed">
                    <p><strong className="text-big-dark">Mon – Fri:</strong> 9:00 AM – 6:00 PM</p>
                    <p><strong className="text-big-dark">Saturday:</strong> 10:00 AM – 3:00 PM</p>
                    <p><strong className="text-big-dark">Sunday:</strong> By appointment only</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form / Callback Option */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100">
              
              {/* Form Mode Selector Tabs */}
              <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-6">
                <button
                  type="button"
                  onClick={() => { setFormMode("message"); setStatus("idle"); setErrorMessage(""); }}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    formMode === "message" ? "bg-white text-big-dark shadow-sm" : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  Send Full Message
                </button>
                <button
                  type="button"
                  onClick={() => { setFormMode("callback"); setStatus("idle"); setErrorMessage(""); }}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    formMode === "callback" ? "bg-white text-big-dark shadow-sm" : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  ⚡ Request a Quick Callback
                </button>
              </div>

              {formMode === "message" ? (
                <form onSubmit={handleSubmitMessage} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-bold text-charcoal uppercase tracking-wider">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleMessageChange}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-charcoal uppercase tracking-wider">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleMessageChange}
                        placeholder="e.g. john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs font-bold text-charcoal uppercase tracking-wider">Phone Number (Required) *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleMessageChange}
                        placeholder="(647) 501-8013"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="coverageNeeded" className="text-xs font-bold text-charcoal uppercase tracking-wider">What do you need covered? *</label>
                      <select
                        id="coverageNeeded"
                        name="coverageNeeded"
                        value={formData.coverageNeeded}
                        onChange={handleMessageChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark bg-white transition-all"
                      >
                        <option value="Auto Insurance">Auto Insurance</option>
                        <option value="Home Insurance">Home & Property Insurance</option>
                        <option value="Life Insurance">Life Insurance</option>
                        <option value="Business Insurance">Business / Commercial Insurance</option>
                        <option value="Travel Insurance">Travel Insurance</option>
                        <option value="Multiple Coverages">Multiple Coverages</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-charcoal uppercase tracking-wider">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={3}
                      value={formData.message}
                      onChange={handleMessageChange}
                      placeholder="Describe your current situation or policy details..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all resize-none"
                    />
                  </div>

                  {status === "success" && (
                    <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm">
                      <IconCheck size={20} variant="bare" className="text-green-700 shrink-0" />
                      <span>Message received! Sharan will review your details and contact you shortly.</span>
                    </div>
                  )}

                  {status === "error" && (
                    <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                      <IconInfo size={20} variant="bare" className="text-red-700 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-3.5 bg-big-red hover:bg-deep-red disabled:bg-big-red/50 text-white font-poppins font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <IconSend size={16} className="text-white" />
                        Send Pre-Qualified Inquiry
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Low-Friction Callback Form */
                <form onSubmit={handleSubmitCallback} className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="font-poppins font-bold text-lg text-big-dark">
                      Request a Phone Call Back
                    </h4>
                    <p className="text-xs text-mid-gray">
                      Skip typing a full message! Enter your phone number and preferred call time, and Sharan will reach out directly.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="callbackPhone" className="text-xs font-bold text-charcoal uppercase tracking-wider block mb-1">
                      Phone Number (Required) *
                    </label>
                    <input
                      type="tel"
                      id="callbackPhone"
                      name="phone"
                      required
                      value={callbackData.phone}
                      onChange={handleCallbackChange}
                      placeholder="(647) 501-8013"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="bestTime" className="text-xs font-bold text-charcoal uppercase tracking-wider block mb-1">
                        Best Time to Call
                      </label>
                      <select
                        id="bestTime"
                        name="bestTime"
                        value={callbackData.bestTime}
                        onChange={handleCallbackChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark bg-white transition-all"
                      >
                        <option value="ASAP">ASAP (As Soon As Possible)</option>
                        <option value="Morning (9am - 12pm)">Morning (9am - 12pm)</option>
                        <option value="Afternoon (12pm - 5pm)">Afternoon (12pm - 5pm)</option>
                        <option value="Evening (5pm - 8pm)">Evening (5pm - 8pm)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="callbackCoverage" className="text-xs font-bold text-charcoal uppercase tracking-wider block mb-1">
                        Coverage Needed
                      </label>
                      <select
                        id="callbackCoverage"
                        name="coverageNeeded"
                        value={callbackData.coverageNeeded}
                        onChange={handleCallbackChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark bg-white transition-all"
                      >
                        <option value="Auto Insurance">Auto Insurance</option>
                        <option value="Home Insurance">Home Insurance</option>
                        <option value="Life Insurance">Life Insurance</option>
                        <option value="Business Insurance">Business Insurance</option>
                        <option value="Travel Insurance">Travel Insurance</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="callbackName" className="text-xs font-bold text-charcoal uppercase tracking-wider block mb-1">
                      Your Name (Optional)
                    </label>
                    <input
                      type="text"
                      id="callbackName"
                      name="name"
                      value={callbackData.name}
                      onChange={handleCallbackChange}
                      placeholder="e.g. Navdeep"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all"
                    />
                  </div>

                  {status === "success" && (
                    <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm">
                      <IconCheck size={20} variant="bare" className="text-green-700 shrink-0" />
                      <span>Callback request received! Sharan will call you during your selected time window.</span>
                    </div>
                  )}

                  {status === "error" && (
                    <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                      <IconInfo size={20} variant="bare" className="text-red-700 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-3.5 bg-big-dark hover:bg-black disabled:bg-gray-400 text-white font-poppins font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <IconPhone size={16} className="text-red-400" />
                        Request Callback Now
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Google Map Embed */}
            <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-lg h-72 relative">
              <iframe
                title="Sharan Kaur Insurance Mississauga Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.6651268686153!2d-79.69176392382484!3d43.61350487110462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b405555555555%3A0xe5a3c94dcd5df79b!2s135%20Matheson%20Blvd%20W%2C%20Mississauga%2C%20ON%20L5R%203L1!5e0!3m2!1sen!2sca!4v1717200000000!5m2!1sen!2sca"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
