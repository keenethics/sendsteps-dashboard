const index = require('./index.test');
const { chai, apiBase, server, should, models } = index;
const {
  missingTokenParamError,
  emptyTokenParamError,
  tokenTimeExpiredError,
  invalidTokenError,
} = require('../server/helpers/resetUserPasswordConstants');
const {
  generateResetPasswordToken,
  resetTokenExpiredTime
} = require('../server/helpers/passwordHelpers');

const { user: User } = models;

describe('Check password reset link', () => {
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

  describe('GET api/user/resetPassword?token=YOUR_RESTORE_TOKEN', () => {

    it('incorrect api/user/resetPassword request (missing token param)', done => {
      chai
        .request(server)
        .get(`${apiBase}/user/resetPassword`)
        .send()
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.to.be.eql(missingTokenParamError);

          done();
        });
    });

    it('incorrect api/user/resetPassword request (empty token param)', done => {
      chai
        .request(server)
        .get(`${apiBase}/user/resetPassword?token=`)
        .send()
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.to.be.eql(emptyTokenParamError);

          done();
        });
    });

    it('incorrect api/user/resetPassword request (reset token expired)', done => {
      chai
        .request(server)
        .get(`${apiBase}/user/resetPassword?token=${password_reset_token + 1}`)
        .send()
        .end((err, res) => {
          const expiredTime = resetTokenExpiredTime(password_reset_token + 1);
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.to.be.eql(tokenTimeExpiredError(expiredTime));

          done();
        });
    });

    it('incorrect api/user/resetPassword request (invalid reset token)', done => {
      chai
        .request(server)
        .get(`${apiBase}/user/resetPassword?token=wrong_token`)
        .send()
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.to.be.eql(invalidTokenError);

          done();
        });
    });

    it('correct api/user/resetPassword request', done => {
      chai
        .request(server)
        .get(`${apiBase}/user/resetPassword?token=${password_reset_token}`)
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.to.be.eql('token valid');

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
