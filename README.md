# 🚀 Nova-Chat Monorepo

Nova-Chat is a modern, high-performance workspace communication platform built with a full-stack monorepo architecture.

## 🏗️ Architecture Overview

```
nova-chat/
├── apps/
│   ├── web/          # Next.js 14 Chat Frontend (Port 3000)
│   ├── server/       # NestJS Backend API Engine (Port 4000 & Vercel Serverless)
│   └── admin/        # Next.js 14 Admin Dashboard (Port 3001)
├── packages/
│   ├── ui/           # Shared React Tailwind CSS Component Library (@nova/ui)
│   ├── types/        # Shared TypeScript Models & Interfaces (@nova/types)
│   ├── utils/        # Shared Helper Utilities (@nova/utils)
│   └── config/       # Shared Base Configurations (@nova/config)
├── prisma/
│   └── schema.prisma # Unified PostgreSQL Database Schema
├── docker/
│   ├── docker-compose.yml # PostgreSQL & Redis local containers
│   └── Dockerfile.server  # Standalone server image
└── docs/
    └── DEPLOYMENT.md # Vercel deployment guide
```

## 🛠️ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Initialize Prisma Database
```bash
npm run db:generate
```

### 4. Run Development Servers
```bash
npm run dev
```
- **Web App**: [http://localhost:3000](http://localhost:3000)
- **Admin Portal**: [http://localhost:3001](http://localhost:3001)
- **NestJS API**: [http://localhost:4000/api](http://localhost:4000/api)

## 🌐 Vercel Deployment

For exact Vercel deployment steps, environment variable configurations, and database setup, see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).