const index = require('./index.test');
const { chai, apiBase, server, should, models } = index;
const { responseAnswer, emailNotSpecifiedError } = require('../server/helpers/resetUserPasswordConstants');

const { user: User } = models;

describe('Request reset password link', () => {
  const testUser = {
    email: 'test@gmail.com',
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
