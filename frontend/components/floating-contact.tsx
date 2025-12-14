 "use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Phone } from "lucide-react";
import { TelegramIcon } from "@/components/telegram-icon";

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), 10_000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (drawerRef.current?.contains(target)) return;
      setIsOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [isOpen]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={drawerRef}
      className={`floating-contact group fixed bottom-6 right-4 z-50 md:scale-[1.5] md:origin-bottom-right ${isOpen ? "floating-contact-open" : ""}`}
    >
      <button
        type="button"
        className="floating-contact-handle"
        aria-label={isOpen ? "Закрити панель контактів" : "Відкрити панель контактів"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? "×" : <Phone className="h-5 w-5" strokeWidth={1.75} />}
      </button>

      <div
        className={`floating-contact-drawer ${isOpen ? "floating-contact-drawer-open" : ""}`}
        aria-hidden={!isOpen}
      >
      <div className="flex flex-col gap-1">
        <Link
          href="tel:+380663888010"
          className="floating-contact-link relative z-[1] inline-flex items-center gap-2 px-2 py-1.5 rounded-xl text-sm font-medium text-black/80 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500/70"
          aria-label="Подзвонити +380663888010"
          title="Подзвонити"
        >
          <Phone className="h-5 w-5 text-emerald-600" strokeWidth={1.75} />
          <span>Дзвінок</span>
        </Link>

        <Link
          href="https://t.me/fliseti"
          target="_blank"
          rel="noreferrer"
          className="floating-contact-link relative z-[1] inline-flex items-center gap-2 px-2 py-1.5 rounded-xl text-sm font-medium text-black/80 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/50"
          aria-label="Написати в Telegram @fliseti"
          title="Написати в Telegram"
          onClick={() => setIsOpen(false)}
        >
          <TelegramIcon className="h-6 w-6 text-black/78 transition-transform duration-300 group-hover:scale-[1.06] group-hover:text-black" />
          <span>Telegram</span>
        </Link>
        </div>
      </div>
    </div>
  );
}


