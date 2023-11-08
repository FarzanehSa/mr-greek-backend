const express = require('express');
const router  = express.Router();

const {getMenuItems} = require('../db/queries/06_getMenuItems');
const {addMenuItem} = require('../db/queries/07_addMenItem');
const { updateMenuItem } = require('../db/queries/08_updateMenuItem');
const { deleteMenuItem } = require('../db/queries/09-deleteMenuItem');
const { addItemFeature } = require('../db/queries/11_addItemFeature');
const { findFeature } = require('../db/queries/12_findFeature');
const { deleteOneFeature } = require('../db/queries/13_delete_one_feature');

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

router.put("/", async(req, res) => {

  const noImg = 'https://res.cloudinary.com/demoshoebox/image/upload/v1695702421/Mr.Greek/important/no-image.jpg';
  const {id, groupId, item, price, description, image, features} = req.body;

  // const {id, name, image, bio, level} = req.body.stylist;
  // const skills = req.body.skills;

  try {
    // const f1 = await updateStylist(id, name, image, bio, level);
    const f1 = await updateMenuItem(id, item, groupId, Math.trunc(price * 100), description, image || noImg);

    // const selectedSkills = skills.filter(row => row.select === true);
    const selectedFeatures = features.filter(row => row.select === true);
    // const unselectedSkills = skills.filter(row => row.select === false);
    const unselectedFeatures = features.filter(row => row.select === false);

    // const selectedSkillsLoop = async() => {
    const selectedFeaturesLoop = async() => {
      for (const f of selectedFeatures) {
        const data = await findFeature(f.id, id)
        if (!data) {
          await addItemFeature(f.id, id)
        }
      }
    }

    const unselectedFeaturesLoop = async() => {
      for (const f of unselectedFeatures) {
        const data = await findFeature(f.id, id)
        if (data) {
          // console.log('❌ Delete skill');
          await deleteOneFeature(f.id, id);
        }
      }
    }

    const f2 = await selectedFeaturesLoop();
    const f3 = await unselectedFeaturesLoop();
    const newMenuItems = await getMenuItems();

    res.json({ newMenuItems });
    return;
  } catch(err) {
    console.log(err.message);
    res
    .status(500)
    .json({ error: err.message });
  };
});

/* router.put("/", (req, res) => {

  const noImg = 'https://res.cloudinary.com/demoshoebox/image/upload/v1695702421/Mr.Greek/important/no-image_byi9g0.jpg';
  const {id, groupId, item, price, description, image, features} = req.body;

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
}); */


// Add new menu-item
router.post("/", (req, res) => {

  const noImg = 'https://res.cloudinary.com/demoshoebox/image/upload/v1695702421/Mr.Greek/important/no-image_byi9g0.jpg';
  const {groupId, item, price, description, image, features} = req.body;

  addMenuItem(groupId, item, Math.trunc(price * 100), description, image || noImg)
  .then(newMenuItem => {

    const promiseArr = features.filter(row => row.select === true).map(row => {
      addItemFeature(row.id, newMenuItem.id)
    });

    Promise.all(promiseArr)
    .then(data => {
      getMenuItems()
      .then(data => {
        res.json({ newMenuItems: data });
        return;
      })
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
