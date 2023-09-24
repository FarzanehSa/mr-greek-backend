const db = require('../connection');

const updateMenuItem = (id, service, groupId, price, description) => {
  return db.query(`
    UPDATE menu_items
    SET name = $2, menu_group_id = $3,
      price = $4, description = $5
    WHERE menu_items.id = $1
    RETURNING *;`, [id, service, groupId, price, description]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { updateMenuItem };
