var app = require('../server'),
    chai = require('chai'),
    request = require('supertest');
var expect = chai.expect;
var Season = require('../src/models/season');
var User = require('../src/models/user');

describe('The seasoncontroller can ', function () {
    this.timeout(0);

    var user = {
        name: 'SeasonCreateTest',
        password: 'testpasswordChai'
    };

    var season = {
        name: 'seasonTest',
        description: 'This season is used in a test.',
        imageLink: 'No need for that',
        year: 2
    };

    beforeEach(async () => {
        await Season.deleteMany({});
        await User.deleteMany({});
    })

    it('fetch all seasons', function (done) {
        request(app)
            .get('/api/seasons')
            .end(function (err, res) {
                if (err) console.log(err);
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('log in and create a season', function (done) {
        Season.collection.drop(() => {
            var token = 'Bearer ';
            request(app)
                .post('/api/user/register')
                .send(user)
                .end(function (err, res) {
                    expect(res.body.auth).to.equal(true);
                    expect(res.statusCode).to.equal(200);
                    token = 'Bearer ' + res.body.token;
                    chai.request(app)
                        .post('/api/season/')
                        .set({ 'Authorization': token })
                        .send(season)
                        .end(function (err, res) {
                            if (err) console.log(err);
                            expect(res.statusCode).to.equal(200);
                            done();
                        });
                });
        });
    });
});