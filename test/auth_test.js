var app = require('../server'),
  chai = require('chai'),
  request = require('supertest');
var expect = chai.expect;

describe('The authcontroller can ', function(){
    this.timeout(0);
    var user = {
        name: 'testnameChai',
        password: 'testpasswordChai'
    };

    it('block requests if no token is provided', function(done) {
        request(app)
            .delete('/api/user')
            .send(user)
            .end(function(err, res) {
                if(err) console.log(err);
                expect(res.statusCode).to.equal(401); 
                done(); 
            })
    })
});