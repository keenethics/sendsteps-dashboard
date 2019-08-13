const index = require('./index.test');
const { chai, apiBase, server, should, models, jwt } = index;
const _ = require('lodash');

const { user: User, accounts: Account, timezones: Timezone, countries: Country } = models;

describe('GET /getProfileData', () => {
  let createdUser, createdAccount;
  const testUser = {
    firstName: 'Test',
    lastName: 'Test',
    email: 'test_getProfileData@gmail.com',
    password: 'password'
  };

  before(done => {
    const date = new Date();
    const dateAfterYear = new Date(date.getFullYear() + 1, date.getMonth(), date.getDay());
    const userRole = 'admin';

    User.create({
      ...testUser,
      role: userRole,
      auth_key: '',
      accountId: 1337,
      origin: 'origin',
      emailUnconfirmed: '',
      isDeleted: 0,
      createdDate: date.toLocaleString(),
      lastUsedDate: date.toLocaleString(),
      created_at: Math.round(Date.now() / 1000),
      updated_at: Math.round(Date.now() / 1000),
      moderatorSharingToken: '',
      isGuidedTourTake: 0
    })
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
