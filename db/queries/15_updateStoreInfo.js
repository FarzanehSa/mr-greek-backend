const db = require('../connection');

const updateStoreInfo = (id, storename, logo, address, tel) => {
  return db.query(`
    UPDATE store_settings
    SET name = $2, logo = $3, address= $4, tel = $5
    WHERE store_settings.id = $1
    RETURNING *;`, [id, storename, logo, address, tel]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { updateStoreInfo };
