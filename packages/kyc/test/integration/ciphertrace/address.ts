import { assertSuccess } from '@chainlink/ea-test-helpers'

import type { SuiteContext } from '../ciphertrace.test'
import { addressInput } from '../common'
import { mockAddressSuccess } from './fixtures'

export function addressTests(context: SuiteContext): void {
  describe('success calls', () => {
    it('returns list of address', async () => {
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
