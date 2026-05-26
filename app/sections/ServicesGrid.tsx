"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Car, Heart, Building2, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Home Insurance",
    slug: "home-insurance",
    image: "/A_premium_Canadian_family_home.jpeg",
    description:
      "Protect your biggest investment with comprehensive home insurance coverage including dwelling, contents, and liability.",
    features: ["Dwelling protection", "Personal property", "Liability coverage", "Additional living expenses"],
    color: "from-blue-500 to-blue-700",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Car,
    title: "Auto Insurance",
    slug: "auto-insurance",
    image: "/Auto Insurance Card.jpeg",
    description:
      "Drive with confidence knowing you're covered with Ontario's mandatory auto insurance and optional extras.",
    features: ["Liability coverage", "Collision & comprehensive", "Accident benefits", "Direct compensation"],
    color: "from-green-500 to-green-700",
    bg: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    icon: Heart,
    title: "Life Insurance",
    slug: "life-insurance",
    image: "/Life Insurance Card.jpeg",
    description:
      "Secure your family's financial future with term and permanent life insurance solutions tailored to your needs.",
    features: ["Term life", "Permanent life", "Critical illness", "Disability coverage"],
    color: "from-purple-500 to-purple-700",
    bg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: Building2,
    title: "Business Insurance",
    slug: "business-insurance",
    image: "/Business Insurance Card.jpeg",
    description:
      "Protect your business with commercial property, liability, and specialty coverage for Ontario businesses.",
    features: ["Commercial property", "General liability", "Professional liability", "Business interruption"],
    color: "from-orange-500 to-orange-700",
    bg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServicesGrid() {
  return (
    <section className="section-padding bg-light-gray" id="services">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-big-red font-semibold text-sm uppercase tracking-widest mb-3"
          >
            What We Cover
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-poppins font-bold text-3xl sm:text-4xl text-big-dark mb-4"
          >
            Insurance for Every Stage of Life
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-mid-gray max-w-2xl mx-auto"
          >
            From your first home to growing your business, Sharan finds the
            right coverage at the right price from Canada&apos;s top carriers.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.slug} variants={item}>
              <Link href={`/services/${service.slug}`} className="group block">
                <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  {/* Image Header with float icon */}
                  <div className="relative h-56 w-full overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Floating Icon */}
                    <div
                      className={`absolute bottom-4 left-4 w-12 h-12 ${service.bg} rounded-xl flex items-center justify-center shadow-lg border border-white/20`}
                    >
                      <service.icon className={`w-6 h-6 ${service.iconColor}`} />
                    </div>
                  </div>

                  <div className="p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-poppins font-bold text-xl text-big-dark mb-2 group-hover:text-big-red transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-mid-gray text-sm leading-relaxed mb-5 font-light">
                        {service.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {service.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-charcoal">
                            <div className="w-1.5 h-1.5 rounded-full bg-big-red shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-big-red font-semibold text-sm group-hover:gap-3 transition-all">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/get-a-quote"
            className="inline-flex items-center gap-2 bg-big-red hover:bg-deep-red text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 text-sm"
          >
            Get a Free Quote for Any Coverage
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
