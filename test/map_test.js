var app = require('../server'),
    chai = require('chai'),
    request = require('supertest');
var expect = chai.expect;
var SiegeMap = require('../src/models/siegemap');

describe('The seasoncontroller can ', function () {
    this.timeout(0);

    it('fetch all maps', function (done) {
        request(app)
            .get('/api/siegemaps')
            .end(function (err, res) {
                if (err) console.log(err);
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('array');
                done();
            })
    })


    var user = {
        name: 'MapCreateTest',
        password: 'testpasswordChai'
    };

    var map = {
        name: 'MapTest',
        description: 'This map is used in a test.',
        imageLink: 'No need for that',
        rankedAvailability: true
    };


    it('log in and create a map', function (done) {
        SiegeMap.collection.drop(() => {
            var token = 'Bearer ';
            request(app)
                .post('/api/user/register')
                .send(user)
                .end(function (err, res) {
                    expect(res.body.auth).to.equal(true);
                    expect(res.statusCode).to.equal(200);
                    token = 'Bearer ' + res.body.token;
                    chai.request(app)
                        .post('/api/siegemap/')
                        .set({ 'Authorization': token })
                        .send(map)
                        .end(function (err, res) {
                            expect(res.statusCode).to.equal(200);
                            done();
                        });
                });
        });
    });
});