import { AdapterRequest } from '@chainlink/types'
import * as http from 'http'
import { AddressInfo } from 'net'
import * as nock from 'nock'
import * as process from 'process'
import request, { SuperTest, Test } from 'supertest'

import { server as startServer } from '../../src'
import { mockResponseSuccess } from './fixtures'

describe('execute', () => {
  const id = '1'
  let server: http.Server
  let req: SuperTest<Test>

  beforeAll(async () => {
    process.env.API_KEY = process.env.API_KEY || 'fake-api-key'
    if (process.env.RECORD) {
      nock.recorder.rec()
    }
    server = await startServer()
    req = request(`localhost:${(server.address() as AddressInfo).port}`)
  })
  afterAll((done) => {
    if (process.env.RECORD) {
      nock.recorder.play()
    }

    nock.restore()
    nock.cleanAll()
    nock.enableNetConnect()
    server.close(done)
  })

  describe('adapter api', () => {
    const data: AdapterRequest = {
      id,
      data: {
        coin: 'ETH',
        days: 1,
      },
    }

    it('should return success', async () => {
      mockResponseSuccess()

      const response = await req
        .post('/')
        .send(data)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
      expect(response.body).toMatchSnapshot()
    })
  })
})
