import { Requester, Validator, AdapterError } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'
import { Chain } from '../lib/const'
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
`

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
    proto: Chain[chainId].toLowerCase(),
    address,
    apikey: config.apiKey,
  }
  delete config.api.headers.common['Content-Type'] // This is a bug fix. API breaks if Content-Type not deleted.
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

  const category = categories[0] as string

  if (typeof category !== 'string') {
    throw new AdapterError({
      jobRunID,
      statusCode: 200,
      message: `The category returned is not a string.`,
      url: join(options.baseURL, options.url),
    })
  }

  return Requester.success(jobRunID, Requester.withResult(response, category), config.verbose)
}
