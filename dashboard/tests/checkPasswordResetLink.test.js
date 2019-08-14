const index = require('./index.test');
const { chai, apiBase, server, should } = index;
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
const { createTestUser } = require('./helpers/modelsHelpers');

describe('Check password reset link', () => {
  let createdUser;
  let password_reset_token;

  before(async () => {
    password_reset_token = await generateResetPasswordToken();

    createdUser = await createTestUser({ password_reset_token });
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
