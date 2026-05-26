"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconPlus, IconMinus, IconArrowRight } from "@/components/ui/BIGIcons";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is the benefit of working with an insurance broker like Sharan vs. a direct insurance company?",
    answer: "A direct insurance agent represents only one company and can only sell their specific products. As an independent broker, Sharan represents YOU, not the insurance company. She shops your profile across 30+ of Canada's leading insurers to find the best policy and rates. If rates rise, she can shop around for you again without you having to switch brokers. Plus, you get a dedicated advocate for claims and policy adjustments."
  },
  {
    question: "How much can I save by bundling my home and auto insurance in Ontario?",
    answer: "Bundling your home and auto insurance is one of the most effective ways to lower your premiums. Insurers typically offer a 'multi-policy discount' which ranges between 10% to 15% off both your home and auto coverages. Additionally, bundling simplifies your administration with a single renewal date and one point of contact."
  },
  {
    question: "What specific factors affect my auto insurance rates in Mississauga?",
    answer: "Mississauga has some of the highest insurance rates in Ontario due to traffic density, claims frequency, and vehicle theft rates. Personal factors that determine your rate include your driving record (tickets/accidents), years licensed in Canada, your daily commute distance, the make and model of your vehicle, and your postal code."
  },
  {
    question: "How long does it take to get an insurance quote?",
    answer: "For standard personal auto and home insurance, Sharan can typically deliver competitive options within 15 to 30 minutes of receiving your completed details. More complex business insurance packages or high-value home insurance policies can take 24 to 48 hours as they require customized underwriting."
  },
  {
    question: "Is Sharan Deol licensed to operate in Ontario?",
    answer: "Yes, Sharan Deol is fully licensed by the Registered Insurance Brokers of Ontario (RIBO), which is the self-regulatory body for insurance brokers in Ontario. She is also licensed for Life, Accident & Sickness insurance, allowing her to provide comprehensive personal and commercial insurance solutions."
  }
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="section-padding bg-white" id="faq">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-big-red font-semibold text-sm uppercase tracking-widest mb-3">Got Questions?</p>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-big-dark mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-mid-gray max-w-2xl mx-auto text-base">
            Get quick answers to the most common questions about insurance brokers, coverage types, and rates in Mississauga.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-2xl transition-all duration-300 ${
                  isOpen ? "border-big-red bg-red-50/20" : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-poppins font-semibold text-big-dark text-base sm:text-lg select-none"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                    isOpen ? "border-big-red bg-big-red text-white" : "border-gray-200 bg-gray-50 text-charcoal"
                  }`}>
                    {isOpen ? <IconMinus size={16} /> : <IconPlus size={16} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0 text-mid-gray text-base leading-relaxed border-t border-dashed border-gray-200/50 mt-1">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-mid-gray text-sm mb-2">Have a question that's not answered here?</p>
          <Link
            href="/faq"
            className="inline-flex items-center gap-1.5 text-big-red font-poppins font-semibold text-sm hover:underline"
          >
            View all FAQs
            <IconArrowRight size={16} className="text-big-red" />
          </Link>
        </div>
      </div>
    </section>
  );
}
