import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'

import type { SuiteContext } from './adapter.test'
import {
  mockStatisticsResponseError,
  mockStatisticsResponseSuccess,
  mockStatisticsResponseSuccessMalformed,
} from './fixtures'

export function statisticsTests(context: SuiteContext): void {
  const id = '1'

  describe('error calls', () => {
    describe('when unsuccessfully requests the API', () => {
      it('should throw and exception', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'statistics',
            assetAddress: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
          },
        }
        mockStatisticsResponseError()

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

    describe('when successfully requests the API', () => {
      it('should throw and exception if the response format is unexpected', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'statistics',
            assetAddress: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
          },
        }
        mockStatisticsResponseSuccessMalformed()

        const response = await context.req
          .post('/')
          .send(data)
          .set('Accept', '*/*')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)

        assertError({ expected: 200, actual: response.statusCode }, response.body, id)
        expect(response.body).toMatchSnapshot()
      })
    })
  })

  describe('success calls', () => {
    it('returns the correct result', async () => {
      const data: AdapterRequest = {
        id,
        data: {
          endpoint: 'statistics',
          assetAddress: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
        },
      }
      mockStatisticsResponseSuccess()

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
}
