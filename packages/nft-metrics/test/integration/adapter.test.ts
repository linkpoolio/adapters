import http from 'http'
import type { AddressInfo } from 'net'
import nock from 'nock'
import process from 'process'
import request from 'supertest'
import type { SuperTest, Test } from 'supertest'

import { server as startServer } from '../../src'
import { testTami } from './tami'

let oldEnv: NodeJS.ProcessEnv

export interface SuiteContext {
  server: http.Server
  req: SuperTest<Test>
}

beforeAll(() => {
  oldEnv = JSON.parse(JSON.stringify(process.env))
  process.env.ACCESS_KEY = 'fake-access-key'
  process.env.SECRET_KEY = 'fake-secret-key'
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

  describe('tami endpoint', () => testTami(context))
})
