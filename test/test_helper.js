const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const mongodb = require('../config/mongodb_connector');
const User = require('../src/models/user');

before(() => {
    mongoose.disconnect();
    mongodb.createTestConnection();
});

beforeEach((done) => {
    //this.timeout(0);
    // User.collection.drop(() => {
         done();
    // })
    //mongoose.connection.db.dropCollection('users', function(err, result) { done()});
    // users.drop(() => {
    //     //siegemaps.drop(() => {
    //         //operators.drop(() => {
    //             //seasons.drop(() => {
    //                 done();
    //            // });
    //        // });
    //    // });
    // });
});