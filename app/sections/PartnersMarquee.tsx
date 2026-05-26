"use client";

import { motion } from "framer-motion";

const carriers = [
  { name: "Intact Insurance", logoText: "intact" },
  { name: "Aviva Canada", logoText: "AVIVA" },
  { name: "CAA Insurance", logoText: "CAA" },
  { name: "Wawanesa Insurance", logoText: "wawanesa" },
  { name: "Economical Insurance", logoText: "economical" },
  { name: "Travelers Canada", logoText: "TRAVELERSJ" },
  { name: "Gore Mutual", logoText: "GORE" },
  { name: "Pembridge Insurance", logoText: "pembridge" },
  { name: "Chubb Insurance", logoText: "CHUBB" },
  { name: "Zenith Insurance", logoText: "Zenith" }
];

export default function PartnersMarquee() {
  // Duplicate carriers list to enable continuous loop scrolling
  const doubleCarriers = [...carriers, ...carriers, ...carriers];

  return (
    <section className="py-12 bg-white border-y border-gray-100 overflow-hidden relative" id="partners">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto px-4 mb-6">
        <p className="text-center text-xs text-mid-gray uppercase tracking-widest font-semibold">
          Representing Canada's Top Insurance Providers
        </p>
      </div>

      <div className="flex w-[300%] sm:w-[200%] md:w-[150%] items-center">
        <div className="flex gap-12 animate-marquee py-2 whitespace-nowrap">
          {doubleCarriers.map((carrier, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center bg-light-gray/60 border border-gray-200/50 rounded-xl px-8 py-3.5 shadow-sm hover:shadow-md hover:border-big-red/20 transition-all group"
            >
              <span className="font-poppins font-bold text-gray-400 group-hover:text-big-red tracking-wide text-lg sm:text-xl transition-colors">
                {carrier.logoText}
              </span>
              <span className="sr-only">{carrier.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
