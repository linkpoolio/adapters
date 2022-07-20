import { assertSuccess } from '@chainlink/ea-test-helpers'

import type { SuiteContext } from '../coinmarketcap.test'
import { marketInput } from '../common'
import { mockMarketSuccess } from './fixtures'

export function marketTests(context: SuiteContext): void {
  describe('success calls', () => {
    it('returns list of market detail by coin', async () => {
      mockMarketSuccess(marketInput.data.id, marketInput.data.currency)

      const response = await context.req
        .post('/')
        .send(marketInput)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      assertSuccess(
        { expected: 200, actual: response.body.statusCode },
        response.body,
        marketInput.id,
      )
      expect(response.body).toMatchSnapshot()
    })
  })
}
