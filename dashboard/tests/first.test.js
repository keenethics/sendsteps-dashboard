let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
const models = require('../server/models');
let should = chai.should();

chai.use(chaiHttp);

const { user: User } = models;
// const u = User.findOne({where: {email: 'test@gmail.com'}});
const apiBase = process.env.API_BASE || '/api';

describe('First test', () => {
    // beforeEach((done) => {
    //     SomeCollection.remove({}, (err) => { 
    //        done();           
    //     });        
    // });
  describe('/POST test', () => {
    it('it should POST test', (done) => {
      chai.request(server)
        .post(`${apiBase}/test`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.message.should.be.eql('message from test');
          done();
        });
    });
  });
});
