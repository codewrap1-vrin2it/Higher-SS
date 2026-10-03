# FutureReady – Life & Career Navigator

Next.js (App Router) app for Grades 11–12 students: RIASEC assessment, career explorer, skill-gap radar, roadmap, resources, gamified points, and Skill Rush mini-game.

## File tree (main)

```
src/
  app/              # Routes: /, /assessment, /diagnostic, /careers, /roadmap, /resources, /leaderboard, /game
  components/       # UI shell, onboarding, charts, leaderboard
  context/          # AppProvider + localStorage sync
  data/             # questions, careers, resources, roadmap, skillRush
  lib/              # types, storage, scoring, points, confetti
```

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js 15, React 19, TypeScript, Tailwind CSS
- lucide-react, recharts, canvas-confetti
- Persistence: `localStorage` (no auth)
