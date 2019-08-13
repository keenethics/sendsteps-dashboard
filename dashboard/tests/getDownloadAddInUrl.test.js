const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const index = require('./index.test');
const { chai, apiBase, server, should, models, jwt } = index;
const { DEFAULT_TIMEZONE, DEFAULT_AUDIENCE_SIZE } = require('../server/helpers/accountsConstants');
const {
  DEFAULT_TEXT_MESSAGING_SELECTED,
  DEFAULT_SESSION_TYPE
} = require('../server/helpers/sessionsConstants');

const {
  user: User,
  accounts: Account,
  sessions: Session,
  phonenumbers: PhoneNumber,
  addinsettings: Addinsetting
} = models;

describe('getDownloadAddInUrl test', () => {
  const originUrl = 'https://dashboard.sendsteps.com';
  const defaultUrl = 'https://update.sendsteps.com/Sendsteps.setup.exe';
  const testUser = {
    email: 'test_getDownloadAddInUrl@gmail.com',
    password: 'password',
    firstName: 'Test',
    lastName: 'Tester'
  };
  let createdUser, createdAccount, сreatedSession, addinsetting;
  const token = jwt.sign({ email: testUser.email }, process.env.JWT_PRIVATE_KEY);

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

    сreatedSession = await Session.create({
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

    await User.update(
      {
        accountId: createdAccount.id
      },
      {
        where: {
          id: createdAccount.accountOwner
        }
      }
    );

    addinsetting = await Addinsetting.findOne({
      where: {
        [Op.or]: [{ dashboardUrl: originUrl }, { id: сreatedSession.pluginId }]
      }
    });
  });

  it('correct getDownloadAddInUrl request', done => {
    const downloadUrl = addinsetting
      ? `https://update.sendsteps.com/${addinsetting.name}.setup.exe`
      : defaultUrl;

    chai
      .request(server)
      .post(`${apiBase}/getDownloadAddInUrl`)
      .set('Authorization', `Bearer ${token}`)
      .send({ userId: createdUser.id })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.url.should.be.eql(downloadUrl);

        done();
      });
  });

  it('incorrect getDownloadAddInUrl request (missing req.body)', done => {
    chai
      .request(server)
      .post(`${apiBase}/getDownloadAddInUrl`)
      .set('Authorization', `Bearer ${token}`)
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');

        done();
      });
  });

  it('incorrect getDownloadAddInUrl request (wrong userId)', done => {
    chai
      .request(server)
      .post(`${apiBase}/getDownloadAddInUrl`)
      .set('Authorization', `Bearer ${token}`)
      .send({ userId: -1 })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');

        done();
      });
  });

  after(done => {
    createdUser
      .destroy()
      .then(() => createdAccount.destroy())
      .then(() => сreatedSession.destroy())
      .then(() => done())
      .catch(error => done());
  });
});
