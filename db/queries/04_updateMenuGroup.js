const db = require('../connection');

const updateMenuGroup = (id, name) => {
  return db.query(`
    UPDATE menu_groups
    SET name = $2
    WHERE menu_groups.id = $1
    RETURNING *;`, [id, name]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { updateMenuGroup };
