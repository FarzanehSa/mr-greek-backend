-- Drop and recreate menu_groups table

DROP TABLE IF EXISTS menu_groups CASCADE;
CREATE TABLE menu_groups (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true
);
