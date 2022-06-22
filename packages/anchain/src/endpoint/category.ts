import { Requester, Validator, AdapterError } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'
import { Chain, categoryToCategoryId } from '../lib/const'
import type { ResponseSchemaSanctions as ResponseSchema } from '../lib/types'
import { join } from 'path'

export const supportedEndpoints = ['category']

export const endpointResultPaths = {}

export const description = `This endpoint returns the category in which the address queried belongs to.

### Data Conversions

| chainId | Blockchain |
| :-----: | :--------: |
|    1    |  Ethereum  |
|    2    |  Bitcoin   |

| categoryId |    Category    |
| :--------: | :------------: |
|     0      |  unaffiliated  |
|     1      |   app wallet   |
|     2      |     whale      |
|     3      |      dapp      |
|     4      |     token      |
|     5      |    contract    |
|     6      |     miner      |
|     7      |      defi      |
|     8      |     mixer      |
|     9      |      bot       |
|     10     |     hacker     |
|     11     |      scam      |
|     12     |   ransomware   |
|     13     |     abuse      |
|     14     |    sanction    |
|     15     | darknet market |
|     16     |   blackmail    |`

export const inputParameters: InputParameters = {
  address: {
    description: 'The address which we want to lookup.',
    required: true,
    type: 'string',
  },
  chainId: {
    description: 'The blockchain ID of the address.',
    required: true,
    options: [Chain.ETH, Chain.BTC],
    type: 'number',
  },
}

export const execute: ExecuteWithConfig<Config> = async (request, _, config) => {
  const validator = new Validator(request, inputParameters)

  const jobRunID = validator.validated.id
  const address = validator.validated.data.address
  const chainId = validator.validated.data.chainId

  const url = `/api/address_label`

  const params = {
    proto: Chain[chainId],
    address,
    apikey: config.apiKey,
  }

  const options = { ...config.api, params, url }

  const response = await Requester.request<ResponseSchema>(options)

  const addressData = response.data.data?.[address]

  if (!addressData.is_address_valid) {
    throw new AdapterError({
      jobRunID,
      statusCode: 200,
      message: `The address: ${address} is invalid. Please use a valid address.`,
      url: join(options.baseURL, options.url),
    })
  }

  const categories = addressData.self?.category

  if (!Array.isArray(categories) || !categories.length) {
    throw new AdapterError({
      jobRunID,
      statusCode: 200,
      message: `Unexpected error reading categories: ${categories}. Expecting an array.`,
      url: join(options.baseURL, options.url),
    })
  }

  const categoryId = categoryToCategoryId.get(categories[0]) as number

  if (isNaN(categoryId)) {
    throw new AdapterError({
      jobRunID,
      statusCode: 200,
      message: `The categoryId returned is not a number.`,
      url: join(options.baseURL, options.url),
    })
  }

  return Requester.success(jobRunID, Requester.withResult(response, categoryId), config.verbose)
}
