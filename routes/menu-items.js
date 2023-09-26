const express = require('express');
const router  = express.Router();

const {getMenuItems} = require('../db/queries/06_getMenuItems');
const {addMenuItem} = require('../db/queries/07_addMenItem');
const { updateMenuItem } = require('../db/queries/08_updateMenuItem');
const { deleteMenuItem } = require('../db/queries/09-deleteMenuItem');

router.get('/', (req, res) => {

  const f1 = getMenuItems();

  Promise.all([f1])
  .then(([items]) => {
    res.json({ items });
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

  deleteMenuItem(id)
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

  const noImg = 'https://res.cloudinary.com/demoshoebox/image/upload/v1695702421/Mr.Greek/important/no-image_byi9g0.jpg';
  const {id, groupId, price, description, image} = req.body;

  const item = req.body.item.trim().split("").map(
    (x, i) => {
      if (i === 0) return (x.toUpperCase());
      else return (x.toLowerCase());
    }
  ).join("");

  updateMenuItem(id, item, groupId, Math.trunc(price * 100), description, image || noImg)
  .then(updated => {
    getMenuItems()
    .then(data => {
      res.json({ newMenuItems: data });
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


// Add new menu-item
router.post("/", (req, res) => {

  const noImg = 'https://res.cloudinary.com/demoshoebox/image/upload/v1695702421/Mr.Greek/important/no-image_byi9g0.jpg';
  const {groupId, price, description, image} = req.body;
  const item = req.body.item.trim().split("").map(
    (x, i) => {
      if (i === 0) return (x.toUpperCase());
      else return (x.toLowerCase());
    }
  ).join("");

  addMenuItem(groupId, item, Math.trunc(price * 100), description, image || noImg)
  .then(newMenuItem => {
    getMenuItems()
    .then(data => {
      res.json({ newMenuItems: data });
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
