"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevron, IconQuoteDecor } from "@/components/ui/BIGIcons";
import { createClient } from "@/lib/supabase/client";

interface Testimonial {
  id: string;
  client_name: string;
  service_type: string;
  rating: number;
  review_text: string;
  source: string;
}

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    client_name: "Priya M.",
    service_type: "home",
    rating: 5,
    review_text: "Sharan saved me over $600 on my home insurance renewal. She took the time to actually explain what I was covered for — something my previous broker never did. I felt like I was talking to a friend who happened to know everything about insurance.",
    source: "google"
  },
  {
    id: "2",
    client_name: "David K.",
    service_type: "auto",
    rating: 5,
    review_text: "I'd been with the same auto insurer for 8 years assuming I had a good rate. Sharan compared my options and found me the same coverage for $420 less per year. Wish I'd called her sooner. The whole process took about 20 minutes.",
    source: "google"
  },
  {
    id: "3",
    client_name: "Amandeep S.",
    service_type: "business",
    rating: 5,
    review_text: "Setting up business insurance for my restaurant was overwhelming until I contacted Sharan. She was patient, thorough, and made sure I had the right coverage without over-insuring. She's now handling all three of my locations.",
    source: "google"
  },
  {
    id: "4",
    client_name: "Rajan P.",
    service_type: "home",
    rating: 5,
    review_text: "After my basement flooded, I was worried my claim would be a nightmare. Sharan was on the phone with me within the hour, guided me through every step, and advocated for us with the insurer. That's the difference a broker makes.",
    source: "google"
  }
];

const serviceLabels: Record<string, string> = {
  home: "Home Insurance",
  auto: "Auto Insurance",
  life: "Life Insurance",
  business: "Business Insurance",
  general: "General"
};

export default function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK_TESTIMONIALS);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1: left, 1: right
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("testimonials")
          .select("id, client_name, service_type, rating, review_text, source")
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

  const startTimer = (length: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 8000);
  };

  useEffect(() => {
    startTimer(testimonials.length);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [testimonials.length]);

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    startTimer(testimonials.length);
  };

  const handleNext = () => {
    setDirection(1);
    setIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    startTimer(testimonials.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0
    })
  };

  const current = testimonials[index];

  return (
    <section className="section-padding bg-light-gray relative overflow-hidden" id="testimonials">
      <div className="absolute top-0 right-0 w-96 h-96 bg-big-red/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-big-dark/5 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-14">
          <p className="text-big-red font-semibold text-sm uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-big-dark">
            What Mississauga Thinks of <span className="text-big-red">Sharan Deol</span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[380px] sm:min-h-[300px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 max-w-3xl w-full relative flex flex-col md:flex-row gap-6 md:gap-10 items-start"
            >
              {/* Large quote mark decoration */}
              <div className="absolute top-6 right-8 text-big-red/10 shrink-0 select-none">
                <IconQuoteDecor size={80} />
              </div>

              {/* Left Column: client and service */}
              <div className="md:w-1/3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <svg key={i} width={18} height={18} viewBox="0 0 24 24" fill="#FBBF24" className="text-amber-400">
                        <path d="M12 2l2.93 6.07L22 9.27l-5 4.91 1.18 6.92L12 17.77l-6.18 3.33L7 14.18 2 9.27l7.07-1.2L12 2z" stroke="#F59E0B" strokeWidth="0.5"/>
                      </svg>
                    ))}
                  </div>
                  <h3 className="font-poppins font-bold text-xl text-big-dark">{current.client_name}</h3>
                  <span className="inline-block bg-big-red/10 text-big-red text-xs font-semibold px-3 py-1 rounded-full w-max">
                    {serviceLabels[current.service_type] || current.service_type}
                  </span>
                  <span className="text-xs text-mid-gray mt-2 flex items-center gap-1">
                    Verified via {current.source === "google" ? "Google Reviews" : "Client Form"}
                  </span>
                </div>
              </div>

              {/* Right Column: review text */}
              <div className="md:w-2/3 flex flex-col justify-between h-full pt-4 md:pt-0">
                <p className="text-charcoal text-lg italic leading-relaxed font-light">
                  &ldquo;{current.review_text}&rdquo;
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="absolute -bottom-16 left-0 right-0 flex justify-center gap-4">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-charcoal hover:bg-big-red hover:text-white hover:border-big-red transition-all active:scale-95"
              aria-label="Previous testimonial"
            >
              <IconChevron size={20} direction="left" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-charcoal hover:bg-big-red hover:text-white hover:border-big-red transition-all active:scale-95"
              aria-label="Next testimonial"
            >
              <IconChevron size={20} direction="right" />
            </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-20">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
                startTimer(testimonials.length);
              }}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-8 bg-big-red" : "w-2.5 bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
