import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'

import type { SuiteContext } from './adapter.test'
import {
  mockPriceResponseError,
  mockPriceResponseSuccess,
  mockPriceResponseSuccessMalformed,
} from './fixtures'

export function priceTests(context: SuiteContext): void {
  const id = '1'

  describe('error calls', () => {
    describe('when unsuccessfully requests the API', () => {
      it('should throw and exception', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'price',
            currency: 'usd',
            route: 'HKG-SIN',
          },
        }
        mockPriceResponseError()

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
      it('should throw and exception if the response is malformed', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'price',
            currency: 'usd',
            route: 'HKG-SIN',
          },
        }

        mockPriceResponseSuccessMalformed()

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
  })

  describe('success calls', () => {
    it('returns the price', async () => {
      const data: AdapterRequest = {
        id,
        data: {
          endpoint: 'price',
          currency: 'usd',
          route: 'HKG-SIN',
        },
      }
      mockPriceResponseSuccess()

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
