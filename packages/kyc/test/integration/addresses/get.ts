import { assertSuccess } from '@chainlink/ea-test-helpers'

import { Provider } from '../../../src/api/constants'
import { RequestMethod } from '../../../src/controllers/constants'
import type { SuiteContext } from '../adapter.test'
import { addressesInput } from '../common'
import { mockAddressesGetSuccess } from './fixtures'

export function testAddressesGet(context: SuiteContext): void {
  // NB: skipped due to 'Error: Truncated event message received'
  describe.skip('ciphertrace', () => {
    let oldEnv: NodeJS.ProcessEnv
    beforeAll(() => {
      oldEnv = JSON.parse(JSON.stringify(process.env))
      process.env.API_PROVIDER = Provider.CIPHERTRACE
      process.env.CIPHERTRACE_ACCESS_KEY = 'fake-access-key'
      process.env.CIPHERTRACE_SECRET_KEY = 'fake-secret-key'
    })

    afterAll(() => {
      process.env = oldEnv
    })

    it('returns a single address kyc status (case is malicious)', async () => {
      const floorpricesSingleInput = { ...addressesInput }
      floorpricesSingleInput.data.method = RequestMethod.GET
      floorpricesSingleInput.data.address = '0xFD8610d20aA15b7B2E3Be39B396a1bC3516c7144'
      floorpricesSingleInput.data.network = 'eth'

      mockAddressesGetSuccess()

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

    it('returns a single address kyc status (case is not malicious)', async () => {
      const floorpricesSingleInput = { ...addressesInput }
      floorpricesSingleInput.data.method = RequestMethod.GET
      floorpricesSingleInput.data.address = '0x0000000000000000000000000000000000000001'
      floorpricesSingleInput.data.network = 'eth'

      mockAddressesGetSuccess()

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
