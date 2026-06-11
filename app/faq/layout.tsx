import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insurance FAQ Ontario | Newcomers, G2 Drivers, Brokers | Sharan Kaur",
  description:
    "Answers to common insurance questions for Mississauga residents. Home, auto, life & business insurance explained by RIBO broker Sharan Kaur.",
  alternates: { canonical: "/faq" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can newcomers to Canada get auto insurance in Ontario?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, newcomers to Canada can get auto insurance in Ontario even with no Canadian driving history. As a RIBO-licensed broker in Mississauga, Sharan Kaur helps newcomers find coverage from 30+ carriers and looks for insurers that recognize prior driving experience to lower premiums.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get car insurance in Ontario with an international driver's license?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can get car insurance in Ontario with an international driver's license while you transition to a G2 or G license. Sharan Kaur compares 30+ carriers to find insurers that accept international licenses and prior driving experience for the best possible rate.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between an insurance broker and an insurance agent in Ontario?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An insurance broker like Sharan Kaur is RIBO-licensed and works for YOU, not any single insurance company. A broker compares rates from 30+ carriers to find the best coverage and price. An agent works for one company and can only offer that company's products.",
      },
    },
    {
      "@type": "Question",
      name: "How do I find a trustworthy insurance broker near me in Mississauga?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sharan Kaur is a RIBO-licensed insurance broker based in Mississauga, serving clients across the GTA including Brampton, Toronto, and Vaughan. Look for a local broker who is RIBO-licensed, compares multiple carriers, and offers free, no-obligation quotes for auto, home, life, and business insurance.",
      },
    },
    {
      "@type": "Question",
      name: "Do you have an insurance broker who speaks Punjabi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Sharan Kaur is a bilingual Punjabi-speaking RIBO-licensed insurance broker serving the South Asian community in Mississauga, Brampton, and the GTA. Call (647) 501-8013 for a free quote in English or Punjabi.",
      },
    },
  ],
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
