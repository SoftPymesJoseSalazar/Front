/*
  # Interview Platform Schema

  1. New Tables
    - `default_questions`
      - `id` (uuid, primary key)
      - `role` (text) - The job role
      - `questions` (jsonb) - Array of default questions
      - `created_at` (timestamp)

    - `interviews`
      - `id` (uuid, primary key)
      - `user_id` (uuid) - References auth.users
      - `role` (text) - The job role
      - `status` (text) - Interview status (completed, in_progress)
      - `score` (integer) - Overall interview score
      - `created_at` (timestamp)

    - `interview_qa`
      - `id` (uuid, primary key)
      - `interview_id` (uuid) - References interviews
      - `question` (text)
      - `answer` (text)
      - `score` (integer)
      - `feedback` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Default questions table
CREATE TABLE IF NOT EXISTS default_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL,
  questions jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE default_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read default questions"
  ON default_questions
  FOR SELECT
  TO authenticated
  USING (true);

-- Interviews table
CREATE TABLE IF NOT EXISTS interviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  role text NOT NULL,
  status text NOT NULL DEFAULT 'in_progress',
  score integer,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE interviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create their interviews"
  ON interviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their interviews"
  ON interviews
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their interviews"
  ON interviews
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Interview Q&A table
CREATE TABLE IF NOT EXISTS interview_qa (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  interview_id uuid REFERENCES interviews ON DELETE CASCADE NOT NULL,
  question text NOT NULL,
  answer text NOT NULL,
  score integer,
  feedback text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE interview_qa ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create interview QA"
  ON interview_qa
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM interviews
      WHERE id = interview_qa.interview_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can read their interview QA"
  ON interview_qa
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM interviews
      WHERE id = interview_qa.interview_id
      AND user_id = auth.uid()
    )
  );