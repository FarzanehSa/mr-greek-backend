const db = require('../connection');

const deleteMenuItem = (id) => {
  return db.query(`
    UPDATE menu_items
    SET active = false
    WHERE id = $1
    RETURNING *;`, [id]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { deleteMenuItem};
