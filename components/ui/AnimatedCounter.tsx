"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useInView,
  useReducedMotion,
  animate,
} from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 2,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  // Initialize to `target` (not 0) so the server-rendered HTML contains the
  // real number for crawlers; the count-up animation then runs client-side
  // once the element scrolls into view.
  const [displayValue, setDisplayValue] = useState(target);

  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return () => unsubscribe();
  }, [rounded]);

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      setDisplayValue(target);
      return;
    }

    count.set(0);
    const controls = animate(count, target, {
      duration,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [isInView, target, duration, shouldReduceMotion, count]);

  return (
    <span ref={ref} className={className} suppressHydrationWarning>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}
