# TaskFlow

A full-stack task management application built with Next.js and Express.

🔗 **Live Demo**: https://task-manager-app-wine-seven.vercel.app

## Features

- 📋 Kanban board with drag and drop between columns
- ✅ Create, edit, and delete tasks
- 🔐 Secure authentication with JWT and httpOnly cookies
- 🎯 Task priorities (Low, Medium, High, Urgent)
- 📱 Responsive design

## Tech Stack

**Frontend**
- Next.js 16 (App Router)
- TypeScript
- TanStack Query (data fetching and caching)
- dnd-kit (drag and drop)
- Tailwind CSS
- shadcn/ui

**Backend**
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT authentication
- Zod validation

**DevOps**
- Docker (local development)
- Railway (backend + database)
- Vercel (frontend)

## Architecture
frontend/          ← Next.js App Router
├── app/           ← pages and layouts
├── components/    ← reusable UI components
├── lib/           ← API functions and utilities
└── context/       ← React Context (auth state)
backend/           ← Express REST API
├── controllers/   ← request handlers
├── services/      ← business logic
├── repositories/  ← database queries (Prisma)
├── middleware/    ← JWT authentication
└── validators/    ← Zod schemas

## Local Development

**Prerequisites:** Node.js, Docker

**Backend:**
```bash
cd backend
npm install
docker compose up -d    # starts PostgreSQL
npx prisma migrate dev  # run migrations
npm run dev             # starts on port 4000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev             # starts on port 3000
```

**Environment Variables:**

Backend `.env`:
DATABASE_URL=postgresql://user:password@localhost:5432/taskmanager
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
PORT=4000

Frontend `.env.local`:
NEXT_PUBLIC_API_URL=http://localhost:4000

## API Endpoints
POST /api/auth/register  ← create account
POST /api/auth/login     ← login
POST /api/auth/logout    ← logout
GET    /api/tasks        ← get all tasks
POST   /api/tasks        ← create task
PUT    /api/tasks/:id    ← update task
DELETE /api/tasks/:id    ← delete task

## What I Learned

- Building a full-stack app with separate frontend and backend
- JWT authentication with httpOnly cookies for security
- Drag and drop with dnd-kit
- Server Components vs Client Components in Next.js
- TanStack Query for data fetching and cache invalidation
- Prisma ORM with PostgreSQL
- Docker for local development
- Deploying to Railway and Vercel