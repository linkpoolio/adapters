import { AdapterError } from '@chainlink/ea-bootstrap'
import { datetime } from '@linkpool/shared'

import { BinanceFundingRatesGetPayload } from '../api/binance/types'
import { BybitFundingRatesGetPayload } from '../api/bybit/types'
import { Provider } from '../api/constants'
import { FtxFundingRatesGetPayload } from '../api/ftx/types'
import { FundingRatesGetPayloadSingle } from '../api/types'
import {
  FUNDING_RATE_DENOMINATOR,
  HOURS_IN_A_DAY,
  TIMESTAMP_DENOMINATOR,
} from '../controllers/constants'

export interface IFundingRate {
  nextFunding: {
    rate: number
    timestamp: number
  }
}

const transformer = {
  [Provider.BINANCE]: (payload: BinanceFundingRatesGetPayload): IFundingRate => {
    return {
      nextFunding: {
        rate:
          (Number(payload.markPrice) - Number(payload.indexPrice)) /
          Number(payload.indexPrice) /
          HOURS_IN_A_DAY,
        timestamp: Math.floor(payload.nextFundingTime / TIMESTAMP_DENOMINATOR),
      },
    }
  },
  [Provider.BYBIT]: (payload: BybitFundingRatesGetPayload): IFundingRate => {
    return {
      nextFunding: {
        rate: Number(payload.result.funding_rate) / FUNDING_RATE_DENOMINATOR,
        timestamp: Math.floor(payload.result.funding_rate_timestamp),
      },
    }
  },
  [Provider.FTX]: (payload: FtxFundingRatesGetPayload): IFundingRate => {
    return {
      nextFunding: {
        rate: payload.result.nextFundingRate,
        timestamp: datetime.iso8061ToTimestamp(payload.result.nextFundingTime),
      },
    }
  },
}

const Single = (payloadSingle: FundingRatesGetPayloadSingle, provider: Provider): IFundingRate => {
  let fundingRate: IFundingRate
  try {
    switch (provider) {
      case Provider.BINANCE:
        fundingRate = transformer[provider](payloadSingle as BinanceFundingRatesGetPayload)
        break
      case Provider.BYBIT:
        fundingRate = transformer[provider](payloadSingle as BybitFundingRatesGetPayload)
        break
      case Provider.FTX:
        fundingRate = transformer[provider](payloadSingle as FtxFundingRatesGetPayload)
        break
      default: {
        throw new Error(`Unsupported provider: ${provider}`)
      }
    }
  } catch (error) {
    throw new AdapterError({
      cause: error,
      message: `Unexpected error transforming the '${provider}' payload (Single): ${JSON.stringify(
        payloadSingle,
      )}. Reason: ${error}`,
      statusCode: 500,
    })
  }
  return fundingRate
}

export default {
  Single,
}
