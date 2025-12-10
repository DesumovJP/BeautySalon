import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { FloatingContact } from "@/components/floating-contact";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BEAUTY ROOM - Преміальний салон краси в Києві | Стрижки, манікюр, догляд",
  description: "Преміальний салон краси BEAUTY ROOM в центрі Києва. Професійні стрижки, манікюр, догляд за волоссям та обличчям. Досвідчені майстри, якісні матеріали, індивідуальний підхід. Записуйтесь зараз!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${playfairDisplay.variable} ${inter.variable} antialiased`}
      >
        <ScrollToTop />
        <Header />
        <main>{children}</main>
        <FloatingContact />
        <Footer />
      </body>
    </html>
  );
}
