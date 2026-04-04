# Golden Compass

**Regulated pooled investment platform for Kenya** — mobile-first, CMA-regulated, M-Pesa integrated.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite, Zustand, React Router v6, Recharts, Lucide |
| Backend | Node.js + Express 4, Zod, Winston, bcryptjs, JWT |
| Database | Supabase (PostgreSQL) — falls back to in-memory mock |
| Cache | Redis via ioredis — falls back to in-memory Map |
| Auth | JWT (access 15m / refresh 7d), RBAC roles |
| Payments | M-Pesa Daraja API (Task 3) |
| AI | OpenAI Navigator (Task 4) |

## Quick Start

### Prerequisites
- Node.js 22+
- npm 10+

### 1. Install dependencies

```bash
cd client && npm install
cd ../server && npm install
```

### 2. Configure environment

```bash
# Copy and edit (defaults work out of the box for demo mode)
cp .env.example server/.env
```

### 3. Start development servers

```bash
# Terminal 1 — API (port 5000)
cd server && npm run dev

# Terminal 2 — Client (port 3000)
cd client && npm run dev
```

Open **http://localhost:3000**

### Demo credentials (pre-seeded, no external services needed)

| Role | Email | Password |
|------|-------|----------|
| Investor | demo@goldencompass.co.ke | demo123 |
| Admin | admin@goldencompass.co.ke | admin123 |

## Docker

```bash
cp .env.example .env
docker compose up --build
```

## Project Structure

```
golden-compass/
├── client/          # React + Vite SPA
│   └── src/
│       ├── components/  # Layout, auth, common
│       ├── pages/       # Route-level pages
│       ├── store/       # Zustand state (auth, app)
│       ├── services/    # Axios API, mock data
│       ├── hooks/       # useAuth
│       └── utils/       # Constants, helpers
├── server/          # Express REST API
│   └── src/
│       ├── routes/      # Auth endpoints
│       ├── middleware/  # JWT auth, RBAC, validation
│       ├── services/    # Supabase + Redis (with mocks)
│       └── utils/       # JWT, logger, errors
└── docker-compose.yml
```

## Roles

| Role | Access |
|------|--------|
| `investor` | Dashboard, Pools, Navigator, Transactions, Profile, KYC |
| `admin` | All investor pages + Admin Panel |
| `compliance` | All investor pages + Admin Panel |
| `auditor` | All investor pages + Admin Panel (read-only) |

## Environment Variables

See `.env.example` for all variables. All external services (Supabase, Redis, M-Pesa, OpenAI) are optional — the app runs fully in demo mode without them.

---

*Golden Compass is being built task-by-task. This repository contains Task 1: Monorepo scaffold, auth system, and dashboard shell.*
