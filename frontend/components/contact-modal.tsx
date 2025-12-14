"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Phone, MessageCircle, Instagram } from "lucide-react";
import Link from "next/link";
import { TelegramIcon } from "@/components/telegram-icon";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Зв'яжіться з нами</DialogTitle>
          <DialogDescription>
            Оберіть зручний для вас спосіб зв'язку
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-4 py-4">
          {/* Телефон */}
          <div className="flex flex-col items-center text-center gap-2 p-2 sm:p-4 sm:flex-row sm:items-start sm:text-left sm:gap-4 rounded-lg border border-beige-300 bg-beige-50/50 hover:bg-beige-100/50 transition-colors">
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0 w-full">
              <h3 className="text-xs sm:text-base font-semibold text-black mb-0.5 sm:mb-1">Телефон</h3>
              <Link
                href="tel:+380663888010"
                className="text-xs sm:text-base text-emerald-600 hover:text-emerald-700 font-medium block mb-0.5 sm:mb-1 break-all"
              >
                +380 (66) 388 80 10
              </Link>
              <p className="text-[10px] sm:text-sm text-black/70 leading-tight">
                Працюємо щодня з 9:00 до 20:00
              </p>
            </div>
          </div>

          {/* Viber */}
          <div className="flex flex-col items-center text-center gap-2 p-2 sm:p-4 sm:flex-row sm:items-start sm:text-left sm:gap-4 rounded-lg border border-beige-300 bg-beige-50/50 hover:bg-beige-100/50 transition-colors">
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0 w-full">
              <h3 className="text-xs sm:text-base font-semibold text-black mb-0.5 sm:mb-1">Viber</h3>
              <Link
                href="viber://chat?number=+380663888010"
                className="text-xs sm:text-base text-purple-600 hover:text-purple-700 font-medium block mb-0.5 sm:mb-1 break-all"
              >
                +380 (66) 388 80 10
              </Link>
              <p className="text-[10px] sm:text-sm text-black/70 leading-tight">
                Швидка відповідь у месенджері
              </p>
            </div>
          </div>

          {/* Telegram */}
          <div className="flex flex-col items-center text-center gap-2 p-2 sm:p-4 sm:flex-row sm:items-start sm:text-left sm:gap-4 rounded-lg border border-beige-300 bg-beige-50/50 hover:bg-beige-100/50 transition-colors">
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <TelegramIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0 w-full">
              <h3 className="text-xs sm:text-base font-semibold text-black mb-0.5 sm:mb-1">Telegram</h3>
              <Link
                href="https://t.me/fliseti"
                target="_blank"
                rel="noreferrer"
                className="text-xs sm:text-base text-blue-600 hover:text-blue-700 font-medium block mb-0.5 sm:mb-1 break-all"
              >
                @fliseti
              </Link>
              <p className="text-[10px] sm:text-sm text-black/70 leading-tight">
                Швидка відповідь у месенджері
              </p>
            </div>
          </div>

          {/* Instagram */}
          <div className="flex flex-col items-center text-center gap-2 p-2 sm:p-4 sm:flex-row sm:items-start sm:text-left sm:gap-4 rounded-lg border border-beige-300 bg-beige-50/50 hover:bg-beige-100/50 transition-colors">
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-pink-100 flex items-center justify-center">
              <Instagram className="h-4 w-4 sm:h-5 sm:w-5 text-pink-600" />
            </div>
            <div className="flex-1 min-w-0 w-full">
              <h3 className="text-xs sm:text-base font-semibold text-black mb-0.5 sm:mb-1">Instagram</h3>
              <Link
                href="https://instagram.com/salon_beauty"
                target="_blank"
                rel="noreferrer"
                className="text-xs sm:text-base text-pink-600 hover:text-pink-700 font-medium block mb-0.5 sm:mb-1 break-all"
              >
                @salon_beauty
              </Link>
              <p className="text-[10px] sm:text-sm text-black/70 leading-tight">
                Наші роботи та новини
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
