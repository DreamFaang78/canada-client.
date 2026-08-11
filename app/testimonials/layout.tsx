import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Reviews — Sharan Kaur Insurance Broker Mississauga",
  description:
    "See what Mississauga clients say about Sharan Kaur's insurance service. 4.9★ Google rating. RIBO-licensed broker in Mississauga.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
