#!/usr/bin/env node

// Simple script to test database connection
import { drizzle } from "drizzle-orm/neon-serverless";
import { responses } from "../shared/schema.js";

async function testConnection() {
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL not found in environment variables");
    console.log("Please create a .env file with your Supabase connection string");
    process.exit(1);
  }

  try {
    console.log("🔗 Testing database connection...");
    const db = drizzle(process.env.DATABASE_URL);
    
    // Try a simple query
    const result = await db.select().from(responses).limit(1);
    console.log("✅ Database connection successful!");
    console.log(`📊 Found ${result.length} existing responses in database`);
    
  } catch (error) {
    console.error("❌ Database connection failed:");
    console.error(error.message);
    process.exit(1);
  }
}

testConnection(); 