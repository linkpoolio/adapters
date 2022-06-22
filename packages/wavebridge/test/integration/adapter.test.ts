import http from 'http'
import type { AddressInfo } from 'net'
import nock from 'nock'
import request from 'supertest'
import type { SuperTest, Test } from 'supertest'

import { authTests } from './auth'
import { cmxDailyTests } from './cmx-daily'
import { kimpDailyTests } from './kimp-daily'
import { kimpRealtimeTests } from './kimp-realtime'
import { DEV_BASE_URL } from '../../src/config'
import { server as startServer } from '../../src'

let oldEnv: NodeJS.ProcessEnv

export interface SuiteContext {
  server: http.Server
  req: SuperTest<Test>
}

beforeAll(() => {
  oldEnv = JSON.parse(JSON.stringify(process.env))
  process.env.API_ENDPOINT = DEV_BASE_URL
  process.env.API_CORP_CODE = 'test_corp_code'
  process.env.API_KEY = 'test_api_key'
  process.env.API_VERBOSE = 'true'
  process.env.CACHE_ENABLED = 'false'
  if (process.env.RECORD) {
    nock.recorder.rec()
  }
})

afterAll(() => {
  process.env = oldEnv
  if (process.env.RECORD) {
    nock.recorder.play()
  }
  nock.restore()
  nock.cleanAll()
  nock.enableNetConnect()
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

  describe('auth endpoint', () => authTests(context))
  describe('cms-daily endpoint', () => cmxDailyTests(context))
  describe('kimp-daily endpoint', () => kimpDailyTests(context))
  describe('kimp-realtime endpoint', () => kimpRealtimeTests(context))
})
