-- Drop and recreate Slides table

DROP TABLE IF EXISTS slides CASCADE;

CREATE TABLE slides (
  id SERIAL PRIMARY KEY NOT NULL,
  slide VARCHAR(255) NOT NULL
);
