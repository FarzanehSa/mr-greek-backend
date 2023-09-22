const express = require('express');
const router  = express.Router();

const {getMenuGroups} = require('../db/queries/02_getMenuGroups');
const {addMenuGroup} = require('../db/queries/03_addMenuGroup');
const {updateMenuGroup} = require('../db/queries/04_updateMenuGroup');
const {deleteMenuGroup} = require('../db/queries/05_deleteMenuGroup');

router.get('/', (req, res) => {

  const f1 = getMenuGroups();

  Promise.all([f1])
  .then(([groups]) => {
    res.json({ groups });
    return;
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
  });;
});

router.delete("/:id", (req, res) => {

  const id = req.params.id;

  deleteMenuGroup(id)
  .then(deleted => {

    res.json({ deleted });
    return;

  })
  .catch(err => {
    console.log(err.message);
    res
    .status(500)
    .json({ error: err.message });
  });
});

router.put("/", (req, res) => {

  const {id, name} = req.body.group;

  updateMenuGroup(id, name.trim().split("").map(
    (x, i) => {
      if (i === 0) return (x.toUpperCase());
      else return (x.toLowerCase());
    }
  ).join(""))
  .then(updated => {
    res.json({ updated });
    return;
  })
  .catch(err => {
    console.log(err.message);
    res
    .status(500)
    .json({ error: err.message });
  });
});


// Add new menu-group
router.post("/", (req, res) => {

  let menuGroup = req.body.group.name.trim().split("").map(
    (x, i) => {
      if (i === 0) return (x.toUpperCase());
      else return (x.toLowerCase());
    }
  ).join("");

  addMenuGroup(menuGroup)
  .then(newGroup => {
    getMenuGroups()
    .then(updateGroups => {
      res.json({ updateGroups });
      return;
    })
  })
  .catch(err => {
    console.log(err.message);
    res
    .status(500)
    .json({ error: err.message });
  });
});

module.exports = router;
