"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  IconStar, IconUsers, IconAward, IconCheck, IconPhone, IconArrowRight,
  IconHome, IconCar, IconHeart, IconBuilding
} from "@/components/ui/BIGIcons";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const trustBadges = [
  { Icon: IconStar, label: "Google Rating", value: "4.9", suffix: "/5" },
  { Icon: IconUsers, label: "Clients Served", value: 500, suffix: "+" },
  { Icon: IconAward, label: "Years Experience", value: 8, suffix: "+" },
  { Icon: IconCheck, label: "Carriers Partnered", value: 30, suffix: "+" },
];

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-big-dark"
      aria-label="Hero"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-15"
        >
          <source src="/Woman_walks_near_suburban_home_.mp4" type="video/mp4" />
        </video>
        {/* Subtle gradient overlay to make text highly readable */}
        <div className="absolute inset-0 bg-gradient-to-br from-big-dark/95 via-big-dark/90 to-[#0F3460]/95" />
      </div>

      {/* Red accent orbs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-big-red/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white/90 text-xs font-medium px-4 py-2 rounded-full mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              RIBO Licensed Broker · Billyard Insurance Group
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-poppins font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6"
            >
              Insurance That
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                Protects What
              </span>
              <br />
              Matters Most.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg"
            >
              <span className="text-white font-semibold">Sharan Kaur</span> is your trusted, RIBO-licensed insurance broker in Mississauga.
              Home, auto, life, and business coverage — tailored to your life,
              not a template.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link
                href="/get-a-quote"
                id="hero-quote-cta"
                className="inline-flex items-center justify-center gap-2 bg-big-red hover:bg-deep-red text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-2xl hover:-translate-y-0.5 text-sm"
              >
                Get My Free Quote
                <IconArrowRight size={16} className="text-white" />
              </Link>
              <a
                href="tel:+16475018013"
                id="hero-call-cta"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 text-white font-semibold px-8 py-4 rounded-xl transition-all text-sm"
              >
                <IconPhone size={16} className="text-white" />
                (647) 501-8013
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-3 text-white/60 text-xs"
            >
              {["No hidden fees", "Free consultation", "Same-day quotes"].map(
                (t, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <IconCheck size={14} className="text-green-400" />
                    {t}
                  </span>
                )
              )}
            </motion.div>
          </div>

          {/* Right — Photo + Stats */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative mx-auto max-w-sm overflow-visible">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/20 shadow-2xl relative">
                  {/* TODO: Compress to WebP <300KB in /public before deploy */}
                  <Image
                    src="/homepage.jpeg"
                    alt="Sharan Kaur - Insurance Broker"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    className="object-cover"
                  />
                </div>
                {/* Floating stat cards */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute left-3 sm:left-0 lg:-left-12 top-12 bg-white rounded-2xl shadow-xl p-4 min-w-[140px]"
                >
                  <p className="text-xs text-mid-gray font-medium">
                    Google Rating
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="font-poppins font-bold text-2xl text-big-dark">
                      4.9
                    </span>
                    <svg width={20} height={20} viewBox="0 0 24 24" fill="#FBBF24" className="text-yellow-400">
                      <path d="M12 2l2.93 6.07L22 9.27l-5 4.91 1.18 6.92L12 17.77l-6.18 3.33L7 14.18 2 9.27l7.07-1.2L12 2z" stroke="#F59E0B" strokeWidth="0.5"/>
                    </svg>
                  </div>
                  <div className="flex gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} width={12} height={12} viewBox="0 0 24 24" fill="#FBBF24" className="text-yellow-400">
                        <path d="M12 2l2.93 6.07L22 9.27l-5 4.91 1.18 6.92L12 17.77l-6.18 3.33L7 14.18 2 9.27l7.07-1.2L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [4, -4, 4] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  className="absolute right-3 sm:right-0 lg:-right-8 bottom-20 bg-big-red rounded-2xl shadow-xl p-4 min-w-[130px] text-white"
                >
                  <p className="text-xs text-red-200 font-medium">
                    Clients Served
                  </p>
                  <p className="font-poppins font-bold text-2xl mt-1">
                    <AnimatedCounter target={500} suffix="+" />
                  </p>
                  <p className="text-xs text-red-200 mt-0.5">& counting</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-5 text-center flex flex-col items-center"
            >
              <badge.Icon size={40} variant="glass-dark" className="mb-2" />
              <p className="font-poppins font-bold text-2xl text-white mt-1">
                {typeof badge.value === "number" ? (
                  <AnimatedCounter
                    target={badge.value}
                    suffix={badge.suffix}
                  />
                ) : (
                  <>
                    {badge.value}
                    {badge.suffix}
                  </>
                )}
              </p>
              <p className="text-xs text-white/50 mt-1">{badge.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 rounded-full bg-white/60"
          />
        </div>
      </motion.div>
    </section>
  );
}
