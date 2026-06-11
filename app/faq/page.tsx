"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Search, ArrowRight, HelpCircle } from "lucide-react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
  category: "general" | "auto" | "home" | "life" | "business";
}

const faqs: FAQItem[] = [
  {
    category: "general",
    question: "What is the benefit of working with an insurance broker like Sharan vs. a direct insurance company?",
    answer: "A direct insurance agent represents only one company and can only sell their specific products. As an independent broker, Sharan represents YOU, not the insurance company. She shops your profile across 30+ of Canada's leading insurers to find the best policy and rates. If rates rise, she can shop around for you again without you having to switch brokers. Plus, you get a dedicated advocate for claims and policy adjustments."
  },
  {
    category: "general",
    question: "Is Sharan Kaur licensed to operate in Ontario?",
    answer: "Yes, Sharan Kaur is fully licensed by the Registered Insurance Brokers of Ontario (RIBO), which is the self-regulatory body for insurance brokers in Ontario. She is also licensed for Life, Accident & Sickness insurance, allowing her to provide comprehensive personal and commercial insurance solutions."
  },
  {
    category: "general",
    question: "How long does it take to get an insurance quote?",
    answer: "For standard personal auto and home insurance, Sharan can typically deliver competitive options within 15 to 30 minutes of receiving your completed details. More complex business insurance packages or high-value home insurance policies can take 24 to 48 hours as they require customized underwriting."
  },
  {
    category: "home",
    question: "How much can I save by bundling my home and auto insurance in Ontario?",
    answer: "Bundling your home and auto insurance is one of the most effective ways to lower your premiums. Insurers typically offer a 'multi-policy discount' which ranges between 10% to 15% off both your home and auto coverages. Additionally, bundling simplifies your administration with a single renewal date and one point of contact."
  },
  {
    category: "home",
    question: "What is overland water and sewer backup coverage? Do I need them?",
    answer: "Yes, both are highly recommended. Sewer backup covers damage caused by water backing up through your drains or sump pump. Overland water covers damage from freshwater flooding, such as heavy rain, spring run-off, or overflowing rivers. Given recent weather patterns in Mississauga and the Peel region, most standard policies require these as critical add-ons."
  },
  {
    category: "auto",
    question: "What specific factors affect my auto insurance rates in Mississauga?",
    answer: "Mississauga has some of the highest insurance rates in Ontario due to traffic density, claims frequency, and vehicle theft rates. Personal factors that determine your rate include your driving record (tickets/accidents), years licensed in Canada, your daily commute distance, the make and model of your vehicle, and your postal code."
  },
  {
    category: "auto",
    question: "Can I cancel my current auto insurance policy before the renewal date to switch brokers?",
    answer: "Yes, you can cancel your policy at any time, but doing so before the annual renewal date may trigger a 'short-rate cancellation fee' from your current insurer. Sharan will calculate this penalty for you to determine if the savings from switching immediately outweigh the fee, or if it is better to schedule the switch on your exact renewal date."
  },
  {
    category: "life",
    question: "What is the difference between Term Life and Whole Life Insurance?",
    answer: "Term Life Insurance covers you for a set period (e.g., 10, 20, or 30 years) and pays a death benefit if you pass away during that term. It is highly affordable and ideal for protecting a mortgage or raising children. Whole Life Insurance is permanent, covers you for your entire life, and includes a cash-value accumulation component that you can borrow against or withdraw. It is more expensive but serves as a long-term estate planning tool."
  },
  {
    category: "business",
    question: "Do you offer commercial vehicle fleet insurance for Mississauga businesses?",
    answer: "Yes. Sharan specializes in commercial auto and commercial vehicle fleet insurance. Whether you operate a single delivery van, 5 contractor trucks, or a large fleet of transport vehicles, we compare commercial rates and structure policies that include cargo insurance, commercial liability, and comprehensive physical damage coverage."
  }
];

const categoryLabels: Record<string, string> = {
  all: "All FAQs",
  general: "General",
  auto: "Auto Insurance",
  home: "Home Insurance",
  life: "Life Insurance",
  business: "Business Insurance"
};

