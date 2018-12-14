const mongoose = require('mongoose');
mongoose.Promise = global.Promise
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');
const app = require('../server')
const User = require('../src/models/user');
const defData = require('../config/default_data');
var request = require('supertest');
var expect = chai.expect;

chai.should()
chai.use(chaiHttp)

const user = {
    name: 'testname',
    password: 'testpass'
}

describe('The authcontroller can ', function(){

    before((done) => {
        defData.addTestUser();
        done();
});

xit('returns a token on valid login', function(done) {
    request(app)
        .post('/api/user/login/')
        .send(user)
        .end(function(err, res) {
            if (err) console.log(err);
            if (res) console.log(res);
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