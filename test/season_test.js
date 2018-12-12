var app = require('../server'),
  chai = require('chai'),
  request = require('supertest');
var expect = chai.expect;

describe('The seasoncontroller can ', function(){
    this.timeout(0);

    xit('fetch all seasons', function(done) {
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