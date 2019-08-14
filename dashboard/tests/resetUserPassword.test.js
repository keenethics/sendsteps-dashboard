const index = require('./index.test');
const { chai, apiBase, server, should } = index;
const {
  missedPassOrTokenError,
  passwordNotValidError,
  restoreTokenExpiredError,
  wrongRestoreTokenError,
} = require('../server/helpers/resetUserPasswordConstants');
const { generateResetPasswordToken } = require('../server/helpers/passwordHelpers');
const { createTestUser } = require('./helpers/modelsHelpers');


describe('Reset user password', () => {
  let createdUser;
  let password_reset_token;

  before(async () => {
    password_reset_token = await generateResetPasswordToken();
    createdUser = await createTestUser({ password_reset_token });
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
