CREATE TABLE tasks (
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  plan_id VARCHAR(128),
  user_id VARCHAR(128) NOT NULL,
  assignee_id VARCHAR(128),
  title VARCHAR(200) NOT NULL,
  desc TEXT,
  completed BOOLEAN DEFAULT FALSE,
  completed_date INTEGER,
  created_date INTEGER,
  ref_id VARCHAR(128)
);

CREATE TABLE tracking_day (
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  user_id VARCHAR(128) NOT NULL,
  work_day INTEGER NOT NULL,
  nb_of_seconds INTEGER DEFAULT 0,
  ref_id VARCHAR(128),
  UNIQUE(user_id, work_day)
);

CREATE TABLE tracking_time (
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  tracking_day_id VARCHAR(36) NOT NULL,
  start_time INTEGER,
  stop_time INTEGER,
  nb_of_seconds INTEGER DEFAULT 0,
  ref_id VARCHAR(128)
);

CREATE TABLE tracking_screenshots (
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  tracking_day_id VARCHAR(36) NOT NULL,
  capture_time INTEGER,
  image_url TEXT,
  ref_id VARCHAR(128)
);

CREATE TABLE tracking (
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  user_id VARCHAR(128) NOT NULL,
  work_day INTEGER NOT NULL,
  start_time INTEGER NOT NULL,
  nb_of_seconds INTEGER DEFAULT 0,
  screenshots TEXT NULL,
  ref_id VARCHAR(128),
  UNIQUE(user_id, work_day, start_time)
);