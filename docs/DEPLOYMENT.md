# Nova-Chat Vercel Deployment & Setup Guide

This guide provides step-by-step instructions for deploying the **Nova-Chat** monorepo from scratch to **Vercel** and establishing a production PostgreSQL database.

---

## 1. Monorepo Architecture Overview

Nova-Chat uses Turborepo with npm/pnpm workspaces. When deploying to Vercel, you create **separate Vercel Projects** connected to the same Git repository, pointing each to its respective application folder:

| Application | Root Directory in Vercel | Framework Preset | Output Directory |
| :--- | :--- | :--- | :--- |
| **`apps/web`** (Chat Client) | `apps/web` | Next.js | `.next` |
| **`apps/admin`** (Admin Portal) | `apps/admin` | Next.js | `.next` |
| **`apps/server`** (NestJS Engine) | `apps/server` | Other / Node.js | N/A (Serverless `api/index.ts`) |

---

## 2. Step 1: Provision Production PostgreSQL Database

Before deploying to Vercel, create a hosted PostgreSQL database:

1. **Option A: Vercel Postgres / Storage**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard) -> **Storage** tab.
   - Click **Create Database** -> Select **Postgres**.
   - Copy the generated `POSTGRES_PRISMA_URL` or `DATABASE_URL`.

2. **Option B: Neon / Supabase**
   - Create a free PostgreSQL instance on [Neon.tech](https://neon.tech) or [Supabase.com](https://supabase.com).
   - Copy your connection string (e.g. `postgresql://user:pass@ep-xyz.neon.tech/neondb?sslmode=require`).

---

## 3. Step 2: Deploy `apps/web` (Next.js Chat Client)

1. Push your repository to GitHub / GitLab / Bitbucket:
   ```bash
   git add .
   git commit -m "feat: complete nova-chat monorepo setup"
   git push origin main
   ```
2. Go to [Vercel Dashboard](https://vercel.com/new) -> Click **Add New** -> **Project**.
3. Import your `nova-chat` repository.
4. Configure Project Settings:
   - **Project Name**: `nova-chat-web`
   - **Framework Preset**: `Next.js`
   - **Root Directory**: Click *Edit* and select **`apps/web`**
   - **Build Command**: `cd ../.. && npx turbo run build --filter=web`
   - **Install Command**: `cd ../.. && npm install`
5. **Environment Variables**:
   - `DATABASE_URL`: Your PostgreSQL connection string.
   - `NEXT_PUBLIC_API_URL`: `https://nova-chat-server.vercel.app/api`
6. Click **Deploy**.

---

## 4. Step 3: Deploy `apps/admin` (Next.js Admin Dashboard)

1. In Vercel Dashboard, click **Add New** -> **Project**.
2. Select the same `nova-chat` repository.
3. Configure Project Settings:
   - **Project Name**: `nova-chat-admin`
   - **Framework Preset**: `Next.js`
   - **Root Directory**: Select **`apps/admin`**
   - **Build Command**: `cd ../.. && npx turbo run build --filter=admin`
   - **Install Command**: `cd ../.. && npm install`
4. **Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: `https://nova-chat-server.vercel.app/api`
5. Click **Deploy**.

---

## 5. Step 4: Deploy `apps/server` (NestJS Serverless API)

1. Click **Add New** -> **Project** on Vercel.
2. Select the `nova-chat` repository.
3. Configure Project Settings:
   - **Project Name**: `nova-chat-server`
   - **Framework Preset**: `Other`
   - **Root Directory**: Select **`apps/server`**
   - **Build Command**: `cd ../.. && npx prisma generate --schema=prisma/schema.prisma && npx turbo run build --filter=server`
   - **Install Command**: `cd ../.. && npm install`
4. **Environment Variables**:
   - `DATABASE_URL`: Your PostgreSQL connection string.
   - `JWT_SECRET`: A strong secret key (e.g. `c7f938d2b...`).
5. Click **Deploy**.

---

## 6. Step 5: Execute Database Migrations

Run database migrations against your production database from your terminal:

```bash
# Push Prisma schema to your remote Vercel/Neon Postgres instance
npx prisma db push --schema=prisma/schema.prisma
```

---

## 7. Local Development Command Summary

To test the entire monorepo locally before deploying:

```bash
# Install dependencies across all apps & packages
npm install

# Generate Prisma client
npm run db:generate

# Start all applications in parallel (web: 3000, admin: 3001, server: 4000)
npm run dev
```
