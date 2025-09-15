# Mini Backend (Express + Postgres)

## Setup
1. Install dependencies
```bash
npm install
```
2. Set env (optional)
- `DATABASE_URL` (defaults to `postgres://postgres:postgres@localhost:5432/js_mini`)
- `PORT` (defaults to 8081 via root compose)

3. Seed database (from repo root preferred)
```bash
npm run db:init
```

4. Start server
```bash
npm run dev
```

## Routes
- GET `/api/posts/:id`
- POST `/api/posts/:id/upvote`
