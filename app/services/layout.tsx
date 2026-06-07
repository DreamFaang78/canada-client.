import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insurance Services Mississauga — Home, Auto, Life & Business",
  description:
    "Explore Sharan Kaur's insurance services in Mississauga. Home, auto, life, business & travel coverage from Canada's top 30+ carriers.",
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
