var User = require('../src/models/user');
const bcrypt = require('bcryptjs');
var app = require('../server'),
    chai = require('chai'),
    request = require('supertest'),
    chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

describe('The usercontroller can', function () {
    this.timeout(0);

    var user = {
        name: 'testnameChai',
        password: 'testpasswordChai',
        newPassword: 'nieuwepaslmao'
    };

    it('should register a user', function (done) {
        request(app)
            .post('/api/user/register')
            .send(user)
            .end(function (err, res) {
                //console.log(res.body)
                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    xit('should log a user in', function (done) {

        request(app)
            .post('/api/user/register')
            .send(user)
            .end(function (err, res) {
                //console.log(res.body)
                expect(res.statusCode).to.equal(200);
            })
        request(app)
            .post('/api/user/login')
            .send(user)
            .end(function (err, res) {
                //if (err) console.log(err);
                //if (res) console.log(res);
                //expect(res.statusCode).to.equal(200);  
                //expect(res.body.auth).to.equal(true);

                done();
            });
    })

    it.only('should log a user in', function (done) {
        var token = 'Bearer ';
        chai.request(app)
            .post('/api/user/register')
            .send(user)
            .then(function (err, res) {
                //if (err) console.log(err)
                token = 'Bearer ' + res.body.token
                console.log(token)
                expect(res.statusCode).to.equal(200);
                chai.request(app)
                .put('/api/user/')
                .set({ 'Authorization': token })
                .send({user})
                .end(function (err, res) { 
                    console.log(token);
                    expect(res.statusCode).to.equal(200);
                    //expect(res.body.auth).to.equal(true);
    
                    done();
                });
            })
            .then((done) => { 
            })
    })
});
