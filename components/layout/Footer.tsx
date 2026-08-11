import Link from "next/link";
import Image from "next/image";
import {
  IconShield, IconPhone, IconMail, IconMapPin, IconClock,
} from "@/components/ui/BIGIcons";

const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);


const serviceLinks = [
  { label: "Home Insurance", href: "/services/home-insurance" },
  { label: "Auto Insurance", href: "/services/auto-insurance" },
  { label: "Life Insurance", href: "/services/life-insurance" },
  { label: "Business Insurance", href: "/services/business-insurance" },
  { label: "Travel Insurance", href: "/services/travel-insurance" },
];

const quickLinks = [
  { label: "About Sharan Kaur", href: "/about" },
  { label: "Get a Quote", href: "/get-a-quote" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-big-dark text-white">
      {/* Main footer grid */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center mb-5">
              <Image
                src="/Logo (2).png"
                alt="Sharan Kaur Insurance Logo"
                width={160}
                height={48}
                className="h-12 w-auto object-contain shrink-0"
              />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-2">
              Sharan Kaur is a licensed RIBO insurance broker serving
              Mississauga and the Greater Toronto Area with personalized
              insurance solutions.
            </p>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Independent Insurance Brokerage · Mississauga West
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/sharankaurinsurance"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-big-red flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/sharankaur"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-big-red flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/sharankaurinsurance"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-big-red flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services column */}
          <div>
            <h3 className="font-poppins font-semibold text-sm uppercase tracking-wider text-white/40 mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-red-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links column */}
          <div>
            <h3 className="font-poppins font-semibold text-sm uppercase tracking-wider text-white/40 mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-red-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="font-poppins font-semibold text-sm uppercase tracking-wider text-white/40 mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+16475018013"
                  className="flex items-start gap-3 text-sm text-white/70 hover:text-red-400 transition-colors"
                >
                  <IconPhone size={14} variant="bare" className="mt-0.5 shrink-0 text-white/70" />
                  (647) 501-8013
                </a>
              </li>
              <li>
                <a
                  href="mailto:sharan@thebig.ca"
                  className="flex items-start gap-3 text-sm text-white/70 hover:text-red-400 transition-colors"
                >
                  <IconMail size={14} variant="bare" className="mt-0.5 shrink-0 text-white/70" />
                  sharan@thebig.ca
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <IconMapPin size={14} variant="bare" className="mt-0.5 shrink-0 text-big-red" />
                105D-135 Matheson Blvd West
                <br />
                Mississauga, ON L5R 3L1
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <IconClock size={14} variant="bare" className="mt-0.5 shrink-0 text-big-red" />
                <div>
                  <p>Mon–Fri: 9:00 AM – 6:00 PM</p>
                  <p>Saturday: 10:00 AM – 3:00 PM</p>
                  <p>Sunday: By appointment only</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Sharan Kaur Insurance. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <Link href="/privacy-policy" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="hover:text-white/70 transition-colors">
              Cookie Policy
            </Link>
            <span>RIBO Licensed Broker</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
