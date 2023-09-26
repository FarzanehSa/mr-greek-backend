const db = require('../connection');

const updateMenuItem = (id, service, groupId, price, description, image) => {
  return db.query(`
    UPDATE menu_items
    SET name = $2, menu_group_id = $3,
      price = $4, description = $5, image = $6
    WHERE menu_items.id = $1
    RETURNING *;`, [id, service, groupId, price, description, image]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { updateMenuItem };
