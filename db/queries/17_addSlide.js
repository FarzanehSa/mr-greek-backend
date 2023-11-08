const db = require('../connection');

const addSlide = (id, slide) => {
  return db.query(`
    INSERT INTO slides (id, slide)
    VALUES ($1, $2)
    RETURNING *;`, [id, slide]
  )
  .then(data => {
    return data.rows[0];
  });
}

module.exports = { addSlide };
