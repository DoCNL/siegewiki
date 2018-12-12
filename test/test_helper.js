const mongoose = require('mongoose')
mongoose.Promise = global.Promise

before((done) => {
    mongoose.disconnect();
    mongoose.connect('mongodb://localhost/siegewiki_test', { useNewUrlParser: true })
    var connection = mongoose.connection
        .once('open', () => {
            console.log('Connected to Mongo on localhost to test')
            done();
        })
        .on('error', (error) => {
            console.warn('Warning', error.toString());
        });
});

