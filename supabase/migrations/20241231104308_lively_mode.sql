/*
  # Add profile fields and improve companions table

  1. Changes
    - Add name field to profiles table
    - Add profile viewing capabilities
    - Improve companions table with profile information
*/

-- Add name field to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS name text NOT NULL DEFAULT '';

-- Add policy for viewing profiles
CREATE POLICY "Anyone can view profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

-- Update companions table to include task location matching
CREATE OR REPLACE FUNCTION check_location_match() RETURNS TRIGGER AS $$
BEGIN
  -- Check if the user's location matches the task's venue
  IF NOT EXISTS (
    SELECT 1 FROM profiles p
    JOIN tasks t ON NEW.task_id = t.id
    WHERE p.id = NEW.user_id AND p.location = t.venue
  ) THEN
    RAISE EXCEPTION 'Location mismatch: User cannot join tasks in different locations';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ensure_location_match
  BEFORE INSERT ON companions
  FOR EACH ROW
  EXECUTE FUNCTION check_location_match();