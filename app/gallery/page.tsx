"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { X, Image as ImageIcon, Building, Users, Calendar } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
}

const FALLBACK_ITEMS: GalleryItem[] = [
  {
    id: "1",
    title: "Personal Client Consultations",
    description: "Sharan meeting with clients at the Mississauga branch to design custom coverage plans.",
    image_url: "/Consultation With Clients.jpeg",
    category: "office"
  },
  {
    id: "2",
    title: "Local Mississauga Expert",
    description: "Providing on-the-ground support and expert local insurance advice across the Peel Region.",
    image_url: "/Local Expert Outdoor.jpeg",
    category: "community"
  },
  {
    id: "3",
    title: "Professional Broker Profile",
    description: "RIBO licensed and dedicated to maintaining the highest industry standards of service excellence.",
    image_url: "/Personal Branding Headshot.jpeg",
    category: "office"
  },
  {
    id: "4",
    title: "Same-Day Quote Desk",
    description: "Operating from the Mississauga office to deliver fast, competitive comparisons across 30+ carriers.",
    image_url: "/Same-Day Quote Desk.jpeg",
    category: "office"
  },
  {
    id: "5",
    title: "Professional Networking & Outreach",
    description: "Connecting with community members and business owners in the Greater Toronto Area.",
    image_url: "/Elegant Social Media.jpeg",
    category: "community"
  },
  {
    id: "6",
    title: "Business Representation",
    description: "Representing Billyard Insurance Group (BIG) with modern commercial and personal insurance branding.",
    image_url: "/Business Card Mockup.jpeg",
    category: "events"
  }
];

const categoryLabels: Record<string, string> = {
  office: "Our Office",
  community: "Community Support",
  events: "Events & Awards"
};

const categoryIcons: Record<string, any> = {
  office: Building,
  community: Users,
  events: Calendar
};

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(FALLBACK_ITEMS);
  const [filter, setFilter] = useState<string>("all");
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("gallery_items")
          .select("id, title, description, image_url, category")
          .eq("is_active", true)
          .order("sort_order", { ascending: true });

        if (data && data.length > 0) {
          setItems(data);
        }
      } catch (err) {
        console.error("Error fetching gallery items:", err);
      }
    }
    fetchGallery();
  }, []);

  const filteredItems = items.filter(
    (item) => filter === "all" || item.category === filter
  );

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
            <span className="text-big-red font-semibold text-sm uppercase tracking-widest block mb-3">Gallery</span>
            <h1 className="font-poppins font-bold text-4xl sm:text-5xl mb-6">
              Our Community & Office
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl font-light leading-relaxed">
              Take a look inside the Mississauga branch and see how Sharan supports the Peel region.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-2.5 rounded-xl font-poppins font-bold text-xs border transition-all ${
              filter === "all"
                ? "bg-big-red text-white border-big-red shadow-sm"
                : "bg-white text-charcoal border-gray-200 hover:border-gray-300"
            }`}
          >
            Show All
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-5 py-2.5 rounded-xl font-poppins font-bold text-xs border transition-all flex items-center gap-1.5 ${
                filter === key
                  ? "bg-big-red text-white border-big-red shadow-sm"
                  : "bg-white text-charcoal border-gray-200 hover:border-gray-300"
              }`}
            >
              {categoryLabels[key]}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              const CatIcon = categoryIcons[item.category] || ImageIcon;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setActivePhoto(item)}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-150 shadow-sm hover:shadow-xl hover:border-big-red/10 transition-all group cursor-pointer flex flex-col justify-between h-96"
                >
                  <div className="relative overflow-hidden aspect-[4/3] bg-gray-100 shrink-0">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/95 text-big-dark text-xs font-poppins font-bold px-4 py-2 rounded-xl shadow-md">
                        Expand Photo
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-big-red mb-2">
                        <CatIcon className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                          {categoryLabels[item.category] || item.category}
                        </span>
                      </div>
                      <h3 className="font-poppins font-bold text-lg text-big-dark leading-tight group-hover:text-big-red transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-mid-gray leading-relaxed font-light mt-2 flex-1">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-all"
              aria-label="Close image lightroom"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <div className="md:w-3/5 bg-gray-950 aspect-[4/3] md:aspect-auto flex items-center">
                <img
                  src={activePhoto.image_url}
                  alt={activePhoto.title}
                  className="w-full h-full object-cover max-h-[80vh]"
                />
              </div>
              <div className="md:w-2/5 p-8 sm:p-10 flex flex-col justify-between bg-white text-big-dark">
                <div>
                  <span className="text-xs font-bold text-big-red uppercase tracking-wider block mb-2">
                    {categoryLabels[activePhoto.category] || activePhoto.category}
                  </span>
                  <h3 className="font-poppins font-bold text-2xl mb-4 leading-tight">
                    {activePhoto.title}
                  </h3>
                  <p className="text-sm text-mid-gray leading-relaxed font-light">
                    {activePhoto.description}
                  </p>
                </div>
                <div className="pt-6 border-t border-gray-100 text-xs text-mid-gray mt-6">
                  Billyard Insurance Group — Mississauga Branch
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
