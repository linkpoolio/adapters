import { AdapterError } from '@chainlink/ea-bootstrap'
import { ethers } from 'ethers'

import { Provider } from '../api/constants'
import { RarifyFloorPricesGetPayload } from '../api/rarify/types'

export interface IFloorPrice {
  collection: {
    contractAddress: string
    name: string | null
    symbol: string | null
    imageUrl: string | null
  }
  floorPrice: {
    currency: string
    amount: string
    units: string
  }
  network: string
  timestamp: number
}

const transformer = {
  [Provider.RARIFY]: (payload: RarifyFloorPricesGetPayload): IFloorPrice => {
    const payloadData = payload.data
    const [network, contractAddress, timestamp] = payloadData.id.split(':')
    return {
      collection: {
        contractAddress: ethers.utils.getAddress(`0x${contractAddress}`),
        name: null,
        symbol: null,
        imageUrl: payloadData.attributes.payment_asset.image_url,
      },
      floorPrice: {
        currency: payloadData.attributes.payment_asset.code,
        amount: payloadData.attributes.price,
        units: 'wei',
      },
      network,
      timestamp: parseInt(timestamp),
    }
  },
}

const Single = (payload: RarifyFloorPricesGetPayload, provider: Provider): IFloorPrice => {
  let floorPrice: IFloorPrice
  try {
    floorPrice = transformer[provider](payload)
  } catch (error) {
    throw new AdapterError({
      cause: error,
      message: `Unexpected error transforming the ${provider} payload: ${JSON.stringify(
        payload,
      )}. Reason: ${error}`,
      statusCode: 500,
    })
  }
  return floorPrice
}

export default {
  Single,
}
