import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sharanbroker.com";

const SERVICE_META: Record<
  string,
  { title: string; description: string; name: string }
> = {
  "home-insurance": {
    title: "Home Insurance Mississauga | Sharan Kaur — RIBO Broker",
    description:
      "Get the best home insurance rates in Mississauga. Sharan Kaur shops 30+ carriers to find your perfect coverage. Free quote today.",
    name: "Home Insurance",
  },
  "auto-insurance": {
    title: "Auto Insurance Mississauga | Compare Rates — Sharan Kaur",
    description:
      "Save on auto insurance in Mississauga. RIBO-licensed broker Sharan Kaur compares Ontario's top carriers for the best rate. Call (647) 501-8013.",
    name: "Auto Insurance",
  },
  "life-insurance": {
    title: "Life Insurance Mississauga | Term & Permanent — Sharan Kaur",
    description:
      "Protect your family with life insurance in Mississauga. Sharan Kaur offers term, permanent, and critical illness coverage tailored to you.",
    name: "Life Insurance",
  },
  "business-insurance": {
    title: "Business Insurance Ontario | Commercial Coverage — Sharan Kaur",
    description:
      "Protect your Ontario business with commercial property, liability & professional insurance. Free consultation with RIBO broker Sharan Kaur.",
    name: "Business Insurance",
  },
  "travel-insurance": {
    title: "Travel Insurance Ontario | Sharan Kaur — RIBO Broker",
    description:
      "Get comprehensive travel insurance for trips from Ontario. Sharan Kaur compares Canada's top carriers for the best travel coverage.",
    name: "Travel Insurance",
  },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const meta = SERVICE_META[params.slug];

  if (!meta) {
    return {
      alternates: { canonical: `/services/${params.slug}` },
    };
  }

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/services/${params.slug}` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/services/${params.slug}`,
    },
  };
}

export default function ServiceSlugLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { slug: string };
}>) {
  const meta = SERVICE_META[params.slug];

  if (!meta) {
    return children;
  }

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${SITE_URL}/services/${params.slug}#service`,
        name: `${meta.name} in Mississauga`,
        description: meta.description,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: {
          "@type": "City",
          name: "Mississauga",
          addressRegion: "ON",
          addressCountry: "CA",
        },
        url: `${SITE_URL}/services/${params.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
          {
            "@type": "ListItem",
            position: 3,
            name: meta.name,
            item: `${SITE_URL}/services/${params.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {children}
    </>
  );
}
