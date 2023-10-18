const express = require('express');
const router  = express.Router();

const {getFeatures} = require('../db/queries/10_getFeatures');


router.get('/', (req, res) => {

  const f1 = getFeatures();

  Promise.all([f1])
  .then(([features]) => {
    res.json({ features });
    return;
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
  });;
});

module.exports = router;