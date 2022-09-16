import http from 'http'
import type { AddressInfo } from 'net'
import process from 'process'
import request from 'supertest'
import type { SuperTest, Test } from 'supertest'

import { server as startServer } from '../../src'
import { testFundingRates } from './funding-rates/get'

let oldEnv: NodeJS.ProcessEnv

export interface SuiteContext {
  server: http.Server
  req: SuperTest<Test>
}

beforeAll(() => {
  oldEnv = JSON.parse(JSON.stringify(process.env))
  process.env.CACHE_ENABLED = 'false'
  process.env.WARMUP_ENABLED = 'false'
  process.env.API_KEY = 'fake-api-key'
})

afterAll(() => {
  process.env = oldEnv
})

describe('execute', () => {
  const context: SuiteContext = {
    server: null,
    req: null,
  }

  beforeEach(async () => {
    context.server = await startServer()
    context.req = request(`localhost:${(context.server.address() as AddressInfo).port}`)
  })

  afterEach((done) => {
    context.server.close(done)
  })

  describe('exchange-analytics', () => {
    describe('funding-rates endpoint', () => testFundingRates(context))
  })
})
