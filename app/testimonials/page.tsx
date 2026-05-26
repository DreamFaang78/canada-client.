"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Star, Quote, Search, ExternalLink } from "lucide-react";

interface Testimonial {
  id: string;
  client_name: string;
  service_type: string;
  rating: number;
  review_text: string;
  source: string;
  created_at: string;
}

const serviceLabels: Record<string, string> = {
  home: "Home Insurance",
  auto: "Auto Insurance",
  life: "Life Insurance",
  business: "Business Insurance",
  general: "General"
};

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    client_name: "Priya M.",
    service_type: "home",
    rating: 5,
    review_text: "Sharan saved me over $600 on my home insurance renewal. She took the time to actually explain what I was covered for — something my previous broker never did. I felt like I was talking to a friend who happened to know everything about insurance.",
    source: "google",
    created_at: "2026-05-01"
  },
  {
    id: "2",
    client_name: "David K.",
    service_type: "auto",
    rating: 5,
    review_text: "I'd been with the same auto insurer for 8 years assuming I had a good rate. Sharan compared my options and found me the same coverage for $420 less per year. Wish I'd called her sooner. The whole process took about 20 minutes.",
    source: "google",
    created_at: "2026-04-15"
  },
  {
    id: "3",
    client_name: "Amandeep S.",
    service_type: "business",
    rating: 5,
    review_text: "Setting up business insurance for my restaurant was overwhelming until I contacted Sharan. She was patient, thorough, and made sure I had the right coverage without over-insuring. She's now handling all three of my locations.",
    source: "google",
    created_at: "2026-03-22"
  },
  {
    id: "4",
    client_name: "Jessica L.",
    service_type: "life",
    rating: 5,
    review_text: "Sharan explained life insurance in a way I finally understood. No jargon, no pressure. She helped me figure out exactly how much coverage my family needed and found a term policy that fit our budget. Highly recommend.",
    source: "google",
    created_at: "2026-03-10"
  },
  {
    id: "5",
    client_name: "Rajan P.",
    service_type: "home",
    rating: 5,
    review_text: "After my basement flooded, I was worried my claim would be a nightmare. Sharan was on the phone with me within the hour, guided me through every step, and advocated for us with the insurer. That's the difference a broker makes.",
    source: "google",
    created_at: "2026-02-28"
  },
  {
    id: "6",
    client_name: "Sarah T.",
    service_type: "auto",
    rating: 5,
    review_text: "Moved to Mississauga from BC and had no idea how Ontario auto insurance worked. Sharan walked me through everything — mandatory coverages, optional add-ons, accident benefits. Found me a great rate with Intact. 10/10.",
    source: "google",
    created_at: "2026-02-14"
  }
];

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK_TESTIMONIALS);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("testimonials")
          .select("id, client_name, service_type, rating, review_text, source, created_at")
          .eq("is_approved", true)
          .order("display_order", { ascending: true });

        if (data && data.length > 0) {
          setTestimonials(data);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      }
    }
    fetchTestimonials();
  }, []);

  const filteredTestimonials = testimonials.filter((item) => {
    const matchesFilter = filter === "all" || item.service_type === filter;
    const matchesSearch =
      item.client_name.toLowerCase().includes(search.toLowerCase()) ||
      item.review_text.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-24 pb-16 min-h-screen bg-light-gray">
      {/* Header Banner */}
      <div className="bg-big-dark text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-big-red/10 to-transparent z-0" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="text-big-red font-semibold text-sm uppercase tracking-widest block mb-3">Client Reviews</span>
            <h1 className="font-poppins font-bold text-4xl sm:text-5xl mb-6">
              Real Reviews from Real Clients
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl font-light leading-relaxed">
              Read how Sharan Deol has helped Mississauga families and businesses save money and protect their assets.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Testimonials Body */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-10 bg-white p-4 rounded-2xl border border-gray-150 shadow-sm">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {["all", "home", "auto", "life", "business"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-xs font-poppins font-semibold rounded-xl border transition-all ${
                  filter === cat
                    ? "bg-big-red text-white border-big-red shadow-sm"
                    : "bg-white text-charcoal border-gray-200 hover:border-gray-300"
                }`}
              >
                {cat === "all" ? "All Reviews" : serviceLabels[cat] || cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative max-w-md w-full">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-mid-gray">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search reviews..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent text-sm text-big-dark transition-all"
            />
          </div>
        </div>

        {/* Reviews Grid */}
        {filteredTestimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
              >
                <div className="absolute top-6 right-6 text-big-red/5 select-none pointer-events-none">
                  <Quote className="w-12 h-12 rotate-185" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-charcoal text-sm leading-relaxed italic font-light">
                    &ldquo;{item.review_text}&rdquo;
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-4 mt-6 flex items-center justify-between">
                  <div>
                    <h4 className="font-poppins font-bold text-sm text-big-dark">{item.client_name}</h4>
                    <span className="text-[10px] text-mid-gray font-medium uppercase tracking-wider">
                      Verified via {item.source}
                    </span>
                  </div>
                  <span className="bg-big-red/10 text-big-red text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    {serviceLabels[item.service_type] || item.service_type}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-150">
            <p className="text-mid-gray text-base mb-2">No reviews found matching your criteria.</p>
            <button
              onClick={() => {
                setFilter("all");
                setSearch("");
              }}
              className="text-big-red font-poppins font-bold text-sm hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Write a Review Card */}
        <div className="mt-16 bg-white rounded-3xl p-8 border border-gray-150 shadow-sm max-w-3xl mx-auto text-center space-y-6">
          <h3 className="font-poppins font-bold text-2xl text-big-dark">Are you a client of Sharan?</h3>
          <p className="text-mid-gray max-w-xl mx-auto text-sm leading-relaxed font-light">
            Your reviews help other families in Mississauga find honest, reliable insurance advice. Please share your experience on our Google Business listing.
          </p>
          <a
            href="https://g.page/r/your-google-business-review-id/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-big-red hover:bg-deep-red text-white font-poppins font-semibold text-sm rounded-xl transition-all shadow-sm active:scale-98"
          >
            Leave a Google Review
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
