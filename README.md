# avpnMap

**Live app: [avpnmap.app/map](https://www.avpnmap.app/map)**

A full-stack web application for tracking and discovering [Associazione Verace Pizza Napoletana (AVPN)](https://www.pizzanapoletana.org/) certified pizzerias worldwide. Log visits, leave reviews, earn achievements, and compete on a global leaderboard.

---

## Features

- **Interactive Map** — explore all AVPN certified pizzerias on a world map with marker clustering
- **Visit Tracking** — log visits to pizzerias with optional star ratings and written reviews
- **Achievements** — unlock achievements based on visit milestones, review activity, and geographic diversity
- **Leaderboard** — paginated rankings for both users and pizzerias, rebuilt daily and served from Redis
- **Google OAuth** — sign in with Google, JWT-based session with access/refresh token rotation
- **Rank System** — users progress through ranks as they accumulate visits and achievements

---

## Tech Stack

### Frontend
| | |
|---|---|
| Framework | React 19 |
| Routing | TanStack Router (file-based) |
| Server state | TanStack Query |
| Styling | Tailwind CSS v4 |
| Map | MapLibre GL / vis.gl |
| Build tool | Vite |

### Backend
| | |
|---|---|
| Framework | NestJS 11 |
| Language | TypeScript |
| Database | PostgreSQL via Prisma ORM |
| Cache / Leaderboard | Redis (ioredis) |
| Auth | Passport.js — Google OAuth 2.0 + JWT |

---

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm
- Docker (for running PostgreSQL and Redis)

### Backend

1. Start the database and cache using Docker Compose:

```sh
cd backend
docker compose up -d
```

2. Configure your environment variables:

```sh
cp .env.example .env
```

Ensure the following values are set in your `.env` to connect to the local Docker services:
```env
DATABASE_URL=postgresql://postgres:somepassword@localhost:5432/avpnmap
REDIS_HOST=localhost
REDIS_PORT=6379
```

3. Install dependencies and set up the database:

```sh
pnpm install
pnpx prisma generate
pnpx prisma migrate deploy
pnpx prisma db seed
pnpm run start:dev
```

### Frontend

```sh
cd frontend
cp .env.example .env
pnpm install
pnpm run dev
```
