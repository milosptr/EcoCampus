# Supabase Database Setup

This guide will help you connect your Supabase database to the EcoCampus application.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up or log in
2. Click **New Project**
3. Fill in your project details (name, database password, region)
4. Wait for your project to be created (takes a few minutes)

## Step 2: Get Your Database Connection Strings

1. In your Supabase project dashboard, go to **Project Settings** (gear icon in sidebar)
2. Click on **Database** in the settings menu
3. Scroll down to the **Connection String** section
4. You'll see two connection strings:

   **Transaction Pooler** (for `DATABASE_URL`):
   - Click the **Connection pooling** tab
   - Select **Transaction** mode
   - Copy the connection string (it looks like: `postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres`)

   **Direct Connection** (for `DIRECT_URL`):
   - Click the **Connection string** tab
   - Select **URI** format
   - Copy the connection string (it looks like: `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`)

## Step 3: Add Connection Strings to Your Project

1. Navigate to `apps/server/` folder in your project
2. Create a file named `.env` (if it doesn't exist)
3. Add the following lines, replacing the placeholders with your actual connection strings:

```env
DATABASE_URL=postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
DIRECT_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

**Important Notes:**

- Replace `[PASSWORD]` with your actual database password (the one you set when creating the project)
- Replace `[PROJECT-REF]` with your project reference ID (found in your Supabase project URL)
- Replace `[REGION]` with your project's region (e.g., `us-east-1`)
- Make sure there are no spaces around the `=` sign
- Never commit your `.env` file to git (it should already be in `.gitignore`)

## Step 4: Verify Your Connection

Run the following command from the project root to test your connection:

```bash
npm run db:push
```

If successful, you should see a message confirming that your schema was pushed to the database.

## Troubleshooting

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
