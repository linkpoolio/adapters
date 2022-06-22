import { AdapterError, Logger, Requester, util, Validator } from '@chainlink/ea-bootstrap'
import type { AdapterRequest, Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'
import { join } from 'path'

import { chainId, estimateNftCollection, PricingAsset } from '../const'
import type { EstimateResponseSchema } from '../types'
import { getEstimateFor } from '../utils'

export const supportedEndpoints = ['estimate']

export const description = `
### Data Conversions

Supported NFT Collections (via \`nftCollection\`)

|    Value    |             Name             |
| :---------: | :--------------------------: |
|    bayc     | Bored Ape Yacht Club (BAYC)  |
| cryptopunks |       CryptoPunks (C)        |
|    mayc     | Mutant Ape Yacht Club (MAYC) |
|   doodles   |       Doodles (DOODLE)       |
|  coolcats   |     Cool Cats NFT (COOL)     |
|    azuki    |        Azuki (AZUKI)         |`

export const inputParameters: InputParameters = {
  nftCollection: {
    aliases: ['collection'],
    required: true,
    type: 'string',
    description: 'The NFT collection to find an estimate in',
    options: Array.from(estimateNftCollection.keys()),
  },
  nftId: {
    aliases: ['id'],
    required: true,
    description: 'The NFT ID to get an estimate for -- bayc (0) or cryptopunks (1)',
    type: 'number',
  },
  pricingAsset: {
    aliases: ['asset'],
    required: false,
    type: 'string',
    default: PricingAsset.ETH,
    description: 'The pricing asset that you want the estimate returned in',
    options: [PricingAsset.ETH, PricingAsset.USD],
  },
}

const customError = (data: EstimateResponseSchema) => {
  const isError = !Array.isArray(data.data) || data.data.length > 1
  if (isError) {
    Logger.error(
      `Unexpected 'data' format in response data pepe. Expected an empty Array or an Array with 1 item`,
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
  const nftId = validator.validated.data.nftId as number
  const pricingAsset = validator.validated.data.pricingAsset.toUpperCase() as PricingAsset
  const nftCollection = estimateNftCollection.get(
    validator.validated.data.nftCollection as string,
  ) as string
  const url = util.buildUrlPath(`estimates-v2/estimates/:nftCollection/:nftId`, {
    nftCollection,
    nftId,
  })
  const params = {
    chainId: chainId.get(1) as string, // NB: ETHEREUM
  }
  const options = { ...config.api, url, params }
  const response = await Requester.request<EstimateResponseSchema>(options, customError)
  const responseData = response?.data?.data

  let estimate: number
  try {
    estimate = getEstimateFor(pricingAsset, responseData[0].estimate ?? [])
  } catch (error) {
    throw new AdapterError({
      statusCode: 200,
      message: `Unexpected error estimating the price of ${nftCollection} in ${pricingAsset}. Reason: ${error}`,
      cause: error,
      url: join(options.baseURL, options.url),
    })
  }

  return Requester.success(jobRunID, Requester.withResult(response, estimate), config.verbose)
}
