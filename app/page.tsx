import HeroSection from "@/app/sections/HeroSection";
import StatsBar from "@/app/sections/StatsBar";
import ServicesGrid from "@/app/sections/ServicesGrid";
import WhySharan from "@/app/sections/WhySharan";
import PartnersMarquee from "@/app/sections/PartnersMarquee";
import TestimonialsCarousel from "@/app/sections/TestimonialsCarousel";
import FAQSection from "@/app/sections/FAQSection";
import LocationContact from "@/app/sections/LocationContact";
import FinalCTABanner from "@/app/sections/FinalCTABanner";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
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
