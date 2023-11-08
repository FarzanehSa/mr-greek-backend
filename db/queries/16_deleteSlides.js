const db = require('../connection');

const deleteSlides = () => {
  return db.query(`
    DELETE FROM slides
    RETURNING *;`
    )
    .then(data => {
      return data.rows;
    });
  }

  module.exports = { deleteSlides };
