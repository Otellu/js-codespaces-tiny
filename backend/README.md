# Mini Backend (Express + MongoDB)

## Setup
1. Install dependencies
```bash
npm install
```
2. Set env (optional)
- `MONGODB_URI` (defaults to `mongodb://localhost:27017/mern-mini`)
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
