const index = require('./index.test');
const { chai, apiBase, server, should, jwt } = index;
const { createTestUser, testUser } = require('./helpers/modelsHelpers');


describe('Change user password', () => {
  let createdUser;

  before(async () => {

    createdUser = await createTestUser();
  });

  describe('POST /user/changePassword', () => {
    const token = jwt.sign({ email: testUser.email }, process.env.JWT_PRIVATE_KEY);

    it('incorrect change password request (missing req body)', done => {
      chai
        .request(server)
        .post(`${apiBase}/user/changePassword`)
        .set('Authorization', `Bearer ${token}`)
        .send()
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.to.be.eql('Email and password must be specified!');

          done();
        });
    });

    it('incorrect change password request (wrong old password)', done => {
      chai
        .request(server)
        .post(`${apiBase}/user/changePassword`)
        .set('Authorization', `Bearer ${token}`)
        .send({ oldPassword: 'password-incorect', newPassword: 'password' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.to.be.eql('Old password is incorrect!');

          done();
        });
    });

    it('incorrect change password request (wrong security token)', done => {
      chai
        .request(server)
        .post(`${apiBase}/user/changePassword`)
        .set('Authorization', `Wrong token`)
        .send({ id: createdUser.dataValues.id })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');

          done();
        });
    });

    it('incorrect change password request (no such user)', done => {
      const tokenWrong = jwt.sign({ email: 'wrong@email.com' }, process.env.JWT_PRIVATE_KEY);
      chai
        .request(server)
        .post(`${apiBase}/user/changePassword`)
        .set('Authorization', `Bearer ${tokenWrong}`)
        .send({ oldPassword: 'password', newPassword: 'password' })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.to.be.eql('User not found!');

          done();
        });
    });

    it('correct change password request', done => {
      chai
        .request(server)
        .post(`${apiBase}/user/changePassword`)
        .set('Authorization', `Bearer ${token}`)
        .send({ oldPassword: 'password', newPassword: 'password' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('string');
          res.body.should.be.eql('Password successfully updated.');
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
