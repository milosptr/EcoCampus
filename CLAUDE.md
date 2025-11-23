# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EcoCampus is a gamified sustainability tracking application built as a monorepo with:

- **Mobile App** (`apps/mobile`): Expo Router + React Native + Tamagui + TypeScript
- **Backend API** (`apps/server`): Node.js + Express + tRPC + Prisma + PostgreSQL
- **Build System**: Turborepo + npm workspaces

The app encourages students to track eco-friendly actions, earn points, compete on leaderboards, and monitor their environmental impact.

## Common Development Commands

### Initial Setup

```bash
npm install                                      # Install all dependencies
cp apps/server/.env.example apps/server/.env     # Copy environment variables
cd apps/server && npx prisma generate && npx prisma db push && cd ../..
```

### Running the Apps

```bash
npm run dev                # Start both mobile app and server together (recommended)
npm run dev:app            # Start mobile app only
npm run dev:server         # Start server only
```

### Expo-Specific Commands (from apps/mobile)

```bash
npm run start              # Start Expo dev server
npm run ios                # Open iOS simulator (macOS only)
npm run android            # Open Android emulator
```

### Code Quality

```bash
npm run lint               # Lint all workspaces
npm run format             # Format with Prettier
npm run check-types        # TypeScript type checking across all workspaces
npm run test               # Run lint + type checks
```

### Database Operations (from root)

```bash
npm run --workspace=server db:push      # Push schema changes to database
npm run --workspace=server db:generate  # Generate Prisma client
npm run --workspace=server db:studio    # Open Prisma Studio
npm run --workspace=server db:migrate   # Run migrations
npm run --workspace=server db:seed      # Seed database
```

### Workspace-Specific Commands

```bash
npm run lint --workspace=mobile        # Lint mobile app only
npm run check-types --workspace=server # Type check server only
```

## Architecture

### Mobile App Structure

**Routing**: Uses Expo Router (file-based routing)

- `app/_layout.tsx`: Root layout with TamaguiProvider, font loading, and navigation setup
- `app/(tabs)/_layout.tsx`: Tab navigation layout (Dashboard, Personal Progress, Leaderboard, Settings)
- `app/onboarding/`: Multi-step onboarding flow (personal profile → university → metrics → success)
- `app/(tabs)/index.tsx`: Dashboard home screen
- `app/+not-found.tsx`: 404 page

**UI Framework**: Tamagui

- Configuration: `tamagui.config.ts` extends `@tamagui/config/v4` with custom EcoCampus colors
- Tokens: `$primary` (green), `$secondary`, `$tertiary`, `$background`, etc.
- Shorthands: `f` (flex), `jc` (justifyContent), `ai` (alignItems), `p` (padding), `bg` (background)
- Native-only optimizations: `disableSSR: true`, `fastSchemeChange: true` for iOS DynamicColorIOS

**State Management**:

- Zustand for local state (see `src/store/useOnboardingStore.ts`)
- OnboardingStore tracks: profile data, university, metrics (distance, transport mode, housing), and preferences

**Component Organization**:

- `src/screens/`: Screen components (DashboardScreen, LeaderboardScreen, etc.)
- `src/hooks/`: Custom hooks like `useColorScheme.ts`
- `src/store/`: Zustand stores

**Styling Philosophy**:

- Prefer Tamagui primitives (`YStack`, `XStack`, `Button`, `Card`) over raw React Native `View`/`Text`
- Use design tokens (`$4`, `$background`, `$primary`) instead of hard-coded values
- Keep styles declarative and avoid inline hex colors

### Backend Structure

**Server Entry Point**: `apps/server/src/index.ts` → `server.ts` creates Express app

**tRPC Setup**:

- `src/trpc.ts`: tRPC initialization with SuperJSON transformer, Zod error formatting
- `src/context.ts`: Request context provides `req`, `res`, and `prisma` client
- `src/router.ts`: Main app router that combines all module routers

**Module-Based Architecture**:
All business logic organized in `src/modules/`:

- `auth/`: Authentication, onboarding, login (currently placeholder implementations with TODOs)
- `actions/`: Eco-friendly action tracking and submission
- `leaderboard/`: University leaderboard rankings
- `progress/`: User progress and stats
- `profile/`: User profile management

Each module exports a router (e.g., `authRouter`, `actionsRouter`) that gets merged into `appRouter`.

