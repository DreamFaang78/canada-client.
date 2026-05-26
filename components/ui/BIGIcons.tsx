/**
 * BIG Insurance — Custom Glassmorphism SVG Icon Library
 * All icons are hand-coded SVG paths. No external images or icon packages needed.
 * Each icon wraps a crisp SVG inside a stylised glassmorphism container.
 */

import React from "react";

interface IconProps {
  size?: number;
  className?: string;
  /** Glass container variant */
  variant?: "glass-dark" | "glass-light" | "solid-red" | "solid-navy" | "bare";
}

// ─── Shared glass-container wrapper ────────────────────────────────────────────
function GlassWrap({
  size,
  variant = "glass-dark",
  children,
  className = "",
}: {
  size: number;
  variant: IconProps["variant"];
  children: React.ReactNode;
  className?: string;
}) {
  const base = `flex-shrink-0 inline-flex items-center justify-center rounded-2xl transition-all duration-300 ${className}`;

  const styles: Record<string, string> = {
    "glass-dark":
      "bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_4px_24px_rgba(192,57,43,0.15)] hover:bg-white/15 hover:border-white/30",
    "glass-light":
      "bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:bg-white/80",
    "solid-red":
      "bg-gradient-to-br from-[#C0392B] to-[#922B21] shadow-[0_4px_20px_rgba(192,57,43,0.4)] hover:shadow-[0_6px_28px_rgba(192,57,43,0.55)] hover:-translate-y-0.5",
    "solid-navy":
      "bg-gradient-to-br from-[#1A1A2E] to-[#0F3460] shadow-[0_4px_20px_rgba(15,52,96,0.4)] hover:shadow-[0_6px_28px_rgba(15,52,96,0.55)] hover:-translate-y-0.5",
    bare: "",
  };

  return (
    <span
      className={`${base} ${styles[variant!]}`}
      style={{ width: size, height: size }}
    >
      {children}
    </span>
  );
}

// ─── 1. HOME / HOUSE ──────────────────────────────────────────────────────────
export function IconHome({ size = 48, className, variant = "glass-dark" }: IconProps) {
  const s = Math.round(size * 0.44);
  return (
    <GlassWrap size={size} variant={variant} className={className}>
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path
          d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
          fill="url(#homeGrad)"
          fillOpacity="0.9"
        />
        <path
          d="M9 22V12h6v10"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M3 9.5L12 3l9 6.5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Chimney detail */}
        <rect x="15" y="4" width="2" height="4" rx="0.5" fill="white" fillOpacity="0.6" />
        {/* Shine */}
        <path
          d="M5 12l7-5 7 5"
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity="0.4"
        />
        <defs>
          <linearGradient id="homeGrad" x1="3" y1="3" x2="21" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C0392B" />
            <stop offset="1" stopColor="#922B21" />
          </linearGradient>
        </defs>
      </svg>
    </GlassWrap>
  );
}

