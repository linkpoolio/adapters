import { AdapterError, Requester, Validator } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'
import { join } from 'path'

export const supportedEndpoints = ['price']

export const endpointResultPaths = {}

export const inputParameters: InputParameters = {}

const multiplier = 1000000000

export const execute: ExecuteWithConfig<Config> = async (request, _, config) => {
  const validator = new Validator(request, inputParameters)
  if (validator.error) throw validator.error

  const jobRunID = validator.validated.id

  const url = `price`

  const headers = {
    'x-api-key': config.apiKey,
  }

  const options = {
    ...config.api,
    url,
    headers,
  }

  const response = await Requester.request(options)

  const rawPrice = response.data.price
  const result = Math.trunc(rawPrice * multiplier)
  if (isNaN(result)) {
    throw new AdapterError({
      jobRunID,
      statusCode: 200,
      message: `Invalid result: ${result}. Response 'price' is not a number: ${rawPrice}`,
      url: join(options.baseURL, options.url),
    })
  }
  response.data.result = result

  return Requester.success(jobRunID, response, config.verbose)
}
