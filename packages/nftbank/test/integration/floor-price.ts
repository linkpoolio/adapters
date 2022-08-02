import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'

import { chainId } from '../../src/lib/const'
import type { SuiteContext } from './adapter.test'
import { mockFloorPriceResponseError, mockFloorPriceSuccessResponse } from './fixtures'

export function testFloorPrice(context: SuiteContext): void {
  const id = '1'

  describe('error calls', () => {
    describe('when API request was unsuccessful', () => {
      it('should throw an error', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'floor-price',
            assetAddress: '0xED5AF388653567Af2F388E6224dC7C4b3241C544',
          },
        }

        mockFloorPriceResponseError(chainId.get(1) as string)

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
    // Format 0
    it("returns Azuki's floor price in USD", async () => {
      const data: AdapterRequest = {
        id,
        data: {
          endpoint: 'floor-price',
          assetAddress: '0xED5AF388653567Af2F388E6224dC7C4b3241C544',
          pricingAsset: 'USD',
        },
      }

      mockFloorPriceSuccessResponse(chainId.get(1) as string)

      const response = await context.req
        .post('/')
        .send(data)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect(200)

      assertSuccess({ expected: 200, actual: response.body.statusCode }, response.body, id)
      expect(response.body).toMatchSnapshot()
    })
    // Format 1
    it("returns Azuki's floor price and date packed", async () => {
      const data: AdapterRequest = {
        id,
        data: {
          endpoint: 'floor-price',
          assetAddress: '0xED5AF388653567Af2F388E6224dC7C4b3241C544',
          pricingAsset: 'USD',
          formatId: 1,
        },
      }

      mockFloorPriceSuccessResponse(chainId.get(1) as string)

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
