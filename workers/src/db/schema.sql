-- Naengteori Database Schema (Cloudflare D1)

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  nickname TEXT NOT NULL,
  profile_image_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_allergies (
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  ingredient_name TEXT NOT NULL,
  PRIMARY KEY (user_id, ingredient_name)
);

CREATE TABLE IF NOT EXISTS scans (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS recognized_ingredients (
  id TEXT PRIMARY KEY,
  scan_id TEXT REFERENCES scans(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT,
  confidence REAL NOT NULL,
  confirmed BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS recipes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT CHECK(difficulty IN ('easy', 'medium', 'hard')),
  cooking_time INTEGER,
  calories INTEGER,
  image_url TEXT,
  is_ai_generated BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cooking_steps (
  id TEXT PRIMARY KEY,
  recipe_id TEXT REFERENCES recipes(id) ON DELETE CASCADE,
  step_order INTEGER NOT NULL,
  instruction TEXT NOT NULL,
  duration INTEGER,
  tip TEXT
);

CREATE TABLE IF NOT EXISTS favorites (
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  recipe_id TEXT REFERENCES recipes(id) ON DELETE CASCADE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, recipe_id)
);

CREATE TABLE IF NOT EXISTS cooking_history (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  recipe_id TEXT REFERENCES recipes(id) ON DELETE CASCADE,
  rating INTEGER CHECK(rating BETWEEN 1 AND 5),
  memo TEXT,
  cooked_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
