import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://thebig.ca"
  ),
  title: {
    default:
      "Sharan Kaur — Insurance Broker in Mississauga | Home, Auto, Life, Business & Travel | Think BIG.",
    template: "%s | Sharan Kaur Insurance",
  },
  description:
    "Sharan Kaur is a licensed RIBO insurance broker with Billyard Insurance Group in Mississauga. Get personalized quotes for home, auto, life, and business insurance. Call (647) 501-8013 today.",
  icons: {
    icon: "/favicon.png",
  },
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
    url: "https://thebig.ca",
    siteName: "Sharan Kaur — BIG Insurance",
    title:
      "Sharan Kaur — Insurance Broker in Mississauga | Think BIG.",
    description:
      "Licensed RIBO broker with Billyard Insurance Group. Home, auto, life & business insurance in Mississauga, Ontario.",
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

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["InsuranceAgency", "LocalBusiness"],
      "@id": "https://thebig.ca/#business",
      name: "Sharan Kaur — Billyard Insurance Group",
      description:
        "Licensed RIBO insurance broker offering home, auto, life, and business insurance in Mississauga, Ontario.",
      url: "https://thebig.ca",
      telephone: "+1-647-501-8013",
      email: "sharan@thebig.ca",
      priceRange: "$$",
      image: "https://thebig.ca/og-image.jpg",
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
        latitude: 43.6047,
        longitude: -79.6476,
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
          dayOfWeek: "Saturday",
          opens: "10:00",
          closes: "15:00",
        },
      ],
      sameAs: [
        "https://www.linkedin.com/in/sharandeol",
        "https://www.facebook.com/sharandeolinsurance",
      ],
    },
    {
      "@type": "Person",
      "@id": "https://thebig.ca/#sharan",
      name: "Sharan Kaur",
      jobTitle: "Licensed Insurance Broker",
      worksFor: {
        "@id": "https://thebig.ca/#business",
      },
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "RIBO Licensed Broker",
      },
      url: "https://thebig.ca/about",
      image: "https://thebig.ca/sharan-headshot.jpg",
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
