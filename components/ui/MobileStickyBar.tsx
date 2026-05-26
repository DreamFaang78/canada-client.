"use client";

import Link from "next/link";
import { Phone, MessageSquare } from "lucide-react";

export default function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-2xl">
      <div className="grid grid-cols-2 h-14">
        <a
          href="tel:+16475018013"
          id="mobile-sticky-call"
          className="flex items-center justify-center gap-2 text-sm font-semibold text-big-red border-r border-gray-200 hover:bg-red-50 transition-colors active:bg-red-100"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
        <Link
          href="/get-a-quote"
          id="mobile-sticky-quote"
          className="flex items-center justify-center gap-2 text-sm font-semibold text-white bg-big-red hover:bg-deep-red transition-colors active:bg-deep-red"
        >
          <MessageSquare className="w-4 h-4" />
          Get a Quote
        </Link>
      </div>
    </div>
  );
}
