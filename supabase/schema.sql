-- PawsAdopt Database Schema for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- Owners table
-- ========================================
CREATE TABLE IF NOT EXISTS owners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- Pets table
-- ========================================
CREATE TABLE IF NOT EXISTS pets (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  breed TEXT NOT NULL,
  age TEXT NOT NULL,
  weight TEXT,
  color TEXT,
  gender TEXT CHECK (gender IN ('male', 'female')) NOT NULL,
  distance TEXT,
  location TEXT,
  description TEXT,
  images TEXT[] NOT NULL DEFAULT '{}',
  owner_id UUID REFERENCES owners(id) ON DELETE SET NULL,
  health TEXT[] DEFAULT '{}',
  is_urgent BOOLEAN DEFAULT FALSE,
  type TEXT CHECK (type IN ('dog', 'cat', 'rabbit')) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- Adoption Requests table
-- ========================================
CREATE TABLE IF NOT EXISTS adoption_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pet_id TEXT REFERENCES pets(id) ON DELETE CASCADE,
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  applicant_phone TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- Indexes for common queries
-- ========================================
CREATE INDEX IF NOT EXISTS idx_pets_type ON pets(type);
CREATE INDEX IF NOT EXISTS idx_pets_is_urgent ON pets(is_urgent);
CREATE INDEX IF NOT EXISTS idx_adoption_requests_pet_id ON adoption_requests(pet_id);
CREATE INDEX IF NOT EXISTS idx_adoption_requests_status ON adoption_requests(status);

-- ========================================
-- Enable Row Level Security (optional, open by default)
-- ========================================
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE adoption_requests ENABLE ROW LEVEL SECURITY;

-- Allow public read access to pets and owners
CREATE POLICY "Pets are viewable by everyone" ON pets
  FOR SELECT USING (true);

CREATE POLICY "Owners are viewable by everyone" ON owners
  FOR SELECT USING (true);

-- Allow public insert for adoption requests
CREATE POLICY "Anyone can submit adoption requests" ON adoption_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Adoption requests are viewable by everyone" ON adoption_requests
  FOR SELECT USING (true);

-- Allow public insert for pets (for admin/seeding)
CREATE POLICY "Anyone can insert pets" ON pets
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert owners" ON owners
  FOR INSERT WITH CHECK (true);
