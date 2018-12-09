const mongoose = require('mongoose')
const mongodb = require('../config/mongodb_connector');

before(() => {
    mongoose.disconnect();
    mongodb.createTestConnection();
});

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        mongoose.connection.collections.operators.drop(() => {
            mongoose.connection.collections.seasons.drop(() => {
                mongoose.connection.collections.siegemaps.drop(() => {
                done();
                })
            })
        })
    })
})