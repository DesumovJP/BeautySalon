import Link from "next/link";
import { Phone, Mail, MapPin, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-beige-200 bg-beige-50">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 md:gap-10 lg:gap-12">
          {/* About - Full width on mobile */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1 space-y-4 md:space-y-6 text-center md:text-left">
            <div>
              <h3 className="text-xl md:text-3xl font-bold text-black mb-2 md:mb-4">
                <span className="beauty-word">BEAUTY</span> ROOM
              </h3>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4 md:mb-6">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-black/60" />
                <span className="text-xs md:text-sm text-black/60 font-medium">Преміальний салон краси</span>
              </div>
            </div>
            <p className="text-xs md:text-base text-black/70 leading-relaxed">
              Преміальний салон краси в центрі Києва. Створюємо неповторний образ для кожної клієнтки з використанням найкращих матеріалів та професійного підходу.
            </p>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1 space-y-5 md:space-y-6 text-center md:text-right">
            <h3 className="text-sm md:text-lg font-semibold text-black mb-3 md:mb-6">Контакти</h3>
            <div className="grid grid-cols-2 gap-4 md:flex md:flex-col md:space-y-5">
              <a href="tel:+380XXXXXXXXX" className="flex items-center justify-center md:justify-end gap-3 md:gap-4 group">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/5 group-hover:bg-black flex items-center justify-center transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-black/70 group-hover:text-white transition-colors" />
                </div>
                <div className="min-w-0 text-left md:text-right">
                  <p className="text-[10px] md:text-xs text-black/50 mb-0.5">Телефон</p>
                  <p className="text-xs md:text-base text-black/70 group-hover:text-black transition-colors font-medium break-all">
                    +380 (XX) XXX XX XX
                  </p>
                </div>
              </a>
              <a href="mailto:info@salon.com" className="flex items-center justify-center md:justify-end gap-3 md:gap-4 group">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/5 group-hover:bg-black flex items-center justify-center transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                  <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 text-black/70 group-hover:text-white transition-colors" />
                </div>
                <div className="min-w-0 text-left md:text-right">
                  <p className="text-[10px] md:text-xs text-black/50 mb-0.5">Email</p>
                  <p className="text-xs md:text-base text-black/70 group-hover:text-black transition-colors font-medium break-all">
                    info@salon.com
                  </p>
                </div>
              </a>
              <div className="col-span-2 flex items-start justify-center md:justify-end gap-3 md:gap-4 group cursor-default">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/5 group-hover:bg-black flex items-center justify-center transition-all duration-300 group-hover:scale-110 flex-shrink-0 mt-0.5 md:mt-1">
                  <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-black/70 group-hover:text-white transition-colors" />
                </div>
                <div className="min-w-0 text-center md:text-right">
                  <p className="text-[10px] md:text-xs text-black/50 mb-0.5">Адреса</p>
                  <p className="text-xs md:text-base text-black/70 group-hover:text-black transition-colors leading-relaxed">
                    вул. Саксаганського, 1<br />
                    м. Київ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 md:mt-20 pt-6 md:pt-8 border-t border-beige-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <p className="text-xs md:text-sm text-black/60 text-center md:text-left">
              © {new Date().getFullYear()} <span className="beauty-word font-semibold">BEAUTY</span> ROOM. Всі права захищені.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-8 text-center">
              <Link href="#" className="text-xs md:text-sm text-black/60 hover:text-black transition-all duration-300 link-elegant">
                Політика конфіденційності
              </Link>
              <Link href="#" className="text-xs md:text-sm text-black/60 hover:text-black transition-all duration-300 link-elegant">
                Умови використання
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

