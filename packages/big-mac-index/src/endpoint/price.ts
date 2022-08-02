import { AdapterError, Requester, Validator, util } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'
import { join } from 'path'

import type { ResponseSchemaPrice as ResponseSchema, FormattedPrices } from '../lib/types'
import { DEFAULT_START_DATE_MONTH, DEFAULT_END_DATE_MONTH } from '../lib/const'
import { formatPrices, encodePrices } from '../lib/utils'

export const supportedEndpoints = ['price']

export const endpointResultPaths = {}

export const description = `This endpoint returns the price of a big mac in a specific country over a given year.
\n The response will contain the price reported during the first half of the chosen year and the second half.
\n The prices will be of type uint128 and will be returned packed into a bytes32 (order: firstHalfPrice, secondHalfPrice).
\n If a price has not been reported for any reason (country does not exist, year ), its default value will be 0.
\n The price is reported in dollars multiplied by 10^15.
`

export const inputParameters: InputParameters = {
  country: {
    description:
      'The 3 character ISO standard code for your desired country which coubld be found [here](https://www.iban.com/country-codes).',
    required: true,
    type: 'string',
  },
  year: {
    description: 'The desired year.',
    required: true,
    type: 'number',
  },
}

export const execute: ExecuteWithConfig<Config> = async (request, _, config) => {
  const validator = new Validator(request, inputParameters)

  const jobRunID = validator.validated.id
  const country = validator.validated.data.country.toUpperCase()
  const year = validator.validated.data.year

  const url = util.buildUrlPath(`/api/v3/datasets/ECONOMIST/BIGMAC_:country.json`, { country })

  const params = {
    api_key: config.apiKey,
    start_date: year.toString() + DEFAULT_START_DATE_MONTH,
    end_date: year.toString() + DEFAULT_END_DATE_MONTH,
  }

  const options = { ...config.api, params, url }

  const response = await Requester.request<ResponseSchema>(options)

  const prices = response.data.dataset?.data

  if (!Array.isArray(prices)) {
    throw new AdapterError({
      jobRunID,
      statusCode: 200,
      message: `Unexpected error getting the prices. The response is malformed: ${JSON.stringify(
        response.data,
      )}`,
      url: join(options.baseURL, options.url),
    })
  }

  let formattedPrices: FormattedPrices
  let encodedPrices: string

  try {
    formattedPrices = formatPrices(prices)
  } catch (error) {
    throw new AdapterError({
      jobRunID,
      statusCode: 200,
      message: `Unexpected error formatting the prices: ${JSON.stringify(
        prices,
      )}. Reason: ${error}`,
      cause: error,
      url: join(options.baseURL, options.url),
    })
  }

  try {
    encodedPrices = encodePrices(formattedPrices)
  } catch (error) {
    throw new AdapterError({
      jobRunID,
      statusCode: 200,
      message: `Unexpected error encoding the prices: ${JSON.stringify(
        formattedPrices,
      )}. Reason: ${error}`,
      cause: error,
      url: join(options.baseURL, options.url),
    })
  }

  return Requester.success(jobRunID, Requester.withResult(response, encodedPrices), config.verbose)
}
