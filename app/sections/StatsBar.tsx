"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { IconTrending } from "@/components/ui/BIGIcons";

const stats = [
  { value: 500, suffix: "+", label: "Clients Protected", prefix: "" },
  { value: 12, suffix: "+ Years", label: "Industry Experience", prefix: "" },
  { value: 15, suffix: "+", label: "Carrier Partners", prefix: "" },
  { value: 98, suffix: "%", label: "Client Satisfaction", prefix: "" },
];

export default function StatsBar() {
  return (
    <section className="bg-big-red py-12" aria-label="Stats">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/20">
          {stats.map((stat, i) => (
            <div key={i} className="text-center lg:px-8">
              <p className="font-poppins font-bold text-3xl sm:text-4xl text-white">
                <AnimatedCounter
                  target={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={2.5}
                />
              </p>
              <div className="flex items-center justify-center gap-1.5 mt-2">
                <IconTrending size={18} variant="bare" className="text-red-200" />
                <p className="text-sm text-red-100 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
