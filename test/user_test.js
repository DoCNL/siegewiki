const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const User = require('../src/models/user')
const app = require('../server')
// var chaiHttp = require('chai-http');
// chai.use(chaiHttp)
// chai.should()

describe('The usercontroller can', () => {
    it('can create a new user', (done) => {
        request(app)
            .post('/api/user/register')
            .send({
                name: 'TestUser',
                password: 'TestPassword'
            })
            .end(() => {
            User.findOne({
                name: 'TestUser',
                password: 'TestPassword'
            }).then(user => {
                assert(user !== 'null')
                done();
            })
        })
    });
});