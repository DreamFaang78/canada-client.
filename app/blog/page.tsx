import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import QuoteButton from "@/components/ui/QuoteButton";

export const metadata: Metadata = {
  title: "Insurance Guides & Tips for Ontario | Sharan Kaur Insurance Blog",
  description:
    "Practical insurance guides for newcomers, G2 drivers, first-time home buyers, and new immigrants in Ontario — written by RIBO-licensed broker Sharan Kaur.",
  alternates: { canonical: "/blog" },
};

const posts = [
  {
    slug: "life-insurance-new-immigrants-canada",
    title: "Life Insurance for New Immigrants to Canada: A Beginner's Guide",
    description:
      "New immigrants to Canada can get life insurance soon after arrival. Learn the difference between term and permanent coverage and how to get bilingual help in Punjabi.",
    date: "2026-03-19",
  },
  {
    slug: "home-insurance-first-time-buyers-mississauga",
    title: "Home Insurance for First-Time Buyers in Mississauga: What You Need to Know",
    description:
      "First-time home buyers in Mississauga need home insurance before closing. Learn what's covered, common add-ons, and how to get the best rate from a RIBO-licensed broker.",
    date: "2026-03-05",
  },
  {
    slug: "g2-driver-car-insurance-mississauga",
    title: "G2 Driver Car Insurance in Mississauga: How to Get Affordable Rates",
    description:
      "G2 drivers in Mississauga pay higher car insurance rates due to limited experience. Learn how to lower your premium with a RIBO-licensed broker comparing 30+ carriers.",
    date: "2026-02-18",
  },
  {
    slug: "insurance-broker-vs-agent-ontario",
    title: "Insurance Broker vs. Insurance Agent in Ontario: What's the Difference?",
    description:
      "An insurance broker in Ontario works for you and compares 30+ carriers; an agent works for one company. Learn the key differences and why RIBO licensing matters.",
    date: "2026-02-03",
  },
  {
    slug: "auto-insurance-international-license-ontario",
    title: "Can You Get Auto Insurance in Ontario With an International Driver's License?",
    description:
      "Yes — you can get auto insurance in Ontario with an international driver's license. Learn how it works and how to find the best rate with a RIBO-licensed broker.",
    date: "2026-01-22",
  },
  {
    slug: "car-insurance-newcomers-ontario",
    title: "Car Insurance for Newcomers to Ontario: A Complete Guide",
    description:
      "Newcomers to Ontario can get car insurance the same day, even without Canadian driving history. Learn how to find affordable rates with a RIBO-licensed broker.",
    date: "2026-01-15",
  },
];

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function BlogIndexPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-light-gray">
      {/* Hero Header */}
      <div className="bg-big-dark text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-big-red/10 to-transparent z-0" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-big-red font-semibold text-sm uppercase tracking-widest block mb-3">
              Insurance Blog
            </span>
            <h1 className="font-poppins font-bold text-4xl sm:text-5xl mb-6">
              Insurance Guides & Tips for Ontario
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl font-light leading-relaxed">
              Practical, plain-language guides on home, auto, and life insurance —
              written by RIBO-licensed broker Sharan Kaur for newcomers, drivers, and
              homeowners across the GTA.
            </p>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-3xl p-8 shadow-md border border-gray-150 flex flex-col justify-between hover:shadow-xl hover:border-big-red/20 transition-all group"
            >
              <div>
                <time
                  dateTime={post.date}
                  className="text-xs text-mid-gray font-semibold uppercase tracking-wider"
                >
                  {dateFormatter.format(new Date(post.date))}
                </time>
                <h2 className="font-poppins font-bold text-2xl text-big-dark group-hover:text-big-red transition-colors mt-3 mb-3">
                  {post.title}
                </h2>
                <p className="text-mid-gray leading-relaxed font-light">
                  {post.description}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-poppins font-bold text-big-red mt-6">
                Read More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-mid-gray mb-4 font-light">
            Have a question that isn't covered here?
          </p>
          <QuoteButton href="/get-a-quote">Get a Free Quote</QuoteButton>
        </div>
      </div>
    </div>
  );
}
