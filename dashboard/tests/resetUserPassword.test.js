const index = require('./index.test');
const { chai, apiBase, server, should, models } = index;
const {
  missedPassOrTokenError,
  passwordNotValidError,
  restoreTokenExpiredError,
  wrongRestoreTokenError,
} = require('../server/helpers/resetUserPasswordConstants');
const { generateResetPasswordToken } = require('../server/helpers/passwordHelpers');

const { user: User } = models;

describe('Reset user password', () => {
  const testUser = {
    email: 'test@gmail.com',
    password: 'password',
    firstName: 'Test',
    lastName: 'Tester'
  };
  let createdUser;
  let password_reset_token;

  before(async () => {
    const date = new Date();
    const dateAfterYear = new Date(date.getFullYear() + 1, date.getMonth(), date.getDay());
    password_reset_token = await generateResetPasswordToken();

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
      isGuidedTourTake: 0,
      password_reset_token,
    });
  });

  describe('GET api/user/resetUserPassword', () => {

    it('incorrect api/user/resetUserPassword request (missing req body token)', done => {
      chai
        .request(server)
        .post(`${apiBase}/user/resetUserPassword`)
        .send({ newPassword: 'qwerty', token: '' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.to.be.eql(missedPassOrTokenError);

          done();
        });
    });

    it('incorrect api/user/resetUserPassword request (missing req body newPassword)', done => {
      chai
        .request(server)
        .post(`${apiBase}/user/resetUserPassword`)
        .send({ newPassword: '', token: password_reset_token })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.to.be.eql(missedPassOrTokenError);

          done();
        });
    });

    it('incorrect api/user/resetUserPassword request (invalid req body newPassword)', done => {
      chai
        .request(server)
        .post(`${apiBase}/user/resetUserPassword`)
        .send({ newPassword: '12345', token: password_reset_token })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.to.be.eql(passwordNotValidError);

          done();
        });
    });

    it('incorrect api/user/resetUserPassword request (reset token has expired)', done => {
      chai
        .request(server)
        .post(`${apiBase}/user/resetUserPassword`)
        .send({ newPassword: 'qwerty', token: password_reset_token + 1 })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.to.be.eql(restoreTokenExpiredError);

          done();
        });
    });

    it('incorrect api/user/resetUserPassword request (wrong reset token)', done => {
      chai
        .request(server)
        .post(`${apiBase}/user/resetUserPassword`)
        .send({ newPassword: 'qwerty', token: 'wrong_token' })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.to.be.eql(wrongRestoreTokenError);

          done();
        });
    });

    it('correct api/user/resetUserPassword', done => {
      chai
        .request(server)
        .post(`${apiBase}/user/resetUserPassword`)
        .send({ newPassword: 'qwerty', token: password_reset_token })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.should.have.property('email');
          res.body.success.should.to.be.eql('Password successfully updated.');
          res.body.email.should.to.be.eql(createdUser.email);

          done();
        });
    });
  });

  after(done => {
    createdUser
      .destroy()
      .then(() => done());
  });
});
