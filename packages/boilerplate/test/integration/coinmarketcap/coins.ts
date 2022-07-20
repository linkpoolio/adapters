import { assertSuccess } from '@chainlink/ea-test-helpers'

import type { SuiteContext } from '../coinmarketcap.test'
import { coinsInput } from '../common'
import { mockCoinSuccess } from './fixtures'

export function coinsTests(context: SuiteContext): void {
  describe('success calls', () => {
    it('returns list of coins', async () => {
      mockCoinSuccess()

      const response = await context.req
        .post('/')
        .send(coinsInput)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      assertSuccess(
        { expected: 200, actual: response.body.statusCode },
        response.body,
        coinsInput.id,
      )
      expect(response.body).toMatchSnapshot()
    })
  })
}
