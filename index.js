const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/router');
require('dotenv/config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const corsOptions = {
  origin: '*',
  credential: true,
  optionSuccessStatus:200,
}

app.use(cors(corsOptions));
app.use('/', router);

const Port = process.env.PORT || 4950;
const server = app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});