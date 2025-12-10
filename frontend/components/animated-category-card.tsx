"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, Palette, Scissors } from "lucide-react";
import { getImageUrl, Category } from "@/lib/strapi";

interface AnimatedCategoryCardProps {
  category: Category;
  index: number;
}

export function AnimatedCategoryCard({
  category,
  index,
}: AnimatedCategoryCardProps) {
  if (!category || !category.name) {
    return null;
  }

  const fallback = "https://fra1.digitaloceanspaces.com/mymediastorage/Beauty%20Salon/2149975508_ea1c3b32d5.jpg";
  const imageUrl = getImageUrl(category.image) || fallback;
  
  // Визначаємо іконку залежно від слаг категорії
  let Icon = Scissors; // за замовчуванням
  if (category.slug === "korekcziya-briv" || category.slug === "korekciya-briv") {
    Icon = Sparkles;
  } else if (category.slug === "manicure" || category.slug === "manikyur") {
    Icon = Palette;
  }

  return (
    <Link
      href={`/category/${category.slug}`}
      className="relative group cursor-pointer rounded-lg overflow-hidden h-72 md:h-96 flex flex-col block card-hover-lift card-shine"
    >
        {/* Background Image */}
        <div className="absolute inset-0">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={category.name || "Категорія"}
              fill
              className="object-cover image-zoom"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-beige-200 to-beige-300"></div>
          )}
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/90 group-hover:via-black/60 transition-colors duration-300"></div>
          {/* Shadow from bottom to center for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
        </div>

        {/* Category Icon Badge */}
        <div className="relative z-10 flex-shrink-0 p-4 md:p-6">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
            <Icon className="w-5 h-5 md:w-7 md:h-7 text-white icon-hover" />
          </div>
        </div>

        {/* Content - Always at bottom */}
        <div className="relative z-10 flex-grow flex flex-col justify-end p-4 md:p-6">
          <div className="mt-auto">
            <h3 className="text-xl md:text-3xl font-bold mb-3 text-white drop-shadow-lg group-hover:translate-y-[-4px] transition-transform duration-300">
              {category.name || "Категорія"}
            </h3>
            {category.description && (
              <p className="text-white text-base md:text-lg drop-shadow-md line-clamp-2 min-h-[3.5rem] overflow-hidden">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </Link>
  );
}

