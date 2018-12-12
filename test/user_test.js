const assert = require('assert')
const mongoose = require('mongoose')
const User = require('../src/models/user')
var app = require('../server'),
  chai = require('chai'),
  request = require('supertest');
var expect = chai.expect;

// var chaiHttp = require('chai-http');
// chai.use(chaiHttp)
// chai.should()

describe('The usercontroller can',  function(){
    this.timeout(0);

    var user = {
        name: 'testnameChai',
        password: 'testpasswordChai'
    };
    it('should register a user', function(done) { 
    request(app)
        .post('/api/user/register')
        .send(user)
        .end(function(err, res) { 
            expect(res.statusCode).to.equal(200);  
            done(); 
        }); 
    });

    it('should fetch all seasons', function(done) {
        this.timeout(15000);
        request(app)
            .get('/api/seasons')
            .end(function(err, res) {
                if(err) console.log(err);
                expect(res.statusCode).to.equal(200); 
                expect(res.body).to.be.an('array'); 
                expect(res.body).to.be.empty; 
                done(); 
            })
    })
});

beforeEach( function(done) {
    this.timeout(0);
    const { users, operators, seasons, siegemaps } = mongoose.connection.collections;

    users.drop(() => {
        siegemaps.drop(() => {
            operators.drop(() => {
                seasons.drop(() => {
                    done();
                });
            });
        });
    });
});