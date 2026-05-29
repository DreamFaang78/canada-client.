"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Home, Car, Heart, Briefcase, ChevronRight, HelpCircle } from "lucide-react";
import Link from "next/link";
import QuoteButton from "@/components/ui/QuoteButton";

interface Service {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  icon_name: string;
  coverages: { title: string; description: string }[];
  image_url?: string;
}

const iconMap: Record<string, any> = {
  Home: Home,
  Car: Car,
  Heart: Heart,
  Briefcase: Briefcase
};

const getServiceImageFallback = (slug: string) => {
  switch (slug) {
    case "home-insurance":
      return "/Home Insurance.jpeg";
    case "auto-insurance":
      return "/Auto Insurance.jpeg";
    case "life-insurance":
      return "/Consultation With Clients.jpeg";
    case "business-insurance":
      return "/Business Insurance.jpeg";
    default:
      return "";
  }
};

const FALLBACK_SERVICES: Service[] = [
  {
    id: "1",
    slug: "home-insurance",
    name: "Home Insurance",
    short_description: "Protect your biggest investment with comprehensive home coverage tailored for Mississauga homeowners.",
    icon_name: "Home",
    image_url: "/Home Insurance.jpeg",
    coverages: [
      { title: "Dwelling Coverage", description: "Rebuilding costs if your home is damaged by fire, storm, or other covered events" },
      { title: "Personal Property", description: "Replacement of furniture, electronics, clothing, and valuables" }
    ]
  },
  {
    id: "2",
    slug: "auto-insurance",
    name: "Auto Insurance",
    short_description: "Ontario's best auto rates — compared across 30+ carriers so you never overpay for your car insurance.",
    icon_name: "Car",
    image_url: "/Auto Insurance.jpeg",
    coverages: [
      { title: "Third Party Liability", description: "Mandatory coverage — protects you if you injure someone or damage their property" },
      { title: "Accident Benefits", description: "Medical, rehabilitation, and income replacement if you're injured in an accident" }
    ]
  },
  {
    id: "3",
    slug: "life-insurance",
    name: "Life Insurance",
    short_description: "Protect your family's financial future with the right life insurance — explained simply, without the pressure.",
    icon_name: "Heart",
    image_url: "/Consultation With Clients.jpeg",
    coverages: [
      { title: "Term Life Insurance", description: "Affordable coverage for a set period — ideal for young families and mortgage protection" },
      { title: "Whole Life Insurance", description: "Permanent coverage with a cash value component that grows over time" }
    ]
  },
  {
    id: "4",
    slug: "business-insurance",
    name: "Business Insurance",
    short_description: "Comprehensive commercial coverage for Mississauga small businesses — from startup to scaling.",
    icon_name: "Briefcase",
    image_url: "/Business Insurance.jpeg",
    coverages: [
      { title: "Commercial General Liability", description: "Protection if a client is injured or property is damaged in connection with your business" },
      { title: "Commercial Property", description: "Coverage for your building, equipment, and inventory" }
    ]
  }
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(FALLBACK_SERVICES);

  useEffect(() => {
    async function fetchServices() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("services")
          .select("id, slug, name, short_description, icon_name, coverages, image_url")
          .eq("is_active", true)
          .order("sort_order", { ascending: true });

        if (data && data.length > 0) {
          const parsedData = data.map((item: any) => ({
            ...item,
            coverages: Array.isArray(item.coverages) ? item.coverages : JSON.parse(item.coverages || "[]"),
            image_url: item.image_url || getServiceImageFallback(item.slug)
          }));
          setServices(parsedData);
        }
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    }
    fetchServices();
  }, []);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-light-gray">
      {/* Hero Header */}
      <div className="bg-big-dark text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-big-red/10 to-transparent z-0" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="text-big-red font-semibold text-sm uppercase tracking-widest block mb-3">Our Offerings</span>
            <h1 className="font-poppins font-bold text-4xl sm:text-5xl mb-6">
              Insurance Tailored to Your Life & Business
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl font-light leading-relaxed">
              Sharan Kaur shops 30+ insurance carriers to find you the best rates and comprehensive coverage.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon_name] || HelpCircle;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-150 flex flex-col justify-between hover:shadow-xl hover:border-big-red/20 transition-all group"
              >
                <div>
                  {/* Image cover at the top of the details card */}
                  <div className="relative h-60 w-full overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={service.image_url || getServiceImageFallback(service.slug)}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Floating icon */}
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg border border-gray-150">
                      <Icon className="w-6 h-6 text-big-red" />
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-poppins font-bold text-2xl text-big-dark group-hover:text-big-red transition-colors">
                        {service.name}
                      </h3>
                      <span className="text-xs text-mid-gray font-semibold bg-gray-50 border border-gray-100 px-3 py-1 rounded-full uppercase tracking-wider">
                        RIBO Licensed
                      </span>
                    </div>

                    <p className="text-mid-gray leading-relaxed mb-6 font-light">
                      {service.short_description}
                    </p>

                    <div className="border-t border-dashed border-gray-200 pt-6">
                      <h4 className="font-poppins font-bold text-xs text-charcoal uppercase tracking-wider mb-4">
                        Key Coverages Available
                      </h4>
                      <ul className="space-y-3">
                        {service.coverages.slice(0, 3).map((cov, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-big-red shrink-0 mt-2" />
                            <div>
                              <span className="text-sm font-semibold text-big-dark block">{cov.title}</span>
                              <span className="text-xs text-mid-gray leading-relaxed block">{cov.description}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-8 pt-0 flex flex-col sm:flex-row gap-3 items-center">
                  <QuoteButton href="/get-a-quote" size="sm" className="w-full sm:w-auto">
                    Get Quote
                  </QuoteButton>
                  <Link
                    href={`/services/${service.slug}`}
                    className="w-full sm:w-auto py-2.5 px-5 text-center text-sm font-poppins font-bold text-charcoal border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-1 group/btn"
                  >
                    Details
                    <ChevronRight className="w-4 h-4 text-mid-gray group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
