-- Creates tables
CREATE TABLE IF NOT EXISTS users (
  id varchar(50) NOT NULL,
  first_name TEXT,
  last_name TEXT,
  status TEXT,
  role TEXT,
  email TEXT,
  confirmed BOOLEAN,
  image_url TEXT,
  date_created TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS plants (
  id varchar(50) NOT NULL,
  plant_name varchar(50) NOT NULL,
  category varchar(50) NOT NULL,
  status varchar(50) NOT NULL,
  user_id varchar(50) NOT NULL,
  image_url TEXT,
  date_planted TIMESTAMP,
  date_created TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS zones (
  id varchar(50) NOT NULL,
  zone varchar(50) NOT NULL,
  title varchar(50) NOT NULL,
  description TEXT,
  planting TEXT,
  temperature TEXT[],
  vegetables TEXT[],
  fruit_trees TEXT[],
  herbs TEXT[]
);

CREATE TABLE IF NOT EXISTS zones_zipcodes (
  id varchar(50) NOT NULL,
  zipcode varchar(50) NOT NULL,
  zone varchar(50) NOT NULL,
  t_range varchar(50) NOT NULL
);
