import { AdapterError, Logger, Requester, util, Validator } from '@chainlink/ea-bootstrap'
import type { AdapterRequest, Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'
import { join } from 'path'

import { chainId, PricingAsset } from '../lib/const'
import type { EstimateResponseSchema } from '../lib/types'
import { getEstimateFor } from '../lib/utils'

export const supportedEndpoints = ['estimate']

const customError = (data: EstimateResponseSchema) => {
  const isError = !Array.isArray(data.data) || data.data.length > 1
  if (isError) {
    Logger.error(
      `Unexpected 'data' format in response data. Expected an empty Array or an Array with 1 item. Try again with a valid 'assetAddress'.`,
      { data },
    )
  }
  return isError
}

export const description = `This endpoint returns the complete appraisal value of an NFT collection using Time-Adjusted Market Index in ETH or USD.`

export const inputParameters: InputParameters = {
  assetAddress: {
    aliases: ['collectionAddress'],
    required: true,
    type: 'string',
    description: 'The NFT collection address to find an estimate in',
  },
  tokenId: {
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

export const execute: ExecuteWithConfig<Config> = async (
  request: AdapterRequest,
  _,
  config: Config,
) => {
  const validator = new Validator(request, inputParameters)
  const jobRunID = validator.validated.data.id
  const tokenId = validator.validated.data.tokenId.toString() as string
  const pricingAsset = validator.validated.data.pricingAsset.toUpperCase() as PricingAsset
  const assetAddress = validator.validated.data.assetAddress.toLowerCase()
  const url = util.buildUrlPath(`estimates-v2/estimates/:assetAddress/:tokenId`, {
    assetAddress,
    tokenId,
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
      message: `Unexpected error estimating the price of ${tokenId} in ${pricingAsset}. Reason: ${error}`,
      cause: error,
      url: join(options.baseURL, options.url),
    })
  }

  return Requester.success(jobRunID, Requester.withResult(response, estimate), config.verbose)
}
