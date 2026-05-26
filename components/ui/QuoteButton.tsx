"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface QuoteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "ghost";
  children: React.ReactNode;
  className?: string;
  gaLabel?: string;
}

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const variantClasses = {
  solid: "bg-big-red hover:bg-deep-red text-white shadow-md hover:shadow-lg",
  outline:
    "border-2 border-big-red text-big-red hover:bg-big-red hover:text-white",
  ghost: "text-big-red hover:bg-red-50",
};

export default function QuoteButton({
  href,
  size = "md",
  variant = "solid",
  children,
  className,
  gaLabel,
  onClick,
  ...props
}: QuoteButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Fire GA4 event if analytics enabled
    if (gaLabel && typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "cta_click", {
        cta_label: gaLabel,
        page_location: window.location.href,
      });
    }
    onClick?.(e);
  };

  const classes = cn(
    "font-poppins font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center justify-center gap-2",
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
