const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const mongodb = require('../config/mongodb_connector');

before(() => {
    mongoose.disconnect();
    mongodb.createTestConnection();
});

beforeEach( function() {
    this.timeout(0);
    const { users, operators, seasons, siegemaps } = mongoose.connection.collections;

    // users.drop(() => {
    //     siegemaps.drop(() => {
    //         operators.drop(() => {
    //             seasons.drop(() => {
    //                 done();
    //             });
    //         });
    //     });
    // });
});