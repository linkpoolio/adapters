import { AdapterError } from '@chainlink/ea-bootstrap'
import { datetime } from '@linkpool/shared'

import { BinanceFundingRatesGetPayload } from '../api/binance/types'
import { BybitFundingRatesGetPayload } from '../api/bybit/types'
import { Provider } from '../api/constants'
import { FtxFundingRatesGetPayload } from '../api/ftx/types'

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
          24,
        timestamp: payload.nextFundingTime / 1000,
      },
    }
  },
  [Provider.BYBIT]: (payload: BybitFundingRatesGetPayload): IFundingRate => {
    return {
      nextFunding: {
        rate: Number(payload.result.funding_rate) / 8,
        timestamp: payload.result.funding_rate_timestamp,
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

const Single = (payload: any, provider: Provider): IFundingRate => {
  // <<<<<<< payload type?
  let fundingRate: IFundingRate
  try {
    fundingRate = transformer[provider](payload)
  } catch (error) {
    throw new AdapterError({
      cause: error,
      message: `Unexpected error transforming the ${provider} payload: ${JSON.stringify(
        payload,
      )}. Reason: ${error}`,
      statusCode: 500,
    })
  }
  return fundingRate
}

export default {
  Single,
}
