"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Service, getImageUrl } from "@/lib/strapi";
import { Clock, Star } from "lucide-react";
import { ContactModal } from "@/components/contact-modal";

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const imageUrl = getImageUrl(service.image);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <Card className="h-full overflow-hidden border border-beige-200 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl hover:border-black/20 transition-all duration-300 group card-shine">
      <div className="flex flex-col md:flex-row h-full">
        {/* Image Section - Left */}
        <div className="relative w-full md:w-2/5 h-64 md:h-auto min-h-[320px] overflow-hidden flex-shrink-0 bg-beige-50">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={service.name || 'Послуга'}
              fill
              className="object-cover image-zoom"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-beige-200 to-beige-300">
              <span className="text-black/30 text-sm font-light">Зображення послуги</span>
            </div>
          )}
          {/* Elegant overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content Section - Right */}
        <div className="flex-1 flex flex-col p-7 md:p-9 justify-between bg-white/90">
          {/* Title and Description */}
          <div className="flex-1 space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-2">
                <h3 className="text-xl md:text-2xl font-semibold text-black leading-tight tracking-tight">
                  {service.name || 'Послуга'}
                </h3>
                {service.description && (
                  <p className="text-sm md:text-base text-black/70 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                )}
              </div>
              {service.isPopular && (
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/5 border border-black/10 text-[10px] md:text-xs text-black/70 font-medium flex-shrink-0">
                <Star className="w-3 h-3 text-black/70" />
                <span>Популярна</span>
              </div>
              )}
            </div>
          </div>

          {/* Price and Duration */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 pb-5">
            {service.duration && (
              <div className="flex items-center gap-2 px-4 py-2 bg-beige-100/90 border border-beige-200 rounded-full shadow-sm backdrop-blur-sm w-max">
                <Clock className="w-3.5 h-3.5 text-black/60" />
                <span className="text-xs text-black/70 font-medium leading-none">{service.duration}</span>
              </div>
            )}
            <span className="text-2xl md:text-3xl font-semibold text-black ml-auto">
              {service.price ? `${service.price} грн` : 'За запитом'}
            </span>
          </div>

          {/* CTA Button */}
          {isHomePage ? (
            <Button asChild className="w-full h-11 md:h-11 text-sm md:text-sm bg-white text-black border border-black/10 hover:bg-black/5 rounded-full font-medium shadow-sm transition-all">
              <Link href="#contact">Записатися</Link>
            </Button>
          ) : (
            <Button 
              className="w-full h-11 md:h-11 text-sm md:text-sm bg-white text-black border border-black/10 hover:bg-black/5 rounded-full font-medium shadow-sm transition-all"
              onClick={() => setIsContactModalOpen(true)}
            >
              Записатися
            </Button>
          )}
        </div>
      </div>
      <ContactModal
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
      />
    </Card>
  );
}

