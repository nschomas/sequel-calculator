# Supabase Setup Guide for Sequel Calculator

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in/create account
2. Click "New Project"
3. Choose organization and name your project (e.g., "sequel-calculator")
4. Set a strong database password and select a region close to your users
5. Wait for the project to initialize (takes ~2 minutes)

## Step 2: Get Connection Details

Once your project is ready:

1. Go to **Settings > Database**
2. Copy the **Connection string** (use the "Connection pooling" option)
3. It will look like: `postgresql://postgres.your-project:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres`
4. Replace `[YOUR-PASSWORD]` with your actual database password

5. Also go to **Settings > API** and note:
   - **Project URL**: `https://your-project.supabase.co`
   - **anon public key**: starts with `eyJhbGciOiJIUzI1NiI...`

## Step 3: Configure Environment Variables

Create a `.env` file in your project root with:

```bash
# Database Configuration
DATABASE_URL=postgresql://postgres.your-project:YOUR-PASSWORD@aws-0-us-west-1.pooler.supabase.com:6543/postgres

# Supabase Configuration (for future use)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Development
NODE_ENV=development
PORT=3000
```

## Step 4: Push Database Schema

After setting up your `.env` file, run:

```bash
npm run db:push
```

This will create the required tables in your Supabase database.

## Step 5: Test the Connection

Start the development server:

```bash
npm run dev
```

You should see:
- "Using Database storage" in the console
- "Database URL configured - using Supabase/Neon database"

The app will now save all responses to your Supabase database!

## Verification

You can verify data is being saved by:
1. Completing the wizard flow
2. Going to your Supabase dashboard > Table Editor
3. Checking the `responses` table for your data 