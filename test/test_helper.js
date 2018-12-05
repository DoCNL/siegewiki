const mongoose = require('mongoose')
mongoose.Promise = global.Promise

before((done) => {


    mongoose.connect('mongodb://localhost/siegewiki_test', {useNewUrlParser: true})

    mongoose.connection
        .once('open', () => {
            done()
        })
        .on('error', (error) => {
            console.warn('Warning:', error)
            done()
        })
})

// beforeEach((done) => {
//     mongoose.connection.collections.users.drop(() => {
//         mongoose.connection.collections.operators.drop(() => {
//             mongoose.connection.collections.seasons.drop(() => {
//                 mongoose.connection.collections.siegemaps.drop(() => {
//                 done();
//                 })
//             })
//         })
//     })
// })