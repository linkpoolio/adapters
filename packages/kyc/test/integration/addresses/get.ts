import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'

import { Provider } from '../../../src/api/constants'
import { RequestMethod } from '../../../src/controllers/constants'
import type { SuiteContext } from '../adapter.test'
import { addressesInput } from '../common'
import {
  mockCiphertraceAddressesGetSuccess,
  mockEverestAddressesGetError400,
  mockEverestAddressesGetError500,
  mockEverestAddressesGetSuccessIsHumandAndUnique,
  mockEverestAddressesGetSuccessIsKycUser,
  mockEverestAddressesGetSuccessNotFound,
} from './fixtures'

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

    it('returns a single address (case: is sanctioned)', async () => {
      const addressesSingleInput = { ...addressesInput }
      addressesSingleInput.data.method = RequestMethod.GET
      addressesSingleInput.data.address = '0xFD8610d20aA15b7B2E3Be39B396a1bC3516c7144'
      addressesSingleInput.data.network = 'eth'

      mockCiphertraceAddressesGetSuccess()

      const response = await context.req
        .post('/')
        .send(addressesSingleInput)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      assertSuccess(
        { expected: 200, actual: response.body.statusCode },
        response.body,
        addressesSingleInput.id,
      )
      expect(response.body).toMatchSnapshot()
    })

    it('returns a single address (case: is not sanctioned)', async () => {
      const addressesSingleInput = { ...addressesInput }
      addressesSingleInput.data.method = RequestMethod.GET
      addressesSingleInput.data.address = '0x0000000000000000000000000000000000000001'
      addressesSingleInput.data.network = 'eth'

      mockCiphertraceAddressesGetSuccess()

      const response = await context.req
        .post('/')
        .send(addressesSingleInput)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      assertSuccess(
        { expected: 200, actual: response.body.statusCode },
        response.body,
        addressesSingleInput.id,
      )
      expect(response.body).toMatchSnapshot()
    })
  })

  describe('everest', () => {
    let oldEnv: NodeJS.ProcessEnv

    beforeAll(() => {
      oldEnv = JSON.parse(JSON.stringify(process.env))
      process.env.API_PROVIDER = Provider.EVEREST
      process.env.EVEREST_API_KEY = 'fake-api-key'
    })

    afterAll(() => {
      process.env = oldEnv
    })

    it('fails to request the API (case: status code 500) ', async () => {
      const address = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'
      const floorpricesSingleInput = { ...addressesInput }
      floorpricesSingleInput.data.method = RequestMethod.GET
      floorpricesSingleInput.data.address = address

      mockEverestAddressesGetError500(address.toLowerCase())

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

    it('fails to request the API (case: status code 400) ', async () => {
      const address = '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'
      const floorpricesSingleInput = { ...addressesInput }
      floorpricesSingleInput.data.method = RequestMethod.GET
      floorpricesSingleInput.data.address = address

      mockEverestAddressesGetError400(address.toLowerCase())

      const response = await context.req
        .post('/')
        .send(floorpricesSingleInput)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      assertError(
        { expected: 400, actual: response.body.providerStatusCode },
        response.body,
        floorpricesSingleInput.id,
      )
      expect(response.body).toMatchSnapshot()
    })

    it('returns a single address (case: is not found)', async () => {
      const address = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'
      const floorpricesSingleInput = { ...addressesInput }
      floorpricesSingleInput.data.method = RequestMethod.GET
      floorpricesSingleInput.data.address = address

      mockEverestAddressesGetSuccessNotFound(address.toLowerCase())

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

    it('returns a single address (case: is human and unique)', async () => {
      const address = '0xda0AFdDB7b05f6B635E3018937E35faa6255d4a1'
      const floorpricesSingleInput = { ...addressesInput }
      floorpricesSingleInput.data.method = RequestMethod.GET
      floorpricesSingleInput.data.address = address

      mockEverestAddressesGetSuccessIsHumandAndUnique(address.toLowerCase())

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

    it('returns a single address (case: is kyc user)', async () => {
      const address = '0x652c3c775A82fEc8D176BEaEB1e259DD5b0c8526'
      const addressesSingleInput = { ...addressesInput }
      addressesSingleInput.data.method = RequestMethod.GET
      addressesSingleInput.data.address = address

      mockEverestAddressesGetSuccessIsKycUser(address.toLowerCase())

      const response = await context.req
        .post('/')
        .send(addressesSingleInput)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      assertSuccess(
        { expected: 200, actual: response.body.statusCode },
        response.body,
        addressesSingleInput.id,
      )
      expect(response.body).toMatchSnapshot()
    })
  })
}
