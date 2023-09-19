-- Drop and recreate Users table

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  access SMALLINT NOT NULL DEFAULT 0 -- 0 is admin, 1 is owner, 2 is customers
);
