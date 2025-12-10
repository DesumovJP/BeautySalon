"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, Hash } from "lucide-react";
import Image from "next/image";

interface ArticleModalProps {
  article: {
    title: string;
    description: string;
    content: string;
    image?: string;
    date?: string;
    tag?: string;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ArticleModal({ article, open, onOpenChange }: ArticleModalProps) {
  if (!article) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl lg:max-w-5xl max-h-[88vh] sm:max-h-[95vh] overflow-y-auto p-0 gap-0 top-[8vh] translate-y-0 sm:top-[50%] sm:translate-y-[-50%]">
        {/* Article Image */}
        {article.image && (
          <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        )}

        <div className="p-8 md:p-12 lg:p-16">
          <DialogHeader className="mb-8 md:mb-12">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {article.tag && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-sm font-medium">
                  <Hash className="w-4 h-4" />
                  {article.tag}
                </div>
              )}
              {article.date && (
                <div className="inline-flex items-center gap-2 text-black/50 text-sm font-light">
                  <Calendar className="w-4 h-4" />
                  {article.date}
                </div>
              )}
            </div>

            {/* Title */}
            <DialogTitle className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 leading-tight text-left">
              {article.title}
            </DialogTitle>

            {/* Description */}
            <DialogDescription className="text-lg md:text-xl text-black/70 leading-relaxed text-left font-light">
              {article.description}
            </DialogDescription>
          </DialogHeader>

          {/* Content */}
          <div className="border-t border-beige-200 pt-8 md:pt-12">
            <div className="text-base md:text-lg lg:text-xl text-black/75 leading-relaxed font-light">
              {article.content.split('\n\n').map((section, sectionIndex) => {
                const lines = section.split('\n');
                const firstLine = lines[0]?.trim();
                
                // Check if it's a heading (ends with colon or is short and bold)
                if (firstLine && (firstLine.endsWith(':') || firstLine.length < 50)) {
                  return (
                    <div key={sectionIndex} className="mb-8 last:mb-0">
                      <h3 className="text-xl md:text-2xl font-semibold text-black mb-4">
                        {firstLine.replace(':', '')}
                      </h3>
                      <div className="space-y-4">
                        {lines.slice(1).map((line, lineIndex) => {
                          if (!line.trim()) return null;
                          // Check if line starts with a number (list item)
                          if (/^\d+\./.test(line.trim())) {
                            const match = line.match(/^(\d+\.)\s*(.+)/);
                            return (
                              <div key={lineIndex} className="flex gap-4 mb-3">
                                <span className="font-semibold text-black flex-shrink-0">{match?.[1]}</span>
                                <span className="flex-1">{match?.[2]}</span>
                              </div>
                            );
                          }
                          return (
                            <p key={lineIndex} className="mb-4 last:mb-0">
                              {line.trim()}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
                
                // Regular paragraph
                return (
                  <div key={sectionIndex} className="mb-8 last:mb-0">
                    {lines.map((line, lineIndex) => {
                      if (!line.trim()) return null;
                      if (/^\d+\./.test(line.trim())) {
                        const match = line.match(/^(\d+\.)\s*(.+)/);
                        return (
                          <div key={lineIndex} className="flex gap-4 mb-3">
                            <span className="font-semibold text-black flex-shrink-0">{match?.[1]}</span>
                            <span className="flex-1">{match?.[2]}</span>
                          </div>
                        );
                      }
                      return (
                        <p key={lineIndex} className="mb-4 last:mb-0">
                          {line.trim()}
                        </p>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

