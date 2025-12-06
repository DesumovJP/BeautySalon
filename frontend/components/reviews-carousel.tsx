"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Review {
  name: string;
  text: string;
  rating: number;
  avatar?: string;
  date?: string;
}

// Helper function to get initials from name
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

interface ReviewsCarouselProps {
  reviews: Review[];
}

export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  // Number of reviews to show at once
  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getMaxIndex = () => {
    if (isMobile) {
      return reviews.length - itemsPerView.mobile;
    }
    return Math.max(0, reviews.length - itemsPerView.desktop);
  };

  const maxIndex = getMaxIndex();

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    setTouchStartX(touch.clientX);
    setTouchStartY(touch.clientY);
    setTouchEndX(touch.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;
    // If horizontal intent detected, prevent vertical scroll jitter while swiping
    if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
      e.preventDefault();
      setTouchEndX(touch.clientX);
    }
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;

    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div className="relative">
      {/* Desktop Navigation Arrows */}
      <div className="hidden md:flex absolute left-0 right-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none -mx-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="absolute left-0 -translate-x-12 bg-white/90 hover:bg-white shadow-lg border border-beige-300 pointer-events-auto"
          aria-label="Попередній відгук"
        >
          <ChevronLeft className="w-5 h-5 text-black" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="absolute right-0 translate-x-12 bg-white/90 hover:bg-white shadow-lg border border-beige-300 pointer-events-auto"
          aria-label="Наступний відгук"
        >
          <ChevronRight className="w-5 h-5 text-black" />
        </Button>
      </div>

      {/* Carousel Container */}
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (isMobile ? 100 : 100 / itemsPerView.desktop)}%)`,
          }}
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-4"
              style={{ width: isMobile ? '100%' : `${100 / itemsPerView.desktop}%` }}
            >
              <Card className="h-full bg-white border border-beige-200 hover:border-beige-300 transition-all duration-500 hover:shadow-lg group card-shine">
                <CardContent className="p-8 md:p-10 flex flex-col h-full">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <svg
                      width="32"
                      height="24"
                      viewBox="0 0 32 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-black/10 group-hover:text-black/20 transition-colors duration-300"
                    >
                      <path
                        d="M0 24V14.4C0 9.6 1.6 5.6 4.8 2.4C8 -0.8 12 -2.4 16.8 -2.4V4.8C14.4 4.8 12.8 5.6 12 7.2C11.2 8.8 10.8 10.4 10.8 12V24H0ZM17.2 24V14.4C17.2 9.6 18.8 5.6 22 2.4C25.2 -0.8 29.2 -2.4 34 -2.4V4.8C31.6 4.8 30 5.6 29.2 7.2C28.4 8.8 28 10.4 28 12V24H17.2Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>

                  {/* Review Text */}
                  <p className="text-body-large text-black/80 leading-relaxed mb-8 flex-grow font-light">
                    {review.text}
                  </p>

                  {/* Bottom Section */}
                  <div className="border-t border-beige-200 pt-6">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      {review.avatar ? (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `<div class="w-full h-full bg-black flex items-center justify-center text-white font-medium text-sm">${getInitials(review.name)}</div>`;
                              }
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center flex-shrink-0 text-white font-medium text-sm">
                          {getInitials(review.name)}
                        </div>
                      )}
                      
                      {/* Name and Meta */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium text-black mb-1">
                          {review.name}
                        </h3>
                        <div className="flex items-center gap-3">
                          {/* Rating Stars */}
                          <div className="flex items-center gap-0.5">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-black text-black" />
                            ))}
                          </div>
                          {review.date && (
                            <>
                              <span className="text-black/30">•</span>
                              <p className="text-xs text-black/50">
                                {review.date}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Dots Indicator */}
      <div className="md:hidden flex justify-center gap-2 mt-6">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-black w-6"
                : "bg-black/30"
            }`}
            aria-label={`Перейти до відгуку ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

