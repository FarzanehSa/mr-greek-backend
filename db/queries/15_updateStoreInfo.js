const db = require('../connection');

const updateStoreInfo = (id, storename, logo, address, tel, about) => {
  return db.query(`
    UPDATE store_settings
    SET name = $2, logo = $3, address= $4, tel = $5, about = $6
    WHERE store_settings.id = $1
    RETURNING *;`, [id, storename, logo, address, tel, about]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { updateStoreInfo };
