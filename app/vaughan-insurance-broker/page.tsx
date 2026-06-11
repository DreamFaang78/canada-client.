import type { Metadata } from "next";
import { Home, Car, Heart, Briefcase, Plane, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import QuoteButton from "@/components/ui/QuoteButton";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sharanbroker.com";
const CITY = "Vaughan";
const SLUG = "vaughan-insurance-broker";

export const metadata: Metadata = {
  title: "Vaughan Insurance Broker | RIBO Licensed | Sharan Kaur",
  description:
    "Looking for an insurance broker in Vaughan? Sharan Kaur is RIBO-licensed and compares 30+ carriers for auto, home, and life insurance. Get a free quote today.",
  alternates: { canonical: `/${SLUG}` },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "InsuranceAgency"],
  "@id": `${SITE_URL}/${SLUG}#business`,
  name: "Sharan Kaur Insurance Broker",
  image: `${SITE_URL}/og-image.jpg`,
  url: `${SITE_URL}/${SLUG}`,
  telephone: "+16475018013",
  email: "sharan@sharanbroker.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "105D-135 Matheson Blvd West",
    addressLocality: "Mississauga",
    addressRegion: "ON",
    postalCode: "L5R 3L1",
    addressCountry: "CA",
  },
  areaServed: CITY,
  knowsLanguage: ["en", "pa"],
  priceRange: "Free Quotes",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does Sharan Kaur offer business insurance for Vaughan small businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Sharan Kaur is a RIBO-licensed broker who provides commercial insurance for small businesses in Vaughan, comparing coverage from 30+ carriers for liability, property, and business interruption protection.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly can I get an auto insurance quote in Vaughan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sharan Kaur provides free auto insurance quotes for Vaughan drivers within minutes, comparing rates across 30+ carriers to find the best coverage and price for your needs.",
      },
    },
  ],
};

const services = [
  {
    name: "Auto Insurance",
    slug: "auto-insurance",
    icon: Car,
    description: `Compare rates from 30+ carriers for car insurance in ${CITY}, including coverage for G2 drivers and newcomers.`,
  },
  {
    name: "Home Insurance",
    slug: "home-insurance",
    icon: Home,
    description: `Protect your ${CITY} home, condo, or rental property with coverage tailored to your needs.`,
  },
  {
    name: "Life Insurance",
    slug: "life-insurance",
    icon: Heart,
    description: `Term and permanent life insurance plans for ${CITY} families and new immigrants.`,
  },
  {
    name: "Business Insurance",
    slug: "business-insurance",
    icon: Briefcase,
    description: `Commercial coverage for small businesses operating in ${CITY}.`,
  },
  {
    name: "Travel Insurance",
    slug: "travel-insurance",
    icon: Plane,
    description: `Visitor and travel insurance for ${CITY} residents and visitors to Canada.`,
  },
];

const whyPoints = [
  "RIBO-licensed broker — works for you, not the insurance company",
  "Access to 30+ insurance carriers for the best rates",
  "Bilingual service in English and Punjabi",
  "Free, no-obligation quotes within minutes",
  `Local knowledge of ${CITY} and the Greater Toronto Area`,
];

export default function VaughanInsuranceBrokerPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Header Banner */}
      <div className="bg-big-dark text-white py-14 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-big-red/10 to-transparent z-0" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="font-poppins font-bold text-3xl sm:text-5xl leading-tight">
            Insurance Broker in {CITY}
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl font-light leading-relaxed mt-4">
            Sharan Kaur is a RIBO-licensed insurance broker serving {CITY} and the Greater
            Toronto Area. Compare auto, home, life, and business insurance from 30+ carriers
            and get a free quote — with bilingual service in English and Punjabi.
          </p>
          <div className="mt-8">
            <QuoteButton href="/get-a-quote" size="lg">
              Get a Free Quote
            </QuoteButton>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 space-y-16">
        {/* Who We Serve */}
        <section className="space-y-6">
          <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-big-dark">
            Who We Serve in {CITY}
          </h2>
          <p className="text-mid-gray text-base leading-relaxed font-light max-w-3xl">
            Sharan Kaur works with a wide range of {CITY} residents, including:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              `Newcomers to Canada settling in ${CITY} who need auto or home insurance`,
              "G2 and G drivers looking for affordable car insurance",
              `First-time home buyers and condo owners in ${CITY}`,
              "Punjabi-speaking families and individuals",
              `Small business owners operating in ${CITY}`,
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 p-4 bg-light-gray/60 border border-gray-150 rounded-2xl"
              >
                <CheckCircle2 className="w-5 h-5 text-big-red shrink-0 mt-0.5" />
                <span className="text-sm text-charcoal font-light">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Our Services */}
        <section className="space-y-6 border-t border-gray-100 pt-10">
          <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-big-dark">
            Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="p-5 bg-light-gray/60 border border-gray-150 rounded-2xl flex flex-col gap-3 hover:bg-white hover:border-big-red/20 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-big-red/10 flex items-center justify-center text-big-red group-hover:bg-big-red group-hover:text-white transition-all">
                  <service.icon className="w-5 h-5" />
                </div>
                <h3 className="font-poppins font-bold text-sm text-big-dark group-hover:text-big-red transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-mid-gray leading-relaxed font-light">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Why Sharan Kaur */}
        <section className="space-y-6 border-t border-gray-100 pt-10">
          <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-big-dark">
            Why Choose Sharan Kaur in {CITY}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-big-red shrink-0 mt-0.5" />
                <span className="text-sm text-charcoal font-light">{point}</span>
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <QuoteButton href="/get-a-quote" size="lg">
              Get Your Free Quote
            </QuoteButton>
          </div>
        </section>
      </div>
    </div>
  );
}
