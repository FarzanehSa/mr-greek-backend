const db = require('../connection');

const getStoreSettings = (id) => {
  return db.query(`
    SELECT name as storename, tel, logo, address FROM store_settings
    WHERE id = $1;`, [id]
  )
    .then(data => {
      return data.rows;
    });
}

module.exports = { getStoreSettings };
