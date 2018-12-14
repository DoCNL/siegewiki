var app = require('../server'),
  chai = require('chai'),
  request = require('supertest');
var expect = chai.expect;
var Season = require('../src/models/season');

describe('The seasoncontroller can ', function(){
    this.timeout(0);

    it('fetch all seasons', function(done) {
        request(app)
            .get('/api/seasons')
            .end(function(err, res) {
                if(err) console.log(err);
                // console.log(res.body.seasons)
                // console.log(res.body)
                expect(res.statusCode).to.equal(200); 
                expect(res.body).to.be.an('array'); 
                done(); 
            });
    })

    it('fetch all operators', function(done) {
        request(app)
            .get('/api/operators')
            .end(function(err, res) {
                if(err) console.log(err);
                expect(res.statusCode).to.equal(200); 
                expect(res.body).to.be.an('array'); 
                expect(res.body).to.be.empty; 
                done(); 
            })
    })

    it('fetch all maps', function(done) {
        request(app)
            .get('/api/siegemaps')
            .end(function(err, res) {
                if(err) console.log(err);
                expect(res.statusCode).to.equal(200); 
                expect(res.body).to.be.an('array'); 
                expect(res.body).to.be.empty; 
                done(); 
            })
    })
});