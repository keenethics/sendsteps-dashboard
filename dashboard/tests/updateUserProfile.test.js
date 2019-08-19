const index = require('./index.test');
const { chai, apiBase, server, should, models, jwt } = index;
const { createTestUser } = require('./helpers/modelsHelpers');

const { user: User } = models;

describe('/updateUserProfile test', () => {
  const testUser = {
    firstName: 'Test',
    lastName: 'Test',
    email: 'test_updateUserProfiler@gmail.com',
    password: 'password'
  };
  const token = jwt.sign({ email: testUser.email }, process.env.JWT_PRIVATE_KEY);
  let createdUser;
  const fakeFile = { fileSize: 1000000, name: 'Fake file.jpg' };

  before(done => {
    createTestUser(testUser).then(user => {
      createdUser = user;
      done();
    });
  });

  it('correct updateUserProfile request', done => {
    chai
      .request(server)
      .post(`${apiBase}/updateUserProfile`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: createdUser.id,
        file: fakeFile,
        departmentName: 'Some department',
        ...testUser
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');

        done();
      });
  });

  it('incorrect updateUserProfile request (missing req.body)', done => {
    chai
      .request(server)
      .post(`${apiBase}/updateUserProfile`)
      .set('Authorization', `Bearer ${token}`)
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');

        done();
      });
  });

  it('incorrect updateUserProfile request (incorrect data)', done => {
    chai
      .request(server)
      .post(`${apiBase}/updateUserProfile`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: createdUser.id,
        file: fakeFile,
        departmentName: '%!#$',
        phonenumber: 'dasd123',
        language: 'dasd123$',
        country: 'country@#@!',
        city: 'city123@',
        ...testUser
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('departmentName');
        res.body.errors.should.have.property('phonenumber');
        res.body.errors.should.have.property('language');
        res.body.errors.should.have.property('country');
        res.body.errors.should.have.property('city');

        done();
      });
  });

  it('incorrect updateUserProfile request (large file)', done => {
    chai
      .request(server)
      .post(`${apiBase}/updateUserProfile`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: createdUser.id,
        file: { ...fakeFile, fileSize: 10 * 1000 * 1000 },
        department: 'Some department',
        ...testUser
      })
      .end((err, res) => {
        res.should.have.status(413);
        res.body.should.be.a('object');
        res.body.should.have.property('message');

        done();
      });
  });

  after(done => {
    createdUser.destroy().then(() => done());
  });
});
