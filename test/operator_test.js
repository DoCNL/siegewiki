var app = require('../server'),
    chai = require('chai'),
    request = require('supertest');
var expect = chai.expect;
var Operator = require('../src/models/operator');
var User = require('../src/models/user');

describe('The request: ', function () {
    this.timeout(0);

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

    var operatorEdited = {
        name: 'OperatorEditedName',
        description: 'This operator is used in an editing test.',
        imageLink: 'No need for that',
        side: 'Defender'
    };

    beforeEach(async () => {
        await Operator.deleteMany({});
        await User.deleteMany({});
    })

    //Route tests that are expected to resolve successfully

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

    it('put on /api/operator works', function (done) {
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
                                    .put('/api/operator/' + foundOp._id)
                                    .set({ 'Authorization': token })
                                    .send(operatorEdited)
                                    .end(function (err, res) {
                                        if (err) console.log(err);
                                        expect(res.statusCode).to.equal(200);
                                        done();
                                    });
                            })
                    });
            });
    });

    it('delete on /api/operator works', function (done) {
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
                                    .delete('/api/operator/' + foundOp._id)
                                    .set({ 'Authorization': token })
                                    .end(function (err, res) {
                                        if (err) console.log(err);
                                        expect(res.statusCode).to.equal(200);
                                        done();
                                    });
                            })
                    });
            });
    });

    //route tests that are expected to resolve unsuccessfully

    it('post on /api/operator does not work without the right information', function (done) {
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
                    .send() //no name, description, imageLink and side are given
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(401);
                        done();
                    });
            });
    });

    it('post on /api/operator does not work without a token', function (done) {
        chai.request(app)
            .post('/api/operator/')
            .send(operator)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(401);
                done();
            });
    });

    it('post on /api/operator does not work without a valid token', function (done) {
        chai.request(app)
            .post('/api/operator/')
            .set({ 'Authorization': 'Bearer faketoken' })
            .send(operator)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(401);
                done();
            });
    });

    it('delete on /api/operator does not work without a token', function (done) {
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
                                    .delete('/api/operator/' + foundOp._id)
                                    //.set({ 'Authorization': token })
                                    .end(function (err, res) {
                                        if (err) console.log(err);
                                        expect(res.statusCode).to.equal(401);
                                        done();
                                    });
                            })
                    });
            });
    });

    //route tests that ensure data ends up in the database

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

});