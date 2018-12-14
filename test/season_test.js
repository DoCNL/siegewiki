var app = require('../server'),
  chai = require('chai'),
  request = require('supertest');
var expect = chai.expect;

describe('The seasoncontroller can ', function(){
    this.timeout(0);

    it('fetch all seasons', function(done) {
        request(app)
            .get('/api/seasons')
            .end(function(err, res) {
                if(err) console.log(err);
                //console.log(res.body.seasons)
                expect(res.statusCode).to.equal(200); 
                expect(res.body).to.be.an('array'); 
                expect(res.body).to.be.empty; 
                done(); 
            })
    })
    const user = {
        name: 'testnameReg',
        password: 'testpassReg'
    }

    it.only('register a user', function (done) {
        app.post('/api/user/register',
            (req, res, next) => {
                verifyToken(req, res)
                    .then(() => next())
                    .catch(err => res.json(err))
            },
            (req, res, next) => {
                getThings(req, res)
                    .then(response => res.json(response))
                    .catch(err => res.json(err))
            });
    })

    xit('registers in', function(done) {
        request(app)
            .get('/api/user/register')
            .send(user)
            .then((res, err) => {
                if (err) console.log(err);
                if (res) console.log();
                expect(res.statusCode).to.equal(200); 
            })
            // .end(function(err, res) {
            //     if(err) console.log(err);
            //     console.log(res.body.seasons)
            //     expect(res.statusCode).to.equal(200); 
            //     expect(res.body).to.be.an('array'); 
            //     expect(res.body).to.be.empty; 
            //     done(); 
            // })
    })
});