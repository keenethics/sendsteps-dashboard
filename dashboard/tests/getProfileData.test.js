const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const server = require('../server');
const models = require('../server/models');
require('dotenv-safe').config();

chai.use(chaiHttp);
const apiBase = process.env.API_BASE || '/api';
const { user: User, accounts: Account, timezones: Timezone, countries: Country } = models;

/*
describe('getProfileData test', () => {
  let createdUser, createdAccount;
  const testUser = {
    firstName: 'Test',
    lastName: 'Test',
    email: 'getProfileData@gmail.com',
    password: 'password'
  };

  before(async () => {
    const date = new Date();
    const dateAfterYear = new Date(date.getFullYear() + 1, date.getMonth(), date.getDay());
    const userRole = 'admin';

    createdUser = await User.create({
      ...testUser,
      role: userRole,
      auth_key: '',
      accountId: 132,
      origin: 'origin',
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

  describe('GET /getProfileData', async () => {
    const email = 'test@gmail.com';

    it('correct request', async () => {
      const timezoneData = await Timezone.findAll();
      const countriesData = await Country.findAll({
        attributes: ['isoCode', 'name']
      });
      const token = jwt.sign({ email }, process.env.JWT_PRIVATE_KEY);

      chai
        .request(server)
        .get(`${apiBase}/getProfileData`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.user.should.be.a('object');
          res.body.account.should.be.a('object');
          res.body.timezones.should.be.eql(timezoneData);
          res.body.countries.should.be.eql(countriesData);
        });
    });
  });

  after(done => {
    createdAccount
      .destroy()
      .then(() => createdUser.destroy())
      .then(() => {
        done();
      });
  });
});
/*