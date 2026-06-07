import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sharanbroker.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api", "/api/*"]
    },
    // IndexNow verification key file: /public/sharanbroker-indexnow-2026-647501.txt
    //   served at ${baseUrl}/sharanbroker-indexnow-2026-647501.txt
    // AI citation file: ${baseUrl}/llms.txt
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  };
}
