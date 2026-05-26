import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thebig.ca";

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
    "/services/business-insurance"
  ];

  const staticSitemaps = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" ? "daily" : "weekly") as "daily" | "weekly",
    priority: route === "" ? 1.0 : 0.8
  }));

  const dynamicSitemaps = serviceSlugs.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9
  }));

  return [...staticSitemaps, ...dynamicSitemaps];
}
