import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-beige-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-black mb-4">Категорія не знайдена</h1>
        <p className="text-black/70 mb-6">Запитана категорія не існує або була видалена.</p>
        <Button asChild>
          <Link href="/">На головну</Link>
        </Button>
      </div>
    </div>
  );
}













