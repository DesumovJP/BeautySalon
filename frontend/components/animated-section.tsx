"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
    triggerOnce: true,
    delay,
  });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`scroll-animate ${isVisible ? "visible" : ""} ${className}`}
    >
      {children}
    </section>
  );
}














