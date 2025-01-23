/*
  # Initial Schema Setup for MU20 Challenge Registration

  1. New Tables
    - schools
      - id (uuid, primary key)
      - name (text, unique)
      - created_at (timestamp)
    
    - users
      - id (uuid, primary key)
      - email (text, unique)
      - first_name (text)
      - last_name (text)
      - school_id (uuid, foreign key)
      - created_at (timestamp)

    - challenges
      - id (uuid, primary key)
      - name (text)
      - type (text)
      - start_date (timestamp)
      - end_date (timestamp)
      - created_at (timestamp)

    - teams
      - id (uuid, primary key)
      - name (text)
      - challenge_id (uuid, foreign key)
      - school_id (uuid, foreign key)
      - created_at (timestamp)

    - team_members
      - id (uuid, primary key)
      - team_id (uuid, foreign key)
      - user_id (uuid, foreign key)
      - is_leader (boolean)
      - created_at (timestamp)

    - preferences
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - challenge_id (uuid, foreign key)
      - preferences (jsonb)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create schools table
-- SQL code to create tables in Supabase with relationships (primary and foreign keys)

-- Table: schools
CREATE TABLE schools (
    school_id SERIAL PRIMARY KEY,
    school_name VARCHAR(255) NOT NULL,
    school_email VARCHAR(255) NOT NULL
);

-- Table: users
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    school_id INT REFERENCES schools(school_id),
    role VARCHAR(50) NOT NULL DEFAULT 'student'
);

-- Table: challenges
CREATE TABLE challenges (
    challenge_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

-- Table: teams
CREATE TABLE teams (
    team_id SERIAL PRIMARY KEY,
    team_name VARCHAR(255) NOT NULL,
    challenge_id INT REFERENCES challenges(challenge_id),
    school_id INT REFERENCES schools(school_id),
    leader_id INT REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table: preferences
CREATE TABLE preferences (
    preference_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    challenge_id INT REFERENCES challenges(challenge_id),
    team_id INT REFERENCES teams(team_id),
    answers JSONB NOT NULL
);

-- Table: registrations
CREATE TABLE registrations (
    registration_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    challenge_id INT REFERENCES challenges(challenge_id),
    team_id INT REFERENCES teams(team_id),
    status VARCHAR(50) NOT NULL CHECK (status IN ('confirmed', 'pending', 'canceled')),
    registration_date TIMESTAMP DEFAULT NOW(),
    last_modified TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE preferences ENABLE ROW LEVEL SECURITY;

-- Policies for schools
CREATE POLICY "Schools are viewable by everyone"
  ON schools FOR SELECT
  TO authenticated
  USING (true);

-- Policies for users
CREATE POLICY "Users can view their own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Policies for challenges
CREATE POLICY "Challenges are viewable by everyone"
  ON challenges FOR SELECT
  TO authenticated
  USING (true);

-- Policies for teams
CREATE POLICY "Teams are viewable by team members"
  ON teams FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = id
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create teams"
  ON teams FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policies for team_members
CREATE POLICY "Team members are viewable by team members"
  ON team_members FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members tm
      WHERE tm.team_id = team_id
      AND tm.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can join teams"
  ON team_members FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policies for preferences
CREATE POLICY "Users can view their own preferences"
  ON preferences FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create their preferences"
  ON preferences FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Insert initial schools
INSERT INTO schools (name) VALUES
  ('Delhi Public School'),
  ('St. Mary''s School'),
  ('Modern School'),
  ('The International School'),
  ('Cambridge International School');

-- Insert initial challenges with demo dates
INSERT INTO challenges (name, type, start_date, end_date) VALUES
  ('Entrepreneurship Challenge', 'entrepreneurship', now(), now() + interval '30 days'),
  ('Debating Challenge', 'debating', now(), now() + interval '30 days'),
  ('Impact Challenge', 'impact', now(), now() + interval '30 days'),
  ('United Nations Simulation (MUN)', 'mun', now(), now() + interval '30 days'),
  ('Theatrical Challenge', 'theatrical', now(), now() + interval '30 days');