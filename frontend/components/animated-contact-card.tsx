"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface AnimatedContactCardProps {
  icon: ReactNode;
  title: string;
  content: ReactNode;
  index: number;
}

export function AnimatedContactCard({
  icon,
  title,
  content,
  index,
}: AnimatedContactCardProps) {
  return (
    <Card className="border border-beige-200 hover:border-black/30 hover:shadow-xl transition-all duration-300 bg-white group card-hover-lift h-full">
        <CardContent className="p-4 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-6 text-center md:text-left">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-black rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 [&>svg]:w-5 [&>svg]:h-5 md:[&>svg]:w-8 md:[&>svg]:h-8 [&>svg]:text-white">
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm md:text-xl font-semibold text-black mb-1 md:mb-2">{title}</h3>
              <div className="text-xs md:text-base">
                {content}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
  );
}

