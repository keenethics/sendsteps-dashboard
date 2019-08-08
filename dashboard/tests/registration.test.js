const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const server = require('../server');
const models = require('../server/models');
const should = chai.should();
require('dotenv-safe').config();

chai.use(chaiHttp);
const apiBase = process.env.API_BASE || '/api';

const { user: User } = models;

describe('Login test', () => {
  const testUser = {
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@gmail.com',
    password: 'password',
    passHash: '$2b$10$F3xshUyTCsviYAAZfT.WMOFGNteTMT6Pzbu7y4pmbrKCAcMdKS1cC'
  };
  const date = new Date();
  const userRole = 'admin';

  before(done => {
    User.create({
      email: testUser.email,
      password: testUser.passHash,
      firstName: testUser.firstName,
      lastName: testUser.lastName,
      role: userRole,
      auth_key: '',
      accountId: 0,
      origin: 'test',
      emailUnconfirmed: '',
      isDeleted: 0,
      createdDate: date.toLocaleString(),
      lastUsedDate: date.toLocaleString(),
      created_at: Math.round(Date.now() / 1000),
      updated_at: Math.round(Date.now() / 1000),
      moderatorSharingToken: '',
      isGuidedTourTake: 0
    }).then(() => done());
  });

  describe('/POST login', () => {
    it('correct login request', done => {
      chai
        .request(server)
        .post(`${apiBase}/login`)
        .send(testUser)
        .end((err, res) => {
          const { jwt: token } = res.body;
          const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

          res.should.have.status(200);
          res.body.should.be.a('object');
          decoded.email.should.be.eql(testUser.email);

          done();
        });
    });

    it('incorrect login request (with missing params)', done => {
      chai
        .request(server)
        .post(`${apiBase}/login`)
        .send()
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('incorrect login request (with wrong password)', done => {
      chai
        .request(server)
        .post(`${apiBase}/login`)
        .send({ email: testUser.email, password: "wrong" })
        .end((err, res) => {
          res.should.have.status(400);

          done();
        });
    });
  });
});
