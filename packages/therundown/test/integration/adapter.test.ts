import { AdapterRequest } from '@chainlink/types'
import request, { SuperTest, Test } from 'supertest'
import * as process from 'process'
import { server as startServer } from '../../src'
import * as nock from 'nock'
import * as http from 'http'
import { mockResponseSuccess } from './fixtures'
import { AddressInfo } from 'net'
import { scheduleTests } from './schedule'

export interface SuiteContext {
  server: http.Server
  req: SuperTest<Test>
}

describe('execute', () => {
  const id = '1'
  const context: SuiteContext = {
    server: null,
    req: null,
  }

  beforeAll(async () => {
    process.env.API_KEY = process.env.API_KEY || 'fake-api-key'
    process.env.CACHE_ENABLED = 'false'
    if (process.env.RECORD) {
      nock.recorder.rec()
    }
  })

  afterAll(() => {
    if (process.env.RECORD) {
      nock.recorder.play()
    }

    nock.restore()
    nock.cleanAll()
    nock.enableNetConnect()
  })

  beforeEach(async () => {
    context.server = await startServer()
    context.req = request(`localhost:${(context.server.address() as AddressInfo).port}`)
  })

  afterEach((done) => {
    context.server.close(done)
  })

  describe('totalScore api', () => {
    const data: AdapterRequest = {
      id,
      data: {
        matchId: '5527455bb80a5e9884153786aeb5f2b2',
      },
    }

    it('should return success', async () => {
      mockResponseSuccess()

      const response = await context.req
        .post('/')
        .send(data)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
      expect(response.body).toMatchSnapshot()
    })
  })

  describe('event api', () => {
    const data: AdapterRequest = {
      id,
      data: {
        endpoint: 'event',
        eventId: '5527455bb80a5e9884153786aeb5f2b2',
      },
    }

    it('should return success', async () => {
      mockResponseSuccess()

      const response = await context.req
        .post('/')
        .send(data)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
      expect(response.body).toMatchSnapshot()
    })
  })

  describe('events api', () => {
    const data: AdapterRequest = {
      id,
      data: {
        endpoint: 'events',
        sportId: 2,
        date: '2020-09-20T17:00:00Z',
        eventId: '9a35b8986a76eaaea364be331cb453ec',
      },
    }

    it('should return success', async () => {
      mockResponseSuccess()

      const response = await context.req
        .post('/')
        .send(data)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
      expect(response.body).toMatchSnapshot()
    })
  })

  describe('schedule endpoint', () => scheduleTests(context))
})
