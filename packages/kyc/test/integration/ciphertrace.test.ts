import http from 'http'
import type { AddressInfo } from 'net'
import process from 'process'
import request from 'supertest'
import type { SuperTest, Test } from 'supertest'

import { server as startServer } from '../../src'
import { addressTests } from './ciphertrace/address'

let oldEnv: NodeJS.ProcessEnv

export interface SuiteContext {
  server: http.Server
  req: SuperTest<Test>
}

beforeAll(() => {
  oldEnv = JSON.parse(JSON.stringify(process.env))
  process.env.API_VERBOSE = 'true'
  process.env.CACHE_ENABLED = 'false'
  process.env.WARMUP_ENABLED = 'false'
  process.env.API_PROVIDER = 'ciphertrace'
  process.env.ACCESS_KEY = 'fake-access-key'
  process.env.SECRET_KEY = 'fake-secret-key'
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

  describe('ciphertrace - address endpoint', () => addressTests(context))
})
