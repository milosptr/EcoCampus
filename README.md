# EcoCampus Student Guide

Welcome! This handbook walks you (a first-time Expo + React Native developer) from installing Node.js to building UI with Tamagui inside the EcoCampus monorepo. Keep it open while you work.

## Why EcoCampus?

- Mobile app (`apps/mobile`) built with Expo Router, React Native, Tamagui, and TypeScript.
- Server (`apps/server`) built with Node.js, Express, tRPC, and Prisma for typed APIs.
- Turborepo + npm workspaces tie everything together so one install powers all apps.

## Quick Reference

- `npm install` – install everything
- `npm run dev` – start Expo + server together
- `npm run dev:app` – start Expo only (from repo root)
- `npm run dev:server` – start the API only (from repo root)
- `npm run lint`, `npm run format`, `npm run check-types` – keep code healthy

## 1. Set Up Your Computer

### 1.1 Install Node.js (v18 or newer)

1. Check your current version:

   ```bash
   node --version
   npm --version
   ```

2. If you need Node.js, use a version manager so you can switch versions later:
   - **macOS / Linux**
     - Install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
     - Close and reopen your terminal, then run:
       ```bash
       nvm install --lts
       nvm use --lts
       ```
   - **Windows**
     - Install [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)
     - In PowerShell (Run as Administrator):
       ```powershell
       nvm install lts
       nvm use lts
       ```
   - If version managers scare you, you can download the LTS installer from [nodejs.org](https://nodejs.org/) and run it. Just know that nvm makes upgrades and fixes easier.

### 1.2 Install Git

- Download from [git-scm.com](https://git-scm.com/) and accept default options.
- After installing, run `git --version` to confirm.

### 1.3 Install Expo tooling

- Install the Expo Go app on your iOS or Android phone.
- Install device simulators/emulators if you want to run locally:
  - macOS: install Xcode from the App Store (includes iOS Simulator).
  - Windows/macOS: install Android Studio → follow the “Android setup” wizard to get an emulator.

### 1.4 Nice-to-have tools

- **Watchman** (macOS): `brew install watchman` improves file watching.
- **VS Code** or your favorite editor with TypeScript support.

## 2. Clone the Monorepo

```bash
git clone <repository-url>
cd EcoCampus
```

If you downloaded a ZIP, extract it and open a terminal inside the extracted `EcoCampus` directory.

## 3. Install Dependencies

Run once at the project root to install everything for both apps and shared packages:

```bash
npm install
```

This creates a single `node_modules/` at the root plus any app-specific ones that Expo or Prisma need.

## 4. Project Tour

```
EcoCampus/
├── apps/
│   ├── mobile/        # Expo React Native app
│   └── server/        # Node + Express + tRPC API
├── packages/          # Shared lint + TypeScript configs
└── turbo.json         # Turborepo pipeline configuration
```

- `apps/mobile/app/` uses [Expo Router](https://docs.expo.dev/router/introduction/) for file-based navigation.
- `apps/mobile/src/` holds reusable components, hooks, and constants.
- `apps/server/prisma/` contains the database schema.
- `apps/server/src/` is the TypeScript backend (entry point `src/index.ts`).

## 5. Run the Apps

### 5.1 Run everything together (recommended)

```bash
npm run dev
```

Turborepo launches:

- Expo dev server (mobile app) with QR code, web dashboard, and simulator controls.
- Backend API at `http://localhost:3000`.

Leave this terminal running and open a new terminal for extra commands.

### 5.2 Run one app at a time

- Expo only:

  ```bash
  npm run dev:app
  ```

  This proxies to `apps/mobile` and runs `expo start`.

- API only:

  ```bash
  npm run dev:server
  ```

  This proxies to `apps/server` and runs `tsx watch src/index.ts`.

### 5.3 Use the Expo developer menu

- Press `i` for iOS simulator (macOS + Xcode only).
- Press `a` for Android emulator (Android Studio must be open).
- Scan the QR code with Expo Go to run it on your device.
- Shake your device or press `Cmd+D` / `Ctrl+M` to open the Expo dev menu (fast refresh, reload, network logs).

## 6. Prepare the Server Database

1. Copy environment variables:

   ```bash
   cp apps/server/.env.example apps/server/.env
   ```

   Edit `DATABASE_URL` if you want something other than the default SQLite file.

2. Generate the Prisma client and create the database:

   ```bash
   cd apps/server
   npx prisma generate
   npx prisma db push
   cd ../..
   ```

3. Optional: open Prisma Studio to explore data:

   ```bash
   npm run --workspace=server db:studio
   ```

## 7. How to Write Code in Expo + Tamagui

### 7.1 Understand Expo Router

- Every file in `apps/mobile/app` becomes a route.
- Tabs and nested navigation live in folders. Example: `apps/mobile/app/(tabs)/leaderboard/index.tsx` renders the “Leaderboard” tab screen.
- Create a new screen by copying one of the existing files in `app/(tabs)/` and updating the component.

Minimal screen example:

```tsx
// apps/mobile/app/(tabs)/events/index.tsx
import { Stack } from 'expo-router'
import { YStack, H1, Paragraph } from 'tamagui'

export default function EventsScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Events' }} />
      <YStack f={1} p='$4' gap='$3'>
        <H1>Upcoming Events</H1>
        <Paragraph>Start by replacing this text with real data.</Paragraph>
      </YStack>
    </>
  )
}
```

### 7.2 Tamagui overview

- Tamagui is a cross-platform design system built on top of React Native primitives.
- Configuration lives in `apps/mobile/tamagui.config.ts`. We extend `@tamagui/config/v4` and add custom colors for EcoCampus.
- Components such as `YStack`, `H1`, `Paragraph`, `Button`, and `Card` accept design tokens like `p="$4"` (padding) or `bg="$primary"`.
- Themes (`light` and `dark`) are defined in the config. Switch between them via device settings or Tamagui’s `Theme` component.

Common Tamagui patterns:

```tsx
import { Button, XStack } from 'tamagui'

export function ActionRow() {
  return (
    <XStack jc='space-between' ai='center' gap='$3'>
      <Button theme='active' onPress={() => console.log('Primary')}>
        Primary Action
      </Button>
      <Button variant='outlined' onPress={() => console.log('Secondary')}>
        Secondary
      </Button>
    </XStack>
  )
}
```

Tips:

- To add new colors or tokens, update `customColors` and the `themes` section in `tamagui.config.ts`.
- Tamagui uses shorthands (`f` for flex, `jc` for justifyContent). Read the [Shorthand reference](https://tamagui.dev/docs/core/configuration#shorthands).
- Use the [Tamagui playground](https://tamagui.dev/play) to experiment with layouts before pasting into the app.

### 7.3 Styling guidelines

- Prefer Tamagui primitives over raw `View` / `Text`, but you can drop down to React Native components when needed.
- Keep styles declarative by using tokens (`$4`, `$background`, `$color`). Avoid hard-coded hex values in components.

## 8. Code Quality Workflow

- **TypeScript:** All files end in `.ts`/`.tsx`. Type errors break builds; run `npm run check-types` to find them.
- **Linting:** `npm run lint` (root) or `npm run lint --workspace=mobile` to focus on the mobile app.
- **Formatting:** `npm run format` uses Prettier. Configure editor “format on save” for `.ts`, `.tsx`, `.md`.
- **Testing:** The project currently has minimal automated tests. Use `react-test-renderer` and add Jest when needed.
- **Git workflow:**
  - Create a new branch for each feature.
  - Make small commits with descriptive messages (`feat: add leaderboard filter`).
  - Push your branch and open a pull request for review.

## 9. Working with the API

- Server entry point: `apps/server/src/index.ts` sets up Express and tRPC routes defined in `apps/server/src/router.ts`.
- Prisma schema: `apps/server/prisma/schema.prisma`. Update the schema, then run:

  ```bash
  npm run --workspace=server db:push
  npm run --workspace=server db:generate
  ```

- When you change the server, restart `npm run dev` or the individual `npm run dev:server` window to pick up changes.

## 10. Troubleshooting

- **Wrong Node version?** Run `nvm use --lts` (or reinstall Node) until `node --version` prints ≥ 18.
- **Expo bundler stuck or red screen?** Press `r` in the terminal or `Cmd+Shift+K` in the simulator, then run `npm start -- --clear` inside `apps/mobile`.
- **iOS simulator missing?** Open Xcode → Settings → Components → install a simulator (e.g., iOS 18). Then re-run `npm run dev` and press `i`.
- **Android emulator not showing up?** Open Android Studio → Device Manager → start a virtual device before pressing `a`.
- **Port already in use (3000 or 8081):**

  ```bash
  lsof -ti:3000 -ti:8081 | xargs kill -9
  ```

- **Database errors:** Re-run

  ```bash
  npm run --workspace=server db:generate
  npm run --workspace=server db:push
  ```

- **Missing packages:** Clean installs fix most issues:

  ```bash
  rm -rf node_modules apps/*/node_modules
  npm install
  ```

## 11. Learn More

- Expo: [docs.expo.dev](https://docs.expo.dev)
- Expo Router: [docs.expo.dev/router/introduction](https://docs.expo.dev/router/introduction)
- Tamagui: [tamagui.dev/docs](https://tamagui.dev/docs)
- React Native: [reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)
- Prisma: [prisma.io/docs](https://www.prisma.io/docs)
- Turborepo: [turbo.build/repo/docs](https://turbo.build/repo/docs)

## 12. Where to Ask Questions

- Check open issues or create a new one in your Git hosting tool.
- Reach out in your course chat or Discord with screenshots and terminal logs.
- Share the exact command you ran and the full error message—teammates can’t help without context.

Happy building! Once you get the app running, try editing `apps/mobile/src/screens/dashboard/DashboardScreen.tsx` and watch Expo refresh instantly.
