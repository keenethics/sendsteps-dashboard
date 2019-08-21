const index = require('./index.test');
const { chai, apiBase, server, should } = index;
const { responseAnswer, emailNotSpecifiedError } = require('../server/helpers/resetUserPasswordConstants');
const { createTestUser } = require('./helpers/modelsHelpers');


describe('Request reset password link', () => {
  let createdUser;

  before(async () => {
    createdUser = await createTestUser();
  });

  describe('POST /user/requestPasswordReset', () => {

    it('incorrect /requestPasswordReset request (missing req body)', done => {
      chai
        .request(server)
        .post(`${apiBase}/user/requestPasswordReset`)
        .send()
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.to.be.eql(emailNotSpecifiedError);
    
          done();
        });
    });

    it('correct /requestPasswordReset request', done => {
      chai
        .request(server)
        .post(`${apiBase}/user/requestPasswordReset`)
        .send({ email: createdUser.email })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.should.to.be.eql(responseAnswer);
    
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
