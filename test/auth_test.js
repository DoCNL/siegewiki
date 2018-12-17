const mongoose = require('mongoose');
mongoose.Promise = global.Promise
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');
const app = require('../server')
const User = require('../src/models/user');
const defData = require('../config/default_data');
var request = require('supertest');
var expect = chai.expect;

chai.should()
chai.use(chaiHttp)

const user = {
    name: 'testname',
    password: 'testpass'
}

describe('The authcontroller can ', function () {

    before((done) => {
        defData.addTestUser();
        done();
    });
});