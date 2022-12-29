import request from 'supertest'
import app from '../src/app'
import authApi from '../../auth/src/app'

describe('Test that the CRUD functionalities of the appliances API work', () => {
  let cookie = ''
  beforeAll(async () => {
    const authRes = await request(authApi).post('/auth/signin')
    if (authRes.statusCode === 200) cookie = authRes.headers['set-cookie']
  })

  it('Should list out at least 100 appliances', (done) => {
    request(app)
      .get('/appliances/list/id/desc')
      .set('Cookie', cookie)
      .then((response) => {
        const keys = Object.keys(response.body)
        expect(keys.length).toBeGreaterThanOrEqual(100)

        // Test sorting and ordering
        const lastResult = keys[keys.length - 1]
        expect(response.body[lastResult].id).toEqual(0)

        // Finish
        done()
      })
  })

  it('Should retrieve an appliance by its ID', (done) => {
    request(app)
      .get('/appliances/1')
      .set('Cookie', cookie)
      .then((response) => {
        expect(JSON.parse(response.body).id).toEqual(1)
        done()
      })
  })

  it('Should create an appliance given a valid payload', (done) => {
    request(app)
      .post('/appliances/create')
      .set('Cookie', cookie)
      .send({
        type: 'Lightbulb',
        name: 'Appliance 2131232131',
      })
      .then((response) => {
        expect(response.body.type).toEqual('Lightbulb')
        done()
      })
  })

  it('Should fail to create an appliance given an invalid payload', (done) => {
    request(app)
      .post('/appliances/create')
      .set('Cookie', cookie)
      .send({
        name: 'Appliance 2131232131',
      })
      .then((response) => {
        expect(response.statusCode).toEqual(400)
        done()
      })
  })

  it('Should update an appliance given a valid ID and payload', (done) => {
    const testName = 'Appliance 2131232131'
    request(app)
      .patch('/appliances/1')
      .set('Cookie', cookie)
      .send({
        name: testName,
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200)
        expect(response.body.name).toEqual(testName)
        done()
      })
  })

  it('Should delete an appliance given a valid ID', (done) => {
    request(app)
      .delete('/appliances/3')
      .set('Cookie', cookie)
      .then((response) => {
        expect(response.statusCode).toEqual(204)
        done()
      })
  })
})

describe('Test that the additional features of the appliances API work', () => {
  let cookie = ''
  beforeAll(async () => {
    const authRes = await request(authApi).post('/auth/signin')
    if (authRes.statusCode === 200) cookie = authRes.headers['set-cookie']
  })

  it('Reboots an appliance given a valid ID', (done) => {
    request(app)
      .patch('/appliances/1/reboot')
      .set('Cookie', cookie)
      .then((response) => {
        expect(response.statusCode).toEqual(202)
        done()
      })
  })
})
