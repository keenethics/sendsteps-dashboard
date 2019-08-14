const index = require('./index.test');
const { chai, apiBase, server, should, models, jwt } = index;
const _ = require('lodash');
const { createTestUser, testUser } = require('./helpers/modelsHelpers');

const { user: User, accounts: Account, timezones: Timezone, countries: Country } = models;

describe('GET /getProfileData', () => {
  let createdUser, createdAccount;

  before(done => {
    const date = new Date();
    const dateAfterYear = new Date(date.getFullYear() + 1, date.getMonth(), date.getDay());
    createTestUser()
      .then(user => {
        createdUser = user;

        return Account.create({
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
      })
      .then(account => {
        createdAccount = account;

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
      })
      .then(() => {
        done();
      })
      .catch(error => {
        console.log(error);
      });
  });

  it('correct request', done => {
    let timezoneData;

    Timezone.findAll()
      .then(timezones => {
        timezoneData = timezones;
        return Country.findAll({
          attributes: ['isoCode', 'name'],
          raw: true
        });
      })
      .then(countriesData => {
        const token = jwt.sign({ email: testUser.email }, process.env.JWT_PRIVATE_KEY);

        chai
          .request(server)
          .get(`${apiBase}/getProfileData`)
          .set('Authorization', `Bearer ${token}`)
          .then(res => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.user.should.be.a('object');
            res.body.account.should.be.a('object');
            res.body.timezones.should.be.eql(timezoneData);
            const isCountriesEqual = _.isEqual(res.body.countries, countriesData);
            isCountriesEqual.should.be.true;
            done();
          })
          .catch(err => console.log(err));
      })
      .catch(error => {
        console.error(error);
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
