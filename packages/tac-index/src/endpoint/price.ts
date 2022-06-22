import { Requester, Validator, AdapterError } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'
import { Currency } from '../lib/const'
import { join } from 'path'
import { ResponseSchema } from '../lib/types'
import { filterPrice } from '../lib/utils'

export const supportedEndpoints = ['price']

export const endpointResultPaths = {}

export const inputParameters: InputParameters = {
  route: {
    description: 'The route for which we want to get the latest freight price.',
    type: 'string',
    required: true,
  },
  currency: {
    description: 'The desired currency for the price.',
    type: 'string',
    required: false,
    options: [Currency.USD, Currency.EURO, Currency.LOCAL],
    default: Currency.USD,
  },
}

export const execute: ExecuteWithConfig<Config> = async (request, _, config) => {
  const validator = new Validator(request, inputParameters)

  const jobRunID = validator.validated.id
  const route = validator.validated.data.route.toUpperCase() as string
  const currency = validator.validated.data.currency.toUpperCase() as Currency

  const options = {
    ...config.api,
    url: `/freight/price/?format=json`,
  }

  const response = await Requester.request<ResponseSchema>(options)

  const routes = response.data

  if (!Array.isArray(routes)) {
    throw new AdapterError({
      statusCode: 200,
      message: `Unexpected response from API. Response was not an array.`,
      url: join(options.baseURL, options.url),
    })
  }

  let price: number | undefined

  for (const routeData of routes) {
    if (routeData.route_code === route) {
      try {
        price = filterPrice(currency, routeData)
      } catch (error) {
        throw new AdapterError({
          statusCode: 200,
          message: `Route: ${route}, in currency: ${currency} could not be found. Reason: ${error}`,
          cause: error,
          url: join(options.baseURL, options.url),
        })
      }
      break
    }
  }

  if (price === undefined) {
    throw new AdapterError({
      statusCode: 200,
      message: `The provided route: ${route} could not be found.`,
      url: join(options.baseURL, options.url),
    })
  }

  return Requester.success(jobRunID, Requester.withResult(response, price), config.verbose)
}
