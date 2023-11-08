const db = require('../connection');

const getSlides = () => {
  return db.query(`
    SELECT * FROM slides
    ORDER BY id;`
  )
    .then(data => {
      return data.rows;
    });
}

module.exports = { getSlides };