**Database**:

- PostgreSQL via Prisma ORM
- Schema: `apps/server/prisma/schema.prisma`
- Key models: `University`, `User`, `OnboardingSession`, `UserProfile`, `ActionCategory`, `ActionTemplate`, `ActionLog`, `LeaderboardSnapshot`, `UserStreak`
- After schema changes: run `db:generate` → `db:push`

### Shared Packages

**`packages/eslint-config`**: Shared ESLint configurations

- `base`: Base config for Node.js server
- `react-internal`: React-specific config for mobile app

**`packages/typescript-config`**: Shared TypeScript configurations

- `base.json`, `react-library.json`, `nextjs.json`

### Key Integrations

**Expo Router Navigation**:

- File-based routing where every file in `app/` becomes a route
- Use `Stack.Screen` to set navigation options (title, headerShown, etc.)
- Navigation state handled automatically; use `router.push()` or `<Link>` for navigation

**tRPC Type Safety**:

- Export `AppRouter` type from `src/router.ts`
- Mobile app should import this type for end-to-end type safety (not yet wired up)
- All procedures use Zod schemas for input validation

**Authentication Flow** (partially implemented):

- Onboarding: email + university code → verification code → account creation
- Login: email + password (JWT placeholder, needs implementation)
- Session management: TODO in `auth/router.ts`

## Development Workflow

1. **Starting Development**: Always run `npm run dev` from repo root to start both apps
2. **Hot Reload**: Expo provides instant refresh on mobile; server uses `tsx watch` for auto-restart
3. **Type Safety**: All code is TypeScript; run `npm run check-types` before commits
4. **Database Changes**: Update `schema.prisma` → `db:push` → `db:generate` → restart server
5. **Adding Routes**: Create new files in `apps/mobile/app/` following Expo Router conventions
6. **Adding API Endpoints**: Add procedures to relevant module router in `apps/server/src/modules/`

## Important Conventions

- **Monorepo Context**: Always run commands from repo root when possible; use `--workspace=` for app-specific tasks
- **Import Aliases**: Mobile app uses `@/` alias for `apps/mobile/` directory
- **Node Version**: Requires Node.js ≥18
- **Package Manager**: Uses npm (specified in `packageManager` field)
- **ESM**: Server uses ES modules (`type: "module"` in package.json); use `.js` extensions in imports
- **Branch Names**: Currently on `onboarding` branch; main branch is `main`

## Code Quality Standards

**NEVER use the following anti-patterns:**

- `any` type in TypeScript - Always use proper types, `unknown`, or generics
- `@ts-ignore` or `@ts-expect-error` - Fix the underlying type issue instead
- `eslint-disable` comments - Address the lint rule violation properly
- `eslint-disable-next-line` - Same as above; fix the issue, don't suppress it
- `@ts-nocheck` - Never disable type checking for entire files
- commenting the lines / code

If you encounter type errors or lint warnings, solve them by:

1. Adding proper type definitions
2. Refactoring code to satisfy the rules
3. If a rule is genuinely incorrect for the project, discuss removing it from the ESLint config rather than suppressing it inline

## Testing

Run `npm run test` to verify code quality before commits. This command runs:

- `npm run lint` - ESLint checks across all workspaces
- `npm run check-types` - TypeScript type checking across all workspaces

No unit tests or testing libraries are configured. The test command only validates linting and type safety.

## Troubleshooting

- **Expo stuck/red screen**: Press `r` in terminal or run `npm start -- --clear` in `apps/mobile`
- **Port conflicts (3000, 8081)**: `lsof -ti:3000 -ti:8081 | xargs kill -9`
- **Database errors**: Re-run `db:generate` and `db:push`
- **Clean install**: `rm -rf node_modules apps/*/node_modules && npm install`
- **Wrong Node version**: Ensure `node --version` shows ≥18

## Notes for AI Code Assistants

- The auth system has placeholder implementations marked with `TODO` comments in `apps/server/src/modules/auth/router.ts`
- Mobile app doesn't yet have tRPC client wired up; API integration is pending
- Database is PostgreSQL (not SQLite despite README mentioning it)
- Onboarding flow is actively being developed (see uncommitted files in `app/onboarding/` and `src/store/`)
- Tamagui is configured for native-only (no web support enabled)
