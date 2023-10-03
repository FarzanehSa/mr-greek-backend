-- Drop and recreate features table

DROP TABLE IF EXISTS features CASCADE;
CREATE TABLE features (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(255),
  active BOOLEAN NOT NULL DEFAULT true
);
