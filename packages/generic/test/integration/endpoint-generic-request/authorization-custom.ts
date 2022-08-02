import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'
import http from 'http'
import type { AddressInfo } from 'net'
import nock from 'nock'
import request from 'supertest'
import type { SuperTest, Test } from 'supertest'

import { server as startServer } from '../../../src'
import { RequestMethod } from '../../../src/lib/constants'
import { mockResponseErrorCustom, mockResponseSuccessCustom } from './fixtures'

export function authorizationCustomTests(): void {
  let oldEnv: NodeJS.ProcessEnv
  let server: http.Server
  let req: SuperTest<Test>
  const id = '1'

  beforeAll(async () => {
    oldEnv = JSON.parse(JSON.stringify(process.env))

    process.env.API_VERBOSE = 'true'
    process.env.CACHE_ENABLED = 'false'
    process.env.LOG_LEVEL = 'debug'

    process.env.GENERIC_AUTH_TYPE = 'custom'
    process.env.GENERIC_AUTH_HEADERS = JSON.stringify({
      'Header-1': 'hvalue1',
      'Header-2': 'hvalue2',
    })
    process.env.GENERIC_AUTH_PARAMS = JSON.stringify({ param1: 'pvalue1', param2: 'pvalue2' })
    process.env.GENERIC_AUTH_DATA = JSON.stringify({ data1: 'dvalue1', data2: 'dvalue2' })
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
      mockResponseErrorCustom()

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
              'Header-3': 'hvalue3',
              'Header-4': 'hvalue4',
            },
            params: {
              param3: 'pvalue3',
              param4: 'pvalue4',
            },
            data: {
              data3: 'dvalue3',
              data4: ['dvalue4a', 'dvalue4b'],
            },
          },
        }
        mockResponseSuccessCustom(responseDataCase.testData.responseData)

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
