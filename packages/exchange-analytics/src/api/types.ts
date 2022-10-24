import { BinanceFundingRatesGetPayload } from './binance/types'
import { BybitFundingRatesGetPayload } from './bybit/types'
import { FtxFundingRatesGetPayload } from './ftx/types'

export type FundingRatesGetPayloadSingle =
  | BinanceFundingRatesGetPayload
  | BybitFundingRatesGetPayload
  | FtxFundingRatesGetPayload
