/*
  # Interview System Schema

  1. New Tables
    - `interview_sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `interview_type` (text)
      - `role` (text)
      - `experience_level` (text)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `interview_questions`
      - `id` (uuid, primary key)
      - `session_id` (uuid, references interview_sessions)
      - `question` (text)
      - `question_type` (text)
      - `order_number` (integer)
      - `created_at` (timestamptz)
    
    - `interview_answers`
      - `id` (uuid, primary key)
      - `question_id` (uuid, references interview_questions)
      - `session_id` (uuid, references interview_sessions)
      - `answer_text` (text)
      - `voice_url` (text)
      - `score` (integer)
      - `feedback` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Interview Sessions Table
CREATE TABLE interview_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  interview_type text NOT NULL,
  role text NOT NULL,
  experience_level text NOT NULL,
  status text NOT NULL DEFAULT 'in_progress',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Interview Questions Table
CREATE TABLE interview_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES interview_sessions ON DELETE CASCADE NOT NULL,
  question text NOT NULL,
  question_type text NOT NULL,
  order_number integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Interview Answers Table
CREATE TABLE interview_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid REFERENCES interview_questions ON DELETE CASCADE NOT NULL,
  session_id uuid REFERENCES interview_sessions ON DELETE CASCADE NOT NULL,
  answer_text text,
  voice_url text,
  score integer,
  feedback text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE interview_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_answers ENABLE ROW LEVEL SECURITY;

-- Policies for interview_sessions
CREATE POLICY "Users can view own sessions"
  ON interview_sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own sessions"
  ON interview_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions"
  ON interview_sessions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for interview_questions
CREATE POLICY "Users can view questions for own sessions"
  ON interview_questions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM interview_sessions
      WHERE interview_sessions.id = session_id
      AND interview_sessions.user_id = auth.uid()
    )
  );

-- Policies for interview_answers
CREATE POLICY "Users can manage own answers"
  ON interview_answers
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM interview_sessions
      WHERE interview_sessions.id = session_id
      AND interview_sessions.user_id = auth.uid()
    )
  );

-- Create indexes for better query performance
CREATE INDEX idx_interview_sessions_user_id ON interview_sessions(user_id);
CREATE INDEX idx_interview_questions_session_id ON interview_questions(session_id);
CREATE INDEX idx_interview_answers_session_id ON interview_answers(session_id);
CREATE INDEX idx_interview_answers_question_id ON interview_answers(question_id);