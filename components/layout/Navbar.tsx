"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconShield, IconPhone, IconDashboard, IconMenu, IconX, IconChevron
} from "@/components/ui/BIGIcons";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Home Insurance", href: "/services/home-insurance" },
      { label: "Auto Insurance", href: "/services/auto-insurance" },
      { label: "Life Insurance", href: "/services/life-insurance" },
      { label: "Business Insurance", href: "/services/business-insurance" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled || !isHome
            ? "bg-white/75 backdrop-blur-xl border-gray-200/50 shadow-md"
            : "bg-white/5 backdrop-blur-md border-white/10"
        }`}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/Logo (2).png"
                alt="Sharan Kaur Insurance Logo"
                className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform shrink-0"
              />
              <div className="hidden sm:flex flex-col leading-tight">
                <span className={`font-poppins font-bold text-sm transition-colors ${isScrolled || !isHome ? "text-big-dark" : "text-white"}`}>
                  Sharan Kaur
                </span>
                <span className={`text-[10px] font-medium tracking-wide transition-colors ${isScrolled || !isHome ? "text-mid-gray" : "text-white/60"}`}>
                  RIBO Licensed Broker
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isScrolled || !isHome
                          ? "text-charcoal hover:text-big-red hover:bg-red-50"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {link.label}
                      <IconChevron
                        size={14}
                        direction={openDropdown === link.label ? "up" : "down"}
                      />
                    </button>
                    <AnimatePresence>
                      {openDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1 overflow-hidden"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2.5 text-sm text-charcoal hover:bg-red-50 hover:text-big-red transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? "text-big-red font-semibold"
                        : isScrolled || !isHome
                        ? "text-charcoal hover:text-big-red hover:bg-red-50"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-2">
              <a
                href="tel:+16475018013"
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  isScrolled || !isHome
                    ? "text-charcoal hover:text-big-red"
                    : "text-white hover:text-red-300"
                }`}
              >
                <IconPhone size={16} variant="bare" className={isScrolled || !isHome ? "text-charcoal" : "text-white"} />
                (647) 501-8013
              </a>
              <div className={`w-px h-4 ${isScrolled || !isHome ? "bg-gray-300" : "bg-white/20"}`} />
              <Link
                href="/admin"
                title="Admin Portal"
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-all ${
                  isScrolled || !isHome
                    ? "text-mid-gray hover:text-big-dark hover:bg-gray-100"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                <IconDashboard size={14} className={isScrolled || !isHome ? "text-mid-gray" : "text-white/60"} />
                Admin
              </Link>
              <Link
                href="/get-a-quote"
                className="bg-big-red hover:bg-deep-red text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                Get a Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`lg:hidden p-2 rounded-md transition-colors ${
                isScrolled || !isHome
                  ? "text-charcoal hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
              id="mobile-menu-btn"
            >
              {isMobileOpen ? (
                <IconX size={24} />
              ) : (
                <IconMenu size={24} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-white pt-20 pb-8 px-6 overflow-y-auto lg:hidden"
          >
            <nav className="flex flex-col gap-1 mt-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.children ? (
                    <>
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === link.label ? null : link.label
                          )
                        }
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-charcoal hover:bg-red-50 hover:text-big-red font-medium"
                      >
                        {link.label}
                        <IconChevron
                          size={16}
                          direction={openDropdown === link.label ? "up" : "down"}
                        />
                      </button>
                      <AnimatePresence>
                        {openDropdown === link.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4"
                          >
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block px-4 py-2.5 text-sm text-mid-gray hover:text-big-red rounded-lg transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                        pathname === link.href
                          ? "bg-red-50 text-big-red"
                          : "text-charcoal hover:bg-red-50 hover:text-big-red"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href="tel:+16475018013"
                className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-big-red text-big-red font-semibold rounded-xl hover:bg-red-50 transition-colors"
              >
                <IconPhone size={16} variant="bare" className="text-big-red" />
                (647) 501-8013
              </a>
              <Link
                href="/get-a-quote"
                className="bg-big-red text-white font-semibold px-6 py-3 rounded-xl text-center hover:bg-deep-red transition-colors"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/admin"
                className="flex items-center justify-center gap-2 px-6 py-2.5 border border-gray-200 text-mid-gray text-xs font-semibold rounded-xl hover:bg-gray-50 hover:text-charcoal transition-colors"
              >
                <IconDashboard size={14} className="text-mid-gray" />
                Admin Portal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
