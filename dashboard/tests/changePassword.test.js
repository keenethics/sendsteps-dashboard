const index = require('./index.test');
const { chai, apiBase, server, should, models, jwt } = index;

const { user: User } = models;

describe('Change user password', () => {
  const testUser = {
    email: 'test_deleteUser@gmail.com',
    password: 'password',
    firstName: 'Test',
    lastName: 'Tester'
  };
  let createdUser;

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
          console.log(res.body);
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
