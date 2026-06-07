"use client";

import { motion } from "framer-motion";
import QuoteButton from "@/components/ui/QuoteButton";
import { IconShieldCheck, IconPhone, IconZap } from "@/components/ui/BIGIcons";

export default function FinalCTABanner() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-big-dark">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/Quote CTA Section.jpeg"
          alt="Contact Sharan"
          className="w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-big-dark/95 via-big-dark/80 to-[#0F3460]/90" />
      </div>
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-big-red/20 via-transparent to-black/80 z-0" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-big-red/10 rounded-full blur-3xl -z-10 translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-deep-red/15 rounded-full blur-3xl -z-10 -translate-x-1/4 translate-y-1/4" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none" />

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white font-poppins font-semibold text-xs uppercase tracking-widest">
            <IconZap size={14} className="text-big-red" />
            Free, No-Obligation Quotes
          </span>

          <h2 className="font-poppins font-bold text-3xl sm:text-5xl text-white leading-tight max-w-3xl mx-auto">
            Ready to Protect What Matters Most and <span className="text-big-red">Save Hundreds?</span>
          </h2>

          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Compare rates from 30+ of Canada's top insurance carriers in less than 5 minutes. Let Sharan do the shopping for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <QuoteButton
              href="/get-a-quote"
              size="lg"
              variant="solid"
              gaLabel="final_cta_get_quote"
              className="w-full sm:w-auto text-base"
            >
              Get My Free Quote
            </QuoteButton>
            
            <a
              href="tel:+16475018013"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/20 text-white font-poppins font-semibold text-base hover:bg-white/5 hover:border-white/40 transition-all flex items-center justify-center gap-2 group active:scale-98"
            >
              <IconPhone size={16} className="text-big-red group-hover:scale-110 transition-transform" />
              Call 647.501.8013
            </a>
          </div>

          {/* Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-white/10 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2.5 text-gray-300">
                <IconShieldCheck size={20} className="text-big-red shrink-0" />
                <span className="text-sm font-medium text-left">RIBO Licensed Professional</span>
              </div>
              <div className="flex items-center justify-center gap-2.5 text-gray-300">
                <IconShieldCheck size={20} className="text-big-red shrink-0" />
                <span className="text-sm font-medium text-left">30+ Insurers Compared</span>
              </div>
              <div className="flex items-center justify-center gap-2.5 text-gray-300">
                <IconShieldCheck size={20} className="text-big-red shrink-0" />
                <span className="text-sm font-medium text-left">Zero Broker Fees</span>
              </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
