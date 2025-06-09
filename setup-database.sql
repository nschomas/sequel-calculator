-- Create responses table for Sequel Event Wizard
CREATE TABLE IF NOT EXISTS responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_name TEXT NOT NULL,
  comprehensive_exams INTEGER NOT NULL,
  optical_conversion_rate NUMERIC(5,4) NOT NULL,
  cash_pay_percentage NUMERIC(5,4) NOT NULL,
  mvc_conversion_percentage NUMERIC(5,4) NOT NULL,
  browser TEXT,
  device TEXT,
  os TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create users table (for compatibility)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);