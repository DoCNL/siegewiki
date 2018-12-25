const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const mongodb = require('../config/mongodb_connector');
const User = require('../src/models/user');
var Operator = require('../src/models/operator');
var SiegeMap = require('../src/models/siegemap');
var Season = require('../src/models/season');

    //this.timeout("10s");

    before(() => {
        mongoose.disconnect();
        mongodb.createTestConnection();
    });

    // beforeEach((done) => {
    //     //mongoose.connection.db.dropCollection('users', function(err, result) { done()});
    //     User.collection.drop(() => {
    //         SiegeMap.collection.drop(() => {
    //             Operator.collection.drop(() => {
    //                 Season.collection.drop(() => {
    //                     done();
    //                 });
    //             });
    //         });
    //     });
    // });
