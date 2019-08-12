const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const { DEFAULT_TIMEZONE, DEFAULT_AUDIENCE_SIZE } = require('../server/helpers/accountsConstants');
const {
  DEFAULT_TEXT_MESSAGING_SELECTED,
  DEFAULT_SESSION_TYPE
} = require('../server/helpers/sessionsConstants');
const server = require('../server');
const models = require('../server/models');
require('dotenv-safe').config();

chai.use(chaiHttp);

const apiBase = process.env.API_BASE || '/api';
const { user: User, accounts: Account, sessions: Session, phonenumbers: PhoneNumber } = models;

describe('Delete user test', () => {
  const testUser = {
    email: 'test_deleteUser@gmail.com',
    password: 'password',
    firstName: 'Test',
    lastName: 'Tester'
  };
  let createdUser, createdAccount, createdSession;

  before(async () => {
    const date = new Date();
    const dateAfterYear = new Date(date.getFullYear() + 1, date.getMonth(), date.getDay());

    createdUser = await User.create({
      email: testUser.email,
      password: testUser.password,
      firstName: testUser.firstName,
      lastName: testUser.lastName,
      role: 'admin',
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
    });

    createdAccount = await Account.create({
      users: 0,
      audienceSize: 20,
      licenceType: 'yearly',
      startDate: date.toLocaleString(),
      endDate: dateAfterYear.toLocaleString(),
      timezone: 'Europe/Amsterdam',
      pluginId: 1,
      address: '',
      city: 'UNKNOWN',
      country: 'UNKNOWN',
      paymentAmount: 0,
      responseCodeBase: 'sendsteps',
      sendstepsEducation: 0,
      university: '',
      postalCode: '',
      phonenumber: '1234567890',
      paymentMethod: 'UNKNOWN',
      accountOwner: createdUser.id
    });

    // Finding phone number record using client's country code
    const phoneNumber = await PhoneNumber.findOne({
      where: {
        countryIsoCode: 'NL'
      }
    });

    createdSession = await Session.create({
      accountId: createdAccount.id,
      loginCode: 'testLoginCode',
      userId: createdUser.id,
      startTime: date.toLocaleString(),
      endTime: dateAfterYear.toLocaleString(),
      timezone: DEFAULT_TIMEZONE,
      textMessagingSelected: DEFAULT_TEXT_MESSAGING_SELECTED,
      audienceSize: DEFAULT_AUDIENCE_SIZE,
      phoneNumberId: phoneNumber.id,
      internetKeyword: 'testMessage',
      textMessagingKeyword: 'testMessage',
      internetSelected: 1,
      anonymousSources: 1,
      twitterSelected: 0,
      autoApprove: 1,
      pluginId: 1,
      type: DEFAULT_SESSION_TYPE,
      name: '',
      loginToken: '',
      autoLogoutTime: date,
      moderatorSharingToken: ''
    });

    return User.update(
      {
        accountId: createdAccount.id
      },
      {
        where: {
          id: createdAccount.accountOwner
        }
      }
    );
  });

  describe('POST /deleteUser', () => {
    const token = jwt.sign({ email: testUser.email }, process.env.JWT_PRIVATE_KEY);

    it('incorrect delete user request (missing req body)', done => {
      chai
        .request(server)
        .post(`${apiBase}/deleteUser`)
        .set('Authorization', `Bearer ${token}`)
        .send()
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');

          done();
        });
    });

    it('incorrect delete user request (wrong security token)', done => {
      chai
        .request(server)
        .post(`${apiBase}/deleteUser`)
        .set('Authorization', `Wrong token`)
        .send({ id: createdUser.dataValues.id })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');

          done();
        });
    });

    it('incorrect delete user request (user is not allowed to delete himself)', done => {
      User.update(
        {
          role: 'user'
        },
        {
          where: {
            id: createdUser.dataValues.id
          }
        }
      )
        .then(() => {
          chai
            .request(server)
            .post(`${apiBase}/deleteUser`)
            .set('Authorization', `Bearer ${token}`)
            .send({ id: createdUser.dataValues.id })
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.a('object');
              res.body.should.have.property('message');

              User.update(
                {
                  role: 'admin'
                },
                {
                  where: {
                    id: createdUser.dataValues.id
                  }
                }
              ).then(() => done());
            });
        })
        .catch(error => {
          console.error(error);
          done();
        });
    });

    // should be at the end, because all tests use the same user record in table
    it('correct delete user request', done => {
      chai
        .request(server)
        .post(`${apiBase}/deleteUser`)
        .set('Authorization', `Bearer ${token}`)
        .send({ id: createdUser.dataValues.id })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.message.should.be.eql('User was deleted!');
          done();
        });
    });
  });

  after(done => {
    createdUser
      .destroy()
      .then(() => createdAccount.destroy())
      .then(() => createdSession.destroy())
      .then(() => done());
  });
});
