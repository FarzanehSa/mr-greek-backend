const db = require('../connection');

const addMenuGroup = (name) => {
  return db.query(`
    INSERT INTO menu_groups (name)
    VALUES ($1)
    RETURNING *;`, [name]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { addMenuGroup };
