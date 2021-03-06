const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const routes = require('./routes/routes');
var mongodb = require('./config/mongodb_connector');
var defS = require('./config/default_data');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());
routes(app);

var env = process.argv[2] || 'dev';
switch (env) {
    case 'dev':
      mongodb.createDevConnection();
      break;
    case 'prod':
      mongodb.createProdConnection();
      break;
    case 'test':
      mongodb.createTestConnection();
      break;
}

app.listen(process.env.PORT || 3000, () => {
    console.log('App is ready for requests.')
  })
  .on('error', (error) => {
    console.warn('Warning', error.toString());
});

defS.addDefaultSeason();
// defS.addDefaultOperator();
// defS.addDefaultSiegeMap();

module.exports = app;