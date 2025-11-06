# EcoCampus

A monorepo project built with Turborepo containing an Expo mobile app and a Node.js server with tRPC and Prisma.

## Project Structure

```
EcoCampus/
├── apps/
│   ├── mobile/          # Expo React Native mobile app
│   └── server/          # Node.js + tRPC + Prisma API server
└── packages/            # Shared packages (if any)
```

## Prerequisites

Before you start, make sure you have the following installed on your computer:

### 1. Install Node.js

**Check if you have Node.js:**

```bash
node --version
```

If you don't have Node.js installed:

- **Windows/Mac/Linux**: Download and install from [nodejs.org](https://nodejs.org/)
  - Download the **LTS version** (recommended)
  - Run the installer and follow the instructions
  - Restart your terminal after installation

After installation, verify it works:

```bash
node --version
npm --version
```

You should see version numbers (Node.js 18 or higher is required).

### 2. Install Git (Optional but recommended)

Download from [git-scm.com](https://git-scm.com/)

## Getting Started

Follow these steps to run the project on your local machine:

### Step 1: Clone or Download the Project

If you have Git:

```bash
git clone <repository-url>
cd EcoCampus
```

Or download the ZIP file and extract it, then open a terminal in the project folder.

### Step 2: Install Dependencies

Install all packages for the entire monorepo:

```bash
npm install
```

This will install dependencies for both the mobile app and server.

### Step 3: Set Up the Server Database

Navigate to the server directory and set up the database:

```bash
# Copy the environment variables file
cp apps/server/.env.example apps/server/.env

# Generate Prisma client
cd apps/server
npx prisma generate

# Create the database
npx prisma db push

# Go back to root
cd ../..
```

## Running the Project

### Option 1: Run Everything at Once

From the root directory, start both the mobile app and server:

```bash
npm run dev
```

This will start:

- **Server** at `http://localhost:3000`
- **Mobile app** with Expo

### Option 2: Run Individually

**Terminal 1 - Start the Server:**

```bash
cd apps/server
npm run dev
```

The server will start at `http://localhost:3000`

**Terminal 2 - Start the Mobile App:**

```bash
cd apps/mobile
npm start
```

Follow the Expo instructions to:

- Press `i` for iOS simulator (Mac only)
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your phone

## Testing the Server

Once the server is running, you can test it:

**Health Check:**

```bash
curl http://localhost:3000/health
```

**View Database (Prisma Studio):**

```bash
cd apps/server
npm run db:studio
```

This opens a GUI at `http://localhost:5555` to view and edit your database.

## Common Commands

From the **root directory**:

```bash
# Install all dependencies
npm install

# Start development mode (both apps)
npm run dev

# Build all apps
npm run build

# Run type checking
npm run check-types

# Format code
npm run format
```

From **apps/server**:

```bash
# Start server in development mode
npm run dev

# Build the server
npm run build

# Start production server
npm start

# Generate Prisma client
npm run db:generate

# Push database schema changes
npm run db:push

# Open Prisma Studio
npm run db:studio
```

From **apps/mobile**:

```bash
# Start Expo
npm start

# Start on iOS
npm run ios

# Start on Android
npm run android

# Start web version
npm run web
```

## Troubleshooting

### Port Already in Use

If you get an error that port 3000 is already in use:

**On Mac/Linux:**

```bash
lsof -ti:3000 | xargs kill -9
```

**On Windows:**

```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Module Not Found

If you see "module not found" errors:

```bash
# Clean install
rm -rf node_modules
rm -rf apps/*/node_modules
npm install
```

### Prisma Issues

If you have database issues:

```bash
cd apps/server
npx prisma generate
npx prisma db push
```

### Expo Issues

If Expo won't start:

```bash
cd apps/mobile
rm -rf node_modules
npm install
npm start -- --clear
```

## Project Technology Stack

### Mobile App (apps/mobile)

- **Expo** - React Native framework
- **React Native** - Mobile app development
- **Expo Router** - File-based routing
- **TypeScript** - Type safety

### Server (apps/server)

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **tRPC** - Type-safe APIs
- **Prisma** - Database ORM
- **SQLite** - Database (default, can be changed)
- **TypeScript** - Type safety

### Monorepo

- **Turborepo** - Monorepo build system
- **npm workspaces** - Package management

## Next Steps

1. **Customize the database schema**: Edit `apps/server/prisma/schema.prisma`
2. **Add API endpoints**: Edit `apps/server/src/router.ts`
3. **Build mobile screens**: Add files in `apps/mobile/app/`
4. **Connect mobile to server**: Install tRPC client in mobile app

## Need Help?

- **Expo Documentation**: [docs.expo.dev](https://docs.expo.dev)
- **tRPC Documentation**: [trpc.io](https://trpc.io)
- **Prisma Documentation**: [prisma.io/docs](https://www.prisma.io/docs)
- **Turborepo Documentation**: [turbo.build/repo/docs](https://turbo.build/repo/docs)

## License

Private project for educational purposes
