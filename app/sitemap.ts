import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sharanbroker.com";

  const lastModified: Record<string, string> = {
    "": "2026-06-07",
    "/about": "2026-06-01",
    "/services": "2026-06-01",
    "/services/home-insurance": "2026-06-01",
    "/services/auto-insurance": "2026-06-01",
    "/services/life-insurance": "2026-06-01",
    "/services/business-insurance": "2026-06-01",
    "/services/travel-insurance": "2026-06-01",
    "/testimonials": "2026-05-15",
    "/faq": "2026-05-15",
    "/contact": "2026-05-15",
    "/get-a-quote": "2026-05-15",
    "/gallery": "2026-05-15",
    "/privacy-policy": "2026-05-15",
    "/cookie-policy": "2026-05-15"
  };

  const priority: Record<string, number> = {
    "": 1.0,
    "/about": 0.8,
    "/services": 0.8,
    "/services/home-insurance": 0.9,
    "/services/auto-insurance": 0.9,
    "/services/life-insurance": 0.9,
    "/services/business-insurance": 0.9,
    "/services/travel-insurance": 0.9,
    "/testimonials": 0.8,
    "/faq": 0.7,
    "/contact": 0.7,
    "/get-a-quote": 0.8,
    "/gallery": 0.5,
    "/privacy-policy": 0.5,
    "/cookie-policy": 0.5
  };

  const staticPages = [
    "",
    "/about",
    "/services",
    "/testimonials",
    "/gallery",
    "/faq",
    "/contact",
    "/get-a-quote",
    "/privacy-policy",
    "/cookie-policy"
  ];

  const serviceSlugs = [
    "/services/home-insurance",
    "/services/auto-insurance",
    "/services/life-insurance",
    "/services/business-insurance",
    "/services/travel-insurance"
  ];

  const staticSitemaps = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(lastModified[route]),
    changeFrequency: (route === "" ? "daily" : "weekly") as "daily" | "weekly",
    priority: priority[route]
  }));

  const dynamicSitemaps = serviceSlugs.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(lastModified[route]),
    changeFrequency: "weekly" as const,
    priority: priority[route]
  }));

  return [...staticSitemaps, ...dynamicSitemaps];
}
