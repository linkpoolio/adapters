import { AdapterError } from '@chainlink/ea-bootstrap'
import { datetime } from '@linkpool/shared'

import { Provider } from '../api/constants'
import { NFTPerpTwapsGetPayload } from '../api/nftperp/types'

export interface ITwap {
  collection: {
    contractAddress: string | null
    name: string | null
    symbol: string | null
    imageUrl: string | null
  }
  twap: {
    currency: string | null
    amount: string
    units: string
  }
  network: string | null
  timestamp: number
}

const transformer = {
  [Provider.NFTPERP]: (payload: NFTPerpTwapsGetPayload): ITwap => {
    return {
      collection: {
        contractAddress: null,
        name: null,
        symbol: null,
        imageUrl: null,
      },
      twap: {
        currency: null,
        amount: payload.price,
        units: 'wei',
      },
      network: null,
      timestamp: datetime.iso8061ToTimestamp(payload.timestamp),
    }
  },
}

const Single = (payload: NFTPerpTwapsGetPayload, provider: Provider): ITwap => {
  let twap: ITwap
  try {
    twap = transformer[provider](payload)
  } catch (error) {
    throw new AdapterError({
      cause: error,
      message: `Unexpected error transforming the ${provider} payload: ${JSON.stringify(
        payload,
      )}. Reason: ${error}`,
      statusCode: 500,
    })
  }
  return twap
}

export default {
  Single,
}
