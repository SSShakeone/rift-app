-- Run this in the Supabase SQL Editor to create the database schema
-- https://supabase.com/dashboard/project/eiwufvaswxsyrgzdalrv/sql/new

-- records table
CREATE TABLE IF NOT EXISTS records (
  id TEXT PRIMARY KEY,
  device_id TEXT NOT NULL,
  direction TEXT NOT NULL CHECK (direction IN ('external', 'internal')),
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  sub_tags JSONB DEFAULT '[]'::jsonb,
  intensity INTEGER NOT NULL CHECK (intensity >= 1 AND intensity <= 10),
  target_person TEXT,
  target_scene TEXT,
  free_text TEXT,
  sting_sentence TEXT,
  worst_point TEXT,
  desired_treatment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_records_device_id ON records(device_id);
CREATE INDEX IF NOT EXISTS idx_records_created_at ON records(device_id, created_at DESC);

-- candies table
CREATE TABLE IF NOT EXISTS candies (
  id TEXT PRIMARY KEY,
  device_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('self_acceptance', 'boundary', 'insight', 'growth', 'humor')),
  content TEXT NOT NULL,
  opened_at TEXT NOT NULL,
  is_collected BOOLEAN NOT NULL DEFAULT false,
  related_record_ids JSONB DEFAULT '[]'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_candies_device_id ON candies(device_id);
CREATE INDEX IF NOT EXISTS idx_candies_opened_at ON candies(device_id, opened_at DESC);

-- RLS
ALTER TABLE records ENABLE ROW LEVEL SECURITY;
ALTER TABLE candies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_all_records" ON records FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_all_candies" ON candies FOR ALL TO anon USING (true) WITH CHECK (true);
