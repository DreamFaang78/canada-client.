declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export function trackConversion(eventName: string, properties: Record<string, any> = {}) {
  try {
    // 1. Google Analytics / Google Ads via gtag
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", eventName, properties);
    }

    // 2. Meta Pixel via fbq
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("trackCustom", eventName, properties);
    }

    // 3. Google Tag Manager / DataLayer
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        ...properties,
        timestamp: new Date().toISOString(),
      });
    }

    // 4. Optional backend event logging
    if (typeof window !== "undefined") {
      fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-analytics-consent": "true",
        },
        body: JSON.stringify({
          name: eventName,
          properties,
          page: window.location.pathname,
        }),
      }).catch(() => {});
    }
  } catch (err) {
    console.warn("Analytics error:", err);
  }
}
