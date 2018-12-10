const mongoose = require('mongoose');
const config = require('./mongodb_config');

mongoose.Promise = global.Promise;

var dbMethod = '';
function getMethod() {
    return this.dbMethod;
}

function createDevConnection() {
    mongoose.connect(config.dburl_dev, { useNewUrlParser: true });
    var connection = mongoose.connection
        .once('open', () => {
            console.log('Connected to Mongo on MLab locally')
            dbMethod = 'dev';
        })
        .on('error', (error) => {
            console.warn('Warning', error.toString());
        });
}

function createTestConnection() {
    mongoose.connect('mongodb://localhost/siegewiki_test', {useNewUrlParser: true})
    var connection = mongoose.connection
        .once('open', () => {
            console.log('Connected to Mongo on localhost to test')
            dbMethod = 'test';
        })
        .on('error', (error) => {
            console.warn('Warning', error.toString());
        });
}

function createProdConnection() {
    mongoose.connect(config.dburl, { useNewUrlParser: true });
    var connection = mongoose.connection
        .once('open', () => {
            console.log('Connected to Mongo on MLab via heroku')
            dbMethod = 'prod';
        })
        .on('error', (error) => {
            console.warn('Warning', error.toString());
        });
}

var connection = mongoose.connection

module.exports = {
    connection,
    createDevConnection,
    createTestConnection,
    createProdConnection,
    getMethod
}