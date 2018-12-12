const app = require('../server');
const chai = require('chai');
const request = require('supertest');
const chaiHttp = require('chai-http')
const assert = require('assert')
const User = require('../src/models/user');
var expect = chai.expect;
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

chai.should()
chai.use(chaiHttp)


describe('The authcontroller can ', function(){
    const user = {
        name: 'testname',
        password: 'testpass'
    }

    before((done) => {
        // Verwijder alle voorgaande users uit de tabel
        mongoose.connection.collections.users.drop(() => {
        })
        .then(() => {
            return User.create(user)  
        })
        .then(madeuser => {
            console.log(madeuser)
            done();
        })
});

it('returns a token on valid login', function(done) {
    chai.request(server)
        .post('/api/login')
        .send(user)
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.an('object');
            res.body.result.should.have.property('token').that.is.a('string');

            // export a valid token voor gebruik in andere testcases.
            module.exports = {
                token: res.body.result.token
            }
            done();
        });
});


    // this.timeout(0);

    // it('block requests if no token is provided', function(done) {
    //     request(app)
    //         .delete('/api/user')
    //         .send(user)
    //         .end(function(err, res) {
    //             if(err) console.log(err);
    //             expect(res.statusCode).to.equal(401); 
    //             done(); 
    //         })
    // })
});