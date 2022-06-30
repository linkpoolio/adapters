import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'

import type { SuiteContext } from './adapter.test'
import { mockPriceResponseError, mockPriceSuccessResponse } from './fixtures'

export function testPrice(context: SuiteContext): void {
  const id = '1'

  describe('error calls', () => {
    describe('when API request was unsuccessful', () => {
      it('should throw an error', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'price',
            country: 'LBN',
            year: 2020,
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
  })

  describe('success calls', () => {
    it('returns the prices', async () => {
      const data: AdapterRequest = {
        id,
        data: {
          endpoint: 'price',
          country: 'LBN',
          year: 2020,
        },
      }

      mockPriceSuccessResponse()

      const response = await context.req
        .post('/')
        .send(data)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect(200)

      assertSuccess({ expected: 200, actual: response.body.statusCode }, response.body, id)
      expect(response.body).toMatchSnapshot()
    })
  })
}
