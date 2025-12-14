# Deployment Plan (Vercel frontend + Railway Strapi + DigitalOcean Spaces)

## 0. Передумови
- Yarn встановлено локально.
- Аккаунти: GitHub, Railway, Vercel, DigitalOcean (Spaces).
- Продакшн-домен для фронтенду (Vercel) і бекенду (Railway або власний проксі).

## 1. Підготовка репозиторію
- Root для Railway: `backend`
- Root для Vercel: `frontend`
- Встановити провайдер для Spaces: у `backend` виконати `yarn add @strapi/provider-upload-aws-s3`.
- Додати/оновити `backend/config/plugins.ts` під DO Spaces (формат AWS SDK v3: `accessKeyId`, `secretAccessKey`, `forcePathStyle: true`, `ACL: 'public-read'`, `baseUrl` з CDN за потреби).
- Переконатися, що в `backend/config/middlewares.ts` дозволені потрібні Origins через `CORS_ORIGIN`.

## 2. Змінні середовища
### Railway (Strapi)
- Базові: `NODE_ENV=production`, `HOST=0.0.0.0`, `PORT=1337`
- Secrets: `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY`
- База (Postgres): `DATABASE_CLIENT=postgres`, `DATABASE_URL` (Railway), `DATABASE_SSL=true`, за потреби `DATABASE_SCHEMA=public`
- URLs: `SERVER_URL`, `PUBLIC_URL` = прод бекенд URL
- CORS: `CORS_ORIGIN=https://<frontend-domain>,https://<preview-domain>`
- DigitalOcean Spaces: `DO_SPACE_KEY`, `DO_SPACE_SECRET`, `DO_SPACE_BUCKET`, `DO_SPACE_ENDPOINT=https://<region>.digitaloceanspaces.com`, `DO_SPACE_REGION=<region>`, опційно `DO_SPACE_CDN_URL`, `DO_SPACE_ROOT_PATH`

### Vercel (Next.js)
- `NEXT_PUBLIC_STRAPI_URL=https://<railway-backend-domain>`
- Опційно: `NODE_VERSION=20`

### Локальна розробка
- `backend/env.example` → `.env`
- `frontend/env.example` → `.env.local`
- Для локалу `NEXT_PUBLIC_STRAPI_URL=http://localhost:1337`

## 3. Railway (бекенд)
- Root Directory = `backend`.
- Build: `yarn install --frozen-lockfile && yarn build`
- Start: `yarn start`
- Додати Postgres service; скопіювати `DATABASE_URL` у змінні Strapi.
- Переконатися, що локальні аплоади не використовуються в проді (ephemeral диск) — використовуємо Spaces.
- Після деплою створити адміна в `/admin`.

## 4. DigitalOcean Spaces
- Створити Space (регіон + опційно CDN).
- Згенерувати **Spaces Access Keys** (не Personal Tokens).
- Налаштувати CORS у Space: Origin = прод бекенд/фронт, Methods `GET, PUT, POST, DELETE, HEAD`, Headers `*`.
- У `plugins.ts` вказати `baseUrl` = CDN або `${DO_SPACE_ENDPOINT}/${DO_SPACE_BUCKET}`.

## 5. Vercel (фронтенд)
- Root Directory = `frontend`.
- Build: `yarn build`; Dev команду не змінювати.
- Додати env з бекенд URL.
- У `next.config.ts` додати remotePatterns для Railway і Spaces доменів (якщо ще не додані).

## 6. Чек-поінти після деплою
- Railway логи: Strapi стартував без помилок.
- `/admin` доступний по HTTPS, створено адміна.
- Завантаження картинки в Media Library → файл з’являється в Spaces за публічним URL.
- API `GET /api/categories` повертає 200.
- Frontend на Vercel рендерить дані з бекенду, зображення завантажуються.
- В браузері немає CORS/HTTPS помилок.

## 7. Типові помилки, яких уникати
- Використання Personal Access Tokens замість Spaces Access Keys.
- `DO_SPACE_ENDPOINT` без `https://` → має бути з протоколом.
- Неправильний формат credentials (`accessKeyId` / `secretAccessKey` обов’язково).
- Відсутній `ACL: 'public-read'` у `params` → файли 403.
- `s3ForcePathStyle` замість `forcePathStyle` (правильно: `forcePathStyle: true`).
- Root Directory не виставлений у Railway/Vercel → помилки збірки.

## 8. Локальний флоу перевірки
- `cd backend && cp env.example .env && yarn install && yarn develop`
- Окремо: `cd frontend && cp env.example .env.local && yarn install && yarn dev`
- Перевірити: сторінки відкриваються, API відповідає, картинки з локального Strapi вантажаться.












