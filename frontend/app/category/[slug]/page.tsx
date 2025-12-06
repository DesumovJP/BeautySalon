import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award, Sparkles, Star, Users, Hash, MoveRight } from "lucide-react";
import { fetchCategoryBySlug, fetchServicesByCategory, fetchGalleryBySlug, getImageUrl, renderRichText } from "@/lib/strapi";
import { notFound } from "next/navigation";
import { ServiceCard } from "@/components/service-card";
import { CategoryGallery } from "@/components/category-gallery";
import { ScrollAnimation } from "@/components/scroll-animation";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const HERO_FALLBACKS: Record<string, string> = {
    manikyur: "https://fra1.digitaloceanspaces.com/mymediastorage/Beauty%20Salon/0385ea2076e9903414e56142cf253258_a5ac482775.jpg",
    strijka: "https://fra1.digitaloceanspaces.com/mymediastorage/Beauty%20Salon/2149975508_ea1c3b32d5.jpg",
  };
  const DEFAULT_HERO_FALLBACK = "https://fra1.digitaloceanspaces.com/mymediastorage/Beauty%20Salon/945d2234331c51cc79d98d5f2024a0e5_6798ed3549.jpg";
  // Handle both Promise and direct params (Next.js 15+ vs 14)
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;
  
  console.log('Category page - slug:', slug);
  
  const category = await fetchCategoryBySlug(slug);
  const services = await fetchServicesByCategory(slug);
  
  console.log('Category page - category:', category ? {
    id: category.id,
    name: category.name,
    slug: category.slug,
    hasDescription: !!category.description,
    hasLongDescription: !!category.longDescription,
    longDescriptionType: typeof category.longDescription,
    longDescriptionPreview: typeof category.longDescription === 'string' 
      ? category.longDescription.substring(0, 100) 
      : String(category.longDescription).substring(0, 100)
  } : 'null');
  
  console.log('Category page - services count:', services.length);
  console.log('Category page - services:', services.map(s => ({ id: s.id, name: s.name })));
  
  if (!category) {
    console.log('Category not found for slug:', slug);
    notFound();
  }

  // Use only the category image; no fallbacks to avoid mismatched visuals.
  const normalizedCategoryImage = Array.isArray((category as any)?.image)
    ? (category as any).image[0]
    : category.image;
  const categoryImageUrl = getImageUrl(normalizedCategoryImage) || HERO_FALLBACKS[slug] || DEFAULT_HERO_FALLBACK;

  // Build hashtag badges from top services (exclude duplicates with category name or generic hair tag)
  const tagBadges = [
    ...services
      .filter((s) => s && s.name)
      .slice(0, 3)
      .map((s) => s.name as string),
  ]
    .filter(Boolean)
    .filter(
      (tag) =>
        tag.toLowerCase() !== (category.name || "").toLowerCase() &&
        tag.toLowerCase() !== "догляд за волоссям"
    );

  // Map category slug to gallery slug
  // Prefer related gallery from category (handles single or array relation), then slug map fallback
  const getGallerySlug = (categorySlug: string): string | null => {
    const galleryMap: Record<string, string> = {
      manicure: 'gallery_manicure',
      hair: 'gallery_hair',
      manikyur: 'gallery_manicure',
      strijka: 'gallery_hair',
    };
    return galleryMap[categorySlug] || null;
  };

  const relatedGallery =
    (category as any)?.gallery && Array.isArray((category as any).gallery)
      ? (category as any).gallery[0]
      : (category as any)?.gallery;

  const relatedGallerySlug =
    relatedGallery?.slug ||
    (category as any)?.gallerySlug ||
    (category as any)?.gallery_slug ||
    getGallerySlug(slug);

  const gallery = relatedGallerySlug ? await fetchGalleryBySlug(relatedGallerySlug) : null;

  return (
    <div className="min-h-screen bg-beige-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Button asChild variant="ghost">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Link>
          </Button>
        </div>

        {/* Category Hero */}
        <section className="mb-12 md:mb-14">
          <div className="relative overflow-hidden rounded-2xl border border-beige-200 shadow-xl">
            <div className="absolute inset-0">
              {categoryImageUrl ? (
                <Image
                  src={categoryImageUrl}
                  alt={category.name || "Категорія"}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-beige-200 via-beige-100 to-beige-300" />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/25" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            <div className="relative max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 md:p-10 lg:p-12 text-white">
              <ScrollAnimation>
                <div className="space-y-5">
                  {/* Hashtag badges */}
                  <div className="flex flex-wrap gap-2">
                    {tagBadges.map((tag, idx) => (
                      <div
                        key={`${tag}-${idx}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[11px] md:text-xs font-medium text-white/85"
                      >
                        <Hash className="w-3 h-3" />
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight max-w-3xl">
                      Преміальні послуги {category.name.toLowerCase()}
                    </h1>
                    <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-xl">
                      Від класики до трендових дизайнів — оберіть свій образ із індивідуальним підбором під ваш стиль.
                    </p>
                    {category.description && (
                      <p className="text-sm md:text-base text-white/75 leading-relaxed max-w-xl">
                        {category.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      className="h-12 px-5 bg-white text-black hover:bg-white/90"
                      asChild
                    >
                      <Link href="#services">
                        Обрати послугу
                        <MoveRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-12 px-5 border-white/60 text-white hover:bg-white/10"
                      asChild
                    >
                      <Link href="#gallery">Переглянути роботи</Link>
                    </Button>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Services Section Header */}
        <div id="services" className="mb-12 md:mb-16">
          <h2 className="text-2xl md:mb-3 md:text-3xl font-bold text-black mb-3">
            Послуги, що створюють ваш стиль
          </h2>
          <p className="text-base md:text-lg text-black/65 max-w-2xl">
            Підберемо персональний ритуал краси — від базового догляду до преміальних процедур, що підкреслять вашу індивідуальність.
          </p>
        </div>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20">
            {services
              .filter((service) => service && service.name)
              .map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
          </div>
        ) : (
          <div className="text-center py-12 mb-16 md:mb-20">
            <p className="text-black/70">Послуги будуть відображені тут</p>
          </div>
        )}

        {/* Encouragement Cards Section */}
        <div className="mb-16 md:mb-20">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-6">
            <div className="flex items-start gap-2.5 p-3.5 sm:p-5 bg-white rounded-lg border border-beige-200 hover:border-black/30 hover:shadow-lg transition-all duration-300 group card-hover-lift">
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-black mb-0.5 text-sm sm:text-base leading-tight">Преміальна якість</h3>
                <p className="text-[11px] sm:text-sm text-black/60 leading-snug">Тільки найкращі матеріали</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3.5 sm:p-5 bg-white rounded-lg border border-beige-200 hover:border-black/30 hover:shadow-lg transition-all duration-300 group card-hover-lift">
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-black mb-0.5 text-sm sm:text-base leading-tight">Досвідчені майстри</h3>
                <p className="text-[11px] sm:text-sm text-black/60 leading-snug">Професійний підхід</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3.5 sm:p-5 bg-white rounded-lg border border-beige-200 hover:border-black/30 hover:shadow-lg transition-all duration-300 group card-hover-lift">
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
              </div>
              <div>
                <h3 className="font-semibold text-black mb-0.5 text-sm sm:text-base leading-tight">Відмінний результат</h3>
                <p className="text-[11px] sm:text-sm text-black/60 leading-snug">Гарантія задоволення</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3.5 sm:p-5 bg-white rounded-lg border border-beige-200 hover:border-black/30 hover:shadow-lg transition-all duration-300 group card-hover-lift">
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-black mb-0.5 text-sm sm:text-base leading-tight">Індивідуальний підхід</h3>
                <p className="text-[11px] sm:text-sm text-black/60 leading-snug">Персональний догляд</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Gallery */}
      <div id="gallery">
        <CategoryGallery gallery={gallery} categoryName={category.name} />
      </div>
    </div>
  );
}

