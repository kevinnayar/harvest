-- Creates tables
CREATE TABLE IF NOT EXISTS users (
  id varchar(50) NOT NULL,
  user_name varchar(50) NOT NULL,
  status varchar(50) NOT NULL,
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
  first_frost_day INT NOT NULL,
  first_frost_month INT NOT NULL,
  last_frost_day INT NOT NULL,
  last_frost_month INT NOT NULL
);

CREATE TABLE IF NOT EXISTS zones_zipcodes (
  id varchar(50) NOT NULL,
  zipcode varchar(50) NOT NULL,
  zone varchar(50) NOT NULL,
  t_range varchar(50) NOT NULL
);
