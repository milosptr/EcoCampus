# EcoCampus Server

Node.js server scaffold for EcoCampus, built with Express, tRPC, Zod, and Prisma. The goal is to provide a clear learning path for students while keeping the architecture close to production-ready patterns.

## Features

- Onboarding & authentication placeholders under `auth`
- Student action logging and dashboard helpers under `actions`
- Leaderboard scaffolding for campuses and students
- Personal progress insights for individual users
- Settings/profile management with Prisma relations

## Project Structure

```
apps/server/
├─ prisma/
│  ├─ schema.prisma       # Postgres models targeting Supabase
│  └─ seed.ts             # Placeholder seed runner (tsx)
├─ src/
│  ├─ modules/            # Feature routers (auth, actions, leaderboard, etc.)
│  ├─ context.ts          # tRPC context factory with Prisma client
│  ├─ env.ts              # Zod runtime validation for environment variables
│  ├─ index.ts            # Application entrypoint (boots server)
│  ├─ prisma.ts           # Singleton Prisma client helper
│  ├─ router.ts           # App router combining feature modules
│  ├─ server.ts           # Express/tRPC wiring and middleware
│  └─ trpc.ts             # Shared tRPC helpers and error formatting
├─ package.json
├─ tsconfig.json
└─ .env.example
```

## Getting Started

1. Install dependencies (from the repo root):
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and update the values:
   ```bash
   cp apps/server/.env.example apps/server/.env
   ```
3. Ensure your `DATABASE_URL` points to a Supabase Postgres instance.
4. Generate the Prisma client and push the schema:
   ```bash
   cd apps/server
   npm run db:generate
   npm run db:push
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

The server runs at `http://localhost:3000` by default with tRPC exposed at `/trpc`.

## NPM Scripts

- `npm run dev` – Start the server with automatic restarts (`tsx`).
- `npm run build` – Type-check and emit compiled files to `dist/`.
- `npm run start` – Run the compiled server.
- `npm run check-types` – Type-check only.
- `npm run lint` / `npm run lint:fix` – ESLint.
- `npm run format` – Prettier formatting.
- `npm run db:generate` – Generate Prisma client.
- `npm run db:push` – Push schema to the database.
- `npm run db:migrate` – Apply migrations in production environments.
- `npm run db:seed` – Execute the editable `prisma/seed.ts` placeholder.
- `npm run db:studio` – Launch Prisma Studio UI.

## Working With Prisma

- Models are designed around EcoCampus domains—users, universities, actions, and leaderboards.
- `ActionTemplate` represents the catalog of eco actions; `ActionLog` stores user submissions.
- `LeaderboardSnapshot` keeps precomputed totals for different time ranges.
- `UserProfile` and `UserStreak` support personalization and progress views.
- Update `prisma/seed.ts` with starter data for local development when ready.

After editing the schema, re-run `npm run db:generate` and `npm run db:push` (or migrations) to sync.

## Environment Variables

- `NODE_ENV` – `development`, `test`, or `production`.
- `PORT` – Port for Express (default 3000).
- `DATABASE_URL` – Supabase Postgres connection string.
- `SUPABASE_SERVICE_ROLE_KEY` – Optional, for administrative Supabase calls.
- `JWT_SECRET` – Used for signing auth tokens (minimum 32 characters).

All variables are validated at runtime via `src/env.ts`. Missing or invalid values will crash startup with helpful errors.

## Next Steps

- Wire up real authentication (Supabase or custom) inside `authRouter`.
- Implement Prisma queries inside each feature router.
- Flesh out `prisma/seed.ts` with action categories and demo campuses.
- Add integration tests once domain logic is ready.
