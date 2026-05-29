"use client";

import { motion } from "framer-motion";
import { IconShield, IconClock, IconUsers, IconTrending } from "@/components/ui/BIGIcons";

const differentiators = [
  {
    Icon: IconShield,
    title: "Independent Broker — Your Advocate",
    description:
      "Unlike agents who work for a single insurer, Sharan works for YOU. As an independent RIBO-licensed broker, she shops across 30+ carriers to find the best coverage at the best price — with zero conflicts of interest.",
    variant: "solid-red" as const,
    stat: "30+ Carriers",
  },
  {
    Icon: IconClock,
    title: "Fast, Personalized Service",
    description:
      "No call centres, no hold music. You get direct access to Sharan — quick responses, same-day quotes, and someone who actually knows your policy inside out. Insurance done the way it should be.",
    variant: "solid-navy" as const,
    stat: "Same-Day Quotes",
  },
  {
    Icon: IconUsers,
    title: "Community-Rooted in Mississauga",
    description:
      "Born and raised in the GTA, Sharan understands the local market deeply — from condo regulations to Ontario auto rules. She speaks your language and serves your community.",
    variant: "solid-red" as const,
    stat: "Local Expert",
  },
  {
    Icon: IconTrending,
    title: "Ongoing Policy Reviews",
    description:
      "Life changes. Your insurance should too. Sharan proactively reviews your policies at renewal, checks for gaps, and ensures you're never paying for coverage you don't need.",
    variant: "solid-navy" as const,
    stat: "Annual Reviews",
  },
];

export default function WhySharan() {
  return (
    <section className="section-padding bg-white" id="why-sharan">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-big-red font-semibold text-sm uppercase tracking-widest mb-3"
          >
            Why Choose Sharan Kaur
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-poppins font-bold text-3xl sm:text-4xl text-big-dark mb-4"
          >
            Your Broker. Your Advocate.
            <br />
            <span className="text-big-red">Your Neighbour.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-mid-gray max-w-2xl mx-auto leading-relaxed"
          >
            Sharan Kaur isn't just an insurance broker — she's a trusted advisor who puts your family's security first. Here's what makes working with her different.
          </motion.p>
        </div>

        {/* Alternating layout */}
        <div className="space-y-12">
          {differentiators.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col md:flex-row gap-8 items-center ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Glassmorphism icon card */}
              <div className="md:w-2/5 shrink-0">
                <div className="bg-gradient-to-br from-[#1A1A2E] to-[#0F3460] rounded-2xl p-10 flex flex-col items-center justify-center gap-4 h-48 border border-white/10 shadow-xl relative overflow-hidden">
                  {/* Glow orb */}
                  <div className="absolute inset-0 bg-gradient-to-br from-big-red/20 via-transparent to-transparent pointer-events-none" />
                  <item.Icon size={64} variant={item.variant} />
                  <span className="font-poppins font-bold text-white text-lg relative z-10">
                    {item.stat}
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className="md:w-3/5">
                <h3 className="font-poppins font-bold text-2xl text-big-dark mb-4">
                  {item.title}
                </h3>
                <p className="text-mid-gray leading-relaxed text-base">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
