"use client";

import { useState } from "react";
import Image from "next/image";
import { Gallery, getImageUrl } from "@/lib/strapi";
import { GalleryModal } from "./gallery-modal";

interface CategoryGalleryProps {
  gallery: Gallery | null;
  categoryName: string;
}

export function CategoryGallery({ gallery, categoryName }: CategoryGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!gallery || !gallery.images || gallery.images.length === 0) {
    return null;
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-section-title text-black mb-4">
              Галерея {categoryName}
            </h2>
            <p className="text-body-large text-black/60 max-w-2xl mx-auto">
              Перегляньте наші роботи
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {gallery.images.map((image, index) => {
              const imageUrl = getImageUrl(image);
              if (!imageUrl) return null;
              
              return (
                <div
                  key={image.id || index}
                  className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
                  onClick={() => handleImageClick(index)}
                >
                  <Image
                    src={imageUrl}
                    alt={image.alternativeText || `Галерея ${categoryName} - ${index + 1}`}
                    fill
                    className="object-cover image-zoom"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {selectedImageIndex !== null && (
        <GalleryModal
          images={gallery.images}
          initialIndex={selectedImageIndex}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </>
  );
}


