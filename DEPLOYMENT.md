# Deployment Guide (Vercel frontend + Railway backend)

This project runs a Strapi v5 backend and a Next.js 16 frontend.

## 1) Environments and secrets

- Backend env template: `backend/env.example` → copy to `backend/.env` (locally) or into Railway variables.
- Frontend env template: `frontend/env.example` → set on Vercel.
- Generate **unique secrets** for production:
  - `APP_KEYS` (comma-separated, 4 values)
  - `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`
  - `ENCRYPTION_KEY` (32+ chars)

## 2) Railway (Strapi backend)

- Create a Node service from this repo.
- Set build command: `yarn install --frozen-lockfile && yarn build`
- Set start command: `yarn start`
- Required env vars:
  - `NODE_ENV=production`
  - `HOST=0.0.0.0`
  - `PORT=1337`
  - Secrets listed above
  - Database (Postgres): `DATABASE_CLIENT=postgres`, `DATABASE_URL` (from Railway), `DATABASE_SSL=true`, `DATABASE_SCHEMA=public`
  - `CORS_ORIGIN=https://<your-vercel-domain>` (add more, comma-separated)
- Storage note: local uploads are not persistent on ephemeral disks. Attach a persistent volume or switch to an S3-compatible provider before going live.
- After first deploy, create an admin user in the Strapi panel.

## 3) Vercel (Next.js frontend)

- Framework preset: Next.js
- Build command: `yarn build`
- Output: `.next`
- Env vars:
  - `NEXT_PUBLIC_STRAPI_URL=https://<railway-backend-domain>`
  - `NODE_VERSION=20` (or set in project settings)
- Set a Production Domain; update `CORS_ORIGIN` on Railway to include it.

## 4) Local development

- Backend:
  - `cd backend`
  - `cp env.example .env` and set dev-safe values
  - `yarn install`
  - `yarn develop` (uses SQLite by default)
- Frontend:
  - `cd frontend`
  - `cp env.example .env.local`
  - `yarn install`
  - `yarn dev` (expects Strapi on `http://localhost:1337`)

## 5) Verify after deploy

- Backend health: `GET /api/categories` returns 200 with JSON.
- Admin panel accessible and can create content.
- Frontend renders categories/services and images load via the Railway domain.
- CORS errors absent in browser console.












