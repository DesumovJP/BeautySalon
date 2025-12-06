"use client";

import { useState } from "react";
import Image from "next/image";
import { Gallery, getImageUrl } from "@/lib/strapi";
import { GalleryModal } from "./gallery-modal";

interface GallerySectionProps {
  gallery: Gallery | null;
}

export function GallerySection({ gallery }: GallerySectionProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="gallery" className="section-padding px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-section-title text-black mb-4">
              Галерея наших робіт
            </h2>
            <p className="text-body-large text-black/60 max-w-2xl mx-auto">
              Перегляньте результати нашої роботи та атмосферу преміального салону краси в Києві
            </p>
          </div>
          {gallery && gallery.images && gallery.images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {gallery.images.map((image, index) => {
                const imageUrl = getImageUrl(image);
                if (!imageUrl) return null;
                
                return (
                  <div
                    key={image.id || index}
                    className="relative aspect-square bg-beige-200 rounded-lg overflow-hidden group cursor-pointer"
                    onClick={() => handleImageClick(index)}
                  >
                    <Image
                      src={imageUrl}
                      alt={image.alternativeText || image.caption || 'Галерея'}
                      fill
                      className="object-cover image-zoom"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="aspect-square bg-beige-200 rounded-lg flex items-center justify-center text-black/30"
                >
                  <span className="text-sm">Фото {item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      {selectedImageIndex !== null && gallery && gallery.images && (
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