// ─── 2. CAR / AUTO ────────────────────────────────────────────────────────────
export function IconCar({ size = 48, className, variant = "glass-dark" }: IconProps) {
  const s = Math.round(size * 0.44);
  return (
    <GlassWrap size={size} variant={variant} className={className}>
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path
          d="M5 11l2-5h10l2 5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <rect x="2" y="11" width="20" height="7" rx="2" fill="url(#carGrad)" fillOpacity="0.85" />
        <rect x="2" y="11" width="20" height="7" rx="2" stroke="white" strokeWidth="1.2" strokeOpacity="0.6" />
        {/* Windscreen */}
        <path d="M6.5 11l1.5-4h8l1.5 4" fill="url(#glassGrad)" fillOpacity="0.4" />
        {/* Wheels */}
        <circle cx="7" cy="18" r="2.2" fill="#1A1A2E" stroke="white" strokeWidth="1.2" />
        <circle cx="17" cy="18" r="2.2" fill="#1A1A2E" stroke="white" strokeWidth="1.2" />
        <circle cx="7" cy="18" r="0.8" fill="white" fillOpacity="0.6" />
        <circle cx="17" cy="18" r="0.8" fill="white" fillOpacity="0.6" />
        {/* Windows */}
        <rect x="8" y="12" width="3.5" height="2.5" rx="0.5" fill="white" fillOpacity="0.35" />
        <rect x="12.5" y="12" width="3.5" height="2.5" rx="0.5" fill="white" fillOpacity="0.35" />
        <defs>
          <linearGradient id="carGrad" x1="2" y1="11" x2="22" y2="18" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C0392B" />
            <stop offset="1" stopColor="#922B21" />
          </linearGradient>
          <linearGradient id="glassGrad" x1="6" y1="7" x2="18" y2="11" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60A5FA" />
            <stop offset="1" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      </svg>
    </GlassWrap>
  );
}

// ─── 3. HEART / LIFE ──────────────────────────────────────────────────────────
export function IconHeart({ size = 48, className, variant = "glass-dark" }: IconProps) {
  const s = Math.round(size * 0.44);
  return (
    <GlassWrap size={size} variant={variant} className={className}>
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 21C12 21 3 14.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 13 5.08C14.09 3.81 15.76 3 17.5 3C20.58 3 23 5.42 23 8.5C23 14.5 12 21 12 21Z"
          fill="url(#heartGrad)"
          fillOpacity="0.9"
          stroke="white"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* EKG/pulse line inside heart */}
        <path
          d="M7 11h2l1-2.5 2 5 1-2.5h2"
          stroke="white"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.85"
        />
        {/* Highlight gloss */}
        <path
          d="M8 6.5C8 6.5 10 5 12 6.5"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
          strokeOpacity="0.5"
        />
        <defs>
          <linearGradient id="heartGrad" x1="3" y1="3" x2="23" y2="21" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C0392B" />
            <stop offset="1" stopColor="#6B1010" />
          </linearGradient>
        </defs>
      </svg>
    </GlassWrap>
  );
}

// ─── 4. BUILDING / BUSINESS ───────────────────────────────────────────────────
export function IconBuilding({ size = 48, className, variant = "glass-dark" }: IconProps) {
  const s = Math.round(size * 0.44);
  return (
    <GlassWrap size={size} variant={variant} className={className}>
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        {/* Main building */}
        <rect x="3" y="6" width="18" height="16" rx="1.5" fill="url(#buildGrad)" fillOpacity="0.85" />
        <rect x="3" y="6" width="18" height="16" rx="1.5" stroke="white" strokeWidth="1.2" strokeOpacity="0.6" />
        {/* Roof / fascia */}
        <rect x="1" y="4" width="22" height="3" rx="1" fill="url(#buildTopGrad)" />
        {/* Windows grid */}
        <rect x="6" y="9" width="3" height="2.5" rx="0.5" fill="white" fillOpacity="0.4" />
        <rect x="10.5" y="9" width="3" height="2.5" rx="0.5" fill="white" fillOpacity="0.4" />
        <rect x="15" y="9" width="3" height="2.5" rx="0.5" fill="white" fillOpacity="0.4" />
        <rect x="6" y="13.5" width="3" height="2.5" rx="0.5" fill="white" fillOpacity="0.4" />
        <rect x="10.5" y="13.5" width="3" height="2.5" rx="0.5" fill="white" fillOpacity="0.4" />
        <rect x="15" y="13.5" width="3" height="2.5" rx="0.5" fill="white" fillOpacity="0.4" />
        {/* Door */}
        <rect x="9.5" y="17" width="5" height="5" rx="0.8" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="0.8" strokeOpacity="0.5" />
        {/* Flag pole */}
        <line x1="12" y1="1" x2="12" y2="4" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7" />
        <path d="M12 1.5l3 1-3 1z" fill="#C0392B" />
        <defs>
          <linearGradient id="buildGrad" x1="3" y1="6" x2="21" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2C3E50" />
            <stop offset="1" stopColor="#1A1A2E" />
          </linearGradient>
          <linearGradient id="buildTopGrad" x1="1" y1="4" x2="23" y2="7" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C0392B" />
            <stop offset="1" stopColor="#922B21" />
          </linearGradient>
        </defs>
      </svg>
    </GlassWrap>
  );
}

