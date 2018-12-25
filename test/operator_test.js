var app = require('../server'),
    chai = require('chai'),
    request = require('supertest');
var expect = chai.expect;
var Operator = require('../src/models/operator');
var User = require('../src/models/user');

describe.only('The request: ', function () {
    this.timeout(0);

    beforeEach(async () => {
        await Operator.deleteMany({});
        await User.deleteMany({});
    })

    it('get on /api/operators works', function (done) {
        request(app)
            .get('/api/operators')
            .end(function (err, res) {
                if (err) console.log(err);
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('array');
                done();
            })
    })

    var user = {
        name: 'OperatorCreateTest',
        password: 'testpasswordChai'
    };

    var operator = {
        name: 'OperatorTest',
        description: 'This operator is used in a test.',
        imageLink: 'No need for that',
        side: 'Attacker'
    };

    it('get on /api/operator/:id works', function (done) {
        var token = 'Bearer ';
        request(app)
            .post('/api/user/register')
            .send(user)
            .end(function (err, res) {
                expect(res.body.auth).to.equal(true);
                expect(res.statusCode).to.equal(200);
                token = 'Bearer ' + res.body.token;
                chai.request(app)
                    .post('/api/operator/')
                    .set({ 'Authorization': token })
                    .send(operator)
                    .end(function (err, res) {
                        if (err) console.log(err);
                        expect(res.statusCode).to.equal(200);
                        Operator.findOne(operator)
                            .then(foundOp => {
                                chai.request(app)
                                    .get('/api/operator/' + foundOp._id)
                                    .end(function (err, res) {
                                        if (err) console.log(err);
                                        expect(res.statusCode).to.equal(200);
                                        expect(JSON.stringify(res.body._id)).to.equal(JSON.stringify(foundOp._id))
                                        done();
                                    });
                            });
                    });
            });
    });

    it('post on /api/operator works', function (done) {
        var token = 'Bearer ';
        request(app)
            .post('/api/user/register')
            .send(user)
            .end(function (err, res) {
                expect(res.body.auth).to.equal(true);
                expect(res.statusCode).to.equal(200);
                token = 'Bearer ' + res.body.token;
                chai.request(app)
                    .post('/api/operator/')
                    .set({ 'Authorization': token })
                    .send(operator)
                    .end(function (err, res) {
                        if (err) console.log(err);
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });
    });

    xit('put on /api/operator works', function (done) {
        var token = 'Bearer ';
        request(app)
            .post('/api/user/register')
            .send(user)
            .end(function (err, res) {
                expect(res.body.auth).to.equal(true);
                expect(res.statusCode).to.equal(200);
                token = 'Bearer ' + res.body.token;
                chai.request(app)
                    .post('/api/operator/')
                    .set({ 'Authorization': token })
                    .send(operator)
                    .end(function (err, res) {
                        if (err) console.log(err);
                        expect(res.statusCode).to.equal(200);
                        //add put request
                    });
            });
    });
});