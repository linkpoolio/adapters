import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'
import http from 'http'
import type { AddressInfo } from 'net'
import nock from 'nock'
import request from 'supertest'
import type { SuperTest, Test } from 'supertest'

import { server as startServer } from '../../../src'
import { RequestMethod } from '../../../src/lib/constants'
import { mockResponseErrorBearerToken, mockResponseSuccessBearerToken } from './fixtures'

export function authorizationBearerTokenTests(): void {
  let oldEnv: NodeJS.ProcessEnv
  let server: http.Server
  let req: SuperTest<Test>
  const id = '1'

  beforeAll(async () => {
    oldEnv = JSON.parse(JSON.stringify(process.env))

    process.env.API_VERBOSE = 'true'
    process.env.CACHE_ENABLED = 'false'
    process.env.LOG_LEVEL = 'debug'

    process.env.GENERIC_AUTH_TYPE = 'bearer_token'
    process.env.GENERIC_AUTH_CREDENTIALS_TOKEN = 'credentials_token'
    process.env.GENERIC_BASE_URL = 'https://test-base-url.com'

    if (!nock.isActive()) {
      nock.activate()
    }
    server = await startServer()
    req = request(`localhost:${(server.address() as AddressInfo).port}`)
  })

  afterAll((done) => {
    process.env = oldEnv

    if (process.env.RECORD) {
      nock.recorder.play()
    }
    nock.restore()
    nock.cleanAll()
    nock.enableNetConnect()

    server.close(done)
  })

  describe('error calls after requesting the API', () => {
    it('throws an error if the request is not successful', async () => {
      const data: AdapterRequest = {
        id,
        data: {
          endpoint: 'generic-request',
          method: RequestMethod.GET,
          url: '/subpath',
          headers: {},
          params: {},
          data: {},
        },
      }
      mockResponseErrorBearerToken()

      const response = await req
        .post('/')
        .send(data)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      assertError({ expected: 500, actual: response.body.providerStatusCode }, response.body, id)
    })
  })

  describe('success calls', () => {
    const responseDataCases = [
      {
        name: `API 'response.data' is a JSON object`,
        testData: {
          responseData: {
            value: 42.777,
          },
        },
      },
      {
        name: `API 'response.data' is not a JSON object`,
        testData: {
          responseData: [
            {
              value: 42.777,
            },
          ],
        },
      },
    ]
    responseDataCases.forEach((responseDataCase) => {
      it(`returns the expected result, when ${responseDataCase.name}`, async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'generic-request',
            method: RequestMethod.POST,
            url: '/subpath',
            headers: {
              'Header-1': 'hvalue1',
              'Header-2': 'hvalue2',
            },
            params: {
              param1: 'pvalue1',
              param2: 'pvalue2',
            },
            data: {
              data1: 'dvalue1',
              data2: ['dvalue2a', 'dvalue2b'],
            },
          },
        }
        mockResponseSuccessBearerToken(responseDataCase.testData.responseData)

        const response = await req
          .post('/')
          .send(data)
          .set('Accept', '*/*')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)

        assertSuccess({ expected: 200, actual: response.statusCode }, response.body, id)
        expect(response.body).toMatchSnapshot()
      })
    })
  })
}
