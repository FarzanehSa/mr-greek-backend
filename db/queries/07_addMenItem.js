const db = require('../connection');

const addMenuItem = (groupId, item, price, description, image) => {
  return db.query(`
    INSERT INTO menu_items (menu_group_id, name, price, description, image)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`, [groupId, item, price, description, image]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { addMenuItem };
