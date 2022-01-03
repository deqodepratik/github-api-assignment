import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/app'

// assertion style
chai.should()

chai.use(chaiHttp)

describe('Github User API', () => {
  /**
   * testing the GET user details route
   */
  describe('GET /{user}', () => {
    it('should get user details', (done) => {
      chai
        .request(app)
        .get('/ThePratikSah')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.user.should.be.a('object')
          res.body.user.should.have.property('userName')
          res.body.user.should.have.property('image')
          res.body.user.should.have.property('followers')
          res.body.user.should.have.property('following')
          res.body.user.should.have.property('numberOfRepos')
          done()
        })
    })
  })

  /**
   * testing the GET user details route
   */
  describe('GET /repo/{user}', () => {
    it('should get all the repo of the provided github handle', (done) => {
      chai
        .request(app)
        .get('/repo/ThePratikSah')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.repo.should.be.a('array')
          done()
        })
    })
  })
})
