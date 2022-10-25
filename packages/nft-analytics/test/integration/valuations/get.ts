import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'

import { Provider } from '../../../src/api/constants'
import { RequestMethod } from '../../../src/controllers/constants'
import type { SuiteContext } from '../adapter.test'
import { valuationsInput } from '../common'
import {
  mockValuationsGetSingleErrorBitscrunch,
  mockValuationsGetSingleSuccessBitscrunch,
} from './fixtures'

export function testValuations(context: SuiteContext): void {
  describe('bitscrunch', () => {
    let oldEnv: NodeJS.ProcessEnv
    beforeAll(() => {
      oldEnv = JSON.parse(JSON.stringify(process.env))
      process.env.API_PROVIDER = Provider.BITSCRUNCH
      process.env.BITSCRUNCH_API_KEY = 'fake-api-key'
    })
    afterAll(() => {
      process.env = oldEnv
    })
    it('returns an error response when the API errors too', async () => {
      const valuationsSingleInput = { ...valuationsInput }
      valuationsSingleInput.data.method = RequestMethod.GET
      valuationsSingleInput.data.chainId = 137
      valuationsSingleInput.data.collectionAddress = '0x67f4732266c7300cca593c814d46bee72e40659f'
      valuationsSingleInput.data.tokenId = 13056

      mockValuationsGetSingleErrorBitscrunch()

      const response = await context.req
        .post('/')
        .send(valuationsSingleInput)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      assertError(
        { expected: 500, actual: response.body.providerStatusCode },
        response.body,
        valuationsSingleInput.id,
      )
      expect(response.body).toMatchSnapshot()
    })

    it('returns a single valuation', async () => {
      const valuationsSingleInput = { ...valuationsInput }
      valuationsSingleInput.data.method = RequestMethod.GET
      valuationsSingleInput.data.chainId = 137
      valuationsSingleInput.data.collectionAddress = '0x67f4732266c7300cca593c814d46bee72e40659f'
      valuationsSingleInput.data.tokenId = 13056
      mockValuationsGetSingleSuccessBitscrunch()

      const response = await context.req
        .post('/')
        .send(valuationsSingleInput)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      assertSuccess(
        { expected: 200, actual: response.body.statusCode },
        response.body,
        valuationsSingleInput.id,
      )
      expect(response.body).toMatchSnapshot()
    })
  })
}
