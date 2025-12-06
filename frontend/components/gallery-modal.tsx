"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogPortal,
  DialogOverlay,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { StrapiImage, getImageUrl } from "@/lib/strapi";

interface GalleryModalProps {
  images: StrapiImage[];
  initialIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GalleryModal({
  images,
  initialIndex,
  open,
  onOpenChange,
}: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Update current index when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, images.length, onOpenChange]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrevious();
    }
  };

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];
  const imageUrl = getImageUrl(currentImage);

  if (!imageUrl) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/60" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-5xl max-h-[95vh] translate-x-[-50%] translate-y-[-50%] overflow-hidden bg-white/85 backdrop-blur-md px-0 py-6 shadow-lg duration-200",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
          )}
        >
          {/* Hidden Title for Accessibility */}
          <DialogTitle className="sr-only">
            Галерея - Зображення {currentIndex + 1} з {images.length}
          </DialogTitle>

          {/* Standard Close Button (same as article modal) */}
          <DialogClose
            type="button"
            className="absolute right-4 top-4 z-50 rounded-sm bg-beige-100 text-black opacity-80 hover:opacity-100 ring-offset-white transition-opacity focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:pointer-events-none"
            aria-label="Закрити"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>

          <div className="relative w-full max-w-4xl mx-auto">
            {/* Navigation Arrows (desktop, reviews style) */}
            {images.length > 1 && (
              <div className="hidden md:flex absolute inset-y-0 left-0 right-0 z-20 pointer-events-none">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevious}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg border border-beige-300 pointer-events-auto"
                  aria-label="Попереднє зображення"
                >
                  <ChevronLeft className="w-5 h-5 text-black" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg border border-beige-300 pointer-events-auto"
                  aria-label="Наступне зображення"
                >
                  <ChevronRight className="w-5 h-5 text-black" />
                </Button>
              </div>
            )}

            {/* Image Container with Swipe Support */}
            <div
              className="relative w-full flex items-center justify-center bg-white/0 px-4 md:px-6 pb-8 md:pb-10 pt-8 md:pt-10"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative w-auto max-h-[75vh] max-w-full flex items-center justify-center">
                <Image
                  src={imageUrl}
                  alt={
                    currentImage.alternativeText ||
                    currentImage.caption ||
                    `Зображення ${currentIndex + 1}`
                  }
                  width={1920}
                  height={1080}
                  className="h-full w-auto max-h-[70vh] object-contain rounded-lg"
                  priority
                  quality={90}
                />
              </div>
            </div>
          </div>

          {/* Navigation Dots (all viewports, below image) */}
          {images.length > 1 && (
            <div className="flex justify-center gap-2 pb-6">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-black w-6" : "bg-black/30"
                  }`}
                  aria-label={`Перейти до зображення ${index + 1}`}
                />
              ))}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

