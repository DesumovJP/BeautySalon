"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  index?: number;
}

export function AnimatedCard({
  children,
  className = "",
  delay = 0,
  index = 0,
}: AnimatedCardProps) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
    triggerOnce: true,
    delay: delay + index * 100, // Stagger effect: 100ms delay per card
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`scroll-animate-stagger card-hover-lift ${
        isVisible ? "visible" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}



