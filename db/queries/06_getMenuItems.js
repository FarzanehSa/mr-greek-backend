const db = require('../connection');

const getMenuItems = () => {
  return db.query(`
  SELECT menu_items.id, menu_items.name as item, menu_items.price,
    menu_items.description, menu_items.image,
    menu_groups.id as groupid, menu_groups.name as group,
    array_agg(item_features.feature_id) as features
    FROM menu_items
    JOIN menu_groups ON menu_items.menu_group_id = menu_groups.id
    LEFT JOIN item_features ON menu_items.id = item_features.menu_item_id
    WHERE menu_items.active IS true
    GROUP BY menu_items.id, menu_groups.id
    ORDER BY menu_groups.id, menu_items.id;`
  )
    .then(data => {
      return data.rows;
    });
}

module.exports = { getMenuItems };