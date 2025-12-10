 "use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
  delay?: number;
  duration?: number;
};

function useCountUp(target: number, duration = 1200, delay = 0) {
  const [value, setValue] = useState(0);
  const startTs = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || target === 0) {
      setValue(target);
      return;
    }

    const step = (ts: number) => {
      if (startTs.current === null) startTs.current = ts;
      const elapsed = ts - startTs.current - delay;
      if (elapsed < 0) {
        rafId.current = requestAnimationFrame(step);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(easeOut * target));
      if (progress < 1) {
        rafId.current = requestAnimationFrame(step);
      }
    };

    rafId.current = requestAnimationFrame(step);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [target, duration, delay]);

  return value;
}

export function HeroStats() {
  const stats: Stat[] = useMemo(
    () => [
      { label: "років досвіду", value: 10, suffix: "+", delay: 0 },
      { label: "задоволених клієнтів", value: 5000, suffix: "+", delay: 150 },
      { label: "середня оцінка", value: 4.9, suffix: "", delay: 300, duration: 900 },
    ],
    []
  );

  return (
    <div className="grid grid-cols-3 gap-4 md:flex md:flex-wrap md:justify-center md:gap-8 mb-12 md:mb-16 hero-stats-animate">
      {stats.map((stat, idx) => {
        const count = useCountUp(stat.value * (stat.value < 5 ? 10 : 1), stat.duration ?? 1200, stat.delay ?? 0);
        const display =
          stat.value < 5
            ? (count / 10).toFixed(1).replace(/\.0$/, "")
            : count.toLocaleString("uk-UA");
        return (
          <div key={stat.label} className="text-center number-animate" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-1 md:mb-2 drop-shadow-lg">
              {display}
              {stat.suffix}
            </div>
            <p className="text-[10px] md:text-sm text-white/70 font-light tracking-wide uppercase leading-snug">
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
