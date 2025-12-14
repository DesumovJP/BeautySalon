"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
    triggerOnce: true,
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`text-center mb-16 md:mb-20 scroll-animate ${
        isVisible ? "visible" : ""
      } ${className}`}
    >
      <h2 className="text-section-title text-black mb-4">{title}</h2>
      {description && (
        <p className="text-body-large text-black/60 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}














