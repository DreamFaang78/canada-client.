import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import HeroSection from "@/app/sections/HeroSection";
import StatsBar from "@/app/sections/StatsBar";
import ServicesGrid from "@/app/sections/ServicesGrid";
import WhySharan from "@/app/sections/WhySharan";
import PartnersMarquee from "@/app/sections/PartnersMarquee";
import TestimonialsCarousel from "@/app/sections/TestimonialsCarousel";
import FAQSection from "@/app/sections/FAQSection";
import LocationContact from "@/app/sections/LocationContact";
import FinalCTABanner from "@/app/sections/FinalCTABanner";

const cityLinks = [
  { name: "Mississauga", href: "/mississauga-insurance-broker" },
  { name: "Brampton", href: "/brampton-insurance-broker" },
  { name: "Toronto", href: "/toronto-insurance-broker" },
  { name: "Vaughan", href: "/vaughan-insurance-broker" },
];

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sharanbroker.com";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "InsuranceAgency"],
      "@id": `${SITE_URL}/#business`,
      name: "Sharan Kaur Insurance Broker",
      image: "https://www.sharanbroker.com/og-image.jpg",
      url: "https://www.sharanbroker.com",
      telephone: "+16475018013",
      email: "sharan@sharanbroker.com",
      description:
        "RIBO-licensed insurance broker in Mississauga offering auto, home, life, business and travel insurance from 30+ carriers. Bilingual English and Punjabi. Serving GTA newcomers and the South Asian community.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "105D-135 Matheson Blvd West",
        addressLocality: "Mississauga",
        addressRegion: "ON",
        postalCode: "L5R 3L1",
        addressCountry: "CA",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 43.6208,
        longitude: -79.6612,
      },
      areaServed: [
        "Mississauga",
        "Brampton",
        "Toronto",
        "Vaughan",
        "Markham",
        "Richmond Hill",
        "Oakville",
        "Etobicoke",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Insurance Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Auto Insurance Ontario" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Home Insurance Mississauga" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Life Insurance Ontario" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Insurance Ontario" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Travel Insurance Canada" } },
        ],
      },
      knowsLanguage: ["en", "pa"],
      priceRange: "Free Quotes",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      sameAs: [
        "https://www.facebook.com/sharanbroker",
        "https://www.linkedin.com/in/sharankaur-insurance",
      ],
      employee: {
        "@id": `${SITE_URL}/#person`,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        worstRating: "1",
        // TODO: replace with the real review count from the GBP dashboard — do not estimate
        reviewCount: "47",
      },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Sharan Kaur",
      jobTitle: "Licensed Insurance Broker",
      worksFor: {
        "@id": `${SITE_URL}/#business`,
      },
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "RIBO Licensed Broker",
      },
      url: `${SITE_URL}/about`,
      // TODO: upload /public/sharan-headshot.jpg — see public/HEADSHOT-NEEDED.md
      image: `${SITE_URL}/sharan-headshot.jpg`,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        worstRating: "1",
        // TODO: replace with the real review count from the GBP dashboard — do not estimate
        reviewCount: "47",
      },
    },
  ],
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <HeroSection />
      <StatsBar />
      <ServicesGrid />
      <WhySharan />
      <PartnersMarquee />
      <TestimonialsCarousel />
      <FAQSection />
      <LocationContact />

      {/* Service Areas */}
      <section className="py-16 md:py-20 bg-light-gray">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-big-dark mb-3">
              Insurance Broker Services Across the GTA
            </h2>
            <p className="text-mid-gray text-base font-light leading-relaxed">
              Sharan Kaur provides RIBO-licensed auto, home, life, and business insurance
              to clients throughout the Greater Toronto Area.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cityLinks.map((city) => (
              <Link
                key={city.href}
                href={city.href}
                className="p-5 bg-white border border-gray-150 rounded-2xl flex flex-col gap-2 hover:border-big-red/20 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-big-red/10 flex items-center justify-center text-big-red group-hover:bg-big-red group-hover:text-white transition-all">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-poppins font-bold text-sm text-big-dark group-hover:text-big-red transition-colors">
                  Insurance Broker in {city.name}
                </h3>
                <span className="text-xs text-mid-gray font-light inline-flex items-center gap-1">
                  View local coverage <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTABanner />
    </div>
  );
}
