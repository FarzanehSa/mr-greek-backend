-- Drop and recreate menu_items table

DROP TABLE IF EXISTS menu_items CASCADE;
CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  menu_group_id INTEGER REFERENCES menu_groups(id) ON DELETE CASCADE,

  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  image VARCHAR(512) NOT NULL,
  description TEXT,
  active BOOLEAN NOT NULL DEFAULT true
);
