import HeroSection from "@/app/sections/HeroSection";
import StatsBar from "@/app/sections/StatsBar";
import ServicesGrid from "@/app/sections/ServicesGrid";
import WhySharan from "@/app/sections/WhySharan";
import PartnersMarquee from "@/app/sections/PartnersMarquee";
import TestimonialsCarousel from "@/app/sections/TestimonialsCarousel";
import FAQSection from "@/app/sections/FAQSection";
import LocationContact from "@/app/sections/LocationContact";
import FinalCTABanner from "@/app/sections/FinalCTABanner";

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
      <FinalCTABanner />
    </div>
  );
}
