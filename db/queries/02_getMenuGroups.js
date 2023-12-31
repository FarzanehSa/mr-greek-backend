const db = require('../connection');

const getMenuGroups = () => {
  return db.query(`
    SELECT id, name as group, active FROM menu_groups
    WHERE menu_groups.active = true
    ORDER BY menu_groups.id;`
  )
    .then(data => {
      return data.rows;
    });
}

module.exports = { getMenuGroups };
