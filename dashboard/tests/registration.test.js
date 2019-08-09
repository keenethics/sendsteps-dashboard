const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const server = require('../server');
const models = require('../server/models');
require('dotenv-safe').config();

chai.use(chaiHttp);

const { user: User } = models;
const apiBase = process.env.API_BASE || '/api';

describe('Registration test', () => {
  const testUser = {
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@gmail.com',
    password: 'password'
  };
  const takenEmail = 'taken@gmail.com';
  const userRole = 'admin';

  before(done => {
    const date = new Date();

    User.destroy({ where: { email: { [Op.or]: [testUser.email, takenEmail] } } }).then(() => {
      User.create({
        email: takenEmail,
        password: testUser.password,
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
  });

  describe('POST /registration', () => {
    it('correct registration request', done => {
      chai
        .request(server)
        .post(`${apiBase}/registration`)
        .send({ ...testUser })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.userId.should.be.a('number');
          res.body.userType.should.be.eql(userRole);

          const decoded = jwt.verify(res.body.jwt, process.env.JWT_PRIVATE_KEY);
          decoded.email.should.be.eql(testUser.email);

          done();
        });
    });

    it('incorrect registration (missing request body params)', done => {
      chai
        .request(server)
        .post(`${apiBase}/registration`)
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.message.should.be.a('string');

          done();
        });
    });

    it('incorrect registration (invalid body params)', done => {
      chai
        .request(server)
        .post(`${apiBase}/registration`)
        .send({
          email: 'wrong_email123@',
          password: 'short',
          firstName: '@#!@#!@',
          lastName: 'okay'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.message.should.be.a('string');

          done();
        });
    });

    it('incorrect registration (email already in use)', done => {
      chai
        .request(server)
        .post(`${apiBase}/registration`)
        .send({
          email: takenEmail,
          password: testUser.password,
          firstName: testUser.firstName,
          lastName: testUser.lastName
        })
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.body.message.should.be.a('string');

          done();
        });
    });
  });
});
