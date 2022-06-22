import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'
import http from 'http'
import type { AddressInfo } from 'net'
import nock from 'nock'
import request from 'supertest'
import type { SuperTest, Test } from 'supertest'

import { mockResponseErrorApiKey, mockResponseSuccessApiKey } from './fixtures'
import { server as startServer } from '../../../src'
import { CredentialsLocation, RequestMethod } from '../../../src/lib/constants'

export function authorizationApiKeyTests(): void {
  let oldEnv: NodeJS.ProcessEnv
  let server: http.Server
  let req: SuperTest<Test>
  const id = '1'

  beforeAll(async () => {
    oldEnv = JSON.parse(JSON.stringify(process.env))

    process.env.API_VERBOSE = 'true'
    process.env.CACHE_ENABLED = 'false'
    process.env.LOG_LEVEL = 'debug'

    process.env.GENERIC_AUTH_TYPE = 'api_key'
    process.env.GENERIC_AUTH_CREDENTIALS_LOCATION = CredentialsLocation.HEADERS
    process.env.GENERIC_AUTH_CREDENTIALS_KEY = 'credentials_key'
    process.env.GENERIC_AUTH_CREDENTIALS_VALUE = 'credentials_value'
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
      mockResponseErrorApiKey()

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
    const credentialsLocationCases = [
      {
        name: `credentials location is '${CredentialsLocation.HEADERS}'`,
        testData: {
          credentialsLocation: CredentialsLocation.HEADERS,
        },
      },
      {
        name: `credentials location is '${CredentialsLocation.PARAMS}'`,
        testData: {
          credentialsLocation: CredentialsLocation.PARAMS,
        },
      },
    ]
    credentialsLocationCases.forEach((credentialsLocationCase) => {
      responseDataCases.forEach((responseDataCase) => {
        it(`returns the expected result, when ${credentialsLocationCase.name}, and ${responseDataCase.name}`, async () => {
          process.env.GENERIC_AUTH_CREDENTIALS_LOCATION =
            credentialsLocationCase.testData.credentialsLocation

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
          mockResponseSuccessApiKey(
            credentialsLocationCase.testData.credentialsLocation,
            responseDataCase.testData.responseData,
          )

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
  })
}
