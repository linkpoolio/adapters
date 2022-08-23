import { assertSuccess } from '@chainlink/ea-test-helpers'

import { RequestMethod } from '../../../src/controllers/constants'
import type { SuiteContext } from '../ciphertrace.test'
import { addressInput } from '../common'
import { mockAddressSuccess } from './fixtures'

export function addressTests(context: SuiteContext): void {
  describe('success calls', () => {
    it('returns list of addresses', async () => {
      const addressesSingleInput = { ...addressInput }
      addressesSingleInput.data.method = RequestMethod.GET
      addressesSingleInput.data.parse = RequestMethod.GET
      addressesSingleInput.data.lookupAddress = '0xFD8610d20aA15b7B2E3Be39B396a1bC3516c7144'
      addressesSingleInput.data.network = 'eth'

      mockAddressSuccess()

      const response = await context.req
        .post('/')
        .send(addressInput)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      assertSuccess(
        { expected: 200, actual: response.body.statusCode },
        response.body,
        addressInput.id,
      )
      expect(response.body).toMatchSnapshot()
    })
  })
}
