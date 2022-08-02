import http from 'http'
import type { AddressInfo } from 'net'
import nock from 'nock'
import request from 'supertest'
import type { SuperTest, Test } from 'supertest'

import { server as startServer } from '../../src'
import { scheduleTests } from './schedule'

export interface SuiteContext {
  server: http.Server
  req: SuperTest<Test>
}

let oldEnv: NodeJS.ProcessEnv

beforeAll(async () => {
  oldEnv = JSON.parse(JSON.stringify(process.env))

  process.env.API_TOKEN = 'test_api_token'
  process.env.API_USERNAME = 'test_api_username'
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

  describe('schedule endpoint', () => scheduleTests(context))
})
