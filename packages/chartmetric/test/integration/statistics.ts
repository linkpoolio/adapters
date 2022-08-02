import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'

import type { SuiteContext } from './adapter.test'
import {
  mockAuthResponseError,
  mockAuthResponseSuccess,
  mockStatisticsResponseError,
  mockStatisticsResponseSuccess,
  mockStatisticsResponseSuccessMalformed,
} from './fixtures'

export function statisticsTests(context: SuiteContext): void {
  const id = '1'

  describe('error calls', () => {
    describe('when unsuccessfully requests the auth API', () => {
      it('should throw and exception', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'statistics',
            artistId: 439,
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
    describe('when unsuccessfully requests the API', () => {
      it('should throw and exception', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'statistics',
            artistId: 439,
          },
        }

        mockAuthResponseSuccess()
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
            artistId: 439,
          },
        }

        mockAuthResponseSuccess()
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
    it('returns the statistics', async () => {
      const data: AdapterRequest = {
        id,
        data: {
          endpoint: 'statistics',
          artistId: 439,
        },
      }

      mockAuthResponseSuccess()
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
