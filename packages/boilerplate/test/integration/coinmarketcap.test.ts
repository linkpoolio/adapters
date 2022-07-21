import http from 'http'
import process from 'process'
import type { AddressInfo } from 'net'
import request from 'supertest'
import type { SuperTest, Test } from 'supertest'

import { coinsTests } from './coinmarketcap/coins'
import { marketTests } from './coinmarketcap/market'
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
  process.env.API_PROVIDER = 'coinmarketcap'
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

  describe('coinmarketcap - coins endpoint', () => coinsTests(context))

  describe('coinmarketcap - market endpoint', () => marketTests(context))
})
