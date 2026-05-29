"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Award, Users, CheckCircle } from "lucide-react";
import QuoteButton from "@/components/ui/QuoteButton";

const stats = [
  { label: "Years Experience", value: "8+" },
  { label: "Clients Protected", value: "500+" },
  { label: "Insurers Compared", value: "30+" },
  { label: "Client Satisfaction", value: "99%" }
];

const credentials = [
  "Registered Insurance Brokers of Ontario (RIBO) Licensed",
  "Life, Accident & Sickness Insurance licensed",
  "Commercial Lines Specialist designation",
  "Bachelor of Commerce (Finance) degree"
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      {/* Hero Header */}
      <div className="bg-big-dark text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-big-red/10 to-transparent z-0" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60 pointer-events-none z-0" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-big-red" />
              <span className="text-big-red font-semibold text-sm uppercase tracking-widest">Meet Your Broker</span>
            </div>
            <h1 className="font-poppins font-bold text-4xl sm:text-5xl mb-4">
              Sharan Kaur
            </h1>
            <p className="text-big-red/80 font-medium text-lg mb-4">RIBO Licensed Insurance Broker · Billyard Insurance Group · Mississauga, ON</p>
            <p className="text-gray-300 text-lg sm:text-xl font-light leading-relaxed">
              Dedicated to protecting your family, business, and assets with personalized service and expert guidance — not just a policy number.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image/Visual */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[3/4] w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl relative">
              <img
                src="/Website About Section.jpeg"
                alt="Sharan Kaur"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-white border border-gray-150 rounded-2xl p-6 shadow-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-big-red/10 flex items-center justify-center text-big-red shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-poppins font-bold text-lg text-big-dark">RIBO Licensed</h4>
                <p className="text-xs text-mid-gray">Professional Regulatory Compliance</p>
              </div>
            </div>
          </div>

          {/* Right Column: Bio */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="font-poppins font-bold text-3xl text-big-dark">
                The Person Behind Your Policy
              </h2>
              <p className="text-mid-gray leading-relaxed text-base">
                With over 8 years in the financial services sector, Sharan Kaur understands that insurance isn't just about premium costs — it's about reliable protection when life goes sideways. Born and raised in Ontario, she understands the local driving risks, housing market regulations, and business challenges specific to the Mississauga and Peel regions.
              </p>
              <p className="text-mid-gray leading-relaxed text-base">
                Working under the Billyard Insurance Group (BIG) banner, Sharan has the backing of one of Canada's fastest-growing brokerages. This gives her direct access to over 30 insurance carriers, ensuring she can secure the absolute best rate-to-coverage ratio for her clients.
              </p>
            </div>

            {/* Qualifications */}
            <div className="space-y-4">
              <h3 className="font-poppins font-bold text-xl text-big-dark">Qualifications & Designations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {credentials.map((cred, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="w-5 h-5 text-big-red shrink-0 mt-0.5" />
                    <span className="text-sm text-charcoal">{cred}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-gray-100">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <span className="block font-poppins font-bold text-3xl text-big-red">{stat.value}</span>
                  <span className="block text-xs font-semibold text-mid-gray uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <QuoteButton href="/get-a-quote" size="md">
                Get a Quote
              </QuoteButton>
              <a
                href="/contact"
                className="px-6 py-3 border border-gray-300 text-charcoal font-poppins font-semibold text-sm rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all text-center flex items-center justify-center"
              >
                Contact Sharan
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
