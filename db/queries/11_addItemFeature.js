const db = require('../connection');

const addItemFeature = (featureId, itemId) => {
  return db.query(`
    INSERT INTO item_features (feature_id, menu_item_id)
    VALUES ($1, $2)
    RETURNING *;`, [featureId, itemId]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { addItemFeature };
