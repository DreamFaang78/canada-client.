import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insurance FAQ Mississauga | Sharan Kaur Insurance Broker",
  description:
    "Answers to common insurance questions for Mississauga residents. Home, auto, life & business insurance explained by RIBO broker Sharan Kaur.",
  alternates: { canonical: "/faq" },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
