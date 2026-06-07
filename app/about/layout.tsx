import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Sharan Kaur — RIBO Licensed Broker Mississauga",
  description:
    "Meet Sharan Kaur, your trusted RIBO-licensed insurance broker with Billyard Insurance Group. Serving Mississauga & GTA with personalized coverage.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
