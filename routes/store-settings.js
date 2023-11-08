const express = require('express');
const router  = express.Router();

const {getStoreInfo} = require('../db/queries/14_getStoreInfo');
const {updateStoreInfo} = require('../db/queries/15_updateStoreInfo');
const {deleteSlides} = require('../db/queries/16_deleteSlides');
const {addSlide} = require('../db/queries/17_addSlide');
const {getSlides} = require('../db/queries/18_getSlides');

router.get('/', (req, res) => {

  const id = 1;
  const f1 = getStoreInfo(id);
  const f2 = getSlides();

  Promise.all([f1, f2])
  .then(([settings, updatedSlides]) => {
    const newSlides = updatedSlides.map(row => row.slide)
    res.json({ settings, newSlides });
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

router.post("/", async(req, res) => {

  const {slides} = req.body;

  const deletedTable = await deleteSlides();
  const promiseArr = slides.map((row, index) => {
    const id = index + 1;
    return(addSlide(id, row));
  });

  const addTo = await Promise.all(promiseArr);
  const updatedSlides = await getSlides();
  
  const slidesArr = updatedSlides.map(row => row.slide)
  res.json({ newSlides: slidesArr});

  // deleteSlides()
  // .then(r1 => {
  //   console.log('r1', r1);
  //   Promise.all(promiseArr)
  //   .then(r2 => {
  //     console.log('r2', r2);
  //     getSlides()
  //     .then(data => {
  //       console.log(data);
  //       // res.json({ newMenuItems: data });
  //       return;
  //     })
  //   })
  // })
  // .catch(err => {
  //   console.log(err.message);
  //   res
  //   .status(500)
  //   .json({ error: err.message });
  // });
});

module.exports = router;