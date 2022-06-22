import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'

import type { SuiteContext } from './adapter.test'
import {
  mockAuthResponseError,
  mockAuthResponseSuccess,
  mockKimpRealtimeResponseError,
  mockKimpRealtimeResponseSuccessMalformed1,
  mockKimpRealtimeResponseSuccessMalformed2,
  mockKimpRealtimeResponseSuccess,
} from './fixtures'

export function kimpRealtimeTests(context: SuiteContext): void {
  const id = '1'

  describe('error calls', () => {
    describe('when unsuccessfully requests the auth API', () => {
      it('should throw and exception', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'kimp-realtime',
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

    describe('when unsuccessfully requests the KIMP Realtime Index API', () => {
      it('should throw and exception', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'kimp-realtime',
          },
        }
        mockAuthResponseSuccess()
        mockKimpRealtimeResponseError()

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
    describe('when successfully requests the KIMP Realtime Index API', () => {
      const testCases = [
        {
          name: "response 'data' contains more than one item",
          mockApiResponse: mockKimpRealtimeResponseSuccessMalformed1,
        },
        {
          name: "'index' is not a number",
          mockApiResponse: mockKimpRealtimeResponseSuccessMalformed2,
        },
      ]
      it.each(testCases)('should throw and exception', async ({ mockApiResponse }) => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'kimp-realtime',
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
      it('returns the KIMP Realtime Index', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'kimp-realtime',
          },
        }
        mockAuthResponseSuccess()
        mockKimpRealtimeResponseSuccess()

        const response = await context.req
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
