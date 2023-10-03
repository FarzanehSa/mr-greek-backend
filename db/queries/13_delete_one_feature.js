const db = require('../connection');

const deleteOneFeature = (featureId, itemId) => {
  return db.query(`
    DELETE FROM item_features
    WHERE item_features.feature_id = $1 AND item_features.menu_item_id = $2
    RETURNING *;`, [featureId, itemId]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { deleteOneFeature };