# ⚡ MERN Mini-Assessment: Reddit-Style Upvote

Build a tiny Reddit-like feed with an upvote button that persists to MongoDB.

This is a tiny feature, that you will be implementing across the full stack (frontend, backend, db schema).

## Desired outcomes
- Add a button next to a post's upvote number to let the user upvote that post. You have full freedom over style
- Create backend routes to handle upvotes and the undo-ing of upvotes
- Prevent more than one upvote by the user per post (also server-side)
- Make it clear in the frontend when a post is upvoted by the user - you have freedom over how
- Vote counts should persist across page refreshes


## Getting started
```bash
npm run install:all
docker-compose up -d
npm run db:init   # optional seed
npm run dev
```
