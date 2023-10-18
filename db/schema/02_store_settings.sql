-- Drop and recreate store_settings table

DROP TABLE IF EXISTS store_settings CASCADE;
CREATE TABLE store_settings (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  logo VARCHAR(255) NOT NULL,
  tel VARCHAR(255) NOT NULL
);