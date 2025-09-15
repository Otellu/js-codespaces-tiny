# ⚡ JS Mini: Reddit-Style Upvote

Build a tiny Reddit-like feed with an upvote button that persists to MongoDB.

This is a tiny feature implemented across the full stack (frontend, backend, db schema).

## Desired outcomes
- Add a button next to a post's upvote number to let the user upvote that post. You have full freedom over style
- Create backend routes to handle upvotes and the undo-ing of upvotes
- Prevent more than one upvote by the user per post (also server-side)
- Make it clear in the frontend when a post is upvoted by the user - you have freedom over how
- Vote counts should persist across page refreshes


## Getting started
```bash
npm run dev
```
Then open the frontend in another tab in your browser:
1. Go to the terminal in the bottom of the Codespaces window
2. Go to the Ports tab
3. Find the frontend, hover, and click on the globe icon to go to the live frontend URL

Hot-reloading will be enabled.

## Tech
- Backend: Express + Mongoose, permissive CORS
- Frontend: React + Tailwind styles
- Database: MongoDB (Docker compose service)

## Notes
- The previous pizza shop scaffolding has been removed. Packages, APIs, and seeds now reflect posts and upvotes.
