const index = require('./index.test');
const { chai, apiBase, server, should, jwt } = index;
const { createTestUser, testUser } = require('./helpers/modelsHelpers');

describe('Login test', () => {
  let createdUser;
  const userRole = 'admin';

  before(done => {

    createTestUser().then(user => {
      createdUser = user;
      done();
    });
  });

  describe('POST /login', () => {
    it('correct login request', done => {
      chai
        .request(server)
        .post(`${apiBase}/login`)
        .send(testUser)
        .end((err, res) => {
          const { jwt: token } = res.body;
          const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

          res.should.have.status(200);
          res.body.should.be.a('object');
          decoded.email.should.be.eql(testUser.email);

          done();
        });
    });

    it('incorrect login request (with missing params)', done => {
      chai
        .request(server)
        .post(`${apiBase}/login`)
        .send()
        .end((err, res) => {
          res.should.have.status(400);

          done();
        });
    });

    it('incorrect login request (with wrong password)', done => {
      chai
        .request(server)
        .post(`${apiBase}/login`)
        .send({ email: testUser.email, password: 'wrongpass' })
        .end((err, res) => {
          res.should.have.status(401);

          done();
        });
    });
  });

  describe('GET /login/check_auth', () => {
    it('correct check Auth request', done => {
      const token = jwt.sign({ email: testUser.email }, process.env.JWT_PRIVATE_KEY);

      chai
        .request(server)
        .get(`${apiBase}/login/check_auth`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.userId.should.be.a('number');
          res.body.userType.should.be.eql(userRole);
          res.body.firstName.should.be.eql(testUser.firstName);
          res.body.lastName.should.be.eql(testUser.lastName);

          done();
        });
    });

    it('incorrect check Auth request (unathorized request)', done => {
      chai
        .request(server)
        .get(`${apiBase}/login/check_auth`)
        .set('Authorization', 'Wrong token 1337')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');

          done();
        });
    });
  });

  after(done => {
    createdUser.destroy().then(() => done());
  });
});
