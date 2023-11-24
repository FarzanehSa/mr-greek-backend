const db = require('../connection');

const getStoreInfo = (id) => {
  return db.query(`
    SELECT name as storename, tel, logo, address, about FROM store_settings
    WHERE id = $1;`, [id]
  )
    .then(data => {
      return data.rows;
    });
}

module.exports = { getStoreInfo };
