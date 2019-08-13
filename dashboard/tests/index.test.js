process.env.NODE_ENV = 'test';
process.env.API_BASE = '/api';
process.env.APP_PORT = 3006;

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
