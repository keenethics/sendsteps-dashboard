const index = require('./index.test');
const { chai, apiBase, server, should, models, jwt } = index;

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

  before(async () => {
    const date = new Date();

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
