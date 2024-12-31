/*
  # Night Companion Initial Schema

  1. New Tables
    - `profiles`
      - Stores user profile information including location and Twitter handle
    - `tasks`
      - Stores task information including title, description, date, time, venue
    - `companions`
      - Junction table to track task companions

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  location text NOT NULL,
  twitter_handle text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  venue text NOT NULL,
  companions_needed integer NOT NULL,
  companions_joined integer DEFAULT 0,
  category text NOT NULL,
  status text DEFAULT 'open',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all tasks"
  ON tasks FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create tasks"
  ON tasks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks"
  ON tasks FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create companions junction table
CREATE TABLE IF NOT EXISTS companions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid REFERENCES tasks(id) NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  joined_at timestamptz DEFAULT now(),
  UNIQUE(task_id, user_id)
);

ALTER TABLE companions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all companions"
  ON companions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can join as companion"
  ON companions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave as companion"
  ON companions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);