// ─── 5. SHIELD / PROTECTION ───────────────────────────────────────────────────
export function IconShield({ size = 48, className, variant = "glass-dark" }: IconProps) {
  const s = Math.round(size * 0.44);
  return (
    <GlassWrap size={size} variant={variant} className={className}>
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L4 5.5V12C4 16.42 7.56 20.57 12 22C16.44 20.57 20 16.42 20 12V5.5L12 2Z"
          fill="url(#shieldGrad)"
          fillOpacity="0.9"
        />
        <path
          d="M12 2L4 5.5V12C4 16.42 7.56 20.57 12 22C16.44 20.57 20 16.42 20 12V5.5L12 2Z"
          stroke="white"
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeOpacity="0.7"
        />
        {/* Checkmark */}
        <path
          d="M8 12l3 3 5-5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Gloss highlight */}
        <path
          d="M7 6l5-2 5 2"
          stroke="white"
          strokeWidth="0.6"
          strokeOpacity="0.4"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="shieldGrad" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C0392B" />
            <stop offset="1" stopColor="#6B1010" />
          </linearGradient>
        </defs>
      </svg>
    </GlassWrap>
  );
}

// ─── 6. PHONE ─────────────────────────────────────────────────────────────────
export function IconPhone({ size = 48, className, variant = "glass-dark" }: IconProps) {
  const s = Math.round(size * 0.44);
  return (
    <GlassWrap size={size} variant={variant} className={className}>
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <rect x="5" y="2" width="14" height="20" rx="3" fill="url(#phoneGrad)" fillOpacity="0.85" stroke="white" strokeWidth="1.2" strokeOpacity="0.5" />
        {/* Screen */}
        <rect x="7" y="5" width="10" height="12" rx="1" fill="white" fillOpacity="0.2" />
        {/* Signal wave inside screen */}
        <path d="M9 14c0-1.66 1.34-3 3-3s3 1.34 3 3" stroke="white" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.7" />
        <path d="M7.5 15.5c0-2.49 2.01-4.5 4.5-4.5s4.5 2.01 4.5 4.5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.4" />
        <circle cx="12" cy="17" r="0.8" fill="white" fillOpacity="0.8" />
        {/* Home button */}
        <circle cx="12" cy="20.5" r="0.7" stroke="white" strokeWidth="0.8" strokeOpacity="0.5" />
        {/* Speaker */}
        <rect x="9.5" y="3" width="5" height="1" rx="0.5" fill="white" fillOpacity="0.5" />
        <defs>
          <linearGradient id="phoneGrad" x1="5" y1="2" x2="19" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C0392B" />
            <stop offset="1" stopColor="#1A1A2E" />
          </linearGradient>
        </defs>
      </svg>
    </GlassWrap>
  );
}

// ─── 7. MAIL / EMAIL ──────────────────────────────────────────────────────────
export function IconMail({ size = 48, className, variant = "glass-dark" }: IconProps) {
  const s = Math.round(size * 0.44);
  return (
    <GlassWrap size={size} variant={variant} className={className}>
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="2.5" fill="url(#mailGrad)" fillOpacity="0.85" />
        <rect x="2" y="5" width="20" height="14" rx="2.5" stroke="white" strokeWidth="1.2" strokeOpacity="0.5" />
        {/* Envelope flap */}
        <path d="M2 7l10 7 10-7" stroke="white" strokeWidth="1.4" strokeLinejoin="round" strokeOpacity="0.9" />
        {/* Fold lines */}
        <path d="M2 19l7-6M22 19l-7-6" stroke="white" strokeWidth="0.8" strokeOpacity="0.35" />
        {/* Seal dot */}
        <circle cx="12" cy="12" r="1.2" fill="white" fillOpacity="0.4" />
        <defs>
          <linearGradient id="mailGrad" x1="2" y1="5" x2="22" y2="19" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C0392B" />
            <stop offset="1" stopColor="#922B21" />
          </linearGradient>
        </defs>
      </svg>
    </GlassWrap>
  );
}

