const index = require('./index.test');
const { chai, apiBase, server, should, models, jwt } = index;

const { user: User, accounts: Account } = models;
const { createTestUser, testUser } = require('./helpers/modelsHelpers');

describe('Registration test', () => {
  let createdTakenUser, registratedUser, registratedAccount;
  const takenEmail = 'taken_registration@gmail.com';
  const userRole = 'admin';

  before(done => {

    User.destroy({ where: { email: [testUser.email, takenEmail] } })
      .then(() => {
        return createTestUser({ email: takenEmail });
      })
      .then(user => {
        createdTakenUser = user;
        done();
      })
      .catch(error => {
        console.error(error);
        done();
      });
  });

  describe('POST /registration', () => {
    it('correct registration request', done => {
      chai
        .request(server)
        .post(`${apiBase}/registration`)
        .send({ ...testUser })
        .end(async (err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.userId.should.be.a('number');
          res.body.userType.should.be.eql(userRole);

          const decoded = jwt.verify(res.body.jwt, process.env.JWT_PRIVATE_KEY);
          decoded.email.should.be.eql(testUser.email);

          registratedUser = await User.findOne({
            where: {
              email: testUser.email
            }
          });
          registratedAccount = await Account.findOne({ where: { id: registratedUser.accountId } });

          done();
        });
    });

    it('incorrect registration (missing request body params)', done => {
      chai
        .request(server)
        .post(`${apiBase}/registration`)
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.message.should.be.a('string');

          done();
        });
    });

    it('incorrect registration (invalid body params)', done => {
      chai
        .request(server)
        .post(`${apiBase}/registration`)
        .send({
          email: 'wrong_email123@',
          password: 'short',
          firstName: '@#!@#!@',
          lastName: 'okay'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.message.should.be.a('string');

          done();
        });
    });

    it('incorrect registration (email already in use)', done => {
      chai
        .request(server)
        .post(`${apiBase}/registration`)
        .send({
          email: takenEmail,
          password: testUser.password,
          firstName: testUser.firstName,
          lastName: testUser.lastName
        })
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.body.message.should.be.a('string');

          done();
        });
    });
  });

  after(done => {
    createdTakenUser
      .destroy()
      .then(() => registratedUser.destroy())
      .then(() => registratedAccount.destroy())
      .then(() => done());
  });
});
