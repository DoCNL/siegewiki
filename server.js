//create 3 functions in mongodb_connector:
//  one to start test db,
//  other to start regular db,
//  other to start dev db(ran from mlab, not heroku)
const mongoose = require('mongoose');
const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const routes = require('./routes/routes');
var mongodb = require('./config/mongodb_connector');
const config = require('./config/mongodb_config');

app.use(bodyParser.json());
routes(app);

app.listen(3000, () => {
    console.log('App is ready for requests on localhost:3000 or heroku')
  })

module.exports = app;