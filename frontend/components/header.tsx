"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { ContactModal } from "@/components/contact-modal";

export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  const navItems = [
    { href: "/#categories", label: "Послуги" },
    { href: "/#why-us", label: "Чому ми" },
    { href: "/#gallery", label: "Галерея" },
    { href: "/#reviews", label: "Відгуки" },
    { href: "/#articles", label: "Статті" },
    { href: "/info", label: "Інформація" },
    { href: "/#contact", label: "Контакти" },
  ];

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // Only apply on mobile screens
      if (window.matchMedia("(min-width: 768px)").matches) return;

      const target = event.target as Node;
      if (menuRef.current?.contains(target) || toggleRef.current?.contains(target)) {
        return;
      }
      setIsMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen]);

  // No need to block scroll for dropdown menu

  return (
    <header className="sticky top-0 z-50 w-full border-b border-beige-300 bg-white md:bg-white/95 md:backdrop-blur md:supports-[backdrop-filter]:bg-white/80 header-scroll relative" style={{ overflow: 'visible' }}>
      <div className="max-w-7xl mx-auto px-4" style={{ overflow: 'visible' }}>
        <div className="flex h-16 items-center justify-between relative" style={{ overflow: 'visible' }}>
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-xl md:text-2xl font-bold text-black tracking-tight group-hover:opacity-80 transition-all duration-300 group-hover:scale-105">
              <span className="beauty-word">BEAUTY</span> ROOM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-black/70 transition-all duration-300 hover:text-black relative link-elegant group"
              >
                {item.label}
                <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            {isHomePage ? (
              <Button asChild size="sm" className="hidden sm:flex bg-black text-white hover:bg-black/90 btn-premium">
                <Link href="#contact">
                  <Phone className="w-4 h-4 mr-2 icon-hover" />
                  Записатися
                </Link>
              </Button>
            ) : (
              <Button
                size="sm"
                className="hidden sm:flex bg-black text-white hover:bg-black/90 btn-premium"
                onClick={() => setIsContactModalOpen(true)}
              >
                <Phone className="w-4 h-4 mr-2 icon-hover" />
                Записатися
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden transition-all duration-300 hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              ref={toggleRef}
              aria-label={isMenuOpen ? "Закрити меню навігації" : "Відкрити меню навігації"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 transition-transform duration-300 rotate-90" />
              ) : (
                <Menu className="h-5 w-5 transition-transform duration-300" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <div
              className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-black/50 backdrop-blur-sm z-[45]"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
            {/* Menu drawer */}
            <div
              ref={menuRef}
              id="mobile-navigation"
              className="md:hidden fixed inset-x-0 top-16 bg-white border-t border-beige-300 py-4 mobile-menu-enter shadow-lg z-[50]"
            >
              <nav className="flex flex-col space-y-4 stagger-children px-4">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-black/70 transition-all duration-300 hover:text-black hover:translate-x-2 px-2"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {item.label}
                  </Link>
                ))}
                {isHomePage ? (
                  <Button asChild className="mt-2 bg-black text-white hover:bg-black/90 btn-premium" style={{ animationDelay: `${navItems.length * 0.05}s` }}>
                    <Link href="#contact" onClick={() => setIsMenuOpen(false)}>
                      <Phone className="w-4 h-4 mr-2 icon-hover" />
                      Записатися
                    </Link>
                  </Button>
                ) : (
                  <Button
                    className="mt-2 bg-black text-white hover:bg-black/90 btn-premium"
                    style={{ animationDelay: `${navItems.length * 0.05}s` }}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsContactModalOpen(true);
                    }}
                  >
                    <Phone className="w-4 h-4 mr-2 icon-hover" />
                    Записатися
                  </Button>
                )}
              </nav>
            </div>
          </>
        )}
      </div>
      <ContactModal
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
      />
    </header>
  );
}

