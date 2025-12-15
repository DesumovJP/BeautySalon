import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Sparkles, Star, MapPin, Phone, Mail, Instagram, Award, Users, Calendar } from "lucide-react";
import { ArticlesSection } from "@/components/articles-section";
import { ReviewsCarousel } from "@/components/reviews-carousel";
import { TelegramIcon } from "@/components/telegram-icon";
import { AnimatedCategoryCard } from "@/components/animated-category-card";
import { AnimatedContactCard } from "@/components/animated-contact-card";
import { GallerySection } from "@/components/gallery-section";
import { fetchCategories, fetchGalleryBySlug } from "@/lib/strapi";
import type { Category, Gallery } from "@/lib/strapi";
import { HeroStats } from "@/components/hero-stats";

export default async function Home() {
  let categories: Category[] = [];
  let gallery: Gallery | null = null;
  const HERO_IMAGE_URL =
    "https://fra1.digitaloceanspaces.com/mymediastorage/Beauty%20Salon/Golovna_Hiro_Sekcziya_8f8033ecde.jpg";
  const MOBILE_HERO_IMAGE_URL =
    "https://fra1.digitaloceanspaces.com/mymediastorage/Beauty%20Salon/2148108775_175b01c7ca.jpg";
  
  try {
    categories = await fetchCategories();
    console.log('Categories loaded on page:', categories.length);
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
  
  try {
    gallery = await fetchGalleryBySlug('gallery_main');
  } catch (error) {
    console.error('Error fetching gallery:', error);
  }
  return (
    <div className="min-h-screen bg-beige-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 md:py-32 -mt-16 md:-mt-20 pt-28 md:pt-36">
        {/* Background Image */}
        <div 
          className="absolute inset-0 hero-background"
          style={{ 
            overscrollBehavior: 'none', 
            overscrollBehaviorY: 'none', 
            touchAction: 'none' 
          }}
        >
          {/* Desktop / Tablet */}
          <Image
            src={HERO_IMAGE_URL}
            alt="Beauty Room hero"
            fill
            className="object-cover hidden sm:block"
            priority
          />
          {/* Mobile */}
          <Image
            src={MOBILE_HERO_IMAGE_URL}
            alt="Beauty Room hero mobile"
            fill
            className="object-cover sm:hidden"
            priority
          />
          {/* Elegant Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/55"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          {/* Elegant Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-12 md:mb-16 hero-badge-animate badge-pulse">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
            <span className="text-xs md:text-sm text-white/90 font-light tracking-wider uppercase letter-spacing-wider">
              Преміальний салон краси
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
          </div>

          {/* Main Title */}
          <h1 className="text-hero-title text-white mb-8 md:mb-12 tracking-tight drop-shadow-2xl font-light hero-title-animate">
            <span className="beauty-word font-normal">BEAUTY</span> ROOM
          </h1>
          
          {/* Tagline */}
          <p className="text-2xl md:text-3xl lg:text-4xl text-white/95 mb-6 md:mb-8 max-w-3xl mx-auto drop-shadow-lg font-light leading-tight hero-text-animate">
            Преміальний досвід краси та стилю
          </p>
          
          {/* Marketing Text */}
          <p className="text-base md:text-lg text-white/80 mb-12 md:mb-16 max-w-2xl mx-auto drop-shadow-md leading-relaxed font-light hero-text-animate">
            Преміальний догляд і стиль, створені особисто для Вас. Підберемо рішення під ваш ритм життя, щоб образ виглядав дорого, відчувався комфортно і тримався довше.
          </p>

          {/* Elegant Stats */}
          <HeroStats />

          {/* CTA Buttons - Elegant */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center hero-buttons-animate">
            <Button asChild size="lg" className="text-sm sm:text-base px-6 py-4 sm:px-10 sm:py-7 h-auto bg-black text-white hover:bg-black/90 shadow-2xl hover:shadow-black/50 transition-all duration-500 rounded-none border-2 border-black w-full sm:w-auto btn-premium">
              <Link href="#categories">Наші послуги</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm sm:text-base px-6 py-4 sm:px-10 sm:py-7 h-auto border-2 border-white/80 text-white hover:bg-white/10 hover:border-white backdrop-blur-sm transition-all duration-500 rounded-none w-full sm:w-auto btn-premium">
              <Link href="#contact">Записатися</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="section-padding px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-section-title text-black mb-4">
              Ваш ідеальний ритуал краси
            </h2>
            <p className="text-body-large text-black/60 max-w-2xl mx-auto">
              Оберіть категорію та знайдіть те, що підкреслить ваш характер — від делікатного догляду до сміливих образів.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
            {categories.length > 0 ? (
              categories
                .filter((category) => category && category.name)
                .map((category, index) => (
                  <AnimatedCategoryCard
                    key={category.id}
                    category={category}
                    index={index}
                  />
                ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-black/70">Категорії зʼявляться, щойно будуть додані в адмінці</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="section-padding px-4 bg-beige-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-section-title text-black mb-4">
              Чому обирають саме нас
            </h2>
            <p className="text-body-large text-black/60 max-w-2xl mx-auto">
              Ми зосереджені на тому, щоб результат виглядав дорого, відчувався комфортно і тримався довше.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-10">
            <Card className="col-span-2 md:col-span-1 text-center hover:shadow-xl transition-all duration-300 border-beige-200 hover:border-black/20 group bg-white">
              <CardHeader className="p-8">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Scissors className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-card-title mb-4">Професійні майстри</CardTitle>
                <CardDescription className="text-base text-black/70 leading-relaxed">
                  Наші спеціалісти мають понад 10 років досвіду та регулярно проходять навчання у провідних майстрів Європи. Кожен майстер - це справжній художник краси.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-beige-200 hover:border-black/20 group bg-white">
              <CardHeader className="p-3 sm:p-8">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                </div>
                <CardTitle className="text-xs sm:text-card-title mb-2 sm:mb-4">Преміальні матеріали</CardTitle>
                <CardDescription className="text-xs sm:text-base text-black/70 leading-relaxed">
                  Використовуємо виключно сертифіковані продукти від світових брендів преміум-класу. Ваше здоров'я та краса - наш пріоритет.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-beige-200 hover:border-black/20 group bg-white">
              <CardHeader className="p-3 sm:p-8">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-5 h-5 sm:w-8 sm:h-8 text-white fill-white" />
                </div>
                <CardTitle className="text-xs sm:text-card-title mb-2 sm:mb-4">Індивідуальний підхід</CardTitle>
                <CardDescription className="text-xs sm:text-base text-black/70 leading-relaxed">
                  Кожна клієнтка отримує персональну консультацію та програму догляду, розроблену спеціально для неї. Ваша унікальність - наша мета.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <GallerySection gallery={gallery} />

      {/* Reviews Section */}
      <section id="reviews" className="section-padding px-4 bg-beige-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-section-title text-black mb-4">
              Відгуки, яким довіряють
            </h2>
            <p className="text-body-large text-black/60 max-w-2xl mx-auto">
              Дізнайтеся, що кажуть про нас ті, хто вже відвідав наш салон краси в Києві.
            </p>
          </div>
          <ReviewsCarousel
            reviews={[
              {
                name: "Олена Петренко",
                text: "Чудовий салон! Майстри професійні, атмосфера затишна. Рекомендую!",
                rating: 5,
                avatar: "https://fra1.digitaloceanspaces.com/mymediastorage/Beauty%20Salon/9ae89402fd0a2d427b0815f1f4d83982_c31c45613f.jpg",
                date: "2 тижні тому",
              },
              {
                name: "Марія Коваленко",
                text: "Дуже задоволена результатом. Обов'язково повернуся ще раз.",
                rating: 5,
                avatar: "https://fra1.digitaloceanspaces.com/mymediastorage/Beauty%20Salon/bdcd81e4a04765ae94dab2392ed9c0dd_b27be37541.jpg",
                date: "3 тижні тому",
              },
              {
                name: "Анна Шевченко",
                text: "Найкращий салон у місті! Якість послуг на висоті.",
                rating: 5,
                avatar: "https://fra1.digitaloceanspaces.com/mymediastorage/Beauty%20Salon/d7fb2df714ddd3bf6aad1b64df2a2ee5_c780fedf2f.jpg",
                date: "1 місяць тому",
              },
              {
                name: "Катерина Бондаренко",
                text: "Відмінний сервіс та якісні послуги. Персонал дуже уважний до деталей.",
                rating: 5,
                avatar: "https://fra1.digitaloceanspaces.com/mymediastorage/Beauty%20Salon/b66cb27422ca87e9015b302f69daf90e_e0b73109f6.jpg",
                date: "2 місяці тому",
              },
              {
                name: "Софія Мельник",
                text: "Завжди залишаюся задоволена! Професійний підхід та чудові результати.",
                rating: 5,
                avatar: "https://fra1.digitaloceanspaces.com/mymediastorage/Beauty%20Salon/f921c2e37298a013e41c2cb93ceb0a3f_c462c21a8a.jpg",
                date: "1 тиждень тому",
              },
              {
                name: "Вікторія Ткаченко",
                text: "Прекрасний салон з атмосферою розкоші. Обов'язково повернуся!",
                rating: 5,
                avatar: "https://fra1.digitaloceanspaces.com/mymediastorage/Beauty%20Salon/4cbc8084851718db382ee726ac77c9ea_a9b4dc718c.jpg",
                date: "3 дні тому",
              },
            ]}
          />
        </div>
      </section>

      {/* Articles Section */}
      <ArticlesSection />

      {/* Contact Section */}
      <section id="contact" className="section-padding px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-section-title text-black mb-4">
              Зв'яжіться з нами
            </h2>
            <p className="text-body-large text-black/60 max-w-2xl mx-auto">
              Зателефонуйте, напишіть або відвідайте наш салон краси в центрі Києва. Ми завжди раді допомогти вам стати ще красивішою
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8">
              {/* Contact Cards */}
              <AnimatedContactCard
                index={0}
                icon={<Phone className="w-8 h-8 text-white" />}
                title="Телефон"
                content={
                  <>
                    <a href="tel:+380663888010" className="text-xs md:text-lg text-black/70 hover:text-black transition-colors font-medium block mb-1 md:mb-2">
                      +380 (66) 388 80 10
                    </a>
                    <p className="text-[10px] md:text-sm text-black/50">Працюємо щодня з 9:00 до 20:00</p>
                  </>
                }
              />

              <AnimatedContactCard
                index={1}
                icon={<Phone className="w-8 h-8 text-white" />}
                title="Viber"
                content={
                  <>
                    <a
                      href="viber://chat?number=+380663888010"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs md:text-lg text-black/70 hover:text-black transition-colors font-medium block mb-1 md:mb-2"
                    >
                      +380 (66) 388 80 10
                    </a>
                    <p className="text-[10px] md:text-sm text-black/50">Швидка відповідь у месенджері</p>
                  </>
                }
              />

              <AnimatedContactCard
                index={2}
                icon={<TelegramIcon className="w-8 h-8 text-white" />}
                title="Telegram"
                content={
                  <>
                    <a
                      href="https://t.me/your_telegram"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs md:text-lg text-black/70 hover:text-black transition-colors font-medium block mb-1 md:mb-2"
                    >
                      @your_telegram
                    </a>
                    <p className="text-[10px] md:text-sm text-black/50">Швидка відповідь у месенджері</p>
                  </>
                }
              />

              <AnimatedContactCard
                index={3}
                icon={<Instagram className="w-8 h-8 text-white" />}
                title="Instagram"
                content={
                  <>
                    <a
                      href="https://instagram.com/salon_beauty"
            target="_blank"
            rel="noopener noreferrer"
                      className="text-xs md:text-lg text-black/70 hover:text-black transition-colors font-medium block mb-1 md:mb-2"
                    >
                      @salon_beauty
                    </a>
                    <p className="text-[10px] md:text-sm text-black/50">Наші роботи та новини</p>
                  </>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="section-padding px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-section-title text-black mb-4">
              Ми на мапі
            </h2>
            <p className="text-body-large text-black/60 max-w-2xl mx-auto">
              Знайдіть нас за адресою
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="border-beige-300 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="w-full h-96 md:h-[500px] bg-beige-200">
                  <iframe
                    src="https://www.google.com/maps?q=вул.+Саксаганського+1,+Київ&output=embed"
                    width="100%"
                    height="100%"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full border-0"
                  ></iframe>
                </div>
                <div className="p-6 bg-beige-50 border-t border-beige-300">
                  <div className="flex items-center gap-3 text-black">
                    <MapPin className="w-6 h-6 flex-shrink-0" />
                    <p className="text-body font-medium">вул. Саксаганського, 1, Київ</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
