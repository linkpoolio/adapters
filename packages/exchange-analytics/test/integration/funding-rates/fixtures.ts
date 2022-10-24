import nock from 'nock'

import { Provider as ProviderName, providerToBaseUrl } from '../../../src/api/constants'

const baseUrlBinance = providerToBaseUrl.get(ProviderName.BINANCE) as string
const baseUrlBybit = providerToBaseUrl.get(ProviderName.BYBIT) as string
const baseUrlFtx = providerToBaseUrl.get(ProviderName.FTX) as string

const BinanceFundingRatesGetPayload = {
  symbol: 'ETHUSDT',
  markPrice: '1461.20000000',
  indexPrice: '1461.88822394',
  estimatedSettlePrice: '1461.84099962',
  lastFundingRate: '0.00007817',
  interestRate: '0.00010000',
  nextFundingTime: 1663344000000,
  time: 1663334434003,
}

const BybitFundingRatesGetPayload = {
  ret_code: 0,
  ret_msg: 'OK',
  ext_code: '',
  ext_info: '',
  result: { symbol: 'ETHUSD', funding_rate: '-0.00008953', funding_rate_timestamp: 1663315200 },
  time_now: '1663334529.946806',
}

const FtxFundingRatesGetPayload = {
  success: true,
  result: {
    volume: 110947.5048,
    nextFundingRate: -5e-6,
    nextFundingTime: '2022-09-16T14:00:00+00:00',
    openInterest: 52316.8612,
  },
}

// Binance

export const mockFundingRatesGetSingleErrorBinance = (): nock =>
  nock(baseUrlBinance, {
    encodedQueryParams: true,
  })
    .get(`/premiumIndex?symbol=ETHUSDT`)
    .reply(500, {})

export const mockFundingRatesGetSingleSuccessBinance = (): nock =>
  nock(baseUrlBinance, {
    encodedQueryParams: true,
  })
    .get(`/premiumIndex?symbol=ETHUSDT`)
    .reply(200, BinanceFundingRatesGetPayload)

// Bybit

export const mockFundingRatesGetSingleErrorBybit = (): nock =>
  nock(baseUrlBybit, {
    encodedQueryParams: true,
  })
    .get(`/public/funding/prev-funding-rate?symbol=ETHUSD`)
    .reply(500, {})

export const mockFundingRatesGetSingleSuccessBybit = (): nock =>
  nock(baseUrlBybit, {
    encodedQueryParams: true,
  })
    .get(`/public/funding/prev-funding-rate?symbol=ETHUSD`)
    .reply(200, BybitFundingRatesGetPayload)

// Ftx

export const mockFundingRatesGetSingleErrorFtx = (): nock =>
  nock(baseUrlFtx, {
    encodedQueryParams: true,
  })
    .get(`/futures/ETH-PERP/stats`)
    .reply(500, {})

export const mockFundingRatesGetSingleSuccessFtx = (): nock =>
  nock(baseUrlFtx, {
    encodedQueryParams: true,
  })
    .get(`/futures/ETH-PERP/stats`)
    .reply(200, FtxFundingRatesGetPayload)
