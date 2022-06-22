import { AdapterError, Logger, Requester, util, Validator } from '@chainlink/ea-bootstrap'
import type { AdapterRequest, Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'
import { join } from 'path'

import { chainId, floorPriceNftCollection, PricingAsset } from '../const'
import type { FloorPriceResponseSchema } from '../types'
import { getFloorPriceFor } from '../utils'

export const supportedEndpoints = ['floor-price']

export const description = `
### Data Conversions

Supported NFT Collections (via \`nftCollection\`)

|    Value    |             Name             |
| :---------: | :--------------------------: |
|    bayc     | Bored Ape Yacht Club (BAYC)  |
|    mayc     | Mutant Ape Yacht Club (MAYC) |
|   doodles   |       Doodles (DOODLE)       |
|  coolcats   |     Cool Cats NFT (COOL)     |
|    azuki    |        Azuki (AZUKI)         |`

export const inputParameters: InputParameters = {
  nftCollection: {
    aliases: ['collection'],
    required: true,
    type: 'string',
    description: 'The NFT collection to find a price floor in',
    options: Array.from(floorPriceNftCollection.keys()),
  },
  pricingAsset: {
    aliases: ['asset'],
    required: false,
    type: 'string',
    default: PricingAsset.ETH,
    description: 'The pricing asset that you want the price floor returned in',
    options: [PricingAsset.ETH, PricingAsset.USD],
  },
}

const customError = (data: FloorPriceResponseSchema) => {
  const isError = !Array.isArray(data.data) || data.data.length > 1
  if (isError) {
    Logger.error(
      `Unexpected 'data' format in response data. Expected an empty Array or an Array with 1 item`,
      { data },
    )
  }
  return isError
}

export const execute: ExecuteWithConfig<Config> = async (
  request: AdapterRequest,
  _,
  config: Config,
) => {
  const validator = new Validator(request, inputParameters)
  const jobRunID = validator.validated.data.id
  const pricingAsset = validator.validated.data.pricingAsset.toUpperCase() as PricingAsset
  const nftCollection = floorPriceNftCollection.get(
    validator.validated.data.nftCollection as string,
  ) as string
  const url = util.buildUrlPath(`estimates-v2/floor_price/:nftCollection`, { nftCollection })
  const params = {
    chainId: chainId.get(1) as string, // NB: ETHEREUM
  }
  const options = { ...config.api, url, params }
  const response = await Requester.request<FloorPriceResponseSchema>(options, customError)
  const responseData = response.data.data

  let floorPrice: number
  try {
    floorPrice = getFloorPriceFor(pricingAsset, responseData[0].floor_price ?? [])
  } catch (error) {
    throw new AdapterError({
      statusCode: 200,
      message: `Unexpected error getting the floor price of ${nftCollection} in ${pricingAsset}. Reason: ${error}`,
      cause: error,
      url: join(options.baseURL, options.url),
    })
  }

  return Requester.success(jobRunID, Requester.withResult(response, floorPrice), config.verbose)
}
