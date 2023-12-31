// load .env data into process.env
require('dotenv/config');

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const Port = process.env.PORT || 4950;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// PG database client/connection setup
const { Client } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Client(dbParams);
db.connect();

const corsOptions = {
  origin: '*',
  credential: true,
  optionSuccessStatus:200,
}

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
const loginRoutes = require('./routes/login');
const menuGroupsRoutes = require('./routes/menu-groups');
const menuItemsRoutes = require('./routes/menu-items');
const featuresRoutes = require('./routes/features');
const storeSettingsRoutes = require('./routes/store-settings');

app.use('/api/login', loginRoutes);
app.use('/api/menu-groups', menuGroupsRoutes);
app.use('/api/menu-items', menuItemsRoutes);
app.use('/api/features', featuresRoutes);
app.use('/api/store-settings', storeSettingsRoutes);

const server = app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});