import { AdapterError } from '@chainlink/ea-bootstrap'
import { ethers } from 'ethers'

import { BitscrunchValuationsGetPayload } from '../api/bitscrunch/types'
import { Provider } from '../api/constants'

export interface IValuation {
  valuation: {
    priceEstimate: {
      currency: string
      amount: string
      units: string
    }
    priceEstimateUpperBound: {
      currency: string
      amount: string
      units: string
    }
    priceEstimateLowerBound: {
      currency: string
      amount: string
      units: string
    }
  }
}

const transformer = {
  [Provider.BITSCRUNCH]: (payload: BitscrunchValuationsGetPayload): IValuation => {
    return {
      valuation: {
        priceEstimate: {
          currency: payload.price_estimate.unit,
          amount: ethers.utils
            .parseUnits(payload.price_estimate.value.toString(), 'ether')
            .toString(),
          units: 'wei',
        },
        priceEstimateUpperBound: {
          currency: payload.price_estimate_upper_bound.unit,
          amount: ethers.utils
            .parseUnits(payload.price_estimate_upper_bound.value.toString(), 'ether')
            .toString(),
          units: 'wei',
        },
        priceEstimateLowerBound: {
          currency: payload.price_estimate_lower_bound.unit,
          amount: ethers.utils
            .parseUnits(payload.price_estimate_lower_bound.value.toString(), 'ether')
            .toString(),
          units: 'wei',
        },
      },
    }
  },
}

const Single = (payload: BitscrunchValuationsGetPayload, provider: Provider): IValuation => {
  let valuation: IValuation
  try {
    valuation = transformer[provider](payload)
  } catch (error) {
    throw new AdapterError({
      cause: error,
      message: `Unexpected error transforming the ${provider} payload: ${JSON.stringify(
        payload,
      )}. Reason: ${error}`,
      statusCode: 500,
    })
  }
  return valuation
}

export default {
  Single,
}
