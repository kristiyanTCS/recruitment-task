import request from 'supertest'
import app from '../src/app'
import authApi from '../../auth/src/app'

describe('Test that the appliances API responds', () => {
  let cookie = ''
  beforeAll(async () => {
    const authRes = await request(authApi).post('/auth/signin')
    if (authRes.statusCode === 200) cookie = authRes.headers['set-cookie']
  })

  it('Healthcheck endpoint works', (done) => {
    request(app)
      .get('/appliances/ping')
      .set('Cookie', cookie)
      .then((response) => {
        expect(response.body.message).toEqual('appliances pong')
        done()
      })
  })
})
