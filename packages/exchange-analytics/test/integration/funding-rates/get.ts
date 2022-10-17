import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'

import { Provider } from '../../../src/api/constants'
import { RequestMethod } from '../../../src/controllers/constants'
import type { SuiteContext } from '../adapter.test'
import { fundingRatesInput } from '../common'
import {
  mockFundingRatesGetSingleErrorBinance,
  mockFundingRatesGetSingleErrorBybit,
  mockFundingRatesGetSingleErrorFtx,
  mockFundingRatesGetSingleSuccessBinance,
  mockFundingRatesGetSingleSuccessBybit,
  mockFundingRatesGetSingleSuccessFtx,
} from './fixtures'

export function testFundingRates(context: SuiteContext): void {
  describe('binance', () => {
    let oldEnv: NodeJS.ProcessEnv
    beforeAll(() => {
      oldEnv = JSON.parse(JSON.stringify(process.env))
      process.env.API_PROVIDER = Provider.BINANCE
    })
    afterAll(() => {
      process.env = oldEnv
    })
    it('returns an error response when the API errors too', async () => {
      const fundingRatesSingleInput = { ...fundingRatesInput }
      fundingRatesSingleInput.data.method = RequestMethod.GET
      fundingRatesSingleInput.data.asset = 'ETH'
      mockFundingRatesGetSingleErrorBinance()

      const response = await context.req
        .post('/')
        .send(fundingRatesSingleInput)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      assertError(
        { expected: 500, actual: response.body.providerStatusCode },
        response.body,
        fundingRatesSingleInput.id,
      )
      expect(response.body).toMatchSnapshot()
    })

    it('returns a single funding rate', async () => {
      const fundingRatesSingleInput = { ...fundingRatesInput }
      fundingRatesSingleInput.data.method = RequestMethod.GET
      fundingRatesSingleInput.data.asset = 'ETH'
      mockFundingRatesGetSingleSuccessBinance()

      const response = await context.req
        .post('/')
        .send(fundingRatesSingleInput)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      assertSuccess(
        { expected: 200, actual: response.body.statusCode },
        response.body,
        fundingRatesSingleInput.id,
      )
      expect(response.body).toMatchSnapshot()
    })
  })

  describe('bybit', () => {
    let oldEnv: NodeJS.ProcessEnv
    beforeAll(() => {
      oldEnv = JSON.parse(JSON.stringify(process.env))
      process.env.API_PROVIDER = Provider.BYBIT
    })
    afterAll(() => {
      process.env = oldEnv
    })
    it('returns an error response when the API errors too', async () => {
      const fundingRatesSingleInput = { ...fundingRatesInput }
      fundingRatesSingleInput.data.method = RequestMethod.GET
      fundingRatesSingleInput.data.asset = 'ETH'
      mockFundingRatesGetSingleErrorBybit()

      const response = await context.req
        .post('/')
        .send(fundingRatesSingleInput)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      assertError(
        { expected: 500, actual: response.body.providerStatusCode },
        response.body,
        fundingRatesSingleInput.id,
      )
      expect(response.body).toMatchSnapshot()
    })

    it('returns a single funding rate', async () => {
      const fundingRatesSingleInput = { ...fundingRatesInput }
      fundingRatesSingleInput.data.method = RequestMethod.GET
      fundingRatesSingleInput.data.asset = 'ETH'
      mockFundingRatesGetSingleSuccessBybit()

      const response = await context.req
        .post('/')
        .send(fundingRatesSingleInput)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      assertSuccess(
        { expected: 200, actual: response.body.statusCode },
        response.body,
        fundingRatesSingleInput.id,
      )
      expect(response.body).toMatchSnapshot()
    })
  })

  describe('ftx', () => {
    let oldEnv: NodeJS.ProcessEnv
    beforeAll(() => {
      oldEnv = JSON.parse(JSON.stringify(process.env))
      process.env.API_PROVIDER = Provider.FTX
    })
    afterAll(() => {
      process.env = oldEnv
    })
    it('returns an error response when the API errors too', async () => {
      const fundingRatesSingleInput = { ...fundingRatesInput }
      fundingRatesSingleInput.data.method = RequestMethod.GET
      fundingRatesSingleInput.data.asset = 'ETH'
      mockFundingRatesGetSingleErrorFtx()

      const response = await context.req
        .post('/')
        .send(fundingRatesSingleInput)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      assertError(
        { expected: 500, actual: response.body.providerStatusCode },
        response.body,
        fundingRatesSingleInput.id,
      )
      expect(response.body).toMatchSnapshot()
    })

    it('returns a single funding rate', async () => {
      const fundingRatesSingleInput = { ...fundingRatesInput }
      fundingRatesSingleInput.data.method = RequestMethod.GET
      fundingRatesSingleInput.data.asset = 'ETH'
      mockFundingRatesGetSingleSuccessFtx()

      const response = await context.req
        .post('/')
        .send(fundingRatesSingleInput)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      assertSuccess(
        { expected: 200, actual: response.body.statusCode },
        response.body,
        fundingRatesSingleInput.id,
      )
      expect(response.body).toMatchSnapshot()
    })
  })
}
