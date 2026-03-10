# avpnMap

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
- PostgreSQL
- Redis — run locally via Docker or use a managed service such as [Upstash](https://upstash.com/)

```sh
# Redis via Docker
docker run -d --rm --name redis -p 6379:6379 redis:latest
```

### Backend

```sh
cd backend
cp .env.example .env   # fill in all values
pnpm install
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

---

## TODO
- fix names in db (there are "?" or different chars)
- Block map interaction while a visit edit/delete is in progress
