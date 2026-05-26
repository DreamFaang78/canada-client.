"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  IconPhone, IconMail, IconMapPin, IconClock, IconSend, IconCheck, IconInfo
} from "@/components/ui/BIGIcons";

export default function LocationContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
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
          {/* Left Column: Contact details & Map */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-big-red font-semibold text-sm uppercase tracking-widest mb-3">Get in Touch</p>
              <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-big-dark mb-4">
                Visit Sharan's Mississauga Office
              </h2>
              <p className="text-mid-gray leading-relaxed">
                Whether you prefer to discuss your needs over the phone, via email, or in person, Sharan is here to help you Think BIG.
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
                  <h4 className="font-poppins font-bold text-sm text-big-dark uppercase tracking-wider mb-1">Call Directly</h4>
                  <p className="text-charcoal font-semibold text-base group-hover:text-big-red transition-colors">647.501.8013</p>
                  <p className="text-xs text-mid-gray mt-0.5">Toll Free & SMS Support Available</p>
                </div>
              </a>

              <a
                href="mailto:sharan@thebig.ca"
                className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-big-red/20 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-big-red/10 flex items-center justify-center text-big-red shrink-0 group-hover:bg-big-red group-hover:text-white transition-all">
                  <IconMail size={20} variant="bare" className="text-big-red group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-sm text-big-dark uppercase tracking-wider mb-1">Email Sharan</h4>
                  <p className="text-charcoal font-semibold text-base group-hover:text-big-red transition-colors">sharan@thebig.ca</p>
                  <p className="text-xs text-mid-gray mt-0.5">General inquiries and doc submission</p>
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

          {/* Right Column: Contact Form & Maps */}
          <div className="lg:col-span-7 space-y-6">
            {/* Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100">
              <h3 className="font-poppins font-bold text-2xl text-big-dark mb-6">Send a Quick Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-charcoal uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-charcoal uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-xs font-bold text-charcoal uppercase tracking-wider">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 647-555-0100"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-charcoal uppercase tracking-wider">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe how Sharan can help you..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all resize-none"
                  />
                </div>

                {status === "success" && (
                  <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm">
                    <IconCheck size={20} variant="bare" className="text-green-700 shrink-0" />
                    <span>Your message has been sent successfully! Sharan will contact you shortly.</span>
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
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Google Map Embed */}
            <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-lg h-72 relative">
              <iframe
                title="Billyard Insurance Group Mississauga Office Location"
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
