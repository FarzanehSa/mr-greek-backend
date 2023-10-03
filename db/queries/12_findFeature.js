const db = require('../connection');

const findFeature = (featureId, itemId) => {
  return db.query(`
    select * FROM item_features
    WHERE item_features.feature_id = $1 AND item_features.menu_item_id = $2
    ;`, [featureId, itemId]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { findFeature };