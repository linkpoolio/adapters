import { Provider } from '../../src/api/constants'
import FundingRate from '../../src/models/funding-rate'

describe('models', () => {
  describe('binance transformer', () => {
    it('hydrates an IFundingRate object', async () => {
      const getFundingRatePayload = {
        symbol: 'ETHUSDT',
        markPrice: '1461.20000000',
        indexPrice: '1461.88822394',
        estimatedSettlePrice: '1461.84099962',
        lastFundingRate: '0.00007817',
        interestRate: '0.00010000',
        nextFundingTime: 1663344000001,
        time: 1663334434003,
      }
      const expectedFundingRate = {
        nextFunding: {
          rate: -0.000019615725081026844,
          timestamp: 1663344000,
        },
      }

      expect(FundingRate.Single(getFundingRatePayload, Provider.BINANCE)).toEqual(
        expectedFundingRate,
      )
    })
  })

  describe('bybit transformer', () => {
    it('hydrates an IFundingRate object', async () => {
      const getFundingRatePayload = {
        ret_code: 0,
        ret_msg: 'OK',
        ext_code: '',
        ext_info: '',
        result: {
          symbol: 'ETHUSD',
          funding_rate: '-0.00008953',
          funding_rate_timestamp: 1663315200,
        },
        time_now: '1663334529.946806',
      }
      const expectedFundingRate = {
        nextFunding: {
          rate: -0.00001119125,
          timestamp: 1663315200,
        },
      }

      expect(FundingRate.Single(getFundingRatePayload, Provider.BYBIT)).toEqual(
        expectedFundingRate,
      )
    })
  })

  describe('ftx transformer', () => {
    it('hydrates an IFundingRate object', async () => {
      const getFundingRatePayload = {
        success: true,
        result: {
          volume: 110947.5048,
          nextFundingRate: -5e-6,
          nextFundingTime: '2022-09-16T14:00:00+00:00',
          openInterest: 52316.8612,
        },
      }
      const expectedFundingRate = {
        nextFunding: {
          rate: -0.000005,
          timestamp: 1663336800,
        },
      }

      expect(FundingRate.Single(getFundingRatePayload, Provider.FTX)).toEqual(expectedFundingRate)
    })
  })
})
