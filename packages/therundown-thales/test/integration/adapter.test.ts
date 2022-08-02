import http from 'http'
import type { AddressInfo } from 'net'
import nock from 'nock'
import request from 'supertest'
import type { SuperTest, Test } from 'supertest'

import { server as startServer } from '../../src'
import { oddsTests } from './odds'
import { scheduleTests } from './schedule'

export interface SuiteContext {
  server: http.Server
  req: SuperTest<Test>
}

describe('execute', () => {
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

  describe('shcedule endpoint', () => scheduleTests(context))
  describe('odds endpoint', () => oddsTests(context))
})
