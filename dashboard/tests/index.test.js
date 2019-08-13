process.env.NODE_ENV = 'test';
process.env.API_BASE = '/api';
process.env.APP_PORT = 3006;

const sinon = require('sinon');
let forgotPasswordEmail = require('../server/emailSenders/forgotPasswordEmail');
let greetingsEmail = require('../server/emailSenders/greetingsEmail');

// Mock sendForgotEmail method
sinon.stub(forgotPasswordEmail, 'sendForgotEmail').callsFake(
  (email, resetPasswordUrl) => {
    console.log(`Sending email to ${email} with link ${resetPasswordUrl}`);
  }
);

// Mock sendGreetingsEmail method
sinon.stub(greetingsEmail, 'sendGreetingsEmail').callsFake(
  (email, firstName) => {
    console.log(`Sending email to ${email}, firstName - ${firstName}...`);
  }
);

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const models = require('../server/models');
const jwt = require('jsonwebtoken');
require('dotenv-safe').config();

const should = chai.should();

chai.use(chaiHttp);


const apiBase = process.env.API_BASE;

module.exports = {
  chai,
  apiBase,
  server,
  should,
  models,
  jwt,
};
