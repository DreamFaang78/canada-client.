"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Users, TrendingUp } from "lucide-react";

const differentiators = [
  {
    icon: Shield,
    title: "Independent Broker — Your Advocate",
    description:
      "Unlike agents who work for a single insurer, Sharan works for YOU. As an independent RIBO-licensed broker, he shops across 15+ carriers to find the best coverage at the best price — with zero conflicts of interest.",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    stat: "15+ Carriers",
  },
  {
    icon: Clock,
    title: "Fast, Personalized Service",
    description:
      "No call centres, no hold music. You get direct access to Sharan — quick responses, same-day quotes, and someone who actually knows your policy inside out. Insurance done the way it should be.",
    color: "bg-green-50",
    iconColor: "text-green-600",
    stat: "Same-Day Quotes",
  },
  {
    icon: Users,
    title: "Community-Rooted in Mississauga",
    description:
      "Born and raised in the GTA, Sharan understands the local market deeply — from condo regulations to Ontario auto rules. He speaks your language and serves your community.",
    color: "bg-purple-50",
    iconColor: "text-purple-600",
    stat: "Local Expert",
  },
  {
    icon: TrendingUp,
    title: "Ongoing Policy Reviews",
    description:
      "Life changes. Your insurance should too. Sharan proactively reviews your policies at renewal, checks for gaps, and ensures you're never paying for coverage you don't need.",
    color: "bg-orange-50",
    iconColor: "text-orange-600",
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
            Why Choose Sharan
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
              {/* Icon card */}
              <div className="md:w-2/5 shrink-0">
                <div
                  className={`${item.color} rounded-2xl p-10 flex flex-col items-center justify-center gap-4 h-48`}
                >
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center">
                    <item.icon className={`w-8 h-8 ${item.iconColor}`} />
                  </div>
                  <span className="font-poppins font-bold text-big-dark text-lg">
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
