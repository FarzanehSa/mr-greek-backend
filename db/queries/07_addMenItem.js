const db = require('../connection');

const addMenuItem = (groupId, item, price, description) => {
  return db.query(`
    INSERT INTO menu_items (menu_group_id, name, price, description)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`, [groupId, item, price, description]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { addMenuItem };
