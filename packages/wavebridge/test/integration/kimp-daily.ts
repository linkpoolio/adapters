import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'

import type { SuiteContext } from './adapter.test'
import {
  mockAuthResponseError,
  mockAuthResponseSuccess,
  mockKimpDailyResponseError,
  mockKimpDailyResponseSuccessMalformed1,
  mockKimpDailyResponseSuccessMalformed2,
  mockKimpDailyResponseSuccess1,
  mockKimpDailyResponseSuccess2,
} from './fixtures'

export function kimpDailyTests(context: SuiteContext): void {
  const id = '1'

  describe('error calls', () => {
    describe('when unsuccessfully requests the auth API', () => {
      it('should throw and exception', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'kimp-daily',
          },
        }
        mockAuthResponseError()

        const response = await context.req
          .post('/')
          .send(data)
          .set('Accept', '*/*')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)

        assertError({ expected: 500, actual: response.body.providerStatusCode }, response.body, id)
      })
    })

    describe('when unsuccessfully requests the KIMP Index API', () => {
      it('should throw and exception', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'kimp-daily',
          },
        }
        mockAuthResponseSuccess()
        mockKimpDailyResponseError()

        const response = await context.req
          .post('/')
          .send(data)
          .set('Accept', '*/*')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)

        assertError({ expected: 500, actual: response.body.providerStatusCode }, response.body, id)
      })
    })

    describe('when successfully requests the KIMP Index API', () => {
      const testCases = [
        {
          name: "response 'data' contains more than one item",
          mockApiResponse: mockKimpDailyResponseSuccessMalformed1,
        },
        {
          name: "'index' is not a number",
          mockApiResponse: mockKimpDailyResponseSuccessMalformed2,
        },
      ]
      it.each(testCases)('should throw and exception when $name', async ({ mockApiResponse }) => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'kimp-daily',
          },
        }
        mockAuthResponseSuccess()
        mockApiResponse()

        const response = await context.req
          .post('/')
          .send(data)
          .set('Accept', '*/*')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)

        assertError({ expected: 200, actual: response.statusCode }, response.body, id)
      })
    })

    describe('success calls', () => {
      const testCases = [
        {
          name: "from yesterday's close",
          testData: {
            data: {
              id,
              data: {
                endpoint: 'kimp-daily',
              },
            },
            mockApiResponse: mockKimpDailyResponseSuccess1,
          },
        },
        {
          name: "filtering by 'date'",
          testData: {
            data: {
              id,
              data: {
                endpoint: 'kimp-daily',
                date: '2022-01-20',
              },
            },
            mockApiResponse: mockKimpDailyResponseSuccess2,
          },
        },
      ]
      it.each(testCases)('returns the KIMP Index $name', async ({ testData }) => {
        mockAuthResponseSuccess()
        testData.mockApiResponse()

        const response = await context.req
          .post('/')
          .send(testData.data as AdapterRequest)
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
