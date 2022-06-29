import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'

import type { SuiteContext } from './adapter.test'
import { mockEstimateResponseError, mockEstimateSuccessResponse } from './fixtures'
import { chainId } from '../../src/lib/const'

export function testEstimate(context: SuiteContext): void {
  const id = '1'

  describe('error calls', () => {
    describe('when API request was unsuccessful', () => {
      it('should throw an error', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'estimate',
            assetAddress: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
            tokenId: 1,
          },
        }

        mockEstimateResponseError(data.data.tokenId, chainId.get(1) as string)

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
          endpoint: 'estimate',
          assetAddress: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
          tokenId: 1,
        },
      }

      mockEstimateSuccessResponse(data.data.tokenId, chainId.get(1) as string)

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
