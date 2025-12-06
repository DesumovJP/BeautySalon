"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { BookOpen, Calendar, Hash, ChevronLeft, ChevronRight } from "lucide-react";
import { ArticleModal } from "./article-modal";
import { Button } from "./ui/button";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// Fallback images (use gallery images if article image is missing)
const fallbackImages = [
  `${STRAPI_URL}/uploads/2149167396_e252be8c1e.jpg`,
  `${STRAPI_URL}/uploads/2148766575_85bc584818.jpg`,
  `${STRAPI_URL}/uploads/2148108775_7ed8604455.jpg`,
];

const articles = [
  {
    title: "Секрети здорового волосся",
    description: "Як досягти блиску та сили природним шляхом",
    image: "https://fra1.digitaloceanspaces.com/mymediastorage/Beauty%20Salon/Sekreti_zdorovogo_volossya_04b515260e.jpg",
    date: "15 січня 2024",
    tag: "Догляд за волоссям",
    content: `Здорове волосся - це не тільки красивий вигляд, але й показник загального стану організму. Ось ключові секрети, які допоможуть вам досягти ідеального стану волосся.

Щоденний догляд:

1. Правильне миття - використовуйте шампунь, який підходить вашому типу волосся. Не перемивайте волосся - достатньо 2-3 рази на тиждень для більшості типів.

2. Кондиціонер - обов'язковий крок після кожного миття. Наносьте його на довжину та кінчики, уникаючи коренів.

3. Термозахис - завжди використовуйте засоби захисту перед укладанням феном, праскою або плойкою. Це запобігає пошкодженню структури волосся.

Щотижневе підживлення:

1. Маски для волосся - використовуйте зволожуючі та підживлюючі маски мінімум раз на тиждень. Натуральні інгредієнти, такі як кокосова олія, мед та авокадо, чудово працюють.

2. Олійне обгортання - періодично робіть олійні обгортання з аргановою, кокосовою або жожоба олією. Це відновлює еластичність та блиск.

3. Обрізання кінчиків - регулярне обрізання (кожні 6-8 тижнів) допомагає позбутися посічених кінчиків та стимулює ріст.

Професійний догляд:

Відвідуйте салон краси регулярно для професійних процедур догляду. Наші майстри підберуть індивідуальну програму догляду, яка ідеально підійде саме вашому типу волосся.

Пам'ятайте: красиве волосся - це результат регулярного та правильного догляду!`,
  },
  {
    title: "Мистецтво манікюру",
    description: "Від класики до сучасних трендів",
    image: "https://fra1.digitaloceanspaces.com/mymediastorage/Beauty%20Salon/0385ea2076e9903414e56142cf253258_a5ac482775.jpg",
    date: "10 січня 2024",
    tag: "Манікюр",
    content: `Манікюр - це не просто покриття нігтів, це справжнє мистецтво, яке дозволяє виразити вашу індивідуальність та стиль.

Класичні техніки:

1. Французький манікюр - вічна класика, яка завжди виглядає елегантно та вишукано. Ідеально підходить для будь-якого випадку.

2. Обрізний манікюр - традиційна техніка, яка забезпечує ретельний догляд за кутикулою та формою нігтів.

3. Апаратний манікюр - сучасна альтернатива, яка є більш безпечною та гігієнічною. Ідеально для чутливої шкіри.

Сучасні тренди:

1. Нюдові відтінки - бежеві, рожево-бежеві та персикові кольори залишаються на піку популярності. Вони виглядають природно та елегантно.

2. Геометричні дизайни - мінімалістичні лінії, форми та візерунки додають сучасності та індивідуальності.

3. Металічні акценти - золоті та срібні деталі створюють ефект розкоші та вишуканості.

4. Градієнти та омбре - м'які переходи кольорів створюють об'ємний ефект та виглядають дуже сучасно.

Догляд за нігтями:

Регулярний манікюр не тільки робить руки красивими, але й підтримує здоров'я нігтів. Правильний догляд включає зволоження, захист та підживлення.

У нашому салоні ми пропонуємо широкий вибір технік та дизайнів, щоб створити ідеальний образ для вас!`,
  },
  {
    title: "Ритуал краси та здоров'я",
    description: "Комплексний підхід до догляду за собою",
    image: "https://fra1.digitaloceanspaces.com/mymediastorage/Beauty%20Salon/945d2234331c51cc79d98d5f2024a0e5_6798ed3549.jpg",
    date: "5 січня 2024",
    tag: "Краса та здоров'я",
    content: `Краса та здоров'я - це два невіддільні поняття. Правильний догляд за собою - це не просто косметичні процедури, а цілісний підхід до життя.

Щоденний ритуал:

1. Ранковий догляд - почніть день з легкого очищення та зволоження шкіри. Використовуйте легкі текстури, які не обтяжують шкіру.

2. Захист від сонця - сонцезахисний крем є обов'язковим елементом щоденного догляду, навіть взимку. Це запобігає передчасному старінню.

3. Вечірній догляд - ретельне очищення та відновлення шкіри ввечері допомагає їй відновитися після дня.

Тижневий ритуал:

1. Глибоке очищення - використовуйте маски та скраби 1-2 рази на тиждень для глибокого очищення та оновлення шкіри.

2. Підживлення - підживлюючі маски та серуми допомагають відновити баланс та еластичність шкіри.

3. Релаксація - дозвольте собі час для відпочинку. Масаж обличчя та тіла не тільки покращують стан шкіри, але й знімають напругу.

Професійний догляд:

Регулярні візити до салону краси - це інвестиція в ваше здоров'я та красу. Наші майстри підберуть індивідуальну програму догляду, яка враховує особливості вашої шкіри та волосся.

Здоров'я зсередини:

Не забувайте, що красива шкіра та волосся починаються зсередини. Збалансоване харчування, достатня кількість води та здоровий сон - це основа краси.

У BEAUTY ROOM ми допомагаємо вам створити персональний ритуал краси, який стане частиною вашого життя!`,
  },
  {
    title: "Ідеальні брови та вії",
    description: "Як ламінування й фарбування брів та вій допомагають мати виразний погляд щодня",
    image: `${STRAPI_URL}/uploads/6f21cf3e46f9c983d66df2dc9890d9be_1e4a4b7ba0.jpg`,
    date: "20 грудня 2023",
    tag: "Брови та вії",
    content: `Виразний погляд — це про форму, колір і догляд. Ламінування вій додає природного вигину, а фарбування брів підкреслює риси обличчя.

У статті розбираємо:
- Як обрати відтінок фарбування під ваш типаж
- Коли ламінування безпечне та кому воно підходить
- Чому архітектура брів важлива для симетрії обличчя

Ділимося порадами від майстрів і розповідаємо, як підтримувати результат вдома.`,
  },
  {
    title: "Масаж та релакс",
    description: "Гід по SPA-програмам і масажам, які реально знімають напругу",
    image: `${STRAPI_URL}/uploads/6b5fd30c11decb7d4e1a25d2ae23b1f3_cf7b7f93d4.jpg`,
    date: "10 грудня 2023",
    tag: "SPA та релакс",
    content: `Стрес накопичується в тілі — і це відчувається на шкірі та самопочутті. Ми розбираємо, які SPA-програми справді допомагають відновитись.

У статті:
- Чим відрізняється класичний, лімфодренажний і релакс-масаж
- Коли варто обрати ароматерапію та обгортання
- Як масаж обличчя впливає на тонус і мікроциркуляцію

Отримайте готові сценарії релаксу під різні задачі: від зняття напруги до глибокого відновлення.`,
  },
  {
    title: "Makeup & Styling",
    description: "Як підготуватися до події: макіяж, укладання та добір стійких продуктів",
    image: `${STRAPI_URL}/uploads/1a2e9c522373b1c4eaf06b3bd2b5c962_9d2f1dcd5d.jpg`,
    date: "1 грудня 2023",
    tag: "Макіяж",
    content: `Подія наближається — час продумати образ. Стійкий макіяж і правильна укладка тримаються весь день, якщо знати нюанси.

У статті:
- Як обрати тональні засоби й праймер під ваш тип шкіри
- Коли робити акцент на очі, а коли — на губи
- Яка укладка тримається довше: хвилі, sleek чи об’єм

Зібрали поради майстрів, щоб ви почувалися впевнено від старту до фіналу події.`,
  },
];

