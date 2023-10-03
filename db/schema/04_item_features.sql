-- Drop and recreate item_features table

DROP TABLE IF EXISTS item_features CASCADE;
CREATE TABLE item_features (
  id SERIAL PRIMARY KEY NOT NULL,
  menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
  feature_id INTEGER REFERENCES features(id) ON DELETE CASCADE
);