// ─── 8. MAP PIN / LOCATION ────────────────────────────────────────────────────
export function IconMapPin({ size = 48, className, variant = "glass-dark" }: IconProps) {
  const s = Math.round(size * 0.44);
  return (
    <GlassWrap size={size} variant={variant} className={className}>
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
          fill="url(#pinGrad)"
          fillOpacity="0.9"
          stroke="white"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="9" r="2.8" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="1.2" />
        <circle cx="12" cy="9" r="1.2" fill="white" fillOpacity="0.7" />
        {/* Shadow ellipse */}
        <ellipse cx="12" cy="22" rx="3.5" ry="0.8" fill="black" fillOpacity="0.12" />
        <defs>
          <linearGradient id="pinGrad" x1="5" y1="2" x2="19" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C0392B" />
            <stop offset="1" stopColor="#6B1010" />
          </linearGradient>
        </defs>
      </svg>
    </GlassWrap>
  );
}

// ─── 9. CLOCK ─────────────────────────────────────────────────────────────────
export function IconClock({ size = 48, className, variant = "glass-dark" }: IconProps) {
  const s = Math.round(size * 0.44);
  return (
    <GlassWrap size={size} variant={variant} className={className}>
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9.5" fill="url(#clockGrad)" fillOpacity="0.85" stroke="white" strokeWidth="1.2" strokeOpacity="0.5" />
        {/* Tick marks */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
          const r = deg * Math.PI / 180;
          const isMajor = i % 3 === 0;
          const r1 = isMajor ? 7.5 : 8;
          const r2 = 9;
          return (
            <line
              key={deg}
              x1={12 + r1 * Math.sin(r)} y1={12 - r1 * Math.cos(r)}
              x2={12 + r2 * Math.sin(r)} y2={12 - r2 * Math.cos(r)}
              stroke="white"
              strokeWidth={isMajor ? 1.2 : 0.7}
              strokeOpacity={isMajor ? 0.8 : 0.4}
              strokeLinecap="round"
            />
          );
        })}
        {/* Hour hand — pointing ~10 o'clock */}
        <line x1="12" y1="12" x2="8.5" y2="7.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
        {/* Minute hand — pointing ~2 o'clock */}
        <line x1="12" y1="12" x2="16" y2="9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        {/* Centre dot */}
        <circle cx="12" cy="12" r="1.3" fill="white" />
        <defs>
          <linearGradient id="clockGrad" x1="2.5" y1="2.5" x2="21.5" y2="21.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2C3E50" />
            <stop offset="1" stopColor="#1A1A2E" />
          </linearGradient>
        </defs>
      </svg>
    </GlassWrap>
  );
}

// ─── 10. STAR ─────────────────────────────────────────────────────────────────
export function IconStar({ size = 48, className, variant = "glass-dark" }: IconProps) {
  const s = Math.round(size * 0.44);
  return (
    <GlassWrap size={size} variant={variant} className={className}>
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l2.93 6.07L22 9.27l-5 4.91 1.18 6.92L12 17.77l-6.18 3.33L7 14.18 2 9.27l7.07-1.2L12 2z"
          fill="url(#starGrad)"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.5"
          strokeLinejoin="round"
        />
        {/* Shine */}
        <path d="M10 6l1.5 3" stroke="white" strokeWidth="0.8" strokeOpacity="0.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="starGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBBF24" />
            <stop offset="1" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
      </svg>
    </GlassWrap>
  );
}

