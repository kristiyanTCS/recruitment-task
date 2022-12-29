import request from 'supertest'
import app from '../src/app'

describe('Test auth API', () => {
  it('Healthcheck endpoint works', (done) => {
    request(app)
      .get('/auth/ping')
      .then((response) => {
        expect(response.body.message).toEqual('auth pong')
        done()
      })
  })

  it('Should sign the user in successfully', (done) => {
    request(app)
      .post('/auth/signin')
      .then((response) => {
        expect(response.body.id).toEqual('abc123')
        expect(response.body.email).toEqual('test@vocovo.com')
        done()
      })
  })
})
