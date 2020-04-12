-- Drops tables
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS plants;
DROP TABLE IF EXISTS plant_zones;

-- Creates tables
CREATE TABLE IF NOT EXISTS users (
  id varchar(50) NOT NULL,
  user_name varchar(50) NOT NULL,
  image_url TEXT,
  date_created TIMESTAMP
);

CREATE TABLE IF NOT EXISTS plants (
  id varchar(50) NOT NULL,
  user_id varchar(50) NOT NULL,
  plant_name varchar(50) NOT NULL,
  image_url TEXT,
  dob TIMESTAMP,
  date_created TIMESTAMP  
);

CREATE TABLE IF NOT EXISTS plant_zones (
  id varchar(50) NOT NULL,
  zipcode varchar(50) NOT NULL,
  zone varchar(50) NOT NULL,
  t_range varchar(50) NOT NULL
);