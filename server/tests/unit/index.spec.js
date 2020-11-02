let chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server')
const expect = chai.expect
chai.use(chaiHttp);

describe('POST /user/register', () => {
  it('should create a new user', (done) => {
    chai
    .request(server)
    .post('/user/register')
    .send({username: 'Bob', password: 'password123'})
    .end((err, res) => {
      expect(res.status).to.equal(201)
      done()
    })
  })

  it('should result in an error if there is no payload', (done) => {
    chai
    .request(server)
    .post('/user/register')
    .send({})
    .end((err, res) => {
      expect(res.status).to.equal(500)
      done()
    })
  })
})