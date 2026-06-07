"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Home, Car, Heart, Briefcase, Plane, ChevronLeft, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import QuoteButton from "@/components/ui/QuoteButton";

interface ServiceDetail {
  slug: string;
  name: string;
  short_description: string;
  long_description: string;
  icon_name: string;
  coverages: { title: string; description: string }[];
  meta_title?: string;
  meta_description?: string;
  image_url?: string;
}

const getServiceImageFallback = (slug: string) => {
  switch (slug) {
    case "home-insurance":
      return "/Home Insurance New.png";
    case "auto-insurance":
      return "/Auto Insurance.jpeg";
    case "life-insurance":
      return "/Life Insurance.jpeg";
    case "business-insurance":
      return "/Business Insurance.jpeg";
    case "travel-insurance":
      return "/Travel Insurance.jpeg";
    default:
      return "";
  }
};

const iconMap: Record<string, any> = {
  Home: Home,
  Car: Car,
  Heart: Heart,
  Briefcase: Briefcase,
  Plane: Plane
};

const FALLBACK_SERVICE_DETAILS: Record<string, ServiceDetail> = {
  "home-insurance": {
    slug: "home-insurance",
    name: "Home Insurance",
    short_description: "Protect your biggest investment with comprehensive home coverage tailored for Mississauga homeowners.",
    long_description: "Your home is likely your most valuable asset. Sharan compares 30+ insurers to find the coverage that actually fits — whether you own a detached home, condo, or rental property in Mississauga. We go beyond the basics to make sure you're protected when it matters most.",
    icon_name: "Home",
    image_url: "/Home Insurance New.png",
    coverages: [
      { title: "Dwelling Coverage", description: "Rebuilding costs if your home is damaged by fire, storm, or other covered events" },
      { title: "Personal Property", description: "Replacement of furniture, electronics, clothing, and valuables" },
      { title: "Additional Living Expenses", description: "Hotel and living costs if your home becomes temporarily uninhabitable" },
      { title: "Liability Protection", description: "Coverage if someone is injured on your property" },
      { title: "Overland Water", description: "Protection against flooding — now available in most Mississauga policies" },
      { title: "Earthquake & Sewer Backup", description: "Optional add-ons Sharan will recommend based on your property" }
    ]
  },
  "auto-insurance": {
    slug: "auto-insurance",
    name: "Auto Insurance",
    short_description: "Ontario's best auto rates — compared across 30+ carriers so you never overpay for your car insurance.",
    long_description: "Auto insurance is mandatory in Ontario, but overpaying isn't. Sharan analyzes your driving profile across 30+ carriers to find you the best rate with the right coverage. Whether you drive daily in Mississauga traffic or only on weekends, there's a policy that fits.",
    icon_name: "Car",
    image_url: "/Auto Insurance.jpeg",
    coverages: [
      { title: "Third Party Liability", description: "Mandatory coverage — protects you if you injure someone or damage their property" },
      { title: "Accident Benefits", description: "Medical, rehabilitation, and income replacement if you're injured in an accident" },
      { title: "Uninsured Automobile", description: "Protection against uninsured or hit-and-run drivers" },
      { title: "Collision", description: "Repair or replacement if your car is in an accident" },
      { title: "Comprehensive", description: "Protection against theft, fire, weather, and vandalism" },
      { title: "OPCF Endorsements", description: "Custom add-ons like rental vehicle, accident forgiveness, and waiver of depreciation" }
    ]
  },
  "life-insurance": {
    slug: "life-insurance",
    name: "Life Insurance",
    short_description: "Protect your family's financial future with the right life insurance — explained simply, without the pressure.",
    long_description: "Life insurance is one of the most important financial decisions you'll make for your family — and one of the most misunderstood. Sharan takes the time to explain your options in plain language and finds coverage that fits your life stage, income, and goals.",
    icon_name: "Heart",
    image_url: "/Life Insurance.jpeg",
    coverages: [
      { title: "Term Life Insurance", description: "Affordable coverage for a set period — ideal for young families and mortgage protection" },
      { title: "Whole Life Insurance", description: "Permanent coverage with a cash value component that grows over time" },
      { title: "Universal Life", description: "Flexible premiums and investment options for long-term financial planning" },
      { title: "Critical Illness", description: "Lump sum payment if you're diagnosed with a covered illness like cancer or heart attack" },
      { title: "Disability Insurance", description: "Income replacement if you can't work due to illness or injury" },
      { title: "Mortgage Protection", description: "Ensures your mortgage is paid off if something happens to you" }
    ]
  },
  "business-insurance": {
    slug: "business-insurance",
    name: "Business Insurance",
    short_description: "Comprehensive commercial coverage for Mississauga small businesses — from startup to scaling.",
    long_description: "Running a business in Mississauga means dealing with unique local risks. Sharan understands the commercial insurance landscape and builds custom packages for small businesses, contractors, retailers, and professionals. Protect your livelihood with coverage that works as hard as you do.",
    icon_name: "Briefcase",
    image_url: "/Business Insurance.jpeg",
    coverages: [
      { title: "Commercial General Liability", description: "Protection if a client is injured or property is damaged in connection with your business" },
      { title: "Commercial Property", description: "Coverage for your building, equipment, and inventory" },
      { title: "Business Interruption", description: "Revenue replacement if a covered event forces you to temporarily close" },
      { title: "Professional Liability (E&O)", description: "Essential for consultants, contractors, and professionals against claims of negligence" },
      { title: "Commercial Auto", description: "Vehicle insurance for company cars, delivery vans, or fleets" },
      { title: "Cyber Liability", description: "Protection against data breaches and cyber attacks — increasingly important for all businesses" }
    ]
  },
  "travel-insurance": {
    slug: "travel-insurance",
    name: "Travel Insurance",
    short_description: "Get the right coverage for every trip — protection for medical emergencies, cancellations, and more.",
    long_description: "Whether travelling within Canada or abroad, Sharan finds the right travel insurance plan to protect you from medical emergencies, trip cancellations, and unexpected costs. Don't let an unexpected event ruin your trip — get covered before you go.",
    icon_name: "Plane",
    image_url: "/Travel Insurance.jpeg",
    coverages: [
      { title: "Emergency Medical Coverage", description: "Protection against unexpected medical costs while travelling within Canada or abroad" },
      { title: "Trip Cancellation & Interruption", description: "Reimbursement for non-refundable costs if your trip is cancelled or cut short" },
      { title: "Baggage Loss & Delay", description: "Coverage for lost, stolen, or delayed luggage and personal belongings" },
      { title: "24/7 Worldwide Assistance", description: "Round-the-clock emergency support no matter where your travels take you" }
    ]
  }
};

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const serviceSlug = Array.isArray(slug) ? slug[0] : slug;

    async function fetchService() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("services")
          .select("name, slug, short_description, long_description, icon_name, coverages, meta_title, meta_description, image_url")
          .eq("slug", serviceSlug)
          .eq("is_active", true)
          .single();

        if (data) {
          setService({
            ...data,
            coverages: Array.isArray(data.coverages) ? data.coverages : JSON.parse(data.coverages || "[]"),
            image_url: data.image_url || getServiceImageFallback(serviceSlug)
          });
        } else {
          // fallback
          const fallback = FALLBACK_SERVICE_DETAILS[serviceSlug];
          if (fallback) {
            setService(fallback);
          } else {
            router.push("/services");
          }
        }
      } catch (err) {
        console.error("Error fetching service detail:", err);
        const fallback = FALLBACK_SERVICE_DETAILS[serviceSlug];
        if (fallback) {
          setService(fallback);
        } else {
          router.push("/services");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchService();
  }, [slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-big-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!service) return null;

  const Icon = iconMap[service.icon_name] || Home;

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      {/* Header Banner */}
      <div className="bg-big-dark text-white py-14 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-big-red/10 to-transparent z-0" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mb-6 transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Services
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-big-red flex items-center justify-center text-white shadow-md">
              <Icon className="w-6 h-6" />
            </div>
            <h1 className="font-poppins font-bold text-3xl sm:text-5xl leading-tight">
              {service.name}
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-3xl font-light leading-relaxed">
            {service.short_description}
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Details & Coverages */}
          <div className="lg:col-span-8 space-y-10">
            {/* Service Cover Image */}
            <div className="relative h-[250px] sm:h-[350px] w-full rounded-3xl overflow-hidden shadow-lg border border-gray-150 shrink-0">
              <img
                src={service.image_url || getServiceImageFallback(service.slug)}
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6">
              <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-big-dark">
                Overview
              </h2>
              <p className="text-mid-gray text-base leading-relaxed font-light">
                {service.long_description}
              </p>
            </div>

            <div className="space-y-6 border-t border-gray-100 pt-10">
              <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-big-dark">
                Coverages Available
              </h2>
              <p className="text-mid-gray text-sm font-light">
                Click a coverage type to learn how it protects you. Sharan will help you customize these based on your risk profile.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.coverages.map((cov, i) => (
                  <div
                    key={i}
                    className="p-5 bg-light-gray/60 border border-gray-150 rounded-2xl flex items-start gap-4 hover:bg-white hover:border-big-red/20 hover:shadow-md transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-big-red/10 flex items-center justify-center text-big-red shrink-0 group-hover:bg-big-red group-hover:text-white transition-all">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-poppins font-bold text-sm text-big-dark group-hover:text-big-red transition-colors">
                        {cov.title}
                      </h4>
                      <p className="text-xs text-mid-gray leading-relaxed font-light">
                        {cov.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar Form or Contact Widget */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-light-gray rounded-3xl p-6 border border-gray-150 relative">
              <span className="absolute -top-3 left-6 px-3 py-1 bg-big-red text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
                Fast & Free
              </span>
              <h3 className="font-poppins font-bold text-xl text-big-dark mt-2 mb-4">
                Get a Custom Quote
              </h3>
              <p className="text-xs text-mid-gray leading-relaxed mb-6 font-light">
                Submit a quote request for {service.name} and Sharan will compare rates across 30+ providers for you.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-big-red shrink-0" />
                  <span className="text-xs font-semibold text-charcoal">Save up to 15% with bundling</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-big-red shrink-0" />
                  <span className="text-xs font-semibold text-charcoal">Quotes within 15 minutes</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-big-red shrink-0" />
                  <span className="text-xs font-semibold text-charcoal">Licensed broker review</span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <QuoteButton href="/get-a-quote" size="md" className="w-full">
                  Start Quote Request
                </QuoteButton>
                <a
                  href="tel:+16475018013"
                  className="block w-full py-3 text-center text-xs font-poppins font-semibold text-charcoal bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
                >
                  Call: 647.501.8013
                </a>
              </div>
            </div>

            {/* Direct Broker Widget */}
            <div className="bg-big-dark text-white rounded-3xl p-6 flex items-center gap-4 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 text-white/5 pointer-events-none">
                <Icon className="w-32 h-32 rotate-12" />
              </div>
              <div className="space-y-2 relative z-10">
                <h4 className="font-poppins font-bold text-sm text-big-red uppercase tracking-wider">Direct Access</h4>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Have questions about {service.name} coverages? Chat directly with Sharan.
                </p>
                <a
                  href="mailto:sharan@thebig.ca"
                  className="inline-block text-xs font-bold text-white hover:text-big-red underline transition-colors"
                >
                  sharan@thebig.ca
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
