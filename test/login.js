const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);

const app = 'http://localhost:3000';

let UUID = null;

describe('To Do List', () => {
  // Successfully run :
  describe('POST /user/login', () => {
    it('it should have verified login', (done) => {
      const data = {
        username: 'test',
        password: '12345',
      };
      chai.request(app)
        .post('/user/login')
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('data').to.have.property('UUID');
          UUID = res.body.data.UUID;
          done();
        });
    });
  });

  // Need to pass sessionID that return by the test of /user/login, doesn't found a way to do it yet
  // So this unit test will be failing
  describe('POST /list/', () => {
    it('it should got all active to do list', (done) => {
      const data = {
        sessionID: UUID,
      };
      chai.request(app)
        .post('/list')
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });
});
