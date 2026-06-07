import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Free Insurance Quote — Sharan Kaur Mississauga",
  description:
    "Get a free, no-obligation insurance quote from Sharan Kaur. Compare home, auto, life & business rates from 30+ Ontario carriers in minutes.",
  alternates: { canonical: "/get-a-quote" },
};

export default function GetAQuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
