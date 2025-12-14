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
import { ViberIcon } from "@/components/viber-icon";

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
        <div className="space-y-4 py-4">
          {/* Телефон */}
          <div className="flex items-start gap-4 p-4 rounded-lg border border-beige-300 bg-beige-50/50 hover:bg-beige-100/50 transition-colors">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <Phone className="h-5 w-5 text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-black mb-1">Телефон</h3>
              <Link
                href="tel:+380663888010"
                className="text-emerald-600 hover:text-emerald-700 font-medium block mb-1"
              >
                +380 (66) 388 80 10
              </Link>
              <p className="text-sm text-black/70">
                Працюємо щодня з 9:00 до 20:00
              </p>
            </div>
          </div>

          {/* Viber */}
          <div className="flex items-start gap-4 p-4 rounded-lg border border-beige-300 bg-beige-50/50 hover:bg-beige-100/50 transition-colors">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <ViberIcon className="h-5 w-5 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-black mb-1">Viber</h3>
              <Link
                href="viber://chat?number=+380663888010"
                className="text-purple-600 hover:text-purple-700 font-medium block mb-1"
              >
                +380 (66) 388 80 10
              </Link>
              <p className="text-sm text-black/70">
                Швидка відповідь у месенджері
              </p>
            </div>
          </div>

          {/* Telegram */}
          <div className="flex items-start gap-4 p-4 rounded-lg border border-beige-300 bg-beige-50/50 hover:bg-beige-100/50 transition-colors">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <TelegramIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-black mb-1">Telegram</h3>
              <Link
                href="https://t.me/fliseti"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium block mb-1"
              >
                @fliseti
              </Link>
              <p className="text-sm text-black/70">
                Швидка відповідь у месенджері
              </p>
            </div>
          </div>

          {/* Instagram */}
          <div className="flex items-start gap-4 p-4 rounded-lg border border-beige-300 bg-beige-50/50 hover:bg-beige-100/50 transition-colors">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
              <Instagram className="h-5 w-5 text-pink-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-black mb-1">Instagram</h3>
              <Link
                href="https://instagram.com/salon_beauty"
                target="_blank"
                rel="noreferrer"
                className="text-pink-600 hover:text-pink-700 font-medium block mb-1"
              >
                @salon_beauty
              </Link>
              <p className="text-sm text-black/70">
                Наші роботи та новини
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
