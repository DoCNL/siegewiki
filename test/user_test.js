const assert = require('assert')
const request = require('supertest')
const chai = require('chai')
const mongoose = require('mongoose')
const User = require('../src/models/user')

const server = require('../server').app
var chaiHttp = require('chai-http');
chai.use(chaiHttp)
chai.should()

describe('The usercontroller can', () => {
    it('save a user', (done) => {
        const joe = new User({name: 'testdude2', password: 'testpass'});
 
        joe.save()
         .then (() => {
             //Has Joe been saved succesfully?
             assert(!joe.isNew);
             done();
         });
 
     });

    // Save a user
    it('create a new user in the mlab db', done => {
        User.count().then(count => {
            chai.request(server)
                .post('api/user/')
                .send({
                    "name": "Sjoerd Tester",
                    "password": "password123",
                    "admin": "false"
                })
                .end((err, res) => {
                    User.count().then(newCount => {
                        res.should.have.status(200)
                        res.should.be.json
                        //res.body.should.be.a('object')
                        assert(count + 1 === newCount)
                        done()
                    })
                })
        });
    });
});