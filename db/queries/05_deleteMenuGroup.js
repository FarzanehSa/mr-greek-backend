const db = require('../connection');

const deleteMenuGroup = (id) => {
  return db.query(`
    UPDATE menu_groups
    SET active = false
    WHERE menu_groups.id = $1
    RETURNING *;`, [id]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { deleteMenuGroup };
