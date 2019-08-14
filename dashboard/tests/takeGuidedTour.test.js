const index = require('./index.test');
const { chai, apiBase, server, should, models, jwt } = index;
const { createTestUser } = require('./helpers/modelsHelpers');

const { user: User } = models;

describe('Take guided tour test', () => {
  const testUser = {
    firstName: 'Test',
    lastName: 'Test',
    email: 'test_takeGuidedTour@gmail.com',
    password: 'password'
  };
  const token = jwt.sign({ email: testUser.email }, process.env.JWT_PRIVATE_KEY);
  let createdUser;

  before(done => {
    createTestUser(testUser).then(user => {
      createdUser = user;
      done();
    });
  });

  it('correct take guided tour request', done => {
    chai
      .request(server)
      .post(`${apiBase}/takeGuidedTour`)
      .set('Authorization', `Bearer ${token}`)
      .send({ id: createdUser.id })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');

        done();
      });
  });

  it('incorrect take guided tour request (missing req.body)', done => {
    chai
      .request(server)
      .post(`${apiBase}/takeGuidedTour`)
      .set('Authorization', `Bearer ${token}`)
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');

        done();
      });
  });

  it('incorrect take guided tour request (nonexistent id)', done => {
    chai
      .request(server)
      .post(`${apiBase}/takeGuidedTour`)
      .set('Authorization', `Bearer ${token}`)
      .send({ id: -1 })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');

        done();
      });
  });

  after(done => {
    createdUser.destroy().then(() => done());
  });
});
