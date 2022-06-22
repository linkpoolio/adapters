import { Requester, Validator, AdapterError } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'
import { ResponseSchemaAssetPrice as ResponseSchema } from '../lib/types'
import { join } from 'path'

export const supportedEndpoints = ['asset-price']

export const endpointResultPaths = {}

const customError = (data: ResponseSchema) => {
  return data.status === false
}

export const description =
  'This endpoint allows you to query the price in wei for a specific NFT asset.'

export const inputParameters: InputParameters = {
  assetAddress: {
    aliases: ['collectionAddress'],
    required: true,
    description: 'The NFT collection address.',
    type: 'string',
  },
  tokenId: {
    required: true,
    description: 'The NFT ID.',
    type: 'number',
  },
}

export const execute: ExecuteWithConfig<Config> = async (request, _, config) => {
  const validator = new Validator(request, inputParameters)

  const jobRunID = validator.validated.id
  const assetAddress = validator.validated.data.assetAddress
  const tokenId = validator.validated.data.tokenId

  const url = `/v1/prices/latest`

  const params = {
    assetId: `${assetAddress}/${tokenId.toString()}`,
  }

  const options = { ...config.api, params, url }

  const response = await Requester.request<ResponseSchema>(options, customError)

  let estimatedPrice: number

  try {
    estimatedPrice = Number(response.data.data[0].currentPricing.estimatedPrice)
  } catch (error) {
    throw new AdapterError({
      jobRunID,
      statusCode: 200,
      message: `Unexpected error occurred parsing the estimated price from the API response. ${error}`,
      cause: error,
      url: join(options.baseURL, options.url),
    })
  }

  if (isNaN(estimatedPrice)) {
    throw new AdapterError({
      jobRunID,
      statusCode: 200,
      message: `The estimated price returned is not a number.`,
      url: join(options.baseURL, options.url),
    })
  }

  return Requester.success(jobRunID, Requester.withResult(response, estimatedPrice), config.verbose)
}
