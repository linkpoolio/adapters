import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'

import type { SuiteContext } from '../adapter.test'
import { floorpricesInput } from '../common'
import { mockFloorpricesGetSingleError, mockFloorpricesGetSingleSuccess } from './fixtures'
import { RequestMethod } from '../../../src/controllers/constants'

export function testFloorprices(context: SuiteContext): void {
  describe('method: get', () => {
    it('returns an error response when the API errors too', async () => {
      const floorpricesSingleInput = { ...floorpricesInput }
      floorpricesSingleInput.data.method = RequestMethod.GET
      floorpricesSingleInput.data.collectionAddress = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'
      floorpricesSingleInput.data.network = 'ethereum'
      mockFloorpricesGetSingleError()

      const response = await context.req
        .post('/')
        .send(floorpricesSingleInput)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      assertError(
        { expected: 500, actual: response.body.providerStatusCode },
        response.body,
        floorpricesSingleInput.id,
      )
      expect(response.body).toMatchSnapshot()
    })

    it('returns a single floorprice', async () => {
      const floorpricesSingleInput = { ...floorpricesInput }
      floorpricesSingleInput.data.method = RequestMethod.GET
      floorpricesSingleInput.data.collectionAddress = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'
      floorpricesSingleInput.data.network = 'ethereum'
      mockFloorpricesGetSingleSuccess()

      const response = await context.req
        .post('/')
        .send(floorpricesSingleInput)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      assertSuccess(
        { expected: 200, actual: response.body.statusCode },
        response.body,
        floorpricesSingleInput.id,
      )
      expect(response.body).toMatchSnapshot()
    })
  })
}
