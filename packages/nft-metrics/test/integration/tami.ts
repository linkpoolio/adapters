import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'

import type { SuiteContext } from './adapter.test'
import { mockTamiResponseError, mockTamiSuccessResponse } from './fixtures'

export function testTami(context: SuiteContext): void {
  const id = '1'

  describe('error calls', () => {
    describe('when API request was unsuccessful', () => {
      it('should throw an error', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            assetAddress: '0xbce3781ae7ca1a5e050bd9c4c77369867ebc307e',
          },
        }

        mockTamiResponseError()

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
    it('returns the estimate price', async () => {
      const data: AdapterRequest = {
        id,
        data: {
          endpoint: 'tami',
          assetAddress: '0xbce3781ae7ca1a5e050bd9c4c77369867ebc307e',
        },
      }

      mockTamiSuccessResponse()

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
