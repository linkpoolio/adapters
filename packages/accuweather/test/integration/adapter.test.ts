import http from 'http'
import { AddressInfo } from 'net'
import nock from 'nock'
import process from 'process'
import request, { SuperTest, Test } from 'supertest'

import { server as startServer } from '../../src'
import { DEV_BASE_URL } from '../../src/config'
import { currentConditionsTests } from './current-conditions'
import { locationTests } from './location'
import { locationCurrentConditionsTests } from './location-current-conditions'

let oldEnv: NodeJS.ProcessEnv

export interface SuiteContext {
  server: http.Server
  req: SuperTest<Test>
}

beforeAll(() => {
  oldEnv = JSON.parse(JSON.stringify(process.env))
  process.env.API_KEY = 'test_api_key'
  process.env.API_VERBOSE = 'true'
  process.env.API_ENDPOINT = DEV_BASE_URL
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

  describe('location endpoint', () => locationTests(context))
  describe('current-conditions endpoint', () => currentConditionsTests(context))
  describe('location-current-conditions endpoint', () => locationCurrentConditionsTests(context))
})
