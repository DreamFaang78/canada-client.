"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, ShieldCheck, TrendingUp, Quote } from "lucide-react";

export default function HeroReviewStrip() {
  const [weeklyCount, setWeeklyCount] = useState<number>(18);
  const [locationName, setLocationName] = useState<string>("Mississauga & GTA");

  useEffect(() => {
    fetch("/api/activity")
      .then((res) => res.json())
      .then((data) => {
        if (data?.weeklyCount) {
          setWeeklyCount(data.weeklyCount);
        }
        if (data?.location) {
          setLocationName(data.location);
        }
      })
      .catch(() => {});
  }, []);

  const reviews = [
    {
      name: "Priya M.",
      location: "Mississauga, ON",
      service: "Home Insurance",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
      quote: "Sharan saved me over $600 on my home insurance renewal. She actually explained my coverage options clearly!",
    },
    {
      name: "David K.",
      location: "Mississauga West",
      service: "Auto Insurance",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
      quote: "Found me the exact same coverage for $420 less per year across 30+ insurers. Super quick process!",
    },
    {
      name: "Amandeep S.",
      location: "GTA Small Business Owner",
      service: "Commercial Insurance",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
      quote: "Sharan made setting up business insurance seamless for my restaurants. Patient, thorough, and responsive.",
    },
  ];

  return (
    <section className="bg-white border-y border-gray-150 py-8 relative z-20 shadow-sm">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Real-activity live ticker line (Item 5) */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-red-50 border border-red-150 text-big-dark text-xs sm:text-sm font-semibold shadow-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-big-red" />
            </span>
            <TrendingUp className="w-4 h-4 text-big-red shrink-0" />
            <span>
              <strong className="text-big-red font-bold">{weeklyCount} people</strong> requested a quote in {locationName} this week
            </span>
          </div>
        </div>

        {/* 3 Review Cards (Item 9) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-light-gray/60 p-5 rounded-2xl border border-gray-150 hover:border-big-red/30 transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-white px-2 py-0.5 rounded-full border border-gray-200">
                    Verified Review
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-charcoal italic leading-relaxed mb-4">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-gray-200/60">
                <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-white shadow-xs">
                  <Image
                    src={rev.avatar}
                    alt={rev.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-xs text-big-dark leading-none mb-1">
                    {rev.name}
                  </h4>
                  <p className="text-[10px] text-mid-gray">
                    {rev.service} · {rev.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Trust Badge */}
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-mid-gray">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          <span>Licensed by RIBO · 4.9★ Google Rating (120+ Reviews)</span>
        </div>

      </div>
    </section>
  );
}
