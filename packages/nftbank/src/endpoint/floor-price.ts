import { AdapterError, Logger, Requester, Validator, util } from '@chainlink/ea-bootstrap'
import type { AdapterRequest, Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'
import { join } from 'path'

import { Format, PricingAsset, chainId } from '../lib/const'
import type { FloorPriceResponseSchema } from '../lib/types'
import { encodePriceWithDate, getFloorPriceFor } from '../lib/utils'

export const supportedEndpoints = ['floor-price']

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

export const description = `This endpoint returns the floor price of an NFT collection in ETH or USD.

### Supported Formats

Choose the format of your response. The default \`formatId\` is \`0\`.

| formatId |                                     Format                               |
| :------: | :----------------------------------------------------------------------: |
|   \`0\`  |                          Floor price as a uint256.                       |
|   \`1\`  | Date of estimation (unix timestamp) and floor price packed into bytes32. |


`

export const inputParameters: InputParameters = {
  assetAddress: {
    aliases: ['collectionAddress'],
    required: true,
    type: 'string',
    description: 'The NFT collection to find a price floor in',
  },
  pricingAsset: {
    aliases: ['asset'],
    required: false,
    type: 'string',
    default: PricingAsset.ETH,
    description: 'The pricing asset that you want the price floor returned in',
    options: [PricingAsset.ETH, PricingAsset.USD],
  },
  formatId: {
    required: false,
    type: 'number',
    default: Format.PRICE,
    description: 'Include the timestamp in unix for the time of the estimation',
    options: [Format.PRICE, Format.DATE_AND_PRICE],
  },
}

export const execute: ExecuteWithConfig<Config> = async (
  request: AdapterRequest,
  _,
  config: Config,
) => {
  const validator = new Validator(request, inputParameters)
  const jobRunID = validator.validated.data.id
  const pricingAsset = validator.validated.data.pricingAsset.toUpperCase() as PricingAsset
  const assetAddress = validator.validated.data.assetAddress.toLowerCase()
  const formatId = validator.validated.data.formatId
  const url = util.buildUrlPath(`estimates-v2/floor_price/:assetAddress`, { assetAddress })
  const params = {
    chainId: chainId.get(1) as string, // NB: ETHEREUM
  }
  const options = { ...config.api, url, params }
  const response = await Requester.request<FloorPriceResponseSchema>(options, customError)
  const responseData = response.data.data

  let result: string | number

  try {
    result = getFloorPriceFor(pricingAsset, responseData[0].floor_price ?? [])
  } catch (error) {
    throw new AdapterError({
      statusCode: 200,
      message: `Unexpected error getting the floor price of ${assetAddress} in ${pricingAsset}. Reason: ${error}`,
      cause: error,
      url: join(options.baseURL, options.url),
    })
  }

  if (formatId === Format.DATE_AND_PRICE) {
    const date = new Date(responseData[0]?.estimated_at).getTime() / 1000
    try {
      result = encodePriceWithDate(date, result)
    } catch (error) {
      throw new AdapterError({
        statusCode: 200,
        message: `Unexpected error encoding the floor price: ${result}, and date: ${date}. Reason: ${error}`,
        cause: error,
        url: join(options.baseURL, options.url),
      })
    }
  }

  return Requester.success(jobRunID, Requester.withResult(response, result), config.verbose)
}
