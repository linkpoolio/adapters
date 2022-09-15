import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'

import { Provider } from '../../../src/api/constants'
import { RequestMethod } from '../../../src/controllers/constants'
import type { SuiteContext } from '../adapter.test'
import { twapsInput } from '../common'
import { mockTwapsGetSingleErrorNftperp, mockTwapsGetSingleSuccessNftperp } from './fixtures'

export function testTwaps(context: SuiteContext): void {
  describe('nftperp', () => {
    let oldEnv: NodeJS.ProcessEnv
    beforeAll(() => {
      oldEnv = JSON.parse(JSON.stringify(process.env))
      process.env.API_PROVIDER = Provider.NFTPERP
    })
    afterAll(() => {
      process.env = oldEnv
    })
    it('returns an error response when the API errors too', async () => {
      const twapsSingleInput = { ...twapsInput }
      twapsSingleInput.data.method = RequestMethod.GET
      twapsSingleInput.data.collectionName = 'boredapeyachtclub'
      mockTwapsGetSingleErrorNftperp()

      const response = await context.req
        .post('/')
        .send(twapsSingleInput)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      assertError(
        { expected: 500, actual: response.body.providerStatusCode },
        response.body,
        twapsSingleInput.id,
      )
      expect(response.body).toMatchSnapshot()
    })

    it('returns a single twap', async () => {
      const twapsSingleInput = { ...twapsInput }
      twapsSingleInput.data.method = RequestMethod.GET
      twapsSingleInput.data.collectionName = 'boredapeyachtclub'
      mockTwapsGetSingleSuccessNftperp()

      const response = await context.req
        .post('/')
        .send(twapsSingleInput)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      assertSuccess(
        { expected: 200, actual: response.body.statusCode },
        response.body,
        twapsSingleInput.id,
      )
      expect(response.body).toMatchSnapshot()
    })
  })
}
