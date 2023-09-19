const db = require('../connection');

const findUser = (username) => {
  return db.query(`
  SELECT *
    FROM users
    WHERE users.username = $1;`, [username]
  )
    .then(data => {
      return data.rows[0];
    });
}

module.exports = { findUser };