// ─── 11. USERS / CLIENTS ──────────────────────────────────────────────────────
export function IconUsers({ size = 48, className, variant = "glass-dark" }: IconProps) {
  const s = Math.round(size * 0.44);
  return (
    <GlassWrap size={size} variant={variant} className={className}>
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        {/* Back person */}
        <circle cx="17" cy="8" r="3" fill="url(#usersGrad2)" fillOpacity="0.6" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
        <path d="M22 20c0-2.76-2.24-5-5-5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.5" />
        {/* Front person */}
        <circle cx="9" cy="7" r="4" fill="url(#usersGrad1)" stroke="white" strokeWidth="1.2" strokeOpacity="0.7" />
        <path d="M2 21c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
        {/* Highlight */}
        <path d="M7 5c0-1 1-2 2-2" stroke="white" strokeWidth="0.9" strokeLinecap="round" strokeOpacity="0.5" />
        <defs>
          <linearGradient id="usersGrad1" x1="5" y1="3" x2="13" y2="11" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C0392B" />
            <stop offset="1" stopColor="#922B21" />
          </linearGradient>
          <linearGradient id="usersGrad2" x1="14" y1="5" x2="20" y2="11" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2C3E50" />
            <stop offset="1" stopColor="#1A1A2E" />
          </linearGradient>
        </defs>
      </svg>
    </GlassWrap>
  );
}

// ─── 12. AWARD / BADGE ────────────────────────────────────────────────────────
export function IconAward({ size = 48, className, variant = "glass-dark" }: IconProps) {
  const s = Math.round(size * 0.44);
  return (
    <GlassWrap size={size} variant={variant} className={className}>
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="9" r="7" fill="url(#awardGrad)" fillOpacity="0.85" stroke="white" strokeWidth="1.2" strokeOpacity="0.6" />
        {/* Star inside */}
        <path
          d="M12 5.5l1.1 2.3 2.5.35-1.8 1.77.43 2.5L12 11.25l-2.23 1.17.43-2.5-1.8-1.77 2.5-.35z"
          fill="white"
          fillOpacity="0.9"
        />
        {/* Ribbon left */}
        <path d="M8 15.5L5 22l4-1.5 2 2 1-4" fill="url(#ribbonGrad)" fillOpacity="0.8" />
        {/* Ribbon right */}
        <path d="M16 15.5L19 22l-4-1.5-2 2-1-4" fill="url(#ribbonGrad)" fillOpacity="0.8" />
        {/* Gloss */}
        <path d="M8 6.5c0-1.38 1.8-2.5 4-2.5" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="awardGrad" x1="5" y1="2" x2="19" y2="16" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C0392B" />
            <stop offset="1" stopColor="#6B1010" />
          </linearGradient>
          <linearGradient id="ribbonGrad" x1="5" y1="15" x2="19" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C0392B" />
            <stop offset="1" stopColor="#922B21" />
          </linearGradient>
        </defs>
      </svg>
    </GlassWrap>
  );
}

// ─── 13. TRENDING UP / CHART ──────────────────────────────────────────────────
export function IconTrending({ size = 48, className, variant = "glass-dark" }: IconProps) {
  const s = Math.round(size * 0.44);
  return (
    <GlassWrap size={size} variant={variant} className={className}>
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        {/* Area fill */}
        <path d="M3 17l5-5 4 3 5-6 4-3V18H3z" fill="url(#trendArea)" fillOpacity="0.35" />
        {/* Line */}
        <path d="M3 17l5-5 4 3 5-6 4-3" stroke="url(#trendLine)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Arrow */}
        <path d="M17 6h4v4" stroke="url(#trendLine)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Data points */}
        <circle cx="8" cy="12" r="1.5" fill="white" />
        <circle cx="12" cy="15" r="1.5" fill="white" />
        <circle cx="17" cy="9" r="1.5" fill="white" />
        {/* Axis */}
        <line x1="3" y1="19" x2="21" y2="19" stroke="white" strokeWidth="0.7" strokeOpacity="0.3" />
        <defs>
          <linearGradient id="trendLine" x1="3" y1="6" x2="21" y2="17" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C0392B" />
            <stop offset="1" stopColor="#FBBF24" />
          </linearGradient>
          <linearGradient id="trendArea" x1="3" y1="6" x2="3" y2="18" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C0392B" />
            <stop offset="1" stopColor="#C0392B" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </GlassWrap>
  );
}

