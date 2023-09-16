const express  = require('express');
const router  = express.Router();

// router.get('/admin', (req, res) => {
//   const adminData = [
//     {id:1,
//     store: 1000,
//     password: 'abc'
//     },
//     {id:2,
//     store: 2000,
//     password: 'def'
//     },
//   ];

//   res.send(adminData);
// })

// router.post('/admin', async(req, res) => {
//   const {loginData} = req.body;
//   const data = await mySchemas.Admins.findOne(loginData).exec();
//   res.send(data);
// })

// router.post('/employee', async(req, res) => {
//   const {newPartner} = req.body;
//   const data = await mySchemas.Employees.create(newPartner);
//   res.send(data);
// })

module.exports = router;