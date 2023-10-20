const express = require('express');
const router  = express.Router();

const {getStoreInfo} = require('../db/queries/14_getStoreInfo');
const {updateStoreInfo} = require('../db/queries/15_updateStoreInfo');

router.get('/', (req, res) => {

  const id = 1;
  const f1 = getStoreInfo(id);

  Promise.all([f1])
  .then(([settings]) => {
    res.json({ settings });
    return;
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
  });;
});

router.put("/", (req, res) => {

  const {storename, logo, address, tel} = req.body;
  console.log(storename, logo, address, tel);
  const id = 1;

  updateStoreInfo(id, storename, logo, address, tel)
  .then(updated => {
    getStoreInfo(id)
    .then(settings => {
      res.json({ settings });
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