// ─── 14. CHECKMARK / VERIFY ───────────────────────────────────────────────────
export function IconCheck({ size = 48, className, variant = "glass-dark" }: IconProps) {
  const s = Math.round(size * 0.44);
  return (
    <GlassWrap size={size} variant={variant} className={className}>
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9.5" fill="url(#checkGrad)" fillOpacity="0.85" stroke="white" strokeWidth="1.2" strokeOpacity="0.4" />
        <path d="M7 12l3.5 3.5 6.5-7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Glow */}
        <circle cx="12" cy="12" r="9.5" stroke="url(#checkGlow)" strokeWidth="0.5" />
        <defs>
          <linearGradient id="checkGrad" x1="2.5" y1="2.5" x2="21.5" y2="21.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C0392B" />
            <stop offset="1" stopColor="#6B1010" />
          </linearGradient>
          <linearGradient id="checkGlow" x1="2.5" y1="2.5" x2="21.5" y2="21.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.4" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </GlassWrap>
  );
}

// ─── 15. QUOTE MARK (Testimonials) ────────────────────────────────────────────
export function IconQuote({ size = 48, className, variant = "bare" }: IconProps) {
  const s = Math.round(size * 0.9);
  return (
    <GlassWrap size={size} variant={variant} className={className}>
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path d="M3 21l3-9H3V6h6v6l-3 9H3zm12 0l3-9h-3V6h6v6l-3 9h-3z" fill="currentColor" fillOpacity="0.15" />
      </svg>
    </GlassWrap>
  );
}

// ─── 16. MENU (Hamburger) ─────────────────────────────────────────────────────
export function IconMenu({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── 17. X / CLOSE ───────────────────────────────────────────────────────────
export function IconX({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── 18. CHEVRON ─────────────────────────────────────────────────────────────
export function IconChevron({
  size = 16,
  direction = "down",
  className,
}: {
  size?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}) {
  const rotations = { down: 0, up: 180, left: 90, right: -90 };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ transform: `rotate(${rotations[direction]}deg)` }}
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── 19. ARROW RIGHT ─────────────────────────────────────────────────────────
export function IconArrowRight({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── 20. SEND ─────────────────────────────────────────────────────────────────
export function IconSend({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── 21. LAYOUT DASHBOARD ─────────────────────────────────────────────────────
export function IconDashboard({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

// ─── 22. SEARCH ───────────────────────────────────────────────────────────────
export function IconSearch({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="11" cy="11" r="7.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M17 17l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── 23. ZAP / LIGHTNING ──────────────────────────────────────────────────────
export function IconZap({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
    </svg>
  );
}

// ─── 24. EXTERNAL LINK ────────────────────────────────────────────────────────
export function IconExternalLink({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── 25. INFO / ALERT CIRCLE ──────────────────────────────────────────────────
export function IconInfo({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8v1M12 11v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── 26. LOCK ─────────────────────────────────────────────────────────────────
export function IconLock({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1.2" fill="currentColor" />
    </svg>
  );
}

// ─── 27. SHIELD CHECK (alternative compact) ───────────────────────────────────
export function IconShieldCheck({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L4 5.5V12c0 4.42 3.56 8.57 8 10 4.44-1.43 8-5.58 8-10V5.5L12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="currentColor" fillOpacity="0.12" />
      <path d="M8.5 12l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── 28. PLUS / ADD ───────────────────────────────────────────────────────────
export function IconPlus({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── 29. MINUS / COLLAPSE ─────────────────────────────────────────────────────
export function IconMinus({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── 30. QUOTE / TESTIMONIAL DECORATION ───────────────────────────────────────
export function IconQuoteDecor({
  size = 80,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3 21l3-9H3V6h6v6l-3 9H3zm12 0l3-9h-3V6h6v6l-3 9h-3z" />
    </svg>
  );
}
