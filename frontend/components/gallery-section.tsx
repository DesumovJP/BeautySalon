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

  const fallbackImages = [
    "https://fra1.digitaloceanspaces.com/mymediastorage/Beauty%20Salon/2149975508_ea1c3b32d5.jpg",
    "https://fra1.digitaloceanspaces.com/mymediastorage/Beauty%20Salon/945d2234331c51cc79d98d5f2024a0e5_6798ed3549.jpg",
    "https://fra1.digitaloceanspaces.com/mymediastorage/Beauty%20Salon/0385ea2076e9903414e56142cf253258_a5ac482775.jpg",
    "https://fra1.digitaloceanspaces.com/mymediastorage/Beauty%20Salon/mejkap_ta_stajling_8ac8c39003.jpg",
  ];

  const galleryImages = gallery?.images && gallery.images.length > 0
    ? gallery.images
    : fallbackImages.map((url, idx) => ({
        id: idx,
        url,
        alternativeText: 'Галерея',
      } as any));

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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {galleryImages.map((image, index) => {
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
                    alt={image.alternativeText || (image as any).caption || 'Галерея'}
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
      {selectedImageIndex !== null && gallery && gallery.images && gallery.images.length > 0 && (
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