export function ArticlesSection() {
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (direction: "left" | "right") => {
    const container = sliderRef.current;
    if (!container) return;
    const amount = container.clientWidth * 0.9;
    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const handleArticleClick = (article: typeof articles[0]) => {
    setSelectedArticle(article);
    setIsOpen(true);
  };

  return (
    <>
      <section id="articles" className="section-padding px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-section-title text-black mb-4">
              Статті
            </h2>
            <p className="text-body-large text-black/60 max-w-2xl mx-auto">
              Корисні поради та актуальні тренди
            </p>
          </div>
          <div className="relative">
            {/* Desktop arrows (aligned with reviews style) */}
            <div className="hidden md:flex absolute left-0 right-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none -mx-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scrollByAmount("left")}
                className="absolute left-0 -translate-x-6 bg-white/90 hover:bg-white shadow-lg border border-beige-300 pointer-events-auto"
                aria-label="Попередні статті"
              >
                <ChevronLeft className="w-5 h-5 text-black" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scrollByAmount("right")}
                className="absolute right-0 translate-x-6 bg-white/90 hover:bg-white shadow-lg border border-beige-300 pointer-events-auto"
                aria-label="Наступні статті"
              >
                <ChevronRight className="w-5 h-5 text-black" />
              </Button>
            </div>

            <div
              ref={sliderRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 md:pb-8 md:gap-6 md:overflow-x-auto md:px-2"
            >
            {articles.map((article, index) => (
              <div
                key={index}
                className="relative group cursor-pointer rounded-lg overflow-hidden h-80 md:h-96 flex flex-col card-hover-lift card-shine snap-center min-w-[78%] sm:min-w-[60%] md:min-w-[32%]"
                onClick={() => handleArticleClick(article)}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  {article.image || fallbackImages[index % fallbackImages.length] ? (
                    <Image
                      src={article.image || fallbackImages[index % fallbackImages.length]}
                      alt={article.title}
                      fill
                      className="object-cover image-zoom"
                    />
                  ) : (
                    <div className="w-full h-full bg-beige-200"></div>
                  )}
                  {/* Dark overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/90 group-hover:via-black/60 transition-colors duration-300"></div>
                  {/* Shadow from bottom to center for better text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                </div>
                
                {/* Article Icon Badge and Meta Info */}
                <div className="relative z-10 flex-shrink-0 p-4 md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <BookOpen className="w-6 h-6 md:w-7 md:h-7 text-white icon-hover" />
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      {article.tag && (
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-[10px] md:text-xs font-normal">
                          <Hash className="w-2.5 h-2.5" />
                          {article.tag}
                        </div>
                      )}
                      {article.date && (
                        <div className="inline-flex items-center gap-1 text-white/70 text-[10px] md:text-xs drop-shadow-sm">
                          <Calendar className="w-2.5 h-2.5" />
                          {article.date}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Content - Always at bottom */}
                <div className="relative z-10 flex-grow flex flex-col justify-end p-4 md:p-6">
                  <div className="mt-auto">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white drop-shadow-lg group-hover:translate-y-[-4px] transition-transform duration-300">
                      {article.title}
                    </h3>
                    <p className="text-white text-base md:text-lg drop-shadow-md line-clamp-2 min-h-[3.5rem]">
                      {article.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>
      <ArticleModal
        article={selectedArticle}
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
}