export default function FAQPage() {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = filter === "all" || faq.category === filter;
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (idx: number) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-light-gray">
      {/* Header Banner */}
      <div className="bg-big-dark text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-big-red/10 to-transparent z-0" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="text-big-red font-semibold text-sm uppercase tracking-widest block mb-3">Help Center</span>
            <h1 className="font-poppins font-bold text-4xl sm:text-5xl mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl font-light leading-relaxed">
              Find detailed explanations on how insurance works, policies, billing, and claims in Ontario.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main FAQ Area */}
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-10 bg-white p-4 rounded-2xl border border-gray-150 shadow-sm">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => {
                  setFilter(key);
                  setActiveIndex(null);
                }}
                className={`px-4 py-2 text-xs font-poppins font-semibold rounded-xl border transition-all ${
                  filter === key
                    ? "bg-big-red text-white border-big-red shadow-sm"
                    : "bg-white text-charcoal border-gray-200 hover:border-gray-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative max-w-md w-full">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-mid-gray">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search FAQs..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setActiveIndex(null);
              }}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all"
            />
          </div>
        </div>

        {/* FAQs */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = activeIndex === idx;
              return (
                <div
                  key={idx}
                  className={`border rounded-2xl transition-all duration-300 ${
                    isOpen ? "border-big-red bg-red-50/20" : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-poppins font-semibold text-big-dark text-base sm:text-lg select-none"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                      isOpen ? "border-big-red bg-big-red text-white" : "border-gray-200 bg-gray-50 text-charcoal"
                    }`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
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
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-150">
            <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-mid-gray text-base mb-2">No FAQs found matching your search.</p>
            <button
              onClick={() => {
                setFilter("all");
                setSearch("");
              }}
              className="text-big-red font-poppins font-bold text-sm hover:underline"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-white rounded-3xl p-8 border border-gray-150 shadow-sm text-center max-w-3xl mx-auto space-y-6">
          <h3 className="font-poppins font-bold text-2xl text-big-dark">Still have questions?</h3>
          <p className="text-mid-gray max-w-xl mx-auto text-sm leading-relaxed font-light">
            Sharan is happy to explain any policy details, rates, or regulations. Get in touch directly and get professional advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-big-red hover:bg-deep-red text-white font-poppins font-semibold text-sm rounded-xl transition-all shadow-sm active:scale-98"
            >
              Contact Sharan
            </Link>
            <a
              href="tel:+16475018013"
              className="px-6 py-3 border border-gray-200 text-charcoal font-poppins font-semibold text-sm rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-1.5"
            >
              Call 647.501.8013
            </a>
          </div>
        </div>

        {/* Helpful Resources */}
        <div className="mt-16 max-w-3xl mx-auto space-y-6">
          <h3 className="font-poppins font-bold text-2xl text-big-dark text-center">
            Helpful Resources
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: "/mississauga-insurance-broker", label: "Insurance Broker in Mississauga" },
              { href: "/brampton-insurance-broker", label: "Insurance Broker in Brampton" },
              { href: "/blog/car-insurance-newcomers-ontario", label: "Car Insurance for Newcomers to Ontario: A Complete Guide" },
              { href: "/blog/auto-insurance-international-license-ontario", label: "Can You Get Auto Insurance in Ontario With an International Driver's License?" },
              { href: "/blog/insurance-broker-vs-agent-ontario", label: "Insurance Broker vs. Insurance Agent in Ontario: What's the Difference?" },
              { href: "/blog/g2-driver-car-insurance-mississauga", label: "G2 Driver Car Insurance in Mississauga: How to Get Affordable Rates" },
              { href: "/blog/home-insurance-first-time-buyers-mississauga", label: "Home Insurance for First-Time Buyers in Mississauga: What You Need to Know" },
              { href: "/blog/life-insurance-new-immigrants-canada", label: "Life Insurance for New Immigrants to Canada: A Beginner's Guide" },
            ].map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="p-5 bg-white border border-gray-150 rounded-2xl flex items-center justify-between gap-4 hover:border-big-red/20 hover:shadow-md transition-all group"
              >
                <span className="font-poppins font-semibold text-sm text-big-dark group-hover:text-big-red transition-colors">
                  {resource.label}
                </span>
                <ArrowRight className="w-4 h-4 text-big-red shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
