const db = require('../connection');

const getFeatures = () => {
  return db.query(`
  SELECT * FROM features
  ORDER BY id;`
  )
    .then(data => {
      return data.rows;
    });
}

module.exports = { getFeatures };