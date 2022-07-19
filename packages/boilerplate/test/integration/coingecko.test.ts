import http from 'http'
import process from 'process'
import type { AddressInfo } from 'net'
import request from 'supertest'
import type { SuperTest, Test } from 'supertest'

import { coinsTests } from './coingecko/coins'
import { marketTests } from './coingecko/market'
import { server as startServer } from '../../src'

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
  process.env.API_PROVIDER = 'coingecko'
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

  describe('coingecko - coins endpoint', () => coinsTests(context))

  describe('coingecko - market endpoint', () => marketTests(context))
})
