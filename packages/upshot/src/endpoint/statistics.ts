import { AdapterError, Requester, Validator, util } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'
import { join } from 'path'

import { ResponseSchemaStatistics as ResponseSchema } from '../lib/types'
import { parseResult } from '../lib/utils'

export const supportedEndpoints = ['statistics']

export const endpointResultPaths = {}

const customError = (data: ResponseSchema) => {
  return data.status === false
}

export const description =
  'This endpoint returns statistics for an NFT collection in wei: \n 1. Floor price \n 2. Market cap \n 3. Floor price and Market cap packed as bytes32 \n 4. Unix timestamp and floor price packed into a bytes32 in that order.'

export const inputParameters: InputParameters = {
  assetAddress: {
    aliases: ['collectionAddress'],
    required: true,
    description: 'The NFT collection address.',
    type: 'string',
  },
}

export const execute: ExecuteWithConfig<Config> = async (request, _, config) => {
  const validator = new Validator(request, inputParameters)

  const jobRunID = validator.validated.id
  const assetAddress = validator.validated.data.assetAddress

  const url = util.buildUrlPath(`/v1/collections/contractaddress/:assetAddress`, { assetAddress })

  const params = {
    includeStats: true,
  }

  const options = { ...config.api, params, url }

  const response = await Requester.request<ResponseSchema>(options, customError)

  let result

  try {
    result = parseResult(response.data.data.stats[0])
  } catch (error) {
    throw new AdapterError({
      jobRunID,
      statusCode: 200,
      message: `Unexpected error occurred forming the result from the API response. ${error}`,
      cause: error,
      url: join(options.baseURL, options.url),
    })
  }

  response.data.result = result

  return Requester.success(jobRunID, response, config.verbose)
}
