import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/ui/CookieBanner";
import MobileStickyBar from "@/components/ui/MobileStickyBar";
import ExitIntentModal from "@/components/ui/ExitIntentModal";
import WhatsAppBubble from "@/components/ui/WhatsAppBubble";

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
    "Sharan Kaur Insurance",
    "RIBO broker",
    "Sharan Kaur insurance",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_URL,
    siteName: "Sharan Kaur Insurance Broker",
    title:
      "Sharan Kaur — Insurance Broker in Mississauga | Home, Auto, Life, Business & Travel",
    description:
      "Sharan Kaur is a licensed RIBO insurance broker in Mississauga. Get personalized quotes for home, auto, life, and business insurance. Call (647) 501-8013 today.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sharan Kaur — Insurance Broker in Mississauga",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA" className={`${poppins.variable} ${inter.variable}`}>
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
        <WhatsAppBubble />
        <ExitIntentModal />
        <CookieBanner />
      </body>
    </html>
  );
}
