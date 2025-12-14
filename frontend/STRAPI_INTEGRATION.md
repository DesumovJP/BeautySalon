# Інтеграція з Strapi

## Налаштування

1. Створіть файл `.env.local` в папці `frontend`:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

2. Для production замініть на ваш production URL Strapi.

## Структура колекцій

### Category (Категорія)
- `name` (Text, required, unique)
- `slug` (UID, required, based on name)
- `description` (Text, optional)
- `image` (Media, optional)
- `services` (Relation oneToMany → Service)

### Service (Послуга)
- `name` (Text, required, unique)
- `slug` (UID, required, based on name)
- `description` (Text, optional)
- `price` (Number/Decimal)
- `duration` (Text)
- `category` (Relation manyToOne → Category)
- `image` (Media, optional)
- `isPopular` (Boolean)

### Article (Стаття)
- `title` (Text)
- `slug` (UID, required, based on title)
- `description` (Text)
- `content` (Rich text)
- `image` (Media, optional)

### Gallery (Галерея)
- `title` (Text, optional)
- `slug` (UID, required, based on title)
- `images` (Media, Multiple, required)

## Використання API функцій

### Отримати всі категорії
```typescript
import { fetchCategories, getImageUrl } from '@/lib/strapi';

const categories = await fetchCategories();

categories.forEach(category => {
  const imageUrl = getImageUrl(category.attributes.image);
  // Використовуйте imageUrl для відображення
});
```

### Отримати послуги категорії
```typescript
import { fetchServicesByCategory, getImageUrl } from '@/lib/strapi';

const services = await fetchServicesByCategory('strizhky');

services.forEach(service => {
  const imageUrl = getImageUrl(service.attributes.image);
  const price = service.attributes.price;
  const duration = service.attributes.duration;
});
```

### Отримати статті
```typescript
import { fetchArticles, getImageUrl } from '@/lib/strapi';

const articles = await fetchArticles();

articles.forEach(article => {
  const imageUrl = getImageUrl(article.attributes.image);
  const title = article.attributes.title;
  const description = article.attributes.description;
});
```

### Отримати галерею
```typescript
import { fetchGallery } from '@/lib/strapi';

const gallery = await fetchGallery();

if (gallery) {
  gallery.attributes.images.data.forEach(image => {
    const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${image.attributes.url}`;
  });
}
```

## Приклад інтеграції в компоненті

```typescript
// app/page.tsx
import { fetchCategories, getImageUrl } from '@/lib/strapi';
import Image from 'next/image';

export default async function Home() {
  const categories = await fetchCategories();

  return (
    <div>
      {categories.map(category => {
        const imageUrl = getImageUrl(category.attributes.image);
        
        return (
          <div key={category.id}>
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={category.attributes.name}
                width={400}
                height={300}
              />
            )}
            <h2>{category.attributes.name}</h2>
            <p>{category.attributes.description}</p>
          </div>
        );
      })}
    </div>
  );
}
```

## Налаштування прав доступу в Strapi

1. Перейдіть в Strapi Admin Panel
2. Settings → Users & Permissions → Roles → Public
3. Увімкніть для всіх колекцій:
   - `find` (отримати список)
   - `findOne` (отримати один запис)

## Формат даних Strapi

Strapi повертає дані в такому форматі:
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "Стрижки",
        "slug": "strizhky",
        "image": {
          "data": {
            "attributes": {
              "url": "/uploads/image.jpg",
              "alternativeText": "Стрижки"
            }
          }
        }
      }
    }
  ],
  "meta": {
    "pagination": { ... }
  }
}
```

## Важливо

- Всі запити використовують `next: { revalidate: 3600 }` для кешування на 1 годину
- Функція `getImageUrl` автоматично додає базовий URL Strapi до шляху зображення
- Переконайтеся, що всі записи опубліковані в Strapi (Draft & Publish)














