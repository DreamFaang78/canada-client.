import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/ui/CookieBanner";
import MobileStickyBar from "@/components/ui/MobileStickyBar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sharanbroker.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Sharan Kaur — Insurance Broker Mississauga | RIBO Licensed",
    template: "%s | Sharan Kaur Insurance",
  },
  description:
    "Licensed RIBO insurance broker in Mississauga. Compare home, auto, life & business insurance from 30+ carriers. Free quotes — call (647) 501-8013.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.png",
  },
  manifest: "/manifest.json",
  keywords: [
    "insurance broker Mississauga",
    "home insurance Ontario",
    "auto insurance Mississauga",
    "life insurance broker",
    "business insurance Ontario",
    "Billyard Insurance Group",
    "RIBO broker",
    "Sharan Kaur insurance",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_URL,
    siteName: "Sharan Kaur — BIG Insurance",
    title:
      "Sharan Kaur — Insurance Broker in Mississauga | Home, Auto, Life, Business & Travel | Think BIG.",
    description:
      "Sharan Kaur is a licensed RIBO insurance broker with Billyard Insurance Group in Mississauga. Get personalized quotes for home, auto, life, and business insurance. Call (647) 501-8013 today.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sharan Kaur — BIG Insurance Broker in Mississauga",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sharan Kaur — Insurance Broker Mississauga",
    description:
      "Licensed RIBO broker — Home, Auto, Life & Business Insurance. Get a free quote today.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#1a365d",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["InsuranceAgency", "LocalBusiness"],
      "@id": `${SITE_URL}/#business`,
      name: "Sharan Kaur — Billyard Insurance Group",
      description:
        "Licensed RIBO insurance broker offering home, auto, life, and business insurance in Mississauga, Ontario.",
      url: SITE_URL,
      telephone: "+1-647-501-8013",
      email: "sharan@thebig.ca",
      priceRange: "$$",
      // TODO: upload /public/og-image.jpg (1200x630) — see public/OG-IMAGE-NEEDED.md
      image: `${SITE_URL}/og-image.jpg`,
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
        latitude: "43.61350487110462",
        longitude: "-79.69176392382484",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday"],
          opens: "10:00",
          closes: "15:00",
        },
      ],
      sameAs: [
        "https://www.facebook.com/sharankaurinsurance",
        "https://www.linkedin.com/in/sharankaur",
        "https://www.instagram.com/sharankaurinsurance",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </head>
      <body className="antialiased bg-white text-foreground">
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-big-red text-white px-4 py-2 rounded z-[9999]"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <MobileStickyBar />
        <CookieBanner />
      </body>
    </html>
  );
}
