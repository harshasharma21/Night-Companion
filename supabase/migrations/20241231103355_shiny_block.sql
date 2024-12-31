/*
  # Fix Tasks RLS Policies

  1. Changes
    - Add user_id to task creation
    - Update RLS policies for tasks table
    - Add function for incrementing companions count
*/

-- Update tasks table RLS policies
CREATE POLICY "Anyone can read tasks"
  ON tasks FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own tasks"
  ON tasks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Task owners can update their tasks"
  ON tasks FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to increment companions count
CREATE OR REPLACE FUNCTION increment_companions(task_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE tasks 
  SET companions_joined = companions_joined + 1,
      status = CASE 
        WHEN companions_joined + 1 >= companions_needed THEN 'closed'
        ELSE 'open'
      END
  WHERE id = task_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;