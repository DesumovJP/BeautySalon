import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { ScrollAnimation } from "@/components/scroll-animation";

const faqData = [
  {
    id: "1",
    question: "Як записатися на послугу?",
    answer: "Ви можете записатися на послугу, зв'язавшись з нами за телефоном +380 (XX) XXX XX XX, через Telegram або Viber, або заповнивши форму на сайті. Наші адміністратори допоможуть вам обрати зручний час та майстра.",
  },
  {
    id: "2",
    question: "Чи можна скасувати або перенести запис?",
    answer: "Так, ви можете скасувати або перенести запис не пізніше ніж за 24 години до призначеного часу. Будь ласка, повідомте нас про зміни якнайшвидше, щоб ми могли запропонувати цей час іншим клієнтам.",
  },
  {
    id: "3",
    question: "Які способи оплати ви приймаєте?",
    answer: "Ми приймаємо готівку, банківські картки (Visa, Mastercard) та безконтактні платежі. Також можлива оплата через мобільні додатки.",
  },
  {
    id: "4",
    question: "Чи є у вас подарункові сертифікати?",
    answer: "Так, ми пропонуємо подарункові сертифікати на будь-яку суму або конкретну послугу. Сертифікати дійсні протягом 12 місяців з моменту покупки.",
  },
  {
    id: "5",
    question: "Як довго триває процедура?",
    answer: "Тривалість процедури залежить від обраної послуги. Стрижка зазвичай триває 30-60 хвилин, манікюр - 45-90 хвилин, складні процедури можуть займати до 2-3 годин. Точну тривалість ви можете уточнити при записі.",
  },
  {
    id: "6",
    question: "Чи використовуєте ви якісні матеріали?",
    answer: "Так, ми використовуємо тільки професійні та сертифіковані матеріали від провідних світових брендів. Всі наші матеріали безпечні для здоров'я та мають відповідні сертифікати якості.",
  },
  {
    id: "7",
    question: "Чи є у вас програма лояльності?",
    answer: "Так, у нас діє програма лояльності. При кожному візиті ви отримуєте бонуси, які можна використати для отримання знижок на наступні послуги. Деталі програми можна дізнатися у наших адміністраторів.",
  },
  {
    id: "8",
    question: "Чи можна прийти з дитиною?",
    answer: "Так, ми завжди раді бачити дітей у нашому салоні. Для маленьких клієнтів ми пропонуємо спеціальні послуги та створюємо комфортну атмосферу. Будь ласка, повідомте про візит з дитиною заздалегідь.",
  },
];

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-beige-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-14 md:space-y-16">
        <ScrollAnimation>
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-black text-white shadow-lg shadow-black/10">
              <HelpCircle className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-section-title text-black">
              Часті питання
            </h1>
            <p className="text-body-large text-black/60 max-w-2xl mx-auto">
              Знайдіть відповіді на найпоширеніші питання про наш салон краси
            </p>
          </div>
        </ScrollAnimation>

        <div className="space-y-4">
          {faqData.map((faq) => (
            <ScrollAnimation key={faq.id} stagger>
              <Accordion
                type="single"
                collapsible
                defaultValue={undefined}
                className="w-full"
              >
                <AccordionItem
                  value={faq.id}
                  className="bg-white border border-beige-300 rounded-xl px-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-black hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-body text-black/70 pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation>
          <div className="text-center bg-white rounded-xl border border-beige-300 p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Не знайшли відповідь?
            </h2>
            <p className="text-body-large text-black/70 mb-6">
              Зв'яжіться з нами, і ми з радістю відповімо на всі ваші питання
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="tel:+380XXXXXXXXX"
                className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base bg-black text-white rounded-full hover:bg-black/90 transition-all duration-300 shadow-md"
              >
                Зателефонувати
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base border-2 border-black text-black rounded-full hover:bg-black hover:text-white transition-all duration-300"
              >
                Написати нам
              </a>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}

