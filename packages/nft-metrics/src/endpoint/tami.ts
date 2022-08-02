import { AdapterError, Requester, Validator, util } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'
import { join } from 'path'

import { marketIdToMarket } from '../lib/const'
import type { ResponseSchemaTami as ResponseSchema } from '../lib/types'

export const supportedEndpoints = ['tami']

export const endpointResultPaths = {}

export const description = `This endpoint returns the complete appraisal value of an NFT collection using Time-Adjusted Market Index in WEI.
  
### Supported Markets

The parameter \`marketId\` defaults to \`0\`.

| marketId |      Market        |
| :-----:  | :----------------: |
|    0     |  All Markets       |
|    1     |  OpenSea           |
|    2     |  LooksRare         |
|    3     |  CryptoPunksMarket |`

export const inputParameters: InputParameters = {
  assetAddress: {
    aliases: ['collectionAddress'],
    description: 'The NFT collection address.',
    required: true,
    type: 'string',
  },
  marketId: {
    description: 'The NFT market ID from which we want the TAMI.',
    required: false,
    type: 'number',
    options: [...marketIdToMarket.keys()],
    default: 0,
  },
}

export const execute: ExecuteWithConfig<Config> = async (request, _, config) => {
  const validator = new Validator(request, inputParameters)

  const jobRunID = validator.validated.id
  const assetAddress = validator.validated.data.assetAddress.toLowerCase()
  const marketId = validator.validated.data.marketId

  const url = util.buildUrlPath(`/v1/nft/metrics/:assetAddress?market=:market`, {
    assetAddress,
    market: marketIdToMarket.get(marketId),
  })

  const options = { ...config.api, url }

  const response = await Requester.request<ResponseSchema>(options)

  const result = parseInt(response.data.answer?.wei)

  if (isNaN(result)) {
    throw new AdapterError({
      statusCode: 200,
      message: `There was an unexpected error parsing the result: ${result}`,
      url: join(options.baseURL, options.url),
    })
  }

  return Requester.success(jobRunID, Requester.withResult(response, result), config.verbose)
}
