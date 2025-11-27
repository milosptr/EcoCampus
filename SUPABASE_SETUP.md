# Supabase Database Setup

This guide will help you connect your Supabase database to the EcoCampus application.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up or log in
2. Click **New Project**
3. Fill in your project details (name, database password, region)
4. Wait for your project to be created (takes a few minutes)

## Step 2: Get Your Supabase Credentials

You'll need to gather several pieces of information from your Supabase project dashboard. Go to **Project Settings** (gear icon in sidebar) to find all of these.

### 2.1 Database Connection Strings

1. Click on **Database** in the settings menu
2. Scroll down to the **Connection String** section
3. You'll need two connection strings:

   **Transaction Pooler** (for `DATABASE_URL`):
   - Click the **Connection pooling** tab
   - Select **Transaction** mode
   - Copy the connection string (it looks like: `postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres`)

   **Direct Connection** (for `DIRECT_URL`):
   - Click the **Connection string** tab
   - Select **URI** format
   - Copy the connection string (it looks like: `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`)

### 2.2 Supabase API Credentials

1. Click on **API** in the settings menu (or go to **Data API**)
2. Find the following values:

   **Project URL** (for `SUPABASE_URL`):
   - Found under **Project URL** or **Project Settings** > **API** > **Project URL**
   - Format: `https://[PROJECT-REF].supabase.co`

   **Anon Key** (for `EXPO_PUBLIC_SUPABASE_ANON_KEY`):
   - Found under **Project API keys** > **anon** `public` key
   - This is safe to expose in client-side code

   **Service Role Key** (for `SUPABASE_SERVICE_ROLE_KEY`):
   - Found under **Project API keys** > **service_role** key
   - ⚠️ **KEEP SECRET** - Only use on backend, never expose to client
   - Has elevated privileges and bypasses Row Level Security

### 2.3 JWT Secret (for Token Verification)

1. Still in **API** settings, scroll down to **JWT Settings**
2. Find the **JWT Secret** value
3. Copy this value (it's a long base64-encoded string)

**Important**: This is NOT a secret you generate yourself - you must use the exact secret provided by Supabase. This secret is used to verify that JWT tokens were actually signed by Supabase.

## Step 3: Set Up Server Environment Variables

1. Navigate to `apps/server/` folder in your project
2. Copy the example file: `cp .env.example .env`
3. Open `.env` and fill in the following values:

```env
# Server
PORT=3000

# Database Connection (PostgreSQL via Supabase)
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# Supabase Services (Auth, Storage, Realtime)
SUPABASE_URL="https://[PROJECT-REF].supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your_service_role_key_here"

# Authentication (JWT Secret from Step 2.3)
SUPABASE_JWT_SECRET="your_jwt_secret_from_supabase_dashboard"
```

**Important Notes:**

- Replace `[PASSWORD]` with your actual database password (the one you set when creating the project)
- Replace `[PROJECT-REF]` with your project reference ID (found in your Supabase project URL)
- Replace `[REGION]` with your project's region (e.g., `us-east-1`)
- Make sure there are no spaces around the `=` sign
- Never commit your `.env` file to git (it should already be in `.gitignore`)

## Step 4: Set Up Mobile App Environment Variables

1. Navigate to `apps/mobile/` folder in your project
2. Copy the example file: `cp .env.example .env`
3. Open `.env` and fill in the following values:

```env
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_SUPABASE_URL=https://[PROJECT-REF].supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_google_client_id
```

**Notes:**

- `EXPO_PUBLIC_API_URL`: Use `http://localhost:3000` for local development, or your production server URL
- `EXPO_PUBLIC_SUPABASE_URL`: Use the same Project URL from Step 2.2
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`: Use the anon/public key from Step 2.2
- `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`: Get this from [Google Cloud Console](https://console.cloud.google.com/) if you're using Google Sign-In

## Step 5: Verify Your Connection

Run the following command from the project root to test your database connection:

```bash
npm run db:push
```

If successful, you should see a message confirming that your schema was pushed to the database.

## Troubleshooting

### Database Connection Issues

**Connection refused or timeout errors:**

- Double-check that you copied the entire connection string correctly
- Verify your database password is correct
- Make sure your IP address is allowed (check **Database** > **Connection Pooling** > **Allowed IPs** in Supabase)

**Password contains special characters:**

- If your password has special characters like `@`, `#`, `%`, you may need to URL-encode them:
  - `@` becomes `%40`
  - `#` becomes `%23`
  - `%` becomes `%25`
  - Or change your database password to avoid special characters

**Can't find Connection String section:**

- Make sure you're in **Project Settings** > **Database**
- Scroll down past the connection pooler settings
- The connection strings are near the bottom of the Database settings page

### API Credentials Issues

**Can't find API keys:**

- Go to **Project Settings** > **API** (or **Data API**)
- Look for **Project API keys** section
- The `anon` key is labeled as `public` - this is safe for client-side use
- The `service_role` key should be kept secret and only used server-side

**Mobile app can't connect to Supabase:**

- Verify `EXPO_PUBLIC_SUPABASE_URL` matches your Project URL exactly (including `https://`)
- Check that `EXPO_PUBLIC_SUPABASE_ANON_KEY` is the correct `anon`/`public` key
- Make sure you've restarted your Expo dev server after adding environment variables
- Environment variables prefixed with `EXPO_PUBLIC_` are bundled at build time, so restart is required

**Server authentication errors:**

- Verify `SUPABASE_SERVICE_ROLE_KEY` is the `service_role` key (not the `anon` key)
- Check that `SUPABASE_JWT_SECRET` is the correct JWT Secret from Step 2.3 (not a self-generated value)
- Ensure `SUPABASE_URL` matches your Project URL exactly
- If you get JWT verification errors, double-check you copied the entire JWT Secret from Supabase Dashboard
